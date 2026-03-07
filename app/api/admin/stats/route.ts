export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { subDays } from "date-fns";

export async function GET(req: Request) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({ where: { id: user.prismaId }, select: { role: true } });
    if (dbUser?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const since30d = subDays(new Date(), 30);

    const [
      totalUsers, newUsers30d,
      totalSites, activeSites, expiredSites,
      totalPayments, revenue30d, totalRevenue,
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

    const usersByDay = await prisma.$queryRaw<{ date: string; count: number }[]>`
      SELECT DATE(created_at)::text as date, COUNT(*)::int as count
      FROM users WHERE created_at >= ${since30d}
      GROUP BY DATE(created_at) ORDER BY DATE(created_at)
    `;

    const revenueByDay = await prisma.$queryRaw<{ date: string; total: number }[]>`
      SELECT DATE(created_at)::text as date, SUM(amount_ghs)::float as total
      FROM payments WHERE status = 'SUCCESS' AND created_at >= ${since30d}
      GROUP BY DATE(created_at) ORDER BY DATE(created_at)
    `;

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
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return NextResponse.json({ error: "Server error", detail: String(error) }, { status: 500 });
  }
}
