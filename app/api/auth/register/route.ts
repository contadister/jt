import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { sendWelcomeEmail, sendWelcomeSms } from "@/lib/nalo/client";
import { createClient } from "@supabase/supabase-js";

// Service-role client — auto-confirms email so users can log in immediately
// ONLY used server-side, never exposed to client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "JST-";
  for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, fullName, phone, referralCode } = body as {
      id: string; email: string; fullName: string; phone?: string; referralCode?: string;
    };

    if (!id || !email || !fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Avoid duplicates (Google OAuth may call this twice)
    const existing = await prisma.user.findUnique({ where: { id } });
    if (existing) return NextResponse.json({ user: existing });

    // Auto-confirm email — bypasses Supabase email verification
    // Remove this once NALO Solutions email is configured
    await supabaseAdmin.auth.admin.updateUserById(id, {
      email_confirm: true,
    }).catch(() => undefined); // non-fatal

    // Referral lookup
    let referredById: string | undefined;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({ where: { referralCode } });
      if (referrer) {
        referredById = referrer.id;
        await prisma.user.update({
          where: { id: referrer.id },
          data: { referralCreditsGhs: { increment: 20 } },
        });
      }
    }

    // First user or admin email = ADMIN
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
    const userCount = await prisma.user.count();
    const isAdmin = email.toLowerCase() === adminEmail || userCount === 0;

    const user = await prisma.user.create({
      data: {
        id,
        email: email.toLowerCase(),
        fullName,
        phone: phone || null,
        role: isAdmin ? "ADMIN" : "USER",
        referralCode: generateReferralCode(),
        referredById: referredById ?? null,
      },
    });

    await prisma.notification.create({
      data: {
        userId: user.id,
        type: "SYSTEM",
        title: "Welcome to Josett!",
        message: "Your account is ready. Create your first website now.",
        actionUrl: "/sites/new",
      },
    });

    // Fire-and-forget — won't break registration if NALO isn't configured yet
    sendWelcomeEmail(email, fullName).catch(() => undefined);
    if (phone) sendWelcomeSms(phone, fullName).catch(() => undefined);

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}
