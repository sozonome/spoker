import type { Task } from '~/lib/types/RawDB';

export type EditQueueItemArgs = {
  roomId: string;
  updatedItem: Task;
  selectedQueueIndex: number;
  queue?: Array<Task>;
};
