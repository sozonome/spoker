import type { User } from "firebase/auth";

export type AuthStore = {
  currentUser?: User | null;
  displayName: string;
  setCurrentUser: (user?: User | null) => void;
  setDisplayName: (displayName: string) => void;
};
