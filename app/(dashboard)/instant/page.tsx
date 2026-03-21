"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATE_METAS } from "@/lib/templates";
import {
  Loader2, CheckCircle2, Rocket, ArrowRight, ArrowLeft,
  Sparkles, Globe, Phone, Mail, MapPin, Briefcase, Users,
  Search, ChevronDown, ChevronUp,
} from "lucide-react";

const COLORS = [
  { label: "Indigo", value: "#6272f1", bg: "bg-indigo-500" },
  { label: "Red", value: "#ef4444", bg: "bg-red-500" },
  { label: "Emerald", value: "#10b981", bg: "bg-emerald-500" },
  { label: "Blue", value: "#3b82f6", bg: "bg-blue-500" },
  { label: "Purple", value: "#8b5cf6", bg: "bg-violet-500" },
  { label: "Orange", value: "#f97316", bg: "bg-orange-500" },
  { label: "Pink", value: "#ec4899", bg: "bg-pink-500" },
  { label: "Teal", value: "#14b8a6", bg: "bg-teal-500" },
  { label: "Amber", value: "#f59e0b", bg: "bg-amber-500" },
  { label: "Slate", value: "#1e293b", bg: "bg-slate-800" },
  { label: "Rose", value: "#be185d", bg: "bg-rose-700" },
  { label: "Cyan", value: "#0891b2", bg: "bg-cyan-600" },
];

const CATEGORIES = ["All", ...Array.from(new Set(TEMPLATE_METAS.map((t) => t.category)))];

type Step = 1 | 2 | 3;

export default function InstantWebsitePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ siteId: string } | null>(null);

  // Template selection
  const [templateId, setTemplateId] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Business info
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
    return matchCat && (!q || t.name.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  });

  async function handleCreate() {
    if (!templateId || !businessName.trim()) return;
    setLoading(true);
    try {
      const services = servicesText.split(",").map((s) => s.trim()).filter(Boolean);
      const res = await fetch("/api/sites/instant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId,
          businessName: businessName.trim(),
          tagline: tagline.trim(),
          phone: phone.trim(),
          whatsapp: whatsapp.trim() || phone.trim(),
          email: email.trim(),
          address: address.trim(),
          services,
          about: about.trim(),
          primaryColor,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setDone({ siteId: data.siteId });
      setStep(3);
    } catch (e) {
      alert(`Something went wrong: ${e instanceof Error ? e.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  // SUCCESS SCREEN
  if (step === 3 && done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-josett-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Your website is ready! 🎉</h1>
          <p className="text-slate-500 mb-2">Built with <span className="font-bold text-slate-700 dark:text-slate-300">{selectedTemplate?.thumbnail} {selectedTemplate?.name}</span> template</p>
          <p className="text-slate-500 text-sm mb-8">All your information has been filled in. Open the builder to review and then publish your site!</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push(`/sites/${done.siteId}/builder`)}
              className="w-full bg-josett-600 hover:bg-josett-500 text-white font-bold py-4 rounded-2xl text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-josett-200 dark:shadow-none"
            >
              <Rocket size={18} /> Open My Website Builder
            </button>
            <button
              onClick={() => router.push(`/sites/${done.siteId}`)}
              className="w-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold py-3 rounded-2xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Go to Site Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-josett-600 to-indigo-600 text-white text-center py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Sparkles size={14} /> Instant Website Builder
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">Get a complete website in 2 minutes</h1>
          <p className="text-indigo-100 text-lg">Choose a template → Fill in your details → Done. No tech skills needed.</p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2">
          {(["Pick Template", "Your Details"] as const).map((label, i) => {
            const s = (i + 1) as 1 | 2;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                  step > s ? "bg-green-100 text-green-700" :
                  step === s ? "bg-josett-100 text-josett-700" :
                  "text-slate-400"
                }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                    step > s ? "bg-green-500 text-white" :
                    step === s ? "bg-josett-600 text-white" :
                    "bg-slate-200"
                  }`}>
                    {step > s ? "✓" : s}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 1 && <ArrowRight size={14} className="text-slate-300" />}
              </div>
            );
          })}
          {templateId && step === 1 && (
            <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold">{selectedTemplate?.thumbnail} {selectedTemplate?.name}</span>
              <span className="text-green-500">✓ selected</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* STEP 1: Template picker */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">What type of website do you need?</h2>
              <p className="text-slate-500 mt-2 text-sm">Choose the template closest to your business. You can change anything later.</p>
            </div>

            {/* Search + filter */}
            <div className="flex gap-3 mb-5">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-josett-500" />
              </div>
            </div>

            {/* Category pills */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    category === c ? "bg-josett-600 text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-josett-300"
                  }`}>
                  {c}
                </button>
              ))}
            </div>

            {/* Template grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
              {filtered.map((t) => (
                <button key={t.id} onClick={() => setTemplateId(t.id)}
                  className={`group text-left p-4 rounded-2xl border-2 transition-all ${
                    templateId === t.id
                      ? "border-josett-500 bg-josett-50 dark:bg-josett-950/20 shadow-lg shadow-josett-100 dark:shadow-none"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-josett-300 hover:shadow-md"
                  }`}>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{t.thumbnail}</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white leading-tight mb-1">{t.name}</div>
                  <div className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">{t.description}</div>
                  {templateId === t.id && (
                    <div className="mt-2 flex items-center gap-1 text-josett-600 text-xs font-bold">
                      <CheckCircle2 size={12} /> Selected
                    </div>
                  )}
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-4 text-center py-12 text-slate-400">
                  <p className="text-3xl mb-2">🔍</p>
                  <p className="text-sm">No templates match "{search}"</p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button disabled={!templateId} onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-bold px-8 py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all text-base shadow-lg shadow-josett-200 dark:shadow-none">
                Continue with {selectedTemplate?.name || "selected template"} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Business details */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            {/* Selected template badge */}
            {selectedTemplate && (
              <div className="flex items-center gap-3 bg-josett-50 dark:bg-josett-950/20 border border-josett-200 dark:border-josett-800 rounded-2xl p-4 mb-6">
                <span className="text-3xl">{selectedTemplate.thumbnail}</span>
                <div className="flex-1">
                  <div className="font-bold text-josett-800 dark:text-josett-300">{selectedTemplate.name} template</div>
                  <div className="text-xs text-josett-600 dark:text-josett-400">{selectedTemplate.description}</div>
                </div>
                <button onClick={() => setStep(1)} className="text-josett-500 hover:text-josett-700 text-xs font-semibold">Change</button>
              </div>
            )}

            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Tell us about your business</h2>
            <p className="text-slate-500 text-sm mb-6">We'll fill all this into your website automatically. Fill in as much or as little as you want.</p>

            <div className="space-y-5">
              {/* Business name — required */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase size={16} className="text-josett-500" />
                  <span className="font-black text-slate-900 dark:text-white text-sm">Business Info</span>
                  <span className="text-xs text-red-400 ml-1">* Required</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Business Name *</label>
                    <input value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Ama's Salon, Kofi Tech Solutions Ltd"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Tagline / What you do</label>
                    <input value={tagline} onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. Accra's best beauty salon — walk-ins welcome"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Phone size={16} className="text-josett-500" />
                  <span className="font-black text-slate-900 dark:text-white text-sm">Contact Details</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+233 24 000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">WhatsApp Number</label>
                    <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="233240000000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email Address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@mybusiness.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Location / Address</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 High Street, Accra"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={16} className="text-josett-500" />
                  <span className="font-black text-slate-900 dark:text-white text-sm">Services / Products</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">What do you offer? <span className="font-normal normal-case text-slate-400">(comma-separated)</span></label>
                    <input value={servicesText} onChange={(e) => setServicesText(e.target.value)}
                      placeholder="e.g. Hair Braiding, Nail Art, Facials, Waxing, Massages"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                    {servicesText && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {servicesText.split(",").map((s, i) => s.trim() && (
                          <span key={i} className="bg-josett-100 dark:bg-josett-900/30 text-josett-700 dark:text-josett-300 text-xs px-2.5 py-1 rounded-full font-medium">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">About Your Business</label>
                    <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={3}
                      placeholder="Tell visitors your story — who you are, how long you've been in business, what makes you special..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm resize-none" />
                  </div>
                </div>
              </div>

              {/* Brand colour */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span className="font-black text-slate-900 dark:text-white text-sm">Brand Colour</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {COLORS.map((c) => (
                    <button key={c.value} onClick={() => setPrimaryColor(c.value)} title={c.label}
                      className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 ${
                        primaryColor === c.value ? "border-slate-800 dark:border-white scale-110 shadow-lg" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span className="text-xs text-slate-500">Selected colour will be used for buttons, headings and accents</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 gap-4">
              <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm font-semibold transition-colors">
                <ArrowLeft size={14} /> Back to templates
              </button>
              <button disabled={!businessName.trim() || loading} onClick={handleCreate}
                className="flex items-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-bold px-8 py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all text-base shadow-lg shadow-josett-200 dark:shadow-none flex-1 sm:flex-none justify-center">
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Building your website…</>
                ) : (
                  <><Sparkles size={18} /> Create My Website</>
                )}
              </button>
            </div>

            {!businessName.trim() && (
              <p className="text-center text-xs text-slate-400 mt-3">Enter your business name above to continue</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
