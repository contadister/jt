// app/api/sites/instant/route.ts
// Instant website creator — takes business info and creates a ready-made site
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { TEMPLATES } from "@/lib/templates";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}

function injectBusinessInfo(
  builderJson: Record<string, unknown>,
  info: {
    businessName: string;
    tagline: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    services: string[];
    about: string;
    primaryColor: string;
  }
): Record<string, unknown> {
  // Deep clone
  const json = JSON.parse(JSON.stringify(builderJson));

  const walk = (obj: unknown): void => {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) { obj.forEach(walk); return; }
    const node = obj as Record<string, unknown>;

    // Inject into content fields
    if (node.content && typeof node.content === "object") {
      const c = node.content as Record<string, unknown>;

      // Navigation logo
      if (node.type === "navigation" && c.logo !== undefined) {
        c.logo = info.businessName;
      }

      // Hero title/subtitle
      if (node.type === "hero") {
        if (c.title && typeof c.title === "string" && (c.title.includes("Welcome") || c.title.includes("Professional") || c.title.includes("My Business") || c.title.includes("Mama") || c.title.includes("Business"))) {
          c.title = info.businessName;
        }
        if (c.subtitle && typeof c.subtitle === "string") {
          c.subtitle = info.tagline || c.subtitle;
        }
        if (c.ctaHref === "#contact" || c.buttonHref === "#contact") {
          // keep as is
        }
      }

      // Headings that say "My Business" or the template name
      if (node.type === "heading" && typeof c.text === "string") {
        if (c.text === "My Business" || c.text === "Mama's Kitchen" || c.text === "My Shop" || c.text === "Our Organization") {
          c.text = info.businessName;
        }
      }

      // Footer copyright
      if (node.type === "footer" && typeof c.text === "string") {
        c.text = `© ${new Date().getFullYear()} ${info.businessName}. All rights reserved.`;
      }

      // WhatsApp button — inject phone
      if (node.type === "whatsapp-button") {
        c.number = info.whatsapp.replace(/[^0-9]/g, "");
      }

      // Contact info text
      if (node.type === "text" && typeof c.text === "string") {
        if (c.text.includes("📍") || c.text.includes("📞") || c.text.includes("123 High Street")) {
          c.text = `📍 ${info.address}${info.phone ? ` · 📞 ${info.phone}` : ""}${info.email ? ` · ✉️ ${info.email}` : ""}`;
        }
      }

      // Feature grid — inject services
      if (node.type === "feature-grid" && Array.isArray(c.features) && info.services.length > 0) {
        const icons = ["⭐", "💎", "🚀", "🛡️", "✅", "🔥"];
        c.features = info.services.slice(0, 6).map((svc, i) => ({
          icon: icons[i] || "⭐",
          title: svc,
          desc: `Professional ${svc.toLowerCase()} services tailored to your needs.`,
        }));
      }

      // About / image-text
      if (node.type === "image-text" && info.about) {
        if (typeof c.body === "string") c.body = info.about;
      }
    }

    // Recurse
    Object.values(node).forEach(walk);
  };

  walk(json);

  // Update site settings
  if (json.siteSettings && typeof json.siteSettings === "object") {
    const s = json.siteSettings as Record<string, unknown>;
    s.siteName = info.businessName;
    s.primaryColor = info.primaryColor;
    s.seoTitle = info.businessName;
    s.seoDescription = info.tagline;
  }
  if (json.globalStyles && typeof json.globalStyles === "object") {
    (json.globalStyles as Record<string, unknown>).primaryColor = info.primaryColor;
  }

  return json;
}

export async function POST(req: Request) {
  const user = await requireUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    templateId,
    businessName,
    tagline,
    phone,
    whatsapp,
    email,
    address,
    services,
    about,
    primaryColor,
  } = body;

  if (!templateId || !businessName) {
    return NextResponse.json({ error: "Template and business name are required" }, { status: 400 });
  }

  // Find template
  const template = TEMPLATES.find((t) => t.id === templateId);
  if (!template) return NextResponse.json({ error: "Template not found" }, { status: 404 });

  // Inject real business info into template
  const populatedJson = injectBusinessInfo(template.builderJson as Record<string, unknown>, {
    businessName,
    tagline: tagline || `Professional ${businessName} services`,
    phone: phone || "",
    whatsapp: whatsapp || phone || "",
    email: email || "",
    address: address || "",
    services: Array.isArray(services) ? services : [],
    about: about || `Welcome to ${businessName}. We are committed to delivering quality services to all our clients.`,
    primaryColor: primaryColor || template.primaryColor,
  });

  // Generate unique slug
  const baseSlug = slugify(businessName);
  let slug = baseSlug;
  let attempt = 0;
  while (await prisma.site.findFirst({ where: { slug } })) {
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  // Create site
  const site = await prisma.site.create({
    data: {
      userId: user.prismaId,
      name: businessName,
      slug,
      siteType: ((template.siteType as string) || "BUSINESS") as "BUSINESS" | "PORTFOLIO" | "ECOMMERCE" | "BLOG" | "RESTAURANT" | "NGO" | "PERSONAL" | "LANDING" | "LINK_IN_BIO" | "EVENT",
      primaryColor: primaryColor || template.primaryColor,
      secondaryColor: template.secondaryColor,
      builderJson: populatedJson as never,
      status: "BUILDING",
    },
  });

  return NextResponse.json({ siteId: site.id, slug });
}
