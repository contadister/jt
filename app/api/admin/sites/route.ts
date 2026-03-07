export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getAuthUser } from "@/lib/auth/getAuthUser";

async function requireAdmin(req: Request) {
  const user = await getAuthUser(req);
  if (!user) return null;
  // Check ADMIN_EMAIL env var — no DB lookup needed
  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  return (adminEmail && user.email === adminEmail) ? user : null;
}

export async function GET(req: Request) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "";
    const limit = 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (search) where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ];

    const [sites, total] = await Promise.all([
      prisma.site.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true, name: true, slug: true, status: true, siteType: true,
          monthlyPriceGhs: true, createdAt: true,
          user: { select: { email: true, fullName: true } },
        },
      }),
      prisma.site.count({ where }),
    ]);

    return NextResponse.json({ sites, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("GET /api/admin/sites error:", error);
    return NextResponse.json({ error: "Server error", detail: String(error) }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { siteId, status } = await req.json();
    if (!siteId || !status) return NextResponse.json({ error: "siteId and status required" }, { status: 400 });

    await prisma.site.update({ where: { id: siteId }, data: { status } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PATCH /api/admin/sites error:", error);
    return NextResponse.json({ error: "Server error", detail: String(error) }, { status: 500 });
  }
}
