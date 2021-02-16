import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";

type SpokerButtonProps = { isContraStyle?: boolean } & ButtonProps;

const SpokerButton = ({
  isContraStyle = false,
  children,
  ...props
}: SpokerButtonProps) => {
  const borderColor = useColorModeValue("#18191F", "#FFFFFF");

  const contraButtonStyle: Partial<ButtonProps> = {
    borderRadius: 16,
    border: `2px solid ${borderColor}`,
    boxShadow: `0px 6px 0px ${borderColor}`,
    size: "lg",
  };

  return (
    <Button {...props} {...(isContraStyle ? contraButtonStyle : null)}>
      {children}
    </Button>
  );
};

export default SpokerButton;
