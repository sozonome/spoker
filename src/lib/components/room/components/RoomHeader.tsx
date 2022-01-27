import { Flex, Grid, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";

import SpokerInput from "lib/components/ui/SpokerInput";
import SpokerWrapperGrid from "lib/components/ui/SpokerWrapperGrid";
import { updateRoomTask } from "lib/services/firebase/room";
import type { RoomInstance, Task } from "lib/types/RawDB";

type RoomHeaderProps = {
  roomData: RoomInstance;
};

const RoomHeader = ({ roomData }: RoomHeaderProps) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const handleUpdateTask =
    (field: keyof Task) => (event: ChangeEvent<HTMLInputElement>) => {
      if (roomData) {
        const updatedTask: Task = {
          ...roomData.task,
          [field]: event.target.value,
        };
        updateRoomTask(id as string, updatedTask);
      }
    };

  return (
    <SpokerWrapperGrid gap={4}>
      <Heading size="lg">{roomData?.room.name}</Heading>

      <Flex gridGap={4}>
        <Heading size="md">Task</Heading>

        <Grid gap={2} width="full">
          <SpokerInput
            label="Name"
            value={roomData?.task.name}
            onChange={handleUpdateTask("name")}
            placeholder="Going to Mars"
          />
          <SpokerInput
            label="Description"
            value={roomData?.task.description}
            onChange={handleUpdateTask("description")}
            placeholder="Land to Moon first"
          />
        </Grid>
      </Flex>
    </SpokerWrapperGrid>
  );
};

export default RoomHeader;
