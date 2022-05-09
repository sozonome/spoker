import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "lib/components/auth/AuthProvider";
import HallWrapper from "lib/components/hall";
import SpokerLoading from "lib/components/shared/SpokerLoading";
import { requestVerificationMail } from "lib/services/firebase/auth";
import { removeFirebasePrefix } from "lib/utils/removeFirebasePrefix";

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
              description: removeFirebasePrefix(err.message),
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
              Haven&apos;t received any verification email?{" "}
              <Button
                colorScheme="orange"
                size="sm"
                fontWeight="semibold"
                onClick={requestEmailVerification}
              >
                Request Verification Link
              </Button>
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
