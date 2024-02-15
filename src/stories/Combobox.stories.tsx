import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { SIZE_OPTIONS } from "../styles/theme";
import { Combobox, type ComboboxProps } from "../components/Combobox";

const selectItems = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "CHF", label: "CHF" },
];

const defaults = {
  description: "Amount to pay",
  data: selectItems,
  disabled: false,
  error: null,
  icon: null,
  label: "Amount",
  radius: "md" as "xs" | "sm" | "md" | "lg" | "xl",
  required: false,
  size: "md" as "xs" | "sm" | "md" | "lg" | "xl",
  inputType: "text" as "text" | "number",
  variant: "default" as "unstyled" | "default" | "filled",
  withAsterisk: false,
  name: "amount",
  inputValue: "",
  selectValue: selectItems[0].value,
};

const render = function Component(args: ComboboxProps) {
  const [, setArgs] = useArgs();

  const handleInputChange = (inputValue: string | number) => {
    setArgs({ inputValue });
  };

  const handleSelectChange = (selectValue: string) => {
    setArgs({ selectValue });
  };

  return (
    <Combobox
      {...args}
      onInputChange={handleInputChange}
      onSelectChange={handleSelectChange}
    />
  );
};

const meta: Meta<ComboboxProps> = {
  title: "Components/Combobox",
  component: Combobox,
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

export const Default: StoryObj<ComboboxProps> = {
  args: { ...defaults },
  render,
};

export const NumberInput: StoryObj<ComboboxProps> = {
  args: { ...defaults, inputType: "number" },
  render,
};

export const WithIcon: StoryObj<ComboboxProps> = {
  args: {
    ...defaults,
    icon: "$",
  },
  render,
};

export const ErrorState: StoryObj<ComboboxProps> = {
  args: {
    ...defaults,
    error: "Invalid amount",
  },
  render,
};

export const DisabledState: StoryObj<ComboboxProps> = {
  args: {
    ...defaults,
    disabled: true,
  },
  render,
};
