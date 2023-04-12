import type { Meta, StoryObj } from '@storybook/react';

import SpokerRadioBox from './index';

const meta: Meta<typeof SpokerRadioBox> = {
  title: 'shared/RadioBox',
  component: SpokerRadioBox,
};

export default meta;

type Story = StoryObj<typeof SpokerRadioBox>;

export const Default: Story = { args: {} };
