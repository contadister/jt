export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma/client";

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const original = await prisma.site.findFirst({
    where: { id: params.siteId, userId: user.id },
  });
  if (!original) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const newSlug = `${original.slug}-copy-${Date.now().toString(36)}`;

  const duplicate = await prisma.site.create({
    data: {
      userId: user.id,
      name: `${original.name} (Copy)`,
      slug: newSlug,
      siteType: original.siteType,
      status: "BUILDING",
      monthlyPriceGhs: original.monthlyPriceGhs,
      builderJson: original.builderJson ?? undefined,
      primaryColor: original.primaryColor,
      secondaryColor: original.secondaryColor,
      fontFamily: original.fontFamily,
    },
  });

  return NextResponse.json({ siteId: duplicate.id, slug: duplicate.slug });
}
