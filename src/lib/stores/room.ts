import create from "zustand";

import type { RoomInstance } from "lib/types/RawDB";
import type { RoomUser } from "lib/types/room";

type RoomState = {
  isBusy: boolean;
  showVote: boolean;
  roomData?: RoomInstance;
  users: Array<RoomUser>;
  inRoom: boolean;
};

type RoomSetStateAction = {
  setIsBusy: (isBusy: boolean) => void;
  setShowVote: (showVote: boolean) => void;
  setRoomData: (roomData: RoomInstance) => void;
  setUsers: (users: Array<RoomUser>) => void;
  setInRoom: (inRoom: boolean) => void;
};

type RoomStore = RoomState & RoomSetStateAction;

export const useRoomStore = create<RoomStore>((set) => ({
  isBusy: true,
  showVote: false,
  users: [],
  inRoom: true,
  setIsBusy: (isBusy) => set({ isBusy }),
  setShowVote: (showVote) => set({ showVote }),
  setRoomData: (roomData) => set({ roomData }),
  setUsers: (users) => set({ users }),
  setInRoom: (inRoom) => set({ inRoom }),
}));
