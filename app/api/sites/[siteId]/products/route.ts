export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

async function getSite(siteId: string, userId: string) {
  return prisma.site.findFirst({ where: { id: siteId, userId } });
}

export async function GET(_req: Request, { params }: { params: { siteId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const site = await getSite(params.siteId, session.user.id);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const products = await prisma.product.findMany({
    where: { siteId: site.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const site = await getSite(params.siteId, session.user.id);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const slug = body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();

  const product = await prisma.product.create({
    data: {
      siteId: site.id,
      name: body.name,
      description: body.description || null,
      priceGhs: parseFloat(body.priceGhs),
      stockQuantity: parseInt(body.stockQuantity) || 0,
      category: body.category || null,
      slug,
      images: body.images || [],
      tags: body.tags || [],
    },
  });
  return NextResponse.json({ product });
}
