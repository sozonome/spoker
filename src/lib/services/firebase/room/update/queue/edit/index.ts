import { rewriteQueue } from '~/lib/services/firebase/room/update/rewriteQueue';

import type { EditQueueItemArgs } from './types';

export const editQueueItem = async ({
  roomId,
  updatedItem,
  selectedQueueIndex,
  queue,
}: EditQueueItemArgs) => {
  if (queue) {
    const updatedQueue = [...queue];
    updatedQueue[selectedQueueIndex] = updatedItem;

    await rewriteQueue(roomId, updatedQueue);
  }
};
