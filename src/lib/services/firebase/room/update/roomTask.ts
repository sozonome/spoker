import { child, update } from 'firebase/database';

import { roomsData } from '~/lib/services/firebase/room/common';
import type { Task } from '~/lib/types/RawDB';

export const updateRoomTask = async (roomId: string, task: Task) =>
  update(child(roomsData, `${roomId}/task`), task);
