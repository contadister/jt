"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";
import { useBuilderStore } from "@/store/builderStore";
import type { BuilderElement, BuilderSection } from "@/lib/types/builder";

interface SectionTemplate {
  id: string;
  label: string;
  category: string;
  emoji: string;
  desc: string;
  preview: React.ReactNode;
  elements: Omit<BuilderElement, "id">[];
  styles?: Record<string, unknown>;
}

const makeSections = (): SectionTemplate[] => [
  // ── Hero ──────────────────────────────────────────────────────────
  {
    id: "hero-classic",
    label: "Hero — Classic",
    category: "Hero",
    emoji: "🏔️",
    desc: "Big headline + subtitle + CTA button",
    preview: (
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg p-4 h-20 flex flex-col justify-center">
        <div className="h-2 bg-white/80 rounded w-3/4 mb-1.5" />
        <div className="h-1.5 bg-white/40 rounded w-1/2 mb-3" />
        <div className="h-5 bg-white/90 rounded w-24 text-indigo-700 flex items-center justify-center text-[8px] font-bold">Get Started</div>
      </div>
    ),
    styles: { paddingTop: 100, paddingBottom: 100, backgroundColor: "#6272f1", textAlign: "center" },
    elements: [
      { type: "hero", isVisible: true, isLocked: false, styles: {}, content: { title: "Welcome to Your Website", subtitle: "Tell visitors what you do in one clear sentence.", ctaText: "Get Started", ctaHref: "#contact", image: "" } },
    ],
  },
  {
    id: "hero-split",
    label: "Hero — Image Split",
    category: "Hero",
    emoji: "🖼️",
    desc: "Text on left, image on right",
    preview: (
      <div className="bg-white border border-slate-100 rounded-lg p-3 h-20 flex gap-2">
        <div className="flex-1 flex flex-col justify-center gap-1.5">
          <div className="h-2 bg-slate-800 rounded w-full" />
          <div className="h-1.5 bg-slate-300 rounded w-3/4" />
          <div className="h-5 bg-indigo-600 rounded w-16" />
        </div>
        <div className="w-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg" />
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#ffffff" },
    elements: [
      { type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "Build Something Amazing", body: "We help you create stunning websites that convert visitors into customers.", image: "", imageLeft: false } },
    ],
  },
  // ── About ─────────────────────────────────────────────────────────
  {
    id: "about-us",
    label: "About Us",
    category: "About",
    emoji: "👋",
    desc: "Your story, mission & values",
    preview: (
      <div className="bg-slate-50 rounded-lg p-3 h-20 flex gap-2">
        <div className="w-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg" />
        <div className="flex-1 flex flex-col justify-center gap-1.5">
          <div className="h-2 bg-slate-700 rounded w-3/4" />
          <div className="h-1 bg-slate-300 rounded w-full" />
          <div className="h-1 bg-slate-300 rounded w-5/6" />
          <div className="h-1 bg-slate-300 rounded w-4/5" />
        </div>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" },
    elements: [
      { type: "image-text", isVisible: true, isLocked: false, styles: {}, content: { heading: "About Us", body: "Share your story here. Tell visitors who you are, what you stand for, and why they should choose you.", image: "", imageLeft: true } },
    ],
  },
  // ── Features / Services ───────────────────────────────────────────
  {
    id: "features-3col",
    label: "Features — 3 Columns",
    category: "Services",
    emoji: "⚡",
    desc: "Highlight your key benefits",
    preview: (
      <div className="bg-white rounded-lg p-3 h-20">
        <div className="h-1.5 bg-slate-700 rounded w-1/2 mx-auto mb-2" />
        <div className="grid grid-cols-3 gap-1.5">
          {[0,1,2].map(i => (
            <div key={i} className="bg-indigo-50 rounded p-1.5">
              <div className="w-4 h-4 bg-indigo-200 rounded mb-1" />
              <div className="h-1 bg-slate-300 rounded w-full mb-0.5" />
              <div className="h-1 bg-slate-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#ffffff" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "16px" }, content: { text: "Why Choose Us", level: "h2" } },
      { type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "48px" }, content: { text: "Here's what sets us apart from the competition." } },
      { type: "feature-grid", isVisible: true, isLocked: false, styles: {}, content: { heading: "", features: [
        { icon: "⚡", title: "Fast & Reliable", desc: "We deliver results quickly without cutting corners." },
        { icon: "🔒", title: "Secure & Trusted", desc: "Your data and privacy are always protected." },
        { icon: "💬", title: "Always Available", desc: "Our support team is here whenever you need us." },
      ] } },
    ],
  },
  {
    id: "services-list",
    label: "Services List",
    category: "Services",
    emoji: "📋",
    desc: "List your services with descriptions",
    preview: (
      <div className="bg-white rounded-lg p-3 h-20">
        <div className="h-1.5 bg-slate-700 rounded w-1/3 mb-3" />
        {[0,1,2].map(i => (
          <div key={i} className="flex gap-2 mb-1.5">
            <div className="w-3 h-3 bg-indigo-600 rounded flex-shrink-0 mt-0.5" />
            <div>
              <div className="h-1.5 bg-slate-600 rounded w-20 mb-0.5" />
              <div className="h-1 bg-slate-200 rounded w-28" />
            </div>
          </div>
        ))}
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#ffffff" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { marginBottom: "32px" }, content: { text: "Our Services", level: "h2" } },
      { type: "steps-process", isVisible: true, isLocked: false, styles: {}, content: { heading: "", steps: [
        { number: "01", title: "Consultation", desc: "We start with a deep dive into your needs and goals." },
        { number: "02", title: "Strategy", desc: "We craft a tailored plan designed for your success." },
        { number: "03", title: "Execution", desc: "We deliver results on time and on budget." },
      ] } },
    ],
  },
  // ── Testimonials ──────────────────────────────────────────────────
  {
    id: "testimonials",
    label: "Testimonials",
    category: "Social Proof",
    emoji: "⭐",
    desc: "Show customer reviews & trust",
    preview: (
      <div className="bg-slate-50 rounded-lg p-3 h-20">
        <div className="h-1.5 bg-slate-700 rounded w-1/3 mx-auto mb-2" />
        <div className="grid grid-cols-2 gap-1.5">
          {[0,1].map(i => (
            <div key={i} className="bg-white rounded p-1.5 border border-slate-100">
              <div className="text-[8px] text-yellow-400 mb-1">★★★★★</div>
              <div className="h-1 bg-slate-200 rounded w-full mb-0.5" />
              <div className="h-1 bg-slate-200 rounded w-3/4 mb-1.5" />
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-slate-200 rounded-full" />
                <div className="h-1 bg-slate-300 rounded w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "16px" }, content: { text: "What Our Customers Say", level: "h2" } },
      { type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Absolutely incredible service. Exceeded every expectation and delivered results beyond what we hoped for.", author: "Sarah Johnson", role: "CEO, TechStartup", avatar: "" } },
      { type: "testimonial", isVisible: true, isLocked: false, styles: {}, content: { quote: "Working with them transformed our business. Professional, fast, and genuinely cares about our success.", author: "Michael Owusu", role: "Founder, GrowthCo", avatar: "" } },
    ],
  },
  // ── Stats ─────────────────────────────────────────────────────────
  {
    id: "stats",
    label: "Stats & Numbers",
    category: "Social Proof",
    emoji: "📊",
    desc: "Build credibility with numbers",
    preview: (
      <div className="bg-indigo-600 rounded-lg p-3 h-20 flex items-center">
        <div className="grid grid-cols-4 gap-2 w-full">
          {["500+","10yr","98%","24/7"].map(n => (
            <div key={n} className="text-center">
              <div className="text-white font-bold text-[10px]">{n}</div>
              <div className="h-1 bg-white/30 rounded w-full mt-1" />
            </div>
          ))}
        </div>
      </div>
    ),
    styles: { paddingTop: 60, paddingBottom: 60, backgroundColor: "#6272f1" },
    elements: [
      { type: "stats-counter", isVisible: true, isLocked: false, styles: {}, content: { stats: [
        { value: "500+", label: "Happy Clients" },
        { value: "10yrs", label: "Experience" },
        { value: "98%", label: "Satisfaction Rate" },
        { value: "24/7", label: "Support" },
      ] } },
    ],
  },
  // ── Contact ───────────────────────────────────────────────────────
  {
    id: "contact-form",
    label: "Contact Form",
    category: "Contact",
    emoji: "📩",
    desc: "Let people reach you easily",
    preview: (
      <div className="bg-white rounded-lg p-3 h-20 border border-slate-100">
        <div className="h-1.5 bg-slate-700 rounded w-1/3 mb-2" />
        <div className="space-y-1.5">
          <div className="h-4 bg-slate-100 rounded border border-slate-200 w-full" />
          <div className="h-4 bg-slate-100 rounded border border-slate-200 w-full" />
          <div className="h-5 bg-indigo-600 rounded w-20" />
        </div>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#ffffff" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "12px" }, content: { text: "Get In Touch", level: "h2" } },
      { type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#64748b", marginBottom: "40px" }, content: { text: "Have a question or ready to start? We'd love to hear from you." } },
      { type: "form", isVisible: true, isLocked: false, styles: {}, content: { title: "", fields: [{ name: "name", label: "Full Name", type: "text", required: true }, { name: "email", label: "Email Address", type: "email", required: true }, { name: "message", label: "Message", type: "textarea", required: false }], submitText: "Send Message" } },
    ],
  },
  {
    id: "contact-info",
    label: "Contact Info",
    category: "Contact",
    emoji: "📍",
    desc: "Address, phone, map & hours",
    preview: (
      <div className="bg-slate-50 rounded-lg p-3 h-20 flex gap-2">
        <div className="flex-1 flex flex-col justify-center gap-1.5">
          {["📍 Your Address","📞 Your Phone","✉️ Your Email"].map(t => (
            <div key={t} className="text-[7px] text-slate-500">{t}</div>
          ))}
        </div>
        <div className="w-20 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center text-lg">🗺️</div>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "40px" }, content: { text: "Find Us", level: "h2" } },
      { type: "map", isVisible: true, isLocked: false, styles: {}, content: { address: "Accra, Ghana", zoom: 14 } },
      { type: "business-hours", isVisible: true, isLocked: false, styles: {}, content: { title: "Opening Hours", hours: [
        { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
        { day: "Saturday", time: "9:00 AM – 4:00 PM" },
        { day: "Sunday", time: "Closed" },
      ] } },
    ],
  },
  // ── Products ──────────────────────────────────────────────────────
  {
    id: "product-showcase",
    label: "Product Cards",
    category: "Store",
    emoji: "🛍️",
    desc: "Showcase your products for sale",
    preview: (
      <div className="bg-white rounded-lg p-2 h-20">
        <div className="h-1.5 bg-slate-700 rounded w-1/3 mx-auto mb-2" />
        <div className="grid grid-cols-3 gap-1">
          {[0,1,2].map(i => (
            <div key={i} className="bg-slate-50 rounded border border-slate-100">
              <div className="h-6 bg-gradient-to-br from-slate-200 to-slate-100" />
              <div className="p-1">
                <div className="h-1 bg-slate-300 rounded mb-0.5" />
                <div className="h-1 bg-indigo-400 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#ffffff" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "48px" }, content: { text: "Our Products", level: "h2" } },
      { type: "product-card", isVisible: true, isLocked: false, styles: {}, content: { name: "Product Name", price: 50, currency: "GHS", image: "", description: "A short description of this product." } },
    ],
  },
  // ── Pricing ───────────────────────────────────────────────────────
  {
    id: "pricing",
    label: "Pricing Table",
    category: "Store",
    emoji: "💰",
    desc: "Show your plans and packages",
    preview: (
      <div className="bg-slate-50 rounded-lg p-2 h-20">
        <div className="grid grid-cols-3 gap-1 h-full">
          {["Basic","Pro","Enterprise"].map((p,i) => (
            <div key={p} className={`rounded border ${i===1 ? "bg-indigo-600 border-indigo-600" : "bg-white border-slate-200"} p-1.5 flex flex-col`}>
              <div className={`text-[7px] font-bold ${i===1 ? "text-white" : "text-slate-600"} mb-1`}>{p}</div>
              <div className={`text-[8px] font-black ${i===1 ? "text-white" : "text-slate-800"}`}>GHS{[50,100,200][i]}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "48px" }, content: { text: "Simple, Transparent Pricing", level: "h2" } },
      { type: "pricing-table", isVisible: true, isLocked: false, styles: {}, content: { plans: [
        { name: "Basic", price: "GHS 50/mo", features: ["1 user", "5 projects", "Email support"], isPopular: false },
        { name: "Pro", price: "GHS 100/mo", features: ["5 users", "Unlimited projects", "Priority support", "Analytics"], isPopular: true },
        { name: "Enterprise", price: "GHS 200/mo", features: ["Unlimited users", "Custom features", "Dedicated manager", "SLA"], isPopular: false },
      ] } },
    ],
  },
  // ── FAQ ───────────────────────────────────────────────────────────
  {
    id: "faq",
    label: "FAQ",
    category: "Content",
    emoji: "❓",
    desc: "Answer common questions",
    preview: (
      <div className="bg-white rounded-lg p-3 h-20 border border-slate-100">
        <div className="h-1.5 bg-slate-700 rounded w-1/3 mb-2" />
        {[0,1,2].map(i => (
          <div key={i} className="flex justify-between items-center py-1 border-b border-slate-100">
            <div className="h-1 bg-slate-300 rounded w-3/4" />
            <div className="w-3 h-3 rounded-full bg-slate-200 flex-shrink-0" />
          </div>
        ))}
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#ffffff" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "48px" }, content: { text: "Frequently Asked Questions", level: "h2" } },
      { type: "faq-accordion", isVisible: true, isLocked: false, styles: {}, content: { items: [
        { q: "What makes you different from competitors?", a: "We focus entirely on results and client satisfaction. Our track record speaks for itself." },
        { q: "How long does a typical project take?", a: "Most projects are completed within 2–4 weeks depending on complexity and requirements." },
        { q: "Do you offer ongoing support?", a: "Yes! We offer monthly maintenance plans to keep everything running smoothly." },
      ] } },
    ],
  },
  // ── Blog ─────────────────────────────────────────────────────────
  {
    id: "blog-preview",
    label: "Blog Preview",
    category: "Content",
    emoji: "✍️",
    desc: "Show your latest articles",
    preview: (
      <div className="bg-slate-50 rounded-lg p-3 h-20">
        <div className="h-1.5 bg-slate-700 rounded w-1/3 mb-2" />
        <div className="grid grid-cols-3 gap-1.5">
          {[0,1,2].map(i => (
            <div key={i} className="bg-white rounded border border-slate-100">
              <div className="h-6 bg-gradient-to-br from-slate-200 to-slate-100" />
              <div className="p-1 space-y-0.5">
                <div className="h-1 bg-slate-300 rounded" />
                <div className="h-1 bg-slate-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#f8fafc" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "48px" }, content: { text: "Latest News & Articles", level: "h2" } },
      { type: "blog-preview", isVisible: true, isLocked: false, styles: {}, content: { title: "", postsCount: 3 } },
    ],
  },
  // ── Newsletter ────────────────────────────────────────────────────
  {
    id: "newsletter",
    label: "Newsletter Signup",
    category: "Content",
    emoji: "📬",
    desc: "Grow your email list",
    preview: (
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg p-3 h-20 flex flex-col justify-center items-center">
        <div className="h-1.5 bg-white/80 rounded w-2/3 mb-1.5" />
        <div className="flex gap-1.5 w-full">
          <div className="flex-1 h-6 bg-white/30 rounded" />
          <div className="w-16 h-6 bg-white rounded" />
        </div>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#7c3aed" },
    elements: [
      { type: "newsletter-signup", isVisible: true, isLocked: false, styles: {}, content: { title: "Stay in the Loop", placeholder: "Enter your email", buttonText: "Subscribe" } },
    ],
  },
  // ── Team ─────────────────────────────────────────────────────────
  {
    id: "team",
    label: "Meet the Team",
    category: "About",
    emoji: "👥",
    desc: "Introduce your team members",
    preview: (
      <div className="bg-white rounded-lg p-3 h-20">
        <div className="h-1.5 bg-slate-700 rounded w-1/3 mx-auto mb-2" />
        <div className="grid grid-cols-3 gap-1.5">
          {[0,1,2].map(i => (
            <div key={i} className="text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full mx-auto mb-1" />
              <div className="h-1 bg-slate-300 rounded w-full mb-0.5" />
              <div className="h-1 bg-slate-200 rounded w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#ffffff" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", marginBottom: "48px" }, content: { text: "Meet Our Team", level: "h2" } },
      { type: "team-member", isVisible: true, isLocked: false, styles: {}, content: { name: "Jane Doe", role: "Founder & CEO", bio: "Passionate about building great products and helping businesses grow.", image: "" } },
    ],
  },
  // ── CTA Banner ────────────────────────────────────────────────────
  {
    id: "cta-banner",
    label: "Call to Action",
    category: "Conversion",
    emoji: "🚀",
    desc: "Drive visitors to take action",
    preview: (
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg p-4 h-20 flex flex-col justify-center items-center gap-2">
        <div className="h-2 bg-white/80 rounded w-2/3" />
        <div className="h-1.5 bg-white/40 rounded w-1/2" />
        <div className="h-5 bg-white rounded w-20" />
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#6272f1", textAlign: "center" },
    elements: [
      { type: "heading", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "#ffffff", marginBottom: "12px" }, content: { text: "Ready to Get Started?", level: "h2" } },
      { type: "text", isVisible: true, isLocked: false, styles: { textAlign: "center", color: "rgba(255,255,255,0.8)", marginBottom: "32px" }, content: { text: "Join hundreds of happy customers who trust us with their business." } },
      { type: "button", isVisible: true, isLocked: false, styles: {}, content: { text: "Contact Us Today", href: "#contact", variant: "outline" } },
    ],
  },
  // ── Footer ────────────────────────────────────────────────────────
  {
    id: "footer",
    label: "Footer",
    category: "Navigation",
    emoji: "📌",
    desc: "Links, copyright & social",
    preview: (
      <div className="bg-slate-900 rounded-lg p-3 h-20">
        <div className="h-2 bg-white/80 rounded w-16 mb-2" />
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[0,1,2].map(i => <div key={i} className="space-y-1">
            {[0,1,2].map(j => <div key={j} className="h-1 bg-white/20 rounded w-full" />)}
          </div>)}
        </div>
        <div className="h-1 bg-white/10 rounded w-1/2" />
      </div>
    ),
    styles: { paddingTop: 60, paddingBottom: 40, backgroundColor: "#0f172a" },
    elements: [
      { type: "footer", isVisible: true, isLocked: false, styles: {}, content: { copyright: `© ${new Date().getFullYear()} Your Business. All rights reserved.`, links: [{ label: "Home", href: "/" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }] } },
    ],
  },
  // ── Divider ───────────────────────────────────────────────────────
  {
    id: "blank-section",
    label: "Blank Section",
    category: "Layout",
    emoji: "⬜",
    desc: "Empty section — add your own elements",
    preview: (
      <div className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 h-20 flex items-center justify-center">
        <span className="text-slate-400 text-sm">Blank</span>
      </div>
    ),
    styles: { paddingTop: 80, paddingBottom: 80, backgroundColor: "#ffffff" },
    elements: [],
  },
];

const SECTION_CATEGORIES = ["All", "Hero", "About", "Services", "Social Proof", "Contact", "Store", "Content", "Conversion", "Navigation", "Layout"];

interface SectionPickerProps {
  pageId: string;
  onClose: () => void;
}

export function SectionPicker({ pageId, onClose }: SectionPickerProps) {
  const { addSection, addElement } = useBuilderStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const sections = makeSections();

  const filtered = sections.filter((s) => {
    const matchesSearch = !search || s.label.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || s.category === category;
    return matchesSearch && matchesCat;
  });

  function handleAdd(template: SectionTemplate) {
    // Create the section
    const sectionId = addSection(pageId, template.id);
    // Add all elements to it
    // addSection returns void, so we need to find the new section
    // Actually we need to call addElement after. We know sectionId from the store.
    // Use a small workaround: get the store state
    const { builderJson } = useBuilderStore.getState();
    const page = builderJson.pages.find((p) => p.id === pageId);
    const newSection = page?.sections[page.sections.length - 1];
    if (newSection && template.elements.length > 0) {
      template.elements.forEach((el) => {
        addElement(newSection.id, el);
      });
    }
    // Update section styles if provided
    if (template.styles && newSection) {
      const { updateSection } = useBuilderStore.getState();
      if (updateSection) {
        updateSection(newSection.id, { styles: template.styles as BuilderSection["styles"] });
      }
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 w-full sm:max-w-3xl max-h-[85vh] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Add Section</h2>
            <p className="text-xs text-slate-400 mt-0.5">Click any section to add it to your page instantly</p>
          </div>
          <button onClick={onClose} className="ml-auto p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X size={18} />
          </button>
        </div>

        {/* Search + filters */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sections..."
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SECTION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  category === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">No sections found for "{search}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filtered.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleAdd(template)}
                  className="group text-left rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all overflow-hidden bg-white dark:bg-slate-800/50"
                >
                  {/* Preview */}
                  <div className="p-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                    {template.preview}
                  </div>
                  {/* Label */}
                  <div className="p-3">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm">{template.emoji}</span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 transition-colors">{template.label}</span>
                    </div>
                    <p className="text-xs text-slate-400">{template.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <p className="text-xs text-slate-400 text-center">All content is fully editable after adding · Click any element to edit it</p>
        </div>
      </div>
    </div>
  );
}
