import type { ComponentMeta, ComponentStory } from '@storybook/react';

import SpokerRadioBox from './index';

export default {
  title: 'shared/RadioBox',
  component: SpokerRadioBox,
} as ComponentMeta<typeof SpokerRadioBox>;

const Template: ComponentStory<typeof SpokerRadioBox> = (props) => (
  <SpokerRadioBox {...props} />
);

export const Default = Template.bind({});
