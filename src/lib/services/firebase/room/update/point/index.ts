import { child, update } from 'firebase/database';

import { getCurrentUser } from '~/lib/services/firebase/auth/get-current-user';
import { roomsData } from '~/lib/services/firebase/room/common';
import { getRoom } from '~/lib/services/firebase/room/get';
import { updateRoomTask } from '~/lib/services/firebase/room/update/room-task';
import type { Task } from '~/lib/types/raw-db';

import type { UpdatePointParams } from './types';

export const updatePoint = async (param: UpdatePointParams) => {
  const { roomId, uid, point } = param;
  const currentTime = new Date().toISOString();

  await update(child(roomsData, `${roomId}/users/${uid}`), { point });
  const roomData = await getRoom(roomId);

  if (roomData?.task) {
    const currentUser = getCurrentUser();
    const updatedTask: Task = {
      ...roomData.task,
      lastVoted: { name: currentUser?.displayName ?? '', time: currentTime },
    };
    await updateRoomTask(roomId, updatedTask);
  }
};
