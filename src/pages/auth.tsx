/**
 * @todo
 * [ ] handle mode "resetPassword"
 * [ ] handle mode "recoverEmail"
 */

import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";

import FullScreenLoading from "components/layout/FullScreenLoading";

import { AuthContext } from "components/auth/AuthProvider";
import { handleVerifyEmail } from "functions/firebase";

const AuthPage = () => {
  const router = useRouter();
  const { mode, oobCode } = router.query;

  const { currentUser } = useContext(AuthContext);

  const toast = useToast();

  const handleInvalidLink = () => {
    router.push("/").then(() => {
      toast({
        description: "Invalid Link",
        status: "warning",
        position: "top",
        isClosable: true,
      });
    });
  };

  if (mode && oobCode) {
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
  } else {
    handleInvalidLink();
  }

  return <FullScreenLoading height="75vh" />;
};

export default AuthPage;
