import { object, string } from 'valibot';

import { requiredString } from '~/lib/models/primitives';

export const submitStoryFormValidationSchema = object({
  name: requiredString('Name must be filled'),
  description: string(),
});
