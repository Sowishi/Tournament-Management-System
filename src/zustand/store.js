import { create } from "zustand";

const useStore = create((set) => ({
  currentEvent: undefined,
  currentUser: undefined,
  currentAdmin: undefined,
  guest: null,
  setGuest: (data) => set((state) => ({ guest: data })),
  setCurrentEvent: (event) => set((state) => ({ currentEvent: event })),
  setCurrentUser: (user) => set((state) => ({ currentUser: user })),
  setCurrentAdmin: (user) => set((state) => ({ currentAdmin: user })),
}));

export { useStore };
