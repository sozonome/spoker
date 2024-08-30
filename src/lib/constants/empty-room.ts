import type { RoomInstance } from '~/lib/types/raw-db';

export const emptyRoom: RoomInstance = {
  room: {
    name: '',
    isPrivate: false,
  },
  task: {
    name: '',
    id: '',
  },
  selectedTaskIndex: 0,
  config: {
    isFreezeAfterVote: false,
  },
};
