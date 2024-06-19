import { z } from 'zod';

export const requiredString = (errorMsg?: string) =>
  z.string().min(1, errorMsg);
