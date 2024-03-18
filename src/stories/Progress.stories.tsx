import type { Meta, StoryObj } from '@storybook/react';
import { Progress, type ProgressProps } from '../components/Progress';
import { SIZE_OPTIONS } from '../styles';

const defaults: ProgressProps = {
  color: 'brand.0',
  size: 'md',
  value: 50,
};

const render = function Component(args: ProgressProps) {
  return <Progress {...args} />;
};

const meta: Meta<ProgressProps> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'color' },
      description: 'Progress color from theme.',
    },
    size: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
      description: 'Height of progress bar.',
    },
    radius: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
      description:
        'Key of theme.radius or any valid CSS value to set border-radius.',
    },
    striped: {
      control: { type: 'boolean' },
      description: 'Adds stripes.',
    },
    animate: {
      control: { type: 'boolean' },
      description: 'Whether to animate striped progress bars.',
    },
    value: {
      control: { type: 'number' },
      description: 'Percent of filled bar (0-100).',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: defaults,
  render,
};

export const Striped: StoryObj<typeof meta> = {
  args: {
    ...defaults,
    striped: true,
  },
  render,
};

export const Animated: StoryObj<typeof meta> = {
  args: {
    ...defaults,
    striped: true,
    animate: true,
  },
  render,
};
