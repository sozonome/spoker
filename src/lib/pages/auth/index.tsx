/**
 * @todo
 * [ ] handle mode "resetPassword"
 * [ ] handle mode "recoverEmail"
 */

import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";

import { AuthContext } from "lib/components/auth/AuthProvider";
import FullScreenLoading from "lib/layout/FullScreenLoading";
import { handleVerifyEmail } from "lib/services/firebase";

const Auth = () => {
  const router = useRouter();
  const { mode, oobCode } = router.query;

  const { currentUser } = React.useContext(AuthContext);

  const toast = useToast();

  const handleInvalidLink = React.useCallback(() => {
    router.push("/").then(() => {
      toast({
        description: "Invalid Link",
        status: "warning",
        position: "top",
        isClosable: true,
      });
    });
  }, [router, toast]);

  const handleAuthCallback = React.useCallback(() => {
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (mode) {
      case "verifyEmail":
        handleVerifyEmail(oobCode as string)
          .then(() => {
            toast({
              title: "Email Verification Success",
              status: "success",
              position: "top",
              isClosable: true,
            });
            if (currentUser) {
              currentUser.reload().then(() => router.push("/"));
            } else {
              router.push("/");
            }
          })
          .catch((err) => {
            router.push("/").then(() => {
              toast({
                description: err.message,
                status: "error",
                position: "top",
                isClosable: true,
              });
            });
          });
        break;
      default:
        handleInvalidLink();
    }
  }, [currentUser, handleInvalidLink, mode, oobCode, router, toast]);

  React.useEffect(() => {
    if (mode && oobCode) {
      handleAuthCallback();
      return;
    }
    handleInvalidLink();
  }, [handleAuthCallback, handleInvalidLink, mode, oobCode]);

  return <FullScreenLoading height="75vh" />;
};

export default Auth;
