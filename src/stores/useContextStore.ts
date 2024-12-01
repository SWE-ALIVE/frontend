import { Context } from "@/service/message.service";
import { create } from "zustand";

interface ContextState {
  contexts: Context[];
  setContexts: (contexts: Context[]) => void;
  addContext: (context: Context) => void;
  updateContext: (index: number, context: Context) => void;
  removeContext: (index: number) => void;
  clearContexts: () => void;
}

export const useContextStore = create<ContextState>((set) => ({
  contexts: [],
  setContexts: (contexts) => set({ contexts }),
  addContext: (context) =>
    set((state) => ({ contexts: [...state.contexts, context] })),
  updateContext: (index, context) =>
    set((state) => ({
      contexts: state.contexts.map((ctx, i) => (i === index ? context : ctx)),
    })),
  removeContext: (index) =>
    set((state) => ({
      contexts: state.contexts.filter((_, i) => i !== index),
    })),
  clearContexts: () => set({ contexts: [] }),
}));
