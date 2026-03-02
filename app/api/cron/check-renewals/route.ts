// app/api/cron/check-renewals/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  sendRenewalReminderEmail,
  sendRenewalReminderSMS,
  sendSiteExpiredEmail,
} from "@/lib/arkesel/client";

const prisma = new PrismaClient();

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export async function GET() {
  const now = new Date();

  try {
    const activeSites = await prisma.site.findMany({
      where: { status: "DEPLOYED" },
      include: { user: true },
    });

    let processed = 0;

    for (const site of activeSites) {
      if (!site.subscriptionEnd || !site.user) continue;

      const end = new Date(site.subscriptionEnd);
      const in7 = addDays(now, 7);
      const in3 = addDays(now, 3);
      const in1 = addDays(now, 1);

      const renewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/sites/${site.id}/billing`;

      // 7-day reminder
      if (!site.renewalReminderSent7d && isSameDay(end, in7)) {
        await Promise.allSettled([
          sendRenewalReminderEmail(site.user.email, site.user.fullName, site.name, 7, renewUrl, site.discountedPriceGhs ?? site.monthlyPriceGhs),
          site.user.phone && site.user.notifySms
            ? sendRenewalReminderSMS(site.user.phone, site.name, 7)
            : Promise.resolve(),
        ]);
        await prisma.site.update({ where: { id: site.id }, data: { renewalReminderSent7d: true } });
        await createNotification(site.userId, site.id, "RENEWAL_7D", site.name, 7, renewUrl);
        processed++;
      }

      // 3-day reminder
      if (!site.renewalReminderSent3d && isSameDay(end, in3)) {
        await Promise.allSettled([
          sendRenewalReminderEmail(site.user.email, site.user.fullName, site.name, 3, renewUrl, site.discountedPriceGhs ?? site.monthlyPriceGhs),
          site.user.phone && site.user.notifySms
            ? sendRenewalReminderSMS(site.user.phone, site.name, 3)
            : Promise.resolve(),
        ]);
        await prisma.site.update({ where: { id: site.id }, data: { renewalReminderSent3d: true } });
        await createNotification(site.userId, site.id, "RENEWAL_3D", site.name, 3, renewUrl);
        processed++;
      }

      // 1-day reminder
      if (!site.renewalReminderSent1d && isSameDay(end, in1)) {
        await Promise.allSettled([
          sendRenewalReminderEmail(site.user.email, site.user.fullName, site.name, 1, renewUrl, site.discountedPriceGhs ?? site.monthlyPriceGhs),
          site.user.phone && site.user.notifySms
            ? sendRenewalReminderSMS(site.user.phone, site.name, 1)
            : Promise.resolve(),
        ]);
        await prisma.site.update({ where: { id: site.id }, data: { renewalReminderSent1d: true } });
        await createNotification(site.userId, site.id, "RENEWAL_1D", site.name, 1, renewUrl);
        processed++;
      }

      // Expired
      if (end < now && !site.renewalReminderSentExpired) {
        await prisma.site.update({
          where: { id: site.id },
          data: { status: "EXPIRED", renewalReminderSentExpired: true },
        });

        await Promise.allSettled([
          sendSiteExpiredEmail(site.user.email, site.user.fullName, site.name),
          site.user.phone && site.user.notifySms
            ? sendRenewalReminderSMS(site.user.phone, site.name, 0)
            : Promise.resolve(),
        ]);

        await createNotification(site.userId, site.id, "EXPIRED", site.name, 0, renewUrl);
        processed++;
      }
    }

    // Clean up data for sites expired more than 30 days ago
    const thirtyDaysAgo = addDays(now, -30);
    await prisma.analyticsEvent.deleteMany({
      where: {
        site: { status: "EXPIRED", subscriptionEnd: { lt: thirtyDaysAgo } },
      },
    });

    return NextResponse.json({ success: true, processed, checked: activeSites.length });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

async function createNotification(
  userId: string,
  siteId: string,
  type: "RENEWAL_7D" | "RENEWAL_3D" | "RENEWAL_1D" | "EXPIRED",
  siteName: string,
  daysLeft: number,
  actionUrl: string
) {
  const messages: Record<string, { title: string; message: string }> = {
    RENEWAL_7D: {
      title: `"${siteName}" expires in 7 days`,
      message: `Your website "${siteName}" subscription expires in 7 days. Renew now to keep it live.`,
    },
    RENEWAL_3D: {
      title: `"${siteName}" expires in 3 days`,
      message: `Urgent: Your website "${siteName}" expires in 3 days. Renew now!`,
    },
    RENEWAL_1D: {
      title: `"${siteName}" expires TOMORROW`,
      message: `Last chance! Your website "${siteName}" expires tomorrow. Renew immediately.`,
    },
    EXPIRED: {
      title: `"${siteName}" has gone offline`,
      message: `Your website "${siteName}" subscription has expired. Renew within 30 days to restore your site.`,
    },
  };

  const msg = messages[type];
  if (!msg) return;

  void daysLeft;

  await prisma.notification.create({
    data: {
      userId,
      siteId,
      type,
      title: msg.title,
      message: msg.message,
      actionUrl,
    },
  });
}
