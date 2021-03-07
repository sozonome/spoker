import { HideLabelOptionsType } from "constants/hideLabel";
import { RoleType } from "./room";

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

export interface User {
  name: string;
  role: RoleType;
  point?: number;
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
