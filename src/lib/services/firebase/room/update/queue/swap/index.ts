import { clearPoints } from '~/lib/services/firebase/room/update/point/clear';
import { rewriteQueue } from '~/lib/services/firebase/room/update/rewrite-queue';
import { updateRoomTask } from '~/lib/services/firebase/room/update/room-task';

import type { SwapSelectedQueueWithCurrentArgs } from './types';

export const swapSelectedQueueWithCurrent = async ({
  roomId,
  task,
  selectedQueueIndex,
  queue,
}: SwapSelectedQueueWithCurrentArgs) => {
  if (queue) {
    const currentTask = queue[selectedQueueIndex];
    const updatedQueue = [...queue];
    updatedQueue[selectedQueueIndex] = { ...task, lastVoted: null };

    await clearPoints(roomId);
    await updateRoomTask(roomId, currentTask);
    await rewriteQueue(roomId, updatedQueue);
  }
};
