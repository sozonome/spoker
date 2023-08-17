import type { User } from 'firebase/auth';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

type AuthStore = {
  currentUser?: User | null;
  displayName: string;
  setCurrentUser: (user?: User | null) => void;
  setDisplayName: (displayName: string) => void;
};

export const useAuth = createWithEqualityFn<AuthStore>(
  (set) => ({
    displayName: '',
    setCurrentUser: (user) => set({ currentUser: user }),
    setDisplayName: (displayName) => set({ displayName }),
  }),
  shallow
);
