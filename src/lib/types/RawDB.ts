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
  task: Task;
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
export interface Task {
  name: string;
  description: string;
}
