import { createContext, useEffect, useState } from "react";

import FullScreenLoading from "components/layout/FullScreenLoading";

import { fbase } from "functions/firebase";

type AuthContextType = {
  currentUser?: firebase.default.User;
  isCurrentUserUpdating?: boolean;
  updateCurrentUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
  isCurrentUserUpdating: undefined,
  updateCurrentUser: () => {},
});

type AuthProviderProps = {
  children: any;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUserState, setCurrentUserState] = useState<any>(null);
  const [busy, setBusy] = useState(true);
  const [isCurrentUserUpdating, setIsCurrentUserUpdating] =
    useState<boolean>(false);

  const updateCurrentUser = () => {
    setIsCurrentUserUpdating(true);
  };

  useEffect(() => {
    fbase.auth().onAuthStateChanged((user: any) => {
      setCurrentUserState(user);
      setBusy(false);
    });
  }, []);

  useEffect(() => {
    if (isCurrentUserUpdating) {
      setIsCurrentUserUpdating(false);
    }
  }, [isCurrentUserUpdating]);

  return (
    <>
      {busy ? (
        <FullScreenLoading />
      ) : (
        <AuthContext.Provider
          value={{
            currentUser: currentUserState,
            isCurrentUserUpdating,
            updateCurrentUser,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
