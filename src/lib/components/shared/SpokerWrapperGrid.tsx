import type { GridProps } from '@chakra-ui/react';
import { Grid, useColorModeValue } from '@chakra-ui/react';

import { contraGridStyle } from './style';

type SpokerWrapperGridProps = GridProps;

const SpokerWrapperGrid = ({ children, ...props }: SpokerWrapperGridProps) => {
  const backgroundColor = useColorModeValue(undefined, 'gray.500');

  return (
    <Grid {...contraGridStyle} backgroundColor={backgroundColor} {...props}>
      {children}
    </Grid>
  );
};

export default SpokerWrapperGrid;
