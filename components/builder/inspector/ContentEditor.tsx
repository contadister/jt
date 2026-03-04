"use client";

import { useBuilderStore } from "@/store/builderStore";
import { BuilderElement } from "@/types/builder";

interface ContentEditorProps {
  element: BuilderElement;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] text-slate-400 font-medium mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none"
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none resize-none"
    />
  );
}

export function ContentEditor({ element }: ContentEditorProps) {
  const { updateElementContent } = useBuilderStore();
  const content = element.content as Record<string, unknown>;
  const set = (key: string, value: unknown) => updateElementContent(element.id, { [key]: value });

  switch (element.type) {
    case "heading":
      return (
        <>
          <Field label="Text">
            <Textarea value={content.text as string || ""} onChange={(v) => set("text", v)} placeholder="Heading text" rows={2} />
          </Field>
          <Field label="Level">
            <select value={content.level as string || "h2"} onChange={(e) => set("level", e.target.value)}
              className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none">
              {["h1", "h2", "h3", "h4", "h5", "h6"].map((l) => <option key={l}>{l}</option>)}
            </select>
          </Field>
        </>
      );

    case "text":
      return (
        <Field label="Content">
          <Textarea value={content.text as string || ""} onChange={(v) => set("text", v)} placeholder="Text content" rows={5} />
        </Field>
      );

    case "image":
      return (
        <>
          <Field label="Image URL"><Input value={content.src as string || ""} onChange={(v) => set("src", v)} placeholder="https://..." /></Field>
          <Field label="Alt Text"><Input value={content.alt as string || ""} onChange={(v) => set("alt", v)} placeholder="Describe the image" /></Field>
          <Field label="Caption"><Input value={content.caption as string || ""} onChange={(v) => set("caption", v)} placeholder="Optional caption" /></Field>
        </>
      );

    case "button":
      return (
        <>
          <Field label="Button Text"><Input value={content.text as string || ""} onChange={(v) => set("text", v)} placeholder="Button text" /></Field>
          <Field label="Link URL"><Input value={content.href as string || ""} onChange={(v) => set("href", v)} placeholder="https://..." /></Field>
        </>
      );

    case "hero":
      return (
        <>
          <Field label="Title"><Textarea value={content.title as string || ""} onChange={(v) => set("title", v)} rows={2} /></Field>
          <Field label="Subtitle"><Textarea value={content.subtitle as string || ""} onChange={(v) => set("subtitle", v)} rows={3} /></Field>
          <Field label="CTA Button Text"><Input value={content.ctaText as string || ""} onChange={(v) => set("ctaText", v)} /></Field>
          <Field label="CTA Link"><Input value={content.ctaHref as string || ""} onChange={(v) => set("ctaHref", v)} placeholder="https://..." /></Field>
          <Field label="Background Image URL"><Input value={content.image as string || ""} onChange={(v) => set("image", v)} placeholder="https://..." /></Field>
        </>
      );

    case "testimonial":
      return (
        <>
          <Field label="Quote"><Textarea value={content.quote as string || ""} onChange={(v) => set("quote", v)} rows={3} /></Field>
          <Field label="Author Name"><Input value={content.author as string || ""} onChange={(v) => set("author", v)} /></Field>
          <Field label="Role / Company"><Input value={content.role as string || ""} onChange={(v) => set("role", v)} /></Field>
        </>
      );

    case "navigation":
      return (
        <>
          <Field label="Logo Text"><Input value={content.logo as string || ""} onChange={(v) => set("logo", v)} placeholder="Your Brand" /></Field>
          <Field label="CTA Button Text"><Input value={content.ctaText as string || ""} onChange={(v) => set("ctaText", v)} placeholder="Get Started" /></Field>
        </>
      );

    case "footer":
      return (
        <Field label="Copyright Text">
          <Textarea value={content.copyright as string || ""} onChange={(v) => set("copyright", v)} rows={2} placeholder="© 2025 Your Business" />
        </Field>
      );

    case "whatsapp-button":
      return (
        <>
          <Field label="WhatsApp Number"><Input value={content.number as string || ""} onChange={(v) => set("number", v)} placeholder="233201234567" /></Field>
          <Field label="Pre-filled Message"><Textarea value={content.message as string || ""} onChange={(v) => set("message", v)} rows={2} /></Field>
        </>
      );

    case "map":
      return (
        <>
          <Field label="Address"><Textarea value={content.address as string || ""} onChange={(v) => set("address", v)} rows={2} placeholder="123 Main St, Accra, Ghana" /></Field>
          <Field label="Zoom Level (1-20)">
            <input type="range" min={1} max={20} value={content.zoom as number || 14}
              onChange={(e) => set("zoom", parseInt(e.target.value))}
              className="w-full accent-josett-500" />
            <span className="text-xs text-slate-400">{content.zoom as number || 14}</span>
          </Field>
        </>
      );

    case "newsletter-signup":
      return (
        <>
          <Field label="Title"><Input value={content.title as string || ""} onChange={(v) => set("title", v)} /></Field>
          <Field label="Placeholder"><Input value={content.placeholder as string || ""} onChange={(v) => set("placeholder", v)} /></Field>
          <Field label="Button Text"><Input value={content.buttonText as string || ""} onChange={(v) => set("buttonText", v)} /></Field>
        </>
      );

    case "countdown":
      return (
        <>
          <Field label="Title"><Input value={content.title as string || ""} onChange={(v) => set("title", v)} /></Field>
          <Field label="Target Date"><Input type="datetime-local" value={content.targetDate as string || ""} onChange={(v) => set("targetDate", v)} /></Field>
        </>
      );

    case "spacer":
      return (
        <Field label={`Height: ${content.height || 40}px`}>
          <input type="range" min={10} max={200} value={content.height as number || 40}
            onChange={(e) => set("height", parseInt(e.target.value))}
            className="w-full accent-josett-500" />
        </Field>
      );

    case "product-card":
      return (
        <>
          <Field label="Product Name"><Input value={content.name as string || ""} onChange={(v) => set("name", v)} /></Field>
          <Field label="Price (GHS)"><Input type="number" value={String(content.price || 0)} onChange={(v) => set("price", parseFloat(v))} /></Field>
          <Field label="Description"><Textarea value={content.description as string || ""} onChange={(v) => set("description", v)} rows={3} /></Field>
          <Field label="Image URL"><Input value={content.image as string || ""} onChange={(v) => set("image", v)} placeholder="https://..." /></Field>
        </>
      );

    default:
      return (
        <div className="text-slate-500 text-xs text-center py-4">
          No content settings for this element type.
        </div>
      );
  }
}
