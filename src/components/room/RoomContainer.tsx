import {
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import SpokerInput from "components/ui/SpokerInput";
import SpokerRadioBox from "components/ui/SpokerRadioBox";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";

import { AuthContext } from "components/auth/AuthProvider";
import { pointOptions } from "types/room";
import { DUMMY_PARTICIPANTS } from "constants/dummy_data/participants";

const RoomContainer = () => {
  const [busy, setBusy] = useState<boolean>(false);

  const { currentUser } = useContext(AuthContext);
  const [showVote, setShowVote] = useState<boolean>(false);
  const [point, setPoint] = useState<number>();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "vote",
    value: String(point),
    onChange: (value) => {
      setPoint(Number(value));
    },
  });
  const voteOptionGroup = getRootProps();

  const participants = [
    {
      name: currentUser.displayName,
      uid: currentUser.uid,
      point,
    },
    ...DUMMY_PARTICIPANTS,
  ];

  return (
    <Grid gap={8}>
      <SpokerWrapperGrid gap={4}>
        <Heading size="lg">Room Name</Heading>

        <Flex gridGap={4}>
          <Heading size="md">Task</Heading>

          <Grid gap={2} width="full">
            <SpokerInput label="Name" placeholder="Going to Mars" />
            <SpokerInput label="Description" placeholder="Land to Moon first" />
          </Grid>
        </Flex>
      </SpokerWrapperGrid>

      <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap={4}>
        <SpokerWrapperGrid gap={4}>
          <Heading color="teal.600">Vote!</Heading>

          <Flex maxHeight={180} wrap="wrap" gridGap={2} {...voteOptionGroup}>
            {pointOptions.map((voteOption) => {
              const radio = getRadioProps({ value: voteOption });

              return (
                <SpokerRadioBox key={voteOption} {...radio}>
                  {voteOption}
                </SpokerRadioBox>
              );
            })}
          </Flex>
        </SpokerWrapperGrid>

        <SpokerWrapperGrid gap={4}>
          <Heading>Current Votes</Heading>

          <Grid gap={2}>
            {participants.map((participant, participantIndex) => (
              <>
                <Grid templateColumns="2fr 1fr">
                  <Heading size="sm">{participant.name}</Heading>
                  <Text>
                    {showVote || participant.uid === currentUser.uid
                      ? participant.point
                      : "🙊"}
                  </Text>
                </Grid>
                {participantIndex !== participants.length - 1 && <Divider />}
              </>
            ))}
          </Grid>
        </SpokerWrapperGrid>
      </Grid>
    </Grid>
  );
};

export default RoomContainer;
