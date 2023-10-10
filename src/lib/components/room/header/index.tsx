import { Box, Divider, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';

import SpokerWrapperGrid from '~/lib/components/shared/SpokerWrapperGrid';
import { useUserRole } from '~/lib/hooks/useUserRole';
import { useRoomStore } from '~/lib/stores/room';

import EditableFields from './components/EditableFields';
import { useRoomHeader } from './hooks';

const RoomHeader = () => {
  const roomData = useRoomStore((state) => state.roomData);
  const { isOwner } = useUserRole();
  const { name, description, handleUpdateTask } = useRoomHeader({
    roomData,
    isOwner,
  });

  const content = React.useMemo(() => {
    if (isOwner) {
      return (
        <EditableFields
          name={name}
          description={description}
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
  }, [description, handleUpdateTask, isOwner, name, roomData?.task]);

  return (
    <SpokerWrapperGrid gap={4}>
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
