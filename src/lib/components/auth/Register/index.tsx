import {
  Button,
  Grid,
  Heading,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useColorModeValue,
} from '@chakra-ui/react';

import SignInProviders from '~/lib/components/auth/SignInProviders';
import { contraBoxStyle } from '~/lib/components/auth/style';

type RegisterProps = {
  handleSwitchToLogin: () => void;
};

const Register = ({ handleSwitchToLogin }: RegisterProps) => {
  const borderColor = useColorModeValue('#18191F', '#FFFFFF');

  return (
    <ModalContent as="form" {...contraBoxStyle(borderColor)}>
      <ModalHeader>
        <Heading bgGradient="linear(to-br, teal.200, green.400)" bgClip="text">
          Register
        </Heading>
      </ModalHeader>

      <ModalBody>
        <Grid gap={4}>
          <SignInProviders />
        </Grid>
      </ModalBody>

      <ModalFooter gridGap={2}>
        <Button
          variant="ghost"
          fontWeight="normal"
          onClick={handleSwitchToLogin}
        >
          Sign In
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default Register;
