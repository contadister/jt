// app/api/cron/check-renewals/route.ts
// Primary caller: Vercel cron (daily at 8am, configured in vercel.json)
// Optional backup: add to cron-job.org at 8pm UTC for a second daily pass
//
// cron-job.org setup (optional 2nd run):
//   URL:     https://josett.com/api/cron/check-renewals
//   Method:  GET
//   Header:  Authorization: Bearer <CRON_SECRET>
//   Schedule: Every day at 20:00

import { NextResponse } from "next/server";
import { validateCronRequest, unauthorizedResponse } from "@/lib/cron/auth";
import { prisma } from "@/lib/prisma/client";
import {
  sendRenewalReminderEmail,
  sendSiteExpiredEmail,
} from "@/lib/arkesel/client";
import Vercel from "@/lib/vercel/client";

export const maxDuration = 60;

export async function GET(req: Request) {
  if (!validateCronRequest(req)) return unauthorizedResponse();

  const now = new Date();
  const results = {
    reminders7d: 0,
    reminders3d: 0,
    reminders1d: 0,
    suspended: 0,
    errors: 0,
  };

  try {
    const sites = await prisma.site.findMany({
      where: {
        status: { in: ["DEPLOYED", "SUSPENDED"] },
        subscriptionEnd: { not: null },
      },
      include: { user: { select: { email: true, fullName: true } } },
    });

    for (const site of sites) {
      try {
        if (!site.subscriptionEnd) continue;

        const daysLeft = Math.ceil(
          (site.subscriptionEnd.getTime() - now.getTime()) / 86400000
        );
        const renewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/sites/${site.id}/billing`;

        if (daysLeft <= 7 && daysLeft > 3 && !site.reminderSent7d) {
          await sendRenewalReminderEmail(site.user.email, site.user.fullName, site.name, daysLeft, site.monthlyPriceGhs, renewUrl);
          await prisma.site.update({ where: { id: site.id }, data: { reminderSent7d: true } });
          results.reminders7d++;
        }

        if (daysLeft <= 3 && daysLeft > 1 && !site.reminderSent3d) {
          await sendRenewalReminderEmail(site.user.email, site.user.fullName, site.name, daysLeft, site.monthlyPriceGhs, renewUrl);
          await prisma.site.update({ where: { id: site.id }, data: { reminderSent3d: true } });
          results.reminders3d++;
        }

        if (daysLeft <= 1 && daysLeft > 0 && !site.reminderSent1d) {
          await sendRenewalReminderEmail(site.user.email, site.user.fullName, site.name, daysLeft, site.monthlyPriceGhs, renewUrl);
          await prisma.site.update({ where: { id: site.id }, data: { reminderSent1d: true } });
          results.reminders1d++;
        }

        if (daysLeft <= 0 && site.status === "DEPLOYED") {
          if (site.vercelProjectId) await Vercel.suspendProject(site.vercelProjectId).catch(console.error);
          await prisma.site.update({ where: { id: site.id }, data: { status: "SUSPENDED", reminderSentExp: true } });
          await sendSiteExpiredEmail(site.user.email, site.user.fullName, site.name, renewUrl).catch(console.error);
          results.suspended++;
        }
      } catch (e) {
        console.error(`Site ${site.id} error:`, e);
        results.errors++;
      }
    }

    console.log("Renewal check complete:", results);
    return NextResponse.json({ ok: true, ...results });
  } catch (error) {
    console.error("check-renewals cron error:", error);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }
}
