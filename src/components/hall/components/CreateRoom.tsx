/**
 * @todo
 * [ ] add room id validation
 */

import {
  FormControl,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Switch,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import SpokerButton from "components/ui/SpokerButton";
import SpokerInput, { contraInputStyle } from "components/ui/SpokerInput";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import { useFormik } from "formik";
import { useState } from "react";

type CreateRoomFormType = {
  name: string;
  id: string;
  isPrivate: boolean;
  password: string;
};

const CreateRoom = () => {
  const { values, handleChange, handleSubmit } = useFormik<CreateRoomFormType>({
    initialValues: {
      name: "",
      id: "",
      isPrivate: false,
      password: "",
    },
    onSubmit: (formValues: CreateRoomFormType) => {
      console.log(formValues);
    },
  });

  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const { name, id, isPrivate, password } = values;

  const { size: _, ...contraInputStyleCompact } = contraInputStyle;

  return (
    <SpokerWrapperGrid gap={8}>
      <Heading size="lg">Create Room</Heading>

      <Grid gap={4}>
        <SpokerInput
          label="Room Name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="The Quick Brown Fox"
        />
        <SpokerInput
          label="Room ID"
          name="id"
          value={id}
          onChange={handleChange}
          placeholder="define your own room slug"
        />

        <FormControl display="flex" alignItems="center" gridGap={2}>
          <Switch
            name="isPrivate"
            isChecked={isPrivate}
            onChange={handleChange}
          />
          <FormLabel>private</FormLabel>
          <InputGroup size="md">
            <Input
              disabled={!isPrivate}
              onChange={handleChange}
              name="password"
              value={password}
              type={isPasswordShown ? "text" : "password"}
              placeholder="room password"
              size="md"
              {...contraInputStyleCompact}
            />
            <InputRightElement
              children={
                <IconButton
                  size="sm"
                  aria-label="show-password"
                  icon={
                    isPasswordShown ? <AiFillEye /> : <AiFillEyeInvisible />
                  }
                  onClick={() => setIsPasswordShown(!isPasswordShown)}
                />
              }
            />
          </InputGroup>
        </FormControl>
      </Grid>

      <SpokerButton colorScheme="green" onClick={() => handleSubmit()}>
        Let's Have Some Fun!
      </SpokerButton>
    </SpokerWrapperGrid>
  );
};

export default CreateRoom;
