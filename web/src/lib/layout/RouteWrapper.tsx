import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";

import { PUBLIC_ROUTES } from "lib/constants/routes/public";
import { useAuth } from "lib/stores/auth";

import FullScreenLoading from "./FullScreenLoading";
import { useAuthObserver } from "./useAuthObserver";

type RouteWrapperProps = {
  children: React.ReactNode;
};

const RouteWrapper = ({ children }: RouteWrapperProps) => {
  const router = useRouter();
  const { pathname } = router;
  const { isLoadingAuth } = useAuthObserver();

  const currentUser = useAuth((state) => state.currentUser);
  const [busy, setBusy] = React.useState<boolean>(false);

  const toast = useToast();

  const isPublicRoute = React.useMemo(
    () => PUBLIC_ROUTES.includes(pathname),
    [pathname]
  );

  const isNotVerified = React.useMemo(
    () =>
      currentUser &&
      !currentUser.emailVerified &&
      pathname !== "/" &&
      !isPublicRoute,
    [currentUser, isPublicRoute, pathname]
  );

  const routeCheck = React.useCallback(() => {
    if (isNotVerified) {
      setBusy(true);

      currentUser?.reload().then(() => {
        if (!currentUser.emailVerified) {
          router.push("/").then(() => {
            toast({
              title: "Your email is not verified yet.",
              description: `Check your email (${currentUser.email}) for verification link.`,
              position: "top",
              status: "warning",
              isClosable: true,
            });
          });
        }
      });
    }

    setBusy(false);
  }, [currentUser, isNotVerified, router, toast]);

  React.useEffect(() => {
    routeCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentUser]);

  if (busy || isLoadingAuth) {
    return <FullScreenLoading />;
  }

  return children as React.ReactElement;
};

export default RouteWrapper;
