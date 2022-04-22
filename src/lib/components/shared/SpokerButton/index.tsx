import type { ButtonProps } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

type SpokerButtonProps = ButtonProps;

const SpokerButton = ({ children, ...props }: SpokerButtonProps) => {
  const contraButtonStyle: Partial<ButtonProps> = {
    borderRadius: 16,
    border: `2px solid black`,
    boxShadow: `0px 6px 0px black`,
    size: "lg",
  };

  return (
    <Button {...contraButtonStyle} {...props}>
      {children}
    </Button>
  );
};

export default SpokerButton;
