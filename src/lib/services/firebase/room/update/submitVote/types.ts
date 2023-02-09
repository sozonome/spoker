import type { PointEntry, Task } from '~/lib/types/RawDB';

export type SubmitVoteArgs = {
  roomId: string;
  task: Task;
  entries: Array<PointEntry>;
  estimate: number;
  queue?: Array<Task>;
  completed?: Array<Task>;
};
