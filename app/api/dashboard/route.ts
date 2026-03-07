export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/requireUser";
import { prisma } from "@/lib/prisma/client";
import { addDays } from "date-fns";

export async function GET() {
  const user = await requireUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    

    const sites = await prisma.site.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        siteType: true,
        monthlyPriceGhs: true,
        subscriptionEnd: true,
        vercelDeploymentUrl: true,
        vercelDomain: true,
        totalVisits: true,
        updatedAt: true,
      },
    });

    const now = new Date();
    const sevenDaysFromNow = addDays(now, 7);

    const totalVisits = sites.reduce((sum, s) => sum + s.totalVisits, 0);
    const activeSites = sites.filter((s) => s.status === "DEPLOYED").length;
    const expiringSoon = sites.filter(
      (s) =>
        s.subscriptionEnd &&
        new Date(s.subscriptionEnd) > now &&
        new Date(s.subscriptionEnd) <= sevenDaysFromNow
    ).length;

    return NextResponse.json({
      totalSites: sites.length,
      activeSites,
      expiringSoon,
      totalVisits,
      recentSites: sites.slice(0, 6).map((s) => ({
        ...s,
        subscriptionEnd: s.subscriptionEnd?.toISOString() ?? null,
        updatedAt: s.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
