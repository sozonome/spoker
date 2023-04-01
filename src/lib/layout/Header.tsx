import { Flex } from '@chakra-ui/react';

import AuthPopover from '~/lib/components/auth/AuthPopover';
import SpokerLogo from '~/lib/components/shared/SpokerLogo';
import SupportCTA from '~/lib/components/support/SupportCTA';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <SpokerLogo />

      <Flex alignItems="center" marginLeft="auto" gridGap={[2, 4]}>
        <SupportCTA isCompact />
        <AuthPopover />
        <ThemeToggle />
      </Flex>
    </Flex>
  );
};

export default Header;
