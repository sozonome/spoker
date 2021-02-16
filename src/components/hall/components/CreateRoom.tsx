/**
 * @todo
 * [ ] add room id validation
 */

import {
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Switch,
} from "@chakra-ui/react";

import SpokerButton from "components/ui/SpokerButton";
import SpokerInput from "components/ui/SpokerInput";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import { useFormik } from "formik";

type CreateRoomFormType = {
  name: string;
  id: string;
  isPrivate: boolean;
};

const CreateRoom = () => {
  const { values, handleChange, handleSubmit } = useFormik<CreateRoomFormType>({
    initialValues: {
      name: "",
      id: "",
      isPrivate: false,
    },
    onSubmit: (formValues: CreateRoomFormType) => {
      console.log(formValues);
    },
  });

  const { name, id, isPrivate } = values;

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
        </FormControl>
      </Grid>

      <SpokerButton colorScheme="green" onClick={() => handleSubmit()}>
        Let's Have Some Fun!
      </SpokerButton>
    </SpokerWrapperGrid>
  );
};

export default CreateRoom;
