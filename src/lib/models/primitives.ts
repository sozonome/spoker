import { minLength, string } from 'valibot';

export const requiredString = (errorMsg?: string) =>
  string([minLength(1, errorMsg)]);
