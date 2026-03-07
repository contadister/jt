"use client";

import { useState, useEffect, useCallback } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { BuilderTopBar } from "./TopBar";
import { LeftPanel } from "./panels/LeftPanel";
import { BuilderCanvas } from "./canvas/Canvas";
import { Inspector } from "./inspector/Inspector";
import { Keyboard, X } from "lucide-react";

interface BuilderShellProps {
  siteId: string;
  siteName: string;
}

const SHORTCUTS = [
  { keys: ["⌘", "Z"], label: "Undo" },
  { keys: ["⌘", "⇧", "Z"], label: "Redo" },
  { keys: ["⌘", "S"], label: "Save" },
  { keys: ["⌘", "D"], label: "Duplicate element" },
  { keys: ["Del"], label: "Delete selected element" },
  { keys: ["Esc"], label: "Deselect / close panel" },
  { keys: ["?"], label: "Show shortcuts" },
];

export function BuilderShell({ siteId, siteName }: BuilderShellProps) {
  const { previewMode, undo, redo, deleteElement, duplicateElement, selectedElementId } = useBuilderStore();
  const builderJson = useBuilderStore((s) => s.builderJson);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const saveNow = useCallback(async () => {
    try {
      await fetch(`/api/sites/${siteId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ builderJson }),
      });
    } catch { /* silent */ }
  }, [siteId, builderJson]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      const tag = (e.target as HTMLElement)?.tagName;
      const inInput = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable;

      if (mod && e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); return; }
      if (mod && e.key === "z" && e.shiftKey) { e.preventDefault(); redo(); return; }
      if (mod && e.key === "y") { e.preventDefault(); redo(); return; }
      if (mod && e.key === "s") { e.preventDefault(); saveNow(); return; }
      if (e.key === "?" && !inInput) { setShowShortcuts((s) => !s); return; }
      if (e.key === "Escape") { setShowShortcuts(false); return; }
      if ((e.key === "Delete" || e.key === "Backspace") && !inInput && selectedElementId) { e.preventDefault(); deleteElement(selectedElementId); return; }
      if (mod && e.key === "d" && selectedElementId) { e.preventDefault(); duplicateElement(selectedElementId); return; }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [undo, redo, saveNow, siteId, deleteElement, duplicateElement, selectedElementId]);

  const canvasWidth = previewMode === "mobile" ? "390px"
    : previewMode === "tablet" ? "768px"
    : "100%";

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
      <BuilderTopBar
        siteId={siteId}
        siteName={siteName}
        leftCollapsed={leftCollapsed}
        rightCollapsed={rightCollapsed}
        onToggleLeft={() => setLeftCollapsed(!leftCollapsed)}
        onToggleRight={() => setRightCollapsed(!rightCollapsed)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div
          className={`flex-shrink-0 bg-slate-900 border-r border-slate-800 transition-all duration-200 overflow-hidden ${
            leftCollapsed ? "w-0" : "w-64"
          }`}
        >
          <LeftPanel />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto bg-slate-800 flex items-start justify-center p-6">
          <div
            className="bg-white shadow-2xl transition-all duration-300 min-h-full"
            style={{ width: canvasWidth, minHeight: "100vh" }}
          >
            <BuilderCanvas />
          </div>
        </div>

        {/* Right Panel - Inspector */}
        <div
          className={`flex-shrink-0 bg-slate-900 border-l border-slate-800 transition-all duration-200 overflow-hidden ${
            rightCollapsed ? "w-0" : "w-72"
          }`}
        >
          <Inspector />
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <button
        onClick={() => setShowShortcuts(true)}
        className="absolute bottom-4 right-4 w-8 h-8 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full flex items-center justify-center transition-colors z-20"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard size={14} />
      </button>

      {/* Shortcuts modal */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowShortcuts(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-white text-lg flex items-center gap-2"><Keyboard size={18} /> Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {SHORTCUTS.map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">{s.label}</span>
                  <div className="flex items-center gap-1">
                    {s.keys.map((k) => (
                      <kbd key={k} className="px-2 py-1 text-xs font-bold bg-slate-800 text-slate-300 rounded border border-slate-700">{k}</kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
