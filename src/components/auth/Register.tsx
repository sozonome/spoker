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
  loginWithGoogle,
  registerUserWithEmailAndPassword,
} from "functions/firebase";

type RegisterFormType = {
  name: string;
  email: string;
  password: string;
};

type RegisterProps = {
  handleSwitchToLogin: () => void;
};

const Register = ({ handleSwitchToLogin }: RegisterProps) => {
  const { values, dirty, handleChange, handleSubmit } = useFormik<
    RegisterFormType
  >({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (formValues: RegisterFormType) => {
      setIsLoading(true);
      await registerUserWithEmailAndPassword(
        formValues.email,
        formValues.password,
        formValues.name
      )
        .then((user) => {
          setIsLoading(false);
          toast({
            title: "Registration Successful",
            position: "top",
            status: "success",
            isClosable: true,
          });
          toast({
            title: `A verification email is sent to ${user.email}`,
            description:
              "Before you can use any features, please verify your email first.",
            position: "top",
            status: "warning",
            isClosable: true,
          });
        })
        .catch((err) => {
          setIsLoading(false);
          toast({
            description: err.message,
            position: "top",
            status: "error",
            isClosable: true,
          });
        });
    },
  });
  const { name, email, password } = values;
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegisterWithGoogle = () => {
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
        <Heading>Register</Heading>
      </ModalHeader>

      <ModalBody>
        <Grid gap={4}>
          <SpokerInput
            label="name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="What's your name?"
          />
          <SpokerInput
            label="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Your favorite email"
          />
          <SpokerInput
            label="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Your secret phrase"
            type="password"
          />

          <Button
            leftIcon={<FcGoogle />}
            colorScheme="gray"
            onClick={handleRegisterWithGoogle}
          >
            Register with Google
          </Button>
        </Grid>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="ghost"
          fontWeight="normal"
          onClick={handleSwitchToLogin}
        >
          Sign In
        </Button>
        <Button
          onClick={() => handleSubmit()}
          disabled={!dirty}
          isLoading={isLoading}
          colorScheme="teal"
        >
          Register
        </Button>
      </ModalFooter>
    </>
  );
};

export default Register;
