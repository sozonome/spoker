import { rewriteQueue } from '~/lib/services/firebase/room/update/rewriteQueue';

import type { RemoveQueueItemArgs } from './types';

export const removeQueueItem = async ({
  roomId,
  selectedQueueIndex,
  queue,
}: RemoveQueueItemArgs) => {
  if (queue) {
    const updatedQueue = [...queue];
    updatedQueue.splice(selectedQueueIndex, 1);

    await rewriteQueue(roomId, updatedQueue);
  }
};
