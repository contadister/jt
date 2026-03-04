export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(_req: Request, { params }: { params: { siteId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: session.user.id } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const posts = await prisma.blogPost.findMany({ where: { siteId: site.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ posts });
}

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const site = await prisma.site.findFirst({ where: { id: params.siteId, userId: session.user.id } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const slug = body.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();
  const post = await prisma.blogPost.create({
    data: {
      siteId: site.id,
      title: body.title,
      slug,
      content: body.content || {},
      excerpt: body.excerpt || null,
      coverImage: body.coverImage || null,
      tags: body.tags || [],
      isPublished: false,
    },
  });
  return NextResponse.json({ post });
}
