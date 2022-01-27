import type { User } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from "react";

import FullScreenLoading from "lib/components/layout/FullScreenLoading";
import { fbase } from "lib/services/firebase";

type AuthContextType = {
  currentUser?: User | null;
  isCurrentUserUpdating?: boolean;
  updateCurrentUser: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  currentUser: undefined,
  isCurrentUserUpdating: undefined,
  updateCurrentUser: () => 0,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

const auth = getAuth(fbase);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUserState, setCurrentUserState] = React.useState<User | null>(
    null
  );
  const [busy, setBusy] = React.useState(true);
  const [isCurrentUserUpdating, setIsCurrentUserUpdating] =
    React.useState<boolean>(false);

  const updateCurrentUser = () => {
    setIsCurrentUserUpdating(true);
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUserState(user);
      setBusy(false);
    });
  }, []);

  React.useEffect(() => {
    if (isCurrentUserUpdating) {
      setIsCurrentUserUpdating(false);
    }
  }, [isCurrentUserUpdating]);

  const contextValues = React.useMemo(
    () =>
      ({
        currentUser: currentUserState,
        isCurrentUserUpdating,
        updateCurrentUser,
      } as AuthContextType),
    [currentUserState, isCurrentUserUpdating]
  );

  if (busy) {
    return <FullScreenLoading />;
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
