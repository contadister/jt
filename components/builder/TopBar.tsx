"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useBuilderStore } from "@/store/builderStore";
import {
  Undo2, Redo2, Save, Rocket, Eye, Monitor, Smartphone,
  ArrowLeft, Loader2, CheckCircle2,
} from "lucide-react";

interface BuilderTopBarProps {
  siteId: string;
  siteName: string;
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
}

export function BuilderTopBar({
  siteId, siteName, leftCollapsed, rightCollapsed, onToggleLeft, onToggleRight,
}: BuilderTopBarProps) {
  const router = useRouter();
  const {
    builderJson, isDirty, isSaving, isPublishing,
    previewMode, historyIndex, history,
    setPreviewMode, undo, redo,
    setIsSaving, setIsPublishing, setIsDirty,
  } = useBuilderStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // How complete is the site?
  const completion = useMemo(() => {
    const pages = builderJson.pages ?? [];
    const allSections = pages.flatMap((p) => p.sections ?? []);
    const allElements = allSections.flatMap((s) => s.elements ?? []);
    const checks = [
      allSections.length >= 1,
      allSections.length >= 3,
      allElements.some((e) => ["hero", "heading"].includes(e.type)),
      allElements.some((e) => ["form", "contact", "whatsapp-button"].includes(e.type)),
      allElements.some((e) => e.type === "navigation"),
      allElements.some((e) => e.type === "footer"),
      (builderJson.siteSettings?.siteName ?? "") !== "My Website",
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [builderJson]);

  const completionColor = completion < 40 ? "bg-rose-500" : completion < 70 ? "bg-amber-500" : "bg-emerald-500";
  const completionLabel = completion < 40 ? "Getting started…" : completion < 70 ? "Looking good!" : completion < 100 ? "Almost there!" : "🎉 Ready to publish!";

  const handleSave = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/sites/${siteId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ builderJson }),
      });
      if (res.ok) setIsDirty(false);
    } catch (e) {
      console.error("Save failed", e);
    } finally {
      setIsSaving(false);
    }
  }, [siteId, builderJson, isSaving, setIsSaving, setIsDirty]);

  const handlePublish = useCallback(async () => {
    if (isPublishing) return;
    setIsPublishing(true);
    try {
      await fetch(`/api/sites/${siteId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ builderJson }),
      });
      const res = await fetch(`/api/sites/${siteId}/deploy`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        alert(`Publish failed: ${data.detail || data.error || "Unknown error"}`);
      } else {
        setIsDirty(false);
        if (data.url) window.open(data.url, "_blank");
      }
    } catch (e) {
      console.error("Publish failed", e);
    } finally {
      setIsPublishing(false);
    }
  }, [siteId, builderJson, isPublishing, setIsPublishing, setIsDirty]);

  return (
    <div className="h-12 bg-slate-950 border-b border-slate-800 flex items-center px-3 gap-2 flex-shrink-0">
      {/* Back */}
      <button
        onClick={() => router.push(`/sites/${siteId}`)}
        className="text-slate-400 hover:text-white transition-colors p-1 rounded"
        title="Back to dashboard"
      >
        <ArrowLeft size={16} />
      </button>

      <span className="text-slate-300 text-sm font-bold truncate max-w-[130px]">{siteName}</span>
      {isDirty && <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" title="Unsaved changes" />}

      <div className="flex-1" />

      {/* Progress bar — shows client how close they are to done */}
      <div className="hidden md:flex items-center gap-2 mr-2">
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[10px] text-slate-400 leading-none">{completionLabel}</span>
          <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${completionColor}`} style={{ width: `${completion}%` }} />
          </div>
        </div>
        <span className="text-xs font-bold text-slate-400 w-8 text-right">{completion}%</span>
      </div>

      {/* Undo / Redo */}
      <button onClick={undo} disabled={!canUndo} className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-25 transition-colors" title="Undo">
        <Undo2 size={15} />
      </button>
      <button onClick={redo} disabled={!canRedo} className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-25 transition-colors" title="Redo">
        <Redo2 size={15} />
      </button>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      {/* Desktop / Mobile preview toggle */}
      <button onClick={() => setPreviewMode("desktop")} className={`p-1.5 rounded transition-colors ${previewMode === "desktop" ? "text-josett-400 bg-josett-950/50" : "text-slate-500 hover:text-slate-300"}`} title="Desktop view">
        <Monitor size={15} />
      </button>
      <button onClick={() => setPreviewMode("mobile")} className={`p-1.5 rounded transition-colors ${previewMode === "mobile" ? "text-josett-400 bg-josett-950/50" : "text-slate-500 hover:text-slate-300"}`} title="Mobile view">
        <Smartphone size={15} />
      </button>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      {/* Preview site */}
      <a href={`/api/sites/${siteId}/preview`} target="_blank"
        className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-medium px-2.5 py-1.5 rounded border border-slate-700 hover:border-slate-500 transition-all">
        <Eye size={13} /> Preview
      </a>

      {/* Save */}
      <button onClick={handleSave} disabled={isSaving || !isDirty}
        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 disabled:opacity-40 transition-all">
        {isSaving ? <Loader2 size={13} className="animate-spin" /> : isDirty ? <Save size={13} /> : <CheckCircle2 size={13} className="text-green-400" />}
        {isSaving ? "Saving…" : "Save"}
      </button>

      {/* Publish */}
      <button onClick={handlePublish} disabled={isPublishing}
        className="flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded bg-josett-600 hover:bg-josett-500 text-white disabled:opacity-50 transition-all shadow-sm">
        {isPublishing ? <Loader2 size={13} className="animate-spin" /> : <Rocket size={13} />}
        {isPublishing ? "Publishing…" : "Publish 🚀"}
      </button>
    </div>
  );
}
