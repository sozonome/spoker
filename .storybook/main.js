const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

const path = require("path");
const toPath = (_path) => path.join(process.cwd(), _path);

/** @type {import('@storybook/react/types').StorybookConfig} */
module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-toolbars",
    "@storybook/addon-a11y",
    "@storybook/addon-storysource",
    "storybook-addon-performance/register",
    "@chakra-ui/storybook-addon",
  ],
  features: {
    emotionAlias: false,
  },
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        },
        plugins: [...(config.resolve.plugins ?? []), new TsconfigPathsPlugin()],
      },
    };
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};
