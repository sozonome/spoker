import { Button, Grid, Text, useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

import { loginWithGoogle } from "functions/firebase";

const SignInProviders = () => {
  const toast = useToast();

  const handleLoginWithGoogle = () => {
    loginWithGoogle(toast);
  };

  useEffect(() => {
    return () => {
      toast.closeAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid gap={2} textAlign="center">
      <Text>Sign In with:</Text>

      <Button
        leftIcon={<FcGoogle />}
        onClick={handleLoginWithGoogle}
        _hover={{ bgGradient: "linear(to-r, blue.100, cyan.100)" }}
      >
        Google
      </Button>
    </Grid>
  );
};

export default SignInProviders;
