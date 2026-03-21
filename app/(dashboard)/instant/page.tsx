"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATE_METAS } from "@/lib/templates";
import { Loader2, CheckCircle2, Rocket, ArrowRight, ArrowLeft } from "lucide-react";

const COLORS = [
  { label: "Indigo", value: "#6272f1" },
  { label: "Red", value: "#ef4444" },
  { label: "Green", value: "#10b981" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Purple", value: "#8b5cf6" },
  { label: "Orange", value: "#f97316" },
  { label: "Pink", value: "#ec4899" },
  { label: "Teal", value: "#14b8a6" },
  { label: "Gold", value: "#f59e0b" },
  { label: "Dark", value: "#1e293b" },
];

type Step = 1 | 2 | 3;

export default function InstantWebsitePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ siteId: string; url?: string } | null>(null);

  // Form data
  const [templateId, setTemplateId] = useState("");
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

  if (step === 3 && done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-josett-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Your website is ready!</h1>
          <p className="text-slate-500 mb-8">We've built your site with all your information. Now customise it and publish!</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push(`/sites/${done.siteId}/builder`)}
              className="w-full bg-josett-600 hover:bg-josett-500 text-white font-bold py-3.5 rounded-2xl text-base transition-all flex items-center justify-center gap-2"
            >
              <Rocket size={18} /> Open My Website
            </button>
            <button
              onClick={() => router.push(`/sites/${done.siteId}`)}
              className="w-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-3 rounded-2xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-josett-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">⚡</div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Instant Website</h1>
          <p className="text-slate-500 mt-2">Fill in your details. Get a complete website in seconds.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {([1, 2] as const).map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s ? "bg-josett-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400"
              }`}>
                {step > s ? <CheckCircle2 size={16} /> : s}
              </div>
              <span className={`text-sm font-semibold hidden sm:block ${step >= s ? "text-slate-800 dark:text-white" : "text-slate-400"}`}>
                {s === 1 ? "Pick a Template" : "Your Details"}
              </span>
              {s < 2 && <ArrowRight size={14} className="text-slate-300" />}
            </div>
          ))}
        </div>

        {/* STEP 1: Template */}
        {step === 1 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">What type of website do you need?</h2>
            <p className="text-slate-500 text-sm mb-6">Choose the one closest to your business. You can customise everything later.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {TEMPLATE_METAS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplateId(t.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all hover:border-josett-400 ${
                    templateId === t.id
                      ? "border-josett-500 bg-josett-50 dark:bg-josett-950/20"
                      : "border-slate-100 dark:border-slate-800"
                  }`}
                >
                  <div className="text-3xl mb-2">{t.thumbnail}</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{t.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{t.description}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                disabled={!templateId}
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-bold px-6 py-3 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next: Your Details <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Business Info */}
        {step === 2 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Tell us about your business</h2>
                {selectedTemplate && (
                  <p className="text-sm text-josett-600 font-medium">{selectedTemplate.thumbnail} {selectedTemplate.name} template selected</p>
                )}
              </div>
            </div>

            <div className="space-y-5">
              {/* Required */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Ama's Salon, Kofi Tech Ltd"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Tagline / What you do</label>
                  <input
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Accra's best beauty salon. Appointments & walk-ins welcome."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+233 24 000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">WhatsApp Number</label>
                  <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="233240000000 (no + or spaces)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@mybusiness.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Location / Address</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 High Street, Accra"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Services / Products <span className="font-normal text-slate-400">(comma-separated)</span>
                  </label>
                  <input value={servicesText} onChange={(e) => setServicesText(e.target.value)}
                    placeholder="e.g. Hair Braiding, Nail Art, Facials, Waxing"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">About Your Business <span className="font-normal text-slate-400">(optional)</span></label>
                  <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={3}
                    placeholder="Tell visitors a bit about your business, your story, or what makes you special..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-josett-500 text-sm resize-none" />
                </div>
              </div>

              {/* Color picker */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Brand Colour</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setPrimaryColor(c.value)}
                      title={c.label}
                      className={`w-9 h-9 rounded-full border-4 transition-all ${primaryColor === c.value ? "border-slate-800 dark:border-white scale-110" : "border-transparent"}`}
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-700 text-sm font-medium flex items-center gap-1">
                <ArrowLeft size={14} /> Back
              </button>
              <button
                disabled={!businessName.trim() || loading}
                onClick={handleCreate}
                className="flex items-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-bold px-8 py-3.5 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all text-base shadow-lg shadow-josett-200 dark:shadow-none"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Building your site…</>
                ) : (
                  <><Rocket size={18} /> Create My Website</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
