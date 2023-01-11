import { Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { BiDonateHeart } from "react-icons/bi";

import SpokerModalWrapper from "lib/components/shared/SpokerModalWrapper";

import SupportContent from "./SupportContent";

type SupportCTAProps = {
  isCompact?: boolean;
};

const SupportCTA = ({ isCompact = false }: SupportCTAProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button boxShadow="none" border="none" paddingX={2} onClick={onOpen}>
        <HStack fontSize="2xl" spacing={2}>
          <BiDonateHeart />
          {!isCompact && <Text fontSize="sm">Support</Text>}
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
