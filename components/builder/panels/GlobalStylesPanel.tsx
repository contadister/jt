"use client";

import { useBuilderStore } from "@/store/builderStore";

const FONTS = ["Inter", "Roboto", "Poppins", "Lato", "Montserrat", "Open Sans", "Raleway", "Nunito", "Playfair Display", "Merriweather"];

export function GlobalStylesPanel() {
  const { builderJson, updateGlobalStyles, updateSiteSettings } = useBuilderStore();
  const { globalStyles, siteSettings } = builderJson;

  return (
    <div className="p-3 space-y-5">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Site Info</p>
        <label className="block text-xs text-slate-400 mb-1">Site Name</label>
        <input
          value={siteSettings.siteName}
          onChange={(e) => updateSiteSettings({ siteName: e.target.value })}
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none"
        />
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Colors</p>
        <div className="space-y-3">
          {[
            { key: "primaryColor", label: "Primary Color" },
            { key: "secondaryColor", label: "Secondary Color" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-xs text-slate-400">{label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={(globalStyles as Record<string, string>)[key] || "#6366f1"}
                  onChange={(e) => updateGlobalStyles({ [key]: e.target.value })}
                  className="w-7 h-7 rounded cursor-pointer border border-slate-700 bg-transparent"
                />
                <input
                  value={(globalStyles as Record<string, string>)[key] || ""}
                  onChange={(e) => updateGlobalStyles({ [key]: e.target.value })}
                  className="w-20 bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded border border-slate-700 focus:border-josett-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">Typography</p>
        <label className="block text-xs text-slate-400 mb-1">Font Family</label>
        <select
          value={globalStyles.fontFamily || "Inter"}
          onChange={(e) => updateGlobalStyles({ fontFamily: e.target.value })}
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none"
        >
          {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">SEO</p>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Page Title</label>
            <input
              value={siteSettings.seoTitle || ""}
              onChange={(e) => updateSiteSettings({ seoTitle: e.target.value })}
              className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none"
              placeholder="My Website - Tagline"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Meta Description</label>
            <textarea
              value={siteSettings.seoDescription || ""}
              onChange={(e) => updateSiteSettings({ seoDescription: e.target.value })}
              rows={3}
              className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none resize-none"
              placeholder="Describe your site..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
