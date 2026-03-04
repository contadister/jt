// store/builderStore.ts
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type {
  BuilderJSON,
  BuilderPage,
  BuilderSection,
  BuilderElement,
  ElementStyles,
  SectionStyles,
} from "@/lib/types/builder";

const DEFAULT_BUILDER_JSON: BuilderJSON = {
  version: "1.0",
  pages: [
    {
      id: uuidv4(),
      name: "Home",
      slug: "/",
      isHomePage: true,
      sections: [],
      seo: { title: "Home", description: "" },
    },
  ],
  globalStyles: {
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    fontFamily: "Inter",
  },
  siteSettings: {
    siteName: "My Website",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    fontFamily: "Inter",
  },
};

type PreviewMode = "desktop" | "tablet" | "mobile";
type ActivePanel = "elements" | "layers" | "pages" | "styles";

interface BuilderStore {
  // ── State ────────────────────────────────
  builderJson: BuilderJSON;
  selectedElementId: string | null;
  selectedSectionId: string | null;
  selectedPageId: string;
  history: BuilderJSON[];
  historyIndex: number;
  isDirty: boolean;
  isSaving: boolean;
  isPublishing: boolean;
  previewMode: PreviewMode;
  activePanel: ActivePanel;
  hoveredElementId: string | null;
  zoom: number;

  // ── Page Actions ─────────────────────────
  setSelectedPage: (pageId: string) => void;
  addPage: (name: string, slug: string) => void;
  deletePage: (pageId: string) => void;
  updatePage: (pageId: string, updates: Partial<BuilderPage>) => void;
  reorderPages: (fromIndex: number, toIndex: number) => void;
  duplicatePage: (pageId: string) => void;

  // ── Section Actions ───────────────────────
  addSection: (pageId: string, sectionType?: string) => void;
  deleteSection: (sectionId: string) => void;
  updateSection: (sectionId: string, updates: Partial<BuilderSection>) => void;
  updateSectionStyles: (sectionId: string, styles: Partial<SectionStyles>) => void;
  reorderSections: (pageId: string, fromIndex: number, toIndex: number) => void;
  duplicateSection: (sectionId: string) => void;

  // ── Element Actions ───────────────────────
  selectElement: (id: string | null) => void;
  selectSection: (id: string | null) => void;
  addElement: (sectionId: string, element: Omit<BuilderElement, "id">) => string;
  deleteElement: (elementId: string) => void;
  updateElement: (elementId: string, updates: Partial<BuilderElement>) => void;
  updateElementContent: (elementId: string, content: Record<string, unknown>) => void;
  updateElementStyles: (elementId: string, styles: Partial<ElementStyles>) => void;
  updateElementMobileStyles: (elementId: string, styles: Partial<ElementStyles>) => void;
  reorderElements: (sectionId: string, fromIndex: number, toIndex: number) => void;
  moveElementToSection: (elementId: string, fromSectionId: string, toSectionId: string, toIndex: number) => void;
  duplicateElement: (elementId: string) => void;
  toggleElementVisibility: (elementId: string) => void;
  toggleElementLock: (elementId: string) => void;

  // ── Global / Site Actions ─────────────────
  updateGlobalStyles: (styles: Partial<BuilderJSON["globalStyles"]>) => void;
  updateSiteSettings: (settings: Partial<BuilderJSON["siteSettings"]>) => void;
  loadBuilderJson: (json: BuilderJSON) => void;

  // ── History ───────────────────────────────
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;

  // ── UI ───────────────────────────────────
  setPreviewMode: (mode: PreviewMode) => void;
  setActivePanel: (panel: ActivePanel) => void;
  setHoveredElement: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  setIsDirty: (dirty: boolean) => void;
  setIsSaving: (saving: boolean) => void;
  setIsPublishing: (publishing: boolean) => void;

  // ── Helpers ──────────────────────────────
  getCurrentPage: () => BuilderPage | undefined;
  getElementById: (id: string) => BuilderElement | undefined;
  getSectionById: (id: string) => BuilderSection | undefined;
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export const useBuilderStore = create<BuilderStore>()(
  subscribeWithSelector((set, get) => ({
    builderJson: deepClone(DEFAULT_BUILDER_JSON),
    selectedElementId: null,
    selectedSectionId: null,
    selectedPageId: DEFAULT_BUILDER_JSON.pages[0].id,
    history: [deepClone(DEFAULT_BUILDER_JSON)],
    historyIndex: 0,
    isDirty: false,
    isSaving: false,
    isPublishing: false,
    previewMode: "desktop",
    activePanel: "elements",
    hoveredElementId: null,
    zoom: 100,

    // ── Page Actions ─────────────────────────

    setSelectedPage: (pageId) => set({ selectedPageId: pageId, selectedElementId: null }),

    addPage: (name, slug) => {
      const newPage: BuilderPage = {
        id: uuidv4(),
        name,
        slug,
        sections: [],
        seo: { title: name, description: "" },
      };
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: [...state.builderJson.pages, newPage],
        },
        selectedPageId: newPage.id,
        isDirty: true,
      }));
      get().pushHistory();
    },

    deletePage: (pageId) => {
      const { builderJson, selectedPageId } = get();
      if (builderJson.pages.length <= 1) return;
      const newPages = builderJson.pages.filter((p) => p.id !== pageId);
      set({
        builderJson: { ...builderJson, pages: newPages },
        selectedPageId: selectedPageId === pageId ? newPages[0].id : selectedPageId,
        isDirty: true,
      });
      get().pushHistory();
    },

    updatePage: (pageId, updates) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) =>
            p.id === pageId ? { ...p, ...updates } : p
          ),
        },
        isDirty: true,
      }));
    },

    reorderPages: (fromIndex, toIndex) => {
      set((state) => {
        const pages = [...state.builderJson.pages];
        const [moved] = pages.splice(fromIndex, 1);
        pages.splice(toIndex, 0, moved);
        return { builderJson: { ...state.builderJson, pages }, isDirty: true };
      });
    },

    duplicatePage: (pageId) => {
      const { builderJson } = get();
      const page = builderJson.pages.find((p) => p.id === pageId);
      if (!page) return;
      const newPage: BuilderPage = {
        ...deepClone(page),
        id: uuidv4(),
        name: `${page.name} (Copy)`,
        slug: `${page.slug}-copy`,
        isHomePage: false,
      };
      set({
        builderJson: {
          ...builderJson,
          pages: [...builderJson.pages, newPage],
        },
        isDirty: true,
      });
    },

    // ── Section Actions ───────────────────────

    addSection: (pageId, sectionType = "blank") => {
      const newSection: BuilderSection = {
        id: uuidv4(),
        name: sectionType,
        type: sectionType,
        elements: [],
        styles: { backgroundColor: "#ffffff", paddingTop: 64, paddingBottom: 64 },
        isVisible: true,
      };
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) =>
            p.id === pageId
              ? { ...p, sections: [...p.sections, newSection] }
              : p
          ),
        },
        isDirty: true,
      }));
      get().pushHistory();
    },

    deleteSection: (sectionId) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.filter((s) => s.id !== sectionId),
          })),
        },
        selectedSectionId: null,
        selectedElementId: null,
        isDirty: true,
      }));
      get().pushHistory();
    },

    updateSection: (sectionId, updates) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.map((s) =>
              s.id === sectionId ? { ...s, ...updates } : s
            ),
          })),
        },
        isDirty: true,
      }));
    },

    updateSectionStyles: (sectionId, styles) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.map((s) =>
              s.id === sectionId
                ? { ...s, styles: { ...s.styles, ...styles } }
                : s
            ),
          })),
        },
        isDirty: true,
      }));
    },

    reorderSections: (pageId, fromIndex, toIndex) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => {
            if (p.id !== pageId) return p;
            const sections = [...p.sections];
            const [moved] = sections.splice(fromIndex, 1);
            sections.splice(toIndex, 0, moved);
            return { ...p, sections };
          }),
        },
        isDirty: true,
      }));
      get().pushHistory();
    },

    duplicateSection: (sectionId) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => {
            const idx = p.sections.findIndex((s) => s.id === sectionId);
            if (idx === -1) return p;
            const newSection: BuilderSection = {
              ...deepClone(p.sections[idx]),
              id: uuidv4(),
              elements: deepClone(p.sections[idx].elements).map((el: BuilderElement) => ({
                ...el,
                id: uuidv4(),
              })),
            };
            const sections = [...p.sections];
            sections.splice(idx + 1, 0, newSection);
            return { ...p, sections };
          }),
        },
        isDirty: true,
      }));
    },

    // ── Element Actions ───────────────────────

    selectElement: (id) => set({ selectedElementId: id, selectedSectionId: null }),
    selectSection: (id) => set({ selectedSectionId: id, selectedElementId: null }),

    addElement: (sectionId, element) => {
      const id = uuidv4();
      const newElement: BuilderElement = { ...element, id };
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.map((s) =>
              s.id === sectionId
                ? { ...s, elements: [...s.elements, newElement] }
                : s
            ),
          })),
        },
        selectedElementId: id,
        isDirty: true,
      }));
      get().pushHistory();
      return id;
    },

    deleteElement: (elementId) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.map((s) => ({
              ...s,
              elements: s.elements.filter((el) => el.id !== elementId),
            })),
          })),
        },
        selectedElementId: null,
        isDirty: true,
      }));
      get().pushHistory();
    },

    updateElement: (elementId, updates) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.map((s) => ({
              ...s,
              elements: s.elements.map((el) =>
                el.id === elementId ? { ...el, ...updates } : el
              ),
            })),
          })),
        },
        isDirty: true,
      }));
    },

    updateElementContent: (elementId, content) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.map((s) => ({
              ...s,
              elements: s.elements.map((el) =>
                el.id === elementId
                  ? { ...el, content: { ...el.content, ...content } }
                  : el
              ),
            })),
          })),
        },
        isDirty: true,
      }));
    },

    updateElementStyles: (elementId, styles) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.map((s) => ({
              ...s,
              elements: s.elements.map((el) =>
                el.id === elementId
                  ? { ...el, styles: { ...el.styles, ...styles } }
                  : el
              ),
            })),
          })),
        },
        isDirty: true,
      }));
    },

    updateElementMobileStyles: (elementId, styles) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.map((s) => ({
              ...s,
              elements: s.elements.map((el) =>
                el.id === elementId
                  ? { ...el, mobileStyles: { ...el.mobileStyles, ...styles } }
                  : el
              ),
            })),
          })),
        },
        isDirty: true,
      }));
    },

    reorderElements: (sectionId, fromIndex, toIndex) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.map((s) => {
              if (s.id !== sectionId) return s;
              const elements = [...s.elements];
              const [moved] = elements.splice(fromIndex, 1);
              elements.splice(toIndex, 0, moved);
              return { ...s, elements };
            }),
          })),
        },
        isDirty: true,
      }));
    },

    moveElementToSection: (elementId, fromSectionId, toSectionId, toIndex) => {
      set((state) => {
        let movedElement: BuilderElement | undefined;
        const pages = state.builderJson.pages.map((p) => ({
          ...p,
          sections: p.sections.map((s) => {
            if (s.id === fromSectionId) {
              const elements = s.elements.filter((el) => {
                if (el.id === elementId) { movedElement = el; return false; }
                return true;
              });
              return { ...s, elements };
            }
            return s;
          }),
        }));

        if (!movedElement) return state;

        const finalPages = pages.map((p) => ({
          ...p,
          sections: p.sections.map((s) => {
            if (s.id === toSectionId) {
              const elements = [...s.elements];
              elements.splice(toIndex, 0, movedElement!);
              return { ...s, elements };
            }
            return s;
          }),
        }));

        return {
          builderJson: { ...state.builderJson, pages: finalPages },
          isDirty: true,
        };
      });
    },

    duplicateElement: (elementId) => {
      const element = get().getElementById(elementId);
      if (!element) return;

      set((state) => ({
        builderJson: {
          ...state.builderJson,
          pages: state.builderJson.pages.map((p) => ({
            ...p,
            sections: p.sections.map((s) => {
              const idx = s.elements.findIndex((el) => el.id === elementId);
              if (idx === -1) return s;
              const newEl: BuilderElement = { ...deepClone(element), id: uuidv4() };
              const elements = [...s.elements];
              elements.splice(idx + 1, 0, newEl);
              return { ...s, elements };
            }),
          })),
        },
        isDirty: true,
      }));
    },

    toggleElementVisibility: (elementId) => {
      const el = get().getElementById(elementId);
      if (el) get().updateElement(elementId, { isVisible: !el.isVisible });
    },

    toggleElementLock: (elementId) => {
      const el = get().getElementById(elementId);
      if (el) get().updateElement(elementId, { isLocked: !el.isLocked });
    },

    // ── Global Actions ───────────────────────

    updateGlobalStyles: (styles) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          globalStyles: { ...state.builderJson.globalStyles, ...styles },
        },
        isDirty: true,
      }));
    },

    updateSiteSettings: (settings) => {
      set((state) => ({
        builderJson: {
          ...state.builderJson,
          siteSettings: { ...state.builderJson.siteSettings, ...settings },
        },
        isDirty: true,
      }));
    },

    loadBuilderJson: (json) => {
      set({
        builderJson: json,
        selectedPageId: json.pages[0]?.id ?? "",
        selectedElementId: null,
        history: [deepClone(json)],
        historyIndex: 0,
        isDirty: false,
      });
    },

    // ── History ───────────────────────────────

    pushHistory: () => {
      set((state) => {
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(deepClone(state.builderJson));
        return {
          history: newHistory.slice(-50), // keep last 50
          historyIndex: Math.min(newHistory.length - 1, 49),
        };
      });
    },

    undo: () => {
      const { historyIndex, history } = get();
      if (historyIndex <= 0) return;
      const newIndex = historyIndex - 1;
      const json = deepClone(history[newIndex]);
      set({ builderJson: json, historyIndex: newIndex, isDirty: true });
    },

    redo: () => {
      const { historyIndex, history } = get();
      if (historyIndex >= history.length - 1) return;
      const newIndex = historyIndex + 1;
      const json = deepClone(history[newIndex]);
      set({ builderJson: json, historyIndex: newIndex, isDirty: true });
    },

    // ── UI ───────────────────────────────────

    setPreviewMode: (mode) => set({ previewMode: mode }),
    setActivePanel: (panel) => set({ activePanel: panel }),
    setHoveredElement: (id) => set({ hoveredElementId: id }),
    setZoom: (zoom) => set({ zoom }),
    setIsDirty: (dirty) => set({ isDirty: dirty }),
    setIsSaving: (saving) => set({ isSaving: saving }),
    setIsPublishing: (publishing) => set({ isPublishing: publishing }),

    // ── Helpers ──────────────────────────────

    getCurrentPage: () => {
      const { builderJson, selectedPageId } = get();
      return builderJson.pages.find((p) => p.id === selectedPageId);
    },

    getElementById: (id) => {
      const { builderJson } = get();
      for (const page of builderJson.pages) {
        for (const section of page.sections) {
          const el = section.elements.find((e) => e.id === id);
          if (el) return el;
        }
      }
      return undefined;
    },

    getSectionById: (id) => {
      const { builderJson } = get();
      for (const page of builderJson.pages) {
        const section = page.sections.find((s) => s.id === id);
        if (section) return section;
      }
      return undefined;
    },
  }))
);
