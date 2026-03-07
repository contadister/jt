export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";

export async function PATCH(req: Request, { params }: { params: { siteId: string; productId: string } }) {
  const user = await requireUser(req);
  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: user.prismaId } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const allowed = ["name", "description", "priceGhs", "comparePriceGhs", "stockQuantity", "category", "isAvailable", "images", "tags"];
  const data: Record<string, unknown> = {};
  for (const key of allowed) { if (key in body) data[key] = body[key]; }

  const product = await prisma.product.updateMany({ where: { id: params.productId, siteId: site.id }, data });
  const updated = await prisma.product.findUnique({ where: { id: params.productId } });
  return NextResponse.json({ product: updated });
}

export async function DELETE(_req: Request, { params }: { params: { siteId: string; productId: string } }) {
  const user = await requireUser(req);
  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: user.prismaId } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.product.deleteMany({ where: { id: params.productId, siteId: site.id } });
  return NextResponse.json({ success: true });
}
