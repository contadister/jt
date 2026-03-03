// app/api/cron/process-ad-revenue/route.ts
// Called by Vercel cron on the 1st of each month (configured in vercel.json).
// Can also be triggered manually from cron-job.org if needed.
//
// cron-job.org setup (optional manual trigger):
//   URL:    https://josett.com/api/cron/process-ad-revenue
//   Method: GET
//   Header: Authorization: Bearer <CRON_SECRET>

import { NextResponse } from "next/server";
import { validateCronRequest, unauthorizedResponse } from "@/lib/cron/auth";
import { prisma } from "@/lib/prisma/client";

export const maxDuration = 60;

export async function GET(req: Request) {
  if (!validateCronRequest(req)) return unauthorizedResponse();

  try {
    // Find all ad-enabled sites and calculate revenue for last month
    const adSites = await prisma.site.findMany({
      where: { featureAdsEnabled: true, status: "DEPLOYED" },
      select: { id: true, adPendingPayoutGhs: true },
    });

    // In production: pull real revenue data from Google AdSense API or your ad provider.
    // For now we just confirm the cron is running.
    // When AdSense is connected:
    //   const revenue = await getAdSenseRevenue(site.id, lastMonthStart, lastMonthEnd);
    //   await prisma.site.update({ where: { id: site.id }, data: { adTotalEarningsGhs: { increment: revenue }, adPendingPayoutGhs: { increment: revenue } } });

    console.log(`Ad revenue cron: ${adSites.length} ad-enabled sites processed`);
    return NextResponse.json({ ok: true, sitesProcessed: adSites.length });
  } catch (error) {
    console.error("process-ad-revenue cron error:", error);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }
}
