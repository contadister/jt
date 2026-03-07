export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";

async function getAuthedSite(siteId: string, userId: string) {
  return prisma.site.findFirst({ where: { id: siteId, userId } });
}

export async function GET(_req: Request, { params }: { params: { siteId: string; postId: string } }) {
  const user = await requireUser(req);  const site = await getAuthedSite(params.siteId, user.prismaId);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const post = await prisma.blogPost.findFirst({ where: { id: params.postId, siteId: site.id } });
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(req: Request, { params }: { params: { siteId: string; postId: string } }) {
  const user = await requireUser(req);  const site = await getAuthedSite(params.siteId, user.prismaId);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const allowed = ["title", "slug", "content", "excerpt", "coverImage", "isPublished", "tags", "seoTitle", "seoDescription", "authorName"];
  const data: Record<string, unknown> = {};
  for (const key of allowed) { if (key in body) data[key] = body[key]; }
  if (body.isPublished && !body.publishedAt) data.publishedAt = new Date();
  if (body.isPublished === false) data.publishedAt = null;

  await prisma.blogPost.updateMany({ where: { id: params.postId, siteId: site.id }, data });
  const post = await prisma.blogPost.findUnique({ where: { id: params.postId } });
  return NextResponse.json({ success: true, post });
}

export async function DELETE(_req: Request, { params }: { params: { siteId: string; postId: string } }) {
  const user = await requireUser(req);  const site = await getAuthedSite(params.siteId, user.prismaId);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.blogPost.deleteMany({ where: { id: params.postId, siteId: site.id } });
  return NextResponse.json({ success: true });
}
