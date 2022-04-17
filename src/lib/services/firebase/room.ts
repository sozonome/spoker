import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { nanoid } from "nanoid";

import type { CreateRoomFormType } from "lib/components/hall/types";
import type {
  PointEntry,
  RoomConfig,
  RoomInstance,
  Task,
} from "lib/types/RawDB";
import type { User } from "lib/types/user";
import { RoleType } from "lib/types/user";

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
    task: {
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
        const mustRemovePoint =
          role !== user.role &&
          [RoleType.observant, RoleType.owner].includes(role);

        await update(snap.ref, {
          name: currentUser?.displayName,
          point: mustRemovePoint ? null : user.point || null,
          role,
          isConnected: true,
        });
      } else {
        await set(child(roomsData, `${roomId}/users/${currentUser?.uid}`), {
          name: currentUser?.displayName,
          role,
          isConnected: true,
        });
      }
    }
  );
};

export const updateRoomTask = async (roomId: string, task: Task) => {
  await update(child(roomsData, `${roomId}/task`), task);
};

export const disconnectUser = async (roomId: string, uid: string) => {
  await update(child(roomsData, `${roomId}/users/${uid}`), {
    isConnected: false,
  });
};

type UpdatePointParams = {
  roomId: string;
  uid: string;
  point: number;
};

export const updatePoint = async (param: UpdatePointParams) => {
  const { roomId, uid, point } = param;
  const currentTime = new Date().toISOString();

  await update(child(roomsData, `${roomId}/users/${uid}`), { point });
  const roomData = await getRoom(roomId);

  if (roomData?.task) {
    const currentUser = await getCurrentUser();
    const updatedTask: Task = {
      ...roomData.task,
      lastVoted: { name: currentUser?.displayName ?? "", time: currentTime },
    };
    await updateRoomTask(roomId, updatedTask);
  }
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

export const rewriteQueue = async (roomId: string, queue: Array<Task>) => {
  await set(child(roomsData, `${roomId}/queue`), queue);
};

export const rewriteCompleted = async (
  roomId: string,
  completed: Array<Task>
) => {
  await set(child(roomsData, `${roomId}/completed`), completed);
};

export const submitVote = async (
  roomId: string,
  task: Task,
  entries: Array<PointEntry>,
  estimate: number,
  queue?: Array<Task>,
  completed?: Array<Task>
) => {
  const votedTask: Task = {
    ...task,
    estimation: estimate,
    pointEntries: entries,
  };

  const randomId = nanoid(21);

  const nextTask = queue?.[0] ?? {
    id: randomId,
    name: "#1 Task",
    description: "Edit Me",
  };
  const updatedQueue = queue?.slice(1) ?? [];
  const updatedCompleted = [votedTask, ...(completed ?? [])];

  await updateRoomTask(roomId, nextTask);
  await rewriteQueue(roomId, updatedQueue);
  await rewriteCompleted(roomId, updatedCompleted);
  await clearPoints(roomId);
};
