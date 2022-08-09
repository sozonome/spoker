import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import * as React from "react";
import shallow from "zustand/shallow";

import { PUBLIC_ROUTES } from "lib/constants/routes/public";
import { auth } from "lib/services/firebase/auth/common";
import { useAuth } from "lib/stores/auth";

export const useAuthObserver = () => {
  const [setCurrentUser, setDisplayName] = useAuth(
    (state) => [state.setCurrentUser, state.setDisplayName],
    shallow
  );
  const { pathname } = useRouter();
  const [busy, setBusy] = React.useState<boolean>(true);
  const isPublicRoute = React.useMemo(
    () => PUBLIC_ROUTES.includes(pathname),
    [pathname]
  );
  const isLoadingAuth = busy && !isPublicRoute;

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setDisplayName(user?.displayName ?? "");
      setBusy(false);
    });
  });

  return { isLoadingAuth };
};
