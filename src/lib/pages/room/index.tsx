import { Box, Grid } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import { SpokerLoading } from '~/lib/components/spoker-loading';
import { useAuth } from '~/lib/stores/auth';
import { useRoomStore } from '~/lib/stores/room';

import { ControllerWrapper } from './components/controller-wrapper';
import { CurrentVotesWrapper } from './components/current-votes-wrapper';
import { RoomHeader } from './components/header';
import { TaskList } from './components/task-list';
import { VoteWrapper } from './components/vote-wrapper';
import { useRoomListener } from './hooks/use-room-listener';
import { useVoteListener } from './hooks/use-vote-listener';

export const RoomPage = () => {
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
