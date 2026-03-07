export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";

export async function GET(
  _req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const site = await prisma.site.findFirst({
      where: { id: params.siteId, userId: user.prismaId },
      include: { payments: { orderBy: { createdAt: "desc" }, take: 5 } },
    });
    if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(site);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const body = await req.json();
    const allowed = [
      "name", "description", "seoTitle", "seoDescription", "seoKeywords",
      "seoOgImage", "primaryColor", "secondaryColor", "fontFamily",
      "whatsappNumber", "tawkToPropertyId", "customDomain", "builderJson",
      "faviconUrl", "logoUrl", "featurePasswordProtection", "featureLiveChat",
    ];
    const data: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in body) data[key] = body[key];
    }

    const site = await prisma.site.updateMany({
      where: { id: params.siteId, userId: user.prismaId },
      data,
    });

    return NextResponse.json({ success: true, updated: site.count });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    await prisma.site.deleteMany({ where: { id: params.siteId, userId: user.prismaId } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
