import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";
import { useState } from "react";

import SpokerInput from "components/ui/SpokerInput";
import SpokerRadioBox from "components/ui/SpokerRadioBox";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";

const DUMMY_PARTICIPANTS = [
  {
    name: "Nathan",
    point: 5,
  },
  {
    name: "Wang",
    point: 3,
  },
  {
    name: "Fay",
    point: 2,
  },
];

const RoomContainer = () => {
  const [busy, setBusy] = useState<boolean>(false);

  const voteOptions = [0, 0.5, 1, 2, 3, 5, 8, 13, 21];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "vote",
    defaultValue: 1,
    value: 1,
    onChange: console.log,
  });
  const voteOptionGroup = getRootProps();

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

          <Flex wrap="wrap" gridGap={2} {...voteOptionGroup}>
            {voteOptions.map((voteOption) => {
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
            {DUMMY_PARTICIPANTS.map((participant, participantIndex) => (
              <>
                <Grid templateColumns="2fr 1fr">
                  <Heading size="sm">{participant.name}</Heading>
                  <Text>{participant.point}</Text>
                </Grid>
                {participantIndex !== DUMMY_PARTICIPANTS.length - 1 && (
                  <Divider />
                )}
              </>
            ))}
          </Grid>
        </SpokerWrapperGrid>
      </Grid>
    </Grid>
  );
};

export default RoomContainer;
