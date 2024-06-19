import { z } from 'zod';

import { requiredString } from './primitives';

export const resetPasswordFormValidationSchema = z.object({
  email: requiredString('email must be filled').email(),
});

type ResetPasswordForm = z.infer<typeof resetPasswordFormValidationSchema>;

export const initialValues: ResetPasswordForm = {
  email: '',
};
