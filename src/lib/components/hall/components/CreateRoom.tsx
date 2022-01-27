import { Button, Grid, Heading, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useState } from "react";

import type { CreateRoomFormType } from "../types";
import { CreateRoomFormSchema } from "../types";
import SpokerInput from "lib/components/ui/SpokerInput";
import SpokerWrapperGrid from "lib/components/ui/SpokerWrapperGrid";
import { createRoom } from "lib/services/firebase/room";

const CreateRoom = () => {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        await createRoom(formValues)
          .then(() => {
            router.push(`/join/${formValues.id}`);
          })
          .catch((err) => {
            toast({
              position: "top-right",
              title: "Create Room Fail",
              description: err.message,
              status: "error",
              isClosable: true,
            });
          })
          .finally(() => setIsLoading(false));
      },
    });
  const { name, id } = values;

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
        Let&apos;s Have Some Fun!
      </Button>
    </SpokerWrapperGrid>
  );
};

export default CreateRoom;
