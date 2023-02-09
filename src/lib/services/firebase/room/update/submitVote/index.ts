import { nanoid } from 'nanoid';

import { clearPoints } from '~/lib/services/firebase/room/update/point/clear';
import { rewriteCompleted } from '~/lib/services/firebase/room/update/rewriteCompleted';
import { rewriteQueue } from '~/lib/services/firebase/room/update/rewriteQueue';
import { updateRoomTask } from '~/lib/services/firebase/room/update/roomTask';
import type { Task } from '~/lib/types/RawDB';

import type { SubmitVoteArgs } from './types';

export const submitVote = async ({
  roomId,
  task,
  entries,
  estimate,
  queue,
  completed,
}: SubmitVoteArgs) => {
  const votedTask: Task = {
    ...task,
    estimation: estimate,
    pointEntries: entries,
  };

  const randomId = nanoid(21);

  const nextTask = queue?.[0] ?? {
    id: randomId,
    name: 'Placeholder Story (end of Stories)',
    description: 'Edit Me',
  };
  const updatedQueue = queue?.slice(1) ?? [];
  const updatedCompleted = [votedTask, ...(completed ?? [])];

  await updateRoomTask(roomId, nextTask);
  await rewriteQueue(roomId, updatedQueue);
  await rewriteCompleted(roomId, updatedCompleted);
  await clearPoints(roomId);
};
