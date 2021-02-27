import { RoleType } from "./room";

export interface DBSample {
  rooms: Rooms;
}

export interface Rooms {
  [roomId: string]: RoomInstance;
}

export interface RoomInstance {
  room: RoomConfig;
  task: Task;
  users?: {
    [participantUid: string]: User;
  };
  config: {
    isFreezeAfterVote: boolean;
  };
}

export interface User {
  name: string;
  role: RoleType;
  point?: number;
}

export interface RoomConfig {
  name: string;
  isPrivate: boolean;
  password?: string;
}

export interface Task {
  name: string;
  description: string;
}
