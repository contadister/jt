// Public API — fetch site info by slug (no auth required)
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const site = await prisma.site.findUnique({
    where: { slug },
    select: { id: true, name: true, slug: true, primaryColor: true, status: true },
  });

  if (!site || site.status === "CANCELLED") {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  return NextResponse.json({ site });
}
