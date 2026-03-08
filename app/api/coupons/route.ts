export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { z } from "zod";

const CreateSchema = z.object({
  siteId: z.string(),
  code: z.string().min(3).max(32).toUpperCase(),
  discountType: z.enum(["PERCENT", "FIXED"]),
  discountValue: z.number().positive(),
  minOrderGhs: z.number().optional(),
  maxUsageCount: z.number().int().optional(),
  expiresAt: z.string().optional(),
});

// GET /api/coupons?siteId=xxx
export async function GET(req: Request) {
  try {
    const user = await requireUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const siteId = new URL(req.url).searchParams.get("siteId");
    if (!siteId) return NextResponse.json({ error: "siteId required" }, { status: 400 });

    // Verify ownership
    const site = await prisma.site.findFirst({ where: { id: siteId, userId: user.prismaId } });
    if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const coupons = await prisma.coupon.findMany({
      where: { siteId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ coupons });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/coupons — create
export async function POST(req: Request) {
  try {
    const user = await requireUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = CreateSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const { siteId, code, discountType, discountValue, minOrderGhs, maxUsageCount, expiresAt } = parsed.data;

    // Verify site ownership
    const site = await prisma.site.findFirst({ where: { id: siteId, userId: user.prismaId } });
    if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const coupon = await prisma.coupon.create({
      data: {
        siteId,
        code,
        discountType,
        discountValue,
        minOrderGhs,
        maxUsageCount,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      },
    });
    return NextResponse.json({ coupon });
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === "P2002") {
      return NextResponse.json({ error: "Coupon code already exists for this site" }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH /api/coupons — toggle active / update
export async function PATCH(req: Request) {
  try {
    const user = await requireUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { couponId, isActive } = await req.json();
    if (!couponId) return NextResponse.json({ error: "couponId required" }, { status: 400 });

    // Verify ownership via site relation
    const coupon = await prisma.coupon.findFirst({
      where: { id: couponId, site: { userId: user.prismaId } },
    });
    if (!coupon) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updated = await prisma.coupon.update({
      where: { id: couponId },
      data: { isActive },
    });
    return NextResponse.json({ coupon: updated });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/coupons?id=xxx
export async function DELETE(req: Request) {
  try {
    const user = await requireUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const couponId = new URL(req.url).searchParams.get("id");
    if (!couponId) return NextResponse.json({ error: "id required" }, { status: 400 });

    const coupon = await prisma.coupon.findFirst({
      where: { id: couponId, site: { userId: user.prismaId } },
    });
    if (!coupon) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.coupon.delete({ where: { id: couponId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
