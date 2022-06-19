import { createStandaloneToast } from "@chakra-ui/react";

import { removeFirebasePrefix } from "lib/utils/removeFirebasePrefix";

const { toast } = createStandaloneToast();

export const showErrorToast = (err: Error) =>
  toast({
    description: removeFirebasePrefix(err.message),
    status: "error",
    position: "top",
    isClosable: true,
    duration: 15000,
  });
