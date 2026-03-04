"use client";

import { useBuilderStore } from "@/store/builderStore";
import { Eye, EyeOff, Lock, Unlock, Trash2, ChevronRight, ChevronDown, GripVertical } from "lucide-react";
import { useState } from "react";

export function LayersPanel() {
  const {
    builderJson, selectedPageId, selectedElementId, selectedSectionId,
    selectElement, selectSection, deleteElement, deleteSection,
    toggleElementVisibility, toggleElementLock, updateSection,
  } = useBuilderStore();
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const page = builderJson.pages.find((p) => p.id === selectedPageId);
  if (!page) return <div className="p-4 text-slate-500 text-sm">No page selected</div>;

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="p-2">
      {page.sections.length === 0 && (
        <p className="text-slate-500 text-xs p-3 text-center">No sections yet. Drag elements onto the canvas.</p>
      )}
      {[...page.sections].reverse().map((section) => {
        const isCollapsed = collapsedSections.has(section.id);
        const isSelectedSection = selectedSectionId === section.id;

        return (
          <div key={section.id} className="mb-1">
            {/* Section row */}
            <div
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg cursor-pointer group transition-colors ${
                isSelectedSection ? "bg-josett-950/60 text-josett-300" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
              onClick={() => selectSection(section.id)}
            >
              <GripVertical size={12} className="text-slate-600 flex-shrink-0" />
              <button
                onClick={(e) => { e.stopPropagation(); toggleSection(section.id); }}
                className="text-slate-500 hover:text-slate-300 flex-shrink-0"
              >
                {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
              </button>
              <span className="flex-1 text-xs truncate font-medium">
                {section.name || section.type || "Section"}
              </span>
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); updateSection(section.id, { isVisible: !section.isVisible }); }}
                  className="text-slate-500 hover:text-slate-300 p-0.5"
                >
                  {section.isVisible === false ? <EyeOff size={11} /> : <Eye size={11} />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }}
                  className="text-slate-500 hover:text-red-400 p-0.5"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>

            {/* Elements */}
            {!isCollapsed && section.elements.map((el) => {
              const isSelectedEl = selectedElementId === el.id;
              return (
                <div
                  key={el.id}
                  className={`flex items-center gap-1 pl-7 pr-2 py-1 rounded cursor-pointer group transition-colors ${
                    isSelectedEl ? "bg-josett-950/40 text-josett-400" : "text-slate-500 hover:bg-slate-800/60 hover:text-slate-300"
                  }`}
                  onClick={() => selectElement(el.id)}
                >
                  <span className="flex-1 text-xs truncate">
                    {(el.content as Record<string, unknown>)?.text as string || el.type}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleElementVisibility(el.id); }}
                      className="text-slate-600 hover:text-slate-300 p-0.5"
                    >
                      {el.isVisible === false ? <EyeOff size={10} /> : <Eye size={10} />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleElementLock(el.id); }}
                      className="text-slate-600 hover:text-slate-300 p-0.5"
                    >
                      {el.isLocked ? <Lock size={10} /> : <Unlock size={10} />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteElement(el.id); }}
                      className="text-slate-600 hover:text-red-400 p-0.5"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
