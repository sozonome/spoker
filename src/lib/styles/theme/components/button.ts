import type { DeepPartial, Theme } from "@chakra-ui/react";

export const Button: DeepPartial<Theme["components"]["Button"]> = {
  baseStyle: {
    borderRadius: 12,
    border: "2px solid black",
    boxShadow: `0px 6px 0px black`,
    marginY: 1,
  },
  defaultProps: {
    size: "lg",
  },
};
