import type { PointEntry, Task } from '~/lib/types/raw-db';

export type SubmitVoteArgs = {
  roomId: string;
  task: Task;
  entries: Array<PointEntry>;
  estimate: number;
  queue?: Array<Task>;
  completed?: Array<Task>;
};
