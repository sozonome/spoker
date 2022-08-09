import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";

import FullScreenLoading from "lib/layout/FullScreenLoading";
import { handleVerifyEmail } from "lib/services/firebase/auth/verifyEmail";
import { useAuth } from "lib/stores/auth";
import { removeFirebasePrefix } from "lib/utils/removeFirebasePrefix";

const Auth = () => {
  const router = useRouter();
  const { mode, oobCode } = router.query;

  const currentUser = useAuth((state) => state.currentUser);
  const [isProcessed, setIsProcessed] = React.useState<boolean>(false);
  const toast = useToast();

  const handleInvalidLink = React.useCallback(() => {
    setIsProcessed(true);
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
    if (mode === "verifyEmail") {
      setIsProcessed(true);
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
        .catch((err: Error) => {
          router.push("/").then(() => {
            toast({
              description: removeFirebasePrefix(err.message),
              status: "error",
              position: "top",
              isClosable: true,
            });
          });
        });
      return;
    }

    handleInvalidLink();
  }, [currentUser, handleInvalidLink, mode, oobCode, router, toast]);

  React.useEffect(() => {
    if (isProcessed) {
      return;
    }
    if (router.isReady) {
      handleAuthCallback();
    }
  }, [handleAuthCallback, isProcessed, router.isReady]);

  return <FullScreenLoading height="75vh" />;
};

export default Auth;
