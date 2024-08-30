import { z } from 'zod';

import { requiredString } from '~/lib/models/primitives';

export const submitStoryFormValidationSchema = z.object({
  name: requiredString('Name must be filled'),
  description: z.string(),
});
