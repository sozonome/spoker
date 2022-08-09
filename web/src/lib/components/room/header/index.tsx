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

import EditableFields from "./components/EditableFields";
import { useRoomHeader } from "./hooks";
import type { RoomHeaderProps } from "./types";

const RoomHeader = ({ roomData, isOwner }: RoomHeaderProps) => {
  const wrapperBackgroundColor = useColorModeValue("teal.50", "teal.600");
  const { name, description, handleUpdateTask } = useRoomHeader({
    roomData,
    isOwner,
  });

  const content = React.useMemo(() => {
    const task = roomData?.task;
    if (isOwner) {
      return (
        <EditableFields
          name={name}
          description={description}
          handleUpdateTask={handleUpdateTask}
        />
      );
    }

    return (
      <>
        <Heading fontSize="2xl">{task.name}</Heading>
        {task.description && <Text>{task.description}</Text>}
      </>
    );
  }, [description, handleUpdateTask, isOwner, name, roomData?.task]);

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
