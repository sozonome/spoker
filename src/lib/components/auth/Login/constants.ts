import * as yup from 'yup';

import type { LoginFormType } from './types';

export const loginFormValidationSchema: yup.ObjectSchema<LoginFormType> =
  yup.object({
    email: yup.string().email().required().defined(),
    password: yup.string().required().defined(),
  });

export const initialValues: LoginFormType = {
  email: '',
  password: '',
};
