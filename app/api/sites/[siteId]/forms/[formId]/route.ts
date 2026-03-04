export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

async function getSite(siteId: string, userId: string) {
  return prisma.site.findFirst({ where: { id: siteId, userId } });
}

export async function PATCH(req: Request, { params }: { params: { siteId: string; formId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const site = await getSite(params.siteId, session.user.id);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { isRead } = await req.json();
  await prisma.formSubmission.updateMany({ where: { id: params.formId, siteId: site.id }, data: { isRead } });
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: Request, { params }: { params: { siteId: string; formId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const site = await getSite(params.siteId, session.user.id);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.formSubmission.deleteMany({ where: { id: params.formId, siteId: site.id } });
  return NextResponse.json({ success: true });
}
