export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";

function adminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(req: Request) {
  try {
    const user = await requireUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [dbUser, paymentHistory] = await Promise.all([
      prisma.user.findUnique({
        where: { id: user.prismaId },
        select: {
          id: true, email: true, fullName: true, avatarUrl: true, phone: true,
          role: true, referralCode: true, referralCreditsGhs: true,
          emailVerified: true, createdAt: true,
          _count: { select: { referrals: true } },
        },
      }),
      prisma.payment.findMany({
        where: { userId: user.prismaId, status: "SUCCESS" },
        include: { site: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
    ]);

    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ user: dbUser, paymentHistory });
  } catch (err) {
    console.error("[GET /api/account]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await requireUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.fullName !== undefined) data.fullName = body.fullName || null;
    if (body.phone !== undefined) data.phone = body.phone || null;
    if (body.avatarUrl !== undefined) data.avatarUrl = body.avatarUrl || null;

    await prisma.user.update({ where: { id: user.prismaId }, data });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[PATCH /api/account]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { password } = await req.json();
    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const supabaseAdmin = adminSupabase();
    const { error } = await supabaseAdmin.auth.admin.updateUserById(user.supabaseId, { password });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/account]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
