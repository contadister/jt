import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { sendWelcomeEmail } from "@/lib/arkesel/client";
import { nanoid } from "nanoid";

// Generate a unique referral code
function generateReferralCode(): string {
  return nanoid(8).toUpperCase();
}

export async function POST(req: Request) {
  try {
    const { supabaseId, email, fullName, phone, referralCode } =
      await req.json();

    if (!supabaseId || !email || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ user: existing });
    }

    // Find referrer if referral code provided
    let referrerId: string | undefined;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });
      if (referrer) {
        referrerId = referrer.id;
        // Give referrer GHS 20 credit
        await prisma.user.update({
          where: { id: referrer.id },
          data: { referralCreditsGhs: { increment: 20 } },
        });
      }
    }

    // Create user record
    const user = await prisma.user.create({
      data: {
        id: supabaseId, // Use Supabase UID as primary key for easy joining
        email,
        fullName,
        phone: phone || null,
        referralCode: generateReferralCode(),
        referredById: referrerId || null,
        // Auto-assign admin role to the configured admin email
        role:
          email === process.env.ADMIN_EMAIL ? "ADMIN" : "USER",
      },
    });

    // Send welcome email (fire and forget — don't block response)
    sendWelcomeEmail(email, fullName).catch((err) =>
      console.error("Welcome email failed:", err)
    );

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
