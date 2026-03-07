export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";

export async function POST(
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const { builderJson } = await req.json();
    if (!builderJson) return NextResponse.json({ error: "Missing builderJson" }, { status: 400 });

    const updated = await prisma.site.updateMany({
      where: { id: params.siteId, userId: user.prismaId },
      data: { builderJson },
    });

    if (updated.count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
