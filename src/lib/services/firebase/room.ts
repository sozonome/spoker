import type { CreateRoomFormType } from "lib/components/hall/types";
import type { RoomConfig, RoomInstance, Task } from "lib/types/RawDB";
import type { RoleType, User } from "lib/types/user";

import { getCurrentUser } from "./auth";
import { fbase } from "./config";

export const roomsData = fbase.database().ref("rooms");

export const createRoom = async (roomInstance: CreateRoomFormType) => {
  await roomsData.once("value", (snap) => {
    if (snap.hasChild(roomInstance.id)) {
      throw Error("room already exists, try another id.");
    }
  });

  const newRoom: RoomInstance = {
    room: {
      name: roomInstance.name,
      isPrivate: roomInstance.isPrivate,
      password: roomInstance.isPrivate ? roomInstance.password : "",
    },
    config: {
      isFreezeAfterVote: true,
      hideLabel: "monkey",
    },
    task: {
      name: "#1 Task",
      description: "Edit Me",
    },
  };

  await roomsData.child(roomInstance.id).set(newRoom);
  return true;
};

export const getRoom = async (roomId: string) => {
  let roomData: RoomInstance | undefined;

  await roomsData.child(roomId).once("value", (snap) => {
    if (snap.exists()) {
      roomData = snap.val();
    }
  });

  return roomData;
};

export const joinRoom = async (roomId: string, role: RoleType) => {
  const currentUser = getCurrentUser();

  await roomsData
    .child(`${roomId}/users/${currentUser?.uid}`)
    .once("value", async (snap) => {
      if (snap.exists()) {
        const user: User = snap.val();
        const mustRemovePoint = role !== user.role && role === "observant";

        await snap.ref.update({
          point: mustRemovePoint ? null : user.point || null,
          role,
        });
      } else {
        await roomsData.child(`${roomId}/users/${currentUser?.uid}`).set({
          name: currentUser?.displayName,
          role,
        });
      }
    });
};

export const updateRoomTask = async (roomId: string, task: Task) => {
  await roomsData.child(`${roomId}/task`).update(task);
};

type UpdatePointParams = {
  roomId: string;
  uid: string;
  point: number;
};

export const updatePoint = async (param: UpdatePointParams) => {
  const { roomId, uid, point } = param;

  await roomsData.child(`${roomId}/users/${uid}`).update({ point });
};

export const clearPoints = async (roomId: string) => {
  await roomsData.child(`${roomId}/users`).once("value", (snap) => {
    if (snap.exists()) {
      snap.forEach((child) => {
        child.ref.update({
          point: null,
        });
      });
    }
  });
};

export const updateConfig = async (
  roomId: string,
  config: Partial<RoomConfig>
) => {
  await roomsData.child(`${roomId}/config`).update(config);
};
