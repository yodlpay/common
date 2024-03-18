import type { Meta, StoryObj } from '@storybook/react';
import { Stepper, type StepperProps } from '../components/Stepper';
import { useArgs } from '@storybook/preview-api';
import { MetaMask } from 'react-web3-icons';

const defaults: StepperProps = {
  active: 1,
  allowNextStepsSelect: true,
  breakpoint: 'xs',
  color: 'brand.0',
  completedIcon: null,
  contentPadding: 'md',
  icon: null,
  iconPosition: 'left',
  iconSize: 34,
  orientation: 'horizontal',
  progressIcon: null,
  radius: 'xl',
  size: 'md',
  data: [
    {
      label: 'First step',
      description: 'Create an account',
      content: 'Step 1 - Create an account',
    },
    {
      label: 'Second step',
      description: 'Verify email',
      content: 'Step 2 - Verify email',
    },
    {
      label: 'Final step',
      description: 'Get full access',
      content: 'Step 3 - Get full access',
    },
  ],
};

const render = function Component(props: StepperProps) {
  const [args, setArgs] = useArgs();

  const handleStepClick = (step: number) => {
    setArgs({ active: step });
  };

  return (
    <Stepper {...props} active={args.active} onStepClick={handleStepClick} />
  );
};

const meta: Meta<StepperProps> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    allowNextStepsSelect: {
      control: { type: 'boolean' },
    },
    breakpoint: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    shouldBreakpoint: {
      control: { type: 'boolean' },
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
    },
    radius: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    showOnlyActiveStepDetails: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

export const Default: StoryObj<StepperProps> = {
  args: {
    ...defaults,
  },
  render,
};

export const VerticalOrientation: StoryObj<StepperProps> = {
  args: {
    ...defaults,
    orientation: 'vertical',
  },
  render,
};

export const WithIcons: StoryObj<StepperProps> = {
  args: {
    ...defaults,
    icon: <MetaMask style={{ width: 10, height: 10 }} />,
  },
  render,
};

export const CustomColor: StoryObj<StepperProps> = {
  args: {
    ...defaults,
    color: 'red',
  },
  render,
};
