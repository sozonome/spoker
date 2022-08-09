import create from "zustand";

import type { AuthStore } from "./types";

export const useAuth = create<AuthStore>((set) => ({
  displayName: "",
  setCurrentUser: (user) => set({ currentUser: user }),
  setDisplayName: (displayName) => set({ displayName }),
}));
