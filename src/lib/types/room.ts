import type { User } from './user';

export type RoomUser = User & {
  uid: string;
};

export const pointOptions: Array<string> = [
  '0',
  '0.5',
  '1',
  '2',
  '3',
  '5',
  '8',
  // "13",
  // "20",
  // "40",
  // "60",
  // "100",
];
