import type { Meta, StoryObj } from "@storybook/react";
import { Emoji } from "../components/Emoji";

const defaults = {
  symbol: "🐑",
};

const meta = {
  title: "Components/Emoji",
  component: Emoji,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Emoji>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  args: {
    ...defaults,
    label: "Sheep",
  },
};

export const WithoutLabel: Story = {
  args: {
    ...defaults,
  },
};
