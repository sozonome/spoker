import { Flex, Heading, Box, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Link href="/" passHref>
        <ChakraLink>
          <Heading as="h1">spoker</Heading>
        </ChakraLink>
      </Link>

      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
