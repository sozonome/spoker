import type { Task } from '~/lib/types/raw-db';

export type RemoveQueueItemArgs = {
  roomId: string;
  selectedQueueIndex: number;
  queue?: Array<Task>;
};
