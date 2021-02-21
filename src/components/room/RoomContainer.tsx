import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Heading,
  ListItem,
  OrderedList,
  Spacer,
  Text,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BiShareAlt, BiLink } from "react-icons/bi";

import SpokerInput from "components/ui/SpokerInput";
import SpokerRadioBox from "components/ui/SpokerRadioBox";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";

import { AuthContext } from "components/auth/AuthProvider";
import { pointOptions } from "types/room";
import { DUMMY_PARTICIPANTS } from "constants/dummy_data/participants";
import Head from "next/head";

const RoomContainer = () => {
  const { currentUser } = useContext(AuthContext);
  const [busy, setBusy] = useState<boolean>(false);
  const [showVote, setShowVote] = useState<boolean>(false);
  const [point, setPoint] = useState<number>();
  const [isFreezeAfterVote, setIsFreezeAfterVote] = useState<boolean>(true);

  const router = useRouter();
  const {
    query: { id },
  } = router;
  const toast = useToast();
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

  const handleCopyRoomLink = () => {
    navigator.clipboard.writeText(
      `${location.protocol}://${location.host}/join/${id}`
    );

    toast({
      title: "Room Link Copied!",
      status: "success",
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Grid gap={8}>
      <Head>
        <title>Room Name | spoker</title>
      </Head>

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
        <Grid gap={4}>
          <SpokerWrapperGrid gap={4}>
            <Heading color="teal.600">Vote!</Heading>

            <Flex wrap="wrap" gridGap={2} {...voteOptionGroup}>
              {pointOptions.map((voteOption) => {
                const radio = getRadioProps({ value: voteOption });

                return (
                  <SpokerRadioBox key={voteOption} {...radio}>
                    {voteOption}
                  </SpokerRadioBox>
                );
              })}
            </Flex>
            <Spacer />
          </SpokerWrapperGrid>

          <SpokerWrapperGrid gap={4}>
            <Heading>Controller</Heading>

            <Flex gridGap={2} wrap="wrap">
              <Button colorScheme="red">Clear</Button>
              <Button colorScheme="orange">Rejoin</Button>
            </Flex>

            <Box>
              <Button
                leftIcon={<BiShareAlt />}
                rightIcon={<BiLink />}
                colorScheme="blue"
                onClick={handleCopyRoomLink}
              >
                Copy Invite Link
              </Button>
            </Box>

            <Flex wrap="wrap" gridGap={2}>
              <Heading size="sm">Current Users: </Heading>
              <OrderedList spacing={1}>
                {participants.map((participant) => (
                  <ListItem>{participant.name}</ListItem>
                ))}
              </OrderedList>
            </Flex>
          </SpokerWrapperGrid>
        </Grid>

        <SpokerWrapperGrid display="inline-block" gap={4}>
          <Heading>Current Votes</Heading>

          <Checkbox
            checked={isFreezeAfterVote}
            onChange={(e) => {
              // replace this with firebase function
              setIsFreezeAfterVote(Boolean(e.target.value));
            }}
            colorScheme="teal"
            marginY={4}
          >
            freeze after vote
          </Checkbox>

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

          <Spacer />
        </SpokerWrapperGrid>
      </Grid>
    </Grid>
  );
};

export default RoomContainer;
