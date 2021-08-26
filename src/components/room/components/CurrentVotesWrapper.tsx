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
import { useRouter } from "next/router";
import { ChangeEvent, Fragment } from "react";

import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import PointWrapper from "./PointWrapper";

import { updateConfig } from "functions/firebase/room";
import { hideLabelOptions, HideLabelOptionsType } from "constants/hideLabel";

import { RoomConfig, RoomInstance } from "types/RawDB";
import { RoomUser } from "types/room";

type CurrentVotesWrapperProps = {
  isObservant: boolean;
  isParticipant: boolean;
  roomData: RoomInstance;
  showVote: boolean;
  averagePoint: number;
  users: Array<RoomUser>;
  currentUser: firebase.default.User;
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

  const handleUpdateFreezeAfterVote = (e: ChangeEvent<HTMLInputElement>) => {
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

  const pointTextSize = (point: number) => {
    switch (point.toString()) {
      case "0":
      case "0.5":
      case "1":
        return "1rem";
      case "2":
        return "1.2rem";
      case "3":
        return "1.4rem";
      case "5":
        return "2rem";
      case "8":
      case "13":
        return "3rem";
      case "20":
      case "40":
      case "60":
      case "80":
      case "100":
        return "4rem";
      default:
        return "1rem";
    }
  };

  const pointTextColor = (point: number) => {
    switch (point.toString()) {
      case "0":
      case "0.5":
      case "1":
      case "2":
        return undefined;
      case "3":
        return "orange";
      case "5":
      case "8":
      case "13":
      case "20":
      case "40":
      case "60":
      case "80":
      case "100":
        return "red";
      default:
        return undefined;
    }
  };

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
        {showVote && !isNaN(averagePoint) && (
          <Text>average: {averagePoint}</Text>
        )}
        {users
          .filter((user) => user.role === "participant")
          .sort((a, b) => (showVote ? (b.point ?? 0) - (a.point ?? 0) : 0))
          .map((participant, participantIndex, participants) => (
            <Fragment key={participantIndex}>
              <Grid templateColumns="2fr 1fr" alignItems="center">
                <Heading size="sm">{participant.name}</Heading>
                <Text
                  fontSize={
                    showVote ? pointTextSize(participant.point ?? 0) : undefined
                  }
                  textColor={
                    showVote
                      ? pointTextColor(participant.point ?? 0)
                      : undefined
                  }
                >
                  <PointWrapper
                    showVote={showVote}
                    roomSelectedHideLabel={
                      roomData?.config.hideLabel ?? "monkey"
                    }
                    isCurrentUser={participant.uid === currentUser?.uid}
                    point={participant.point}
                  />
                </Text>
              </Grid>
              {participantIndex !== participants.length - 1 && <Divider />}
            </Fragment>
          ))}
      </Grid>

      <Spacer />
    </SpokerWrapperGrid>
  );
};

export default CurrentVotesWrapper;
