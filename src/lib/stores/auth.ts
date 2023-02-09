import type { User } from 'firebase/auth';
import create from 'zustand';

type AuthStore = {
  currentUser?: User | null;
  displayName: string;
  setCurrentUser: (user?: User | null) => void;
  setDisplayName: (displayName: string) => void;
};

export const useAuth = create<AuthStore>((set) => ({
  displayName: '',
  setCurrentUser: (user) => set({ currentUser: user }),
  setDisplayName: (displayName) => set({ displayName }),
}));
