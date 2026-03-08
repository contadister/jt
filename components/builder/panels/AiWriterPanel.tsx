"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check, Wand2, RefreshCw } from "lucide-react";
import { useBuilderStore } from "@/store/builderStore";

const TONES = ["Professional", "Friendly", "Persuasive", "Playful", "Luxury", "Urgent"];

const QUICK_PROMPTS = [
  { label: "Hero headline", prompt: "Write a compelling hero headline for my website" },
  { label: "About us", prompt: "Write a short, warm About Us paragraph" },
  { label: "CTA text", prompt: "Write a compelling call-to-action button text and tagline" },
  { label: "Services intro", prompt: "Write an intro paragraph for our services section" },
  { label: "Testimonial", prompt: "Write a realistic customer testimonial" },
  { label: "FAQ answer", prompt: "Write a helpful FAQ answer about pricing" },
];

export function AiWriterPanel() {
  const { builderJson, selectedElementId, getElementById, updateElementContent } = useBuilderStore();
  const siteName = builderJson.siteSettings?.siteName || "My Business";

  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedEl = selectedElementId ? getElementById(selectedElementId) : null;

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const fullPrompt = `You are a copywriter for "${siteName}". Write content with a ${tone} tone.

Task: ${prompt}

Rules:
- Keep it concise and impactful
- No markdown formatting, just plain text
- Max 3 sentences unless it's a paragraph request
- Tailor to a Ghanaian/African business audience when relevant`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [{ role: "user", content: fullPrompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "Could not generate content. Please try again.";
      setResult(text);
    } catch {
      setResult("Error connecting to AI. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function applyToElement() {
    if (!result || !selectedEl) return;
    const type = selectedEl.type;
    if (type === "heading") updateElementContent(selectedEl.id, { text: result });
    else if (type === "text") updateElementContent(selectedEl.id, { text: result });
    else if (type === "button") updateElementContent(selectedEl.id, { text: result });
    else if (type === "hero") updateElementContent(selectedEl.id, { title: result });
    else if (type === "testimonial") updateElementContent(selectedEl.id, { quote: result });
  }

  function copyResult() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-3 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={14} className="text-violet-400" />
        <span className="text-xs font-bold text-white">AI Copywriter</span>
        <span className="ml-auto text-[10px] bg-violet-900/60 text-violet-300 px-2 py-0.5 rounded-full">Powered by Claude</span>
      </div>

      {/* Quick prompts */}
      <div>
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2">Quick Generate</p>
        <div className="grid grid-cols-2 gap-1.5">
          {QUICK_PROMPTS.map((q) => (
            <button
              key={q.label}
              onClick={() => setPrompt(q.prompt)}
              className="text-left text-[11px] px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 hover:border-violet-600 transition-all"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div>
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2">Tone</p>
        <div className="flex flex-wrap gap-1.5">
          {TONES.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                tone === t
                  ? "bg-violet-600 border-violet-600 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-violet-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Custom prompt */}
      <div>
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2">Your Request</p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`e.g. Write a tagline for ${siteName}`}
          rows={3}
          className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-violet-500 focus:outline-none resize-none"
        />
        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-2.5 rounded-lg transition-all"
        >
          {loading ? (
            <><Loader2 size={13} className="animate-spin" /> Generating...</>
          ) : (
            <><Wand2 size={13} /> Generate</>
          )}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 space-y-2">
          <p className="text-xs text-slate-200 leading-relaxed">{result}</p>
          <div className="flex gap-2 pt-1">
            <button onClick={copyResult}
              className="flex-1 flex items-center justify-center gap-1.5 text-[11px] py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all">
              {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
              {copied ? "Copied!" : "Copy"}
            </button>
            {selectedEl && ["heading","text","button","hero","testimonial"].includes(selectedEl.type) && (
              <button onClick={applyToElement}
                className="flex-1 flex items-center justify-center gap-1.5 text-[11px] py-1.5 bg-violet-700 hover:bg-violet-600 text-white rounded-lg transition-all">
                <Check size={11} /> Apply to Element
              </button>
            )}
            <button onClick={generate}
              className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all" title="Regenerate">
              <RefreshCw size={12} />
            </button>
          </div>
        </div>
      )}

      {!selectedEl && result && (
        <p className="text-[10px] text-slate-500 text-center">Select a text element on the canvas to apply this directly</p>
      )}
    </div>
  );
}
