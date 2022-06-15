import { IconButton, useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

import { trackEvent } from "lib/utils/trackEvent";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonSize = useBreakpointValue({
    base: "md",
    sm: "lg",
  });
  const handleClickToggle = () => {
    trackEvent({
      eventValue: `toggle theme to ${colorMode === "light" ? "dark" : "light"}`,
      eventType: "cta",
    });
    toggleColorMode();
  };

  return (
    <IconButton
      size={buttonSize}
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={handleClickToggle}
    />
  );
};

export default ThemeToggle;
