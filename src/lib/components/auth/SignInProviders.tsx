import { Button, Grid, Text, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { loginWithGoogle } from '~/lib/services/firebase/auth/login/google';

const SignInProviders = () => {
  const toast = useToast();

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle();
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
        _hover={{ bgGradient: 'linear(to-r, blue.100, cyan.100)' }}
      >
        Google
      </Button>
    </Grid>
  );
};

export default SignInProviders;
