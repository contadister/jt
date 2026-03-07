"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { BuilderElement } from "@/lib/types/builder";
import { ChevronDown, ChevronRight } from "lucide-react";

interface StyleControlsProps { element: BuilderElement; }

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
      <input type="color" value={value?.startsWith("#") ? value : "#000000"} onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer border border-slate-700 bg-transparent flex-shrink-0" />
      <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="#000000 or rgba()"
        className="flex-1 bg-slate-800 text-slate-200 text-xs px-2 py-1.5 rounded border border-slate-700 focus:border-josett-500 focus:outline-none" />
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none" />
  );
}

function SelectInput({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value || ""} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none">
      <option value="">— none —</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-2 border border-slate-800 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors">
        {title}
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </button>
      {open && <div className="p-3">{children}</div>}
    </div>
  );
}

const FONT_SIZES = ["11px","12px","13px","14px","15px","16px","17px","18px","20px","22px","24px","28px","32px","36px","40px","48px","56px","64px","72px","80px","96px"];
const FONT_WEIGHTS = [{ v: "300", l: "Light" }, { v: "400", l: "Normal" }, { v: "500", l: "Medium" }, { v: "600", l: "SemiBold" }, { v: "700", l: "Bold" }, { v: "800", l: "ExtraBold" }, { v: "900", l: "Black" }];
const TEXT_ALIGNS = ["left","center","right","justify"];
const RADII = ["0px","2px","4px","6px","8px","12px","16px","20px","24px","32px","50%"];
const DISPLAY = ["block","inline-block","flex","inline-flex","grid","none"];
const FLEX_DIR = ["row","column","row-reverse","column-reverse"];
const ALIGN_ITEMS = ["flex-start","center","flex-end","stretch","baseline"];
const JUSTIFY = ["flex-start","center","flex-end","space-between","space-around","space-evenly"];
const OVERFLOW = ["visible","hidden","auto","scroll","clip"];
const CURSORS = ["default","pointer","text","move","not-allowed","grab"];
const TEXT_TRANSFORM = ["none","uppercase","lowercase","capitalize"];
const TEXT_DECORATION = ["none","underline","line-through","overline"];
const SHADOWS = [
  { v: "", l: "None" },
  { v: "0 1px 2px rgba(0,0,0,0.05)", l: "XS" },
  { v: "0 2px 8px rgba(0,0,0,0.08)", l: "SM" },
  { v: "0 4px 16px rgba(0,0,0,0.12)", l: "MD" },
  { v: "0 8px 32px rgba(0,0,0,0.16)", l: "LG" },
  { v: "0 20px 60px rgba(0,0,0,0.25)", l: "XL" },
  { v: "0 0 0 3px rgba(99,102,241,0.4)", l: "Glow" },
  { v: "inset 0 2px 8px rgba(0,0,0,0.1)", l: "Inner" },
];

export function StyleControls({ element }: StyleControlsProps) {
  const { updateElementStyles } = useBuilderStore();
  const styles = (element.styles || {}) as Record<string, string>;
  const set = (key: string, value: string) => updateElementStyles(element.id, { [key]: value });

  return (
    <div>
      {/* Typography */}
      <Section title="Typography">
        <Row label="Color"><ColorPicker value={styles.color || ""} onChange={(v) => set("color", v)} /></Row>
        <Row label="Font Size">
          <select value={styles.fontSize || "16px"} onChange={(e) => set("fontSize", e.target.value)}
            className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none">
            {FONT_SIZES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Row>
        <Row label="Font Weight">
          <div className="grid grid-cols-4 gap-1">
            {FONT_WEIGHTS.map(({ v, l }) => (
              <button key={v} onClick={() => set("fontWeight", v)}
                className={`py-1.5 text-xs rounded border transition-colors ${styles.fontWeight === v ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                {l}
              </button>
            ))}
          </div>
        </Row>
        <Row label="Text Align">
          <div className="grid grid-cols-4 gap-1">
            {TEXT_ALIGNS.map((a) => (
              <button key={a} onClick={() => set("textAlign", a)}
                className={`py-1.5 text-xs rounded border capitalize transition-colors ${styles.textAlign === a ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                {a.slice(0, 4)}
              </button>
            ))}
          </div>
        </Row>
        <Row label="Line Height"><TextInput value={styles.lineHeight || ""} onChange={(v) => set("lineHeight", v)} placeholder="1.5 or 24px" /></Row>
        <Row label="Letter Spacing"><TextInput value={styles.letterSpacing || ""} onChange={(v) => set("letterSpacing", v)} placeholder="0.05em or 1px" /></Row>
        <Row label="Transform">
          <div className="grid grid-cols-4 gap-1">
            {TEXT_TRANSFORM.map((t) => (
              <button key={t} onClick={() => set("textTransform", t)}
                className={`py-1.5 text-xs rounded border capitalize transition-colors ${styles.textTransform === t ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                {t === "none" ? "Aa" : t.slice(0, 3)}
              </button>
            ))}
          </div>
        </Row>
        <Row label="Decoration">
          <div className="grid grid-cols-4 gap-1">
            {TEXT_DECORATION.map((d) => (
              <button key={d} onClick={() => set("textDecoration", d)}
                className={`py-1.5 text-xs rounded border transition-colors ${styles.textDecoration === d ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                {d === "none" ? "—" : d === "underline" ? "U̲" : d === "line-through" ? "S̶" : "O̅"}
              </button>
            ))}
          </div>
        </Row>
      </Section>

      {/* Background */}
      <Section title="Background">
        <Row label="Color"><ColorPicker value={styles.backgroundColor || ""} onChange={(v) => set("backgroundColor", v)} /></Row>
        <Row label="Gradient">
          <TextInput value={styles.background || ""} onChange={(v) => set("background", v)} placeholder="linear-gradient(135deg, #f00, #00f)" />
        </Row>
        <Row label="Image URL">
          <TextInput value={styles.backgroundImage || ""} onChange={(v) => set("backgroundImage", v ? `url(${v})` : "")} placeholder="https://..." />
        </Row>
        <Row label="Size">
          <div className="grid grid-cols-3 gap-1">
            {["cover","contain","auto"].map((s) => (
              <button key={s} onClick={() => set("backgroundSize", s)}
                className={`py-1.5 text-xs rounded border transition-colors ${styles.backgroundSize === s ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                {s}
              </button>
            ))}
          </div>
        </Row>
        <Row label="Position">
          <div className="grid grid-cols-3 gap-1">
            {["top","center","bottom"].map((p) => (
              <button key={p} onClick={() => set("backgroundPosition", p)}
                className={`py-1.5 text-xs rounded border capitalize transition-colors ${styles.backgroundPosition === p ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                {p}
              </button>
            ))}
          </div>
        </Row>
      </Section>

      {/* Spacing */}
      <Section title="Spacing & Size">
        <Row label="Padding"><TextInput value={styles.padding || ""} onChange={(v) => set("padding", v)} placeholder="16px or 8px 16px" /></Row>
        <Row label="Margin"><TextInput value={styles.margin || ""} onChange={(v) => set("margin", v)} placeholder="0 auto" /></Row>
        <Row label="Width"><TextInput value={styles.width || ""} onChange={(v) => set("width", v)} placeholder="100%, 300px, auto" /></Row>
        <Row label="Max Width"><TextInput value={styles.maxWidth || ""} onChange={(v) => set("maxWidth", v)} placeholder="1200px, 100%" /></Row>
        <Row label="Height"><TextInput value={styles.height || ""} onChange={(v) => set("height", v)} placeholder="auto, 400px, 100vh" /></Row>
        <Row label="Min Height"><TextInput value={styles.minHeight || ""} onChange={(v) => set("minHeight", v)} placeholder="200px, 50vh" /></Row>
      </Section>

      {/* Border */}
      <Section title="Border & Radius">
        <Row label="Border"><TextInput value={styles.border || ""} onChange={(v) => set("border", v)} placeholder="1px solid #e2e8f0" /></Row>
        <Row label="Border Color"><ColorPicker value={styles.borderColor || ""} onChange={(v) => set("borderColor", v)} /></Row>
        <Row label="Border Width"><TextInput value={styles.borderWidth || ""} onChange={(v) => set("borderWidth", v)} placeholder="1px, 2px 4px" /></Row>
        <Row label="Border Radius">
          <div className="grid grid-cols-4 gap-1 mb-2">
            {RADII.map((r) => (
              <button key={r} onClick={() => set("borderRadius", r)}
                className={`py-1.5 text-xs rounded border transition-colors ${styles.borderRadius === r ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                {r}
              </button>
            ))}
          </div>
          <TextInput value={styles.borderRadius || ""} onChange={(v) => set("borderRadius", v)} placeholder="custom…" />
        </Row>
      </Section>

      {/* Shadow */}
      <Section title="Shadow">
        <Row label="Box Shadow">
          <div className="grid grid-cols-4 gap-1 mb-2">
            {SHADOWS.map(({ v, l }) => (
              <button key={l} onClick={() => set("boxShadow", v)}
                className={`py-1.5 text-xs rounded border transition-colors ${styles.boxShadow === v ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                {l}
              </button>
            ))}
          </div>
          <TextInput value={styles.boxShadow || ""} onChange={(v) => set("boxShadow", v)} placeholder="custom…" />
        </Row>
        <Row label="Text Shadow"><TextInput value={styles.textShadow || ""} onChange={(v) => set("textShadow", v)} placeholder="1px 1px 4px rgba(0,0,0,0.3)" /></Row>
      </Section>

      {/* Layout */}
      <Section title="Layout" defaultOpen={false}>
        <Row label="Display"><SelectInput value={styles.display || ""} onChange={(v) => set("display", v)} options={DISPLAY} /></Row>
        <Row label="Flex Direction"><SelectInput value={styles.flexDirection || ""} onChange={(v) => set("flexDirection", v)} options={FLEX_DIR} /></Row>
        <Row label="Align Items"><SelectInput value={styles.alignItems || ""} onChange={(v) => set("alignItems", v)} options={ALIGN_ITEMS} /></Row>
        <Row label="Justify Content"><SelectInput value={styles.justifyContent || ""} onChange={(v) => set("justifyContent", v)} options={JUSTIFY} /></Row>
        <Row label="Gap"><TextInput value={styles.gap || ""} onChange={(v) => set("gap", v)} placeholder="16px, 8px 16px" /></Row>
        <Row label="Overflow"><SelectInput value={styles.overflow || ""} onChange={(v) => set("overflow", v)} options={OVERFLOW} /></Row>
      </Section>

      {/* Effects */}
      <Section title="Effects" defaultOpen={false}>
        <Row label="Opacity">
          <div className="flex items-center gap-3">
            <input type="range" min={0} max={100} value={Math.round(parseFloat(styles.opacity || "1") * 100)}
              onChange={(e) => set("opacity", String(parseInt(e.target.value) / 100))}
              className="flex-1 accent-josett-500" />
            <span className="text-xs text-slate-400 w-10 text-right">{Math.round(parseFloat(styles.opacity || "1") * 100)}%</span>
          </div>
        </Row>
        <Row label="Transform"><TextInput value={styles.transform || ""} onChange={(v) => set("transform", v)} placeholder="rotate(5deg) scale(1.1)" /></Row>
        <Row label="Transition"><TextInput value={styles.transition || ""} onChange={(v) => set("transition", v)} placeholder="all 0.3s ease" /></Row>
        <Row label="Filter"><TextInput value={styles.filter || ""} onChange={(v) => set("filter", v)} placeholder="blur(4px) brightness(0.8)" /></Row>
        <Row label="Mix Blend"><SelectInput value={styles.mixBlendMode || ""} onChange={(v) => set("mixBlendMode", v)} options={["normal","multiply","screen","overlay","darken","lighten","color-dodge","hard-light","soft-light","difference","exclusion"]} /></Row>
        <Row label="Cursor"><SelectInput value={styles.cursor || ""} onChange={(v) => set("cursor", v)} options={CURSORS} /></Row>
      </Section>

      {/* Position */}
      <Section title="Position" defaultOpen={false}>
        <Row label="Position"><SelectInput value={styles.position || ""} onChange={(v) => set("position", v)} options={["static","relative","absolute","fixed","sticky"]} /></Row>
        <Row label="Top"><TextInput value={styles.top || ""} onChange={(v) => set("top", v)} placeholder="0, 20px, auto" /></Row>
        <Row label="Right"><TextInput value={styles.right || ""} onChange={(v) => set("right", v)} placeholder="0, 20px, auto" /></Row>
        <Row label="Bottom"><TextInput value={styles.bottom || ""} onChange={(v) => set("bottom", v)} placeholder="0, 20px, auto" /></Row>
        <Row label="Left"><TextInput value={styles.left || ""} onChange={(v) => set("left", v)} placeholder="0, 20px, auto" /></Row>
        <Row label="Z-Index"><TextInput value={styles.zIndex || ""} onChange={(v) => set("zIndex", v)} placeholder="1, 10, 100" /></Row>
      </Section>

      {/* Custom CSS */}
      <Section title="Custom CSS" defaultOpen={false}>
        <p className="text-[11px] text-slate-500 mb-2">Add any CSS property not covered above.</p>
        <Row label="Custom Property Name">
          <TextInput value={""} onChange={() => {}} placeholder="e.g. aspect-ratio" />
        </Row>
        <Row label="Custom Property Value">
          <TextInput value={""} onChange={() => {}} placeholder="e.g. 16/9" />
        </Row>
      </Section>
    </div>
  );
}
