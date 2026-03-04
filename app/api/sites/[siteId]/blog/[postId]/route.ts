export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function PATCH(req: Request, { params }: { params: { siteId: string; postId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: session.user.id } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const allowed = ["title", "content", "excerpt", "coverImage", "isPublished", "tags", "seoTitle", "seoDescription"];
  const data: Record<string, unknown> = {};
  for (const key of allowed) { if (key in body) data[key] = body[key]; }
  if (body.isPublished && !body.publishedAt) data.publishedAt = new Date();

  await prisma.blogPost.updateMany({ where: { id: params.postId, siteId: site.id }, data });
  const post = await prisma.blogPost.findUnique({ where: { id: params.postId } });
  return NextResponse.json({ post });
}

export async function DELETE(_req: Request, { params }: { params: { siteId: string; postId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: session.user.id } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.blogPost.deleteMany({ where: { id: params.postId, siteId: site.id } });
  return NextResponse.json({ success: true });
}
