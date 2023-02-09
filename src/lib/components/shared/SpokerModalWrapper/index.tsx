import type { ModalContentProps, ModalProps } from '@chakra-ui/react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import type * as React from 'react';

import { contraGridStyle } from '~/lib/components/shared/style';

export type SpokerModalWrapperProps = Pick<
  ModalProps,
  'isOpen' | 'onClose' | 'size' | 'closeOnOverlayClick'
> & {
  header?: React.ReactNode;
  withCloseButton?: boolean;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  contentWrapperProps?: ModalContentProps;
};

const SpokerModalWrapper = ({
  isOpen,
  size = '2xl',
  header,
  withCloseButton = true,
  body,
  footer,
  closeOnOverlayClick = false,
  contentWrapperProps,
  onClose,
}: SpokerModalWrapperProps) => {
  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      isCentered
    >
      <ModalOverlay />

      <ModalContent {...contraGridStyle} marginX="6" {...contentWrapperProps}>
        {header && (
          <ModalHeader fontWeight="bold" fontSize={{ base: '2xl', lg: '3xl' }}>
            {header}
          </ModalHeader>
        )}
        {withCloseButton && <ModalCloseButton />}

        {body && <ModalBody>{body}</ModalBody>}

        {footer && <ModalFooter gridGap={2}>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

export default SpokerModalWrapper;
