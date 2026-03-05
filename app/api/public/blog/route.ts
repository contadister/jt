// Public API — no auth required
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const siteSlug = url.searchParams.get("siteSlug");
  const siteId   = url.searchParams.get("siteId");
  const slug     = url.searchParams.get("slug"); // single post by slug

  const site = await prisma.site.findFirst({
    where: siteSlug ? { slug: siteSlug } : { id: siteId! },
    select: { id: true },
  });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (slug) {
    const post = await prisma.blogPost.findFirst({
      where: { siteId: site.id, slug, isPublished: true },
    });
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    // Increment view count
    await prisma.blogPost.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } });
    return NextResponse.json({ post });
  }

  const posts = await prisma.blogPost.findMany({
    where: { siteId: site.id, isPublished: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true, title: true, slug: true, excerpt: true,
      coverImage: true, tags: true, publishedAt: true,
      authorName: true, viewCount: true,
    },
  });

  return NextResponse.json({ posts });
}
