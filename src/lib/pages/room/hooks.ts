import { useToast } from "@chakra-ui/react";
import { child, onDisconnect, onValue } from "firebase/database";
import { useRouter } from "next/router";
import * as React from "react";

import { AuthContext } from "lib/components/auth/AuthProvider";
import { roomsData } from "lib/services/firebase/room/common";
import { rejoinRoom } from "lib/services/firebase/room/rejoin";
import { disconnectUser } from "lib/services/firebase/room/update/disconnectUser";
import { submitVote } from "lib/services/firebase/room/update/submitVote";
import type { PointEntry, RoomInstance } from "lib/types/RawDB";
import type { RoomUser } from "lib/types/room";
import { RoleType } from "lib/types/user";

import {
  checkAllParticipantVoted,
  connectedUsers,
  countAveragePoint,
  filterUserWithPoints,
} from "./utils";

export const useRoom = () => {
  const router = useRouter();
  const toast = useToast();
  const { currentUser } = React.useContext(AuthContext);
  const [busy, setBusy] = React.useState<boolean>(true);
  const [showVote, setShowVote] = React.useState<boolean>(false);
  const [roomData, setRoomData] = React.useState<RoomInstance>();
  const [users, setUsers] = React.useState<Array<RoomUser>>([]);
  const [inRoom, setInRoom] = React.useState<boolean>(true);
  const firstRenderRef = React.useRef(true);

  const {
    query: { id },
  } = router;

  const participantPoints = React.useMemo(() => {
    if (!showVote) {
      return [];
    }
    return filterUserWithPoints(users).map((user) => user.point ?? 0);
  }, [showVote, users]);

  const averagePoint = React.useMemo(() => {
    const filledPoints = participantPoints.filter((point) => point);
    return countAveragePoint(filledPoints);
  }, [participantPoints]);
  const highestPoint = React.useMemo(
    () => participantPoints.sort((a, b) => b - a)[0] ?? 0,
    [participantPoints]
  );
  const userRole = React.useMemo(
    () => currentUser && roomData?.users?.[currentUser.uid]?.role,
    [currentUser, roomData?.users]
  );
  const isParticipant = userRole === RoleType.participant;
  const isObservant = userRole === RoleType.observant;
  const isOwner = userRole === RoleType.owner;

  const handleOnDisconnect = React.useCallback(() => {
    if (currentUser?.uid) {
      onDisconnect(
        child(roomsData, `${id as string}/users/${currentUser.uid}`)
      ).update({
        isConnected: false,
      });
    }
  }, [currentUser?.uid, id]);

  const getRoomData = React.useCallback(async () => {
    onValue(child(roomsData, id as string), (snap) => {
      if (snap.exists()) {
        setRoomData(snap.val());
        handleOnDisconnect();
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
  }, [handleOnDisconnect, id, router, toast]);

  const removeUserFromRoom = async () => {
    if (roomData && currentUser && roomData.users?.[currentUser.uid]) {
      setInRoom(false);
      disconnectUser(id as string, currentUser.uid);
    }
  };

  const handleFinishVote = async (estimate: number) => {
    if (roomData && currentUser && isOwner) {
      const pointEntries: Array<PointEntry> = users.map(
        (user) => ({ name: user.name, point: user.point ?? 0 } as PointEntry)
      );
      await submitVote({
        roomId: id as string,
        task: roomData.task,
        entries: pointEntries,
        estimate,
        queue: roomData.queue,
        completed: roomData.completed,
      });
    }
  };

  const handleRejoin = React.useCallback(async () => {
    await rejoinRoom(id as string, userRole);
  }, [id, userRole]);

  React.useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      toast.closeAll();
      getRoomData();
    }
  }, [getRoomData, toast]);

  React.useEffect(() => {
    if (roomData?.task.lastVoted?.name) {
      toast({
        description: `${roomData.task.lastVoted.name} just voted`,
        status: "info",
        position: "bottom-right",
      });
    }
  }, [roomData?.task.lastVoted?.name, roomData?.task.lastVoted?.time, toast]);

  React.useEffect(() => {
    if (roomData && currentUser && inRoom) {
      if (roomData.users?.[currentUser.uid]) {
        setBusy(false);
        const updatedUsers: Array<RoomUser> = connectedUsers(roomData.users);

        const isAllParticipantVoted = checkAllParticipantVoted(updatedUsers);

        setShowVote(isAllParticipantVoted);
        setUsers(updatedUsers);
        return;
      }

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
  }, [roomData, inRoom, currentUser, router, id, toast]);

  React.useEffect(() => {
    const inRoomDisconnected =
      roomData &&
      currentUser &&
      inRoom &&
      currentUser &&
      roomData.users?.[currentUser?.uid] &&
      !roomData.users?.[currentUser.uid]?.isConnected;

    if (inRoomDisconnected) {
      handleRejoin();
    }
  }, [currentUser, handleRejoin, inRoom, roomData, roomData?.users]);

  React.useEffect(() => {
    router.events.on("routeChangeStart", removeUserFromRoom);
    return () => {
      router.events.off("routeChangeStart", removeUserFromRoom);
    };
  });

  return {
    currentUser,
    busy,
    showVote,
    roomData,
    users,
    averagePoint,
    highestPoint,
    isParticipant,
    isObservant,
    isOwner,
    handleFinishVote,
  };
};
