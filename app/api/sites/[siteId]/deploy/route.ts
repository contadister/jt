// app/api/sites/[siteId]/deploy/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
import { createSiteRepo, pushFilesToRepo } from "@/lib/github/client";
import { createVercelProject, triggerDeployment, getVercelDomain, addDomainToProject } from "@/lib/vercel/client";
import { generateSiteCode } from "@/lib/builder/code-generator";
import { sendSiteDeployedEmail } from "@/lib/arkesel/client";

const prisma = new PrismaClient();

export async function POST(
  _req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const site = await prisma.site.findFirst({
      where: { id: params.siteId, userId: session.user.id },
      include: { user: true },
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    if (!site.builderJson) {
      return NextResponse.json({ error: "Site has no content" }, { status: 400 });
    }

    // 1. Generate site code
    const files = generateSiteCode(
      site.builderJson as Parameters<typeof generateSiteCode>[0],
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
        adsEnabled: site.adsEnabled,
        userPaystackKey: site.userPaystackPublicKey ?? undefined,
        primaryColor: site.primaryColor,
        secondaryColor: site.secondaryColor,
        fontFamily: site.fontFamily,
      }
    );

    let githubRepoName = site.githubRepoName;
    let vercelProjectId = site.vercelProjectId;

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
        `josett-${site.slug}`,
        process.env.GITHUB_ORG!,
        githubRepoName
      );
      vercelProjectId = project.id;
    }

    // 5. Trigger deployment
    const deployment = await triggerDeployment(
      vercelProjectId,
      githubRepoName,
      process.env.GITHUB_ORG!
    );

    // 6. Set up free Vercel domain
    const vercelDomain = getVercelDomain(`josett-${site.slug}`);
    try {
      await addDomainToProject(vercelProjectId, vercelDomain);
    } catch {
      // Domain might already exist, that's fine
    }

    // 7. Handle custom domain
    if (site.customDomain && site.featureCustomDomain) {
      try {
        await addDomainToProject(vercelProjectId, site.customDomain);
      } catch {
        // Will retry when user verifies DNS
      }
    }

    // 8. Update site in database
    const liveUrl = site.customDomain && site.customDomainVerified
      ? `https://${site.customDomain}`
      : `https://${vercelDomain}`;

    await prisma.site.update({
      where: { id: site.id },
      data: {
        vercelProjectId,
        vercelDeploymentUrl: `https://${deployment.url}`,
        vercelDomain,
        status: "DEPLOYED",
      },
    });

    // 9. Send deployment notification
    if (site.user) {
      await sendSiteDeployedEmail(
        site.user.email,
        site.user.fullName,
        site.name,
        liveUrl
      );
    }

    // 10. Create in-app notification
    await prisma.notification.create({
      data: {
        userId: site.userId,
        siteId: site.id,
        type: "DEPLOYED",
        title: `"${site.name}" is live!`,
        message: `Your website is now live at ${liveUrl}`,
        actionUrl: liveUrl,
      },
    });

    return NextResponse.json({
      success: true,
      url: liveUrl,
      deploymentId: deployment.id,
    });
  } catch (error) {
    console.error("Deploy error:", error);

    await prisma.site.update({
      where: { id: params.siteId },
      data: { status: "BUILDING" },
    }).catch(() => undefined);

    return NextResponse.json({ error: "Deployment failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
