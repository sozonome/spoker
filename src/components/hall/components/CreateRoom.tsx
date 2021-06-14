import { Button } from "@chakra-ui/button";
import { Grid, Heading } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useState } from "react";

import SpokerInput from "components/ui/SpokerInput";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";

import { createRoom } from "functions/firebase/room";

import { CreateRoomFormSchema, CreateRoomFormType } from "../types";

const CreateRoom = () => {
  const toast = useToast();
  const router = useRouter();
  const { values, errors, dirty, handleChange, handleSubmit } =
    useFormik<CreateRoomFormType>({
      initialValues: {
        name: "",
        id: nanoid(21),
        isPrivate: false,
        password: "",
      },
      validationSchema: CreateRoomFormSchema,
      onSubmit: async (formValues: CreateRoomFormType) => {
        setIsLoading(true);
        await createRoom(formValues).then((res) => {
          setIsLoading(false);
          if (res !== true && res.message) {
            toast({
              position: "top-right",
              title: "Create Room Fail",
              description: res.message,
              status: "error",
              isClosable: true,
            });
          } else {
            router.push(`/join/${formValues.id}`);
          }
        });
      },
    });
  const { name, id } = values;
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          isInvalid={(errors?.name?.length ?? 0) > 0}
          helperText={errors?.name}
        />
        <SpokerInput
          label="Room ID"
          name="id"
          value={id}
          onChange={handleChange}
          placeholder="define your own room slug"
          isInvalid={(errors?.id?.length ?? 0) > 0}
          helperText={errors.id}
        />
      </Grid>

      <Button
        isLoading={isLoading}
        disabled={!dirty || (dirty && Object.keys(errors).length > 0)}
        colorScheme="green"
        onClick={() => handleSubmit()}
      >
        Let's Have Some Fun!
      </Button>
    </SpokerWrapperGrid>
  );
};

export default CreateRoom;
