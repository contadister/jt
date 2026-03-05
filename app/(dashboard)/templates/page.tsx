"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowLeft, Check } from "lucide-react";

interface TemplateCard {
  id: string; name: string; description: string; category: string;
  siteType: string; thumbnail: string; primaryColor: string; featured?: boolean;
}

export default function TemplatesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const siteId = searchParams.get("siteId");

  const [templates, setTemplates] = useState<TemplateCard[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/templates")
      .then((r) => r.json())
      .then((d) => { setTemplates(d.templates || []); setCategories(["All", ...(d.categories || [])]); setLoading(false); });
  }, []);

  const filtered = activeCategory === "All" ? templates : templates.filter((t) => t.category === activeCategory);

  const handleApply = async (templateId: string) => {
    if (!siteId) {
      router.push(`/sites/new?template=${templateId}`);
      return;
    }
    setApplying(templateId);
    const res = await fetch(`/api/templates?id=${templateId}`);
    const template = await res.json();
    await fetch(`/api/sites/${siteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ builderJson: template.builderJson, primaryColor: template.primaryColor, secondaryColor: template.secondaryColor }),
    });
    setApplying(null);
    router.push(`/sites/${siteId}/builder`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Template Library</h1>
          <p className="text-slate-500 text-sm">Choose a template — you can customise everything</p>
        </div>
      </div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat ? "bg-josett-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}>
            {cat}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="animate-spin text-josett-500" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activeCategory === "All" && (
            <div onClick={() => siteId ? router.push(`/sites/${siteId}/builder`) : router.push("/sites/new")}
              className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 cursor-pointer hover:border-josett-400 transition-all flex flex-col items-center justify-center min-h-[200px] text-slate-400 hover:text-josett-500">
              <span className="text-4xl mb-3">✨</span>
              <p className="font-bold">Start Blank</p>
              <p className="text-xs text-center mt-1">Build from scratch</p>
            </div>
          )}
          {filtered.map((t) => (
            <div key={t.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all">
              <div className="h-36 flex items-center justify-center text-6xl relative" style={{ background: `linear-gradient(135deg,${t.primaryColor}22,${t.primaryColor}11)` }}>
                {t.featured && <span className="absolute top-3 left-3 text-xs font-bold bg-josett-600 text-white px-2 py-0.5 rounded-full">Featured</span>}
                {t.thumbnail}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h3>
                  <span className="text-xs text-slate-400 ml-2 flex-shrink-0">{t.category}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{t.description}</p>
                <button onClick={() => handleApply(t.id)} disabled={applying === t.id}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: t.primaryColor, color: "#fff" }}>
                  {applying === t.id ? <><Loader2 size={14} className="animate-spin" /> Applying...</> : <><Check size={14} /> Use Template</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
