import { object, string } from 'valibot';

export const submitStoryFormValidationSchema = object({
  name: string(),
  description: string(),
});
