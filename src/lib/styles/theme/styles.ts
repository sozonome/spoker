import type { DeepPartial, Theme } from '@chakra-ui/react';

export const styles: DeepPartial<Theme['styles']> = {
  global: {
    body: {
      overflowY: 'scroll',
    },
  },
};
