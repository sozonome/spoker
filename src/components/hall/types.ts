import { ALLOWED_CHAR_CHECK } from "constants/allowedValues";
import * as yup from "yup";

export type CreateRoomFormType = {
  name: string;
  id: string;
  isPrivate: boolean;
  password: string;
};

export const CreateRoomFormSchema = yup.object().shape({
  name: yup.string().defined(),
  id: yup
    .string()
    .matches(ALLOWED_CHAR_CHECK, {
      message: "username contain unallowed character",
    })
    .defined(),
  isPrivate: yup.boolean().defined(),
  password: yup.string(),
});
