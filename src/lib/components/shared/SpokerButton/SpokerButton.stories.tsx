import type { ComponentMeta, ComponentStory } from "@storybook/react";

import SpokerButton from "./index";

export default {
  title: "shared/Button",
  component: SpokerButton,
} as ComponentMeta<typeof SpokerButton>;

const Template: ComponentStory<typeof SpokerButton> = (props) => (
  <SpokerButton {...props} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Button",
  colorScheme: "blue",
  variant: "solid",
};
