export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function GET() {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true, email: true, fullName: true, avatarUrl: true, phone: true,
      referralCode: true, referralCreditsGhs: true, emailVerified: true, createdAt: true,
      _count: { select: { referrals: true } },
    },
  });

  const paymentHistory = await prisma.payment.findMany({
    where: { userId: session.user.id, status: "SUCCESS" },
    include: { site: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ user, paymentHistory });
}

export async function PATCH(req: Request) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const data: Record<string, unknown> = {};
  if (body.fullName) data.fullName = body.fullName;
  if (body.phone !== undefined) data.phone = body.phone || null;
  if (body.avatarUrl !== undefined) data.avatarUrl = body.avatarUrl || null;

  await prisma.user.update({ where: { id: session.user.id }, data });

  // Sync email display name in Supabase Auth if name changed
  if (body.fullName) {
    await supabase.auth.updateUser({ data: { full_name: body.fullName } });
  }

  return NextResponse.json({ success: true });
}

export async function POST(req: Request) {
  // Change password
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { password } = await req.json();
  if (!password || password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
