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
import { NextSeo } from "next-seo";
import * as React from "react";

import HallWrapper from "lib/components/hall";
import SpokerLoading from "lib/components/shared/SpokerLoading";
import { requestVerificationMail } from "lib/services/firebase/auth/requestVerificationMail";
import { useAuth } from "lib/stores/auth";

const Home = () => {
  const currentUser = useAuth((state) => state.currentUser);
  const [busy, setBusy] = React.useState<boolean>(true);
  const [isEmailVerified, setIsEmailVerified] = React.useState<boolean>(false);
  const toast = useToast();

  const requestEmailVerification = () => {
    currentUser?.reload().then(async () => {
      if (currentUser.emailVerified) {
        setIsEmailVerified(currentUser.emailVerified);
        toast({
          description: `Your email is already verified.`,
          status: "info",
          position: "top",
          isClosable: true,
        });
      } else {
        await requestVerificationMail();
      }
    });
  };

  React.useEffect(() => {
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
      <NextSeo title="Home" />
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
