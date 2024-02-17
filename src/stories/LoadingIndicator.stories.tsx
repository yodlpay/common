import type { Meta, StoryObj } from "@storybook/react";
import {
  LoadingIndicator,
  type LoadingIndicatorProps,
} from "../components/LoadingIndicator";

const defaults: LoadingIndicatorProps = {
  label: "Loading...",
  labelSize: "md",
  horizontal: false,
  shouldGrow: true,
  verticalMargin: 0,
  horizontalMargin: 0,
};

const meta: Meta<LoadingIndicatorProps> = {
  title: "Components/LoadingIndicator",
  component: LoadingIndicator,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Loading label text",
    },
    labelSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Font size of the label",
    },
    spinnerSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the spinner",
    },
    horizontal: {
      control: "boolean",
      description: "Layout direction of the label and spinner",
    },
    shouldGrow: {
      control: "boolean",
      description: "Whether the component should grow to fill its container",
    },
  },
} satisfies Meta<typeof LoadingIndicator>;

export default meta;

export const Default: StoryObj<LoadingIndicatorProps> = {
  args: {
    ...defaults,
    verticalMargin: 6,
  },
};

export const HorizontalLayout: StoryObj<LoadingIndicatorProps> = {
  args: {
    ...defaults,
    horizontal: true,
    horizontalMargin: 6,
  },
};

export const CustomSize: StoryObj<LoadingIndicatorProps> = {
  args: {
    ...defaults,
    labelSize: 16,
    spinnerSize: 26,
    verticalMargin: 6,
  },
};
