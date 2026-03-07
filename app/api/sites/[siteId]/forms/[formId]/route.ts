export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";

async function getSite(siteId: string, userId: string) {
  return prisma.site.findFirst({ where: { id: siteId, userId } });
}

export async function PATCH(req: Request, { params }: { params: { siteId: string; formId: string } }) {
  const user = await requireUser(req);  const site = await getSite(params.siteId, user.prismaId);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { isRead } = await req.json();
  await prisma.formSubmission.updateMany({ where: { id: params.formId, siteId: site.id }, data: { isRead } });
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: Request, { params }: { params: { siteId: string; formId: string } }) {
  const user = await requireUser(req);  const site = await getSite(params.siteId, user.prismaId);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.formSubmission.deleteMany({ where: { id: params.formId, siteId: site.id } });
  return NextResponse.json({ success: true });
}
