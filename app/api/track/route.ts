import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma/client";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = rateLimit(ip, { limit: 60, windowMs: 60_000 });
    if (!rl.ok) return NextResponse.json({ ok: false }, { status: 429 });
    const body = await req.json();
    const { siteId, eventType, pagePath, referrer, sessionId } = body;

    if (!siteId || !eventType) {
      return NextResponse.json({ error: "Missing siteId or eventType" }, { status: 400 });
    }

    // Parse device + country from headers
    const ua = req.headers.get("user-agent") || "";
    const device = /mobile|android|iphone|ipad/i.test(ua) ? "mobile" : "desktop";
    const country = req.headers.get("x-vercel-ip-country") ||
                    req.headers.get("cf-ipcountry") || null;
    const city    = req.headers.get("x-vercel-ip-city") || null;

    await prisma.analyticsEvent.create({
      data: {
        siteId,
        eventType,
        pagePath: pagePath || "/",
        referrer: referrer || null,
        sessionId: sessionId || null,
        device,
        country,
        city,
      },
    });

    // Increment total visit counter on pageview
    if (eventType === "pageview") {
      await prisma.site.updateMany({
        where: { id: siteId },
        data: { totalVisits: { increment: 1 } },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Silently fail — never break a user's site over analytics
    return NextResponse.json({ ok: false });
  }
}
