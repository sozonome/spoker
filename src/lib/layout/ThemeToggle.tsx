import { IconButton, useColorMode } from '@chakra-ui/react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import { EVENT_TYPE_CTA } from '~/lib/constants/tracking';
import { trackEvent } from '~/lib/utils/trackEvent';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleClickToggle = () => {
    trackEvent({
      eventName: `toggle theme to ${colorMode === 'light' ? 'dark' : 'light'}`,
      eventData: { type: EVENT_TYPE_CTA },
    });
    toggleColorMode();
  };

  return (
    <IconButton
      size={{
        base: 'md',
        sm: 'lg',
      }}
      aria-label="theme toggle"
      icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
      onClick={handleClickToggle}
    />
  );
};

export default ThemeToggle;
