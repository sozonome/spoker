import {
  Box,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

import AuthPopover from "lib/components/auth/AuthPopover";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <ChakraLink as={Link} href="/" _hover={undefined}>
        <Flex alignItems="center" gridGap={4}>
          <Image src="/chip.svg" alt="poker icon" width={12} />
          <Box>
            <Heading as="h1">spoker</Heading>
            <Text>Online Scrum Poker</Text>
          </Box>
        </Flex>
      </ChakraLink>

      <Flex alignItems="center" marginLeft="auto" gridGap={[2, 4]}>
        <AuthPopover />
        <ThemeToggle />
      </Flex>
    </Flex>
  );
};

export default Header;
