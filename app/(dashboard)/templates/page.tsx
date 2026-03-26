"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowLeft, Check, Search, Sparkles } from "lucide-react";

interface TemplateCard {
  id: string; name: string; description: string; category: string;
  siteType: string; thumbnail: string; primaryColor: string;
  secondaryColor?: string; featured?: boolean;
}

const CATEGORY_ICONS: Record<string, string> = {
  All: "🌐", Business: "🏢", "Food & Drink": "🍽️", Creative: "🎨",
  Technology: "💻", Education: "🎓", Healthcare: "🏥", Health: "💪",
  Religious: "⛪", Property: "🏠", Hospitality: "🏨", Professional: "⚖️",
  Beauty: "✨", Fashion: "👗", Automotive: "🚗", Services: "🧹",
  Events: "🎉", Personal: "👤", NGO: "🤝",
};

function TemplatesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const siteId = searchParams.get("siteId");

  const [templates, setTemplates] = useState<TemplateCard[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<string | null>(null);
  const [applied, setApplied] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/templates")
      .then((r) => r.json())
      .then((d) => {
        setTemplates(d.templates || []);
        setCategories(["All", ...(d.categories || [])]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = templates.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleApply = async (templateId: string) => {
    if (!siteId) { router.push(`/sites/new?template=${templateId}`); return; }
    setApplying(templateId);
    const res = await fetch(`/api/templates?id=${templateId}`);
    const template = await res.json();
    await fetch(`/api/sites/${siteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ builderJson: template.builderJson, primaryColor: template.primaryColor, secondaryColor: template.secondaryColor }),
    });
    setApplying(null);
    setApplied(templateId);
    setTimeout(() => router.push(`/sites/${siteId}/builder`), 800);
  };

  const counts = templates.reduce((a, t) => { a[t.category] = (a[t.category] || 0) + 1; return a; }, {} as Record<string, number>);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles size={20} className="text-josett-500" /> Template Library
          </h1>
          <p className="text-slate-500 text-sm">{templates.length} templates · customise everything after applying</p>
        </div>
        <div className="relative hidden sm:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..."
            className="pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl focus:outline-none focus:border-josett-500 w-56" />
        </div>
      </div>

      <div className="relative sm:hidden mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..."
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl focus:outline-none focus:border-josett-500" />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const count = cat === "All" ? templates.length : (counts[cat] || 0);
          const icon = CATEGORY_ICONS[cat] || "📁";
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all border ${
                activeCategory === cat ? "bg-josett-600 text-white border-josett-600" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-josett-300"
              }`}>
              {icon} {cat}
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeCategory === cat ? "bg-white/20" : "bg-slate-100 dark:bg-slate-700 text-slate-500"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="animate-spin text-josett-500" size={28} /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activeCategory === "All" && !search && (
            <div onClick={() => siteId ? router.push(`/sites/${siteId}/builder`) : router.push("/sites/new")}
              className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 cursor-pointer hover:border-josett-400 transition-all flex flex-col items-center justify-center min-h-[220px] text-slate-400 hover:text-josett-500 group">
              <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">✨</span>
              <p className="font-bold text-sm">Start Blank</p>
              <p className="text-xs mt-1">Build from scratch</p>
            </div>
          )}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-slate-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium">No templates match &quot;{search}&quot;</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-3 text-josett-500 text-sm font-semibold hover:underline">Clear filters</button>
            </div>
          )}
          {filtered.map((t) => (
            <div key={t.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group">
              {/* Live iframe preview */}
              <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800" style={{ height: 180 }}>
                <iframe
                  src={`/api/templates/preview?id=${t.id}`}
                  className="absolute top-0 left-0 pointer-events-none border-none"
                  style={{ width: 1200, height: 900, transform: "scale(0.266)", transformOrigin: "0 0" }}
                  title={t.name}
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                />
                {t.featured && <span className="absolute top-2 left-2 text-xs font-bold bg-josett-600 text-white px-2 py-0.5 rounded-full z-10">Featured</span>}
                <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 z-10">{t.category}</span>
              </div>
              <div className="p-4">
                <h3 className="font-black text-slate-900 dark:text-white text-sm mb-1">{t.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">{t.description}</p>
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-3.5 h-3.5 rounded-full border border-white shadow-sm" style={{ background: t.primaryColor }} />
                  {t.secondaryColor && <div className="w-3.5 h-3.5 rounded-full border border-white shadow-sm" style={{ background: t.secondaryColor }} />}
                </div>
                <button onClick={() => handleApply(t.id)} disabled={!!applying}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-70 hover:opacity-90"
                  style={{ background: applied === t.id ? "#16a34a" : t.primaryColor, color: "#fff" }}>
                  {applying === t.id ? <><Loader2 size={14} className="animate-spin" />Applying…</> : applied === t.id ? <><Check size={14} />Applied!</> : "Use Template"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-josett-500" size={28} /></div>}>
      <TemplatesPageInner />
    </Suspense>
  );
}
