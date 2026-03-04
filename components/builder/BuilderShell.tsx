"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { BuilderTopBar } from "./TopBar";
import { LeftPanel } from "./panels/LeftPanel";
import { BuilderCanvas } from "./canvas/Canvas";
import { Inspector } from "./inspector/Inspector";

interface BuilderShellProps {
  siteId: string;
  siteName: string;
}

export function BuilderShell({ siteId, siteName }: BuilderShellProps) {
  const { previewMode } = useBuilderStore();
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

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
    </div>
  );
}
