import { Box, Grid } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import shallow from "zustand/shallow";

import ControllerWrapper from "lib/components/room/ControllerWrapper";
import CurrentVotesWrapper from "lib/components/room/CurrentVotesWrapper";
import RoomHeader from "lib/components/room/header";
import TaskList from "lib/components/room/TaskList";
import VoteWrapper from "lib/components/room/VoteWrapper";
import SpokerLoading from "lib/components/shared/SpokerLoading";
import { useAuth } from "lib/stores/auth";
import { useRoomStore } from "lib/stores/room";

import { useRoom } from "./hooks";

const RoomContainer = () => {
  const {
    averagePoint,
    highestPoint,
    isParticipant,
    isObservant,
    isOwner,
    handleFinishVote,
  } = useRoom();
  const currentUser = useAuth((state) => state.currentUser);
  const { isBusy, roomData } = useRoomStore(
    (state) => ({
      isBusy: state.isBusy,
      roomData: state.roomData,
    }),
    shallow
  );

  if (isBusy) {
    return <SpokerLoading />;
  }

  if (currentUser && roomData) {
    return (
      <Grid gap={8}>
        <NextSeo title={roomData.room.name} />
        <Grid
          templateColumns={{ base: "1fr", md: "3fr 2fr" }}
          gap={6}
          alignItems="start"
        >
          <Grid gap={6}>
            <RoomHeader isOwner={isOwner} />
            {(isOwner || isParticipant) && <VoteWrapper />}
          </Grid>

          <Grid gap={6}>
            <CurrentVotesWrapper
              isOwner={isOwner}
              isObservant={isObservant}
              averagePoint={averagePoint}
              highestPoint={highestPoint}
              onFinishVote={handleFinishVote}
            />
            <ControllerWrapper isResetEnabled={isOwner} />
          </Grid>
        </Grid>

        <TaskList isOwner={isOwner} />
      </Grid>
    );
  }

  return <Box>Error</Box>;
};

export default RoomContainer;
