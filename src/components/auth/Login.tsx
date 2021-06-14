import { Button } from "@chakra-ui/button";
import { Grid, Heading } from "@chakra-ui/layout";
import { ModalBody, ModalFooter, ModalHeader } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { useFormik } from "formik";
import { useState } from "react";

import SpokerInput from "components/ui/SpokerInput";
import SignInProviders from "./SignInProviders";

import { loginUserWithEmailAndPassword } from "functions/firebase";

type LoginFormType = {
  email: string;
  password: string;
};

type LoginProps = {
  handleSwitchToRegister: () => void;
};

const Login = ({ handleSwitchToRegister }: LoginProps) => {
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
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
