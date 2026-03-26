"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATE_METAS } from "@/lib/templates";
import {
  Loader2, CheckCircle2, Rocket, ArrowRight, ArrowLeft,
  Sparkles, Phone, Globe, Search, CreditCard, Lock, Zap,
  Eye, Monitor, X,
} from "lucide-react";

const INSTANT_PRICE_GHS = 299;

const COLORS = [
  { label: "Indigo",  value: "#6272f1" }, { label: "Red",    value: "#ef4444" },
  { label: "Emerald", value: "#10b981" }, { label: "Blue",   value: "#3b82f6" },
  { label: "Purple",  value: "#8b5cf6" }, { label: "Orange", value: "#f97316" },
  { label: "Pink",    value: "#ec4899" }, { label: "Teal",   value: "#14b8a6" },
  { label: "Amber",   value: "#f59e0b" }, { label: "Slate",  value: "#1e293b" },
  { label: "Rose",    value: "#be185d" }, { label: "Cyan",   value: "#0891b2" },
];

const CATEGORIES = ["All", ...Array.from(new Set(TEMPLATE_METAS.map((t) => t.category)))];

// Mini live preview component using iframe
function TemplatePreview({ templateId, isSelected }: { templateId: string; isSelected: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-slate-100 dark:bg-slate-800" style={{ height: 160, borderRadius: "12px 12px 0 0" }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={20} className="animate-spin text-slate-400" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={`/api/templates/preview?id=${templateId}`}
        className="absolute top-0 left-0 origin-top-left pointer-events-none"
        style={{ width: 1200, height: 900, transform: "scale(0.266)", transformOrigin: "0 0" }}
        onLoad={() => setLoaded(true)}
        title="Template preview"
        sandbox="allow-scripts allow-same-origin"
      />
      {isSelected && (
        <div className="absolute inset-0 border-3 border-josett-500 rounded-t-xl pointer-events-none" style={{ border: "3px solid #6272f1" }} />
      )}
    </div>
  );
}

// Full-screen preview modal
function PreviewModal({ templateId, templateName, onClose }: { templateId: string; templateName: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col" onClick={onClose}>
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <Monitor size={16} className="text-slate-400" />
          <span className="text-white font-bold text-sm">{templateName} — Live Preview</span>
          <span className="text-xs text-slate-500">Scroll to see the full template</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800">
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`/api/templates/preview?id=${templateId}`}
          className="w-full h-full border-none"
          title="Full template preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}

export default function InstantWebsitePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [createdSiteId, setCreatedSiteId] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

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
      if (!res.ok) throw new Error(data.error || "Failed");
      setCreatedSiteId(data.siteId);
      setStep(3);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

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
      if (!res.ok) throw new Error(data.error || "Payment failed");
      window.location.href = data.authorization_url;
    } catch (e) {
      alert(e instanceof Error ? e.message : "Payment failed");
      setPaymentLoading(false);
    }
  }

  const STEPS = ["Choose Template", "Your Details", "Checkout"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {previewTemplate && (
        <PreviewModal
          templateId={previewTemplate}
          templateName={TEMPLATE_METAS.find((t) => t.id === previewTemplate)?.name || ""}
          onClose={() => setPreviewTemplate(null)}
        />
      )}

      {/* Gradient header */}
      <div className="bg-gradient-to-r from-josett-600 via-indigo-600 to-violet-600 text-white text-center py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <Zap size={14} /> Instant Website Builder
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">A real website, ready in 2 minutes</h1>
          <p className="text-indigo-100">Pick a stunning template · Fill in your info · Pay GHS {INSTANT_PRICE_GHS} · Go live</p>
        </div>
      </div>

      {/* Sticky progress */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
          {STEPS.map((label, i) => {
            const s = i + 1;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${step > s ? "bg-green-100 text-green-700" : step === s ? "bg-josett-100 text-josett-700" : "text-slate-400"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${step > s ? "bg-green-500 text-white" : step === s ? "bg-josett-600 text-white" : "bg-slate-200"}`}>
                    {step > s ? "✓" : s}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < STEPS.length - 1 && <ArrowRight size={12} className="text-slate-300 flex-shrink-0" />}
              </div>
            );
          })}
          <div className="ml-auto text-sm font-black text-josett-600">GHS {INSTANT_PRICE_GHS}</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── STEP 1: Template picker with live previews ── */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Choose your template</h2>
              <p className="text-slate-500 mt-1.5 text-sm">{TEMPLATE_METAS.length} professionally designed templates. Hover to preview. Everything is customisable.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1 max-w-sm">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-josett-500" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {CATEGORIES.slice(0, 8).map((c) => (
                  <button key={c} onClick={() => setCategory(c)}
                    className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all ${category === c ? "bg-josett-600 text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-josett-300"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Template grid with live previews */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {filtered.map((t) => (
                <div key={t.id}
                  className={`group rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                    templateId === t.id
                      ? "border-josett-500 shadow-xl shadow-josett-100 dark:shadow-josett-900/20"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-josett-300 hover:shadow-lg"
                  }`}
                  onClick={() => setTemplateId(t.id)}>
                  {/* Live preview iframe */}
                  <TemplatePreview templateId={t.id} isSelected={templateId === t.id} />

                  {/* Card footer */}
                  <div className="p-3 bg-white dark:bg-slate-900">
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-slate-900 dark:text-white truncate">{t.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{t.category}</div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); setPreviewTemplate(t.id); }}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-josett-100 hover:text-josett-600 text-slate-500 transition-colors"
                          title="Preview full template">
                          <Eye size={12} />
                        </button>
                        {templateId === t.id && (
                          <div className="bg-josett-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <CheckCircle2 size={9} /> OK
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-5 text-center py-16 text-slate-400">
                  <p className="text-3xl mb-2">🔍</p>
                  <p className="text-sm">No templates match "{search}"</p>
                  <button onClick={() => { setSearch(""); setCategory("All"); }} className="mt-3 text-josett-600 text-sm font-bold hover:underline">Clear filters</button>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button disabled={!templateId} onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-bold px-10 py-4 rounded-2xl disabled:opacity-40 transition-all shadow-lg shadow-josett-200 dark:shadow-none text-base">
                Continue with {selectedTemplate?.name || "selected template"} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Details ── */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            {selectedTemplate && (
              <div className="flex items-center gap-3 bg-josett-50 dark:bg-josett-950/20 border border-josett-200 dark:border-josett-800 rounded-2xl p-4 mb-6">
                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 relative">
                  <iframe src={`/api/templates/preview?id=${selectedTemplate.id}`} className="absolute top-0 left-0 pointer-events-none" style={{ width: 400, height: 300, transform: "scale(0.16)", transformOrigin: "0 0" }} sandbox="allow-scripts allow-same-origin" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-josett-800 dark:text-josett-300 text-sm">{selectedTemplate.name}</div>
                  <div className="text-xs text-josett-500">{selectedTemplate.category}</div>
                </div>
                <button onClick={() => setStep(1)} className="text-josett-500 hover:text-josett-700 text-xs font-bold flex-shrink-0">Change</button>
              </div>
            )}

            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Fill in your business details</h2>
            <p className="text-slate-500 text-sm mb-6">We inject everything automatically into your website. Fill in what you have — edit the rest in the builder.</p>

            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 space-y-4">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider">Business Info *</div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Business Name *</label>
                  <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Ama's Salon, Kofi Tech Solutions"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Tagline / What you do</label>
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="e.g. Accra's finest beauty salon — appointments & walk-ins welcome"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Phone size={11} /> Contact</div>
                <div className="grid grid-cols-2 gap-3">
                  {([["Phone", phone, setPhone, "+233 24 000 0000"], ["WhatsApp", whatsapp, setWhatsapp, "233240000000"], ["Email", email, setEmail, "hello@mybusiness.com"], ["Location", address, setAddress, "123 High Street, Accra"]] as const).map(([label, val, setter, ph]) => (
                    <div key={label}>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">{label}</label>
                      <input value={val} onChange={(e) => (setter as (v: string) => void)(e.target.value)} placeholder={ph}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-xs" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 space-y-4">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Globe size={11} /> Services & Story</div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">What you offer <span className="font-normal">(comma-separated)</span></label>
                  <input value={servicesText} onChange={(e) => setServicesText(e.target.value)} placeholder="e.g. Hair Braiding, Nail Art, Facials, Waxing, Massages"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                  {servicesText && <div className="flex flex-wrap gap-1.5 mt-2">{servicesText.split(",").map((s, i) => s.trim() && <span key={i} className="bg-josett-100 text-josett-700 text-xs px-2.5 py-0.5 rounded-full font-semibold">{s.trim()}</span>)}</div>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">About your business</label>
                  <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={3} placeholder="Your story — how long you've been in business, what makes you special..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm resize-none" />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Brand Colour</div>
                <div className="flex flex-wrap gap-2.5">
                  {COLORS.map((c) => (
                    <button key={c.value} onClick={() => setPrimaryColor(c.value)} title={c.label}
                      className={`w-9 h-9 rounded-full border-4 transition-all hover:scale-110 ${primaryColor === c.value ? "border-slate-800 dark:border-white scale-110 shadow-lg" : "border-transparent"}`}
                      style={{ backgroundColor: c.value }} />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">This colour will be used for buttons, headings and accents throughout your site.</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button onClick={() => setStep(1)} className="flex items-center gap-1 text-slate-500 hover:text-slate-700 text-sm font-semibold">
                <ArrowLeft size={14} /> Back
              </button>
              <button disabled={!businessName.trim() || loading} onClick={handleCreateDraft}
                className="flex items-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-bold px-8 py-3.5 rounded-2xl disabled:opacity-40 transition-all shadow-lg shadow-josett-200 dark:shadow-none">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Building your site…</> : <>Continue to Payment <ArrowRight size={16} /></>}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Payment ── */}
        {step === 3 && (
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Your website is built! 🎉</h2>
              <p className="text-slate-500 mt-2 text-sm">Pay to publish it live. Or open the builder first to review.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 mb-5 shadow-xl">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="font-black text-slate-900 dark:text-white text-lg">{businessName}</div>
                  <div className="text-slate-500 text-sm mt-0.5">{selectedTemplate?.thumbnail} {selectedTemplate?.name} template</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-josett-600">GHS {INSTANT_PRICE_GHS}</div>
                  <div className="text-xs text-slate-400">one-time</div>
                </div>
              </div>

              <div className="space-y-2.5 mb-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                {[
                  "✅ Complete website with your info filled in",
                  "✅ Published instantly to your .vercel.app URL",
                  "✅ 1 month hosting included",
                  "✅ Contact form, WhatsApp button, gallery — all set up",
                  "✅ Edit anything you want in the visual builder",
                  "✅ 7-day money-back guarantee",
                ].map((text) => (
                  <div key={text} className="text-sm text-slate-700 dark:text-slate-300">{text}</div>
                ))}
              </div>

              <button onClick={handlePay} disabled={paymentLoading}
                className="w-full flex items-center justify-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-josett-200 dark:shadow-none disabled:opacity-60">
                {paymentLoading ? <><Loader2 size={18} className="animate-spin" /> Redirecting to payment…</> : <><CreditCard size={18} /> Pay GHS {INSTANT_PRICE_GHS} & Publish Live</>}
              </button>
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">
                <Lock size={11} /> Secured by Paystack · Mobile Money, Card & Bank
              </div>
            </div>

            <div className="flex justify-around mb-6 text-center text-xs text-slate-500">
              {[["🔒", "Secure payment"], ["↩️", "7-day refund"], ["⚡", "Live in minutes"]].map(([icon, text]) => (
                <div key={text as string}><div className="text-xl mb-1">{icon as string}</div>{text as string}</div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-500 mb-2">Want to customise before paying?</p>
              <button onClick={() => createdSiteId && router.push(`/sites/${createdSiteId}/builder`)}
                className="text-josett-600 hover:text-josett-500 font-bold text-sm underline underline-offset-2">
                Open in Builder first →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
