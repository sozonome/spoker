import { Box, Grid, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "lib/components/auth/AuthProvider";
import SpokerLoading from "lib/components/ui/SpokerLoading";
import { roomsData } from "lib/services/firebase/room";
import { RoomInstance } from "lib/types/RawDB";
import { RoomUser } from "lib/types/room";

import ControllerWrapper from "./components/ControllerWrapper";
import CurrentVotesWrapper from "./components/CurrentVotesWrapper";
import RoomHeader from "./components/RoomHeader";
import VoteWrapper from "./components/VoteWrapper";

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

  const participantPoints = showVote
    ? [...users]
        .filter((unfilteredUser) => unfilteredUser.role === "participant")
        .map((user) => user.point ?? 0)
    : [];

  const averagePoint =
    participantPoints.reduce((a, b) => a + b, 0) / participantPoints.length ??
    0;
  const isParticipant =
    (currentUser &&
      roomData?.users?.[currentUser.uid]?.role === "participant") ??
    false;
  const isObservant =
    (currentUser && roomData?.users?.[currentUser.uid]?.role === "observant") ??
    false;

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

  const removeUserFromRoom = async () => {
    if (roomData && currentUser && roomData.users?.[currentUser.uid]) {
      setInRoom(false);
      await roomsData.child(`${id}/users/${currentUser.uid}`).remove();
    }
  };

  useEffect(() => {
    toast.closeAll();
    getRoomData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return currentUser && roomData ? (
    <Grid gap={8}>
      <Head>
        <title>{roomData.room.name} | spoker</title>
      </Head>

      <RoomHeader roomData={roomData} />

      <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap={4}>
        <Grid gap={4}>
          {isParticipant && (
            <VoteWrapper
              roomData={roomData}
              currentUser={currentUser}
              showVote={showVote}
            />
          )}

          <ControllerWrapper users={users} isObservant={isObservant} />
        </Grid>

        <CurrentVotesWrapper
          isObservant={isObservant}
          isParticipant={isParticipant}
          roomData={roomData}
          showVote={showVote}
          averagePoint={averagePoint}
          users={users}
          currentUser={currentUser}
        />
      </Grid>
    </Grid>
  ) : (
    <Box>Error</Box>
  );
};

export default RoomContainer;
