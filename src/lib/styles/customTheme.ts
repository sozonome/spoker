import { extendTheme, theme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    ...theme.fonts,
    heading: "Jost, sans-serif",
    body: "Jost, sans-serif",
  },
  colors: {
    ...theme.colors,
    /** Example */
    // teal: {
    //   ...theme.colors.teal,
    //   700: "#005661",
    //   500: "#00838e",
    //   300: "#4fb3be",
    // },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 12,
      },
      defaultProps: {
        size: "lg",
      },
    },
  },
});

export default customTheme;
