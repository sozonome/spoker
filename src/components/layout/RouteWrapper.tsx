import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";

import { AuthContext } from "components/auth/AuthProvider";
import FullScreenLoading from "./FullScreenLoading";

export const PUBLIC_ROUTES = ["/auth", "/intro", "/privacypolicy"];
export const PRIVATE_ROUTES = ["/room/[id]", "/join/[id]", "/"];

type RouteWrapperProps = {
  children: ReactNode;
};

const RouteWrapper = ({ children }: RouteWrapperProps) => {
  const router = useRouter();
  const { pathname } = router;

  const { currentUser } = useContext(AuthContext);
  const [busy, setBusy] = useState<boolean>(true);

  const toast = useToast();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const routeCheck = () => {
    if (currentUser) {
      if (!currentUser.emailVerified && pathname !== "/" && !isPublicRoute) {
        setBusy(true);

        currentUser.reload().then(() => {
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
    }

    setBusy(false);
  };

  useEffect(() => {
    routeCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentUser]);

  return <>{busy ? <FullScreenLoading /> : children}</>;
};

export default RouteWrapper;
