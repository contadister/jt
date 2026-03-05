// lib/templates/index.ts
// Pre-built site templates for Josett

import type { BuilderJSON } from "@/lib/types/builder";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  siteType: string;
  thumbnail: string; // emoji placeholder until real thumbnails
  primaryColor: string;
  secondaryColor: string;
  featured?: boolean;
  builderJson: BuilderJSON;
}

const BASE_SETTINGS = (name: string, primary: string) => ({
  siteName: name,
  primaryColor: primary,
  secondaryColor: "#8b5cf6",
  fontFamily: "Inter",
  seoTitle: name,
  seoDescription: "",
});

const BASE_GLOBAL = (primary: string) => ({
  primaryColor: primary,
  bodyBackground: "#ffffff",
  textColor: "#1e293b",
  fontFamily: "Inter,system-ui,sans-serif",
});

export const TEMPLATES: Template[] = [
  // ── Business / Corporate ──────────────────────────────────
  {
    id: "business-classic",
    name: "Business Pro",
    description: "Clean professional layout for SMEs, agencies & service businesses.",
    category: "Business",
    siteType: "BUSINESS",
    thumbnail: "🏢",
    primaryColor: "#6272f1",
    secondaryColor: "#8b5cf6",
    featured: true,
    builderJson: {
      version: "1",
      siteSettings: BASE_SETTINGS("My Business", "#6272f1"),
      globalStyles: BASE_GLOBAL("#6272f1"),
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "My Business", description: "Professional services" },
        sections: [
          {
            id: "nav", type: "nav", isVisible: true,
            styles: { backgroundColor: "#fff", paddingTop: 0, paddingBottom: 0 },
            elements: [{
              id: "nav-el", type: "navigation", isVisible: true, isLocked: false,
              styles: {},
              content: { links: [{ label: "Home", href: "/" }, { label: "Services", href: "#services" }, { label: "Contact", href: "#contact" }] }
            }]
          },
          {
            id: "hero", type: "hero", isVisible: true,
            styles: { paddingTop: 0, paddingBottom: 0 },
            elements: [{
              id: "hero-el", type: "hero", isVisible: true, isLocked: false,
              styles: {},
              content: { title: "Professional Services for Your Business", subtitle: "We help businesses grow with tailored solutions.", buttonLabel: "Get Started", buttonHref: "#contact", overlay: false }
            }]
          },
          {
            id: "stats", type: "stats", isVisible: true,
            styles: { backgroundColor: "#f8fafc", paddingTop: 60, paddingBottom: 60 },
            elements: [{
              id: "stats-el", type: "stats-counter", isVisible: true, isLocked: false,
              styles: {},
              content: { stats: [{ value: "500+", label: "Happy Clients" }, { value: "10yrs", label: "Experience" }, { value: "98%", label: "Satisfaction" }, { value: "24/7", label: "Support" }] }
            }]
          },
          {
            id: "services", type: "services", isVisible: true,
            styles: { paddingTop: 80, paddingBottom: 80 },
            elements: [
              { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Our Services", level: "h2" } },
              { id: "sv-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Everything you need to grow your business" } }
            ]
          },
          {
            id: "cta", type: "cta", isVisible: true,
            styles: { backgroundColor: "#6272f1", paddingTop: 80, paddingBottom: 80 },
            elements: [
              { id: "cta-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "16px" }, content: { text: "Ready to get started?", level: "h2" } },
              { id: "cta-b", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "Contact Us Today", href: "#contact", variant: "outline" } }
            ]
          },
          {
            id: "contact", type: "contact", isVisible: true,
            styles: { paddingTop: 80, paddingBottom: 80 },
            elements: [
              { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Get In Touch", level: "h2" } },
              { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "600px", margin: "0 auto" },
                content: { formId: "contact", submitLabel: "Send Message", successMessage: "Thanks! We will get back to you within 24 hours.",
                  fields: [
                    { name: "name", label: "Your Name", type: "text", required: true },
                    { name: "email", label: "Email Address", type: "email", required: true },
                    { name: "phone", label: "Phone Number", type: "tel", required: false },
                    { name: "message", label: "Message", type: "textarea", required: true },
                  ]
                }
              }
            ]
          },
          {
            id: "footer", type: "footer", isVisible: true,
            styles: { backgroundColor: "#1e293b", paddingTop: 0, paddingBottom: 0 },
            elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 My Business. All rights reserved.", links: [{ label: "Privacy", href: "/privacy" }] } }]
          }
        ]
      }]
    }
  },

  // ── Restaurant ────────────────────────────────────────────
  {
    id: "restaurant",
    name: "Restaurant & Chop Bar",
    description: "Showcase your menu, hours and location. Perfect for chop bars, restaurants & cafes.",
    category: "Food & Drink",
    siteType: "RESTAURANT",
    thumbnail: "🍽️",
    primaryColor: "#ef4444",
    secondaryColor: "#f97316",
    featured: true,
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("Mama's Kitchen", "#ef4444"), secondaryColor: "#f97316" },
      globalStyles: BASE_GLOBAL("#ef4444"),
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Mama's Kitchen", description: "Authentic Ghanaian cuisine" },
        sections: [
          { id: "nav", type: "nav", isVisible: true, styles: { backgroundColor: "#1a0000" }, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { links: [{ label: "Menu", href: "#menu" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }] } }] },
          { id: "hero", type: "hero", isVisible: true, styles: {}, elements: [{ id: "h1", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Authentic Ghanaian Cuisine", subtitle: "Made with love, served with pride. Fresh ingredients, traditional recipes.", buttonLabel: "View Our Menu", buttonHref: "#menu", overlay: false } }] },
          { id: "menu", type: "menu", isVisible: true, styles: { paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "m-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Our Menu", level: "h2" } },
            { id: "m-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Fresh, local ingredients prepared daily" } },
            { id: "m-s", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "Main Dishes", items: [
              { name: "Jollof Rice & Chicken", description: "Our signature smoky jollof with grilled chicken, fried plantain & coleslaw", price: "GHS 45" },
              { name: "Banku & Tilapia", description: "Fermented corn & cassava dough with grilled tilapia, pepper sauce & garden egg", price: "GHS 55" },
              { name: "Fufu & Groundnut Soup", description: "Pounded yam & plantain with rich groundnut soup and assorted meat", price: "GHS 50" },
              { name: "Waakye", description: "Rice & beans cooked with sorghum leaves, served with stew, spaghetti & egg", price: "GHS 30" },
            ]}}
          ]},
          { id: "contact", type: "contact", isVisible: true, styles: { backgroundColor: "#fef2f2", paddingTop: 60, paddingBottom: 60 }, elements: [
            { id: "c-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "20px" }, content: { text: "Find Us", level: "h2" } },
            { id: "c-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center" }, content: { text: "📍 123 High Street, Accra · Open Mon-Sat 7am-10pm, Sun 9am-6pm · 📞 +233 24 000 0000" } },
            { id: "c-w", type: "whatsapp-button", isVisible: true, isLocked: false, styles: { display: "flex", justifyContent: "center", marginTop: "20px" }, content: { number: "233240000000", message: "Hello! I'd like to make a reservation.", label: "Reserve a Table" } }
          ]},
          { id: "footer", type: "footer", isVisible: true, styles: { backgroundColor: "#1a0000" }, elements: [{ id: "f1", type: "footer", isVisible: true, isLocked: false, styles: { color: "#fca5a5" }, content: { text: "© 2025 Mama's Kitchen" } }] }
        ]
      }]
    }
  },

  // ── Portfolio ─────────────────────────────────────────────
  {
    id: "portfolio",
    name: "Creative Portfolio",
    description: "Showcase your work as a designer, photographer, developer or creative.",
    category: "Portfolio",
    siteType: "PORTFOLIO",
    thumbnail: "🎨",
    primaryColor: "#8b5cf6",
    secondaryColor: "#06b6d4",
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("My Portfolio", "#8b5cf6"), secondaryColor: "#06b6d4" },
      globalStyles: { ...BASE_GLOBAL("#8b5cf6"), bodyBackground: "#0f0a1e", textColor: "#f1f5f9" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Portfolio", description: "Creative portfolio" },
        sections: [
          { id: "hero", type: "hero", isVisible: true, styles: { backgroundColor: "#0f0a1e", paddingTop: 100, paddingBottom: 100 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: "800", color: "#fff", textAlign: "center" }, content: { text: "Hello, I'm a Creative", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { color: "#94a3b8", textAlign: "center", fontSize: "1.2rem", margin: "16px 0 32px" }, content: { text: "Designer · Developer · Storyteller" } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "View My Work ↓", href: "#work", variant: "primary" } }
          ]},
          { id: "work", type: "gallery", isVisible: true, styles: { backgroundColor: "#0f0a1e", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "w-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Selected Work", level: "h2" } },
            { id: "w-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ]},
          { id: "about", type: "about", isVisible: true, styles: { backgroundColor: "#1e1035", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "a-h", type: "heading", isVisible: true, isLocked: false, styles: { color: "#fff", marginBottom: "16px" }, content: { text: "About Me", level: "h2" } },
            { id: "a-t", type: "text", isVisible: true, isLocked: false, styles: { color: "#94a3b8", lineHeight: "1.8" }, content: { text: "I'm a creative professional based in Accra, Ghana. I craft beautiful digital experiences that help brands tell their story and connect with their audience." } }
          ]},
          { id: "contact", type: "contact", isVisible: true, styles: { backgroundColor: "#0f0a1e", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "c-h", type: "heading", isVisible: true, isLocked: false, styles: { color: "#fff", textAlign: "center", marginBottom: "40px" }, content: { text: "Let's Work Together", level: "h2" } },
            { id: "c-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { formId: "contact", submitLabel: "Send Message", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "project", label: "Project Description", type: "textarea", required: true }] } }
          ]}
        ]
      }]
    }
  },

  // ── E-commerce ────────────────────────────────────────────
  {
    id: "shop",
    name: "Online Shop",
    description: "Sell products online with Paystack checkout. Perfect for fashion, electronics & more.",
    category: "E-commerce",
    siteType: "ECOMMERCE",
    thumbnail: "🛍️",
    primaryColor: "#10b981",
    secondaryColor: "#06b6d4",
    featured: true,
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("My Shop", "#10b981"), secondaryColor: "#06b6d4" },
      globalStyles: BASE_GLOBAL("#10b981"),
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "My Shop", description: "Shop the best products" },
        sections: [
          { id: "nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { links: [{ label: "Shop", href: "#products" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }] } }] },
          { id: "hero", type: "hero", isVisible: true, styles: {}, elements: [{ id: "h1", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Shop the Best Products", subtitle: "Quality goods delivered to your door. Free delivery in Accra.", buttonLabel: "Shop Now", buttonHref: "#products" } }] },
          { id: "newsletter", type: "newsletter", isVisible: true, styles: { backgroundColor: "#f0fdf4", paddingTop: 60, paddingBottom: 60 }, elements: [{ id: "nl", type: "newsletter-signup", isVisible: true, isLocked: false, styles: {}, content: { title: "Get exclusive deals in your inbox", buttonLabel: "Subscribe" } }] },
          { id: "footer", type: "footer", isVisible: true, styles: { backgroundColor: "#064e3b" }, elements: [{ id: "f1", type: "footer", isVisible: true, isLocked: false, styles: { color: "#6ee7b7" }, content: { text: "© 2025 My Shop. Secured by Paystack." } }] }
        ]
      }]
    }
  },

  // ── NGO / Nonprofit ───────────────────────────────────────
  {
    id: "ngo",
    name: "NGO / Nonprofit",
    description: "Raise awareness, collect donations and showcase your impact.",
    category: "NGO",
    siteType: "NGO",
    thumbnail: "🤝",
    primaryColor: "#f59e0b",
    secondaryColor: "#ef4444",
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("Our Organization", "#f59e0b"), secondaryColor: "#ef4444" },
      globalStyles: BASE_GLOBAL("#f59e0b"),
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Our Organization", description: "Making a difference" },
        sections: [
          { id: "hero", type: "hero", isVisible: true, styles: {}, elements: [{ id: "h1", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Together We Can Make a Difference", subtitle: "Join us in creating lasting change in our communities.", buttonLabel: "Support Our Cause", buttonHref: "#donate" } }] },
          { id: "stats", type: "stats", isVisible: true, styles: { backgroundColor: "#fefce8", paddingTop: 60, paddingBottom: 60 }, elements: [{ id: "s1", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ value: "10,000+", label: "Lives Impacted" }, { value: "50+", label: "Communities" }, { value: "GHS 2M+", label: "Raised" }, { value: "200+", label: "Volunteers" }] } }] },
          { id: "mission", type: "mission", isVisible: true, styles: { paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "m-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "16px" }, content: { text: "Our Mission", level: "h2" } },
            { id: "m-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", maxWidth: "700px", margin: "0 auto", lineHeight: "1.8", color: "#475569" }, content: { text: "We are committed to improving education, health, and economic opportunities for underserved communities across Ghana. Every donation, every volunteer hour, every act of support brings us closer to a more equitable society." } }
          ]},
          { id: "cta", type: "cta", isVisible: true, styles: { backgroundColor: "#f59e0b", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "16px" }, content: { text: "Your Support Changes Lives", level: "h2" } },
            { id: "ct-b", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "Donate Today", href: "#donate", variant: "outline" } }
          ]},
          { id: "footer", type: "footer", isVisible: true, styles: { backgroundColor: "#1c1917" }, elements: [{ id: "f1", type: "footer", isVisible: true, isLocked: false, styles: { color: "#a8a29e" }, content: { text: "© 2025 Our Organization. Registered NGO." } }] }
        ]
      }]
    }
  },

  // ── Personal Blog ─────────────────────────────────────────
  {
    id: "blog",
    name: "Personal Blog",
    description: "Share your ideas, stories and expertise with the world.",
    category: "Blog",
    siteType: "BLOG",
    thumbnail: "✍️",
    primaryColor: "#6272f1",
    secondaryColor: "#ec4899",
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("My Blog", "#6272f1"), secondaryColor: "#ec4899" },
      globalStyles: BASE_GLOBAL("#6272f1"),
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "My Blog", description: "Thoughts, stories and ideas" },
        sections: [
          { id: "nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "n1", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { links: [{ label: "Home", href: "/" }, { label: "Blog", href: "#posts" }, { label: "About", href: "#about" }] } }] },
          { id: "hero", type: "hero", isVisible: true, styles: {}, elements: [{ id: "h1", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Welcome to My Corner of the Internet", subtitle: "Thoughts on tech, life, and everything in between.", buttonLabel: "Read My Posts ↓", buttonHref: "#posts" } }] },
          { id: "newsletter", type: "newsletter", isVisible: true, styles: { backgroundColor: "#faf5ff", paddingTop: 60, paddingBottom: 60 }, elements: [{ id: "nl", type: "newsletter-signup", isVisible: true, isLocked: false, styles: {}, content: { title: "Never miss a new post", placeholder: "your@email.com", buttonLabel: "Subscribe" } }] },
          { id: "footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "f1", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 My Blog. Written with ❤️ from Ghana." } }] }
        ]
      }]
    }
  },

  // ── Link in Bio ───────────────────────────────────────────
  {
    id: "link-in-bio",
    name: "Link in Bio",
    description: "One link to share everything — socials, products, bookings and more.",
    category: "Social",
    siteType: "LINK_IN_BIO",
    thumbnail: "🔗",
    primaryColor: "#ec4899",
    secondaryColor: "#8b5cf6",
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("My Links", "#ec4899"), secondaryColor: "#8b5cf6" },
      globalStyles: { ...BASE_GLOBAL("#ec4899"), bodyBackground: "#fdf2f8" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "My Links", description: "All my links in one place" },
        sections: [{
          id: "bio", type: "bio", isVisible: true,
          styles: { backgroundColor: "#fdf2f8", paddingTop: 60, paddingBottom: 60 },
          elements: [{
            id: "lib1", type: "link-in-bio", isVisible: true, isLocked: false,
            styles: {},
            content: {
              name: "Your Name",
              bio: "Content creator · Entrepreneur · 🇬🇭",
              links: [
                { label: "🛍️ Shop My Products", url: "#" },
                { label: "📅 Book a Session", url: "#" },
                { label: "📱 Follow on Instagram", url: "#" },
                { label: "🎵 My TikTok", url: "#" },
                { label: "💼 Work With Me", url: "#" },
              ]
            }
          }]
        }]
      }]
    }
  },

  // ── Event / Landing ───────────────────────────────────────
  {
    id: "event",
    name: "Event Landing Page",
    description: "Promote conferences, concerts, workshops and events with ticket links.",
    category: "Event",
    siteType: "EVENT",
    thumbnail: "🎪",
    primaryColor: "#f97316",
    secondaryColor: "#ef4444",
    builderJson: {
      version: "1",
      siteSettings: { ...BASE_SETTINGS("My Event", "#f97316"), secondaryColor: "#ef4444" },
      globalStyles: { ...BASE_GLOBAL("#f97316"), bodyBackground: "#0c0a09", textColor: "#f5f5f4" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "My Event", description: "Join us for an unforgettable experience" },
        sections: [
          { id: "hero", type: "hero", isVisible: true, styles: { backgroundColor: "#0c0a09", paddingTop: 100, paddingBottom: 60 }, elements: [
            { id: "h1", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: "800" }, content: { text: "🎪 Event Name 2025", level: "h1" } },
            { id: "h2", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#d6d3d1", fontSize: "1.2rem", margin: "12px 0 20px" }, content: { text: "📅 March 15, 2025 · 📍 Accra International Conference Centre" } },
            { id: "cd", type: "countdown", isVisible: true, isLocked: false, styles: { margin: "32px 0" }, content: { title: "Event starts in:", targetDate: "2025-03-15T09:00:00" } },
            { id: "hb", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "Get Your Ticket →", href: "#tickets", variant: "primary" } }
          ]},
          { id: "speakers", type: "speakers", isVisible: true, styles: { backgroundColor: "#1c1917", paddingTop: 80, paddingBottom: 80 }, elements: [
            { id: "sp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#fff", marginBottom: "40px" }, content: { text: "Speakers & Guests", level: "h2" } }
          ]},
          { id: "footer", type: "footer", isVisible: true, styles: { backgroundColor: "#0c0a09" }, elements: [{ id: "f1", type: "footer", isVisible: true, isLocked: false, styles: { color: "#a8a29e" }, content: { text: "© 2025 Event Name. All rights reserved." } }] }
        ]
      }]
    }
  },
];

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  return TEMPLATES.filter((t) => t.category === category);
}
