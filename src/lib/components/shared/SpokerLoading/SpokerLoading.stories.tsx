import type { ComponentMeta, ComponentStory } from '@storybook/react';

import SpokerLoading from './index';

export default {
  title: 'shared/LoadingScreen',
  component: SpokerLoading,
} as ComponentMeta<typeof SpokerLoading>;

const Template: ComponentStory<typeof SpokerLoading> = () => <SpokerLoading />;

export const Default = Template.bind({});
