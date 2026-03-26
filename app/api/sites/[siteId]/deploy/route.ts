// app/api/sites/[siteId]/deploy/route.ts
// Deploys a beautiful static HTML site directly to Vercel — no GitHub needed.
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { buildPageHtml } from "@/lib/renderer";
import { sendSiteDeployedEmail } from "@/lib/nalo/client";
import type { BuilderJSON, BuilderPage } from "@/lib/types/builder";

const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

function tq(sep = "?") {
  return VERCEL_TEAM_ID ? `${sep}teamId=${VERCEL_TEAM_ID}` : "";
}

async function vReq<T>(path: string, method = "GET", body?: unknown): Promise<T> {
  const res = await fetch(`https://api.vercel.com${path}`, {
    method,
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Vercel ${method} ${path} → ${res.status}: ${err.slice(0, 400)}`);
  }
  return res.json() as Promise<T>;
}

async function getOrCreateProject(name: string): Promise<{ id: string }> {
  try {
    return await vReq<{ id: string }>(`/v9/projects/${name}${tq()}`);
  } catch {
    return vReq<{ id: string }>(`/v9/projects${tq()}`, "POST", { name, framework: null });
  }
}

function notFoundHtml(siteName: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404 – ${siteName}</title>
<style>body{font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0f172a;color:#fff;text-align:center;margin:0}
.n{font-size:6rem;font-weight:900;color:#6272f1}p{color:#94a3b8;margin-top:12px}a{color:#6272f1;font-weight:700;text-decoration:none}</style>
</head><body><div><div class="n">404</div><p>Page not found.</p><p><a href="/">← Back to home</a></p></div></body></html>`;
}

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  const internalSecret = req.headers.get("x-internal-secret");
  const isInternal = internalSecret && internalSecret === process.env.CRON_SECRET;

  let site;
  if (isInternal) {
    site = await prisma.site.findFirst({ where: { id: params.siteId }, include: { user: true } });
  } else {
    const user = await requireUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    site = await prisma.site.findFirst({
      where: { id: params.siteId, userId: user.prismaId },
      include: { user: true },
    });
  }

  try {
    if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });
    if (!site.builderJson) return NextResponse.json({ error: "No content yet — add sections in the builder first" }, { status: 400 });

    const builderJson = site.builderJson as unknown as BuilderJSON;
    const projectName = `josett-${site.slug}`;

    // 1. Generate static HTML for every page
    const files: { file: string; data: string }[] = [];
    for (const page of builderJson.pages || []) {
      const html = buildPageHtml(page as BuilderPage, builderJson, site.id, site.featureAdsEnabled ?? false, {
        whatsappNumber: (site as Record<string,unknown>).whatsappNumber as string | null ?? null,
        featureLiveChat: site.featureLiveChat ?? false,
        tawkToPropertyId: (site as Record<string,unknown>).tawkToPropertyId as string | null ?? null,
      });
      const filePath = page.slug === "/" ? "index.html" : `${page.slug.replace(/^\/+/, "")}/index.html`;
      files.push({ file: filePath, data: html });
    }
    files.push({ file: "404.html", data: notFoundHtml(site.name) });
    files.push({ file: "vercel.json", data: JSON.stringify({ version: 2, routes: [{ handle: "filesystem" }, { src: "/(.*)", dest: "/404.html", status: 404 }] }) });

    // 2. Get or create Vercel project
    let vercelProjectId = site.vercelProjectId;
    if (!vercelProjectId) {
      const project = await getOrCreateProject(projectName);
      vercelProjectId = project.id;
    }

    // 3. Deploy directly — no GitHub, no build step
    const deployment = await vReq<{ id: string; url: string; alias?: string[] }>(
      `/v13/deployments${tq()}`, "POST",
      { name: projectName, files, target: "production", projectSettings: { framework: null } }
    );

    const deployUrl = deployment.url || deployment.alias?.[0] || "";
    const vercelDomain = site.vercelDomain || (deployUrl.includes("vercel.app") ? deployUrl : null);

    // 4. Custom domain
    if (site.customDomain && site.featureCustomDomain && vercelProjectId) {
      try {
        await vReq(`/v10/projects/${vercelProjectId}/domains${tq()}`, "POST", { name: site.customDomain });
      } catch { /* cron will retry */ }
    }

    const liveUrl = site.customDomain && site.customDomainVerified
      ? `https://${site.customDomain}`
      : vercelDomain ? `https://${vercelDomain}` : `https://${deployUrl}`;

    // 5. Save
    await prisma.site.update({
      where: { id: site.id },
      data: {
        vercelProjectId,
        vercelDeploymentUrl: `https://${deployment.url}`,
        vercelDomain: vercelDomain ?? undefined,
        status: "DEPLOYED",
        lastDeployedAt: new Date(),
      },
    });

    // 6. Notify
    await sendSiteDeployedEmail(site.user.email, site.user.fullName, site.name, liveUrl).catch(console.error);
    await prisma.notification.create({
      data: { userId: site.userId, siteId: site.id, type: "DEPLOYED", title: `${site.name} is live!`, message: `Your website is now live at ${liveUrl}`, actionUrl: liveUrl },
    });

    return NextResponse.json({ success: true, url: liveUrl, deploymentId: deployment.id });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[deploy]", msg);
    await prisma.site.update({ where: { id: params.siteId }, data: { status: "BUILDING" } }).catch(() => {});
    return NextResponse.json({ error: "Deployment failed", detail: msg }, { status: 500 });
  }
}
