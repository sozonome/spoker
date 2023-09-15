import type { Input } from 'valibot';
import { email, object, string } from 'valibot';

export const resetPasswordFormValidationSchema = object({
  email: string([email()]),
});

type ResetPasswordForm = Input<typeof resetPasswordFormValidationSchema>;

export const initialValues: ResetPasswordForm = {
  email: '',
};
