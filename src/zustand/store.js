import { create } from "zustand";

const useStore = create((set) => ({
  currentEvent: undefined,
  currentUser: undefined,
  guest: null,
  setGuest: (data) => set((state) => ({ guest: data })),
  setCurrentEvent: (event) => set((state) => ({ currentEvent: event })),
  setCurrentUser: (user) => set((state) => ({ currentUser: user })),
}));

export { useStore };
