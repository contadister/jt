export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";

export async function PATCH(
  req: Request,
  { params }: { params: { siteId: string; bookingId: string } }
) {
  const user = await requireUser(req);
  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: user.prismaId } });
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
