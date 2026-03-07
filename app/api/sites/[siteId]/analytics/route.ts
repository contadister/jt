export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";
import { subDays, format, eachDayOfInterval } from "date-fns";

export async function GET(
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get("days") || "30");
    const since = subDays(new Date(), days);

    const site = await prisma.site.findFirst({
      where: { id: params.siteId, userId: user.prismaId },
      select: { id: true, totalVisits: true },
    });
    if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const events = await prisma.analyticsEvent.findMany({
      where: { siteId: site.id, createdAt: { gte: since } },
      select: { pagePath: true, referrer: true, country: true, device: true, sessionId: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Daily visits
    const dateRange = eachDayOfInterval({ start: since, end: new Date() });
    const visitsByDay: Record<string, number> = {};
    dateRange.forEach((d) => { visitsByDay[format(d, "MMM d")] = 0; });
    events.forEach((e) => {
      const key = format(e.createdAt, "MMM d");
      if (visitsByDay[key] !== undefined) visitsByDay[key]++;
    });
    const dailyVisits = Object.entries(visitsByDay).map(([date, visits]) => ({ date, visits }));

    // Page views
    const pageMap: Record<string, number> = {};
    events.forEach((e) => { pageMap[e.pagePath || "/"] = (pageMap[e.pagePath || "/"] || 0) + 1; });
    const pageViews = Object.entries(pageMap)
      .sort((a, b) => b[1] - a[1])
      .map(([path, views]) => ({ path, views }));

    // Referrers
    const refMap: Record<string, number> = {};
    events.forEach((e) => {
      const src = e.referrer ? new URL(e.referrer).hostname.replace("www.", "") : "Direct";
      refMap[src] = (refMap[src] || 0) + 1;
    });
    const referrers = Object.entries(refMap).sort((a, b) => b[1] - a[1]).map(([source, visits]) => ({ source, visits }));

    // Devices
    const devMap: Record<string, number> = {};
    events.forEach((e) => { devMap[e.device || "unknown"] = (devMap[e.device || "unknown"] || 0) + 1; });
    const devices = Object.entries(devMap).sort((a, b) => b[1] - a[1]).map(([device, count]) => ({ device, count }));

    // Countries
    const countryMap: Record<string, number> = {};
    events.forEach((e) => { countryMap[e.country || "Unknown"] = (countryMap[e.country || "Unknown"] || 0) + 1; });
    const countries = Object.entries(countryMap).sort((a, b) => b[1] - a[1]).map(([country, visits]) => ({ country, visits }));

    // Unique sessions
    const uniqueSessions = new Set(events.map((e) => e.sessionId)).size;

    return NextResponse.json({
      totalVisits: site.totalVisits,
      uniqueSessions,
      pageViews,
      dailyVisits,
      referrers,
      devices,
      countries,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
