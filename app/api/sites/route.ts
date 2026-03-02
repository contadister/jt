import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { z } from "zod";

const CreateSiteSchema = z.object({
  name: z.string().min(2).max(60),
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/),
  description: z.string().max(200).optional(),
  siteType: z.enum(["BUSINESS","PORTFOLIO","ECOMMERCE","BLOG","RESTAURANT","NGO","PERSONAL","LANDING","LINK_IN_BIO","EVENT"]),
  templateId: z.string().default("blank"),
  monthlyPriceGhs: z.number().min(100).max(400),
  featureEcommerce: z.boolean().default(false),
  featureBlog: z.boolean().default(false),
  featureBooking: z.boolean().default(false),
  featureContactForm: z.boolean().default(false),
  featureSeoTools: z.boolean().default(false),
  featureAnalytics: z.boolean().default(false),
  featureCustomDomain: z.boolean().default(false),
  featureGallery: z.boolean().default(false),
  featureRestaurantMenu: z.boolean().default(false),
  featureSocialLinks: z.boolean().default(false),
  featureNewsletter: z.boolean().default(false),
  featurePasswordProtection: z.boolean().default(false),
  featureMultiplePages: z.boolean().default(false),
  featureGoogleMaps: z.boolean().default(false),
  featureVideoEmbed: z.boolean().default(false),
  featureTestimonials: z.boolean().default(false),
  featureCountdown: z.boolean().default(false),
  featureLiveChat: z.boolean().default(false),
  featureWhatsappButton: z.boolean().default(false),
  featurePushNotifications: z.boolean().default(false),
  featureHeatmaps: z.boolean().default(false),
  featureMultiLanguage: z.boolean().default(false),
  featureSiteSearch: z.boolean().default(false),
  featureCoupons: z.boolean().default(false),
  featureProductReviews: z.boolean().default(false),
  featureDeliveryZones: z.boolean().default(false),
  featureAffiliate: z.boolean().default(false),
  featureAbTesting: z.boolean().default(false),
  featureSocialAutoPost: z.boolean().default(false),
  featureEventTicketing: z.boolean().default(false),
  featureLinkInBio: z.boolean().default(false),
  featureAdsEnabled: z.boolean().default(false),
});

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sites = await prisma.site.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true, name: true, slug: true, status: true, siteType: true,
        monthlyPriceGhs: true, subscriptionEnd: true, vercelDomain: true,
        vercelDeploymentUrl: true, totalVisits: true, createdAt: true,
      },
    });

    return NextResponse.json({
      sites: sites.map((s) => ({
        ...s,
        subscriptionEnd: s.subscriptionEnd?.toISOString() ?? null,
        createdAt: s.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("GET /api/sites error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = CreateSiteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await prisma.site.findUnique({ where: { slug: parsed.data.slug } });
    if (existing) return NextResponse.json({ error: "This URL is already taken" }, { status: 409 });

    const site = await prisma.site.create({
      data: {
        userId: session.user.id,
        ...parsed.data,
        status: "BUILDING",
      },
    });

    return NextResponse.json({ site }, { status: 201 });
  } catch (error) {
    console.error("POST /api/sites error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
