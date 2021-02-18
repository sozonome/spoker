import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";

import { AuthContext } from "components/auth/AuthProvider";
import FullScreenLoading from "./FullScreenLoading";

export const PUBLIC_ROUTES = ["/auth", "/intro", "/privacypolicy"];

type RouteWrapperProps = {
  children: ReactNode;
};

const RouteWrapper = ({ children }: RouteWrapperProps) => {
  const router = useRouter();
  const { pathname } = router;

  const { currentUser } = useContext(AuthContext);
  const [busy, setBusy] = useState<boolean>(true);

  const toast = useToast();

  const isPublicRoute = PUBLIC_ROUTES.indexOf(pathname) >= 0;

  const routeCheck = () => {
    if (currentUser !== null) {
      if (!currentUser.emailVerified && pathname !== "/" && !isPublicRoute) {
        setBusy(true);

        currentUser.reload().then(() => {
          if (!currentUser.emailVerified) {
            router.push("/").then(() => {
              setBusy(false);
              toast({
                title: "Your email is not verified yet.",
                description: `Check your email (${currentUser.email}) for verification link.`,
                position: "top",
                status: "warning",
                isClosable: true,
              });
            });
          } else {
            setBusy(false);
          }
        });
      } else {
        setBusy(false);
      }
    } else {
      setBusy(false);
    }
  };

  useEffect(() => {
    routeCheck();
  }, [pathname, currentUser]);

  return <>{busy ? <FullScreenLoading /> : children}</>;
};

export default RouteWrapper;
