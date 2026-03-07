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
  {
    id: "salon",
    name: "Salon & Beauty",
    description: "Elegant template for salons, spas, and beauty studios",
    category: "Beauty",
    thumbnail: "💅",
    primaryColor: "#d4488a",
    secondaryColor: "#fce7f3",
    builderJson: {
      siteSettings: { siteName: "Glam Studio", primaryColor: "#d4488a", secondaryColor: "#fce7f3", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fff9fb" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Glam Studio – Beauty & Salon", description: "Professional beauty services in a luxurious setting" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Glam Studio", links: [{ label: "Services", href: "#services" }, { label: "Gallery", href: "#gallery" }, { label: "Book", href: "#book" }], ctaText: "Book Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#fce7f3 0%,#fff 60%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Where Beauty Meets Luxury", subtitle: "Professional hair, nails, and skincare services tailored to you", ctaText: "Book Appointment", ctaHref: "#book", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Our Services", level: "h2" } },
            { id: "sv-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Indulge in our premium beauty treatments" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "💅", title: "Nail Art", desc: "Gel, acrylic, manicure & pedicure" }, { icon: "💇", title: "Hair Styling", desc: "Cut, colour, braids & treatments" }, { icon: "✨", title: "Skincare", desc: "Facials, waxing & body treatments" }, { icon: "💄", title: "Makeup", desc: "Bridal, events & everyday glam" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff9fb" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Our Work", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#d4488a" }, elements: [{ id: "bk-el", type: "booking-widget", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Book Your Appointment", subtitle: "Available Monday–Saturday, 9am–7pm", bookingUrl: "#contact" } }] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Get In Touch", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: false }, { name: "service", label: "Service Interested In", type: "text", required: false }, { name: "message", label: "Message", type: "textarea", required: false }], submitText: "Send Message" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Glam Studio. All rights reserved.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "church",
    name: "Church & Ministry",
    description: "Welcoming template for churches and faith-based organisations",
    category: "Religious",
    thumbnail: "⛪",
    primaryColor: "#1d4ed8",
    secondaryColor: "#dbeafe",
    builderJson: {
      siteSettings: { siteName: "Grace Community Church", primaryColor: "#1d4ed8", secondaryColor: "#dbeafe", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#f8faff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Grace Community Church", description: "A place of worship, community and hope" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Grace Church", links: [{ label: "About", href: "#about" }, { label: "Services", href: "#services" }, { label: "Events", href: "#events" }, { label: "Give", href: "#give" }], ctaText: "Visit Us" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1d4ed8 0%,#3b82f6 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Welcome Home", subtitle: "Join us every Sunday at 8:30am & 11:00am. Everyone is welcome.", ctaText: "Plan Your Visit", ctaHref: "#visit", image: "" } }] },
          { id: "s-about", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ab-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "About Our Church", body: "Grace Community Church is a vibrant, inclusive congregation committed to worship, discipleship, and serving our community. Founded in 1985, we've grown into a family of over 500 members across Accra.", image: "", imageLeft: true } }
          ] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8faff" }, elements: [
            { id: "svc-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Service Times", level: "h2" } },
            { id: "svc-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🌅", title: "Sunday Morning", desc: "8:30am & 11:00am — Main Sanctuary" }, { icon: "🌙", title: "Wednesday Evening", desc: "6:30pm — Bible Study & Prayer" }, { icon: "👨‍👩‍👧", title: "Youth Service", desc: "Sunday 11:00am — Youth Chapel" }, { icon: "🙏", title: "Online Service", desc: "Stream live on YouTube" }] } }
          ] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#1d4ed8" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "500+", label: "Members" }, { number: "38", label: "Years Serving" }, { number: "12", label: "Ministries" }, { number: "200+", label: "Volunteers" }] } }] },
          { id: "s-give", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff", textAlign: "center" }, elements: [
            { id: "gv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Give & Support", level: "h2" } },
            { id: "gv-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "24px", maxWidth: "600px", margin: "0 auto 24px" }, content: { text: "Your generosity helps us serve the community, run our programs, and share the gospel." } },
            { id: "gv-b", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "Give Online", href: "#give", variant: "primary" } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8faff" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Contact Us", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "message", label: "Message", type: "textarea", required: true }], submitText: "Send Message" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Grace Community Church. All are welcome.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "school",
    name: "School & Education",
    description: "Professional template for schools, colleges, and tutoring centres",
    category: "Education",
    thumbnail: "🎓",
    primaryColor: "#059669",
    secondaryColor: "#d1fae5",
    builderJson: {
      siteSettings: { siteName: "Bright Futures Academy", primaryColor: "#059669", secondaryColor: "#d1fae5", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdf4" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Bright Futures Academy", description: "Quality education for the next generation" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Bright Futures Academy", links: [{ label: "About", href: "#about" }, { label: "Programmes", href: "#programmes" }, { label: "Admissions", href: "#admissions" }, { label: "Contact", href: "#contact" }], ctaText: "Apply Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#059669 0%,#34d399 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Shaping Tomorrow's Leaders", subtitle: "Quality nursery, primary, and secondary education with a focus on excellence, character and innovation.", ctaText: "Apply for Admission", ctaHref: "#admissions", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "1,200+", label: "Students" }, { number: "98%", label: "Pass Rate" }, { number: "45", label: "Teachers" }, { number: "25yrs", label: "Experience" }] } }] },
          { id: "s-progs", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0fdf4" }, elements: [
            { id: "pg-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Our Programmes", level: "h2" } },
            { id: "pg-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🎒", title: "Nursery (Ages 2–4)", desc: "Play-based learning in a nurturing environment" }, { icon: "📚", title: "Primary (JHS)", desc: "Strong foundations in literacy, numeracy & science" }, { icon: "🎓", title: "Secondary (SHS)", desc: "WAEC-focused curriculum with extracurriculars" }, { icon: "💻", title: "ICT & STEM", desc: "Modern computing and STEM lab facilities" }] } }
          ] },
          { id: "s-admissions", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ad-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Admissions Open", body: "We accept applications year-round for all levels. Our admissions process is simple and welcoming. Contact us to schedule a visit or download our prospectus.", image: "", imageLeft: false } },
            { id: "ad-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "24px auto 0" }, content: { title: "Enquire About Admission", fields: [{ name: "parent", label: "Parent Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "level", label: "Level Applying For", type: "text", required: true }, { name: "message", label: "Additional Notes", type: "textarea", required: false }], submitText: "Submit Enquiry" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Bright Futures Academy. Excellence in Education.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "real-estate",
    name: "Real Estate",
    description: "Professional template for property agents and real estate companies",
    category: "Property",
    thumbnail: "🏠",
    primaryColor: "#0f4c81",
    secondaryColor: "#dbeafe",
    builderJson: {
      siteSettings: { siteName: "Prime Properties GH", primaryColor: "#0f4c81", secondaryColor: "#dbeafe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8faff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Prime Properties Ghana – Buy, Sell & Rent", description: "Ghana's trusted real estate agency" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Prime Properties GH", links: [{ label: "Buy", href: "#buy" }, { label: "Rent", href: "#rent" }, { label: "Sell", href: "#sell" }, { label: "About", href: "#about" }], ctaText: "Contact Agent" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0f4c81 0%,#1e6fbc 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Find Your Dream Home in Ghana", subtitle: "From luxury apartments in Accra to beachfront villas in Takoradi — we connect you with the best properties.", ctaText: "Browse Listings", ctaHref: "#listings", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "500+", label: "Properties Listed" }, { number: "1,200+", label: "Happy Clients" }, { number: "12", label: "Cities Covered" }, { number: "15yrs", label: "Experience" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8faff" }, elements: [
            { id: "svc-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Our Services", level: "h2" } },
            { id: "svc-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🏠", title: "Residential Sales", desc: "Houses, apartments & land across Ghana" }, { icon: "🏢", title: "Commercial Leasing", desc: "Office & retail space for businesses" }, { icon: "📋", title: "Property Management", desc: "Full management for landlords" }, { icon: "🔑", title: "Rentals", desc: "Short & long-term rental listings" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Featured Properties", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f4c81" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px", color: "#fff" }, content: { text: "Talk to an Agent", level: "h2" } },
            { id: "ct-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", marginBottom: "32px" }, content: { text: "Tell us what you're looking for and we'll find the perfect match." } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "budget", label: "Budget (GHS)", type: "text", required: false }, { name: "message", label: "What are you looking for?", type: "textarea", required: true }], submitText: "Send Enquiry" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Prime Properties GH. Licensed Real Estate Agency.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "gym",
    name: "Gym & Fitness",
    description: "High-energy template for gyms, fitness studios, and personal trainers",
    category: "Health",
    thumbnail: "💪",
    primaryColor: "#dc2626",
    secondaryColor: "#fee2e2",
    builderJson: {
      siteSettings: { siteName: "PowerFit Gym", primaryColor: "#dc2626", secondaryColor: "#fee2e2", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#0f0f0f", textColor: "#f1f5f9" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "PowerFit Gym – Train Hard. Live Strong.", description: "Ghana's premier fitness facility" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#111", borderBottom: "1px solid #333" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "PowerFit", links: [{ label: "Classes", href: "#classes" }, { label: "Membership", href: "#membership" }, { label: "Trainers", href: "#trainers" }, { label: "Contact", href: "#contact" }], ctaText: "Join Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Train Hard.\nLive Strong.", subtitle: "State-of-the-art equipment, expert trainers, and a community that pushes you to your limits.", ctaText: "Start Free Trial", ctaHref: "#membership", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#1a1a1a" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "2,000+", label: "Members" }, { number: "50+", label: "Classes Weekly" }, { number: "20", label: "Expert Trainers" }, { number: "24/7", label: "Open Access" }] } }] },
          { id: "s-classes", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#111" }, elements: [
            { id: "cl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Our Classes", level: "h2" } },
            { id: "cl-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🥊", title: "Boxing", desc: "High-intensity boxing and cardio kickboxing classes" }, { icon: "🏋️", title: "Weight Training", desc: "Strength building and powerlifting sessions" }, { icon: "🧘", title: "Yoga & Pilates", desc: "Flexibility, balance and mind-body wellness" }, { icon: "🚴", title: "Spin Cycling", desc: "High-energy indoor cycling classes" }, { icon: "💪", title: "HIIT", desc: "Burn fat fast with high-intensity interval training" }, { icon: "🏃", title: "Functional Fitness", desc: "Real-world movement and athletic conditioning" }] } }
          ] },
          { id: "s-membership", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f0f0f" }, elements: [
            { id: "mp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Membership Plans", level: "h2" } },
            { id: "mp-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Basic", price: "150", period: "/month", features: ["Gym Floor Access", "Locker Room", "2 Classes/week"], cta: "Get Started" }, { name: "Pro", price: "250", period: "/month", features: ["Unlimited Classes", "Personal Trainer (2x/month)", "Nutrition Consultation", "Pool Access"], cta: "Most Popular", highlighted: true }, { name: "Elite", price: "400", period: "/month", features: ["Everything in Pro", "Daily PT Sessions", "Meal Plan", "Priority Booking"], cta: "Go Elite" }] } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1a1a1a" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Start Your Journey", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "goal", label: "Your Fitness Goal", type: "text", required: false }], submitText: "Claim Free Trial" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 PowerFit Gym. Train Hard. Live Strong.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "medical",
    name: "Medical Clinic",
    description: "Clean, trustworthy template for clinics, hospitals and healthcare providers",
    category: "Healthcare",
    thumbnail: "🩺",
    primaryColor: "#0891b2",
    secondaryColor: "#cffafe",
    builderJson: {
      siteSettings: { siteName: "HealthCare Clinic", primaryColor: "#0891b2", secondaryColor: "#cffafe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdfe" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "HealthCare Clinic – Your Health, Our Priority", description: "Quality medical care for the whole family" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "HealthCare Clinic", links: [{ label: "Services", href: "#services" }, { label: "Doctors", href: "#doctors" }, { label: "Book", href: "#book" }, { label: "Contact", href: "#contact" }], ctaText: "Book Appointment" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0891b2 0%,#06b6d4 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Your Health, Our Priority", subtitle: "Comprehensive primary care, specialist consultations, and diagnostic services — all under one roof.", ctaText: "Book an Appointment", ctaHref: "#book", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Our Medical Services", level: "h2" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🩺", title: "General Consultation", desc: "Primary care for adults and children" }, { icon: "🧪", title: "Laboratory", desc: "Blood tests, urinalysis & diagnostic imaging" }, { icon: "💊", title: "Pharmacy", desc: "In-house dispensary with certified pharmacists" }, { icon: "🤱", title: "Maternal Care", desc: "Antenatal, delivery and postnatal services" }, { icon: "🦷", title: "Dental", desc: "Routine checkups, fillings and extractions" }, { icon: "🧠", title: "Mental Health", desc: "Counselling and psychiatric support" }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0fdfe" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Book an Appointment", level: "h2" } },
            { id: "bk-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "32px" }, content: { text: "Available Monday–Friday 8am–6pm, Saturday 9am–2pm" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Patient Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "service", label: "Service Needed", type: "text", required: true }, { name: "message", label: "Describe your concern", type: "textarea", required: false }], submitText: "Request Appointment" } }
          ] },
          { id: "s-map", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "mp-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "24px" }, content: { text: "Find Us", level: "h2" } },
            { id: "mp-m", type: "map", isVisible: true, isLocked: false, styles: {}, content: { address: "Accra, Ghana", zoom: 14 } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 HealthCare Clinic. Caring for Ghana.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "photography",
    name: "Photography Portfolio",
    description: "Stunning visual portfolio for photographers and creative professionals",
    category: "Creative",
    thumbnail: "📷",
    primaryColor: "#1a1a1a",
    secondaryColor: "#f5f5f5",
    builderJson: {
      siteSettings: { siteName: "Lens & Light Photography", primaryColor: "#1a1a1a", secondaryColor: "#f5f5f5", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Lens & Light Photography", description: "Professional photography for weddings, portraits, and events" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { borderBottom: "1px solid #e2e8f0" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Lens & Light", links: [{ label: "Portfolio", href: "#portfolio" }, { label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }], ctaText: "Book a Shoot" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { padding: "100px 40px", background: "#111" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Every Frame\nTells a Story", subtitle: "Professional photography for weddings, portraits, corporate events and brand campaigns across Ghana.", ctaText: "View Portfolio", ctaHref: "#portfolio", image: "" } }] },
          { id: "s-portfolio", type: "section", isVisible: true, styles: { padding: "60px 40px" }, elements: [
            { id: "pf-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Portfolio", level: "h2" } },
            { id: "pf-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What I Shoot", level: "h2" } },
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "💍", title: "Weddings", desc: "Cinematic wedding photography & videography" }, { icon: "👤", title: "Portraits", desc: "Individual, family & executive headshots" }, { icon: "🎉", title: "Events", desc: "Corporate, birthday, graduation & funerals" }, { icon: "📱", title: "Content Creation", desc: "Product & brand photography for social media" }] } }
          ] },
          { id: "s-testimonials", type: "section", isVisible: true, styles: { padding: "60px 40px" }, elements: [
            { id: "ts-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Client Love", level: "h2" } },
            { id: "ts-t", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Absolutely breathtaking photos. Everyone at our wedding was blown away. Worth every pesewa!", author: "Ama & Kweku Mensah", role: "Wedding Clients" } }
          ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Packages", level: "h2" } },
            { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Portrait", price: "500", period: "/ session", features: ["2-hour shoot", "50 edited photos", "Online gallery", "Print-ready files"], cta: "Book Now" }, { name: "Event", price: "1,200", period: "/ event", features: ["Full day coverage", "200+ edited photos", "Video highlights", "USB drive"], cta: "Book Now", highlighted: true }, { name: "Wedding", price: "3,500", period: "/ wedding", features: ["2 photographers", "10-hour coverage", "500+ photos", "Drone footage", "Album"], cta: "Enquire" }] } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Book a Shoot", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "type", label: "Type of Shoot", type: "text", required: true }, { name: "date", label: "Preferred Date", type: "text", required: false }, { name: "message", label: "Tell me more", type: "textarea", required: false }], submitText: "Send Enquiry" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Lens & Light Photography. Capturing Ghana's best moments.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "hotel",
    name: "Hotel & Accommodation",
    description: "Elegant template for hotels, guesthouses and Airbnb properties",
    category: "Hospitality",
    thumbnail: "🏨",
    primaryColor: "#78350f",
    secondaryColor: "#fef3c7",
    builderJson: {
      siteSettings: { siteName: "The Grand Hotel GH", primaryColor: "#78350f", secondaryColor: "#fef3c7", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fffbf0" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "The Grand Hotel Ghana – Luxury Accommodation", description: "Experience luxury hospitality in the heart of Accra" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "The Grand Hotel", links: [{ label: "Rooms", href: "#rooms" }, { label: "Amenities", href: "#amenities" }, { label: "Dining", href: "#dining" }, { label: "Book", href: "#book" }], ctaText: "Book Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#78350f 0%,#b45309 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Luxury Redefined", subtitle: "Experience the finest hospitality in Accra. Breathtaking views, world-class amenities, unforgettable stays.", ctaText: "Reserve Your Room", ctaHref: "#book", image: "" } }] },
          { id: "s-amenities", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "am-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Hotel Amenities", level: "h2" } },
            { id: "am-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🏊", title: "Swimming Pool", desc: "Olympic-size heated pool with pool bar" }, { icon: "🍽️", title: "Fine Dining", desc: "International and Ghanaian cuisine" }, { icon: "💆", title: "Spa & Wellness", desc: "Full-service spa, sauna and gym" }, { icon: "🅿️", title: "Free Parking", desc: "Secured parking for all guests" }, { icon: "📶", title: "Fast WiFi", desc: "Complimentary high-speed WiFi" }, { icon: "🚗", title: "Airport Transfer", desc: "Luxury shuttle service available" }] } }
          ] },
          { id: "s-rooms", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fffbf0" }, elements: [
            { id: "rm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Rooms & Suites", level: "h2" } },
            { id: "rm-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Standard Room", price: "450", period: "/ night", features: ["King Bed", "City View", "Free Breakfast", "WiFi", "TV"], cta: "Book" }, { name: "Deluxe Suite", price: "850", period: "/ night", features: ["King Bed + Living Area", "Ocean View", "Free Breakfast", "Minibar", "Butler Service"], cta: "Book", highlighted: true }, { name: "Presidential", price: "2,500", period: "/ night", features: ["3-Bedroom Suite", "Private Pool", "Personal Chef", "24/7 Concierge", "Airport Limo"], cta: "Enquire" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Gallery", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#78350f" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Make a Reservation", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "checkin", label: "Check-in Date", type: "text", required: true }, { name: "checkout", label: "Check-out Date", type: "text", required: true }, { name: "guests", label: "Number of Guests", type: "text", required: true }, { name: "room", label: "Room Type", type: "text", required: false }], submitText: "Request Booking" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 The Grand Hotel Ghana. Luxury Hospitality.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "law-firm",
    name: "Law Firm",
    description: "Authoritative, professional template for lawyers and legal practices",
    category: "Professional",
    thumbnail: "⚖️",
    primaryColor: "#1e293b",
    secondaryColor: "#f1f5f9",
    builderJson: {
      siteSettings: { siteName: "Agyei & Partners Legal", primaryColor: "#1e293b", secondaryColor: "#f1f5f9", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#f8fafc" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Agyei & Partners Legal – Expert Legal Counsel", description: "Trusted legal expertise in corporate, civil and criminal law" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { borderBottom: "3px solid #c9a84c" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Agyei & Partners", links: [{ label: "Practice Areas", href: "#practice" }, { label: "Our Team", href: "#team" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }], ctaText: "Free Consultation" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e293b 0%,#334155 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Justice. Integrity. Results.", subtitle: "Ghana's trusted legal firm serving corporations, individuals and government institutions since 1998.", ctaText: "Book Free Consultation", ctaHref: "#contact", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#c9a84c" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { stats: [{ number: "25+", label: "Years Experience" }, { number: "2,000+", label: "Cases Won" }, { number: "15", label: "Attorneys" }, { number: "98%", label: "Success Rate" }] } }] },
          { id: "s-practice", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pa-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Practice Areas", level: "h2" } },
            { id: "pa-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🏢", title: "Corporate Law", desc: "Company formation, mergers & commercial contracts" }, { icon: "⚖️", title: "Litigation", desc: "Civil, criminal and arbitration representation" }, { icon: "🏠", title: "Property Law", desc: "Conveyancing, land disputes and leases" }, { icon: "👨‍👩‍👧", title: "Family Law", desc: "Divorce, child custody and inheritance" }, { icon: "🌍", title: "Immigration", desc: "Visa applications and work permits" }, { icon: "💼", title: "Employment Law", desc: "Labour disputes and workplace rights" }] } }
          ] },
          { id: "s-about", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "ab-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Why Choose Us", body: "Founded in 1998 by Senior Partner Kwame Agyei, our firm has built an unrivalled reputation for excellence in Ghana's legal landscape. We combine deep local expertise with international best practices to deliver results that matter.", image: "", imageLeft: false } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e293b" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px", color: "#fff" }, content: { text: "Get Legal Advice", level: "h2" } },
            { id: "ct-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.7)", marginBottom: "32px" }, content: { text: "Book a free 30-minute consultation with one of our attorneys." } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "area", label: "Legal Issue (brief description)", type: "textarea", required: true }], submitText: "Request Consultation" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Agyei & Partners Legal. All rights reserved. Not legal advice.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "tech-startup",
    name: "Tech Startup / SaaS",
    description: "Modern, bold template for tech startups and software products",
    category: "Technology",
    thumbnail: "🚀",
    primaryColor: "#7c3aed",
    secondaryColor: "#ede9fe",
    builderJson: {
      siteSettings: { siteName: "LaunchPad", primaryColor: "#7c3aed", secondaryColor: "#ede9fe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#ffffff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "LaunchPad – Build, Ship, Grow", description: "The all-in-one platform for modern businesses" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "LaunchPad", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }, { label: "About", href: "#about" }], ctaText: "Start Free Trial" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#4c1d95 0%,#7c3aed 60%,#a78bfa 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Build Faster.\nShip Smarter.\nGrow Bigger.", subtitle: "The complete platform to launch and scale your digital business. No code required.", ctaText: "Start Free — No Card Needed", ctaHref: "#signup", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#faf5ff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "10,000+", label: "Users" }, { number: "50K+", label: "Sites Built" }, { number: "99.9%", label: "Uptime" }, { number: "4.9★", label: "Rating" }] } }] },
          { id: "s-features", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "fe-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Everything You Need", level: "h2" } },
            { id: "fe-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "One platform. Every feature. Zero headaches." } },
            { id: "fe-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "⚡", title: "Lightning Fast", desc: "Sub-second load times on every device, everywhere" }, { icon: "🎨", title: "Beautiful by Default", desc: "Pro-grade templates designed by experts" }, { icon: "🔌", title: "100+ Integrations", desc: "Connect with tools you already use" }, { icon: "📊", title: "Real-time Analytics", desc: "Know exactly what's working and why" }, { icon: "🔒", title: "Enterprise Security", desc: "SSL, 2FA and data encryption built in" }, { icon: "💬", title: "24/7 Support", desc: "Live chat support whenever you need it" }] } }
          ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#faf5ff" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Simple Pricing", level: "h2" } },
            { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Starter", price: "29", period: "/month", features: ["1 Website", "5GB Storage", "Custom Domain", "SSL Certificate", "Basic Analytics"], cta: "Start Free" }, { name: "Pro", price: "79", period: "/month", features: ["5 Websites", "50GB Storage", "All Starter Features", "Advanced Analytics", "Priority Support", "Remove Branding"], cta: "Most Popular", highlighted: true }, { name: "Scale", price: "199", period: "/month", features: ["Unlimited Sites", "500GB Storage", "White-label", "API Access", "Dedicated Manager"], cta: "Contact Sales" }] } }
          ] },
          { id: "s-cta", type: "section", isVisible: true, styles: { padding: "80px 40px", background: "linear-gradient(135deg,#7c3aed 0%,#a855f7 100%)", textAlign: "center" }, elements: [
            { id: "cta-h", type: "heading", isVisible: true, isLocked: false, styles: { color: "#fff", textAlign: "center", marginBottom: "12px" }, content: { text: "Ready to Launch?", level: "h2" } },
            { id: "cta-t", type: "text", isVisible: true, isLocked: false, styles: { color: "rgba(255,255,255,0.8)", textAlign: "center", marginBottom: "24px" }, content: { text: "Join 10,000+ businesses already growing with LaunchPad." } },
            { id: "cta-b", type: "button", isVisible: true, isLocked: false, styles: {}, content: { label: "Get Started Free", href: "#signup", variant: "outline" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 LaunchPad Technologies. Built with ❤️ in Ghana.", links: [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] } }] }
        ]
      }]
    }
  },

  {
    id: "clothing-store",
    name: "Clothing & Fashion",
    description: "Trendy template for fashion boutiques and clothing stores",
    category: "Fashion",
    thumbnail: "👗",
    primaryColor: "#be185d",
    secondaryColor: "#fce7f3",
    builderJson: {
      siteSettings: { siteName: "Kente & Co.", primaryColor: "#be185d", secondaryColor: "#fce7f3", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#fff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Kente & Co. – African Fashion & Style", description: "Premium Ghanaian and African fashion" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Kente & Co.", links: [{ label: "Women", href: "#women" }, { label: "Men", href: "#men" }, { label: "New In", href: "#new" }, { label: "Sale", href: "#sale" }], ctaText: "Shop Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#9d174d 0%,#be185d 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "African Fashion,
Reimagined", subtitle: "Premium kente, ankara and contemporary African styles. Designed in Accra, worn worldwide.", ctaText: "Shop the Collection", ctaHref: "#shop", image: "" } }] },
          { id: "s-new", type: "section", isVisible: true, styles: { padding: "60px 40px" }, elements: [
            { id: "nw-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "New Arrivals", level: "h2" } },
            { id: "nw-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 4 } }
          ] },
          { id: "s-cats", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff9fb" }, elements: [
            { id: "ct-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Shop by Category", features: [{ icon: "👗", title: "Women's Wear", desc: "Dresses, tops, wraps & occasion wear" }, { icon: "👔", title: "Men's Wear", desc: "Shirts, trousers & traditional attire" }, { icon: "👶", title: "Kids", desc: "Adorable African prints for little ones" }, { icon: "👜", title: "Accessories", desc: "Bags, jewellery & headwraps" }] } }
          ] },
          { id: "s-whatsapp", type: "section", isVisible: true, styles: { padding: "20px 40px", background: "#fff" }, elements: [{ id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I'd like to order from Kente & Co." } }] },
          { id: "s-newsletter", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#be185d" }, elements: [{ id: "nl-el", type: "newsletter-signup", isVisible: true, isLocked: false, styles: { color: "#fff" }, content: { title: "Get 10% Off Your First Order", placeholder: "Enter your email", buttonText: "Subscribe" } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Kente & Co. African Fashion.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "car-dealer",
    name: "Car Dealership",
    description: "Professional template for car dealers and auto sales",
    category: "Automotive",
    thumbnail: "🚗",
    primaryColor: "#1e3a5f",
    secondaryColor: "#dbeafe",
    builderJson: {
      siteSettings: { siteName: "Premier Auto GH", primaryColor: "#1e3a5f", secondaryColor: "#dbeafe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f1f5f9" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Premier Auto GH – Quality Cars for Sale", description: "New and used cars for sale in Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Premier Auto GH", links: [{ label: "New Cars", href: "#new" }, { label: "Used Cars", href: "#used" }, { label: "Finance", href: "#finance" }, { label: "Contact", href: "#contact" }], ctaText: "Browse Stock" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Drive Your Dream Car Today", subtitle: "Ghana's trusted auto dealer. Over 200 vehicles in stock. Flexible financing available.", ctaText: "View Inventory", ctaHref: "#inventory", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "200+", label: "Cars in Stock" }, { number: "5,000+", label: "Happy Buyers" }, { number: "15yrs", label: "In Business" }, { number: "12mo", label: "Warranty" }] } }] },
          { id: "s-why", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f1f5f9" }, elements: [
            { id: "wy-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Why Buy From Us", features: [{ icon: "✅", title: "Certified Pre-Owned", desc: "Every used car is thoroughly inspected" }, { icon: "💳", title: "Flexible Finance", desc: "Low deposits and easy monthly payments" }, { icon: "🔧", title: "Free Servicing", desc: "First service free on every purchase" }, { icon: "📋", title: "Clear Documentation", desc: "All papers, customs & duties sorted" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Current Stock", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e3a5f" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Enquire About a Car", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "budget", label: "Budget (GHS)", type: "text", required: false }, { name: "message", label: "Car you're interested in", type: "textarea", required: true }], submitText: "Send Enquiry" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Premier Auto GH. Drive with confidence.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "cleaning",
    name: "Cleaning Service",
    description: "Fresh, clean template for cleaning and home services companies",
    category: "Services",
    thumbnail: "🧹",
    primaryColor: "#0369a1",
    secondaryColor: "#e0f2fe",
    builderJson: {
      siteSettings: { siteName: "SparkleClean GH", primaryColor: "#0369a1", secondaryColor: "#e0f2fe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0f9ff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "SparkleClean GH – Professional Cleaning Services", description: "Residential and commercial cleaning across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "SparkleClean", links: [{ label: "Services", href: "#services" }, { label: "Pricing", href: "#pricing" }, { label: "About", href: "#about" }, { label: "Book", href: "#book" }], ctaText: "Get Free Quote" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0369a1 0%,#0ea5e9 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "A Cleaner Home,
A Happier Life", subtitle: "Professional cleaning services for homes, offices and commercial spaces across Ghana. Trusted by 1,000+ customers.", ctaText: "Book a Clean", ctaHref: "#book", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "🏠", title: "Home Cleaning", desc: "Regular and deep cleaning for all room sizes" }, { icon: "🏢", title: "Office Cleaning", desc: "Daily, weekly or one-off commercial cleaning" }, { icon: "🛋️", title: "Sofa & Carpet", desc: "Steam cleaning and stain removal" }, { icon: "🪟", title: "Window Cleaning", desc: "Spotless windows inside and out" }, { icon: "🏗️", title: "Post-Construction", desc: "Site clearance and builder's clean" }, { icon: "🎉", title: "Event Cleaning", desc: "Before and after event cleaning" }] } }
          ] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0f9ff" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Transparent Pricing", level: "h2" } },
            { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Basic Clean", price: "150", period: "/ session", features: ["Up to 2 bedrooms", "Kitchen & bathrooms", "Dusting & vacuuming", "2 cleaners"], cta: "Book Now" }, { name: "Deep Clean", price: "350", period: "/ session", features: ["Full house", "Inside appliances", "Carpet cleaning", "4 cleaners", "3 hours"], cta: "Most Popular", highlighted: true }, { name: "Monthly Plan", price: "500", period: "/ month", features: ["4 visits/month", "Priority booking", "Free supplies", "Dedicated team"], cta: "Subscribe" }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Book a Clean", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "address", label: "Property Address", type: "text", required: true }, { name: "type", label: "Type of Clean", type: "text", required: true }, { name: "date", label: "Preferred Date", type: "text", required: false }], submitText: "Request Booking" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 SparkleClean GH. We clean so you don't have to.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "catering",
    name: "Catering & Food Delivery",
    description: "Appetising template for caterers, food vendors and delivery services",
    category: "Food & Drink",
    thumbnail: "🍱",
    primaryColor: "#b45309",
    secondaryColor: "#fef3c7",
    builderJson: {
      siteSettings: { siteName: "Mama's Kitchen", primaryColor: "#b45309", secondaryColor: "#fef3c7", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fffbeb" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Mama's Kitchen – Catering & Food Delivery", description: "Authentic Ghanaian food for events and daily delivery" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Mama's Kitchen", links: [{ label: "Menu", href: "#menu" }, { label: "Catering", href: "#catering" }, { label: "Order", href: "#order" }, { label: "Contact", href: "#contact" }], ctaText: "Order Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#78350f 0%,#b45309 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Authentic Ghanaian Food,
Delivered Fresh", subtitle: "Home-cooked jollof, waakye, fufu and more. Daily delivery + event catering across Accra.", ctaText: "See Our Menu", ctaHref: "#menu", image: "" } }] },
          { id: "s-menu", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "mn-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Today's Menu", level: "h2" } },
            { id: "mn-m", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "", items: [{ name: "Jollof Rice + Chicken", description: "Party jollof with grilled chicken and coleslaw", price: "GHS 35" }, { name: "Waakye Special", description: "Waakye with eggs, spaghetti, fried fish and stew", price: "GHS 30" }, { name: "Fufu & Light Soup", description: "Fresh pounded fufu with goat light soup", price: "GHS 40" }, { name: "Fried Rice & Tilapia", description: "Chinese-style fried rice with whole tilapia", price: "GHS 45" }] } }
          ] },
          { id: "s-catering", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fffbeb" }, elements: [
            { id: "ct-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Event Catering", features: [{ icon: "💍", title: "Weddings", desc: "Full catering packages for up to 500 guests" }, { icon: "🎂", title: "Birthdays", desc: "Party packs, buffets and cake services" }, { icon: "🏢", title: "Corporate", desc: "Office lunches, meetings and conferences" }, { icon: "⛪", title: "Funerals & Outdooring", desc: "Traditional Ghanaian funeral catering" }] } }
          ] },
          { id: "s-order", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "or-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Place an Order", level: "h2" } },
            { id: "or-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "address", label: "Delivery Address", type: "text", required: true }, { name: "order", label: "What would you like to order?", type: "textarea", required: true }, { name: "time", label: "Delivery Time", type: "text", required: false }], submitText: "Send Order" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px 40px" }, elements: [{ id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I'd like to place a food order." } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Mama's Kitchen. Cooked with love.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "barber",
    name: "Barbershop",
    description: "Sharp, masculine template for barbershops and grooming studios",
    category: "Beauty",
    thumbnail: "✂️",
    primaryColor: "#111827",
    secondaryColor: "#f3f4f6",
    builderJson: {
      siteSettings: { siteName: "Kingcuts Barbershop", primaryColor: "#111827", secondaryColor: "#f3f4f6", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#111", textColor: "#f1f5f9" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Kingcuts Barbershop – Premium Grooming", description: "Sharp cuts, clean shaves and premium grooming" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#000", borderBottom: "2px solid #d4af37" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Kingcuts", links: [{ label: "Services", href: "#services" }, { label: "Gallery", href: "#gallery" }, { label: "Book", href: "#book" }], ctaText: "Book Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#000 0%,#1f2937 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Look Sharp.
Feel Fresh.", subtitle: "Premium barbering, fades, designs and beard grooming. Walk in fresh, walk out king.", ctaText: "Book Your Cut", ctaHref: "#book", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1a1a1a" }, elements: [
            { id: "sv-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Services & Pricing", level: "h2" } },
            { id: "sv-m", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "", items: [{ name: "Haircut (All styles)", description: "Fade, taper, caesar, afro shaping", price: "GHS 25" }, { name: "Beard Trim & Shape", description: "Full beard grooming and design", price: "GHS 20" }, { name: "Cut + Beard Combo", description: "Full grooming package", price: "GHS 40" }, { name: "Hair Design / Branding", description: "Custom designs and patterns", price: "GHS 15+" }, { name: "Kids Cut (Under 12)", description: "Patient and gentle cuts for children", price: "GHS 20" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#111" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Our Work", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#000" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#d4af37" }, content: { text: "Book Your Appointment", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "480px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "service", label: "Service", type: "text", required: true }, { name: "date", label: "Preferred Date & Time", type: "text", required: true }], submitText: "Book Now" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 Kingcuts Barbershop. Stay sharp.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "event-planner",
    name: "Event Planning",
    description: "Vibrant template for event planners, decorators and coordinators",
    category: "Events",
    thumbnail: "🎉",
    primaryColor: "#7e22ce",
    secondaryColor: "#f3e8ff",
    builderJson: {
      siteSettings: { siteName: "Celebrations by Adwoa", primaryColor: "#7e22ce", secondaryColor: "#f3e8ff", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fdf4ff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Celebrations by Adwoa – Event Planning & Décor", description: "Creating magical moments for weddings, birthdays and corporate events" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Celebrations by Adwoa", links: [{ label: "Services", href: "#services" }, { label: "Gallery", href: "#gallery" }, { label: "Packages", href: "#packages" }, { label: "Contact", href: "#contact" }], ctaText: "Plan Your Event" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#581c87 0%,#7e22ce 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "We Create
Magical Moments", subtitle: "From intimate gatherings to grand weddings, we plan, design and execute unforgettable events across Ghana.", ctaText: "Start Planning", ctaHref: "#contact", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "What We Do", features: [{ icon: "💍", title: "Weddings", desc: "Full wedding planning and day-of coordination" }, { icon: "🎂", title: "Birthdays", desc: "Themed birthday parties for all ages" }, { icon: "🏢", title: "Corporate Events", desc: "Conferences, launches and award ceremonies" }, { icon: "⛪", title: "Funerals & Outdooring", desc: "Dignified and beautiful event management" }, { icon: "🎓", title: "Graduation", desc: "Celebratory setups and event organisation" }, { icon: "🌸", title: "Baby Showers", desc: "Adorable themes and full coordination" }] } }
          ] },
          { id: "s-gallery", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fdf4ff" }, elements: [
            { id: "gl-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Past Events", level: "h2" } },
            { id: "gl-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-testimonials", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ts-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "What Clients Say", level: "h2" } },
            { id: "ts-t", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Adwoa transformed our wedding into a fairy tale. Every detail was perfect. We couldn't have asked for more!", author: "Esi & Kofi Boateng", role: "Wedding Clients, 2024" } }
          ] },
          { id: "s-packages", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fdf4ff" }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Packages", level: "h2" } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Essential", price: "2,000", period: "/ event", features: ["Up to 100 guests", "Décor & setup", "Day-of coordination", "1 coordinator"], cta: "Book Now" }, { name: "Premium", price: "5,000", period: "/ event", features: ["Up to 300 guests", "Full planning", "Custom décor", "Catering coordination", "Photography referral"], cta: "Most Popular", highlighted: true }, { name: "Luxury", price: "12,000", period: "/ event", features: ["500+ guests", "End-to-end planning", "Bespoke décor", "Full vendor team", "Weekend events"], cta: "Enquire" }] } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#7e22ce" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Let's Plan Your Event", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "event", label: "Type of Event", type: "text", required: true }, { name: "date", label: "Event Date", type: "text", required: false }, { name: "guests", label: "Estimated Guests", type: "text", required: false }, { name: "message", label: "Tell us more", type: "textarea", required: false }], submitText: "Start Planning" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Celebrations by Adwoa. Every moment deserves to be magical.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "consultant",
    name: "Freelancer / Consultant",
    description: "Personal brand template for consultants, coaches and freelancers",
    category: "Personal",
    thumbnail: "💼",
    primaryColor: "#2563eb",
    secondaryColor: "#dbeafe",
    builderJson: {
      siteSettings: { siteName: "Kofi Mensah – Business Consultant", primaryColor: "#2563eb", secondaryColor: "#dbeafe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8fafc" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Kofi Mensah – Business Consultant", description: "Helping businesses grow, scale and succeed in Ghana and Africa" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Kofi Mensah", links: [{ label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "Testimonials", href: "#testimonials" }, { label: "Contact", href: "#contact" }], ctaText: "Book a Call" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1d4ed8 0%,#2563eb 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "I Help Businesses
Grow & Scale", subtitle: "10+ years helping Ghanaian entrepreneurs build systems, raise capital and dominate their market.", ctaText: "Book Free Strategy Call", ctaHref: "#contact", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "150+", label: "Clients Served" }, { number: "10yrs", label: "Experience" }, { number: "GHS 5M+", label: "Revenue Generated" }, { number: "4.9★", label: "Client Rating" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "How I Help You", features: [{ icon: "📊", title: "Business Strategy", desc: "Market entry, growth plans and competitive positioning" }, { icon: "💰", title: "Fundraising", desc: "Pitch decks, investor introductions and grant applications" }, { icon: "⚙️", title: "Operations", desc: "Systems, SOPs and process optimisation" }, { icon: "📱", title: "Digital Transformation", desc: "Tech adoption and online business development" }] } }
          ] },
          { id: "s-about", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ab-it", type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "About Kofi", body: "With a background in finance, strategy and entrepreneurship, I've spent 10 years in the trenches building and advising businesses across Ghana, Nigeria and the UK. I don't just give advice — I roll up my sleeves and work alongside you.", image: "", imageLeft: false } }
          ] },
          { id: "s-testimonials", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f8fafc" }, elements: [
            { id: "ts-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Client Results", level: "h2" } },
            { id: "ts-t", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Kofi helped us grow from GHS 200k to GHS 1.2M revenue in 18 months. His strategic thinking is unmatched.", author: "Abena Darko", role: "CEO, DarkoFoods Ltd" } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#2563eb" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px", color: "#fff" }, content: { text: "Book a Free 30-Min Call", level: "h2" } },
            { id: "ct-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", marginBottom: "32px" }, content: { text: "No pressure. Just a conversation about your business and where you want to go." } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "business", label: "Your Business / Industry", type: "text", required: true }, { name: "challenge", label: "Your biggest challenge right now", type: "textarea", required: true }], submitText: "Book My Call" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Kofi Mensah Consulting. Building Africa's next generation of great businesses.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "pharmacy",
    name: "Pharmacy",
    description: "Clean, trustworthy template for pharmacies and chemists",
    category: "Healthcare",
    thumbnail: "💊",
    primaryColor: "#16a34a",
    secondaryColor: "#dcfce7",
    builderJson: {
      siteSettings: { siteName: "Vida Pharmacy", primaryColor: "#16a34a", secondaryColor: "#dcfce7", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdf4" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Vida Pharmacy – Your Health Partner", description: "Certified pharmacy with genuine medicines and expert advice" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Vida Pharmacy", links: [{ label: "Products", href: "#products" }, { label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }], ctaText: "Order Medicines" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#15803d 0%,#16a34a 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Your Trusted Health Partner", subtitle: "Genuine medicines, expert pharmacist advice and health products. Now with home delivery across Accra.", ctaText: "Order Now", ctaHref: "#order", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "💊", title: "Prescription Medicines", desc: "Certified pharmacists to dispense all prescriptions" }, { icon: "🏥", title: "OTC Products", desc: "Pain relief, vitamins, skincare and wellness products" }, { icon: "🚚", title: "Home Delivery", desc: "Same-day delivery within Accra (GHS 10)" }, { icon: "👨‍⚕️", title: "Health Advice", desc: "Free consultations with our licensed pharmacists" }, { icon: "💉", title: "Vaccinations", desc: "Flu, travel and childhood vaccination services" }, { icon: "🧪", title: "Health Screening", desc: "Blood pressure, glucose and BMI checks" }] } }
          ] },
          { id: "s-order", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0fdf4" }, elements: [
            { id: "or-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Order Medicines Online", level: "h2" } },
            { id: "or-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "address", label: "Delivery Address", type: "text", required: true }, { name: "items", label: "Medicine(s) needed", type: "textarea", required: true }], submitText: "Place Order" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px 40px" }, elements: [{ id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I need to order medicines." } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Vida Pharmacy. Your health, our priority.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "logistics",
    name: "Logistics & Courier",
    description: "Professional template for courier, delivery and logistics companies",
    category: "Transport",
    thumbnail: "🚚",
    primaryColor: "#ea580c",
    secondaryColor: "#fff7ed",
    builderJson: {
      siteSettings: { siteName: "SwiftMove Logistics", primaryColor: "#ea580c", secondaryColor: "#fff7ed", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#fff7ed" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "SwiftMove Logistics – Fast, Reliable Delivery", description: "Same-day and next-day courier and freight services across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "SwiftMove", links: [{ label: "Services", href: "#services" }, { label: "Track", href: "#track" }, { label: "Pricing", href: "#pricing" }, { label: "Contact", href: "#contact" }], ctaText: "Get a Quote" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#c2410c 0%,#ea580c 100%)", padding: "90px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Deliver Anywhere in Ghana, Fast", subtitle: "Same-day Accra delivery. Next-day nationwide. Freight, parcels, documents — handled with care.", ctaText: "Get Instant Quote", ctaHref: "#quote", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "5,000+", label: "Deliveries Monthly" }, { number: "16", label: "Regions Covered" }, { number: "98%", label: "On-Time Rate" }, { number: "3hrs", label: "Avg Accra Delivery" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff7ed" }, elements: [{ id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "📦", title: "Parcel Delivery", desc: "Same-day and next-day parcels across Ghana" }, { icon: "📄", title: "Document Courier", desc: "Secure, tracked document delivery" }, { icon: "🏪", title: "E-commerce Fulfilment", desc: "Last-mile delivery for online stores" }, { icon: "🚛", title: "Freight & Bulk", desc: "Heavy cargo and bulk goods transport" }, { icon: "❄️", title: "Cold Chain", desc: "Temperature-controlled delivery for perishables" }, { icon: "🌍", title: "International", desc: "DHL partnership for global shipments" }] } }] },
          { id: "s-quote", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#ea580c" }, elements: [
            { id: "qt-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Get an Instant Quote", level: "h2" } },
            { id: "qt-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: True }, { name: "phone", label: "Phone", type: "tel", required: True }, { name: "pickup", label: "Pickup Location", type: "text", required: True }, { name: "delivery", label: "Delivery Location", type: "text", required: True }, { name: "item", label: "What are you sending?", type: "text", required: True }, { name: "weight", label: "Approximate Weight (kg)", type: "text", required: False }], submitText: "Get My Quote" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 SwiftMove Logistics. Delivering trust, one package at a time.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "interior-design",
    name: "Interior Design",
    description: "Elegant template for interior designers and home decor studios",
    category: "Creative",
    thumbnail: "🛋️",
    primaryColor: "#44403c",
    secondaryColor: "#fafaf9",
    builderJson: {
      siteSettings: { siteName: "Afia Interiors", primaryColor: "#44403c", secondaryColor: "#fafaf9", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#fafaf9" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Afia Interiors – Luxury Interior Design Ghana", description: "Transforming spaces into beautiful, functional homes" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Afia Interiors", links: [{ label: "Portfolio", href: "#portfolio" }, { label: "Services", href: "#services" }, { label: "Process", href: "#process" }, { label: "Contact", href: "#contact" }], ctaText: "Book Consultation" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#292524 0%,#44403c 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Spaces That Tell
Your Story", subtitle: "Award-winning interior design for homes, offices and hospitality spaces across Ghana and West Africa.", ctaText: "View Our Work", ctaHref: "#portfolio", image: "" } }] },
          { id: "s-portfolio", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pf-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Recent Projects", level: "h2" } },
            { id: "pf-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fafaf9" }, elements: [{ id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "🏠", title: "Residential Design", desc: "Complete home transformations from concept to completion" }, { icon: "🏢", title: "Commercial Spaces", desc: "Offices, restaurants and retail that elevate your brand" }, { icon: "🎨", title: "Concept & Mood Boards", desc: "Visual direction and design storytelling" }, { icon: "🛒", title: "Furniture Sourcing", desc: "Curated furniture, art and accessories" }] } }] },
          { id: "s-process", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [{ id: "pr-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Process", features: [{ icon: "1️⃣", title: "Discovery Call", desc: "We learn about your vision, budget and timeline" }, { icon: "2️⃣", title: "Concept Design", desc: "Mood boards, floor plans and 3D renders" }, { icon: "3️⃣", title: "Procurement", desc: "We source and coordinate all furnishings" }, { icon: "4️⃣", title: "Installation", desc: "Full setup with final styling and walkthrough" }] } }] },
          { id: "s-testimonial", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fafaf9" }, elements: [{ id: "ts-t", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Afia completely transformed our home. Every room feels like it was curated just for us. The attention to detail is extraordinary.", author: "Nana & Abena Owusu", role: "Residential Clients, East Legon" } }] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#44403c" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Start Your Project", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: True }, { name: "email", label: "Email", type: "email", required: True }, { name: "phone", label: "Phone", type: "tel", required: True }, { name: "project", label: "Project Type (Home / Office / Other)", type: "text", required: True }, { name: "budget", label: "Budget Range (GHS)", type: "text", required: False }, { name: "message", label: "Tell us about your space", type: "textarea", required: False }], submitText: "Book Free Consultation" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Afia Interiors. Beautiful spaces, beautifully done.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "printing",
    name: "Printing & Branding",
    description: "Template for print shops, branding and signage companies",
    category: "Business",
    thumbnail: "🖨️",
    primaryColor: "#1d4ed8",
    secondaryColor: "#dbeafe",
    builderJson: {
      siteSettings: { siteName: "PrintKing GH", primaryColor: "#1d4ed8", secondaryColor: "#dbeafe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8fafc" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "PrintKing GH – Printing, Branding & Signage", description: "High-quality printing for businesses across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "PrintKing GH", links: [{ label: "Products", href: "#products" }, { label: "Branding", href: "#branding" }, { label: "Order", href: "#order" }, { label: "Contact", href: "#contact" }], ctaText: "Get a Quote" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Make Your Brand
Unforgettable", subtitle: "Premium printing, signage and branding solutions. Business cards to billboards — fast turnaround, sharp quality.", ctaText: "Order Now", ctaHref: "#order", image: "" } }] },
          { id: "s-products", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [{ id: "pr-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "What We Print", features: [{ icon: "💳", title: "Business Cards", desc: "Matte, gloss, embossed and premium finishes" }, { icon: "📋", title: "Flyers & Brochures", desc: "A5, A4, tri-fold and custom sizes" }, { icon: "🪧", title: "Banners & Signage", desc: "Roll-up banners, flex prints and billboards" }, { icon: "👕", title: "T-Shirts & Uniforms", desc: "Embroidery and screen printing" }, { icon: "🎁", title: "Branded Merchandise", desc: "Mugs, pens, bags and corporate gifts" }, { icon: "📦", title: "Packaging & Labels", desc: "Custom boxes, stickers and product labels" }] } }] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#dbeafe" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Popular Products & Prices", level: "h2" } },
            { id: "pr-m", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "", items: [{ name: "Business Cards (500)", description: "Double-sided, gloss laminate", price: "GHS 80" }, { name: "A5 Flyers (500)", description: "Full colour both sides", price: "GHS 120" }, { name: "Roll-up Banner (85cm × 200cm)", description: "Full colour with stand", price: "GHS 180" }, { name: "T-Shirts (min 10)", description: "Screen print, 1 colour", price: "GHS 25 each" }] } }
          ] },
          { id: "s-order", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "or-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Place Your Order", level: "h2" } },
            { id: "or-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name / Company", type: "text", required: True }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: True }, { name: "product", label: "Product(s) needed", type: "text", required: True }, { name: "quantity", label: "Quantity", type: "text", required: True }, { name: "deadline", label: "Delivery Deadline", type: "text", required: False }], submitText: "Send Order" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px 40px" }, elements: [{ id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I need a print quote." } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 PrintKing GH. Print it right.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "security",
    name: "Security Company",
    description: "Authoritative template for security firms and private guard services",
    category: "Services",
    thumbnail: "🛡️",
    primaryColor: "#0f172a",
    secondaryColor: "#f1f5f9",
    builderJson: {
      siteSettings: { siteName: "Guardian Shield Security", primaryColor: "#0f172a", secondaryColor: "#f1f5f9", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#0f172a", textColor: "#e2e8f0" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Guardian Shield Security – Professional Security Services", description: "Licensed and trusted security services for homes and businesses" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#0f172a", borderBottom: "1px solid #1e293b" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Guardian Shield", links: [{ label: "Services", href: "#services" }, { label: "Why Us", href: "#why" }, { label: "Clients", href: "#clients" }, { label: "Contact", href: "#contact" }], ctaText: "Request Guards" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#020617 0%,#0f172a 60%,#1e3a5f 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Protecting What
Matters Most", subtitle: "Licensed, trained and trusted. Guardian Shield provides professional security for homes, businesses and events across Ghana.", ctaText: "Get a Security Assessment", ctaHref: "#contact", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#1e293b" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "500+", label: "Guards Deployed" }, { number: "200+", label: "Client Sites" }, { number: "15yrs", label: "In Operation" }, { number: "24/7", label: "Response" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f172a" }, elements: [{ id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "👮", title: "Manned Guarding", desc: "Uniformed guards for residential and commercial sites" }, { icon: "📹", title: "CCTV & Monitoring", desc: "24/7 remote surveillance and installation" }, { icon: "🚗", title: "Mobile Patrol", desc: "Regular patrol rounds for your property" }, { icon: "🎉", title: "Event Security", desc: "Crowd management and VIP protection" }, { icon: "🔒", title: "Access Control", desc: "Biometric and key card systems" }, { icon: "🚨", title: "Alarm Response", desc: "Fast armed response to triggered alarms" }] } }] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e293b" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Request a Security Assessment", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name / Company", type: "text", required: True }, { name: "phone", label: "Phone", type: "tel", required: True }, { name: "location", label: "Property Location", type: "text", required: True }, { name: "service", label: "Service Required", type: "text", required: True }, { name: "guards", label: "No. of Guards Needed", type: "text", required: False }], submitText: "Request Assessment" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 Guardian Shield Security. Protecting Ghana.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "construction",
    name: "Construction & Building",
    description: "Solid, professional template for construction and contracting companies",
    category: "Business",
    thumbnail: "🏗️",
    primaryColor: "#ca8a04",
    secondaryColor: "#fefce8",
    builderJson: {
      siteSettings: { siteName: "BuildRight Construction", primaryColor: "#ca8a04", secondaryColor: "#fefce8", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8fafc" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "BuildRight Construction – Quality Building & Civil Works", description: "Trusted construction company delivering quality projects across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "BuildRight", links: [{ label: "Services", href: "#services" }, { label: "Projects", href: "#projects" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }], ctaText: "Get a Quote" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#78350f 0%,#ca8a04 100%)", padding: "90px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Building Ghana's
Future, One Slab at a Time", subtitle: "20 years of delivering quality residential, commercial and civil construction projects across Ghana. On time. On budget.", ctaText: "View Our Projects", ctaHref: "#projects", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "300+", label: "Projects Completed" }, { number: "20yrs", label: "Experience" }, { number: "100+", label: "Staff & Artisans" }, { number: "GHS 50M+", label: "Projects Delivered" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fefce8" }, elements: [{ id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "🏠", title: "Residential Building", desc: "Bungalows, townhouses and estate housing" }, { icon: "🏢", title: "Commercial Construction", desc: "Offices, shopping centres and warehouses" }, { icon: "🛣️", title: "Civil & Road Works", desc: "Road construction and drainage systems" }, { icon: "🏗️", title: "Renovation", desc: "Remodelling and facility upgrades" }, { icon: "🔧", title: "Plumbing & Electrical", desc: "MEP works for all building types" }, { icon: "📐", title: "Quantity Surveying", desc: "Cost estimation and project management" }] } }] },
          { id: "s-projects", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pj-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Recent Projects", level: "h2" } },
            { id: "pj-g", type: "gallery", isVisible: true, isLocked: false, styles: {}, content: { images: [], columns: 3 } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#ca8a04" }, elements: [
            { id: "ct-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Get a Free Quote", level: "h2" } },
            { id: "ct-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name / Company", type: "text", required: True }, { name: "phone", label: "Phone", type: "tel", required: True }, { name: "project", label: "Project Type", type: "text", required: True }, { name: "location", label: "Project Location", type: "text", required: True }, { name: "description", label: "Brief Description", type: "textarea", required: False }], submitText: "Request Quote" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 BuildRight Construction. Quality you can build on.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "tutoring",
    name: "Online Tutoring",
    description: "Bright, engaging template for tutors, coaches and online educators",
    category: "Education",
    thumbnail: "📚",
    primaryColor: "#7c3aed",
    secondaryColor: "#ede9fe",
    builderJson: {
      siteSettings: { siteName: "AceMind Tutoring", primaryColor: "#7c3aed", secondaryColor: "#ede9fe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#faf5ff" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "AceMind Tutoring – Private Tutors for BECE, WASSCE & University", description: "Expert tutoring to boost grades and build confidence" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "AceMind", links: [{ label: "Subjects", href: "#subjects" }, { label: "Tutors", href: "#tutors" }, { label: "Pricing", href: "#pricing" }, { label: "Book", href: "#book" }], ctaText: "Book Free Trial" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#5b21b6 0%,#7c3aed 100%)", padding: "90px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Better Grades.
Bigger Dreams.", subtitle: "Expert tutors for BECE, WASSCE, university entry and beyond. Online and in-person sessions across Ghana.", ctaText: "Book Free Trial Lesson", ctaHref: "#book", image: "" } }] },
          { id: "s-stats", type: "section", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "1,500+", label: "Students Tutored" }, { number: "95%", label: "Grade Improvement" }, { number: "50+", label: "Expert Tutors" }, { number: "15+", label: "Subjects" }] } }] },
          { id: "s-subjects", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#ede9fe" }, elements: [{ id: "sb-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Subjects We Offer", features: [{ icon: "➕", title: "Mathematics", desc: "Core & Elective Maths from JHS to university" }, { icon: "🔬", title: "Science", desc: "Biology, Chemistry and Physics" }, { icon: "📖", title: "English Language", desc: "Grammar, comprehension and essay writing" }, { icon: "💻", title: "ICT / Computing", desc: "Programming, databases and web design" }, { icon: "🌍", title: "Social Studies / History", desc: "BECE and WASSCE social sciences" }, { icon: "📊", title: "Economics / Accounts", desc: "A-Level and SHS economics" }] } }] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Session Plans", level: "h2" } },
            { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Single Session", price: "80", period: "/ hour", features: ["1 subject", "Online or in-person", "Homework review", "Progress report"], cta: "Book Now" }, { name: "Weekly Plan", price: "250", period: "/ month", features: ["4 sessions/month", "1 subject", "WhatsApp support", "Mock exams"], cta: "Most Popular", highlighted: True }, { name: "Intensive", price: "600", period: "/ month", features: ["12 sessions/month", "Up to 3 subjects", "Daily check-ins", "Parent updates", "Exam prep"], cta: "Book Now" }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#7c3aed" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Book a Free Trial", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Student Name", type: "text", required: True }, { name: "phone", label: "Parent/Guardian Phone", type: "tel", required: True }, { name: "grade", label: "Year / Grade Level", type: "text", required: True }, { name: "subject", label: "Subject(s) needed", type: "text", required: True }, { name: "mode", label: "Online or In-Person?", type: "text", required: False }], submitText: "Book My Free Trial" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 AceMind Tutoring. Every child can excel.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "spa-wellness",
    name: "Spa & Wellness",
    description: "Calming, luxurious template for spas, yoga studios and wellness centres",
    category: "Health",
    thumbnail: "🧘",
    primaryColor: "#0d9488",
    secondaryColor: "#f0fdfa",
    builderJson: {
      siteSettings: { siteName: "Serenity Spa & Wellness", primaryColor: "#0d9488", secondaryColor: "#f0fdfa", fontFamily: "Georgia, serif" },
      globalStyles: { bodyBackground: "#f0fdfa" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Serenity Spa & Wellness – Relax, Restore, Revive", description: "Luxury spa treatments, yoga and wellness therapies" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "Serenity", links: [{ label: "Treatments", href: "#treatments" }, { label: "Yoga", href: "#yoga" }, { label: "Book", href: "#book" }, { label: "Gift Cards", href: "#gift" }], ctaText: "Book a Session" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#134e4a 0%,#0d9488 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Find Your Calm.
Feed Your Soul.", subtitle: "Luxury spa treatments, yoga classes and holistic wellness therapies. Your sanctuary from the everyday.", ctaText: "Book Your Escape", ctaHref: "#book", image: "" } }] },
          { id: "s-treatments", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [{ id: "tr-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Treatments", features: [{ icon: "💆", title: "Deep Tissue Massage", desc: "60 & 90-minute full body release sessions" }, { icon: "🌸", title: "Aromatherapy", desc: "Essential oil massage for stress and tension" }, { icon: "🛁", title: "Body Scrubs", desc: "Exfoliating treatments for glowing skin" }, { icon: "💅", title: "Manicure & Pedicure", desc: "Luxury nail care with premium products" }, { icon: "🧖", title: "Facials", desc: "Deep cleanse, brightening and anti-ageing treatments" }, { icon: "🏊", title: "Hydrotherapy", desc: "Water-based relaxation and healing" }] } }] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0fdfa" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Treatment Prices", level: "h2" } },
            { id: "pr-m", type: "menu-section", isVisible: true, isLocked: false, styles: {}, content: { title: "", items: [{ name: "60-Min Massage", description: "Swedish or deep tissue", price: "GHS 220" }, { name: "90-Min Massage", description: "With hot stones", price: "GHS 350" }, { name: "Full Facial", description: "60-minute luxury facial", price: "GHS 180" }, { name: "Spa Day Package", description: "Massage + facial + mani-pedi", price: "GHS 600" }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0d9488" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Book Your Treatment", level: "h2" } },
            { id: "bk-b", type: "booking-widget", isVisible: true, isLocked: false, styles: {}, content: { title: "", subtitle: "Choose your treatment and preferred time.", buttonText: "Book Now", buttonHref: "#book-form" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "20px auto 0" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: True }, { name: "phone", label: "Phone", type: "tel", required: True }, { name: "treatment", label: "Treatment", type: "text", required: True }, { name: "date", label: "Preferred Date & Time", type: "text", required: True }], submitText: "Confirm Booking" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Serenity Spa & Wellness. Your peace awaits.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "gaming-cafe",
    name: "Gaming Café / Esports",
    description: "High-energy template for gaming cafés, esports arenas and gaming centres",
    category: "Entertainment",
    thumbnail: "🎮",
    primaryColor: "#6d28d9",
    secondaryColor: "#1a1a2e",
    builderJson: {
      siteSettings: { siteName: "GhanaGameZone", primaryColor: "#6d28d9", secondaryColor: "#1a1a2e", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#0a0a1a", textColor: "#e2e8f0" },
      pages: [{ id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "GhanaGameZone – Ghana's Premier Gaming Café & Esports Arena", description: "High-speed gaming PCs, consoles, esports tournaments and more" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#0a0a1a", borderBottom: "1px solid #6d28d9" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "GhanaGameZone", links: [{ label: "Stations", href: "#stations" }, { label: "Tournaments", href: "#tournaments" }, { label: "Pricing", href: "#pricing" }, { label: "Book", href: "#book" }], ctaText: "Book a Station" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0a0a1a 0%,#1e1b4b 50%,#4c1d95 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Level Up Your Game.", subtitle: "Ghana's most epic gaming arena. 60+ high-spec PCs, PS5s, tournaments and a vibe like no other. Come to play. Stay to win.", ctaText: "Book a Session", ctaHref: "#book", image: "" } }] },
          { id: "s-stations", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f0f1f" }, elements: [{ id: "st-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Gaming Stations", features: [{ icon: "🖥️", title: "Gaming PCs", desc: "60 stations with RTX 4080, 165Hz monitors, mechanical keyboards" }, { icon: "🎮", title: "PlayStation 5", desc: "10 PS5 stations with 4K TVs and top titles" }, { icon: "🏆", title: "Esports Arena", desc: "Dedicated 20-seat tournament space with streaming setup" }, { icon: "🥤", title: "Café & Snacks", desc: "Energy drinks, shawarma, waffles and more" }, { icon: "📶", title: "1Gbps Fibre", desc: "Zero lag guaranteed on all stations" }, { icon: "🎧", title: "VR Zone", desc: "Meta Quest 3 VR experiences" }] } }] },
          { id: "s-pricing", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0a0a1a" }, elements: [
            { id: "pr-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Pricing", level: "h2" } },
            { id: "pr-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Casual", price: "15", period: "/ hour", features: ["PC or PS5", "High-speed internet", "Noise-cancelling headset", "Pay as you go"], cta: "Walk In" }, { name: "Gamer Pack", price: "50", period: "/ day (6hrs)", features: ["Pick any station", "Free drinks (2)", "Locker storage", "Priority booking"], cta: "Most Popular", highlighted: True }, { name: "Monthly Pass", price: "200", period: "/ month", features: ["Unlimited sessions", "Reserved seat option", "Tournament entries", "10% café discount"], cta: "Subscribe" }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e1b4b" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#fff" }, content: { text: "Book a Station", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: True }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: True }, { name: "station", label: "Station Type (PC / PS5 / VR)", type: "text", required: True }, { name: "date", label: "Date & Time", type: "text", required: True }, { name: "duration", label: "Duration (hours)", type: "text", required: False }], submitText: "Reserve My Station" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 GhanaGameZone. Play hard. Win harder.", links: [] } }] }
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
// ── Additional templates appended ────────────────────────────

  {
    id: "travel-agency",
    name: "Travel Agency",
    description: "Eye-catching template for travel agencies, tour operators and holiday planners",
    category: "Services",
    siteType: "TRAVEL",
    thumbnail: "✈️",
    primaryColor: "#0369a1",
    secondaryColor: "#e0f2fe",
    featured: true,
    builderJson: {
      siteSettings: { siteName: "SkyBound Travel", primaryColor: "#0369a1", secondaryColor: "#e0f2fe", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0f9ff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "SkyBound Travel – Your Africa & Beyond Travel Experts", description: "Affordable holiday packages, visa assistance and group travel from Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "✈️ SkyBound Travel", links: [{ label: "Destinations", href: "#destinations" }, { label: "Packages", href: "#packages" }, { label: "Visa Help", href: "#visa" }, { label: "Contact", href: "#contact" }], ctaText: "Book a Trip" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0c4a6e 0%,#0369a1 60%,#0ea5e9 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Explore the World From Ghana", subtitle: "Dubai, London, Turkey, Cape Verde & more. Affordable packages with visa assistance, flight tickets and hotel booking.", ctaText: "View Packages", ctaHref: "#packages", image: "" } }] },
          { id: "s-stats", type: "stats", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "stats-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "500+", label: "Trips Completed" }, { number: "30+", label: "Destinations" }, { number: "2000+", label: "Happy Travellers" }, { number: "5★", label: "Average Rating" }] } }] },
          { id: "s-destinations", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0f9ff" }, elements: [
            { id: "d-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Popular Destinations", level: "h2" } },
            { id: "d-t", type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "We fly you to over 30 amazing destinations with full support" } },
            { id: "d-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🇦🇪", title: "Dubai, UAE", desc: "4 nights from GHS 4,500 incl. visa & hotel" }, { icon: "🇬🇧", title: "United Kingdom", desc: "6 nights from GHS 8,000 — visa assistance included" }, { icon: "🇹🇷", title: "Turkey", desc: "5 nights Istanbul from GHS 3,800" }, { icon: "🇵🇹", title: "Portugal", desc: "Schengen visa gateway — 5 nights from GHS 5,200" }, { icon: "🇨🇻", title: "Cape Verde", desc: "Beach holiday — 4 nights from GHS 3,200" }, { icon: "🌍", title: "Africa Tours", desc: "Kenya, Tanzania, South Africa safari packages" }] } }
          ] },
          { id: "s-packages", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Holiday Packages", level: "h2" } },
            { id: "pk-p", type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [{ name: "Budget Explorer", price: "From GHS 2,500", period: "per person", features: ["Return flight ticket", "3-star hotel (4 nights)", "Airport transfers", "Travel insurance"], cta: "Book Now", highlighted: false }, { name: "Comfort Plus", price: "From GHS 4,500", period: "per person", features: ["Return flight ticket", "4-star hotel (5 nights)", "Airport transfers", "Travel insurance", "Daily breakfast", "City tour"], cta: "Book Now", highlighted: true }, { name: "Premium VIP", price: "From GHS 8,000", period: "per person", features: ["Business class upgrade", "5-star hotel (6 nights)", "Private transfers", "Full-day guided tours", "All meals included", "24/7 concierge"], cta: "Book Now", highlighted: false }] } }
          ] },
          { id: "s-book", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0f9ff" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Book Your Trip", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "560px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "destination", label: "Destination", type: "text", required: true }, { name: "passengers", label: "Number of Passengers", type: "text", required: true }, { name: "travelDate", label: "Preferred Travel Date", type: "text", required: false }, { name: "budget", label: "Budget (GHS)", type: "text", required: false }], submitText: "Request Quote" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px 40px" }, elements: [{ id: "wa-el", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hello! I'd like to inquire about travel packages." } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft-el", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 SkyBound Travel. Licensed travel agency in Ghana.", links: [{ label: "Privacy", href: "#" }] } }] }
        ]
      }]
    }
  },

  {
    id: "beauty-cosmetics",
    name: "Beauty & Cosmetics",
    description: "Glamorous template for beauty brands, skincare lines and cosmetics shops",
    category: "Beauty",
    siteType: "BUSINESS",
    thumbnail: "💄",
    primaryColor: "#be185d",
    secondaryColor: "#fdf2f8",
    featured: true,
    builderJson: {
      siteSettings: { siteName: "Lumière Beauty", primaryColor: "#be185d", secondaryColor: "#fdf2f8", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#fdf2f8" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Lumière Beauty – Premium Skincare & Cosmetics", description: "Luxury skincare and beauty products crafted for African skin" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "✨ Lumière", links: [{ label: "Shop", href: "#shop" }, { label: "Skincare", href: "#skincare" }, { label: "Makeup", href: "#makeup" }, { label: "About", href: "#about" }], ctaText: "Shop Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#831843 0%,#be185d 60%,#ec4899 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Beauty That Celebrates You", subtitle: "Premium skincare and cosmetics formulated for melanin-rich skin. Glow up with confidence.", ctaText: "Shop the Collection", ctaHref: "#shop", image: "" } }] },
          { id: "s-features", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "ft-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Why Lumière?", features: [{ icon: "🌿", title: "Natural Ingredients", desc: "Shea butter, cocoa butter & African botanicals" }, { icon: "✅", title: "Dermatologist Tested", desc: "Safe for all skin tones and types" }, { icon: "🚫", title: "No Harmful Chemicals", desc: "Paraben-free, sulfate-free formulations" }, { icon: "♻️", title: "Eco-Friendly", desc: "Sustainable packaging, cruelty-free" }, { icon: "🏆", title: "Award Winning", desc: "Best skincare brand in Ghana 2024" }, { icon: "🚚", title: "Nationwide Delivery", desc: "Free delivery on orders above GHS 200" }] } }
          ] },
          { id: "s-testimonials", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fdf2f8" }, elements: [
            { id: "tes-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "What Our Customers Say", level: "h2" } },
            { id: "tes-1", type: "testimonial", isVisible: true, isLocked: false, styles: { marginBottom: "20px" }, content: { quote: "My skin has never looked this radiant! The Glow Serum cleared my dark spots in 3 weeks.", author: "Abena K.", role: "Verified Customer", avatar: "" } },
            { id: "tes-2", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Finally a brand that understands our skin. The moisture cream is absolutely perfect.", author: "Fatima D.", role: "Verified Customer", avatar: "" } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "c-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Get in Touch", level: "h2" } },
            { id: "c-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "480px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "inquiry", label: "What are you looking for?", type: "textarea", required: true }], submitText: "Send Message" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px" }, elements: [{ id: "wa", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I'd like to order beauty products." } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Lumière Beauty. Celebrating African beauty.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "auto-workshop",
    name: "Auto Workshop",
    description: "Bold template for car repair shops, mechanics and auto service centres",
    category: "Automotive",
    siteType: "BUSINESS",
    thumbnail: "🔧",
    primaryColor: "#dc2626",
    secondaryColor: "#fef2f2",
    builderJson: {
      siteSettings: { siteName: "ProAuto Workshop", primaryColor: "#dc2626", secondaryColor: "#fef2f2", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#0f172a", textColor: "#f1f5f9" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "ProAuto Workshop – Expert Car Repairs in Accra", description: "Certified mechanics for all makes and models. Engine repair, AC service, electrical, tyres and more." },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#0f172a" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🔧 ProAuto", links: [{ label: "Services", href: "#services" }, { label: "Booking", href: "#booking" }, { label: "About", href: "#about" }], ctaText: "Book Service" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#dc2626 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Trusted Car Repairs in Accra", subtitle: "Certified mechanics. Genuine parts. Guaranteed workmanship. All vehicle makes and models.", ctaText: "Book a Service", ctaHref: "#booking", image: "" } }] },
          { id: "s-stats", type: "stats", isVisible: true, styles: { padding: "40px", background: "#1e293b" }, elements: [{ id: "stats-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "5000+", label: "Cars Serviced" }, { number: "12yr", label: "In Business" }, { number: "15", label: "Certified Mechanics" }, { number: "24hr", label: "Turnaround Time" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#1e293b" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "🔧", title: "Engine Repair", desc: "Full engine diagnostics, overhaul and repair" }, { icon: "❄️", title: "AC Service", desc: "Gas refill, compressor repair and full AC service" }, { icon: "⚡", title: "Electrical", desc: "Wiring, battery, alternator and ECU diagnostics" }, { icon: "🛞", title: "Tyres & Alignment", desc: "New tyres, balancing and wheel alignment" }, { icon: "🛢️", title: "Oil & Filters", desc: "Engine oil, transmission and brake fluid service" }, { icon: "🚗", title: "Full Service", desc: "Comprehensive 50-point inspection and service" }] } }
          ] },
          { id: "s-booking", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#0f172a" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#f1f5f9" }, content: { text: "Book a Service", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "540px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Your Name", type: "text", required: true }, { name: "phone", label: "Phone Number", type: "tel", required: true }, { name: "car", label: "Car Make & Model", type: "text", required: true }, { name: "issue", label: "Describe the issue", type: "textarea", required: true }, { name: "date", label: "Preferred Date", type: "text", required: false }], submitText: "Book Now" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px", background: "#0f172a" }, elements: [{ id: "wa", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi! I need to book a car service." } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { background: "#0f172a" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#94a3b8" }, content: { text: "© 2025 ProAuto Workshop. Quality you can trust.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "agriculture",
    name: "Agriculture & Farming",
    description: "Vibrant template for farms, agribusinesses and agricultural cooperatives",
    category: "Services",
    siteType: "BUSINESS",
    thumbnail: "🌾",
    primaryColor: "#15803d",
    secondaryColor: "#dcfce7",
    builderJson: {
      siteSettings: { siteName: "GreenFields Farm", primaryColor: "#15803d", secondaryColor: "#dcfce7", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f0fdf4" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "GreenFields Farm – Fresh Produce Direct from the Farm", description: "Fresh vegetables, fruits and organic produce delivered across Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🌾 GreenFields", links: [{ label: "Products", href: "#products" }, { label: "About", href: "#about" }, { label: "Order", href: "#order" }], ctaText: "Order Fresh" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#14532d 0%,#15803d 60%,#22c55e 100%)", padding: "100px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Fresh From Our Farm to Your Table", subtitle: "Certified organic vegetables, fruits and grains grown sustainably in the Volta Region. Weekly delivery to Accra.", ctaText: "Order This Week", ctaHref: "#order", image: "" } }] },
          { id: "s-products", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "p-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "What We Grow", level: "h2" } },
            { id: "p-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🥬", title: "Vegetables", desc: "Tomatoes, peppers, cabbage, garden eggs, lettuce" }, { icon: "🫚", title: "Palm Products", desc: "Red palm oil, palm kernel oil, palm nuts" }, { icon: "🍌", title: "Fruits", desc: "Plantain, banana, pineapple, watermelon, mango" }, { icon: "🌽", title: "Grains", desc: "Maize, sorghum, rice, groundnuts, soybeans" }, { icon: "🌿", title: "Herbs & Spices", desc: "Ginger, garlic, turmeric, moringa, basil" }, { icon: "🐔", title: "Poultry", desc: "Free-range chickens, eggs and guinea fowl" }] } }
          ] },
          { id: "s-why", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#f0fdf4" }, elements: [
            { id: "w-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Why GreenFields?", features: [{ icon: "✅", title: "Certified Organic", desc: "No chemicals or pesticides in our growing process" }, { icon: "🚚", title: "Weekly Delivery", desc: "Fresh produce delivered every Friday across Accra" }, { icon: "💰", title: "Farm Gate Prices", desc: "Buy directly from the farm — no middlemen markup" }, { icon: "🌍", title: "Supporting Local", desc: "70+ farming families employed in the Volta Region" }] } }
          ] },
          { id: "s-order", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "o-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Place a Weekly Order", level: "h2" } },
            { id: "o-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true }, { name: "location", label: "Delivery Location", type: "text", required: true }, { name: "items", label: "What do you need? (items & quantities)", type: "textarea", required: true }], submitText: "Place Order" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px" }, elements: [{ id: "wa", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hi GreenFields! I'd like to order fresh produce." } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 GreenFields Farm. Grown with love in Ghana.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "childcare",
    name: "Childcare & Daycare",
    description: "Warm, colourful template for creches, daycares and nursery schools",
    category: "Education",
    siteType: "BUSINESS",
    thumbnail: "🧸",
    primaryColor: "#d97706",
    secondaryColor: "#fef3c7",
    builderJson: {
      siteSettings: { siteName: "Little Stars Daycare", primaryColor: "#d97706", secondaryColor: "#fef3c7", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#fffbeb" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Little Stars Daycare – Safe & Nurturing Childcare", description: "Professional daycare and early childhood education for children aged 3 months to 6 years" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🌟 Little Stars", links: [{ label: "About", href: "#about" }, { label: "Programs", href: "#programs" }, { label: "Gallery", href: "#gallery" }, { label: "Enroll", href: "#enroll" }], ctaText: "Enroll Now" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#92400e 0%,#d97706 60%,#fbbf24 100%)", padding: "80px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Where Little Stars Shine Brightest", subtitle: "A safe, nurturing environment where children learn, play and grow. Ages 3 months to 6 years.", ctaText: "Schedule a Visit", ctaHref: "#enroll", image: "" } }] },
          { id: "s-programs", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "pr-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Programs", features: [{ icon: "🍼", title: "Infant Care (0–12m)", desc: "Safe, loving care with regular parent updates" }, { icon: "🦆", title: "Toddler Group (1–3yr)", desc: "Play-based learning, motor skills and socialisation" }, { icon: "📚", title: "Pre-School (3–6yr)", desc: "School readiness, reading, numbers and creativity" }, { icon: "🎨", title: "After School", desc: "Homework help, arts, sports and supervised play" }] } }
          ] },
          { id: "s-features", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fffbeb" }, elements: [
            { id: "ft-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Why Parents Choose Us", features: [{ icon: "🔒", title: "Safe Environment", desc: "CCTV, secure entry, first aid trained staff" }, { icon: "👩‍🏫", title: "Qualified Teachers", desc: "All staff are ECE certified with background checks" }, { icon: "🍎", title: "Nutritious Meals", desc: "Balanced meals and snacks prepared fresh daily" }, { icon: "📱", title: "Daily Updates", desc: "Photo reports and updates sent to parents every day" }] } }
          ] },
          { id: "s-testimonials", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "t-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "What Parents Say", level: "h2" } },
            { id: "t-1", type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "My daughter loves going to Little Stars every morning. The teachers are amazing and so patient.", author: "Maame Asante", role: "Parent of 3-year-old", avatar: "" } }
          ] },
          { id: "s-enroll", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fffbeb" }, elements: [
            { id: "e-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Enroll Your Child", level: "h2" } },
            { id: "e-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "parentName", label: "Parent/Guardian Name", type: "text", required: true }, { name: "phone", label: "Phone Number", type: "tel", required: true }, { name: "childName", label: "Child's Name", type: "text", required: true }, { name: "age", label: "Child's Age", type: "text", required: true }, { name: "startDate", label: "Preferred Start Date", type: "text", required: false }], submitText: "Schedule Visit" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px" }, elements: [{ id: "wa", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hello! I'd like to enroll my child at Little Stars." } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Little Stars Daycare. Nurturing the next generation.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "accounting-firm",
    name: "Accounting & Finance",
    description: "Professional template for accounting firms, auditors and financial advisors",
    category: "Professional",
    siteType: "BUSINESS",
    thumbnail: "📊",
    primaryColor: "#1e40af",
    secondaryColor: "#eff6ff",
    builderJson: {
      siteSettings: { siteName: "Mensah & Associates", primaryColor: "#1e40af", secondaryColor: "#eff6ff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#f8fafc" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Mensah & Associates – Chartered Accountants in Ghana", description: "Audit, tax, payroll and financial advisory services for businesses in Ghana" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "📊 Mensah & Associates", links: [{ label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "Team", href: "#team" }, { label: "Contact", href: "#contact" }], ctaText: "Free Consultation" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#1e3a8a 0%,#1e40af 60%,#3b82f6 100%)", padding: "90px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Your Financial Success Is Our Business", subtitle: "Chartered accountants providing audit, tax compliance, payroll and financial advisory for SMEs across Ghana.", ctaText: "Book Free Consultation", ctaHref: "#contact", image: "" } }] },
          { id: "s-stats", type: "stats", isVisible: true, styles: { padding: "40px", background: "#fff" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "200+", label: "Clients Served" }, { number: "15yr", label: "In Practice" }, { number: "8", label: "Qualified Accountants" }, { number: "100%", label: "Filing Success Rate" }] } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#eff6ff" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "📋", title: "Audit & Assurance", desc: "Statutory and internal audits to GRA and ICAG standards" }, { icon: "💰", title: "Tax Services", desc: "Corporate tax, VAT registration, filing and compliance" }, { icon: "💼", title: "Payroll Management", desc: "SSNIT, PAYE, tier 1/2/3 and payslip processing" }, { icon: "📈", title: "Financial Advisory", desc: "Business planning, projections and investor reports" }, { icon: "🏦", title: "Accounting Software", desc: "QuickBooks and Sage setup and training" }, { icon: "🤝", title: "Company Registration", desc: "GHS, Registrar General, EPA and sector permits" }] } }
          ] },
          { id: "s-team", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "tm-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Our Team", level: "h2" } },
            { id: "tm-1", type: "team-member", isVisible: true, isLocked: false, styles: {}, content: { name: "Kweku Mensah FCA", role: "Managing Partner", bio: "20 years in audit and tax with Big 4 experience", image: "" } },
            { id: "tm-2", type: "team-member", isVisible: true, isLocked: false, styles: {}, content: { name: "Ama Boateng CPA", role: "Tax Manager", bio: "Specialist in corporate tax and GRA disputes", image: "" } }
          ] },
          { id: "s-contact", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#eff6ff" }, elements: [
            { id: "c-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Free Initial Consultation", level: "h2" } },
            { id: "c-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "company", label: "Company Name", type: "text", required: false }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: true }, { name: "service", label: "Service Needed", type: "text", required: false }], submitText: "Book Consultation" } }
          ] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 Mensah & Associates. Chartered Accountants & Business Advisors.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "music-band",
    name: "Music Artist / Band",
    description: "Dynamic dark template for musicians, DJs, bands and music producers",
    category: "Creative",
    siteType: "PERSONAL",
    thumbnail: "🎵",
    primaryColor: "#7c3aed",
    secondaryColor: "#f5f3ff",
    featured: true,
    builderJson: {
      siteSettings: { siteName: "The Artist", primaryColor: "#7c3aed", secondaryColor: "#f5f3ff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#09090b", textColor: "#f4f4f5" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "Kojo Beat – Ghana's Finest Afrobeats Producer", description: "Music releases, booking info and collaborations" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: { background: "#09090b" }, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🎵 KOJO BEAT", links: [{ label: "Music", href: "#music" }, { label: "Events", href: "#events" }, { label: "About", href: "#about" }, { label: "Booking", href: "#booking" }], ctaText: "Book Me" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#09090b 0%,#1c0040 50%,#7c3aed 100%)", padding: "120px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Music That Moves the Soul", subtitle: "Afrobeats, Highlife and Afropop producer & artist from Accra, Ghana. Available for shows, features and studio sessions.", ctaText: "Stream My Music", ctaHref: "#music", image: "" } }] },
          { id: "s-stats", type: "stats", isVisible: true, styles: { padding: "40px", background: "#18181b" }, elements: [{ id: "st-el", type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [{ number: "5M+", label: "Streams" }, { number: "50+", label: "Songs Released" }, { number: "100+", label: "Shows Performed" }, { number: "10+", label: "Artists Produced" }] } }] },
          { id: "s-music", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#09090b" }, elements: [
            { id: "m-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "20px", color: "#f4f4f5" }, content: { text: "Latest Releases", level: "h2" } },
            { id: "m-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🎧", title: "\"Jollof Season\" (2024)", desc: "Single — Available on Audiomack, Spotify & YouTube" }, { icon: "🎧", title: "\"Accra Nights\" EP", desc: "5-track EP — 1.2M streams on Audiomack" }, { icon: "🎧", title: "\"Vibes Only\" Mixtape", desc: "Free download — Afrobeats x Highlife fusion" }] } }
          ] },
          { id: "s-events", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#18181b" }, elements: [
            { id: "ev-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px", color: "#f4f4f5" }, content: { text: "Upcoming Events", level: "h2" } },
            { id: "ev-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [{ icon: "🎤", title: "Accra City Festival", desc: "March 15 · Labadi Beach Hotel · Main Stage" }, { icon: "🎤", title: "Kumasi Music Awards", desc: "April 8 · KNUST Amphitheatre · Headline Act" }, { icon: "🎤", title: "Diaspora Tour — UK", desc: "May 2025 · London & Manchester" }] } }
          ] },
          { id: "s-booking", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#09090b" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px", color: "#f4f4f5" }, content: { text: "Booking & Collaborations", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "name", label: "Name / Organisation", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "type", label: "Type of booking (show / feature / production)", type: "text", required: true }, { name: "date", label: "Date / Timeframe", type: "text", required: false }, { name: "budget", label: "Budget Range", type: "text", required: false }], submitText: "Send Booking Request" } }
          ] },
          { id: "s-social", type: "section", isVisible: true, styles: { padding: "40px", background: "#09090b" }, elements: [{ id: "sl", type: "social-links", isVisible: true, isLocked: false, styles: {}, content: { links: [{ platform: "instagram", url: "#", label: "@kojobeat" }, { platform: "youtube", url: "#", label: "YouTube" }, { platform: "twitter", url: "#", label: "Twitter/X" }] } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: { background: "#09090b" }, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: { color: "#71717a" }, content: { text: "© 2025 Kojo Beat. All rights reserved.", links: [] } }] }
        ]
      }]
    }
  },

  {
    id: "vet-clinic",
    name: "Veterinary Clinic",
    description: "Friendly template for vet clinics, pet hospitals and animal care services",
    category: "Healthcare",
    siteType: "BUSINESS",
    thumbnail: "🐾",
    primaryColor: "#0891b2",
    secondaryColor: "#ecfeff",
    builderJson: {
      siteSettings: { siteName: "PawCare Vet Clinic", primaryColor: "#0891b2", secondaryColor: "#ecfeff", fontFamily: "Inter, system-ui, sans-serif" },
      globalStyles: { bodyBackground: "#ecfeff" },
      pages: [{
        id: "home", name: "Home", slug: "/", isHomePage: true,
        seo: { title: "PawCare Vet Clinic – Expert Animal Care in Accra", description: "Veterinary consultations, vaccinations, surgery and pet grooming for all animals" },
        sections: [
          { id: "s-nav", type: "nav", isVisible: true, styles: {}, elements: [{ id: "nav-el", type: "navigation", isVisible: true, isLocked: false, styles: {}, content: { logo: "🐾 PawCare", links: [{ label: "Services", href: "#services" }, { label: "Team", href: "#team" }, { label: "Book", href: "#booking" }], ctaText: "Book Appointment" } }] },
          { id: "s-hero", type: "hero", isVisible: true, styles: { background: "linear-gradient(135deg,#164e63 0%,#0891b2 60%,#22d3ee 100%)", padding: "90px 40px" }, elements: [{ id: "hero-el", type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Quality Care for Your Beloved Pets", subtitle: "Experienced veterinarians providing compassionate care for dogs, cats, birds and farm animals in Accra.", ctaText: "Book Appointment", ctaHref: "#booking", image: "" } }] },
          { id: "s-services", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#fff" }, elements: [
            { id: "sv-f", type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "Our Services", features: [{ icon: "💉", title: "Vaccinations", desc: "Core and non-core vaccines for all pets and farm animals" }, { icon: "🔬", title: "Diagnostics", desc: "Blood tests, X-ray and ultrasound on-site" }, { icon: "🏥", title: "Surgery", desc: "Spay/neuter, dental, orthopaedic and emergency surgery" }, { icon: "🛁", title: "Grooming", desc: "Bathing, haircut, nail clipping and ear cleaning" }, { icon: "🐄", title: "Farm Animals", desc: "Cattle, poultry, pigs and goat veterinary services" }, { icon: "🚨", title: "Emergency Care", desc: "24/7 emergency line for critical cases" }] } }
          ] },
          { id: "s-booking", type: "section", isVisible: true, styles: { padding: "60px 40px", background: "#ecfeff" }, elements: [
            { id: "bk-h", type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "32px" }, content: { text: "Book an Appointment", level: "h2" } },
            { id: "bk-f", type: "form", isVisible: true, isLocked: false, styles: { maxWidth: "500px", margin: "0 auto" }, content: { title: "", fields: [{ name: "ownerName", label: "Your Name", type: "text", required: true }, { name: "phone", label: "Phone Number", type: "tel", required: true }, { name: "petName", label: "Pet's Name & Species", type: "text", required: true }, { name: "concern", label: "Reason for Visit", type: "textarea", required: true }, { name: "date", label: "Preferred Date", type: "text", required: false }], submitText: "Book Appointment" } }
          ] },
          { id: "s-wa", type: "section", isVisible: true, styles: { padding: "20px" }, elements: [{ id: "wa", type: "whatsapp-button", isVisible: true, isLocked: false, styles: {}, content: { number: "233200000000", message: "Hello PawCare! I'd like to book a vet appointment." } }] },
          { id: "s-footer", type: "footer", isVisible: true, styles: {}, elements: [{ id: "ft", type: "footer", isVisible: true, isLocked: false, styles: {}, content: { text: "© 2025 PawCare Vet Clinic. Because every life matters.", links: [] } }] }
        ]
      }]
    }
  },

];