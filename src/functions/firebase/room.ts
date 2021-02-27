import { CreateRoomFormType } from "components/hall/types";
import { RoomInstance, User } from "types/RawDB";
import { RoleType } from "types/room";
import { getCurrentUser } from "./auth";
import { fbase } from "./config";

export const roomsData = fbase.database().ref("rooms");

export const createRoom = async (roomInstance: CreateRoomFormType) => {
  let found: any;

  await roomsData.once("value", (snap) => {
    if (snap.hasChild(roomInstance.id)) {
      found = { message: "room already exists, try another id." };
    }
  });

  if (found?.message) {
    return found;
  } else {
    const newRoom: RoomInstance = {
      room: {
        name: roomInstance.name,
        isPrivate: roomInstance.isPrivate,
        password: roomInstance.isPrivate ? roomInstance.password : undefined,
      },
      config: {
        isFreezeAfterVote: true,
      },
      task: {
        name: "#1 Task",
        description: "Edit Me",
      },
    };

    await roomsData.child(roomInstance.id).set(newRoom);
    return true;
  }
};

export const getRoom = async (roomId: string) => {
  let roomData: RoomInstance | undefined;

  const data = await roomsData.child(roomId).once("value", (snap) => {
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

        await roomsData.child(`${roomId}/users/${currentUser?.uid}`).update({
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
