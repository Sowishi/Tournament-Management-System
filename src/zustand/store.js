import { create } from "zustand";

const useStore = create((set) => ({
  currentEvent: undefined,
  setCurrentEvent: (event) => set((state) => ({ currentEvent: event })),
}));

export { useStore };
