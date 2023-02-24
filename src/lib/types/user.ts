export enum RoleType {
  owner = 'owner',
  participant = 'participant',
  observant = 'observant',
}

export const roleOptions: Array<RoleType> = Object.keys(RoleType)
  .filter((key) => Number.isNaN(Number(key)))
  .map((role: string) => role as RoleType);

export interface User {
  name: string;
  role: RoleType;
  point?: number;
  isConnected: boolean;
}
