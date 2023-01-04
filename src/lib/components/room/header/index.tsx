import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import { useUserRole } from "lib/hooks/useUserRole";
import { useRoomStore } from "lib/stores/room";

import EditableFields from "./components/EditableFields";
import { useRoomHeader } from "./hooks";

const RoomHeader = () => {
  const { roomData, taskName, taskDescription } = useRoomStore((state) => ({
    roomData: state.roomData,
    taskName: state.taskName,
    taskDescription: state.taskDescription,
  }));
  const { isOwner } = useUserRole();
  const wrapperBackgroundColor = useColorModeValue("teal.50", "teal.600");
  const { handleUpdateTask } = useRoomHeader();

  const content = React.useMemo(() => {
    if (isOwner) {
      return (
        <EditableFields
          name={taskName}
          description={taskDescription}
          handleUpdateTask={handleUpdateTask}
        />
      );
    }
    const task = roomData?.task;
    if (!task) {
      return null;
    }

    return (
      <>
        <Heading fontSize="2xl">{task.name}</Heading>
        {task.description && <Text>{task.description}</Text>}
      </>
    );
  }, [handleUpdateTask, isOwner, roomData?.task, taskDescription, taskName]);

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
