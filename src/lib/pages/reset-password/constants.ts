import * as yup from 'yup';

import type { ResetPasswordForm } from './types';

export const resetPasswordFormValidationSchema: yup.ObjectSchema<ResetPasswordForm> =
  yup.object({
    email: yup.string().email().required().defined(),
  });

export const initialValues: ResetPasswordForm = {
  email: '',
};
