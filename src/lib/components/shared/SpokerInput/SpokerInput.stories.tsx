import type { Meta, StoryObj } from '@storybook/react';

import SpokerInput from './index';

const meta: Meta<typeof SpokerInput> = {
  title: 'shared/Input',
  component: SpokerInput,
};

export default meta;

type Story = StoryObj<typeof SpokerInput>;

export const Default: Story = {};

export const FilledWithLabel: Story = {
  args: { label: 'Label', variant: 'filled' },
};
