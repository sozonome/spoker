import { extendTheme } from "@chakra-ui/react";

import { components } from "./components";
import { fonts } from "./fonts";

const customTheme = extendTheme({
  fonts,
  components,
});

export default customTheme;
