import { Box, Grid } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import ControllerWrapper from '~/lib/components/room/ControllerWrapper';
import CurrentVotesWrapper from '~/lib/components/room/CurrentVotesWrapper';
import RoomHeader from '~/lib/components/room/header';
import TaskList from '~/lib/components/room/TaskList';
import VoteWrapper from '~/lib/components/room/VoteWrapper';
import SpokerLoading from '~/lib/components/shared/SpokerLoading';
import { useRoomListener } from '~/lib/hooks/useRoomListener';
import { useVoteListener } from '~/lib/hooks/useVoteListener';
import { useAuth } from '~/lib/stores/auth';
import { useRoomStore } from '~/lib/stores/room';

const RoomContainer = () => {
  const currentUser = useAuth((state) => state.currentUser);
  const { isBusy, roomData } = useRoomStore((state) => ({
    isBusy: state.isBusy,
    roomData: state.roomData,
  }));

  useRoomListener();
  useVoteListener();

  if (isBusy) {
    return <SpokerLoading />;
  }

  if (currentUser && roomData) {
    return (
      <Grid gap={8}>
        <NextSeo title={roomData.room.name} />
        <Grid
          templateColumns={{ base: '1fr', md: '3fr 2fr' }}
          gap={6}
          alignItems="start"
        >
          <Grid gap={6}>
            <RoomHeader />
            <VoteWrapper />
          </Grid>

          <Grid gap={6}>
            <CurrentVotesWrapper />
            <ControllerWrapper />
          </Grid>
        </Grid>

        <TaskList />
      </Grid>
    );
  }

  return <Box>Error</Box>;
};

export default RoomContainer;
