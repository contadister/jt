"use client";

import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { Plus, Trash2, Copy, Home } from "lucide-react";

export function PagesPanel() {
  const {
    builderJson, selectedPageId, setSelectedPage,
    addPage, deletePage, duplicatePage,
  } = useBuilderStore();
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (!newName.trim()) return;
    const slug = "/" + newName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    addPage(newName.trim(), slug);
    setNewName("");
    setAdding(false);
  };

  return (
    <div className="p-3">
      <div className="space-y-1">
        {builderJson.pages.map((page) => (
          <div
            key={page.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer group transition-colors ${
              selectedPageId === page.id
                ? "bg-josett-950/60 text-josett-300"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
            onClick={() => setSelectedPage(page.id)}
          >
            {page.isHomePage && <Home size={11} className="text-josett-500 flex-shrink-0" />}
            <span className="flex-1 text-xs font-medium truncate">{page.name}</span>
            <span className="text-[10px] text-slate-600 truncate max-w-[60px]">{page.slug}</span>
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); duplicatePage(page.id); }}
                className="text-slate-500 hover:text-slate-300 p-0.5"
              >
                <Copy size={11} />
              </button>
              {!page.isHomePage && (
                <button
                  onClick={(e) => { e.stopPropagation(); deletePage(page.id); }}
                  className="text-slate-500 hover:text-red-400 p-0.5"
                >
                  <Trash2 size={11} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {adding ? (
        <div className="mt-3">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" ? handleAdd() : e.key === "Escape" && setAdding(false)}
            placeholder="Page name"
            className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:border-josett-500 focus:outline-none"
          />
          <div className="flex gap-2 mt-2">
            <button onClick={handleAdd} className="flex-1 bg-josett-600 text-white text-xs py-1.5 rounded-lg font-semibold hover:bg-josett-500 transition-colors">
              Add
            </button>
            <button onClick={() => setAdding(false)} className="flex-1 border border-slate-700 text-slate-400 text-xs py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-3 w-full flex items-center justify-center gap-2 text-xs text-slate-500 hover:text-josett-400 py-2 border border-dashed border-slate-700 hover:border-josett-700 rounded-lg transition-all"
        >
          <Plus size={12} /> Add Page
        </button>
      )}
    </div>
  );
}
