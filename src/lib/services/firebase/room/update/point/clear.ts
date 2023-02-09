import { child, get, update } from 'firebase/database';

import { roomsData } from '~/lib/services/firebase/room/common';

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
