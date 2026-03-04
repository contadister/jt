"use client";

import { useBuilderStore } from "@/store/builderStore";
import { BuilderElement } from "@/lib/types/builder";

interface StyleControlsProps {
  element: BuilderElement;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] text-slate-400 font-medium mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function ColorPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={value || "#000000"} onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer border border-slate-700 bg-transparent" />
      <input value={value || ""} onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-slate-800 text-slate-200 text-xs px-2 py-1.5 rounded border border-slate-700 focus:border-josett-500 focus:outline-none" />
    </div>
  );
}

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px", "42px", "48px", "56px", "64px", "72px"];
const FONT_WEIGHTS = ["300", "400", "500", "600", "700", "800", "900"];
const TEXT_ALIGNS = ["left", "center", "right", "justify"];
const BORDER_RADII = ["0px", "4px", "8px", "12px", "16px", "24px", "50%"];

export function StyleControls({ element }: StyleControlsProps) {
  const { updateElementStyles } = useBuilderStore();
  const styles = (element.styles || {}) as Record<string, string>;
  const set = (key: string, value: string) => updateElementStyles(element.id, { [key]: value });

  return (
    <div>
      <Row label="Text Color"><ColorPicker value={styles.color || ""} onChange={(v) => set("color", v)} /></Row>
      <Row label="Background"><ColorPicker value={styles.backgroundColor || ""} onChange={(v) => set("backgroundColor", v)} /></Row>

      <Row label="Font Size">
        <select value={styles.fontSize || "16px"} onChange={(e) => set("fontSize", e.target.value)}
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none">
          {FONT_SIZES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Row>

      <Row label="Font Weight">
        <select value={styles.fontWeight || "400"} onChange={(e) => set("fontWeight", e.target.value)}
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none">
          {FONT_WEIGHTS.map((w) => <option key={w}>{w}</option>)}
        </select>
      </Row>

      <Row label="Text Align">
        <div className="grid grid-cols-4 gap-1">
          {TEXT_ALIGNS.map((align) => (
            <button key={align} onClick={() => set("textAlign", align)}
              className={`py-1.5 text-xs rounded border transition-colors capitalize ${
                styles.textAlign === align
                  ? "border-josett-500 bg-josett-950/50 text-josett-400"
                  : "border-slate-700 text-slate-500 hover:border-slate-500"
              }`}>
              {align.slice(0, 4)}
            </button>
          ))}
        </div>
      </Row>

      <Row label="Padding">
        <input value={styles.padding || ""}
          onChange={(e) => set("padding", e.target.value)}
          placeholder="e.g. 16px or 8px 16px"
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none" />
      </Row>

      <Row label="Margin">
        <input value={styles.margin || ""}
          onChange={(e) => set("margin", e.target.value)}
          placeholder="e.g. 0 auto"
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none" />
      </Row>

      <Row label="Border Radius">
        <div className="grid grid-cols-4 gap-1">
          {BORDER_RADII.map((r) => (
            <button key={r} onClick={() => set("borderRadius", r)}
              className={`py-1.5 text-xs rounded border transition-colors ${
                styles.borderRadius === r
                  ? "border-josett-500 bg-josett-950/50 text-josett-400"
                  : "border-slate-700 text-slate-500 hover:border-slate-500"
              }`}>
              {r}
            </button>
          ))}
        </div>
      </Row>

      <Row label="Width">
        <input value={styles.width || ""}
          onChange={(e) => set("width", e.target.value)}
          placeholder="e.g. 100%, 300px"
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none" />
      </Row>

      <Row label="Opacity">
        <input type="range" min={0} max={100} value={parseFloat(styles.opacity || "1") * 100}
          onChange={(e) => set("opacity", String(parseInt(e.target.value) / 100))}
          className="w-full accent-josett-500" />
        <span className="text-xs text-slate-400">{Math.round(parseFloat(styles.opacity || "1") * 100)}%</span>
      </Row>

      <Row label="Border">
        <input value={styles.border || ""}
          onChange={(e) => set("border", e.target.value)}
          placeholder="1px solid #e2e8f0"
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none" />
      </Row>
    </div>
  );
}
