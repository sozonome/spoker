import { nanoid } from 'nanoid';
import type { Input } from 'valibot';
import { boolean, object, optional, regex, string } from 'valibot';

import { ALLOWED_CHAR_CHECK } from '~/lib/constants/allowedValues';

const randomId = nanoid(21);

export const initialValues: CreateRoomFormType = {
  name: '',
  id: randomId,
  isPrivate: false,
  password: '',
};

export const createRoomFormSchema = object({
  name: string(),
  id: string([
    regex(ALLOWED_CHAR_CHECK, 'room id contain unallowed character'),
  ]),
  isPrivate: boolean(),
  password: optional(string()),
});

export type CreateRoomFormType = Input<typeof createRoomFormSchema>;
