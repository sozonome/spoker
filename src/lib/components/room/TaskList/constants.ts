import * as yup from "yup";

import type { SubmitStoryForm } from "./types";

export const submitStoryFormValidationSchema: yup.SchemaOf<SubmitStoryForm> =
  yup.object({
    name: yup.string().required().defined(),
    description: yup.string(),
  });
