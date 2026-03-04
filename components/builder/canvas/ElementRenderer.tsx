/* eslint-disable @next/next/no-img-element */
"use client";

import { useBuilderStore } from "@/store/builderStore";
import { BuilderElement } from "@/types/builder";
import { Trash2, Copy, Lock, GripVertical } from "lucide-react";

interface ElementRendererProps {
  element: BuilderElement;
  sectionId: string;
}

export function ElementRenderer({ element, sectionId }: ElementRendererProps) {
  const { selectedElementId, selectElement, deleteElement, duplicateElement } = useBuilderStore();
  const isSelected = selectedElementId === element.id;
  const content = element.content as Record<string, unknown>;

  return (
    <div
      className={`relative group cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-josett-500 rounded" : "hover:ring-1 hover:ring-josett-300 rounded"
      } ${element.isLocked ? "pointer-events-none opacity-60" : ""}`}
      onClick={(e) => { e.stopPropagation(); selectElement(element.id); }}
    >
      {/* Element toolbar */}
      {!element.isLocked && (
        <div className={`absolute -top-7 left-0 z-20 flex items-center gap-1 bg-josett-600 text-white rounded text-[10px] px-1.5 py-1 shadow transition-all ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}>
          <GripVertical size={10} className="cursor-grab" />
          <span className="font-medium">{element.type}</span>
          <button onClick={(e) => { e.stopPropagation(); duplicateElement(element.id); }} className="hover:bg-josett-500 p-0.5 rounded ml-1">
            <Copy size={9} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }} className="hover:bg-red-500 p-0.5 rounded">
            <Trash2 size={9} />
          </button>
        </div>
      )}

      {element.isLocked && (
        <div className="absolute top-1 right-1 z-10"><Lock size={10} className="text-slate-400" /></div>
      )}

      {/* Element content */}
      <div style={element.styles as React.CSSProperties}>
        <ElementContent element={element} content={content} />
      </div>
    </div>
  );
}

function ElementContent({ element, content }: { element: BuilderElement; content: Record<string, unknown> }) {
  switch (element.type) {
    case "heading":
      const Tag = (content.level as keyof JSX.IntrinsicElements) || "h2";
      const sizes: Record<string, string> = { h1: "text-4xl", h2: "text-3xl", h3: "text-2xl", h4: "text-xl", h5: "text-lg", h6: "text-base" };
      return <Tag className={`font-bold text-slate-900 ${sizes[content.level as string] || "text-3xl"}`}>{content.text as string || "Heading"}</Tag>;

    case "text":
      return <p className="text-slate-700 leading-relaxed">{content.text as string || "Text block"}</p>;

    case "image":
      return content.src
        ? <img src={content.src as string} alt={content.alt as string || ""} className="w-full rounded-lg" />
        : <div className="w-full h-40 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-200">Click to set image</div>;

    case "button":
      return (
        <button className="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-sm bg-josett-600 text-white hover:bg-josett-500 transition-colors">
          {content.text as string || "Button"}
        </button>
      );

    case "divider":
      return <hr className="border-slate-200 my-2" style={{ borderColor: content.color as string }} />;

    case "spacer":
      return <div style={{ height: `${content.height || 40}px` }} />;

    case "hero":
      return (
        <div className="py-16 px-6 text-center bg-gradient-to-br from-josett-600 to-purple-600 text-white rounded-lg">
          <h1 className="text-4xl font-black mb-4">{content.title as string || "Hero Title"}</h1>
          <p className="text-lg opacity-90 mb-6">{content.subtitle as string || "Your subtitle goes here"}</p>
          <button className="bg-white text-josett-600 font-bold px-6 py-3 rounded-xl hover:bg-josett-50 transition-colors">
            {content.ctaText as string || "Get Started"}
          </button>
        </div>
      );

    case "testimonial":
      return (
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <p className="text-slate-700 italic mb-3">&ldquo;{content.quote as string || "Great service!"}&rdquo;</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-josett-200 rounded-full flex items-center justify-center text-josett-700 text-sm font-bold">
              {((content.author as string) || "A")[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{content.author as string || "Customer"}</p>
              <p className="text-xs text-slate-500">{content.role as string || ""}</p>
            </div>
          </div>
        </div>
      );

    case "navigation":
      return (
        <nav className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
          <span className="font-black text-josett-600 text-lg">{content.logo as string || "Logo"}</span>
          <div className="flex items-center gap-5 text-sm text-slate-600">
            <a href="#" className="hover:text-josett-600">Home</a>
            <a href="#" className="hover:text-josett-600">About</a>
            <a href="#" className="hover:text-josett-600">Contact</a>
          </div>
          {content.ctaText && (
            <button className="bg-josett-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">{content.ctaText as string}</button>
          )}
        </nav>
      );

    case "footer":
      return (
        <footer className="bg-slate-900 text-white px-6 py-8 text-center">
          <p className="text-slate-400 text-sm">{content.copyright as string || "© 2025 Your Business. All rights reserved."}</p>
        </footer>
      );

    case "form":
      return (
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">{content.title as string || "Contact Us"}</h3>
          <div className="space-y-3">
            {(content.fields as string[] || ["name", "email", "message"]).map((field) => (
              field === "message"
                ? <textarea key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" rows={3} readOnly />
                : <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" readOnly />
            ))}
            <button className="w-full bg-josett-600 text-white font-semibold py-2.5 rounded-lg text-sm">{content.submitText as string || "Send"}</button>
          </div>
        </div>
      );

    case "map":
      return (
        <div className="w-full h-48 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
          <div className="text-center text-slate-500">
            <p className="text-sm font-medium">📍 Google Map</p>
            <p className="text-xs">{content.address as string || "Set address in inspector"}</p>
          </div>
        </div>
      );

    case "stats-counter":
      const stats = content.stats as { number: string; label: string }[] || [{ number: "100+", label: "Clients" }];
      return (
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-black text-josett-600">{stat.number}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      );

    case "product-card":
      return (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="h-40 bg-slate-100 flex items-center justify-center">
            {content.image ? <img src={content.image as string} className="w-full h-full object-cover" alt="" /> : <span className="text-slate-400 text-sm">Product Image</span>}
          </div>
          <div className="p-4">
            <p className="font-semibold text-slate-900">{content.name as string || "Product Name"}</p>
            <p className="text-josett-600 font-bold">GHS {content.price || "0.00"}</p>
            <button className="mt-3 w-full bg-josett-600 text-white text-sm font-semibold py-2 rounded-lg">Add to Cart</button>
          </div>
        </div>
      );

    case "whatsapp-button":
      return (
        <a href={`https://wa.me/${content.number}`} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-5 py-3 rounded-xl text-sm hover:bg-green-600 transition-colors">
          <span>💬</span> Chat on WhatsApp
        </a>
      );

    case "newsletter-signup":
      return (
        <div className="bg-josett-50 rounded-xl p-5 border border-josett-100 text-center">
          <h3 className="font-bold text-slate-900 mb-2">{content.title as string || "Subscribe"}</h3>
          <div className="flex gap-2">
            <input placeholder={content.placeholder as string || "Enter your email"} className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm" readOnly />
            <button className="bg-josett-600 text-white font-semibold px-4 py-2 rounded-lg text-sm">{content.buttonText as string || "Subscribe"}</button>
          </div>
        </div>
      );

    case "gallery":
      const cols = (content.columns as number) || 3;
      return (
        <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-xs">
              Photo {i + 1}
            </div>
          ))}
        </div>
      );

    case "faq-accordion":
      const faqItems = content.items as { q: string; a: string }[] || [{ q: "Question?", a: "Answer." }];
      return (
        <div className="space-y-2">
          {faqItems.map((item, i) => (
            <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-white cursor-pointer">
                <span className="font-medium text-slate-900 text-sm">{item.q}</span>
                <span className="text-slate-400">+</span>
              </div>
            </div>
          ))}
        </div>
      );

    case "countdown":
      return (
        <div className="text-center py-6">
          <p className="text-sm text-slate-500 mb-3">{content.title as string || "Coming Soon"}</p>
          <div className="flex justify-center gap-4">
            {[["00", "Days"], ["00", "Hours"], ["00", "Min"], ["00", "Sec"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="bg-slate-900 text-white text-2xl font-black w-14 h-14 flex items-center justify-center rounded-xl">{val}</div>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "social-links":
      return (
        <div className="flex gap-3">
          {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((s) => (
            <div key={s} className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-xs font-bold hover:bg-josett-100 cursor-pointer transition-colors">
              {s[0]}
            </div>
          ))}
        </div>
      );

    case "link-in-bio":
      return (
        <div className="space-y-2 max-w-xs mx-auto">
          {[{ text: "My Website", url: "#" }, { text: "Instagram", url: "#" }, { text: "Shop", url: "#" }].map((link, i) => (
            <a key={i} href={link.url} className="block w-full text-center bg-josett-600 text-white font-semibold py-3 rounded-xl text-sm hover:bg-josett-500 transition-colors">
              {link.text}
            </a>
          ))}
        </div>
      );

    default:
      return (
        <div className="bg-slate-100 rounded-lg p-4 text-center text-slate-500 text-sm border border-dashed border-slate-300">
          {element.type}
        </div>
      );
  }
}
