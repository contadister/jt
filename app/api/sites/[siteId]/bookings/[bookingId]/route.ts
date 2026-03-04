export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { siteId: string; bookingId: string } }
) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: session.user.id } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { status } = await req.json();
  const valid = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];
  if (!valid.includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  await prisma.booking.updateMany({
    where: { id: params.bookingId, siteId: site.id },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
