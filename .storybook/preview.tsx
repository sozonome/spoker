import { addDecorator, Parameters } from "@storybook/react";
import { withPerformance } from "storybook-addon-performance";
import "@fontsource/outfit/latin.css";

import customTheme from "../web/src/lib/styles/theme";

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: "Direction",
    description: "Direction for layout",
    defaultValue: "LTR",
    toolbar: {
      icon: "globe",
      items: ["LTR", "RTL"],
    },
  },
};

export const parameters: Parameters = {
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  chakra: {
    theme: customTheme,
  },
};

addDecorator(withPerformance);
