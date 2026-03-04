export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(_req: Request, { params }: { params: { siteId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: session.user.id } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const orders = await prisma.order.findMany({
    where: { siteId: site.id },
    include: { orderItems: { select: { name: true, quantity: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ orders });
}
