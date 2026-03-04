"use client";

import { useBuilderStore } from "@/store/builderStore";
import { ElementsPanel } from "./ElementsPanel";
import { LayersPanel } from "./LayersPanel";
import { PagesPanel } from "./PagesPanel";
import { GlobalStylesPanel } from "./GlobalStylesPanel";
import { Layers, Layout, FileText, Palette } from "lucide-react";

const TABS = [
  { id: "elements", label: "Elements", icon: Layout },
  { id: "layers", label: "Layers", icon: Layers },
  { id: "pages", label: "Pages", icon: FileText },
  { id: "styles", label: "Styles", icon: Palette },
] as const;

export function LeftPanel() {
  const { activePanel, setActivePanel } = useBuilderStore();

  return (
    <div className="h-full flex flex-col">
      {/* Tab bar */}
      <div className="flex border-b border-slate-800">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActivePanel(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
              activePanel === id
                ? "text-josett-400 border-b-2 border-josett-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Icon size={14} />
            <span className="text-[10px]">{label}</span>
          </button>
        ))}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto">
        {activePanel === "elements" && <ElementsPanel />}
        {activePanel === "layers" && <LayersPanel />}
        {activePanel === "pages" && <PagesPanel />}
        {activePanel === "styles" && <GlobalStylesPanel />}
      </div>
    </div>
  );
}
