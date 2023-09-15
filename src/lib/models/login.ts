import type { Input } from 'valibot';
import { email, object, string } from 'valibot';

import { requiredString } from './primitives';

export const loginFormValidationSchema = object({
  email: string([email()]),
  password: requiredString('Password must be filled'),
});

type LoginFormType = Input<typeof loginFormValidationSchema>;

export const initialValues: LoginFormType = {
  email: '',
  password: '',
};
