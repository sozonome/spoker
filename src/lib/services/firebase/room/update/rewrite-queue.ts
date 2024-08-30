import { child, set } from 'firebase/database';

import { roomsData } from '~/lib/services/firebase/room/common';
import type { Task } from '~/lib/types/raw-db';

export const rewriteQueue = async (roomId: string, queue: Array<Task>) =>
  set(child(roomsData, `${roomId}/queue`), queue);
