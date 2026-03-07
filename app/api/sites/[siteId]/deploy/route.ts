// app/api/sites/[siteId]/deploy/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { requireSite } from "@/lib/auth/requireSite";
import { createSiteRepo, pushFilesToRepo } from "@/lib/github/client";
import {
  createVercelProject,
  triggerDeployment,
  getVercelDomain,
  addDomainToProject,
} from "@/lib/vercel/client";
import { generateSiteCode } from "@/lib/builder/code-generator";
import { sendSiteDeployedEmail } from "@/lib/nalo/client";

export async function POST(
  _req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const site = await prisma.site.findFirst({
      where: { id: params.siteId, userId: user.prismaId },
      include: { user: true },
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    if (!site.builderJson) {
      return NextResponse.json(
        { error: "Site has no content yet" },
        { status: 400 }
      );
    }

    // 1. Generate site code from builder JSON
    const files = generateSiteCode(
      site.builderJson as unknown as Parameters<typeof generateSiteCode>[0],
      {
        siteId: site.id,
        siteName: site.name,
        features: {
          featureEcommerce: site.featureEcommerce,
          featureBlog: site.featureBlog,
          featureBooking: site.featureBooking,
          featureContactForm: site.featureContactForm,
          featureSeoTools: site.featureSeoTools,
          featureAnalytics: site.featureAnalytics,
          featureNewsletter: site.featureNewsletter,
          featureRestaurantMenu: site.featureRestaurantMenu,
          featureGoogleMaps: site.featureGoogleMaps,
          featureCustomDomain: site.featureCustomDomain,
          featureLiveChat: site.featureLiveChat,
          featurePushNotifications: site.featurePushNotifications,
          featureWhatsappButton: site.featureWhatsappButton,
          featureEventTicketing: site.featureEventTicketing,
          featureSiteSearch: site.featureSiteSearch,
        },
        adsEnabled: site.featureAdsEnabled,        // ← correct field name
        userPaystackKey: site.userPaystackPublicKey ?? undefined,
        primaryColor: site.primaryColor,
        secondaryColor: site.secondaryColor,
        fontFamily: site.fontFamily,
      }
    );

    let githubRepoName = site.githubRepoName;
    let vercelProjectId = site.vercelProjectId;
    const projectName = `josett-${site.slug}`;

    // 2. Create GitHub repo (first deploy only)
    if (!githubRepoName) {
      const repo = await createSiteRepo(site.id, site.name);
      githubRepoName = repo.repoName;
      await prisma.site.update({
        where: { id: site.id },
        data: { githubRepoUrl: repo.repoUrl, githubRepoName },
      });
    }

    // 3. Push files to GitHub
    await pushFilesToRepo(githubRepoName, files);

    // 4. Create Vercel project (first deploy only)
    if (!vercelProjectId) {
      const project = await createVercelProject(
        projectName,                   // projectName
        githubRepoName,                // repoName
        process.env.GITHUB_ORG!        // githubOrg
      );
      vercelProjectId = project.id;
    }

    // 5. Trigger deployment
    const deployment = await triggerDeployment(vercelProjectId);

    // 6. Get the auto-assigned Vercel domain
    let vercelDomain = site.vercelDomain;
    if (!vercelDomain) {
      vercelDomain = await getVercelDomain(vercelProjectId);  // ← async, awaited
    }

    // 7. Handle custom domain if feature is enabled
    if (site.customDomain && site.featureCustomDomain) {
      try {
        await addDomainToProject(vercelProjectId, site.customDomain);
      } catch {
        // DNS not propagated yet — check-domains cron will retry
      }
    }

    // 8. Determine live URL
    const liveUrl =
      site.customDomain && site.customDomainVerified
        ? `https://${site.customDomain}`
        : vercelDomain
        ? `https://${vercelDomain}`
        : `https://${deployment.url}`;

    // 9. Update site record
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

    // 10. Send deployed email
    await sendSiteDeployedEmail(
      site.user.email,
      site.user.fullName,
      site.name,
      liveUrl
    ).catch(console.error);

    // 11. In-app notification
    await prisma.notification.create({
      data: {
        userId: site.userId,
        siteId: site.id,
        type: "DEPLOYED",
        title: `${site.name} is live!`,
        message: `Your website is now live at ${liveUrl}`,
        actionUrl: liveUrl,
      },
    });

    return NextResponse.json({ success: true, url: liveUrl, deploymentId: deployment.id });
  } catch (error) {
    console.error("Deploy error:", error);

    await prisma.site.update({
      where: { id: params.siteId },
      data: { status: "BUILDING" },
    }).catch(() => undefined);

    return NextResponse.json({ error: "Deployment failed" }, { status: 500 });
  }
}
