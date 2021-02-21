export interface DBSample {
  rooms: Rooms;
}

export interface Rooms {
  [roomId: string]: RoomID;
}

export interface RoomID {
  room: RoomConfig;
  task: Task;
  participants: {
    [participantUid: string]: Participant;
  };
  observants: { [observantUid: string]: Observant };
}

export interface Observant {
  name: string;
}

export interface Participant {
  name: string;
  point: number;
}

export interface RoomConfig {
  name: string;
  isPrivate: boolean;
  password: string;
}

export interface Task {
  name: string;
  description: string;
}
