import {
  Button,
  Grid,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";

import SpokerInput from "lib/components/ui/SpokerInput";
import { loginUserWithEmailAndPassword } from "lib/services/firebase";

import SignInProviders from "./SignInProviders";

type LoginFormType = {
  email: string;
  password: string;
};

type LoginProps = {
  handleSwitchToRegister: () => void;
};

const Login = ({ handleSwitchToRegister }: LoginProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { values, dirty, handleChange, handleSubmit } =
    useFormik<LoginFormType>({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (formValues: LoginFormType) => {
        setIsLoading(true);
        loginUserWithEmailAndPassword(formValues.email, formValues.password)
          .then(() => {
            setIsLoading(false);
          })
          .catch((err) => {
            toast({
              description: err.message,
              position: "top",
              status: "error",
              isClosable: true,
            });
            setIsLoading(false);
          });
      },
    });
  const { email, password } = values;

  return (
    <>
      <ModalHeader>
        <Heading bgGradient="linear(to-br, teal.200, blue.600)" bgClip="text">
          Login
        </Heading>
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

          <SignInProviders />
        </Grid>
      </ModalBody>

      <ModalFooter gridGap={2}>
        <Button
          variant="ghost"
          fontWeight="normal"
          onClick={handleSwitchToRegister}
        >
          Register
        </Button>
        <Button
          onClick={() => handleSubmit()}
          disabled={!dirty}
          isLoading={isLoading}
          colorScheme="blue"
        >
          Sign In
        </Button>
      </ModalFooter>
    </>
  );
};

export default Login;
