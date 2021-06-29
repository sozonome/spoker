import { useToast } from "@chakra-ui/toast";
import { Box, Grid, Link } from "@chakra-ui/layout";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { useContext, useEffect, useState } from "react";

import HallWrapper from "components/hall";
import SpokerLoading from "components/ui/SpokerLoading";

import { AuthContext } from "components/auth/AuthProvider";
import { requestVerificationMail } from "functions/firebase/auth";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [busy, setBusy] = useState<boolean>(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const toast = useToast();

  const requestEmailVerification = () => {
    currentUser?.reload().then(() => {
      if (currentUser.emailVerified) {
        setIsEmailVerified(currentUser.emailVerified);
        toast({
          description: `Your email is already verified.`,
          status: "info",
          position: "top",
          isClosable: true,
        });
      } else {
        requestVerificationMail()
          .then(() => {
            toast({
              title: "Verification Requested",
              description: `Please check your email (${currentUser.email}).`,
              status: "info",
              position: "top",
              isClosable: true,
            });
          })
          .catch((err) => {
            toast({
              description: err.message,
              status: "warning",
              position: "top",
              isClosable: true,
            });
          });
      }
    });
  };

  useEffect(() => {
    setBusy(true);
    if (currentUser) {
      currentUser.reload().then(() => {
        setIsEmailVerified(currentUser.emailVerified);
        setBusy(false);
      });
    } else {
      setBusy(false);
    }
  }, [currentUser]);

  if (busy) {
    return <SpokerLoading />;
  }

  return (
    <Box mb={8} w="full">
      {currentUser && !isEmailVerified ? (
        <Alert borderRadius={24} status="warning">
          <AlertIcon />
          <Grid>
            <AlertTitle>
              Your email is not verified yet. Please check your email for
              verification instructions.
            </AlertTitle>

            <AlertDescription>
              {"Haven't received any verification email?"}{" "}
              <Link fontWeight="semibold" onClick={requestEmailVerification}>
                Request Verification Link
              </Link>
            </AlertDescription>
          </Grid>
        </Alert>
      ) : (
        <HallWrapper />
      )}
    </Box>
  );
};

export default Home;
