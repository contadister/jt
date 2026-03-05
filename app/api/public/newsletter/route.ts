// Public API — no auth required. Called from deployed user sites.
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma/client";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = rateLimit(ip, { limit: 10, windowMs: 60_000 });
    if (!rl.ok) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

    const { siteId, email, name } = await req.json();
    if (!siteId || !email) {
      return NextResponse.json({ error: "siteId and email required" }, { status: 400 });
    }

    const site = await prisma.site.findUnique({ where: { id: siteId } });
    if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

    // Upsert — re-subscribing reactivates
    await prisma.newsletterSubscriber.upsert({
      where: { siteId_email: { siteId, email: email.toLowerCase() } },
      create: { siteId, email: email.toLowerCase(), name: name || null, isConfirmed: true },
      update: { isConfirmed: true, name: name || undefined },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

// Unsubscribe via GET with token
export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const siteId = url.searchParams.get("siteId");
  if (!email || !siteId) return NextResponse.json({ error: "Missing params" }, { status: 400 });

  await prisma.newsletterSubscriber.updateMany({
    where: { siteId, email: email.toLowerCase() },
    data: { isConfirmed: false },
  });

  return new Response("<html><body style='font-family:sans-serif;text-align:center;padding:80px'><h2>You've been unsubscribed.</h2><p>You won't receive further emails.</p></body></html>", {
    headers: { "Content-Type": "text/html" },
  });
}
