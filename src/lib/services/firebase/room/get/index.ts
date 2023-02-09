import { child, get } from 'firebase/database';

import { roomsData } from '~/lib/services/firebase/room/common';
import type { RoomInstance } from '~/lib/types/RawDB';

export const getRoom = async (roomId: string) => {
  let roomData: RoomInstance | undefined;

  await get(child(roomsData, roomId)).then((snap) => {
    if (snap.exists()) {
      roomData = snap.val();
    }
  });

  return roomData;
};
