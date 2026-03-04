"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { useBuilderStore } from "@/store/builderStore";
import { ElementRenderer } from "./ElementRenderer";
import { BuilderSection } from "@/lib/types/builder";
import { GripVertical, Trash2, Copy, Plus, Eye, EyeOff } from "lucide-react";

export function SortableSection({ section }: { section: BuilderSection }) {
  const {
    selectedSectionId, selectedElementId,
    selectSection, deleteSection, duplicateSection, addSection,
    updateSection, builderJson, selectedPageId,
  } = useBuilderStore();

  const { attributes, listeners, setNodeRef: setSortRef, transform, transition, isDragging } = useSortable({
    id: `sortable-section-${section.id}`,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: `section-${section.id}` });

  const isSelected = selectedSectionId === section.id && !selectedElementId;
  const page = builderJson.pages.find((p) => p.id === selectedPageId);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={(el) => { setSortRef(el); setDropRef(el); }}
      style={style}
      className={`relative group ${isSelected ? "ring-2 ring-josett-500 ring-inset" : ""} ${isOver ? "ring-2 ring-blue-400 ring-inset" : ""}`}
      onClick={(e) => { e.stopPropagation(); selectSection(section.id); }}
    >
      {/* Section toolbar (shows on hover/select) */}
      <div className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-2 py-1 bg-josett-600 text-white text-xs transition-all ${
        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}>
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-0.5">
            <GripVertical size={12} />
          </div>
          <span className="font-medium">{section.name || section.type || "Section"}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); updateSection(section.id, { isVisible: !section.isVisible }); }} className="hover:bg-josett-500 p-1 rounded">
            {section.isVisible === false ? <Eye size={11} /> : <EyeOff size={11} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); duplicateSection(section.id); }} className="hover:bg-josett-500 p-1 rounded">
            <Copy size={11} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); if (page) addSection(page.id); }} className="hover:bg-josett-500 p-1 rounded">
            <Plus size={11} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }} className="hover:bg-red-500 p-1 rounded">
            <Trash2 size={11} />
          </button>
        </div>
      </div>

      {/* Section content */}
      <div
        className="min-h-[80px] px-4 py-6"
        style={{
          backgroundColor: section.styles?.backgroundColor || "transparent",
          paddingTop: section.styles?.paddingTop ? `${section.styles.paddingTop}px` : undefined,
          paddingBottom: section.styles?.paddingBottom ? `${section.styles.paddingBottom}px` : undefined,
        }}
      >
        {section.elements.length === 0 ? (
          <div className={`min-h-[60px] flex items-center justify-center border-2 border-dashed rounded-xl transition-colors ${
            isOver ? "border-josett-400 bg-josett-50" : "border-slate-200 text-slate-400"
          }`}>
            <p className="text-xs">Drop elements here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {section.elements.map((el) => (
              el.isVisible !== false && (
                <ElementRenderer key={el.id} element={el} sectionId={section.id} />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
