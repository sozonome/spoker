import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiGithubFill, RiHandCoinLine } from "react-icons/ri";

import { packageInfo } from "lib/constants/packageInfo";
import { EVENT_TYPE_LINK } from "lib/constants/tracking";
import { trackEvent } from "lib/utils/trackEvent";

const Footer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (eventName: string) => () => {
    trackEvent({
      eventName,
      eventData: { type: EVENT_TYPE_LINK },
    });
  };

  return (
    <>
      <Box
        display={{ base: "grid", md: "flex" }}
        as="footer"
        width="full"
        alignItems="center"
        justifyContent="center"
        paddingY={8}
        gap={{ base: 0, md: 4 }}
      >
        <Text>
          2021 -{" "}
          <Link
            href="https://sznm.dev"
            isExternal
            onClick={handleClick("open sznm.dev")}
          >
            sznm.dev
          </Link>
        </Text>

        <Flex alignItems="center">
          <Button variant="ghost" paddingX={2} onClick={onOpen}>
            <HStack fontSize="2xl" spacing={2}>
              <RiHandCoinLine />
              <Text fontSize="sm">Support</Text>
            </HStack>
          </Button>
        </Flex>

        <Flex
          marginLeft={{ md: "auto" }}
          justifyContent="center"
          alignItems="center"
          gridGap={2}
        >
          <Link
            href={`${packageInfo.repository.url}/blob/main/CHANGELOG.md`}
            isExternal
            onClick={handleClick("open repo changelog")}
          >
            v{packageInfo.version}
          </Link>
          <Link
            href={packageInfo.repository.url}
            onClick={handleClick("open repository")}
            isExternal
          >
            <RiGithubFill fontSize="2rem" />
          </Link>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent marginX={4}>
          <ModalHeader>Support spoker</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>Support this project</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Footer;
