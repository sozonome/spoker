import { child, update } from "firebase/database";

import { roomsData } from "lib/services/firebase/room/common";

export const disconnectUser = async (roomId: string, uid: string) =>
  update(child(roomsData, `${roomId}/users/${uid}`), {
    isConnected: false,
  });
