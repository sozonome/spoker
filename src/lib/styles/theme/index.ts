import { extendTheme } from '@chakra-ui/react';

import { components } from './components';
import { config } from './config';
import { fonts } from './fonts';

const customTheme = extendTheme({
  fonts,
  components,
  config,
});

export default customTheme;
