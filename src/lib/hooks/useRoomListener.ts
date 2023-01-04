import { useToast } from "@chakra-ui/react";
import { child, onDisconnect, onValue } from "firebase/database";
import isNil from "lodash-es/isNil";
import { useRouter } from "next/router";
import * as React from "react";
import { useReward } from "react-rewards";
import shallow from "zustand/shallow";

import { CURRENT_VOTE_WRAPPER_ID } from "lib/constants/wrapperkeys";
import { roomsData } from "lib/services/firebase/room/common";
import { rejoinRoom } from "lib/services/firebase/room/rejoin";
import { disconnectUser } from "lib/services/firebase/room/update/disconnectUser";
import { useAuth } from "lib/stores/auth";
import { useRoomStore } from "lib/stores/room";
import type { RoomInstance } from "lib/types/RawDB";
import type { RoomUser } from "lib/types/room";
import {
  checkAllParticipantVoted,
  connectedUsers,
  filterUserWithPoints,
} from "lib/utils/roomUtils";

import { useUserRole } from "./useUserRole";

export const useRoomListener = () => {
  const router = useRouter();
  const toast = useToast();
  const { reward } = useReward(CURRENT_VOTE_WRAPPER_ID, "confetti");

  const currentUser = useAuth((state) => state.currentUser);
  const { roomData, inRoom } = useRoomStore(
    (state) => ({
      roomData: state.roomData,
      inRoom: state.inRoom,
    }),
    shallow
  );
  const { userRole } = useUserRole();
  const {
    setIsBusy,
    setShowVote,
    setRoomData,
    setUsers,
    setInRoom,
    setEstimatePoint,
    setTaskName,
    setTaskDescription,
  } = useRoomStore(
    (action) => ({
      setIsBusy: action.setIsBusy,
      setShowVote: action.setShowVote,
      setRoomData: action.setRoomData,
      setUsers: action.setUsers,
      setInRoom: action.setInRoom,
      setEstimatePoint: action.setEstimatePoint,
      setTaskName: action.setTaskName,
      setTaskDescription: action.setTaskDescription,
    }),
    shallow
  );

  const {
    query: { id },
  } = router;
  const firstRenderRef = React.useRef(true);

  const handleOnDisconnect = React.useCallback(() => {
    if (currentUser?.uid) {
      onDisconnect(
        child(roomsData, `${id as string}/users/${currentUser.uid}`)
      ).update({
        isConnected: false,
      });
    }
  }, [currentUser?.uid, id]);

  const isInRoomDisconnected = React.useMemo(
    () =>
      roomData &&
      inRoom &&
      currentUser &&
      roomData.users?.[currentUser?.uid] &&
      !roomData.users?.[currentUser.uid]?.isConnected,
    [currentUser, inRoom, roomData]
  );

  const handleRejoin = React.useCallback(async () => {
    if (!isInRoomDisconnected) {
      return;
    }
    await rejoinRoom(id as string, userRole);
    setInRoom(true);
  }, [id, isInRoomDisconnected, setInRoom, userRole]);

  const handleUpdateTask = React.useCallback(() => {
    if (!isNil(roomData?.task.name)) {
      setTaskName(roomData?.task.name ?? "");
    }

    if (!isNil(roomData?.task.description)) {
      setTaskDescription(roomData?.task.description ?? "");
    }
  }, [
    roomData?.task.description,
    roomData?.task.name,
    setTaskDescription,
    setTaskName,
  ]);

  const showLastVoteToast = React.useCallback(
    (updatedRoomData: RoomInstance) => {
      if (
        updatedRoomData?.task.lastVoted?.name &&
        !toast.isActive(`${updatedRoomData.task.lastVoted.name}-vote`)
      ) {
        toast({
          id: `${updatedRoomData.task.lastVoted.name}-vote`,
          description: `${updatedRoomData.task.lastVoted.name} just voted`,
          status: "info",
          position: "bottom-right",
        });
      }
    },
    [toast]
  );

  const updateRoomStore = React.useCallback(
    (updatedRoomData: RoomInstance) => {
      if (!(updatedRoomData && currentUser && inRoom)) {
        return;
      }

      if (!updatedRoomData.users?.[currentUser.uid]) {
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
        return;
      }

      setIsBusy(false);
      const updatedUsers: Array<RoomUser> = connectedUsers(
        updatedRoomData.users
      );
      const isAllParticipantVoted = checkAllParticipantVoted(updatedUsers);
      setShowVote(isAllParticipantVoted);
      setUsers(updatedUsers);
      const highestPoint =
        filterUserWithPoints(updatedUsers)
          .map((user) => user.point ?? 0)
          .sort((a, b) => b - a)[0] ?? 0;

      if (isAllParticipantVoted) {
        setEstimatePoint(highestPoint);
        reward();
      }

      showLastVoteToast(updatedRoomData);
      handleUpdateTask();
      handleRejoin();
    },
    [
      currentUser,
      handleRejoin,
      handleUpdateTask,
      id,
      inRoom,
      reward,
      router,
      setEstimatePoint,
      setIsBusy,
      setShowVote,
      setUsers,
      showLastVoteToast,
      toast,
    ]
  );

  const getRoomData = React.useCallback(async () => {
    setInRoom(true);
    onValue(child(roomsData, id as string), (snap) => {
      if (snap.exists()) {
        setRoomData(snap.val());
        updateRoomStore(snap.val());
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
  }, [
    handleOnDisconnect,
    id,
    router,
    setInRoom,
    setRoomData,
    toast,
    updateRoomStore,
  ]);

  const removeUserFromRoom = async () => {
    if (roomData && currentUser && roomData.users?.[currentUser.uid]) {
      setInRoom(false);
      disconnectUser(id as string, currentUser.uid);
    }
  };

  React.useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      toast.closeAll();
      getRoomData();
    }
  }, [getRoomData, toast]);

  React.useEffect(() => {
    router.events.on("routeChangeStart", removeUserFromRoom);
    return () => {
      router.events.off("routeChangeStart", removeUserFromRoom);
    };
  });
};
