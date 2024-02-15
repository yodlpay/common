import type { Meta, StoryObj } from "@storybook/react";
import { ActionIcon, type ActionIconProps } from "../components/ActionIcon";
import { Ethereum } from "react-web3-icons";

const defaults = {
  color: "brand.0",
  disabled: false,
  gradient: undefined,
  loading: false,
  radius: "md" as "xs" | "sm" | "md" | "lg" | "xl",
  size: "md" as "xs" | "sm" | "md" | "lg" | "xl",
  variant: "subtle" as
    | "subtle"
    | "gradient"
    | "outline"
    | "transparent"
    | "light"
    | "default"
    | "filled",
};

const meta: Meta<ActionIconProps> = {
  title: "Components/ActionIcon",
  component: ActionIcon,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "color" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    gradient: {
      control: { type: "text" },
    },
    loading: {
      control: { type: "boolean" },
    },
    radius: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    variant: {
      options: [
        "outline",
        "transparent",
        "light",
        "default",
        "filled",
        "gradient",
        "subtle",
      ],
      control: { type: "select" },
    },
  },
};

export default meta;

export const Default: StoryObj<ActionIconProps> = {
  args: {
    ...defaults,
    children: <Ethereum />,
  },
};

export const Outline: StoryObj<ActionIconProps> = {
  args: {
    ...defaults,
    variant: "outline",
    children: <Ethereum />,
  },
};

export const Filled: StoryObj<ActionIconProps> = {
  args: {
    ...defaults,
    variant: "filled",
    children: <Ethereum />,
  },
};
