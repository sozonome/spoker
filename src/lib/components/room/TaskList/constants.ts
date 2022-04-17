import * as yup from "yup";

import type { EditStoryForm, SubmitStoryForm } from "./types";

export const submitStoryFormValidationSchema: yup.SchemaOf<SubmitStoryForm> =
  yup.object({
    name: yup.string().required().defined(),
    description: yup.string(),
  });

export const editStoryFormValidationSchema: yup.SchemaOf<EditStoryForm> =
  yup.object({
    id: yup.string().defined(),
    name: yup.string().required().defined(),
    description: yup.string(),
  });
