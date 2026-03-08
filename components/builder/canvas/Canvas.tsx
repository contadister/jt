"use client";

import { useCallback, useState } from "react";
import {
  DndContext, DragEndEvent, DragOverlay, useSensor, useSensors,
  PointerSensor, KeyboardSensor,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useBuilderStore } from "@/store/builderStore";
import type { BuilderPage } from "@/lib/types/builder";
import { SortableSection } from "./SortableSection";
import { SectionPicker } from "../SectionPicker";
import { Plus, Sparkles } from "lucide-react";

export function BuilderCanvas() {
  const {
    builderJson, selectedPageId,
    addSection, reorderSections, addElement,
  } = useBuilderStore();

  const [showPicker, setShowPicker] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const page = builderJson.pages.find((p: BuilderPage) => p.id === selectedPageId);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !page) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // New element dropped from panel
    if (activeId.startsWith("new-element-")) {
      const targetSectionId = overId.startsWith("section-") ? overId.replace("section-", "") : page.sections[0]?.id;
      if (!targetSectionId) {
        addSection(page.id, "container");
        return;
      }
      const data = active.data.current as { elementType: string; defaultContent: Record<string, unknown> };
      addElement(targetSectionId, {
        type: data.elementType as never,
        content: data.defaultContent,
        styles: {},
        isVisible: true,
      });
      return;
    }

    // Reorder sections
    if (activeId.startsWith("sortable-section-") && overId.startsWith("sortable-section-")) {
      const fromId = activeId.replace("sortable-section-", "");
      const toId = overId.replace("sortable-section-", "");
      const fromIdx = page.sections.findIndex((s) => s.id === fromId);
      const toIdx = page.sections.findIndex((s) => s.id === toId);
      if (fromIdx !== -1 && toIdx !== -1) {
        reorderSections(page.id, fromIdx, toIdx);
      }
    }
  }, [page, addSection, addElement, reorderSections]);

  if (!page) return null;

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="min-h-screen" style={{ fontFamily: builderJson.globalStyles?.fontFamily || "Inter" }}>
          {page.sections.length === 0 ? (
            <EmptyCanvas pageId={page.id} onOpenPicker={() => setShowPicker(true)} />
          ) : (
            <SortableContext
              items={page.sections.map((s) => `sortable-section-${s.id}`)}
              strategy={verticalListSortingStrategy}
            >
              {page.sections.map((section) => (
                section.isVisible !== false && (
                  <SortableSection key={section.id} section={section} />
                )
              ))}
            </SortableContext>
          )}

          {/* Add section button */}
          {page.sections.length > 0 && (
            <div className="flex justify-center py-8">
              <button
                onClick={() => setShowPicker(true)}
                className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 px-5 py-3 border-2 border-dashed border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-2xl transition-all group"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
                Add Section
              </button>
            </div>
          )}
        </div>
        <DragOverlay />
      </DndContext>

      {showPicker && page && (
        <SectionPicker pageId={page.id} onClose={() => setShowPicker(false)} />
      )}
    </>
  );
}

function EmptyCanvas({ pageId, onOpenPicker }: { pageId: string; onOpenPicker: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-12 max-w-md">
        {/* Animated icon */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center">
            <Sparkles size={32} className="text-indigo-500" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
            <Plus size={12} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-800 mb-2">Your page is empty</h3>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Add pre-built sections with one click — no drag & drop needed.
          Just pick a section and start editing.
        </p>

        {/* Quick-start section buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-left">
          {[
            { emoji: "🏔️", label: "Hero Banner", desc: "Eye-catching intro" },
            { emoji: "⚡", label: "Features", desc: "What you offer" },
            { emoji: "⭐", label: "Testimonials", desc: "Customer reviews" },
            { emoji: "📩", label: "Contact Form", desc: "Let people reach you" },
          ].map((s) => (
            <button
              key={s.label}
              onClick={onOpenPicker}
              className="flex items-start gap-2.5 p-3 bg-white border-2 border-slate-100 hover:border-indigo-400 hover:bg-indigo-50 rounded-2xl transition-all text-left group"
            >
              <span className="text-2xl flex-shrink-0">{s.emoji}</span>
              <div>
                <div className="font-bold text-slate-800 text-sm group-hover:text-indigo-700">{s.label}</div>
                <div className="text-xs text-slate-400">{s.desc}</div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onOpenPicker}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-indigo-500/30"
        >
          <Plus size={18} />
          Browse All Sections
        </button>

        <p className="text-xs text-slate-400 mt-4">Or drag elements from the left panel ↙</p>
      </div>
    </div>
  );
}
