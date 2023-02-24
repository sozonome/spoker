import type { Task } from '~/lib/types/RawDB';

export type SwapSelectedQueueWithCurrentArgs = {
  roomId: string;
  task: Task;
  selectedQueueIndex: number;
  queue?: Array<Task>;
};
