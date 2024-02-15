import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { SIZE_OPTIONS } from "../styles/theme";
import { TextInput, type TextInputProps } from "../components/TextInput";

const defaults = {
  description: "Email Address",
  disabled: false,
  error: null,
  icon: null,
  label: "Email",
  radius: "md" as "xs" | "sm" | "md" | "lg" | "xl",
  required: false,
  size: "md" as "xs" | "sm" | "md" | "lg" | "xl",
  type: "text",
  variant: "default" as "unstyled" | "default" | "filled",
  withAsterisk: false,
  name: "email",
  value: "",
};

const render = function Component(args: TextInputProps) {
  const [, setArgs] = useArgs();

  const handleChange = (value: string) => {
    setArgs({ value });
  };

  return <TextInput {...args} onChange={handleChange} />;
};

const meta: Meta<TextInputProps> = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    description: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    icon: { control: "text" },
    label: { control: "text" },
    radius: {
      options: SIZE_OPTIONS,
      control: { type: "select" },
    },
    required: { control: "boolean" },
    size: {
      options: SIZE_OPTIONS,
      control: { type: "select" },
    },
    type: {
      options: ["text", "password", "email", "number"],
      control: { type: "select" },
    },
    variant: {
      options: ["unstyled", "default", "filled"],
      control: { type: "select" },
    },
    withAsterisk: { control: "boolean" },
  },
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<TextInputProps> = {
  args: { ...defaults },
  render,
};

export const WithIcon: StoryObj<TextInputProps> = {
  args: {
    ...defaults,
    icon: "✉️",
  },
  render,
};

export const ErrorState: StoryObj<TextInputProps> = {
  args: {
    ...defaults,
    error: "Invalid email address",
  },
  render,
};

export const DisabledState: StoryObj<TextInputProps> = {
  args: {
    ...defaults,
    disabled: true,
  },
  render,
};

export const PasswordTextInput: StoryObj<TextInputProps> = {
  args: {
    ...defaults,
    label: "Password",
    description: "Enter your password",
    type: "password",
  },
  render,
};
