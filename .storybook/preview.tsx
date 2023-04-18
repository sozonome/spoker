import { Parameters, Preview } from '@storybook/react';
import '@fontsource/outfit/latin.css';

import customTheme from '../src/lib/styles/theme';

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
};

export const parameters: Parameters = {
  options: {
    storySort: (a, b) =>
      a.title === b.title
        ? 0
        : a.id.localeCompare(b.id, undefined, { numeric: true }),
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  chakra: {
    theme: customTheme,
  },
};

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
