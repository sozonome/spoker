import type { ModalContentProps } from "@chakra-ui/react";

export const contraBoxStyle = (
  borderColor: string
): Partial<ModalContentProps> => ({
  paddingY: 2,
  borderRadius: 16,
  border: { sm: `2px solid ${borderColor}` },
  boxShadow: { sm: `0px 6px 0px ${borderColor}` },
  marginX: { sm: 8 },
});
