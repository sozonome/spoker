import { child, get, set, update } from 'firebase/database';

import { getCurrentUser } from '~/lib/services/firebase/auth/get-current-user';
import { roomsData } from '~/lib/services/firebase/room/common';
import type { User } from '~/lib/types/user';
import { RoleType } from '~/lib/types/user';

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
