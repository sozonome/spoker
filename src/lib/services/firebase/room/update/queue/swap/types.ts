import type { Task } from '~/lib/types/raw-db';

export type SwapSelectedQueueWithCurrentArgs = {
  roomId: string;
  task: Task;
  selectedQueueIndex: number;
  queue?: Array<Task>;
};
