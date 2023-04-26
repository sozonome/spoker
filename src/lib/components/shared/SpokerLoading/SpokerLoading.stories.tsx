import type { Meta, StoryObj } from '@storybook/react';

import SpokerLoading from './index';

const meta: Meta<typeof SpokerLoading> = {
  title: 'shared/LoadingScreen',
  component: SpokerLoading,
};

export default meta;

type Story = StoryObj<typeof SpokerLoading>;

export const Default: Story = { args: {} };
