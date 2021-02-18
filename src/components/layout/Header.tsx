import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Link as ChakraLink,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";

import { AuthContext } from "components/auth/AuthProvider";

import { logoutUser } from "functions/firebase";

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    if (currentUser) {
      currentUser.reload().then(() => {
        setDisplayName(currentUser.displayName);
      });
    }
  }, [currentUser]);

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

      {currentUser && (
        <Box marginLeft="auto">
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <IconButton aria-label="account" icon={<IoMdPerson />} />
            </PopoverTrigger>

            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                <Heading size="sm">{displayName}</Heading>
                <Text>{currentUser.email}</Text>
              </PopoverHeader>
              <PopoverBody>
                <Button isFullWidth colorScheme="red" onClick={logoutUser}>
                  Sign Out
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
      {/* <Box marginLeft="auto">
        <ThemeToggle />
      </Box> */}
    </Flex>
  );
};

export default Header;
