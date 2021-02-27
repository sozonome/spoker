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
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { BiShareAlt, BiLink } from "react-icons/bi";

import SpokerInput from "components/ui/SpokerInput";
import SpokerRadioBox from "components/ui/SpokerRadioBox";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import SpokerLoading from "components/ui/SpokerLoading";

import { AuthContext } from "components/auth/AuthProvider";
import { DUMMY_PARTICIPANTS } from "constants/dummy_data/participants";
import { roomsData } from "functions/firebase/room";

import { pointOptions, RoomUser } from "types/room";
import { RoomInstance } from "types/RawDB";

const RoomContainer = () => {
  const { currentUser } = useContext(AuthContext);
  const [busy, setBusy] = useState<boolean>(true);
  const [showVote, setShowVote] = useState<boolean>(false);
  const [point, setPoint] = useState<number>();
  const [isFreezeAfterVote, setIsFreezeAfterVote] = useState<boolean>(true);
  const [roomData, setRoomData] = useState<RoomInstance>();
  const [users, setUsers] = useState<Array<RoomUser>>([]);

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
      name: currentUser?.displayName,
      uid: currentUser?.uid,
      point,
    },
    ...DUMMY_PARTICIPANTS,
  ];

  const getRoomData = async () => {
    roomsData.child(id as string).on("value", (snap) => {
      if (snap.exists()) {
        setRoomData(snap.val());
      }
    });
  };

  const handleCopyRoomLink = () => {
    const roomLink = `${location.protocol}://${location.host}/join/${id}`;
    navigator.clipboard.writeText(roomLink);

    toast({
      title: `Room Link Copied!\n${roomLink}`,
      status: "success",
      isClosable: true,
      position: "top-right",
    });
  };

  useEffect(() => {
    getRoomData();
  }, []);

  useEffect(() => {
    if (roomData) {
      setBusy(false);

      if (roomData.users) {
        const updatedUsers: Array<RoomUser> = Object.entries(
          roomData.users
        ).map((a) => ({
          uid: a[0],
          ...a[1],
        }));

        setUsers(updatedUsers);
      }
    }
  }, [roomData]);

  if (busy) {
    return <SpokerLoading />;
  }

  return (
    <Grid gap={8}>
      <Head>
        <title>Room Name | spoker</title>
      </Head>
      {console.log({ roomData })}

      <SpokerWrapperGrid gap={4}>
        <Heading size="lg">{roomData?.room.name}</Heading>

        <Flex gridGap={4}>
          <Heading size="md">Task</Heading>

          <Grid gap={2} width="full">
            <SpokerInput
              label="Name"
              value={roomData?.task.name}
              onChange={() => {}}
              placeholder="Going to Mars"
            />
            <SpokerInput
              label="Description"
              value={roomData?.task.description}
              onChange={() => {}}
              placeholder="Land to Moon first"
            />
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
              <Button
                colorScheme="orange"
                onClick={() => router.push(`/join/${id}`)}
              >
                Rejoin
              </Button>
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
                {users.map((user, userIndex) => (
                  <ListItem key={userIndex}>{user.name}</ListItem>
                ))}
              </OrderedList>
            </Flex>
          </SpokerWrapperGrid>
        </Grid>

        <SpokerWrapperGrid display="inline-block" gap={4}>
          <Heading>Current Votes</Heading>

          <Checkbox
            isChecked={roomData?.config.isFreezeAfterVote}
            onChange={(e) => {
              // replace this with firebase function
              setIsFreezeAfterVote(!isFreezeAfterVote);
            }}
            colorScheme="teal"
            marginY={4}
          >
            freeze after vote
          </Checkbox>

          <Grid gap={2}>
            {users
              .filter((user) => user.role === "participant")
              .map((participant, participantIndex) => (
                <Fragment key={participantIndex}>
                  <Grid templateColumns="2fr 1fr">
                    <Heading size="sm">{participant.name}</Heading>
                    <Text>
                      {showVote || participant.uid === currentUser?.uid
                        ? participant.point
                        : "🙊"}
                    </Text>
                  </Grid>
                  {participantIndex !== participants.length - 1 && <Divider />}
                </Fragment>
              ))}
          </Grid>

          <Spacer />
        </SpokerWrapperGrid>
      </Grid>
    </Grid>
  );
};

export default RoomContainer;
