export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

async function assertAdmin(supabase: ReturnType<typeof createServerClient>) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  return user?.role === "ADMIN" ? session : null;
}

export async function GET(req: Request) {
  const supabase = createServerClient();
  if (!await assertAdmin(supabase)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 20;

  const where = search ? {
    OR: [
      { email: { contains: search, mode: "insensitive" as const } },
      { fullName: { contains: search, mode: "insensitive" as const } },
    ],
  } : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true, email: true, fullName: true, role: true, emailVerified: true,
        createdAt: true, referralCreditsGhs: true,
        _count: { select: { sites: true, payments: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({ users, total, page, pages: Math.ceil(total / limit) });
}

export async function PATCH(req: Request) {
  const supabase = createServerClient();
  if (!await assertAdmin(supabase)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { userId, role } = await req.json();
  if (!userId || !role) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  if (!["USER", "ADMIN"].includes(role)) return NextResponse.json({ error: "Invalid role" }, { status: 400 });

  const user = await prisma.user.update({ where: { id: userId }, data: { role } });
  return NextResponse.json({ user });
}
