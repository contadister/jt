import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { sendWelcomeEmail } from "@/lib/arkesel/client";

function generateReferralCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "JST-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Upsert user in our DB (handles Google OAuth signup)
      const existing = await prisma.user.findUnique({ where: { id: user.id } });
      if (!existing) {
        const fullName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "User";
        const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
        const userCount = await prisma.user.count();
        const isAdmin =
          user.email?.toLowerCase() === adminEmail || userCount === 0;

        await prisma.user.create({
          data: {
            id: user.id,
            email: user.email!.toLowerCase(),
            fullName,
            avatarUrl: user.user_metadata?.avatar_url || null,
            role: isAdmin ? "ADMIN" : "USER",
            emailVerified: true,
            referralCode: generateReferralCode(),
          },
        });

        sendWelcomeEmail(user.email!, fullName).catch(() => undefined);
      }
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
