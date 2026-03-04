export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function PATCH(req: Request, { params }: { params: { siteId: string; orderId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: session.user.id } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { status } = await req.json();
  const validStatuses = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];
  if (!validStatuses.includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  await prisma.order.updateMany({ where: { id: params.orderId, siteId: site.id }, data: { status } });
  return NextResponse.json({ success: true });
}
