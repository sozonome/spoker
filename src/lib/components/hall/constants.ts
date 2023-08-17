import { nanoid } from 'nanoid';
import * as yup from 'yup';

import { ALLOWED_CHAR_CHECK } from '~/lib/constants/allowedValues';

import type { CreateRoomFormType } from './types';

const randomId = nanoid(21);

export const initialValues: CreateRoomFormType = {
  name: '',
  id: randomId,
  isPrivate: false,
  password: '',
};

export const createRoomFormSchema: yup.ObjectSchema<CreateRoomFormType> = yup
  .object()
  .shape({
    name: yup.string().required().defined(),
    id: yup
      .string()
      .matches(ALLOWED_CHAR_CHECK, {
        message: 'room id contain unallowed character',
      })
      .required()
      .defined(),
    isPrivate: yup.boolean().defined(),
    password: yup.string(),
  });
