import {
  Button,
  Grid,
  Heading,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useColorModeValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

import SignInProviders from "lib/components/auth/SignInProviders";
import { contraBoxStyle } from "lib/components/auth/style";
import SpokerInput from "lib/components/shared/SpokerInput";
import { loginUserWithEmailAndPassword } from "lib/services/firebase/auth/login/emailAndPassword";

import { initialValues, loginFormValidationSchema } from "./constants";
import type { LoginFormType, LoginProps } from "./types";

const Login = ({ handleSwitchToRegister }: LoginProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const borderColor = useColorModeValue("#18191F", "#FFFFFF");

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<LoginFormType>({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: yupResolver(loginFormValidationSchema),
  });

  const processLogin = async () => {
    setIsLoading(true);
    const values = getValues();
    await loginUserWithEmailAndPassword(values.email, values.password).finally(
      () => setIsLoading(false)
    );
  };

  return (
    <ModalContent
      as="form"
      {...contraBoxStyle(borderColor)}
      onSubmit={handleSubmit(processLogin)}
    >
      <ModalHeader>
        <Heading bgGradient="linear(to-br, teal.200, blue.600)" bgClip="text">
          Login
        </Heading>
      </ModalHeader>

      <ModalBody>
        <Grid gap={4}>
          <SpokerInput
            {...register("email")}
            label="email"
            isInvalid={!!errors.email?.message}
            errorText={errors.email?.message}
            placeholder="Your e-mail"
          />
          <SpokerInput
            {...register("password")}
            type="password"
            label="password"
            isInvalid={!!errors.password?.message}
            errorText={errors.password?.message}
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
          type="submit"
          disabled={!isDirty || !isValid}
          isLoading={isLoading}
          colorScheme="blue"
        >
          Sign In
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default Login;
