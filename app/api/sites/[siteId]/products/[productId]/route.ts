export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function PATCH(req: Request, { params }: { params: { siteId: string; productId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: session.user.id } });
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
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: session.user.id } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.product.deleteMany({ where: { id: params.productId, siteId: site.id } });
  return NextResponse.json({ success: true });
}
