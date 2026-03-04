// lib/builder/code-generator.ts
import type { BuilderJSON } from "@/lib/types/builder";

export interface SiteConfig {
  siteId: string;
  siteName: string;
  features: {
    featureEcommerce?: boolean;
    featureBlog?: boolean;
    featureBooking?: boolean;
    featureContactForm?: boolean;
    featureSeoTools?: boolean;
    featureAnalytics?: boolean;
    featureNewsletter?: boolean;
    featureRestaurantMenu?: boolean;
    featureGoogleMaps?: boolean;
    featureCustomDomain?: boolean;
    featureLiveChat?: boolean;
    featurePushNotifications?: boolean;
    featureWhatsappButton?: boolean;
    featureEventTicketing?: boolean;
    featureSiteSearch?: boolean;
  };
  adsEnabled?: boolean;
  userPaystackKey?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
}

export function generateSiteCode(
  builderJson: BuilderJSON,
  config: SiteConfig
): Record<string, string> {
  const files: Record<string, string> = {};

  // Core Next.js files
  files["package.json"] = generatePackageJson(config);
  files["next.config.js"] = generateNextConfig(config);
  files["tailwind.config.ts"] = generateTailwindConfig(config);
  files["app/globals.css"] = generateGlobalsCss(config);
  files["app/layout.tsx"] = generateRootLayout(builderJson, config);
  files[".env.example"] = generateEnvExample(config);

  // Pages
  for (const page of builderJson.pages) {
    const filePath = page.slug === "/" ? "app/page.tsx" : `app${page.slug}/page.tsx`;
    files[filePath] = generatePageFile(page, builderJson, config);
  }

  // Feature-specific files
  if (config.features.featureContactForm) {
    files["app/api/contact/route.ts"] = generateContactAPI(config);
  }

  if (config.features.featureEcommerce && config.userPaystackKey) {
    files["app/shop/page.tsx"] = generateShopPage(config);
    files["app/cart/page.tsx"] = generateCartPage(config);
    files["app/checkout/page.tsx"] = generateCheckoutPage(config);
    files["app/api/checkout/route.ts"] = generateCheckoutAPI(config);
    files["app/api/orders/route.ts"] = generateOrdersAPI(config);
  }

  if (config.features.featureBlog) {
    files["app/blog/page.tsx"] = generateBlogPage(config);
    files["app/blog/[slug]/page.tsx"] = generateBlogPostPage(config);
    files["app/api/posts/route.ts"] = generateBlogAPI(config);
  }

  if (config.features.featureBooking) {
    files["app/book/page.tsx"] = generateBookingPage(config);
    files["app/api/bookings/route.ts"] = generateBookingAPI(config);
  }

  if (config.features.featureNewsletter) {
    files["app/api/newsletter/route.ts"] = generateNewsletterAPI(config);
  }

  if (config.features.featureAnalytics || config.adsEnabled) {
    files["components/Analytics.tsx"] = generateAnalyticsComponent(config);
  }

  return files;
}

// ── Package.json ─────────────────────────────────────────
function generatePackageJson(config: SiteConfig): string {
  const deps: Record<string, string> = {
    next: "14.1.3",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
  };

  if (config.features.featureEcommerce) {
    deps["zustand"] = "^4.5.2";
  }

  return JSON.stringify(
    {
      name: config.siteName.toLowerCase().replace(/\s+/g, "-"),
      version: "0.1.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start" },
      dependencies: deps,
      devDependencies: {
        typescript: "^5.4.2",
        "@types/react": "^18.2.64",
        "@types/react-dom": "^18.2.21",
        "@types/node": "^20.11.25",
        tailwindcss: "^3.4.1",
        postcss: "^8.4.35",
        autoprefixer: "^10.4.18",
      },
    },
    null,
    2
  );
}

// ── Next Config ──────────────────────────────────────────
function generateNextConfig(_config: SiteConfig): string {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};
module.exports = nextConfig;
`;
}

// ── Tailwind Config ──────────────────────────────────────
function generateTailwindConfig(config: SiteConfig): string {
  const primary = config.primaryColor ?? "#6366f1";
  const secondary = config.secondaryColor ?? "#8b5cf6";
  return `import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "${primary}",
        secondary: "${secondary}",
      },
    },
  },
  plugins: [],
};
export default config;
`;
}

// ── Globals CSS ──────────────────────────────────────────
function generateGlobalsCss(config: SiteConfig): string {
  const font = config.fontFamily ?? "Inter";
  return `@import url('https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}:wght@400;500;600;700;800;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
:root {
  --primary: ${config.primaryColor ?? "#6366f1"};
  --secondary: ${config.secondaryColor ?? "#8b5cf6"};
  --font: '${font}', sans-serif;
}
body { font-family: var(--font); }
`;
}

// ── Root Layout ──────────────────────────────────────────
function generateRootLayout(builderJson: BuilderJSON, config: SiteConfig): string {
  const siteName = builderJson.siteSettings?.siteName ?? config.siteName;
  const seoDesc = builderJson.siteSettings?.seoDescription ?? "";
  const hasAnalytics = config.features.featureAnalytics || config.adsEnabled;
  const hasWhatsapp = config.features.featureWhatsappButton;
  const hasLiveChat = config.features.featureLiveChat;

  return `import type { Metadata } from "next";
import "./globals.css";
${hasAnalytics ? `import { Analytics } from "@/components/Analytics";` : ""}

export const metadata: Metadata = {
  title: {
    default: "${siteName}",
    template: "%s | ${siteName}",
  },
  description: "${seoDesc}",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        ${hasAnalytics ? `<Analytics siteId="${config.siteId}" adsEnabled={${config.adsEnabled ?? false}} />` : ""}
        ${hasWhatsapp ? `{/* WhatsApp Button — replace number */}` : ""}
        ${hasLiveChat ? `{/* Tawk.to Live Chat */}` : ""}
      </body>
    </html>
  );
}
`;
}

// ── Page File ─────────────────────────────────────────────
function generatePageFile(
  page: BuilderJSON["pages"][0],
  _builderJson: BuilderJSON,
  config: SiteConfig
): string {
  const sectionsCode = page.sections
    .filter((s) => s.isVisible !== false)
    .map((section) => {
      const elementsCode = section.elements
        .filter((el) => el.isVisible !== false)
        .map((el) => generateElementCode(el))
        .join("\n          ");

      const bg = section.styles?.backgroundColor ?? "#ffffff";
      const pt = section.styles?.paddingTop ?? 64;
      const pb = section.styles?.paddingBottom ?? 64;

      return `
        <section style={{ backgroundColor: "${bg}", paddingTop: ${pt}, paddingBottom: ${pb} }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            ${elementsCode}
          </div>
        </section>`;
    })
    .join("\n");

  const adsCode = config.adsEnabled
    ? `<ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}" data-ad-slot="auto" data-ad-format="auto" />`
    : "";

  return `export default function Page() {
  return (
    <main>
      ${sectionsCode}
      ${adsCode}
    </main>
  );
}
`;
}

function generateElementCode(el: BuilderJSON["pages"][0]["sections"][0]["elements"][0]): string {
  const content = el.content as Record<string, unknown>;
  const styles = el.styles ?? {};

  const styleStr = Object.entries(styles)
    .slice(0, 10)
    .map(([k, v]) => {
      if (v === undefined || v === null) return null;
      const camel = k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      return `${camel}: ${typeof v === "number" ? v : `"${v}"`}`;
    })
    .filter(Boolean)
    .join(", ");

  switch (el.type) {
    case "heading":
      return `<h${(content.level as number) ?? 1} style={{ ${styleStr} }}>${content.text ?? ""}</h${(content.level as number) ?? 1}>`;
    case "text":
      return `<p style={{ ${styleStr} }}>${content.text ?? ""}</p>`;
    case "image":
      return `<img src="${content.src ?? ""}" alt="${content.alt ?? ""}" style={{ ${styleStr}, maxWidth: "100%", height: "auto" }} />`;
    case "button":
      return `<a href="${content.link ?? "#"}" style={{ display: "inline-block", padding: "12px 24px", background: "var(--primary)", color: "#fff", borderRadius: 8, textDecoration: "none", ${styleStr} }}>${content.text ?? "Button"}</a>`;
    case "divider":
      return `<hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "24px 0", ${styleStr} }} />`;
    case "spacer":
      return `<div style={{ height: ${(content.height as number) ?? 40} }} />`;
    default:
      return `{/* ${el.type} element */}`;
  }
}

// ── Analytics Component ──────────────────────────────────
function generateAnalyticsComponent(config: SiteConfig): string {
  return `"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Analytics({ siteId, adsEnabled }: { siteId: string; adsEnabled: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    fetch("${process.env.NEXT_PUBLIC_APP_URL ?? "https://josett.com"}/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId,
        eventType: "pageview",
        pagePath: pathname,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      }),
    }).catch(() => undefined);

    if (adsEnabled && typeof window !== "undefined") {
      const s = document.createElement("script");
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      s.async = true;
      s.setAttribute("data-ad-client", process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "");
      document.head.appendChild(s);
    }
  }, [pathname, siteId, adsEnabled]);

  return null;
}
`;
}

// ── Contact API ──────────────────────────────────────────
function generateContactAPI(config: SiteConfig): string {
  return `import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  await fetch("${process.env.NEXT_PUBLIC_APP_URL ?? "https://josett.com"}/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ siteId: "${config.siteId}", formId: "contact", data }),
  });

  return NextResponse.json({ success: true });
}
`;
}

// ── Shop Page ─────────────────────────────────────────────
function generateShopPage(config: SiteConfig): string {
  return `import { Suspense } from "react";

async function getProducts() {
  const res = await fetch(
    "${process.env.NEXT_PUBLIC_APP_URL ?? "https://josett.com"}/api/sites/${config.siteId}/products",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.products ?? [];
}

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32 }}>Shop</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
        {products.map((p: Record<string, unknown>) => (
          <a key={p.id as string} href={"/shop/" + (p.slug as string)} style={{ textDecoration: "none", color: "inherit", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", display: "block" }}>
            {p.images && (p.images as string[])[0] && (
              <img src={(p.images as string[])[0]} alt={p.name as string} style={{ width: "100%", height: 200, objectFit: "cover" }} />
            )}
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 700 }}>{p.name as string}</div>
              <div style={{ color: "var(--primary)", fontWeight: 800, fontSize: 18, marginTop: 8 }}>GHS {p.priceGhs as number}</div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
`;
}

// ── Cart Page ─────────────────────────────────────────────
function generateCartPage(_config: SiteConfig): string {
  return `"use client";
export default function CartPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32 }}>Your Cart</h1>
      <p style={{ color: "#6b7280" }}>Cart functionality powered by Josett.</p>
    </main>
  );
}
`;
}

// ── Checkout Page ─────────────────────────────────────────
function generateCheckoutPage(config: SiteConfig): string {
  return `"use client";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  
  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [] }),
    });
    const data = await res.json();
    if (data.authorizationUrl) {
      window.location.href = data.authorizationUrl;
    }
    setLoading(false);
  };

  void config;
  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32 }}>Checkout</h1>
      <button
        onClick={() => void handleCheckout()}
        disabled={loading}
        style={{ width: "100%", padding: "16px", background: "var(--primary)", color: "#fff", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer" }}
      >
        {loading ? "Processing..." : "Pay with Paystack"}
      </button>
    </main>
  );
}
`;
}

// ── Checkout API ─────────────────────────────────────────
function generateCheckoutAPI(config: SiteConfig): string {
  return `import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { items, customerEmail, customerName } = await req.json();

  const res = await fetch("${process.env.NEXT_PUBLIC_APP_URL ?? "https://josett.com"}/api/sites/${config.siteId}/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, customerEmail, customerName }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
`;
}

// ── Orders API ───────────────────────────────────────────
function generateOrdersAPI(config: SiteConfig): string {
  return `import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("${process.env.NEXT_PUBLIC_APP_URL ?? "https://josett.com"}/api/sites/${config.siteId}/orders");
  const data = await res.json();
  return NextResponse.json(data);
}
`;
}

// ── Blog Page ─────────────────────────────────────────────
function generateBlogPage(config: SiteConfig): string {
  return `export default async function BlogPage() {
  const res = await fetch(
    "${process.env.NEXT_PUBLIC_APP_URL ?? "https://josett.com"}/api/sites/${config.siteId}/posts?published=true",
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const posts = data.posts ?? [];

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 40, fontWeight: 900, marginBottom: 40 }}>Blog</h1>
      <div style={{ display: "grid", gap: 32 }}>
        {posts.map((p: Record<string, unknown>) => (
          <a key={p.id as string} href={"/blog/" + (p.slug as string)} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            {p.coverImage && <img src={p.coverImage as string} alt={p.title as string} style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 12, marginBottom: 16 }} />}
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>{p.title as string}</h2>
            {p.excerpt && <p style={{ color: "#6b7280", marginTop: 8 }}>{p.excerpt as string}</p>}
          </a>
        ))}
      </div>
    </main>
  );
}
`;
}

function generateBlogPostPage(config: SiteConfig): string {
  return `export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const res = await fetch(
    "${process.env.NEXT_PUBLIC_APP_URL ?? "https://josett.com"}/api/sites/${config.siteId}/posts/" + params.slug,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const post = data.post;

  if (!post) return <div style={{ padding: 48 }}>Post not found.</div>;

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      {post.coverImage && <img src={post.coverImage} alt={post.title} style={{ width: "100%", borderRadius: 16, marginBottom: 32 }} />}
      <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 16 }}>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: typeof post.content === "string" ? post.content : JSON.stringify(post.content) }} />
    </main>
  );
}
`;
}

function generateBlogAPI(config: SiteConfig): string {
  return `import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const published = url.searchParams.get("published");
  const qs = published ? "?published=true" : "";

  const res = await fetch("${process.env.NEXT_PUBLIC_APP_URL ?? "https://josett.com"}/api/sites/${config.siteId}/posts" + qs);
  const data = await res.json();
  return NextResponse.json(data);
}
`;
}

function generateBookingPage(config: SiteConfig): string {
  return `"use client";
export default function BookingPage() {
  void config;
  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Book an Appointment</h1>
      <p style={{ color: "#6b7280" }}>Select a service and preferred time to get started.</p>
    </main>
  );
}
`;
}

function generateBookingAPI(config: SiteConfig): string {
  return `import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch("${process.env.NEXT_PUBLIC_APP_URL ?? "https://josett.com"}/api/sites/${config.siteId}/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
`;
}

function generateNewsletterAPI(config: SiteConfig): string {
  return `import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name } = await req.json();
  const res = await fetch("${process.env.NEXT_PUBLIC_APP_URL ?? "https://josett.com"}/api/sites/${config.siteId}/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name }),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
`;
}

function generateEnvExample(config: SiteConfig): string {
  let vars = `# Generated by Josett\nNEXT_PUBLIC_SITE_ID=${config.siteId}\n`;
  if (config.adsEnabled) {
    vars += `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=\n`;
  }
  if (config.features.featureEcommerce && config.userPaystackKey) {
    vars += `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=${config.userPaystackKey}\n`;
    vars += `PAYSTACK_SECRET_KEY=\n`;
  }
  return vars;
}
