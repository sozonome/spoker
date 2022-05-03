import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import debounce from "lodash-es/debounce";
import { useRouter } from "next/router";
import * as React from "react";

import AutoResizeTextarea from "lib/components/shared/AutoResizeTextarea";
import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import { updateRoomTask } from "lib/services/firebase/room";
import type { RoomInstance, Task } from "lib/types/RawDB";

type RoomHeaderProps = {
  roomData: RoomInstance;
  isOwner: boolean;
};

const RoomHeader = ({ roomData, isOwner }: RoomHeaderProps) => {
  const wrapperBackgroundColor = useColorModeValue("teal.50", "teal.600");
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const handleUpdateTask = React.useCallback(
    (field: keyof Task) =>
      debounce((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (roomData && isOwner) {
          const updatedTask: Task = {
            ...roomData.task,
            [field]: event.target.value,
          };
          updateRoomTask(id as string, updatedTask);
        }
      }, 500),
    [id, isOwner, roomData]
  );

  const content = React.useMemo(() => {
    const task = roomData?.task;
    if (isOwner) {
      return (
        <>
          <AutoResizeTextarea
            label="Name"
            defaultValue={task.name}
            onChange={handleUpdateTask("name")}
            placeholder="Going to Mars"
          />
          <AutoResizeTextarea
            label="Description"
            defaultValue={task.description}
            onChange={handleUpdateTask("description")}
            placeholder="Land to Moon first"
          />
        </>
      );
    }

    return (
      <>
        <Heading fontSize="2xl">{task.name}</Heading>
        {task.description && <Text>{task.description}</Text>}
      </>
    );
  }, [handleUpdateTask, isOwner, roomData?.task]);

  return (
    <SpokerWrapperGrid gap={4} backgroundColor={wrapperBackgroundColor}>
      <Box>
        <Heading size="lg">{roomData?.room.name}</Heading>
        <Divider borderColor="black" marginTop={2} />
      </Box>

      <Flex gridGap={4}>
        <Heading size="md">Story</Heading>

        <Grid gap={2} width="full">
          {content}
        </Grid>
      </Flex>
    </SpokerWrapperGrid>
  );
};

export default RoomHeader;
