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
import { ChangeEvent, Fragment, useContext, useEffect, useState } from "react";
import { BiShareAlt, BiLink } from "react-icons/bi";

import SpokerInput from "components/ui/SpokerInput";
import SpokerRadioBox from "components/ui/SpokerRadioBox";
import SpokerWrapperGrid from "components/ui/SpokerWrapperGrid";
import SpokerLoading from "components/ui/SpokerLoading";

import { AuthContext } from "components/auth/AuthProvider";
import {
  clearPoints,
  roomsData,
  updateConfig,
  updatePoint,
  updateRoomTask,
} from "functions/firebase/room";

import { pointOptions, RoomUser } from "types/room";
import { RoomConfig, RoomInstance, Task } from "types/RawDB";

const RoomContainer = () => {
  const { currentUser } = useContext(AuthContext);
  const [busy, setBusy] = useState<boolean>(true);
  const [showVote, setShowVote] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<RoomInstance>();
  const [users, setUsers] = useState<Array<RoomUser>>([]);
  const [inRoom, setInRoom] = useState<boolean>(true);

  const router = useRouter();
  const {
    query: { id },
  } = router;
  const toast = useToast();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "vote",
    value: currentUser && String(roomData?.users?.[currentUser.uid]?.point),
    onChange: (value) => {
      handleUpdatePoint(Number(value));
    },
  });
  const voteOptionGroup = getRootProps();

  const getRoomData = async () => {
    roomsData.child(id as string).on("value", (snap) => {
      if (snap.exists()) {
        setRoomData(snap.val());
        snap.ref.child(`users/${currentUser?.uid}`).onDisconnect().remove();
      } else {
        router.push("/");
        toast({
          title: "This room doesn't exist",
          status: "error",
          position: "top-right",
          isClosable: true,
        });
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

  const handleUpdateTask = (field: keyof Task) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (roomData) {
      const updatedTask: Task = {
        ...roomData.task,
        [field]: event.target.value,
      };
      updateRoomTask(id as string, updatedTask);
    }
  };

  const handleUpdatePoint = (point: number) => {
    if (currentUser && !(roomData?.config.isFreezeAfterVote && showVote)) {
      updatePoint({ uid: currentUser.uid, point, roomId: id as string });
    }
  };

  const handleClearPoints = () => {
    clearPoints(id as string);
  };

  const handleUpdateConfig = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedConfig: RoomConfig = {
      isFreezeAfterVote: e.currentTarget.checked,
    };
    updateConfig(id as string, updatedConfig);
  };

  const removeUserFromRoom = async () => {
    if (roomData && currentUser && roomData.users?.[currentUser.uid]) {
      setInRoom(false);
      await roomsData.child(`${id}/users/${currentUser.uid}`).remove();
    }
  };

  useEffect(() => {
    toast.closeAll();
    getRoomData();
  }, []);

  useEffect(() => {
    if (roomData && currentUser && inRoom) {
      if (roomData.users?.[currentUser.uid]) {
        setBusy(false);
        const updatedUsers: Array<RoomUser> = Object.entries(
          roomData.users
        ).map((a) => ({
          uid: a[0],
          ...a[1],
        }));

        const hello = updatedUsers
          .filter((user) => user.role === "participant")
          .map((user) => user.point ?? "empty");

        setShowVote(hello.indexOf("empty") < 0);
        setUsers(updatedUsers);
      } else {
        router.push(`/join/${id}`);
        toast({
          status: "warning",
          title: "You haven't pick any role yet",
          description:
            "Either you haven't join the room before or rejoin or disconnected / refreshed the page",
          position: "top-right",
          duration: 15000,
          isClosable: true,
        });
      }
    }
  }, [roomData, inRoom]);

  useEffect(() => {
    router.events.on("routeChangeStart", removeUserFromRoom);
    return () => {
      router.events.off("routeChangeStart", removeUserFromRoom);
    };
  });

  if (busy) {
    return <SpokerLoading />;
  }

  return (
    <Grid gap={8}>
      <Head>
        <title>{roomData?.room.name} | spoker</title>
      </Head>

      <SpokerWrapperGrid gap={4}>
        <Heading size="lg">{roomData?.room.name}</Heading>

        <Flex gridGap={4}>
          <Heading size="md">Task</Heading>

          <Grid gap={2} width="full">
            <SpokerInput
              label="Name"
              value={roomData?.task.name}
              onChange={handleUpdateTask("name")}
              placeholder="Going to Mars"
            />
            <SpokerInput
              label="Description"
              value={roomData?.task.description}
              onChange={handleUpdateTask("description")}
              placeholder="Land to Moon first"
            />
          </Grid>
        </Flex>
      </SpokerWrapperGrid>

      <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap={4}>
        <Grid gap={4}>
          {currentUser &&
            roomData?.users?.[currentUser.uid]?.role === "participant" && (
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
            )}

          <SpokerWrapperGrid gap={4}>
            <Heading>Controller</Heading>

            <Flex gridGap={2} wrap="wrap">
              <Button colorScheme="red" onClick={handleClearPoints}>
                Clear
              </Button>
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
            onChange={handleUpdateConfig}
            colorScheme="teal"
            marginY={4}
          >
            freeze after vote
          </Checkbox>

          <Grid gap={2}>
            {users
              .filter((user) => user.role === "participant")
              .map((participant, participantIndex, participants) => (
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
