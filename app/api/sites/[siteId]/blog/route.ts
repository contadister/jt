export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";

export async function GET(_req: Request, { params }: { params: { siteId: string } }) {
  const user = await requireUser(req);  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: user.prismaId } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const posts = await prisma.blogPost.findMany({ where: { siteId: site.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ posts });
}

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  const user = await requireUser(req);  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: user.prismaId } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  // Use provided slug or auto-generate from title
  const baseSlug = (body.slug || body.title)
    .toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const slug = baseSlug + "-" + Date.now();

  const post = await prisma.blogPost.create({
    data: {
      siteId: site.id,
      title: body.title,
      slug,
      content: body.content || {},
      excerpt: body.excerpt || null,
      coverImage: body.coverImage || null,
      tags: body.tags || [],
      authorName: body.authorName || null,
      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
      isPublished: body.isPublished || false,
      publishedAt: body.isPublished ? new Date() : null,
    },
  });
  return NextResponse.json({ post });
}
