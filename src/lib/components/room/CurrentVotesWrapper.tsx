import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Select,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import shallow from "zustand/shallow";

import SpokerWrapperGrid from "lib/components/shared/SpokerWrapperGrid";
import type { HideLabelOptionsType } from "lib/constants/hideLabel";
import { hideLabelOptions } from "lib/constants/hideLabel";
import { CURRENT_VOTE_WRAPPER_ID } from "lib/constants/wrapperkeys";
import { useRoomPoint } from "lib/hooks/useRoomPoint";
import { useUserRole } from "lib/hooks/useUserRole";
import { useVote } from "lib/hooks/useVote";
import { updateConfig } from "lib/services/firebase/room/update/roomConfig";
import { useAuth } from "lib/stores/auth";
import { useRoomStore } from "lib/stores/room";
import type { RoomConfig } from "lib/types/RawDB";
import { pointOptions } from "lib/types/room";
import { RoleType } from "lib/types/user";

import PointWrapper from "./PointWrapper";
import { pointTextColor, pointTextSize } from "./utils";

const CurrentVotesWrapper = () => {
  const wrapperBackgroundColor = useColorModeValue("green.50", "gray.600");
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const toast = useToast();
  const currentUser = useAuth((state) => state.currentUser);
  const { config, showVote, users, estimatePoint } = useRoomStore(
    (state) => ({
      config: state.roomData?.config,
      showVote: state.showVote,
      users: state.users,
      estimatePoint: state.estimatePoint,
    }),
    shallow
  );
  const setEstimatePoint = useRoomStore((action) => action.setEstimatePoint);
  const { isOwner, isObservant } = useUserRole();
  const { averagePoint } = useRoomPoint();
  const { handleFinishVote } = useVote();
  const [isLoadingSubmitVote, setIsLoadingSubmitVote] =
    React.useState<boolean>(false);

  const showAveragePoint = React.useMemo(
    () => showVote && !Number.isNaN(averagePoint),
    [averagePoint, showVote]
  );

  const sortedParticipants = React.useMemo(
    () =>
      users
        .filter((user) =>
          [RoleType.participant, RoleType.owner].includes(user.role)
        )
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
                  roomSelectedHideLabel={config?.hideLabel ?? "monkey"}
                  isCurrentUser={participant.uid === currentUser?.uid}
                  point={participant.point}
                />
              </Text>
            </Grid>
            {participantIndex !== participants.length - 1 && <Divider />}
          </React.Fragment>
        )),
    [currentUser?.uid, config?.hideLabel, showVote, users]
  );

  const handleUpdateFreezeAfterVote = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isOwner) {
      const updatedConfig: Partial<RoomConfig> = {
        isFreezeAfterVote: e.currentTarget.checked,
      };
      await updateConfig(id as string, updatedConfig);
    } else {
      toast({
        title: "Participant/observant cannot change configurations",
        status: "warning",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleUpdateHideLabel = (selectedHideLabel: HideLabelOptionsType) => {
    if (isOwner || isObservant) {
      const updatedConfig: Partial<RoomConfig> = {
        hideLabel: selectedHideLabel,
      };
      updateConfig(id as string, updatedConfig);
    }
  };

  const handleSetEstimate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstimatePoint(Number(e.target.value));
  };

  const handleFinishVoting = async () => {
    setIsLoadingSubmitVote(true);
    await handleFinishVote(estimatePoint);
    setIsLoadingSubmitVote(false);
  };

  return (
    <SpokerWrapperGrid
      display="inline-block"
      gap={4}
      backgroundColor={wrapperBackgroundColor}
      id={CURRENT_VOTE_WRAPPER_ID}
    >
      <Heading size="lg">Current Votes</Heading>

      <Checkbox
        disabled={!isOwner}
        isChecked={config?.isFreezeAfterVote}
        onChange={handleUpdateFreezeAfterVote}
        colorScheme="teal"
        marginY={4}
      >
        freeze after vote
      </Checkbox>

      {(isOwner || isObservant) && (
        <FormControl display="flex" alignItems="center">
          <FormLabel fontSize="sm" width="30%">
            Hide Label
          </FormLabel>
          <Select
            marginBottom={4}
            onChange={(e) =>
              handleUpdateHideLabel(e.target.value as HideLabelOptionsType)
            }
            value={config?.hideLabel ?? "monkey"}
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

      {isOwner && showVote && (
        <Grid
          marginTop={6}
          gap={4}
          padding={2}
          borderColor="orange.400"
          borderWidth={2}
          borderRadius={16}
        >
          <Grid gap={2}>
            <Heading fontSize="md" fontStyle="italic">
              Final Estimate
            </Heading>
            <Text textColor="gray.500" fontSize="xs">
              Select final estimate point and click finish vote to proceed to
              next story in queue.
            </Text>
          </Grid>

          <Grid gap={2} templateColumns="2fr 3fr">
            <Select
              borderRadius={12}
              borderWidth={2}
              borderColor="gray.500"
              value={estimatePoint}
              onChange={handleSetEstimate}
              fontWeight="bold"
            >
              {pointOptions.map((point) => (
                <option value={point} key={point}>
                  {point}
                </option>
              ))}
            </Select>
            <Button
              isLoading={isLoadingSubmitVote}
              disabled={isLoadingSubmitVote}
              colorScheme="teal"
              size="md"
              onClick={handleFinishVoting}
              marginY={-1}
            >
              Finish Vote
            </Button>
          </Grid>
        </Grid>
      )}
    </SpokerWrapperGrid>
  );
};

export default CurrentVotesWrapper;
