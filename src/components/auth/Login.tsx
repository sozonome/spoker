import {
  Button,
  Grid,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";

import SpokerInput from "components/ui/SpokerInput";
import { useFormik } from "formik";

type LoginFormType = {
  email: string;
  password: string;
};

type LoginProps = {
  handleSwitchToRegister: () => void;
};

const Login = ({ handleSwitchToRegister }: LoginProps) => {
  const { values, handleChange, handleSubmit } = useFormik<LoginFormType>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
  });

  const { email, password } = values;

  return (
    <>
      <ModalHeader>
        <Heading>Login</Heading>
      </ModalHeader>

      <ModalBody>
        <Grid gap={4}>
          <SpokerInput
            label="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Your e-mail"
          />
          <SpokerInput
            label="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Your password"
          />
        </Grid>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="ghost"
          fontWeight="normal"
          onClick={handleSwitchToRegister}
        >
          Register
        </Button>
        <Button colorScheme="blue">Sign In</Button>
      </ModalFooter>
    </>
  );
};

export default Login;
