import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';
import { Ethereum, Polygon } from 'react-web3-icons';
import { SIZE_OPTIONS } from '../styles';
import { type Variants } from '@mantine/core';

const defaults = {
  color: 'brand.0',
  compact: false,
  disabled: false,
  variant: 'outline' as Variants<
    | 'outline'
    | 'white'
    | 'light'
    | 'default'
    | 'filled'
    | 'gradient'
    | 'subtle'
    | 'link'
    | 'unstyled'
  >,
  size: 'md',
  radius: 'md',
  fullWidth: false,
  gradient: { from: 'indigo', to: 'cyan' },
  loaderPosition: 'left' as 'left' | 'right' | 'center',
  loading: false,
  type: 'button' as 'button' | 'submit' | 'reset',
  uppercase: false,
  fontWeight: 600,
};

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'color' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    radius: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
    },
    size: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
    },
    loading: { type: 'boolean' },
    loaderPosition: {
      options: ['left', 'right', 'center'],
      control: { type: 'select' },
    },
    uppercase: { type: 'boolean' },
    disabled: { type: 'boolean' },
    compact: { type: 'boolean' },
    variant: {
      options: [
        'outline',
        'white',
        'light',
        'default',
        'filled',
        'gradient',
        'subtle',
        'link',
        'unstyled',
      ],
      control: { type: 'select' },
    },
    fontSize: { type: 'number' },
    fontWeight: { type: 'number' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    ...defaults,
    children: 'Primary button',
  },
};

export const Secondary: Story = {
  args: {
    ...defaults,
    children: 'Secondary button',
    color: 'secondary',
  },
};

export const Small: Story = {
  args: {
    ...defaults,
    children: 'Small button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...defaults,
    children: 'Large button',
    size: 'lg',
  },
};

export const LeftIcon: Story = {
  args: {
    ...defaults,
    children: 'Button with left icon',
    leftIcon: <Ethereum fontSize={18} />,
  },
};

export const RightIcon: Story = {
  args: {
    ...defaults,
    children: 'Button with right icon',
    rightIcon: <Polygon fontSize={18} />,
  },
};

export const Unstyled: Story = {
  args: {
    ...defaults,
    children: 'Unstyled button',
    variant: 'unstyled',
  },
};
