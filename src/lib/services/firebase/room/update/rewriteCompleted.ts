import { child, set } from 'firebase/database';

import { roomsData } from '~/lib/services/firebase/room/common';
import type { Task } from '~/lib/types/RawDB';

export const rewriteCompleted = async (
  roomId: string,
  completed: Array<Task>
) => set(child(roomsData, `${roomId}/completed`), completed);
