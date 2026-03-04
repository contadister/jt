"use client";

import { useBuilderStore } from "@/store/builderStore";
import { BuilderSection } from "@/types/site";

export function SectionStyleControls({ section }: { section: BuilderSection }) {
  const { updateSectionStyles, updateSection } = useBuilderStore();
  const styles = section.styles || {};
  const set = (key: string, value: unknown) => updateSectionStyles(section.id, { [key]: value });

  return (
    <div>
      <div className="mb-4">
        <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Section Name</label>
        <input
          value={section.name || ""}
          onChange={(e) => updateSection(section.id, { name: e.target.value })}
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none"
          placeholder="Section name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Background Color</label>
        <div className="flex items-center gap-2">
          <input type="color" value={styles.backgroundColor || "#ffffff"}
            onChange={(e) => set("backgroundColor", e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border border-slate-700 bg-transparent" />
          <input value={styles.backgroundColor || ""}
            onChange={(e) => set("backgroundColor", e.target.value)}
            className="flex-1 bg-slate-800 text-slate-200 text-xs px-2 py-1.5 rounded border border-slate-700 focus:border-josett-500 focus:outline-none"
            placeholder="#ffffff" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Background Image URL</label>
        <input value={styles.backgroundImage || ""}
          onChange={(e) => set("backgroundImage", e.target.value)}
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none"
          placeholder="https://..." />
      </div>

      <div className="mb-4">
        <label className="block text-[11px] text-slate-400 font-medium mb-3">Padding (px)</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: "paddingTop", label: "Top" },
            { key: "paddingBottom", label: "Bottom" },
            { key: "paddingLeft", label: "Left" },
            { key: "paddingRight", label: "Right" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-[10px] text-slate-500 block mb-1">{label}</label>
              <input
                type="number"
                value={(styles as Record<string, number>)[key] || 0}
                onChange={(e) => set(key, parseInt(e.target.value))}
                className="w-full bg-slate-800 text-slate-200 text-xs px-2 py-1.5 rounded border border-slate-700 focus:border-josett-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Max Width</label>
        <select value={styles.maxWidth || "100%"}
          onChange={(e) => set("maxWidth", e.target.value)}
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none">
          {["100%", "1280px", "1024px", "768px", "640px"].map((w) => <option key={w}>{w}</option>)}
        </select>
      </div>
    </div>
  );
}
