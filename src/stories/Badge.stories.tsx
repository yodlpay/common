import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/Badge";
import { Ethereum, Polygon } from "react-web3-icons";
import { SIZE_OPTIONS } from "../styles/theme";

const defaults = {
  color: "brand.0",
  variant: "outline",
  size: "md",
  radius: "md",
  fullWidth: false,
  gradient: { from: "indigo", to: "cyan" },
  onClick: undefined,
};

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "color" },
    },
    fullWidth: {
      control: { type: "boolean" },
    },
    radius: {
      options: SIZE_OPTIONS,
      control: { type: "select" },
    },
    size: {
      options: SIZE_OPTIONS,
      control: { type: "select" },
    },
    variant: {
      options: ["light", "filled", "outline", "dot", "gradient"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...defaults,
    children: "Default badge",
  },
};

export const Primary: Story = {
  args: {
    ...defaults,
    children: "Primary badge",
    color: "primary.0",
  },
};

export const Small: Story = {
  args: {
    ...defaults,
    children: "Small badge",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    ...defaults,
    children: "Large badge",
    size: "lg",
  },
};

export const LeftIcon: Story = {
  args: {
    ...defaults,
    children: "Badge with left icon",
    leftSection: <Ethereum fontSize={10} />,
  },
};

export const RightIcon: Story = {
  args: {
    ...defaults,
    children: "Badge with right icon",
    rightSection: <Polygon fontSize={10} />,
  },
};

export const ActivityIcon: Story = {
  args: {
    ...defaults,
    children: "Badge with activity indicator",
    isActive: true,
  },
};

export const ClickableBadge: Story = {
  args: {
    ...defaults,
    children: "Clickable badge",
    isActive: true,
    onClick: () => alert("Clicked"),
  },
};
