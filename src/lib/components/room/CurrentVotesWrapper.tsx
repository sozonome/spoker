import {
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Select,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import type { User } from "firebase/auth";
import { useRouter } from "next/router";
import * as React from "react";

import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import type { HideLabelOptionsType } from "lib/constants/hideLabel";
import { hideLabelOptions } from "lib/constants/hideLabel";
import { updateConfig } from "lib/services/firebase/room";
import type { RoomConfig, RoomInstance } from "lib/types/RawDB";
import type { RoomUser } from "lib/types/room";

import PointWrapper from "./PointWrapper";
import { pointTextColor, pointTextSize } from "./utils";

type CurrentVotesWrapperProps = {
  isObservant: boolean;
  isParticipant: boolean;
  roomData: RoomInstance;
  showVote: boolean;
  averagePoint: number;
  users: Array<RoomUser>;
  currentUser: User;
};

const CurrentVotesWrapper = ({
  isObservant,
  isParticipant,
  roomData,
  showVote,
  averagePoint,
  users,
  currentUser,
}: CurrentVotesWrapperProps) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const toast = useToast();

  const handleUpdateFreezeAfterVote = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isObservant) {
      const updatedConfig: Partial<RoomConfig> = {
        isFreezeAfterVote: e.currentTarget.checked,
      };
      updateConfig(id as string, updatedConfig);
    } else {
      toast({
        title: "Participant cannot change configurations",
        status: "warning",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleUpdateHideLabel = (selectedHideLabel: HideLabelOptionsType) => {
    if (isObservant) {
      const updatedConfig: Partial<RoomConfig> = {
        hideLabel: selectedHideLabel,
      };
      updateConfig(id as string, updatedConfig);
    }
  };

  const showAveragePoint = React.useMemo(
    () => showVote && !Number.isNaN(averagePoint),
    [averagePoint, showVote]
  );

  const sortedParticipants = React.useMemo(
    () =>
      users
        .filter((user) => user.role === "participant")
        .sort((a, b) => (showVote ? (b.point ?? 0) - (a.point ?? 0) : 0))
        .map((participant, participantIndex, participants) => (
          <React.Fragment key={participant.uid}>
            <Grid templateColumns="2fr 1fr" alignItems="center">
              <Heading size="sm">{participant.name}</Heading>
              <Text
                fontSize={
                  showVote ? pointTextSize(participant.point ?? 0) : undefined
                }
                textColor={
                  showVote ? pointTextColor(participant.point ?? 0) : undefined
                }
              >
                <PointWrapper
                  showVote={showVote}
                  roomSelectedHideLabel={roomData?.config.hideLabel ?? "monkey"}
                  isCurrentUser={participant.uid === currentUser?.uid}
                  point={participant.point}
                />
              </Text>
            </Grid>
            {participantIndex !== participants.length - 1 && <Divider />}
          </React.Fragment>
        )),
    [currentUser?.uid, roomData?.config.hideLabel, showVote, users]
  );

  return (
    <SpokerWrapperGrid display="inline-block" gap={4}>
      <Heading>Current Votes</Heading>

      <Checkbox
        disabled={isParticipant}
        isChecked={roomData.config.isFreezeAfterVote}
        onChange={handleUpdateFreezeAfterVote}
        colorScheme="teal"
        marginY={4}
      >
        freeze after vote
      </Checkbox>

      {isObservant && (
        <FormControl display="flex" alignItems="center">
          <FormLabel fontSize="sm" width="30%">
            Hide Label
          </FormLabel>
          <Select
            marginBottom={4}
            onChange={(e) =>
              handleUpdateHideLabel(e.target.value as HideLabelOptionsType)
            }
            value={roomData?.config.hideLabel ?? "monkey"}
          >
            {hideLabelOptions.map((hideLabelOption) => (
              <Text as="option" value={hideLabelOption} key={hideLabelOption}>
                {hideLabelOption}
              </Text>
            ))}
          </Select>
        </FormControl>
      )}

      <Grid gap={2}>
        {showAveragePoint && <Text>average: {averagePoint}</Text>}
        {sortedParticipants}
      </Grid>

      <Spacer />
    </SpokerWrapperGrid>
  );
};

export default CurrentVotesWrapper;
