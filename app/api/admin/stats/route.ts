export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { subDays } from "date-fns";

async function assertAdmin(req: Request) {
  // Try Bearer token first (sent by client), fall back to cookie session
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  let userId: string | null = null;
  if (token) {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser(token);
    userId = user?.id ?? null;
  } else {
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    userId = session?.user?.id ?? null;
  }

  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  return user?.role === "ADMIN" ? userId : null;
}

export async function GET(req: Request) {
  const adminId = await assertAdmin(req);
  if (!adminId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

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
