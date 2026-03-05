"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Globe,
  ShoppingBag,
  Calendar,
  BookOpen,
  UtensilsCrossed,
  Heart,
  User,
  Megaphone,
  Link2,
  Ticket,
  Search,
  BarChart3,
  Image,
  MessageSquare,
  Bell,
  Layout,
  Share2,
  Lock,
  Map,
  Video,
  Clock,
  Smartphone,
  Languages,
  Tag,
  Star,
  Truck,
  Repeat2,
  FlaskConical,
  Rss,
  CheckCircle2,
} from "lucide-react";
import { calculatePrice, getPriceBreakdown, FEATURE_PRICES } from "@/lib/pricing/engine";

// ── Step types ────────────────────────────────────────────────────────────────

type SiteType =
  | "BUSINESS" | "PORTFOLIO" | "ECOMMERCE" | "BLOG" | "RESTAURANT"
  | "NGO" | "PERSONAL" | "LANDING" | "LINK_IN_BIO" | "EVENT";

interface FormState {
  // Step 1
  name: string;
  slug: string;
  description: string;
  // Step 2
  siteType: SiteType | "";
  // Step 3
  templateId: string;
  // Step 4 — features
  featureEcommerce: boolean;
  featureBlog: boolean;
  featureBooking: boolean;
  featureContactForm: boolean;
  featureSeoTools: boolean;
  featureAnalytics: boolean;
  featureCustomDomain: boolean;
  featureGallery: boolean;
  featureRestaurantMenu: boolean;
  featureSocialLinks: boolean;
  featureNewsletter: boolean;
  featurePasswordProtection: boolean;
  featureMultiplePages: boolean;
  featureGoogleMaps: boolean;
  featureVideoEmbed: boolean;
  featureTestimonials: boolean;
  featureCountdown: boolean;
  featureLiveChat: boolean;
  featureWhatsappButton: boolean;
  featurePushNotifications: boolean;
  featureHeatmaps: boolean;
  featureMultiLanguage: boolean;
  featureSiteSearch: boolean;
  featureCoupons: boolean;
  featureProductReviews: boolean;
  featureDeliveryZones: boolean;
  featureAffiliate: boolean;
  featureAbTesting: boolean;
  featureSocialAutoPost: boolean;
  featureEventTicketing: boolean;
  featureLinkInBio: boolean;
  featureAdsEnabled: boolean;
}

// ── Site types ────────────────────────────────────────────────────────────────

const SITE_TYPES = [
  { value: "BUSINESS", label: "Business", icon: Globe, color: "from-blue-500 to-josett-500", desc: "Company, agency, startup" },
  { value: "PORTFOLIO", label: "Portfolio", icon: Layout, color: "from-purple-500 to-pink-500", desc: "Designer, photographer, developer" },
  { value: "ECOMMERCE", label: "Online Store", icon: ShoppingBag, color: "from-emerald-500 to-teal-500", desc: "Sell products online" },
  { value: "RESTAURANT", label: "Restaurant", icon: UtensilsCrossed, color: "from-orange-500 to-red-500", desc: "Menu, bookings, orders" },
  { value: "BLOG", label: "Blog / News", icon: BookOpen, color: "from-indigo-500 to-blue-500", desc: "Articles, stories, updates" },
  { value: "NGO", label: "NGO / Church", icon: Heart, color: "from-rose-500 to-pink-500", desc: "Non-profit, charity, church" },
  { value: "PERSONAL", label: "Personal", icon: User, color: "from-amber-500 to-orange-500", desc: "CV, wedding, personal brand" },
  { value: "LANDING", label: "Landing Page", icon: Megaphone, color: "from-violet-500 to-purple-500", desc: "Product launch, campaign" },
  { value: "LINK_IN_BIO", label: "Link in Bio", icon: Link2, color: "from-cyan-500 to-blue-500", desc: "Social media link page" },
  { value: "EVENT", label: "Event", icon: Ticket, color: "from-fuchsia-500 to-pink-500", desc: "Conference, concert, wedding" },
];

// ── Features ──────────────────────────────────────────────────────────────────

const FEATURES = [
  { key: "featureEcommerce", label: "E-commerce", icon: ShoppingBag, price: 50, desc: "Sell products, accept Paystack payments" },
  { key: "featureBlog", label: "Blog / News", icon: BookOpen, price: 20, desc: "Rich text editor, categories, SEO" },
  { key: "featureBooking", label: "Appointment Booking", icon: Calendar, price: 30, desc: "Clients book directly on your site" },
  { key: "featureContactForm", label: "Contact Forms", icon: MessageSquare, price: 10, desc: "Get messages from visitors" },
  { key: "featureSeoTools", label: "SEO Tools", icon: Search, price: 20, desc: "Rank higher on Google" },
  { key: "featureAnalytics", label: "Analytics Dashboard", icon: BarChart3, price: 15, desc: "Track visits, sources, devices" },
  { key: "featureCustomDomain", label: "Custom Domain", icon: Globe, price: 25, desc: "Connect your own domain" },
  { key: "featureGallery", label: "Photo Gallery", icon: Image, price: 10, desc: "Showcase photos beautifully" },
  { key: "featureRestaurantMenu", label: "Restaurant Menu", icon: UtensilsCrossed, price: 20, desc: "Menu with categories & dietary tags" },
  { key: "featureNewsletter", label: "Newsletter", icon: Rss, price: 20, desc: "Collect emails, send campaigns" },
  { key: "featurePasswordProtection", label: "Password Pages", icon: Lock, price: 15, desc: "Lock specific pages" },
  { key: "featureMultiplePages", label: "Multiple Pages", icon: Layout, price: 20, desc: "About, Services, Contact, etc." },
  { key: "featureGoogleMaps", label: "Google Maps", icon: Map, price: 5, desc: "Show your location" },
  { key: "featureVideoEmbed", label: "Video / Background", icon: Video, price: 10, desc: "YouTube, Vimeo, or upload" },
  { key: "featureLiveChat", label: "Live Chat Widget", icon: MessageSquare, price: 10, desc: "Chat with site visitors" },
  { key: "featurePushNotifications", label: "Push Notifications", icon: Bell, price: 15, desc: "Notify your visitors" },
  { key: "featureHeatmaps", label: "Heatmaps", icon: FlaskConical, price: 20, desc: "See where visitors click" },
  { key: "featureMultiLanguage", label: "Multi-Language", icon: Languages, price: 25, desc: "Support multiple languages" },
  { key: "featureSiteSearch", label: "Site Search", icon: Search, price: 10, desc: "Search bar on your site" },
  { key: "featureCoupons", label: "Coupon Codes", icon: Tag, price: 10, desc: "Discount codes for your store" },
  { key: "featureProductReviews", label: "Product Reviews", icon: Star, price: 10, desc: "Customer ratings & reviews" },
  { key: "featureDeliveryZones", label: "Delivery Zones", icon: Truck, price: 10, desc: "Set delivery areas and fees" },
  { key: "featureAffiliate", label: "Affiliate Program", icon: Repeat2, price: 15, desc: "Referral tracking for your customers" },
  { key: "featureAbTesting", label: "A/B Testing", icon: FlaskConical, price: 20, desc: "Test two versions of a page" },
  { key: "featureSocialAutoPost", label: "Social Auto-Post", icon: Share2, price: 15, desc: "Auto-post to Facebook/Instagram" },
  { key: "featureEventTicketing", label: "Event Ticketing", icon: Ticket, price: 25, desc: "Sell tickets to your events" },
  { key: "featureCountdown", label: "Countdown Timer", icon: Clock, price: 5, desc: "Build hype for launches or sales" },
  // Free features
  { key: "featureSocialLinks", label: "Social Links", icon: Share2, price: 0, desc: "Free" },
  { key: "featureTestimonials", label: "Testimonials", icon: Star, price: 0, desc: "Free" },
  { key: "featureWhatsappButton", label: "WhatsApp Button", icon: Smartphone, price: 0, desc: "Free" },
  { key: "featureLinkInBio", label: "Link in Bio", icon: Link2, price: 0, desc: "Free" },
];

const STEPS = ["Details", "Type", "Template", "Features", "Payment"];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
}

const defaultFeatures = Object.fromEntries(
  FEATURES.map((f) => [f.key, false])
) as Record<string, boolean>;

// ── Main component ────────────────────────────────────────────────────────────

// ── Step components — defined at MODULE LEVEL (not inside parent) ─────────────
// Defining components inside a render fn causes React to see new component types
// on every render → unmounts on each keystroke → focus loss bug.

interface StepProps { form: FormState; updateForm: (key: string, value: unknown) => void; }

function Step1({ form, updateForm, slugAvailable, checkingSlug, checkSlug }: StepProps & {
  slugAvailable: boolean | null; checkingSlug: boolean; checkSlug: (s: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Site Name *</label>
        <input value={form.name}
          onChange={(e) => {
            const name = e.target.value;
            updateForm("name", name);
            const auto = slugify(name);
            if (!form.slug || form.slug === slugify(form.name)) {
              updateForm("slug", auto);
              if (auto.length >= 3) checkSlug(auto);
            }
          }}
          placeholder="My Awesome Business" maxLength={60}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-josett-500 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Site URL (slug) *</label>
        <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden focus-within:ring-2 focus-within:ring-josett-500 bg-slate-50 dark:bg-slate-900">
          <span className="px-3 py-3 bg-slate-100 dark:bg-slate-800 text-slate-400 text-sm border-r border-slate-200 dark:border-slate-700 whitespace-nowrap">josett.vercel.app/</span>
          <input value={form.slug}
            onChange={(e) => { const slug = slugify(e.target.value); updateForm("slug", slug); if (slug.length >= 3) checkSlug(slug); }}
            placeholder="my-site"
            className="flex-1 px-3 py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm"
          />
          {checkingSlug && <Loader2 size={16} className="mr-3 text-slate-400 animate-spin" />}
          {!checkingSlug && slugAvailable === true && <Check size={16} className="mr-3 text-green-500" />}
          {!checkingSlug && slugAvailable === false && <span className="mr-3 text-xs text-red-500 font-medium">Taken</span>}
        </div>
        {slugAvailable === false && <p className="text-xs text-red-500 mt-1">This URL is already taken.</p>}
        {slugAvailable === true && <p className="text-xs text-green-600 mt-1">\u2713 This URL is available</p>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Description <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)}
          placeholder="A short description of what your site is about..." rows={2} maxLength={200}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-josett-500 transition-all resize-none"
        />
      </div>
    </div>
  );
}

function Step2({ form, updateForm }: StepProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {SITE_TYPES.map((type) => {
        const Icon = type.icon;
        const active = form.siteType === type.value;
        return (
          <button key={type.value} onClick={() => updateForm("siteType", type.value)}
            className={`relative p-4 rounded-2xl border-2 text-left transition-all ${active ? "border-josett-500 bg-josett-50 dark:bg-josett-950/20" : "border-slate-200 dark:border-slate-700 hover:border-josett-300 bg-white dark:bg-slate-900"}`}>
            {active && <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-josett-500 rounded-full flex items-center justify-center"><Check size={11} className="text-white" strokeWidth={3} /></div>}
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3`}><Icon size={20} className="text-white" /></div>
            <div className="font-bold text-slate-900 dark:text-white text-sm">{type.label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{type.desc}</div>
          </button>
        );
      })}
    </div>
  );
}

function Step3({ form, updateForm }: StepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">All templates are fully customizable in the builder.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TEMPLATE_PREVIEWS.map((t) => {
          const active = form.templateId === t.id;
          return (
            <button key={t.id} onClick={() => updateForm("templateId", t.id)}
              className={`relative rounded-2xl border-2 overflow-hidden transition-all ${active ? "border-josett-500 shadow-lg shadow-josett-500/20" : "border-slate-200 dark:border-slate-700 hover:border-josett-300"}`}>
              {active && <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-josett-500 rounded-full flex items-center justify-center"><Check size={12} className="text-white" strokeWidth={3} /></div>}
              <div className={`bg-gradient-to-br ${t.color} h-24 flex items-center justify-center`}><span className="text-4xl">{t.emoji}</span></div>
              <div className="p-3 text-left bg-white dark:bg-slate-900">
                <div className="font-bold text-slate-900 dark:text-white text-xs">{t.name}</div>
                <div className="text-xs text-slate-400">{t.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FeatureToggle({ feat, form, updateForm }: { feat: typeof FEATURES[0]; form: FormState; updateForm: (k: string, v: unknown) => void }) {
  const active = !!(form as unknown as Record<string, unknown>)[feat.key];
  const Icon = feat.icon;
  return (
    <button onClick={() => updateForm(feat.key, !active)}
      className={`relative p-3 rounded-xl border-2 text-left transition-all ${active ? "border-josett-500 bg-josett-50 dark:bg-josett-950/20" : "border-slate-200 dark:border-slate-700 hover:border-josett-300 bg-white dark:bg-slate-900"}`}>
      {active && <div className="absolute top-2 right-2 w-4 h-4 bg-josett-500 rounded-full flex items-center justify-center"><Check size={9} className="text-white" strokeWidth={3} /></div>}
      <Icon size={16} className={`mb-1.5 ${active ? "text-josett-600" : "text-slate-400"}`} />
      <div className={`text-xs font-bold leading-tight ${active ? "text-josett-700 dark:text-josett-300" : "text-slate-700 dark:text-slate-300"}`}>{feat.label}</div>
      <div className="text-xs mt-0.5 font-semibold text-slate-400">{feat.price === 0 ? "Free" : `+GHS ${feat.price}`}</div>
    </button>
  );
}

function Step4({ form, updateForm }: StepProps) {
  const paidFeatures = FEATURES.filter((f) => f.price > 0);
  const freeFeatures = FEATURES.filter((f) => f.price === 0);
  const adsEnabled = !!(form as unknown as Record<string, unknown>).featureAdsEnabled;
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Add-on Features</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{paidFeatures.map((f) => <FeatureToggle key={f.key} feat={f} form={form} updateForm={updateForm} />)}</div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Free Features</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{freeFeatures.map((f) => <FeatureToggle key={f.key} feat={f} form={form} updateForm={updateForm} />)}</div>
      </div>
      <button onClick={() => updateForm("featureAdsEnabled", !adsEnabled)}
        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${adsEnabled ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"}`}>
        <div className="flex items-start gap-3">
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${adsEnabled ? "border-amber-500 bg-amber-500" : "border-slate-300"}`}>
            {adsEnabled && <Check size={11} className="text-white" strokeWidth={3} />}
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              Ad-Supported Tier
              <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs px-2 py-0.5 rounded-full font-semibold">Save GHS 30/month</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">Allow Josett to show ads on your site and save GHS 30/month.</div>
          </div>
        </div>
      </button>
    </div>
  );
}

function Step5({ form, price, breakdown, loading, error, onPay }: {
  form: FormState; price: number; breakdown: ReturnType<typeof getPriceBreakdown>;
  loading: boolean; error: string | null; onPay: () => void;
}) {
  const adsEnabled = !!(form as unknown as Record<string, unknown>).featureAdsEnabled;
  return (
    <div className="space-y-5">
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Order Summary</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm"><span className="text-slate-600 dark:text-slate-400">Base website</span><span className="font-medium">GHS 100</span></div>
          {breakdown.items.slice(1).map((item) => (
            <div key={item.key} className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
              <span className="font-medium">+GHS {item.price}</span>
            </div>
          ))}
          {adsEnabled && <div className="flex justify-between text-sm"><span className="text-amber-600">Ad Discount</span><span className="font-medium text-amber-600">-GHS 30</span></div>}
        </div>
        <div className="border-t pt-4 flex items-center justify-between">
          <span className="font-bold text-slate-900 dark:text-white">Total per month</span>
          <span className="text-3xl font-black text-josett-600 dark:text-josett-400">GHS {price}</span>
        </div>
        <p className="text-xs text-slate-400 mt-2">One month subscription. Renew manually. Cancel any time.</p>
      </div>
      <div className="bg-josett-50 dark:bg-josett-950/20 border border-josett-200 dark:border-josett-800 rounded-xl p-4 space-y-2">
        <div className="flex gap-2 text-sm text-josett-700 dark:text-josett-300"><CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" /><span>Site: <strong>{form.name}</strong> ({form.slug}.vercel.app)</span></div>
        <div className="flex gap-2 text-sm text-josett-700 dark:text-josett-300"><CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" /><span>Auto-deployed within 60 seconds of payment</span></div>
        <div className="flex gap-2 text-sm text-josett-700 dark:text-josett-300"><CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" /><span>Secure payment via Paystack. GHS accepted.</span></div>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      <button onClick={onPay} disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-josett-600 to-purple-600 hover:opacity-90 disabled:opacity-60 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-xl">
        {loading ? <><Loader2 size={20} className="animate-spin" />Processing...</> : <>Pay GHS {price} via Paystack <ArrowRight size={20} /></>}
      </button>
    </div>
  );
}

function NewSitePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    slug: "",
    description: "",
    siteType: (searchParams.get("type") as SiteType) || "",
    templateId: searchParams.get("template") || "blank",
    ...defaultFeatures,
    featureSocialLinks: true, // free defaults
    featureTestimonials: true,
    featureWhatsappButton: true,
    featureLinkInBio: false,
    featureAdsEnabled: false,
  } as unknown as FormState);

  const features = Object.fromEntries(
    FEATURES.map((f) => [f.key, (form as unknown as Record<string, unknown>)[f.key] as boolean])
  );
  const price = calculatePrice(features);
  const breakdown = getPriceBreakdown(features);

  function updateForm(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function checkSlug(slug: string) {
    if (!slug || slug.length < 3) return;
    setCheckingSlug(true);
    const res = await fetch(`/api/sites/check-slug?slug=${slug}`);
    const { available } = await res.json();
    setSlugAvailable(available);
    setCheckingSlug(false);
  }



  // ── Step 3: Template ────────────────────────────────────────────────────
  const TEMPLATE_PREVIEWS = [
    { id: "blank", name: "Blank Canvas", desc: "Start from scratch", color: "from-slate-700 to-slate-900", emoji: "⬜" },
    { id: "minimal-business", name: "Minimal Business", desc: "Clean & modern", color: "from-slate-800 to-josett-900", emoji: "🏢" },
    { id: "creative-portfolio", name: "Creative Portfolio", desc: "Bold & expressive", color: "from-purple-900 to-pink-900", emoji: "🎨" },
    { id: "food-restaurant", name: "Food & Restaurant", desc: "Warm & inviting", color: "from-orange-800 to-red-900", emoji: "🍽️" },
    { id: "online-store", name: "Online Store", desc: "Clean & conversion-focused", color: "from-emerald-800 to-teal-900", emoji: "🛍️" },
    { id: "tech-blog", name: "Tech Blog", desc: "Minimal & readable", color: "from-blue-900 to-indigo-900", emoji: "✍️" },
  ];




  // ── Step 5: Payment ─────────────────────────────────────────────────────
  async function handlePay() {
    setError(null);
    setLoading(true);

    try {
      // 1. Create the site record first
      const createRes = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          slug: form.slug,
          description: form.description,
          siteType: form.siteType,
          templateId: form.templateId,
          ...Object.fromEntries(
            FEATURES.map((f) => [f.key, (form as unknown as Record<string, unknown>)[f.key]])
          ),
          featureAdsEnabled: (form as unknown as Record<string, unknown>).featureAdsEnabled,
          monthlyPriceGhs: price,
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        setError(err.error || "Failed to create site");
        setLoading(false);
        return;
      }

      const { site } = await createRes.json();

      // 2. Initialize Paystack payment
      const payRes = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: site.id, amountGhs: price }),
      });

      if (!payRes.ok) {
        const err = await payRes.json();
        setError(err.error || "Failed to initialize payment");
        setLoading(false);
        return;
      }

      const { authorization_url } = await payRes.json();
      window.location.href = authorization_url;
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }



  // ── Validation ──────────────────────────────────────────────────────────
  function canAdvance() {
    if (step === 0) return form.name.length >= 2 && form.slug.length >= 3 && slugAvailable !== false;
    if (step === 1) return form.siteType !== "";
    if (step === 2) return true;
    if (step === 3) return true;
    return false;
  }


  const stepDescriptions = [
    "What's your site called?",
    "What type of site do you need?",
    "Choose a starting template",
    "Add the features you need",
    "Review & pay to go live",
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
          Create New Site
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {stepDescriptions[step]}
        </p>
      </div>

      {/* Progress stepper */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-shrink-0">
            <div className={`flex items-center gap-2 ${i < step ? "cursor-pointer" : ""}`}
              onClick={() => i < step && setStep(i)}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                i < step ? "bg-green-500 text-white"
                  : i === step ? "bg-josett-600 text-white"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-500"
              }`}>
                {i < step ? <Check size={13} strokeWidth={3} /> : i + 1}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${
                i === step ? "text-josett-600" : i < step ? "text-green-600" : "text-slate-400"
              }`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px ${i < step ? "bg-green-400" : "bg-slate-200 dark:bg-slate-700"}`} />
            )}
          </div>
        ))}

        {/* Live price pill */}
        <div className="ml-auto flex-shrink-0 bg-josett-600 text-white text-xs font-black px-3 py-1.5 rounded-full">
          GHS {price}/mo
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && <Step1 form={form} updateForm={updateForm} slugAvailable={slugAvailable} checkingSlug={checkingSlug} checkSlug={checkSlug} />}
            {step === 1 && <Step2 form={form} updateForm={updateForm} />}
            {step === 2 && <Step3 form={form} updateForm={updateForm} />}
            {step === 3 && <Step4 form={form} updateForm={updateForm} />}
            {step === 4 && <Step5 form={form} price={price} breakdown={breakdown} loading={loading} error={error} onPay={handlePay} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step < 4 && (
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 px-5 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className="flex-1 flex items-center justify-center gap-2 bg-josett-600 hover:bg-josett-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
          >
            Continue
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function NewSitePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-josett-500 border-t-transparent rounded-full" /></div>}>
      <NewSitePageInner />
    </Suspense>
  );
}
