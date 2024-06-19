import { z } from 'zod';

import { requiredString } from './primitives';

export const loginFormValidationSchema = z.object({
  email: requiredString('email must be filled').email(),
  password: requiredString('Password must be filled'),
});

type LoginFormType = z.infer<typeof loginFormValidationSchema>;

export const initialValues: LoginFormType = {
  email: '',
  password: '',
};
