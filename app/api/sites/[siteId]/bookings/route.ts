export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";

export async function GET(_req: Request, { params }: { params: { siteId: string } }) {
  const user = await requireUser(req);  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: user.prismaId } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const bookings = await prisma.booking.findMany({
    where: { siteId: site.id },
    orderBy: [{ bookingDate: "desc" }, { bookingTime: "asc" }],
  });
  return NextResponse.json({ bookings });
}
