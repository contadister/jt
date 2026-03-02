"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Globe,
  Layers,
  ShoppingBag,
  Calendar,
  BarChart3,
  Smartphone,
  Zap,
  Shield,
  Star,
  Menu,
  X,
  Play,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Image,
  Layout,
  Code2,
  CreditCard,
  Bell,
  Search,
  Share2,
} from "lucide-react";
import { calculatePrice, FEATURE_LABELS } from "@/lib/pricing/engine";

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">
            J
          </div>
          <span className={scrolled ? "text-slate-900" : "text-white"}>
            Josett
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            ["Features", "#features"],
            ["Templates", "#templates"],
            ["Pricing", "#pricing"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-josett-400 ${
                scrolled ? "text-slate-600" : "text-white/80"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors ${
              scrolled ? "text-slate-600 hover:text-slate-900" : "text-white/80 hover:text-white"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold bg-white text-josett-600 px-4 py-2 rounded-lg hover:bg-josett-50 transition-colors"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-slate-700" : "text-white"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {[
              ["Features", "#features"],
              ["Templates", "#templates"],
              ["Pricing", "#pricing"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="py-3 text-slate-600 font-medium hover:text-josett-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 mt-2">
              <Link href="/login" className="py-2 text-center text-slate-600 font-medium">
                Sign In
              </Link>
              <Link
                href="/register"
                className="py-3 text-center bg-josett-600 text-white rounded-xl font-semibold"
              >
                Get Started Free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-josett-500/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(98,114,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(98,114,241,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 pt-24 pb-16 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 text-sm text-white/90 backdrop-blur-sm"
        >
          <Sparkles size={14} className="text-yellow-400" />
          <span>Ghana's most powerful website builder</span>
          <span className="bg-yellow-400/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full font-medium">
            NEW
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6"
        >
          Build Your{" "}
          <span
            className="relative"
            style={{
              background: "linear-gradient(135deg, #a5bbfc 0%, #c084fc 50%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Website.
          </span>
          <br />
          <span className="text-white/90">Rent It Monthly.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          No code. No complexity. Choose a template, drag & drop your content,
          pay from{" "}
          <span className="text-white font-bold">GHS 100/month</span>, and go
          live today.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 bg-white text-josett-700 font-bold px-8 py-4 rounded-xl text-lg hover:bg-josett-50 transition-all shadow-2xl shadow-josett-500/30 hover:shadow-josett-500/50 hover:scale-105"
          >
            Start Building Free
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <a
            href="#templates"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            <Play size={18} className="fill-white" />
            See Templates
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["#6272f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"].map(
                (color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {["A", "B", "K", "D", "E"][i]}
                  </div>
                )
              )}
            </div>
            <span>1,200+ websites built</span>
          </div>
          <span className="hidden sm:block text-white/20">•</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-1">4.9/5 rating</span>
          </div>
          <span className="hidden sm:block text-white/20">•</span>
          <span>🇬🇭 Made for Ghana</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white/40" size={24} />
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Layers,
    title: "Drag & Drop Builder",
    description:
      "Build any layout visually. No code, no limits. Just drag, drop, and customize every pixel.",
    color: "from-blue-500 to-josett-500",
  },
  {
    icon: ShoppingBag,
    title: "Built-in E-commerce",
    description:
      "Sell products, accept Paystack payments, manage orders and inventory — all in one place.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description:
      "Let clients book appointments directly on your site. Auto-confirmations, calendar management.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "See who visits your site, where they come from, what they click, and how you can improve.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Dashboard",
    description:
      "Manage your website from your phone. Approve bookings, view orders, edit content on the go.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description:
      "Connect your own domain or use your free josett.vercel.app link. SSL included automatically.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Auto-Deploy to Vercel",
    description:
      "Click publish and your site goes live in seconds. Powered by Vercel's global edge network.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your data is encrypted, backed up daily, and protected. We take security seriously.",
    color: "from-slate-500 to-slate-700",
  },
  {
    icon: TrendingUp,
    title: "SEO Tools",
    description:
      "Optimize your site for Google. Meta tags, sitemaps, structured data — all auto-generated.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MessageSquare,
    title: "Live Chat & WhatsApp",
    description:
      "Add a live chat widget or WhatsApp button to your site in one click. Never miss a lead.",
    color: "from-josett-500 to-purple-500",
  },
  {
    icon: Image,
    title: "Unsplash Integration",
    description:
      "Search and use millions of free professional photos directly in the builder.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Bell,
    title: "Renewal Reminders",
    description:
      "Get notified by email and SMS 7, 3, and 1 day before your site expires. Never lose your site.",
    color: "from-indigo-500 to-josett-500",
  },
];

function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-josett-600 font-semibold text-sm uppercase tracking-wider">
            Everything you need
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-4">
            Built for Ghanaian Businesses
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Every tool to build, launch, and grow your online presence — bundled
            into one beautifully simple platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-slate-100 dark:border-slate-700"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Choose Your Starting Point",
    description:
      "Browse our library of stunning templates or start from a blank canvas. Every template is professionally designed for your industry.",
    icon: Layout,
    color: "bg-josett-500",
  },
  {
    number: "02",
    title: "Build with Drag & Drop",
    description:
      "Customize every section visually. Add text, images, forms, galleries, maps, buttons and more — no code ever.",
    icon: Layers,
    color: "bg-purple-500",
  },
  {
    number: "03",
    title: "Select Your Features",
    description:
      "Turn on e-commerce, booking, blog, SEO tools and more. See your price update live as you add features.",
    icon: Sparkles,
    color: "bg-pink-500",
  },
  {
    number: "04",
    title: "Pay & Go Live",
    description:
      "Pay securely with Paystack. Your site deploys automatically to a blazing-fast Vercel URL in under 60 seconds.",
    icon: Zap,
    color: "bg-amber-500",
  },
];

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white dark:bg-slate-950" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-josett-600 font-semibold text-sm uppercase tracking-wider">
            Simple process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-4">
            From Zero to Live in 4 Steps
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Building a professional website has never been this fast.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-slate-300 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="text-6xl font-black text-slate-100 dark:text-slate-800 absolute -top-2 -right-2 leading-none select-none">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Templates ────────────────────────────────────────────────────────────────

const templatePreviews = [
  {
    name: "Modern Business",
    category: "Business",
    color: "from-slate-800 to-slate-900",
    accent: "#6272f1",
    emoji: "🏢",
  },
  {
    name: "Creative Portfolio",
    category: "Portfolio",
    color: "from-purple-900 to-pink-900",
    accent: "#ec4899",
    emoji: "🎨",
  },
  {
    name: "Food & Restaurant",
    category: "Restaurant",
    color: "from-orange-800 to-red-900",
    accent: "#f59e0b",
    emoji: "🍽️",
  },
  {
    name: "Online Store",
    category: "E-commerce",
    color: "from-emerald-800 to-teal-900",
    accent: "#10b981",
    emoji: "🛍️",
  },
  {
    name: "Tech Blog",
    category: "Blog",
    color: "from-blue-900 to-indigo-900",
    accent: "#60a5fa",
    emoji: "✍️",
  },
  {
    name: "NGO & Charity",
    category: "NGO",
    color: "from-green-800 to-emerald-900",
    accent: "#34d399",
    emoji: "❤️",
  },
];

function TemplatesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="templates" className="py-24 bg-slate-50 dark:bg-slate-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-josett-600 font-semibold text-sm uppercase tracking-wider">
            30+ templates
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-4">
            Start with a Stunning Template
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Every template is fully customizable. Just pick one and make it
            yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {templatePreviews.map((template, i) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <div
                className={`bg-gradient-to-br ${template.color} rounded-2xl h-56 flex flex-col items-center justify-center relative overflow-hidden border-2 border-transparent group-hover:border-josett-400 transition-all duration-300`}
              >
                <div className="text-6xl mb-3">{template.emoji}</div>
                <div className="text-white text-lg font-bold">{template.name}</div>
                <div
                  className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: template.accent + "33", color: template.accent }}
                >
                  {template.category}
                </div>
                <div className="absolute inset-0 bg-josett-500/0 group-hover:bg-josett-500/10 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all bg-white text-josett-700 font-bold px-5 py-2 rounded-xl text-sm">
                    Use This Template
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-josett-600 hover:bg-josett-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-josett-500/25"
          >
            View All Templates
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Calculator ───────────────────────────────────────────────────────

const featureGroups = [
  {
    label: "E-commerce",
    key: "feature_ecommerce",
    icon: ShoppingBag,
    price: 50,
  },
  { label: "Blog / News", key: "feature_blog", icon: Code2, price: 20 },
  { label: "Booking System", key: "feature_booking", icon: Calendar, price: 30 },
  { label: "Contact Forms", key: "feature_contact_form", icon: MessageSquare, price: 10 },
  { label: "SEO Tools", key: "feature_seo_tools", icon: Search, price: 20 },
  { label: "Analytics", key: "feature_analytics", icon: BarChart3, price: 15 },
  { label: "Photo Gallery", key: "feature_gallery", icon: Image, price: 10 },
  { label: "Live Chat", key: "feature_live_chat", icon: MessageSquare, price: 10 },
  { label: "Push Notifications", key: "feature_push_notifications", icon: Bell, price: 15 },
  { label: "Multiple Pages", key: "feature_multiple_pages", icon: Layout, price: 20 },
  { label: "Newsletter", key: "feature_newsletter", icon: Share2, price: 20 },
  { label: "Custom Domain", key: "feature_custom_domain", icon: Globe, price: 25 },
];

function PricingCalculator() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [adSupported, setAdSupported] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const price = calculatePrice(selected, adSupported);

  function toggle(key: string) {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-950" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-josett-600 font-semibold text-sm uppercase tracking-wider">
            Transparent pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-4">
            Build Your Own Price
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Only pay for what you need. Toggle features below and watch your
            price update live.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
            {/* Price display */}
            <div className="text-center mb-10">
              <div className="text-sm text-slate-500 mb-1">Your monthly price</div>
              <motion.div
                key={price}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-7xl font-black"
                style={{
                  background: "linear-gradient(135deg, #6272f1, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                GHS {price}
                <span className="text-2xl text-slate-400">/mo</span>
              </motion.div>
              <div className="text-slate-500 text-sm mt-2">
                Base: GHS 100 — Capped at GHS 400/month no matter what you add
              </div>
            </div>

            {/* Feature toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
              {featureGroups.map((feat) => {
                const Icon = feat.icon;
                const active = !!selected[feat.key];
                return (
                  <button
                    key={feat.key}
                    onClick={() => toggle(feat.key)}
                    className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                      active
                        ? "border-josett-500 bg-josett-50 dark:bg-josett-950/30"
                        : "border-slate-200 dark:border-slate-700 hover:border-josett-300"
                    }`}
                  >
                    {active && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-josett-500 rounded-full flex items-center justify-center">
                        <Check size={10} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                    <Icon
                      size={18}
                      className={active ? "text-josett-600 mb-1" : "text-slate-400 mb-1"}
                    />
                    <div
                      className={`text-xs font-semibold ${
                        active ? "text-josett-700 dark:text-josett-300" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {feat.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      +GHS {feat.price}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ad-supported toggle */}
            <div
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer mb-6 ${
                adSupported
                  ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20"
                  : "border-slate-200 dark:border-slate-700"
              }`}
              onClick={() => setAdSupported(!adSupported)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                    adSupported
                      ? "border-amber-500 bg-amber-500"
                      : "border-slate-300"
                  }`}
                >
                  {adSupported && (
                    <Check size={12} className="text-white" strokeWidth={3} />
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    💰 Ad-Supported Tier
                    <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      -GHS 30
                    </span>
                  </div>
                  <div className="text-sm text-slate-500 mt-0.5">
                    Allow Josett to show ads on your site and earn a share of the
                    revenue. You save GHS 30/month.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                href="/register"
                className="bg-gradient-to-r from-josett-600 to-purple-600 text-white font-bold px-10 py-4 rounded-xl text-lg hover:scale-105 transition-transform shadow-xl shadow-josett-500/30"
              >
                Get Started — GHS {price}/month
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: "Kwame Mensah",
    role: "Clothing Store Owner, Accra",
    avatar: "KM",
    color: "#6272f1",
    quote:
      "I set up my online store in 2 hours. Before Josett, I had to pay a developer GHS 3,000 for a simple website. Now I manage everything myself!",
    stars: 5,
  },
  {
    name: "Abena Owusu",
    role: "Hair Salon, Kumasi",
    avatar: "AO",
    color: "#ec4899",
    quote:
      "The booking system alone is worth it. My clients book appointments online and I get notifications on my phone instantly. It changed my business.",
    stars: 5,
  },
  {
    name: "Kofi Asante",
    role: "Freelance Photographer",
    avatar: "KA",
    color: "#10b981",
    quote:
      "My portfolio site looks like it was built by a professional agency. Clients always compliment it. And I pay just GHS 100 per month!",
    stars: 5,
  },
  {
    name: "Ama Sarpong",
    role: "Restaurant Owner, Takoradi",
    avatar: "AS",
    color: "#f59e0b",
    quote:
      "The restaurant menu feature is perfect. I update my menu daily and my customers always have the latest prices. The WhatsApp button gets me orders every day.",
    stars: 5,
  },
];

function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-josett-600 font-semibold text-sm uppercase tracking-wider">
            Real people, real results
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-4">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {t.name}
                  </div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "Not at all! Josett is built specifically for non-developers. Everything is drag & drop. If you can use WhatsApp, you can build a website on Josett.",
  },
  {
    q: "What happens when my subscription expires?",
    a: "We'll remind you by email and SMS 7, 3, and 1 day before expiry. If you don't renew, your site goes offline — but your data is saved for 30 days. Renewing instantly restores your site.",
  },
  {
    q: "Can I accept payments on my website?",
    a: "Yes! If you enable e-commerce, your customers can pay directly through Paystack. The money goes straight to your Paystack account — Josett never touches your revenue.",
  },
  {
    q: "Can I connect my own domain name?",
    a: "Yes. Every site gets a free yoursite.vercel.app domain. If you want a custom domain (like mybusiness.com), add the Custom Domain feature for an extra GHS 25/month.",
  },
  {
    q: "What types of websites can I build?",
    a: "Business sites, portfolios, e-commerce stores, restaurants, blogs, NGO pages, personal sites, event pages, booking sites, and more.",
  },
  {
    q: "Is my site fast?",
    a: "Extremely. Every Josett site is deployed on Vercel's global edge network, which is used by the world's fastest websites. Your visitors in Ghana will experience near-instant load times.",
  },
  {
    q: "Can I edit my site after it's live?",
    a: "Absolutely. Use the full CMS to update text, images, products, blog posts, and more without rebuilding. For design changes, use the builder and redeploy.",
  },
  {
    q: "What is the Ad-Supported tier?",
    a: "If you allow Josett to display small, relevant ads on your site, you save GHS 30/month and also earn a share of the ad revenue. It's completely optional.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-slate-900 dark:text-white hover:text-josett-600 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-josett-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready to Build Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a5bbfc, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dream Website?
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-lg mx-auto">
            Join thousands of Ghanaian businesses already growing online with
            Josett. Start free today.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-josett-700 font-black px-10 py-5 rounded-xl text-xl hover:bg-josett-50 transition-all shadow-2xl shadow-josett-500/30 hover:scale-105"
          >
            Create My Website Now
            <ArrowRight size={22} />
          </Link>
          <div className="mt-6 text-white/50 text-sm">
            Free to start • No credit card needed • Cancel anytime
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">
                J
              </div>
              Josett
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Ghana's most powerful website builder. Build. Launch. Grow.
            </p>
            <div className="text-xs">
              🇬🇭 Made with ❤️ in Ghana
            </div>
          </div>

          {[
            {
              title: "Product",
              links: [
                ["Features", "#features"],
                ["Templates", "#templates"],
                ["Pricing", "#pricing"],
                ["Dashboard", "/dashboard"],
              ],
            },
            {
              title: "Company",
              links: [
                ["About Us", "/about"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
                ["Affiliate Program", "/affiliate"],
              ],
            },
            {
              title: "Legal",
              links: [
                ["Privacy Policy", "/privacy"],
                ["Terms of Use", "/terms"],
                ["User Agreement", "/agreement"],
                ["Cookie Policy", "/cookies"],
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div>
            &copy; {new Date().getFullYear()} Josett. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-josett-400">
              Payments secured by Paystack
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Hosted on Vercel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <TemplatesSection />
      <PricingCalculator />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
