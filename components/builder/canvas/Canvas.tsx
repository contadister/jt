"use client";

import { useCallback } from "react";
import {
  DndContext, DragEndEvent, DragOverlay, useSensor, useSensors,
  PointerSensor, KeyboardSensor,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useBuilderStore } from "@/store/builderStore";
import type { BuilderPage } from "@/types/site";
import { SortableSection } from "./SortableSection";
import { Plus } from "lucide-react";

export function BuilderCanvas() {
  const {
    builderJson, selectedPageId,
    addSection, reorderSections, addElement, moveElementToSection,
  } = useBuilderStore();

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
        // No sections yet — create one first
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
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="min-h-screen" style={{ fontFamily: builderJson.globalStyles?.fontFamily || "Inter" }}>
        {page.sections.length === 0 ? (
          <EmptyCanvas pageId={page.id} />
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
          <div className="flex justify-center py-6">
            <button
              onClick={() => addSection(page.id)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-josett-400 px-4 py-2 border border-dashed border-slate-300 hover:border-josett-400 rounded-xl transition-all"
            >
              <Plus size={14} /> Add Section
            </button>
          </div>
        )}
      </div>
      <DragOverlay />
    </DndContext>
  );
}

function EmptyCanvas({ pageId }: { pageId: string }) {
  const { addSection } = useBuilderStore();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-12">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plus size={24} className="text-slate-400" />
        </div>
        <p className="text-slate-600 font-semibold mb-2">Start building your page</p>
        <p className="text-slate-400 text-sm mb-6">Drag elements from the left panel, or click below to add a section</p>
        <button
          onClick={() => addSection(pageId)}
          className="bg-josett-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-josett-500 transition-colors"
        >
          Add First Section
        </button>
      </div>
    </div>
  );
}
