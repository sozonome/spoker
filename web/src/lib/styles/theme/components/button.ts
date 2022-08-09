import type { DeepPartial, Theme } from "@chakra-ui/react";

export const Button: DeepPartial<Theme["components"]["Button"]> = {
  baseStyle: {
    borderRadius: 12,
  },
  defaultProps: {
    size: "lg",
  },
};
