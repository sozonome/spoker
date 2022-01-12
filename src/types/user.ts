export enum RoleEnums {
  "observant",
  "participant",
}

export type RoleType = keyof typeof RoleEnums;

export const roleOptions: Array<RoleType> = Object.keys(RoleEnums)
  .filter((key) => Number.isNaN(Number(key)))
  .map((role: string) => role as RoleType);

export interface User {
  name: string;
  role: RoleType;
  point?: number;
}
