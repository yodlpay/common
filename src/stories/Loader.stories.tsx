import type { Meta, StoryObj } from "@storybook/react";
import { Loader, type LoaderProps } from "../components/Loader";
import { SIZE_OPTIONS } from "../styles/theme";

const defaults: LoaderProps = {
  color: "brand.0",
  size: "md",
  variant: "bars",
};

const render = function Component(args: LoaderProps) {
  return <Loader {...args} />;
};

const meta: Meta<LoaderProps> = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "color" },
      description: "Loader color from theme.",
    },
    size: {
      options: [...SIZE_OPTIONS, 16, 32, 48, 64, 80],
      control: { type: "select" },
      description: "Predefined sizes or number for loader width.",
    },
    variant: {
      options: ["bars", "oval", "dots"],
      control: { type: "select" },
      description: "Loader appearance variant.",
    },
  },
};

export default meta;

export const Oval: StoryObj<typeof meta> = {
  args: {
    ...defaults,
    variant: "oval",
  },
  render,
};

export const Bars: StoryObj<typeof meta> = {
  args: {
    ...defaults,
    variant: "bars",
  },
  render,
};

export const Dots: StoryObj<typeof meta> = {
  args: {
    ...defaults,
    variant: "dots",
  },
  render,
};
