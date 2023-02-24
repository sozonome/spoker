import {
  Box,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

import AuthPopover from '~/lib/components/auth/AuthPopover';
import SupportCTA from '~/lib/components/support/SupportCTA';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <ChakraLink as={Link} href="/" _hover={undefined}>
        <Flex alignItems="center" gridGap={{ base: 2, md: 4 }}>
          <Image src="/chip.svg" alt="poker icon" width={{ base: 8, md: 12 }} />
          <Box>
            <Heading as="h1" size={{ base: 'md', md: 'lg' }}>
              spoker
            </Heading>
            <Text color="gray" fontSize={{ base: 'xs', md: 'sm' }}>
              Online Scrum Poker
            </Text>
          </Box>
        </Flex>
      </ChakraLink>

      <Flex alignItems="center" marginLeft="auto" gridGap={[2, 4]}>
        <SupportCTA isCompact />
        <AuthPopover />
        <ThemeToggle />
      </Flex>
    </Flex>
  );
};

export default Header;
