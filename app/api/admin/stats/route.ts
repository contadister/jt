export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { subDays } from "date-fns";

async function assertAdmin(supabase: ReturnType<typeof createServerClient>) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  return user?.role === "ADMIN" ? session : null;
}

export async function GET() {
  const supabase = createServerClient();
  const session = await assertAdmin(supabase);
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const since30d = subDays(new Date(), 30);

  const [
    totalUsers, newUsers30d,
    totalSites, activeSites, expiredSites,
    totalPayments, revenue30d,
    totalRevenue,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: since30d } } }),
    prisma.site.count(),
    prisma.site.count({ where: { status: "DEPLOYED" } }),
    prisma.site.count({ where: { status: "EXPIRED" } }),
    prisma.payment.count({ where: { status: "SUCCESS" } }),
    prisma.payment.aggregate({ where: { status: "SUCCESS", createdAt: { gte: since30d } }, _sum: { amountGhs: true } }),
    prisma.payment.aggregate({ where: { status: "SUCCESS" }, _sum: { amountGhs: true } }),
  ]);

  // Daily signups last 30 days
  const usersByDay = await prisma.$queryRaw<{ date: string; count: number }[]>`
    SELECT DATE(created_at)::text as date, COUNT(*)::int as count
    FROM users
    WHERE created_at >= ${since30d}
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
  `;

  // Revenue by day last 30 days
  const revenueByDay = await prisma.$queryRaw<{ date: string; total: number }[]>`
    SELECT DATE(created_at)::text as date, SUM(amount_ghs)::float as total
    FROM payments
    WHERE status = 'SUCCESS' AND created_at >= ${since30d}
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
  `;

  // Site type breakdown
  const sitesByType = await prisma.site.groupBy({ by: ["siteType"], _count: true });

  return NextResponse.json({
    users: { total: totalUsers, new30d: newUsers30d, byDay: usersByDay },
    sites: { total: totalSites, active: activeSites, expired: expiredSites, byType: sitesByType },
    revenue: {
      total: totalRevenue._sum.amountGhs || 0,
      last30d: revenue30d._sum.amountGhs || 0,
      totalPayments,
      byDay: revenueByDay,
    },
  });
}
