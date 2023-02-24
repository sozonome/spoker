import type { ComponentMeta, ComponentStory } from '@storybook/react';

import SpokerInput from './index';

export default {
  title: 'shared/Input',
  component: SpokerInput,
} as ComponentMeta<typeof SpokerInput>;

const Template: ComponentStory<typeof SpokerInput> = (props) => (
  <SpokerInput {...props} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  variant: 'filled',
};
