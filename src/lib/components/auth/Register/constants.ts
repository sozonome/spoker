import * as yup from 'yup';

import type { RegisterFormType } from './types';

export const registerFormValidationSchema: yup.Schema<RegisterFormType> =
  yup.object({
    name: yup.string().required().defined(),
    email: yup.string().email().required().defined(),
    password: yup.string().required().defined().min(6),
  });

export const initialValues: RegisterFormType = {
  name: '',
  email: '',
  password: '',
};
