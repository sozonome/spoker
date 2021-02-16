import {
  Box,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

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

      {/* <Box marginLeft="auto">
        <ThemeToggle />
      </Box> */}
    </Flex>
  );
};

export default Header;
