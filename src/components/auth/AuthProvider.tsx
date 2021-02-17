import { createContext, useEffect, useState } from "react";

import FullScreenLoading from "components/layout/FullScreenLoading";

import { fbase } from "functions/firebase";

type AuthContextType = {
  currentUser: firebase.default.User;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

type AuthProviderProps = {
  children: any;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUserState, setCurrentUserState] = useState<any>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    fbase.auth().onAuthStateChanged((user: any) => {
      setCurrentUserState(user);
      setBusy(false);
    });
  }, []);

  return (
    <>
      {busy ? (
        <FullScreenLoading />
      ) : (
        <AuthContext.Provider value={{ currentUser: currentUserState }}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
