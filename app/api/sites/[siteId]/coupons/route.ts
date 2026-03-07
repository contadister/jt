export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";

async function getAuthedSite(siteId: string, userId: string) {
  return prisma.site.findFirst({ where: { id: siteId, userId } });
}

export async function GET(_req: Request, { params }: { params: { siteId: string } }) {
  const user = await requireUser(req);
  const site = await getAuthedSite(params.siteId, user.prismaId);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const coupons = await prisma.coupon.findMany({
    where: { siteId: site.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ coupons });
}

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  const user = await requireUser(req);
  const site = await getAuthedSite(params.siteId, user.prismaId);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const { code, discountType, discountValue, minOrderGhs, maxUsageCount, expiresAt } = body;

  if (!code || !discountType || !discountValue) {
    return NextResponse.json({ error: "code, discountType, and discountValue are required" }, { status: 400 });
  }
  if (!["PERCENT", "FIXED"].includes(discountType)) {
    return NextResponse.json({ error: "discountType must be PERCENT or FIXED" }, { status: 400 });
  }
  if (discountType === "PERCENT" && (discountValue < 1 || discountValue > 100)) {
    return NextResponse.json({ error: "Percentage discount must be between 1 and 100" }, { status: 400 });
  }

  try {
    const coupon = await prisma.coupon.create({
      data: {
        siteId: site.id,
        code: code.toUpperCase().trim(),
        discountType,
        discountValue: Number(discountValue),
        minOrderGhs: minOrderGhs ? Number(minOrderGhs) : null,
        maxUsageCount: maxUsageCount ? Number(maxUsageCount) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: true,
      },
    });
    return NextResponse.json({ coupon });
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "P2002") {
      return NextResponse.json({ error: "A coupon with this code already exists" }, { status: 409 });
    }
    throw e;
  }
}

export async function PATCH(req: Request, { params }: { params: { siteId: string } }) {
  const user = await requireUser(req);
  const site = await getAuthedSite(params.siteId, user.prismaId);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { id, isActive } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.coupon.updateMany({
    where: { id, siteId: site.id },
    data: { isActive },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: { siteId: string } }) {
  const user = await requireUser(req);
  const site = await getAuthedSite(params.siteId, user.prismaId);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.coupon.deleteMany({ where: { id, siteId: site.id } });
  return NextResponse.json({ success: true });
}
