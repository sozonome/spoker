import { Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { RiHandCoinLine } from "react-icons/ri";

import SpokerModalWrapper from "lib/components/shared/SpokerModalWrapper";

import SupportContent from "./SupportContent";

const SupportCTA = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button boxShadow="none" border="none" paddingX={2} onClick={onOpen}>
        <HStack fontSize="2xl" spacing={2}>
          <RiHandCoinLine />
          <Text fontSize="sm">Support</Text>
        </HStack>
      </Button>

      <SpokerModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick
        header="Support Spoker"
        size="lg"
        body={<SupportContent />}
      />
    </>
  );
};

export default SupportCTA;
