import type { Meta, StoryObj } from '@storybook/react';
import { Indicator, type IndicatorProps } from '../components/Indicator';
import { Avatar } from '../components/Avatar';

const defaults: IndicatorProps = {
  color: 'red',
  disabled: false,
  inline: true,
  offset: 0,
  position: 'top-end',
  processing: false,
  radius: 'md',
  size: 10,
  withBorder: false,
  zIndex: 1,
  children: (
    <Avatar
      size="lg"
      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    />
  ),
};

const render = (args: IndicatorProps) => <Indicator {...args} />;

const meta: Meta<IndicatorProps> = {
  title: 'Components/Indicator',
  component: Indicator,
  tags: ['autodocs'],
  argTypes: {
    color: { control: { type: 'color' } },
    disabled: { control: { type: 'boolean' } },
    inline: { control: { type: 'boolean' } },
    offset: { control: { type: 'number' } },
    position: {
      options: [
        'bottom-end',
        'bottom-start',
        'top-end',
        'top-start',
        'bottom-center',
        'top-center',
        'middle-center',
        'middle-end',
        'middle-start',
      ],
      control: { type: 'select' },
    },
    processing: { control: { type: 'boolean' } },
    radius: { control: { type: 'select' } },
    size: { control: { type: 'number' } },
    withBorder: { control: { type: 'boolean' } },
    zIndex: { control: { type: 'number' } },
  },
};

export default meta;

export const Colored: StoryObj<IndicatorProps> = {
  args: {
    ...defaults,
    color: 'blue',
  },
  render,
};

export const LargeSize: StoryObj<IndicatorProps> = {
  args: {
    ...defaults,
    size: 20,
  },
  render,
};

export const Processing: StoryObj<IndicatorProps> = {
  args: {
    ...defaults,
    processing: true,
  },
  render,
};

export const CustomPosition: StoryObj<IndicatorProps> = {
  args: {
    ...defaults,
    position: 'middle-center',
  },
  render,
};

export const WithBorder: StoryObj<IndicatorProps> = {
  args: {
    ...defaults,
    withBorder: true,
  },
  render,
};

export const DifferentRadius: StoryObj<IndicatorProps> = {
  args: {
    ...defaults,
    radius: 'xl',
  },
  render,
};
