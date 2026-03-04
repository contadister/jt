"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useBuilderStore } from "@/store/builderStore";
import {
  Undo2, Redo2, Save, Rocket, Eye, Monitor, Tablet, Smartphone,
  ZoomIn, ZoomOut, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen,
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
    previewMode, zoom, historyIndex, history,
    setPreviewMode, setZoom, undo, redo,
    setIsSaving, setIsPublishing, setIsDirty,
  } = useBuilderStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

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
      // Save first, then deploy
      await fetch(`/api/sites/${siteId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ builderJson }),
      });
      await fetch(`/api/sites/${siteId}/deploy`, { method: "POST" });
      setIsDirty(false);
    } catch (e) {
      console.error("Publish failed", e);
    } finally {
      setIsPublishing(false);
    }
  }, [siteId, builderJson, isPublishing, setIsPublishing, setIsDirty]);

  return (
    <div className="h-12 bg-slate-950 border-b border-slate-800 flex items-center px-3 gap-2 flex-shrink-0">
      {/* Back + Site name */}
      <button
        onClick={() => router.push(`/sites/${siteId}`)}
        className="text-slate-400 hover:text-white transition-colors p-1 rounded"
      >
        <ArrowLeft size={16} />
      </button>

      <button onClick={onToggleLeft} className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded">
        {leftCollapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
      </button>

      <span className="text-slate-300 text-sm font-semibold truncate max-w-[140px]">{siteName}</span>
      {isDirty && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" title="Unsaved changes" />}

      <div className="flex-1" />

      {/* Undo / Redo */}
      <button
        onClick={undo}
        disabled={!canUndo}
        className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        title="Undo (Ctrl+Z)"
      >
        <Undo2 size={15} />
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        title="Redo (Ctrl+Y)"
      >
        <Redo2 size={15} />
      </button>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      {/* Preview modes */}
      {(["desktop", "tablet", "mobile"] as const).map((mode) => {
        const Icon = mode === "desktop" ? Monitor : mode === "tablet" ? Tablet : Smartphone;
        return (
          <button
            key={mode}
            onClick={() => setPreviewMode(mode)}
            className={`p-1.5 rounded transition-colors ${
              previewMode === mode
                ? "text-josett-400 bg-josett-950/50"
                : "text-slate-500 hover:text-slate-300"
            }`}
            title={`${mode} preview`}
          >
            <Icon size={15} />
          </button>
        );
      })}

      <div className="w-px h-5 bg-slate-700 mx-1" />

      {/* Zoom */}
      <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="text-slate-500 hover:text-slate-300 p-1 rounded transition-colors">
        <ZoomOut size={14} />
      </button>
      <span className="text-slate-400 text-xs w-9 text-center">{zoom}%</span>
      <button onClick={() => setZoom(Math.min(150, zoom + 10))} className="text-slate-500 hover:text-slate-300 p-1 rounded transition-colors">
        <ZoomIn size={14} />
      </button>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      {/* Preview */}
      <a
        href={`/api/sites/${siteId}/preview`}
        target="_blank"
        className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-medium px-2.5 py-1.5 rounded border border-slate-700 hover:border-slate-500 transition-all"
      >
        <Eye size={13} /> Preview
      </a>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={isSaving || !isDirty}
        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {isSaving ? <Loader2 size={13} className="animate-spin" /> : isDirty ? <Save size={13} /> : <CheckCircle2 size={13} className="text-green-400" />}
        {isSaving ? "Saving..." : "Save"}
      </button>

      {/* Publish */}
      <button
        onClick={handlePublish}
        disabled={isPublishing}
        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded bg-josett-600 hover:bg-josett-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isPublishing ? <Loader2 size={13} className="animate-spin" /> : <Rocket size={13} />}
        {isPublishing ? "Publishing..." : "Publish"}
      </button>

      <button onClick={onToggleRight} className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded ml-1">
        {rightCollapsed ? <PanelRightOpen size={15} /> : <PanelRightClose size={15} />}
      </button>
    </div>
  );
}
