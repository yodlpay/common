import type { Meta, StoryObj } from "@storybook/react";
import { List, type ListProps } from "../components/List";
import { Eth } from "react-web3-icons";

const defaults: ListProps = {
  type: "unordered",
};

const render = function Component(args: ListProps) {
  return (
    <List {...args}>
      <List.Item>Item 1</List.Item>
      <List.Item>Item 2</List.Item>
      <List.Item>Item 3</List.Item>
    </List>
  );
};

const meta: Meta<ListProps> = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
      description: "Font size from theme or a specific number.",
    },
    spacing: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
      description: "Spacing between items from theme or a specific number.",
    },
    type: {
      options: ["ordered", "unordered"],
      control: { type: "radio" },
      description: "List type: ol or ul.",
    },
    withPadding: {
      control: { type: "boolean" },
      description:
        "Include padding-left to offset the list from the main content.",
    },
    center: {
      control: { type: "boolean" },
      description: "Center items with an icon.",
    },
    // Additional argTypes can be added here
  },
};

export default meta;

export const Default: StoryObj<ListProps> = {
  args: {
    ...defaults,
  },
  render,
};

export const Ordered: StoryObj<ListProps> = {
  args: {
    ...defaults,
    type: "ordered",
  },
  render,
};

export const WithIcons: StoryObj<ListProps> = {
  args: {
    ...defaults,
    icon: <Eth />,
  },
  render,
};

export const WithPadding: StoryObj<ListProps> = {
  args: {
    ...defaults,
    withPadding: true,
  },
  render,
};
