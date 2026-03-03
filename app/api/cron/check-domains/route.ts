// app/api/cron/check-domains/route.ts
// Called by cron-job.org every 2 hours.
//
// cron-job.org setup:
//   URL:     https://josett.com/api/cron/check-domains
//   Method:  GET
//   Header:  Authorization: Bearer <CRON_SECRET>
//   Schedule: Every 2 hours

import { NextResponse } from "next/server";
import { validateCronRequest, unauthorizedResponse } from "@/lib/cron/auth";
import { prisma } from "@/lib/prisma/client";
import Vercel from "@/lib/vercel/client";

export const maxDuration = 60; // seconds

export async function GET(req: Request) {
  if (!validateCronRequest(req)) return unauthorizedResponse();

  const results = { checked: 0, activated: 0, errors: 0 };

  try {
    // Find sites with a pending custom domain that hasn't been verified yet
    const sites = await prisma.site.findMany({
      where: {
        featureCustomDomain: true,
        customDomain: { not: null },
        customDomainVerified: false,
        status: "DEPLOYED",
      },
      select: {
        id: true,
        customDomain: true,
        vercelProjectId: true,
        user: { select: { email: true, fullName: true } },
      },
    });

    results.checked = sites.length;

    for (const site of sites) {
      try {
        if (!site.customDomain || !site.vercelProjectId) continue;

        // Check DNS propagation via Vercel API
        const domainStatus = await Vercel.getDomainStatus(
          site.vercelProjectId,
          site.customDomain
        );

        if (domainStatus.verified) {
          await prisma.site.update({
            where: { id: site.id },
            data: { customDomainVerified: true },
          });
          results.activated++;

          // Notify user their domain is live
          // (import sendEmail from arkesel if you want a notification here)
          console.log(`✅ Domain verified for site ${site.id}: ${site.customDomain}`);
        }
      } catch (siteError) {
        console.error(`Error checking domain for site ${site.id}:`, siteError);
        results.errors++;
      }
    }

    console.log("Domain check complete:", results);
    return NextResponse.json({ ok: true, ...results });
  } catch (error) {
    console.error("check-domains cron error:", error);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }
}
