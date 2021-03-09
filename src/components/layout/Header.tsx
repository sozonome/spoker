import { Image } from "@chakra-ui/image";
import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/layout";
import Link from "next/link";

import AuthPopover from "components/auth/AuthPopover";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Link href="/" passHref>
        <ChakraLink _hover={undefined}>
          <Flex alignItems="center" gridGap={4}>
            <Image src="/chip.svg" width={12} />
            <Box>
              <Heading as="h1">spoker</Heading>
              <Text>Online Scrum Poker</Text>
            </Box>
          </Flex>
        </ChakraLink>
      </Link>

      <AuthPopover />
    </Flex>
  );
};

export default Header;
