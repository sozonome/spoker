import type { Task } from '~/lib/types/raw-db';

export type EditQueueItemArgs = {
  roomId: string;
  updatedItem: Task;
  selectedQueueIndex: number;
  queue?: Array<Task>;
};
