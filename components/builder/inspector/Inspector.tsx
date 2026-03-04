"use client";

import { useBuilderStore } from "@/store/builderStore";
import { ContentEditor } from "./ContentEditor";
import { StyleControls } from "./StyleControls";
import { SectionStyleControls } from "./SectionStyleControls";
import { Settings2, Type, Paintbrush } from "lucide-react";
import { useState } from "react";

export function Inspector() {
  const { selectedElementId, selectedSectionId, getElementById, getSectionById } = useBuilderStore();
  const [tab, setTab] = useState<"content" | "style">("content");

  const element = selectedElementId ? getElementById(selectedElementId) : null;
  const section = !selectedElementId && selectedSectionId ? getSectionById(selectedSectionId) : null;

  if (!element && !section) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <Settings2 size={32} className="text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 text-xs">Select an element or section to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800">
        <p className="text-slate-300 text-xs font-semibold capitalize">
          {element ? element.type : section?.name || "Section"}
        </p>
      </div>

      {/* Tabs (only for elements) */}
      {element && (
        <div className="flex border-b border-slate-800">
          <button
            onClick={() => setTab("content")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
              tab === "content" ? "text-josett-400 border-b-2 border-josett-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Type size={12} /> Content
          </button>
          <button
            onClick={() => setTab("style")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
              tab === "style" ? "text-josett-400 border-b-2 border-josett-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Paintbrush size={12} /> Style
          </button>
        </div>
      )}

      {/* Panel body */}
      <div className="flex-1 overflow-y-auto p-4">
        {element && tab === "content" && <ContentEditor element={element} />}
        {element && tab === "style" && <StyleControls element={element} />}
        {section && <SectionStyleControls section={section} />}
      </div>
    </div>
  );
}
