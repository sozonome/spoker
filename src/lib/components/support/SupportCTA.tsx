import {
  Button,
  HStack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { BiDonateHeart } from 'react-icons/bi';

import SpokerModalWrapper from '~/lib/components/shared/SpokerModalWrapper';

import SupportContent from './SupportContent';

type SupportCTAProps = {
  isCompact?: boolean;
};

const SupportCTA = ({ isCompact = false }: SupportCTAProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonSize = useBreakpointValue({
    base: 'md',
    sm: 'lg',
  });

  return (
    <>
      <Button
        paddingX={2}
        onClick={onOpen}
        size={buttonSize}
        colorScheme="gray"
      >
        <HStack fontSize="2xl" spacing={2}>
          <BiDonateHeart />
          {!isCompact && <Text fontSize="sm">Support</Text>}
        </HStack>
      </Button>

      <SpokerModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick
        header="Support spoker"
        size="lg"
        body={<SupportContent />}
      />
    </>
  );
};

export default SupportCTA;
