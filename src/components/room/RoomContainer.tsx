import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  ListItem,
  OrderedList,
  Select,
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
import PointWrapper from "./components/PointWrapper";

import { AuthContext } from "components/auth/AuthProvider";
import {
  clearPoints,
  roomsData,
  updateConfig,
  updatePoint,
  updateRoomTask,
} from "functions/firebase/room";
import { hideLabelOptions, HideLabelOptionsType } from "constants/hideLabel";

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

  const averagePoint = showVote
    ? [...users]
        .filter((unfilteredUser) => unfilteredUser.role === "participant")
        .map((user) => user.point ?? 0)
        .reduce(
          (points, point, index) => (points = (points += point) / (index + 1)),
          0
        )
    : 0;
  const isParticipant =
    currentUser && roomData?.users?.[currentUser.uid]?.role === "participant";
  const isObservant =
    currentUser && roomData?.users?.[currentUser.uid]?.role === "observant";

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
    const roomLink = `${location.protocol}//${location.host}/join/${id}`;
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

  const removeUserFromRoom = async () => {
    if (roomData && currentUser && roomData.users?.[currentUser.uid]) {
      setInRoom(false);
      await roomsData.child(`${id}/users/${currentUser.uid}`).remove();
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
        return "gray.600";
      case "1":
      case "2":
        return "gray.700";
      case "3":
        return "orange.500";
      case "5":
        return "red.600";
      case "8":
      case "13":
      case "20":
      case "40":
      case "60":
      case "80":
      case "100":
        return "red.500";
      default:
        return "gray.900";
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
          {isParticipant && (
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
              {isObservant && (
                <Button colorScheme="red" onClick={handleClearPoints}>
                  Clear
                </Button>
              )}
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
            disabled={isParticipant}
            isChecked={roomData?.config.isFreezeAfterVote}
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
                  <Text as="option" value={hideLabelOption}>
                    {hideLabelOption}
                  </Text>
                ))}
              </Select>
            </FormControl>
          )}

          <Grid gap={2}>
            {showVote && <Text>average: {averagePoint}</Text>}
            {users
              .filter((user) => user.role === "participant")
              .sort((a, b) => (showVote ? (b.point ?? 0) - (a.point ?? 0) : 0))
              .map((participant, participantIndex, participants) => (
                <Fragment key={participantIndex}>
                  <Grid templateColumns="2fr 1fr" alignItems="center">
                    <Heading size="sm">{participant.name}</Heading>
                    <Text
                      fontSize={
                        showVote
                          ? pointTextSize(participant.point ?? 0)
                          : undefined
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
      </Grid>
    </Grid>
  );
};

export default RoomContainer;
