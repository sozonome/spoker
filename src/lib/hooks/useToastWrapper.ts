import type { UseToastOptions } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

export const useToastWrapper = (options?: UseToastOptions) =>
  useToast({
    variant: 'top-accent',
    position: 'top',
    isClosable: true,
    ...options,
  });
