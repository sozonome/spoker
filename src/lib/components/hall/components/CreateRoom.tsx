import { Button, Grid, Heading, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  createRoomFormSchema,
  initialValues,
} from "lib/components/hall/constants";
import type { CreateRoomFormType } from "lib/components/hall/types";
import SpokerInput from "lib/components/shared/SpokerInput";
import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import { createRoom } from "lib/services/firebase/room";

const CreateRoom = () => {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<CreateRoomFormType>({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: yupResolver(createRoomFormSchema),
  });

  const processCreateRoom = async () => {
    setIsLoading(true);
    const values = getValues();
    values.id = values.id.trim().replace(" ", "-");
    await createRoom(values)
      .then(() => {
        router.push(`/join/${values.id}`);
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
  };

  return (
    <SpokerWrapperGrid
      gap={8}
      as="form"
      onSubmit={handleSubmit(processCreateRoom)}
    >
      <Heading size="lg">Create Room</Heading>

      <Grid gap={4}>
        <SpokerInput
          label="Room Name"
          {...register("name")}
          isInvalid={!!errors.name?.message}
          errorText={errors.name?.message}
          placeholder="The Quick Brown Fox"
        />
        <SpokerInput
          label="Room ID"
          {...register("id")}
          isInvalid={!!errors.id?.message}
          errorText={errors.id?.message}
          placeholder="define your own room slug"
        />
      </Grid>

      <Button
        isLoading={isLoading}
        disabled={!isDirty || !isValid || isLoading}
        colorScheme="green"
        type="submit"
      >
        Let&apos;s Have Some Fun!
      </Button>
    </SpokerWrapperGrid>
  );
};

export default CreateRoom;
