import {
  Button,
  Grid,
  Heading,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ForgotPasswordButton from '~/lib/components/auth/ForgotPasswordButton';
import SignInProviders from '~/lib/components/auth/SignInProviders';
import { contraBoxStyle } from '~/lib/components/auth/style';
import SpokerInput from '~/lib/components/shared/SpokerInput';
import { EVENT_TYPE_REGISTRATION } from '~/lib/constants/tracking';
import { registerUserWithEmailAndPassword } from '~/lib/services/firebase/auth/register';
import { removeFirebasePrefix } from '~/lib/utils/removeFirebasePrefix';
import { trackEvent } from '~/lib/utils/trackEvent';

import { initialValues, registerFormValidationSchema } from './constants';
import type { RegisterFormType, RegisterProps } from './types';

const Register = ({ handleSwitchToLogin }: RegisterProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const borderColor = useColorModeValue('#18191F', '#FFFFFF');

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<RegisterFormType>({
    defaultValues: initialValues,
    mode: 'onChange',
    resolver: yupResolver(registerFormValidationSchema),
  });

  const processRegister = async () => {
    setIsLoading(true);
    const values = getValues();
    await registerUserWithEmailAndPassword(values)
      .then((user) => {
        setIsLoading(false);
        trackEvent({
          eventName: 'New User Register',
          eventData: { type: EVENT_TYPE_REGISTRATION },
        });
        toast({
          title: 'Registration Successful',
          position: 'top',
          status: 'success',
          isClosable: true,
        });
        toast({
          title: `A verification email is sent to ${user?.email}`,
          description:
            'Before you can use any features, please verify your email first.',
          position: 'top',
          status: 'warning',
          isClosable: true,
        });
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          description: removeFirebasePrefix(err.message),
          position: 'top',
          status: 'error',
          isClosable: true,
        });
      });
  };

  return (
    <ModalContent
      as="form"
      {...contraBoxStyle(borderColor)}
      onSubmit={handleSubmit(processRegister)}
    >
      <ModalHeader>
        <Heading bgGradient="linear(to-br, teal.200, green.400)" bgClip="text">
          Register
        </Heading>
      </ModalHeader>

      <ModalBody>
        <Grid gap={4}>
          <SignInProviders />

          <SpokerInput
            label="name"
            {...register('name')}
            isInvalid={!!errors.name?.message}
            errorText={errors.name?.message}
            placeholder="What's your name?"
          />
          <SpokerInput
            label="email"
            {...register('email')}
            isInvalid={!!errors.email?.message}
            errorText={errors.email?.message}
            placeholder="Your favorite email"
          />
          <SpokerInput
            label="password"
            {...register('password')}
            isInvalid={!!errors.password?.message}
            errorText={errors.password?.message}
            placeholder="Your secret phrase"
            type="password"
          />

          <ForgotPasswordButton />
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
        <Button
          type="submit"
          disabled={!isDirty || !isValid}
          isLoading={isLoading}
          colorScheme="teal"
        >
          Sign Up
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default Register;
