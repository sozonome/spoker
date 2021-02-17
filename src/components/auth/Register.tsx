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

type RegisterFormType = {
  name: string;
  email: string;
  password: string;
};

type RegisterProps = {
  handleSwitchToLogin: () => void;
};

const Register = ({ handleSwitchToLogin }: RegisterProps) => {
  const { values, handleChange, handleSubmit } = useFormik<RegisterFormType>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: () => {},
  });

  const { name, email, password } = values;

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
        <Button colorScheme="teal">Register</Button>
      </ModalFooter>
    </>
  );
};

export default Register;
