import { IconButton, useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonSize = useBreakpointValue({
    base: "md",
    sm: "lg",
  });

  return (
    <IconButton
      size={buttonSize}
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
