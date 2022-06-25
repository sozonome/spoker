import { Box, Grid } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import ControllerWrapper from "lib/components/room/ControllerWrapper";
import CurrentVotesWrapper from "lib/components/room/CurrentVotesWrapper";
import RoomHeader from "lib/components/room/header";
import TaskList from "lib/components/room/TaskList";
import VoteWrapper from "lib/components/room/VoteWrapper";
import SpokerLoading from "lib/components/shared/SpokerLoading";

import { useRoom } from "./hooks";

const RoomContainer = () => {
  const {
    currentUser,
    busy,
    showVote,
    roomData,
    users,
    averagePoint,
    highestPoint,
    isParticipant,
    isObservant,
    isOwner,
    handleFinishVote,
  } = useRoom();

  if (busy) {
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
            <RoomHeader roomData={roomData} isOwner={isOwner} />
            {(isOwner || isParticipant) && (
              <VoteWrapper
                roomData={roomData}
                currentUser={currentUser}
                showVote={showVote}
              />
            )}
          </Grid>

          <Grid gap={6}>
            <CurrentVotesWrapper
              isOwner={isOwner}
              isObservant={isObservant}
              roomData={roomData}
              showVote={showVote}
              averagePoint={averagePoint}
              highestPoint={highestPoint}
              users={users}
              currentUser={currentUser}
              onFinishVote={handleFinishVote}
            />
            <ControllerWrapper users={users} isResetEnabled={isOwner} />
          </Grid>
        </Grid>

        <TaskList isOwner={isOwner} roomData={roomData} showVote={showVote} />
      </Grid>
    );
  }

  return <Box>Error</Box>;
};

export default RoomContainer;
