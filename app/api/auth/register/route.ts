import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { sendWelcomeEmail } from "@/lib/arkesel/client";

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "JST-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, fullName, phone, referralCode } = body as {
      id: string;
      email: string;
      fullName: string;
      phone?: string;
      referralCode?: string;
    };

    if (!id || !email || !fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Avoid duplicates (Google OAuth may call this twice)
    const existing = await prisma.user.findUnique({ where: { id } });
    if (existing) {
      return NextResponse.json({ user: existing });
    }

    // Referral code lookup
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

    // First user or admin email = ADMIN role
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

    // Welcome email - fire and forget
    sendWelcomeEmail(email, fullName).catch(() => undefined);

    // Welcome notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: "welcome",
        title: "Welcome to Josett!",
        message: "Your account is ready. Create your first website now.",
        actionUrl: "/dashboard/sites/new",
      },
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}
