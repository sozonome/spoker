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
import { FcGoogle } from "react-icons/fc";

import SpokerInput from "components/ui/SpokerInput";

import {
  loginUserWithEmailAndPassword,
  loginWithGoogle,
} from "functions/firebase";

type LoginFormType = {
  email: string;
  password: string;
};

type LoginProps = {
  handleSwitchToRegister: () => void;
};

const Login = ({ handleSwitchToRegister }: LoginProps) => {
  const { values, dirty, handleChange, handleSubmit } = useFormik<
    LoginFormType
  >({
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

  const handleLoginWithGoogle = () => {
    loginWithGoogle().catch((err) => {
      toast({
        description: err.message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    });
  };

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

          <Button
            leftIcon={<FcGoogle />}
            colorScheme="gray"
            onClick={handleLoginWithGoogle}
          >
            Sign In with Google
          </Button>
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
