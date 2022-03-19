import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { nanoid } from "nanoid";

import type { CreateRoomFormType } from "lib/components/hall/types";
import type { RoomConfig, RoomInstance, TaskEntry } from "lib/types/RawDB";
import type { RoleType, User } from "lib/types/user";

import { getCurrentUser } from "./auth";
import { fbase } from "./config";

const database = getDatabase(fbase);

export const roomsData = ref(database, "rooms");

export const createRoom = async (roomInstance: CreateRoomFormType) => {
  await get(roomsData).then((snap) => {
    if (snap.hasChild(roomInstance.id)) {
      throw Error("room already exists, try another id.");
    }
  });

  const randomId = nanoid(21);

  const newRoom: RoomInstance = {
    room: {
      name: roomInstance.name,
      isPrivate: roomInstance.isPrivate,
      password: roomInstance.isPrivate ? roomInstance.password : "",
    },
    active: {
      id: randomId,
      name: "#1 Task",
      description: "Edit Me",
    },
    queue: [],
    completed: [],
    selectedTaskIndex: -1,
    config: {
      isFreezeAfterVote: true,
      hideLabel: "monkey",
    },
  };

  await set(child(roomsData, roomInstance.id), newRoom);
  return true;
};

export const getRoom = async (roomId: string) => {
  let roomData: RoomInstance | undefined;

  await get(child(roomsData, roomId)).then((snap) => {
    if (snap.exists()) {
      roomData = snap.val();
    }
  });

  return roomData;
};

export const joinRoom = async (roomId: string, role: RoleType) => {
  const currentUser = getCurrentUser();

  await get(child(roomsData, `${roomId}/users/${currentUser?.uid}`)).then(
    async (snap) => {
      if (snap.exists()) {
        const user: User = snap.val();
        const mustRemovePoint = role !== user.role && role === "observant";

        await update(snap.ref, {
          point: mustRemovePoint ? null : user.point || null,
          role,
        });
      } else {
        await set(child(roomsData, `${roomId}/users/${currentUser?.uid}`), {
          name: currentUser?.displayName,
          role,
        });
      }
    }
  );
};

export const updateRoomTask = async (roomId: string, activeTask: TaskEntry) => {
  await update(child(roomsData, `${roomId}/active`), activeTask);
};

type UpdatePointParams = {
  roomId: string;
  uid: string;
  point: number;
};

export const updatePoint = async (param: UpdatePointParams) => {
  const { roomId, uid, point } = param;

  await update(child(roomsData, `${roomId}/users/${uid}`), { point });
};

export const clearPoints = async (roomId: string) => {
  await get(child(roomsData, `${roomId}/users`)).then((snap) => {
    if (snap.exists()) {
      snap.forEach((user) => {
        update(user.ref, {
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
  await update(child(roomsData, `${roomId}/config`), config);
};
