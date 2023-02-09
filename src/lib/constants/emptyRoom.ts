import type { RoomInstance } from '~/lib/types/RawDB';

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
