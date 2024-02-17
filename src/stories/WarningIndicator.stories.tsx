import type { Meta, StoryObj } from "@storybook/react";
import {
  WarningIndicator,
  type WarningIndicatorProps,
} from "../components/WarningIndicator";

const defaults: WarningIndicatorProps = {
  label: "Warning!",
  description: "This is a warning indicator.",
  labelColor: "primary.0",
  labelSize: "md",
  iconSize: 18,
  horizontal: false,
  shouldGrow: true,
  withBorder: false,
  labelBold: false,
  verticalMargin: 0,
  horizontalMargin: 0,
  borderRadius: "md",
  padding: "sm",
  type: "warning",
  backgroundShade: -1,
};

const meta: Meta<WarningIndicatorProps> = {
  title: "Components/WarningIndicator",
  component: WarningIndicator,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Indicator label",
    },
    description: {
      control: "text",
      description: "Optional detailed description",
    },
    labelColor: {
      control: "color",
      description: "Label text color",
    },
    labelSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Font size of the label",
    },
    iconSize: {
      control: "number",
      description: "Size of the icon",
    },
    type: {
      control: "radio",
      options: ["info", "warning"],
      description: "Type of indicator",
    },
  },
} satisfies Meta<typeof WarningIndicator>;

export default meta;

export const Default: StoryObj<WarningIndicatorProps> = {
  args: {
    ...defaults,
    verticalMargin: 6,
  },
};

export const Horizontal: StoryObj<WarningIndicatorProps> = {
  args: {
    ...defaults,
    horizontal: true,
    horizontalMargin: 6,
  },
};

export const InfoType: StoryObj<WarningIndicatorProps> = {
  args: {
    ...defaults,
    label: "Information",
    type: "info",
    verticalMargin: 6,
  },
};

export const WithBorder: StoryObj<WarningIndicatorProps> = {
  args: {
    ...defaults,
    withBorder: true,
    verticalMargin: 6,
  },
};

export const CustomBackground: StoryObj<WarningIndicatorProps> = {
  args: {
    ...defaults,
    backgroundShade: 1,
    verticalMargin: 6,
  },
};
