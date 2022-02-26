import type { HideLabelOptionsType } from "lib/constants/hideLabel";

import type { User } from "./user";

export interface DBSample {
  rooms: Rooms;
}

export interface Rooms {
  [roomId: string]: RoomInstance;
}

export interface RoomInstance {
  room: RoomInfo;

  /** @deprecated will be replaced with tasks */
  task: Task;

  tasks: Array<TaskEntry>;
  selectedTaskIndex: number;

  users?: {
    [participantUid: string]: User;
  };

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

/**
 * @deprecated will be replaced with TaskEntry
 */
export interface Task {
  name: string;
  description: string;
}

export interface TaskEntry {
  name: string;
  description: string;
  point?: number;
  isLocked: boolean;
}
