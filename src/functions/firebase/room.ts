import { getCurrentUser } from "./auth";
import { fbase } from "./config";

export const roomsData = fbase.database().ref("rooms");

export const createRoom = async (roomConfig) => {
  const user = getCurrentUser();
  roomsData.once("value", (snap) => {
    if (snap.hasChild(roomConfig.id)) {
    }
  });
};

export const findRoom = (roomId: string) => {};
