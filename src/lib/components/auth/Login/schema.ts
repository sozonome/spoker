import type { Input } from 'valibot';
import { email, object, string } from 'valibot';

export const loginFormValidationSchema = object({
  email: string([email()]),
  password: string(),
});

type LoginFormType = Input<typeof loginFormValidationSchema>;

export const initialValues: LoginFormType = {
  email: '',
  password: '',
};
