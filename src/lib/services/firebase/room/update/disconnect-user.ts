import { child, update } from 'firebase/database';

import { roomsData } from '~/lib/services/firebase/room/common';
import { getRoom } from '~/lib/services/firebase/room/get';

export const disconnectUser = async (roomId: string, uid: string) => {
  const roomData = await getRoom(roomId);
  const userDataInRoom = roomData?.users?.[uid];

  if (userDataInRoom) {
    await update(child(roomsData, `${roomId}/users/${uid}`), {
      isConnected: false,
    });
  }
};
