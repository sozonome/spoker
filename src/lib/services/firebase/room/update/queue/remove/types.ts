import type { Task } from '~/lib/types/RawDB';

export type RemoveQueueItemArgs = {
  roomId: string;
  selectedQueueIndex: number;
  queue?: Array<Task>;
};
