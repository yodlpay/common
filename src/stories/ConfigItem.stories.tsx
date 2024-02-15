import type { Meta, StoryObj } from "@storybook/react";
import { ConfigItem, type ConfigItemProps } from "../components/ConfigItem";
import { Usdc } from "react-web3-icons";
import { useArgs } from "@storybook/preview-api";

const defaults: ConfigItemProps = {
  checked: false,
  label: "USDC",
  onChange: (isChecked: boolean) =>
    console.log(`Checkbox is now ${isChecked ? "checked" : "unchecked"}`),
};

const render = function Component(args: ConfigItemProps) {
  const [, setArgs] = useArgs();

  const handleChange = (checked: boolean) => {
    setArgs({ checked });
  };

  return <ConfigItem {...args} onChange={handleChange} />;
};

const meta: Meta<ConfigItemProps> = {
  title: "Components/ConfigItem",
  component: ConfigItem,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "text" },
    },
    label: {
      control: { type: "text" },
    },
    details: {
      control: { type: "text" },
    },
    configurable: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

export const Default: StoryObj<ConfigItemProps> = {
  args: defaults,
  render,
};

export const WithIcon: StoryObj<ConfigItemProps> = {
  args: {
    ...defaults,
    icon: <Usdc width="24px" height="24px" />,
  },
  render,
};

export const WithDetails: StoryObj<ConfigItemProps> = {
  args: {
    ...defaults,
    icon: <Usdc width="24px" height="24px" />,
    details: "6 chains",
  },
  render,
};

export const WithConfig: StoryObj<ConfigItemProps> = {
  args: {
    ...defaults,
    icon: <Usdc width="24px" height="24px" />,
    config: "6 chains",
  },
  render,
};

export const Configurable: StoryObj<ConfigItemProps> = {
  args: {
    ...defaults,
    icon: <Usdc width="24px" height="24px" />,
    details: "6 chains",
    configurable: true,
  },
  render,
};

export const Configured: StoryObj<ConfigItemProps> = {
  args: {
    ...defaults,
    icon: <Usdc width="24px" height="24px" />,
    details: "6 chains",
    configurable: true,
    configured: true,
  },
  render,
};

export const CheckedByDefault: StoryObj<ConfigItemProps> = {
  args: {
    ...defaults,
    icon: <Usdc width="24px" height="24px" />,
    details: "6 chains",
    configurable: true,
    checked: true,
  },
  render,
};
