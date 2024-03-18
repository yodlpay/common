import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput, type NumberInputProps } from '../components/NumberInput';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useArgs } from '@storybook/preview-api';

const defaults: NumberInputProps = {
  type: 'text',
  size: 'md',
};

const render = function Component(args: NumberInputProps) {
  const [, setArgs] = useArgs();

  const handleChange = (value: number | string) => {
    setArgs({ value });
  };

  return <NumberInput {...args} onChange={handleChange} />;
};

const meta: Meta<NumberInputProps> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    decimalSeparator: {
      control: { type: 'text' },
      description: 'The decimal separator',
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
      description: 'Input size',
    },
    type: {
      options: ['number', 'text'],
      control: { type: 'radio' },
      description: 'Input type, defaults to text',
    },
    variant: {
      options: ['unstyled', 'default', 'filled'],
      control: { type: 'radio' },
      description: 'Defines input appearance',
    },
    radius: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
      description: 'Input border-radius',
    },
    precision: {
      control: { type: 'number' },
      description: 'Amount of digits after the decimal point',
    },
    step: {
      control: { type: 'number' },
      description: 'Number by which value will be incremented/decremented',
    },
    startValue: {
      control: { type: 'number' },
      description: 'First value if no initial value was set',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimal possible value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum possible value',
    },
    thousandsSeparator: {
      control: { type: 'text' },
      description: 'The thousands separator',
    },
    hideControls: {
      control: { type: 'boolean' },
      description: 'Removes increment/decrement controls',
    },
    noClampOnBlur: {
      control: { type: 'boolean' },
      description: 'Prevent value clamp on blur',
    },
    removeTrailingZeros: {
      control: { type: 'boolean' },
      description: 'Remove trailing zeros if precision is given',
    },
    withAsterisk: {
      control: { type: 'boolean' },
      description: 'Render asterisk for required input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled input state',
    },
  },
};

export default meta;

export const Default: StoryObj<NumberInputProps> = {
  args: {
    ...defaults,
    value: 50,
  },
  render,
};

export const WithIcons: StoryObj<NumberInputProps> = {
  args: {
    ...defaults,
    value: 50,
    icon: <CurrencyDollarIcon width="20px" height="20px" />,
  },
  render,
};

export const WithPrecision: StoryObj<NumberInputProps> = {
  args: {
    ...defaults,
    value: 50.25,
    precision: 2,
  },
  render,
};

export const WithinRange: StoryObj<NumberInputProps> = {
  args: {
    ...defaults,
    value: 50,
    min: 10,
    max: 100,
  },
  render,
};

export const ThousandSeparators: StoryObj<NumberInputProps> = {
  args: {
    ...defaults,
    value: 1000,
    thousandsSeparator: ',',
  },
  render,
};

export const StepInterval: StoryObj<NumberInputProps> = {
  args: {
    ...defaults,
    value: 50,
    step: 10,
  },
  render,
};

export const Disabled: StoryObj<NumberInputProps> = {
  args: {
    ...defaults,
    value: 50,
    disabled: true,
  },
  render,
};
