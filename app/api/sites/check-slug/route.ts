import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";

  if (!slug || slug.length < 3) {
    return NextResponse.json({ available: false });
  }

  const existing = await prisma.site.findUnique({ where: { slug } });
  return NextResponse.json({ available: !existing });
}
