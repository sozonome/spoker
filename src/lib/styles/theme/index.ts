import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { components } from './components';
import { config } from './config';
import { fonts } from './fonts';
import { styles } from './styles';

export const customTheme = extendTheme({
  fonts,
  components,
  config,
  colors,
  styles,
});
