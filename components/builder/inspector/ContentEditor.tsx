"use client";

import { useBuilderStore } from "@/store/builderStore";
import { BuilderElement } from "@/lib/types/builder";

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

    case "steps-process":
      return (
        <>
          <Field label="Section Heading"><Input value={content.heading as string || ""} onChange={(v) => set("heading", v)} /></Field>
          {((content.steps as { number: string; title: string; desc: string }[]) || []).map((step, i) => (
            <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-slate-500">Step {i + 1}</p>
              <Field label="Number/Icon"><Input value={step.number} onChange={(v) => { const steps = [...((content.steps as { number: string; title: string; desc: string }[]) || [])]; steps[i] = { ...steps[i], number: v }; set("steps", steps); }} /></Field>
              <Field label="Title"><Input value={step.title} onChange={(v) => { const steps = [...((content.steps as { number: string; title: string; desc: string }[]) || [])]; steps[i] = { ...steps[i], title: v }; set("steps", steps); }} /></Field>
              <Field label="Description"><Textarea value={step.desc} onChange={(v) => { const steps = [...((content.steps as { number: string; title: string; desc: string }[]) || [])]; steps[i] = { ...steps[i], desc: v }; set("steps", steps); }} rows={2} /></Field>
            </div>
          ))}
        </>
      );

    case "brand-logos":
      return (
        <>
          <Field label="Section Heading"><Input value={content.heading as string || ""} onChange={(v) => set("heading", v)} placeholder="Trusted By" /></Field>
          {((content.logos as { name: string; url: string }[]) || []).map((logo, i) => (
            <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-slate-500">Logo {i + 1}</p>
              <Field label="Brand Name"><Input value={logo.name} onChange={(v) => { const logos = [...((content.logos as { name: string; url: string }[]) || [])]; logos[i] = { ...logos[i], name: v }; set("logos", logos); }} /></Field>
              <Field label="Logo Image URL"><Input value={logo.url} onChange={(v) => { const logos = [...((content.logos as { name: string; url: string }[]) || [])]; logos[i] = { ...logos[i], url: v }; set("logos", logos); }} placeholder="https://..." /></Field>
            </div>
          ))}
        </>
      );

    case "image-compare":
      return (
        <>
          <Field label="Before Image URL"><Input value={content.beforeImage as string || ""} onChange={(v) => set("beforeImage", v)} placeholder="https://..." /></Field>
          <Field label="Before Label"><Input value={content.beforeLabel as string || "Before"} onChange={(v) => set("beforeLabel", v)} /></Field>
          <Field label="After Image URL"><Input value={content.afterImage as string || ""} onChange={(v) => set("afterImage", v)} placeholder="https://..." /></Field>
          <Field label="After Label"><Input value={content.afterLabel as string || "After"} onChange={(v) => set("afterLabel", v)} /></Field>
        </>
      );

    case "business-hours":
      return (
        <>
          <Field label="Section Title"><Input value={content.title as string || "Opening Hours"} onChange={(v) => set("title", v)} /></Field>
          {((content.hours as { day: string; time: string }[]) || []).map((row, i) => (
            <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 space-y-2">
              <Field label="Day(s)"><Input value={row.day} onChange={(v) => { const hours = [...((content.hours as { day: string; time: string }[]) || [])]; hours[i] = { ...hours[i], day: v }; set("hours", hours); }} placeholder="Monday – Friday" /></Field>
              <Field label="Hours"><Input value={row.time} onChange={(v) => { const hours = [...((content.hours as { day: string; time: string }[]) || [])]; hours[i] = { ...hours[i], time: v }; set("hours", hours); }} placeholder="8:00 AM – 6:00 PM or Closed" /></Field>
            </div>
          ))}
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
