export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

async function assertAdmin(req: Request) {
  // Try Bearer token first (sent by client), fall back to cookie session
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  let userId: string | null = null;
  if (token) {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser(token);
    userId = user?.id ?? null;
  } else {
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    userId = session?.user?.id ?? null;
  }

  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  return user?.role === "ADMIN" ? userId : null;
}

export async function GET(req: Request) {
  const adminId = await assertAdmin(req);
  if (!adminId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const status = url.searchParams.get("status") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 20;

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
      { user: { email: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [sites, total] = await Promise.all([
    prisma.site.findMany({
      where,
      include: { user: { select: { email: true, fullName: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.site.count({ where }),
  ]);

  return NextResponse.json({ sites, total, page, pages: Math.ceil(total / limit) });
}

export async function PATCH(req: Request) {
  const adminId = await assertAdmin(req);
  if (!adminId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { siteId, status } = await req.json();
  const validStatuses = ["BUILDING", "DEPLOYED", "SUSPENDED", "EXPIRED", "CANCELLED"];
  if (!siteId || !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }

  const site = await prisma.site.update({ where: { id: siteId }, data: { status } });
  return NextResponse.json({ site });
}
