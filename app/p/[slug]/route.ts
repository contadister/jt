// app/sites/[slug]/route.ts
// Serves complete HTML pages for live user websites.
// Accessible at: /sites/[slug] and /sites/[slug]?page=/about etc.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { buildPageHtml } from "@/lib/renderer";
import type { BuilderJSON } from "@/lib/types/builder";

export const dynamic = "force-dynamic";

interface Context { params: { slug: string } }

async function handler(req: Request, { params }: Context) {
  const url = new URL(req.url);
  const pageSlug = url.searchParams.get("page") || "/";

  const site = await prisma.site.findFirst({
    where: { slug: params.slug, status: "DEPLOYED" },
  });

  if (!site) {
    return new NextResponse(notFoundHtml(params.slug), {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Fire-and-forget analytics
  prisma.analyticsEvent.create({
    data: {
      siteId: site.id,
      eventType: "pageview",
      pagePath: pageSlug,
      referrer: req.headers.get("referer") || null,
      device: /mobile|android|iphone/i.test(req.headers.get("user-agent") || "") ? "mobile" : "desktop",
      country: req.headers.get("x-vercel-ip-country") || null,
    },
  }).catch(() => undefined);

  prisma.site.update({
    where: { id: site.id },
    data: { totalVisits: { increment: 1 } },
  }).catch(() => undefined);

  const builderJson = site.builderJson as BuilderJSON | null;

  if (!builderJson?.pages?.length) {
    return new NextResponse(comingSoonHtml(site.name, site.slug), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const normalSlug = pageSlug === "/" ? "/" : `/${pageSlug.replace(/^\//, "")}`;
  const page =
    normalSlug === "/"
      ? builderJson.pages.find((p) => p.isHomePage) || builderJson.pages[0]
      : builderJson.pages.find((p) => p.slug === normalSlug);

  if (!page) {
    return new NextResponse(notFoundHtml(params.slug), {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const html = buildPageHtml(page, builderJson, site.id);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}

export const GET = handler;

// ── HTML helpers ──────────────────────────────────────────────

function comingSoonHtml(name: string, slug: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:20px}
h1{font-size:clamp(2rem,5vw,3rem);font-weight:800;margin-bottom:12px}p{color:#94a3b8;font-size:1.1rem}
.badge{display:inline-block;background:#6272f1;color:#fff;padding:6px 16px;border-radius:50px;font-size:0.8rem;font-weight:700;margin-bottom:20px;letter-spacing:1px}
</style></head>
<body><div><div class="badge">COMING SOON</div><h1>${escHtml(name)}</h1><p>This website is currently being built. Check back soon!</p></div></body></html>`;
}

function notFoundHtml(slug: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>404 – Not Found</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center}
h1{font-size:5rem;font-weight:800;color:#6272f1}h2{margin-top:12px;font-size:1.5rem}p{color:#94a3b8;margin-top:8px}a{color:#6272f1}
</style></head>
<body><div><h1>404</h1><h2>Page Not Found</h2><p>The page you're looking for doesn't exist.</p><p style="margin-top:20px"><a href="/p/${escHtml(slug)}">Go to homepage →</a></p></div></body></html>`;
}

function escHtml(s: string): string {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
