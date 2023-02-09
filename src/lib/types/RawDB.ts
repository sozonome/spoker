import type { HideLabelOptionsType } from '~/lib/constants/hideLabel';

import type { User } from './user';

export interface DBSample {
  rooms: Rooms;
}

export interface Rooms {
  [roomId: string]: RoomInstance;
}

export interface RoomMappedUser {
  [participantUid: string]: User;
}

export interface RoomInstance {
  room: RoomInfo;
  task: Task;
  queue?: Array<Task>;
  completed?: Array<Task>;
  selectedTaskIndex: number;

  users?: RoomMappedUser;

  config: RoomConfig;
}

export interface RoomInfo {
  name: string;
  isPrivate: boolean;
  password?: string;
}

export interface RoomConfig {
  isFreezeAfterVote: boolean;
  hideLabel?: HideLabelOptionsType;
}

export type PointEntry = Pick<User, 'name' | 'point'>;

export type LastVoted = {
  name: string;
  time: string;
};

export interface Task {
  id: string;
  name: string;
  description?: string;
  estimation?: number;
  lastVoted?: LastVoted | null;
  pointEntries?: Array<PointEntry>;
}
