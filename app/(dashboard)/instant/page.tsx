"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATE_METAS } from "@/lib/templates";
import {
  Loader2, CheckCircle2, Rocket, ArrowRight, ArrowLeft,
  Sparkles, Phone, Globe, Search,
  CreditCard, Lock, Star, Zap,
} from "lucide-react";

// ─── Pricing ──────────────────────────────────────────────────────────────────
const INSTANT_PRICE_GHS = 299; // one-time setup + 1 month hosting

const COLORS = [
  { label: "Indigo",  value: "#6272f1" }, { label: "Red",    value: "#ef4444" },
  { label: "Emerald", value: "#10b981" }, { label: "Blue",   value: "#3b82f6" },
  { label: "Purple",  value: "#8b5cf6" }, { label: "Orange", value: "#f97316" },
  { label: "Pink",    value: "#ec4899" }, { label: "Teal",   value: "#14b8a6" },
  { label: "Amber",   value: "#f59e0b" }, { label: "Slate",  value: "#1e293b" },
  { label: "Rose",    value: "#be185d" }, { label: "Cyan",   value: "#0891b2" },
];

const CATEGORIES = ["All", ...Array.from(new Set(TEMPLATE_METAS.map((t) => t.category)))];

export default function InstantWebsitePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [createdSiteId, setCreatedSiteId] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [templateId, setTemplateId] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [servicesText, setServicesText] = useState("");
  const [about, setAbout] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#6272f1");

  const selectedTemplate = TEMPLATE_METAS.find((t) => t.id === templateId);

  const filtered = TEMPLATE_METAS.filter((t) => {
    const matchCat = category === "All" || t.category === category;
    const q = search.toLowerCase();
    return matchCat && (!q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  });

  // Step 2 → Create draft site → Step 3 (payment)
  async function handleCreateDraft() {
    if (!templateId || !businessName.trim()) return;
    setLoading(true);
    try {
      const services = servicesText.split(",").map((s) => s.trim()).filter(Boolean);
      const res = await fetch("/api/sites/instant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, businessName: businessName.trim(), tagline: tagline.trim(), phone: phone.trim(), whatsapp: whatsapp.trim() || phone.trim(), email: email.trim(), address: address.trim(), services, about: about.trim(), primaryColor }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create site");
      setCreatedSiteId(data.siteId);
      setStep(3);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Step 3 → Pay → Paystack
  async function handlePay() {
    if (!createdSiteId) return;
    setPaymentLoading(true);
    try {
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: createdSiteId, amountGhs: INSTANT_PRICE_GHS }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment initialization failed");
      window.location.href = data.authorization_url;
    } catch (e) {
      alert(e instanceof Error ? e.message : "Payment failed to initialize");
      setPaymentLoading(false);
    }
  }

  // Skip payment (preview only) — still goes to builder
  function handleSkipToBuilder() {
    if (createdSiteId) router.push(`/sites/${createdSiteId}/builder`);
  }

  const STEPS = ["Choose Template", "Your Details", "Checkout"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-josett-600 via-indigo-600 to-violet-600 text-white text-center py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Zap size={14} /> Instant Website Builder
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">A complete website in under 3 minutes</h1>
          <p className="text-indigo-100 text-base">Choose a template · Fill in your details · Pay · Go live</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-1 sm:gap-3">
          {STEPS.map((label, i) => {
            const s = i + 1;
            return (
              <div key={s} className="flex items-center gap-1 sm:gap-2">
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${step > s ? "bg-green-100 text-green-700" : step === s ? "bg-josett-100 text-josett-700" : "text-slate-400"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${step > s ? "bg-green-500 text-white" : step === s ? "bg-josett-600 text-white" : "bg-slate-200"}`}>
                    {step > s ? "✓" : s}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < STEPS.length - 1 && <ArrowRight size={12} className="text-slate-300 flex-shrink-0" />}
              </div>
            );
          })}
          <div className="ml-auto text-xs font-bold text-josett-600">GHS {INSTANT_PRICE_GHS.toLocaleString()}</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ── STEP 1: Template ── */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">What type of website?</h2>
              <p className="text-slate-500 mt-1.5 text-sm">{TEMPLATE_METAS.length} professional templates. Pick the one closest to your business.</p>
            </div>

            <div className="flex gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-josett-500" />
              </div>
            </div>
            <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${category === c ? "bg-josett-600 text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-josett-300"}`}>
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-8">
              {filtered.map((t) => (
                <button key={t.id} onClick={() => setTemplateId(t.id)}
                  className={`group text-left p-4 rounded-2xl border-2 transition-all ${templateId === t.id ? "border-josett-500 bg-josett-50 dark:bg-josett-950/20 shadow-lg" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-josett-300 hover:shadow-md"}`}>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{t.thumbnail}</div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{t.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{t.category}</div>
                  {templateId === t.id && <div className="mt-1.5 text-josett-600 text-[10px] font-black">✓ Selected</div>}
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button disabled={!templateId} onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-bold px-8 py-4 rounded-2xl disabled:opacity-40 transition-all shadow-lg shadow-josett-200">
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Business details ── */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            {selectedTemplate && (
              <div className="flex items-center gap-3 bg-josett-50 dark:bg-josett-950/20 border border-josett-200 dark:border-josett-800 rounded-2xl p-4 mb-6">
                <span className="text-3xl">{selectedTemplate.thumbnail}</span>
                <div className="flex-1">
                  <div className="font-bold text-josett-800 dark:text-josett-300 text-sm">{selectedTemplate.name} template</div>
                  <div className="text-xs text-josett-500">{selectedTemplate.category}</div>
                </div>
                <button onClick={() => setStep(1)} className="text-josett-500 hover:text-josett-700 text-xs font-bold">Change</button>
              </div>
            )}

            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Tell us about your business</h2>
            <p className="text-slate-500 text-sm mb-6">This goes straight into your website. Fill in what you have — you can edit everything later.</p>

            <div className="space-y-4">
              {/* Core info */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 space-y-4">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Business Info <span className="text-red-400">*</span></div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Business Name *</label>
                  <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Ama's Salon, Kofi Tech Ltd"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">What you do / Tagline</label>
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="e.g. Professional beauty services in Accra — walk-ins welcome"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Phone size={12} /> Contact Details</div>
                <div className="grid grid-cols-2 gap-3">
                  {[["Phone Number", phone, setPhone, "+233 24 000 0000"], ["WhatsApp", whatsapp, setWhatsapp, "233240000000"], ["Email Address", email, setEmail, "hello@mybusiness.com"], ["Location", address, setAddress, "123 High St, Accra"]].map(([label, val, setter, ph]) => (
                    <div key={label as string}>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">{label as string}</label>
                      <input value={val as string} onChange={(e) => (setter as (v: string) => void)(e.target.value)} placeholder={ph as string}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-xs" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Services + About */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 space-y-4">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Globe size={12} /> Services & Story</div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Services / Products <span className="font-normal">(comma-separated)</span></label>
                  <input value={servicesText} onChange={(e) => setServicesText(e.target.value)} placeholder="e.g. Hair Braiding, Nail Art, Facials, Waxing"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                  {servicesText && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {servicesText.split(",").map((s, i) => s.trim() && <span key={i} className="bg-josett-100 dark:bg-josett-900/30 text-josett-700 dark:text-josett-300 text-xs px-2.5 py-0.5 rounded-full font-medium">{s.trim()}</span>)}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">About Your Business</label>
                  <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={3} placeholder="Tell your story — how long you've been in business, what makes you special..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm resize-none" />
                </div>
              </div>

              {/* Colour */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Brand Colour</div>
                <div className="flex flex-wrap gap-2.5">
                  {COLORS.map((c) => (
                    <button key={c.value} onClick={() => setPrimaryColor(c.value)} title={c.label}
                      className={`w-9 h-9 rounded-full border-4 transition-all hover:scale-110 ${primaryColor === c.value ? "border-slate-800 dark:border-white scale-110 shadow-md" : "border-transparent"}`}
                      style={{ backgroundColor: c.value }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button onClick={() => setStep(1)} className="flex items-center gap-1 text-slate-500 hover:text-slate-700 text-sm font-semibold">
                <ArrowLeft size={14} /> Back
              </button>
              <button disabled={!businessName.trim() || loading} onClick={handleCreateDraft}
                className="flex items-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-bold px-8 py-3.5 rounded-2xl disabled:opacity-40 transition-all shadow-lg shadow-josett-200 dark:shadow-none">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Building…</> : <>Continue to Payment <ArrowRight size={16} /></>}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Payment ── */}
        {step === 3 && (
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Your website is built!</h2>
              <p className="text-slate-500 mt-2 text-sm">Pay to publish it live. You can preview and edit it first.</p>
            </div>

            {/* What they get */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 mb-5 shadow-xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="font-black text-slate-900 dark:text-white text-lg">{businessName}</div>
                  <div className="text-slate-500 text-sm mt-0.5">{selectedTemplate?.thumbnail} {selectedTemplate?.name} · {selectedTemplate?.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-josett-600">GHS {INSTANT_PRICE_GHS}</div>
                  <div className="text-xs text-slate-400">one-time payment</div>
                </div>
              </div>

              <div className="space-y-2.5 mb-6">
                {[
                  ["✅", "Complete professional website — ready now"],
                  ["✅", "All your information pre-filled"],
                  ["✅", "Published to your own .vercel.app URL"],
                  ["✅", "1 month hosting included"],
                  ["✅", "Edit anytime in the website builder"],
                  ["✅", "WhatsApp, contact form, gallery — all set up"],
                ].map(([icon, text]) => (
                  <div key={text as string} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                    <span>{icon as string}</span> {text as string}
                  </div>
                ))}
              </div>

              <button onClick={handlePay} disabled={paymentLoading}
                className="w-full flex items-center justify-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-josett-200 dark:shadow-none disabled:opacity-60">
                {paymentLoading ? <><Loader2 size={18} className="animate-spin" /> Redirecting…</> : <><CreditCard size={18} /> Pay GHS {INSTANT_PRICE_GHS} & Publish</>}
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">
                <Lock size={11} /> Secured by Paystack · Mobile Money & Card accepted
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex justify-center gap-6 mb-6">
              {[["🔒", "Secure payment"], ["↩️", "Refund within 7 days"], ["⚡", "Live in minutes"]].map(([icon, text]) => (
                <div key={text as string} className="text-center text-xs text-slate-500">
                  <div className="text-xl mb-1">{icon as string}</div>
                  {text as string}
                </div>
              ))}
            </div>

            {/* Preview first option */}
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-2">Want to customise before paying?</p>
              <button onClick={handleSkipToBuilder} className="text-josett-600 hover:text-josett-500 font-bold text-sm underline underline-offset-2">
                Open in Builder first →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
