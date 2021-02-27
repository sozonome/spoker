import { User } from "./RawDB";

export enum RoleEnums {
  "observant",
  "participant",
}

export type RoleType = keyof typeof RoleEnums;

export const roleOptions: Array<RoleType> = Object.keys(RoleEnums)
  .filter((key) => Number.isNaN(Number(key)))
  .map((role: string) => role as RoleType);

export type RoomUser = User & {
  uid: string;
};

export const pointOptions: Array<string> = [
  "0",
  "0.5",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "20",
  "40",
  "60",
  "100",
];
