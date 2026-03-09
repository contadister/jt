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


    case "image-text":
      return (
        <>
          <Field label="Heading"><Input value={content.heading as string || ""} onChange={(v) => set("heading", v)} /></Field>
          <Field label="Body Text"><Textarea value={content.body as string || ""} onChange={(v) => set("body", v)} rows={4} /></Field>
          <Field label="Image URL"><Input value={content.image as string || ""} onChange={(v) => set("image", v)} placeholder="https://..." /></Field>
          <Field label="Image Position">
            <div className="flex gap-2">
              {["Left", "Right"].map((pos) => (
                <button key={pos} onClick={() => set("imageLeft", pos === "Left")}
                  className={`flex-1 py-1.5 text-xs rounded border transition-colors ${(content.imageLeft !== false && pos === "Left") || (content.imageLeft === false && pos === "Right") ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                  {pos}
                </button>
              ))}
            </div>
          </Field>
        </>
      );

    case "feature-grid":
      return (
        <>
          <Field label="Section Heading"><Input value={content.heading as string || ""} onChange={(v) => set("heading", v)} /></Field>
          {((content.features as {icon: string; title: string; desc: string}[]) || []).map((f, i) => (
            <div key={i} className="border border-slate-700 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-slate-400">Feature {i + 1}</p>
              <Field label="Icon (emoji)"><Input value={f.icon} onChange={(v) => { const fs = [...((content.features as {icon:string;title:string;desc:string}[]) || [])]; fs[i]={...fs[i],icon:v}; set("features",fs); }} placeholder="⚡" /></Field>
              <Field label="Title"><Input value={f.title} onChange={(v) => { const fs = [...((content.features as {icon:string;title:string;desc:string}[]) || [])]; fs[i]={...fs[i],title:v}; set("features",fs); }} /></Field>
              <Field label="Description"><Input value={f.desc} onChange={(v) => { const fs = [...((content.features as {icon:string;title:string;desc:string}[]) || [])]; fs[i]={...fs[i],desc:v}; set("features",fs); }} /></Field>
            </div>
          ))}
          <button onClick={() => { const fs = [...((content.features as {icon:string;title:string;desc:string}[]) || [])]; fs.push({icon:"✨",title:"New Feature",desc:"Feature description"}); set("features",fs); }}
            className="w-full py-1.5 text-xs border border-dashed border-slate-600 text-slate-400 hover:border-josett-500 hover:text-josett-400 rounded-lg transition-colors">
            + Add Feature
          </button>
        </>
      );

    case "gallery":
      return (
        <>
          <Field label="Columns">
            <div className="flex gap-1">
              {[2,3,4].map((n) => (
                <button key={n} onClick={() => set("columns", n)}
                  className={`flex-1 py-1.5 text-xs rounded border transition-colors ${(content.columns || 3) === n ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                  {n}
                </button>
              ))}
            </div>
          </Field>
          {((content.images as {src: string; alt: string}[]) || []).map((img, i) => (
            <div key={i} className="border border-slate-700 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-slate-400">Image {i + 1}</p>
              <Field label="URL"><Input value={typeof img === "string" ? img : img.src || ""} onChange={(v) => { const imgs = [...((content.images as {src:string;alt:string}[]) || [])]; imgs[i] = typeof imgs[i] === "string" ? {src:v,alt:""} : {...imgs[i],src:v}; set("images",imgs); }} placeholder="https://..." /></Field>
            </div>
          ))}
          <button onClick={() => { const imgs = [...((content.images as {src:string;alt:string}[]) || [])]; imgs.push({src:"",alt:""}); set("images",imgs); }}
            className="w-full py-1.5 text-xs border border-dashed border-slate-600 text-slate-400 hover:border-josett-500 hover:text-josett-400 rounded-lg transition-colors">
            + Add Image
          </button>
        </>
      );

    case "video":
      return (
        <>
          <Field label="Video URL" hint="YouTube or Vimeo URL"><Input value={content.url as string || ""} onChange={(v) => set("url", v)} placeholder="https://youtube.com/watch?v=..." /></Field>
          <Field label="Autoplay">
            <button onClick={() => set("autoplay", !content.autoplay)}
              className={`relative w-12 h-6 rounded-full transition-colors ${content.autoplay ? "bg-josett-600" : "bg-slate-600"}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${content.autoplay ? "translate-x-7" : "translate-x-1"}`} />
            </button>
          </Field>
        </>
      );

    case "social-links":
      return (
        <>
          {(["facebook","instagram","twitter","linkedin","youtube","tiktok","whatsapp"] as const).map((platform) => {
            const links = (content.links as {platform: string; url: string}[]) || [];
            const existing = links.find((l) => l.platform === platform);
            return (
              <Field key={platform} label={platform.charAt(0).toUpperCase() + platform.slice(1)}>
                <Input value={existing?.url || ""} onChange={(v) => {
                  const ls = links.filter((l) => l.platform !== platform);
                  if (v) ls.push({platform, url: v});
                  set("links", ls);
                }} placeholder={`https://${platform}.com/...`} />
              </Field>
            );
          })}
        </>
      );

    case "pricing-table":
      return (
        <>
          {((content.plans as {name: string; price: string; period: string; features: string[]; cta: string; highlighted?: boolean}[]) || []).map((plan, i) => (
            <div key={i} className="border border-slate-700 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-slate-400">Plan {i + 1}</p>
              <Field label="Name"><Input value={plan.name} onChange={(v) => { const ps=[...((content.plans as {name:string;price:string;period:string;features:string[];cta:string;highlighted?:boolean}[])||[])]; ps[i]={...ps[i],name:v}; set("plans",ps); }} /></Field>
              <Field label="Price"><Input value={plan.price} onChange={(v) => { const ps=[...((content.plans as {name:string;price:string;period:string;features:string[];cta:string;highlighted?:boolean}[])||[])]; ps[i]={...ps[i],price:v}; set("plans",ps); }} /></Field>
              <Field label="Period (e.g. /month)"><Input value={plan.period} onChange={(v) => { const ps=[...((content.plans as {name:string;price:string;period:string;features:string[];cta:string;highlighted?:boolean}[])||[])]; ps[i]={...ps[i],period:v}; set("plans",ps); }} /></Field>
              <Field label="Button Text"><Input value={plan.cta} onChange={(v) => { const ps=[...((content.plans as {name:string;price:string;period:string;features:string[];cta:string;highlighted?:boolean}[])||[])]; ps[i]={...ps[i],cta:v}; set("plans",ps); }} /></Field>
              <Field label="Highlight">
                <button onClick={() => { const ps=[...((content.plans as {name:string;price:string;period:string;features:string[];cta:string;highlighted?:boolean}[])||[])]; ps[i]={...ps[i],highlighted:!ps[i].highlighted}; set("plans",ps); }}
                  className={`relative w-10 h-5 rounded-full transition-colors ${plan.highlighted ? "bg-josett-600" : "bg-slate-600"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${plan.highlighted ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </Field>
            </div>
          ))}
          <button onClick={() => { const ps=[...((content.plans as {name:string;price:string;period:string;features:string[];cta:string}[])||[])]; ps.push({name:"Plan",price:"0",period:"/mo",features:[],cta:"Get Started"}); set("plans",ps); }}
            className="w-full py-1.5 text-xs border border-dashed border-slate-600 text-slate-400 hover:border-josett-500 hover:text-josett-400 rounded-lg transition-colors">
            + Add Plan
          </button>
        </>
      );

    case "team-member":
      return (
        <>
          <Field label="Name"><Input value={content.name as string || ""} onChange={(v) => set("name", v)} /></Field>
          <Field label="Role / Title"><Input value={content.role as string || ""} onChange={(v) => set("role", v)} /></Field>
          <Field label="Bio"><Textarea value={content.bio as string || ""} onChange={(v) => set("bio", v)} rows={3} /></Field>
          <Field label="Photo URL"><Input value={content.image as string || ""} onChange={(v) => set("image", v)} placeholder="https://..." /></Field>
        </>
      );

    case "faq-accordion":
      return (
        <>
          {((content.items as {q: string; a: string}[]) || []).map((item, i) => (
            <div key={i} className="border border-slate-700 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-slate-400">FAQ {i + 1}</p>
              <Field label="Question"><Input value={item.q} onChange={(v) => { const its=[...((content.items as {q:string;a:string}[])||[])]; its[i]={...its[i],q:v}; set("items",its); }} /></Field>
              <Field label="Answer"><Textarea value={item.a} onChange={(v) => { const its=[...((content.items as {q:string;a:string}[])||[])]; its[i]={...its[i],a:v}; set("items",its); }} rows={3} /></Field>
            </div>
          ))}
          <button onClick={() => { const its=[...((content.items as {q:string;a:string}[])||[])]; its.push({q:"New Question?",a:"Answer here."}); set("items",its); }}
            className="w-full py-1.5 text-xs border border-dashed border-slate-600 text-slate-400 hover:border-josett-500 hover:text-josett-400 rounded-lg transition-colors">
            + Add FAQ Item
          </button>
        </>
      );

    case "stats-counter":
      return (
        <>
          {((content.stats as {number: string; label: string}[]) || []).map((stat, i) => (
            <div key={i} className="border border-slate-700 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-slate-400">Stat {i + 1}</p>
              <Field label="Number / Value"><Input value={stat.number} onChange={(v) => { const ss=[...((content.stats as {number:string;label:string}[])||[])]; ss[i]={...ss[i],number:v}; set("stats",ss); }} placeholder="100+" /></Field>
              <Field label="Label"><Input value={stat.label} onChange={(v) => { const ss=[...((content.stats as {number:string;label:string}[])||[])]; ss[i]={...ss[i],label:v}; set("stats",ss); }} placeholder="Clients" /></Field>
            </div>
          ))}
          <button onClick={() => { const ss=[...((content.stats as {number:string;label:string}[])||[])]; ss.push({number:"0",label:"Metric"}); set("stats",ss); }}
            className="w-full py-1.5 text-xs border border-dashed border-slate-600 text-slate-400 hover:border-josett-500 hover:text-josett-400 rounded-lg transition-colors">
            + Add Stat
          </button>
        </>
      );

    case "form":
      return (
        <>
          <Field label="Form Title"><Input value={content.title as string || ""} onChange={(v) => set("title", v)} placeholder="Contact Us" /></Field>
          <Field label="Submit Button Text"><Input value={content.submitText as string || "Send"} onChange={(v) => set("submitText", v)} /></Field>
          {((content.fields as {name: string; label: string; type: string; required: boolean}[]) || []).filter((field) => typeof field === "object" && field !== null).map((field, i) => (
            <div key={i} className="border border-slate-700 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-slate-400">Field {i + 1}</p>
              <Field label="Label"><Input value={field.label} onChange={(v) => { const fs=[...((content.fields as {name:string;label:string;type:string;required:boolean}[])||[])]; fs[i]={...fs[i],label:v,name:v.toLowerCase().replace(/\s+/g,"_")}; set("fields",fs); }} /></Field>
              <Field label="Type">
                <select value={field.type} onChange={(e) => { const fs=[...((content.fields as {name:string;label:string;type:string;required:boolean}[])||[])]; fs[i]={...fs[i],type:e.target.value}; set("fields",fs); }}
                  className="w-full bg-slate-800 text-slate-200 text-xs px-2 py-1.5 rounded border border-slate-700 focus:border-josett-500 focus:outline-none">
                  {["text","email","tel","textarea","number","date"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
          ))}
          <button onClick={() => { const fs=[...((content.fields as {name:string;label:string;type:string;required:boolean}[])||[])]; fs.push({name:`field_${fs.length+1}`,label:"New Field",type:"text",required:false}); set("fields",fs); }}
            className="w-full py-1.5 text-xs border border-dashed border-slate-600 text-slate-400 hover:border-josett-500 hover:text-josett-400 rounded-lg transition-colors">
            + Add Field
          </button>
        </>
      );

    case "menu-section":
      return (
        <>
          <Field label="Section Title"><Input value={content.title as string || ""} onChange={(v) => set("title", v)} placeholder="Today's Menu" /></Field>
          {((content.items as {name: string; description: string; price: string}[]) || []).map((item, i) => (
            <div key={i} className="border border-slate-700 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-slate-400">Item {i + 1}</p>
              <Field label="Name"><Input value={item.name} onChange={(v) => { const its=[...((content.items as {name:string;description:string;price:string}[])||[])]; its[i]={...its[i],name:v}; set("items",its); }} /></Field>
              <Field label="Description"><Input value={item.description} onChange={(v) => { const its=[...((content.items as {name:string;description:string;price:string}[])||[])]; its[i]={...its[i],description:v}; set("items",its); }} /></Field>
              <Field label="Price"><Input value={item.price} onChange={(v) => { const its=[...((content.items as {name:string;description:string;price:string}[])||[])]; its[i]={...its[i],price:v}; set("items",its); }} placeholder="GHS 25" /></Field>
            </div>
          ))}
          <button onClick={() => { const its=[...((content.items as {name:string;description:string;price:string}[])||[])]; its.push({name:"New Item",description:"",price:"GHS 0"}); set("items",its); }}
            className="w-full py-1.5 text-xs border border-dashed border-slate-600 text-slate-400 hover:border-josett-500 hover:text-josett-400 rounded-lg transition-colors">
            + Add Item
          </button>
        </>
      );

    case "link-in-bio":
      return (
        <>
          {((content.links as {label: string; url: string; emoji?: string}[]) || []).map((link, i) => (
            <div key={i} className="border border-slate-700 rounded-xl p-3 space-y-2">
              <p className="text-xs font-bold text-slate-400">Link {i + 1}</p>
              <Field label="Emoji (optional)"><Input value={link.emoji || ""} onChange={(v) => { const ls=[...((content.links as {label:string;url:string;emoji?:string}[])||[])]; ls[i]={...ls[i],emoji:v}; set("links",ls); }} placeholder="🔗" /></Field>
              <Field label="Label"><Input value={link.label} onChange={(v) => { const ls=[...((content.links as {label:string;url:string;emoji?:string}[])||[])]; ls[i]={...ls[i],label:v}; set("links",ls); }} /></Field>
              <Field label="URL"><Input value={link.url} onChange={(v) => { const ls=[...((content.links as {label:string;url:string;emoji?:string}[])||[])]; ls[i]={...ls[i],url:v}; set("links",ls); }} placeholder="https://..." /></Field>
            </div>
          ))}
          <button onClick={() => { const ls=[...((content.links as {label:string;url:string;emoji?:string}[])||[])]; ls.push({label:"New Link",url:"",emoji:"🔗"}); set("links",ls); }}
            className="w-full py-1.5 text-xs border border-dashed border-slate-600 text-slate-400 hover:border-josett-500 hover:text-josett-400 rounded-lg transition-colors">
            + Add Link
          </button>
        </>
      );

    case "booking-widget":
      return (
        <>
          <Field label="Title"><Input value={content.title as string || "Book an Appointment"} onChange={(v) => set("title", v)} /></Field>
          <Field label="Subtitle"><Input value={content.subtitle as string || ""} onChange={(v) => set("subtitle", v)} placeholder="Choose a time that works for you" /></Field>
          <Field label="Button Text"><Input value={content.buttonText as string || "Book Now"} onChange={(v) => set("buttonText", v)} /></Field>
        </>
      );

    case "blog-preview":
      return (
        <>
          <Field label="Section Title"><Input value={content.title as string || "Latest Posts"} onChange={(v) => set("title", v)} /></Field>
          <Field label="Posts to Show">
            <div className="flex gap-1">
              {[2,3,4].map((n) => (
                <button key={n} onClick={() => set("postsCount", n)}
                  className={`flex-1 py-1.5 text-xs rounded border transition-colors ${(content.postsCount || 3) === n ? "border-josett-500 bg-josett-950/50 text-josett-400" : "border-slate-700 text-slate-500 hover:border-slate-500"}`}>
                  {n}
                </button>
              ))}
            </div>
          </Field>
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
