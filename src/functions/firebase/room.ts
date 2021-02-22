import { CreateRoomFormType } from "components/hall/types";
import { RoomInstance } from "types/RawDB";
import { RoleType } from "types/room";
import { getCurrentUser } from "./auth";
import { fbase } from "./config";

export const roomsData = fbase.database().ref("rooms");

export const createRoom = async (roomInstance: CreateRoomFormType) => {
  let found;

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
        password: roomInstance.isPrivate ? roomInstance.password : null,
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

export const findRoom = async (roomId: string) => {
  let roomData: RoomInstance;
  await roomsData.child(roomId).once("value", (snap) => {
    if (snap.exists()) {
      roomData = snap.val();
    }
  });

  return roomData;
};

export const joinRoom = async (roomId: string, role: RoleType) => {
  const currentUser = getCurrentUser();
  const oppositeRole: RoleType =
    role === "participants" ? "observants" : "participants";

  await roomsData.child(roomId).once("value", async (snap) => {
    if (snap.exists()) {
      await roomsData
        .child(`${roomId}/${oppositeRole}/${currentUser.uid}`)
        .once("value", async (snapUser) => {
          if (snapUser.exists()) {
            await roomsData
              .child(`${roomId}/${oppositeRole}/${currentUser.uid}`)
              .set(null);
          }
          await roomsData
            .child(`${roomId}/${role}/${currentUser.uid}`)
            .set({ name: currentUser.displayName });
        });
    }
  });
};
