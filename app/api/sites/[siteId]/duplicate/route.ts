export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  const user = await requireUser(req);
  const original = await prisma.site.findFirst({
    where: { id: params.siteId, userId: user.prismaId },
  });
  if (!original) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const newSlug = `${original.slug}-copy-${Date.now().toString(36)}`;

  const duplicate = await prisma.site.create({
    data: {
      userId: user.prismaId,
      name: `${original.name} (Copy)`,
      slug: newSlug,
      siteType: original.siteType,
      status: "BUILDING",
      monthlyPriceGhs: original.monthlyPriceGhs,
      builderJson: original.builderJson ?? undefined,
      primaryColor: original.primaryColor,
      secondaryColor: original.secondaryColor,
      fontFamily: original.fontFamily,
    },
  });

  return NextResponse.json({ siteId: duplicate.id, slug: duplicate.slug });
}
