import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, type TooltipProps } from '../components/Tooltip';
import { Button } from '../components/Button';

const defaults: Partial<TooltipProps> = {
  arrowOffset: 0,
  arrowPosition: 'center',
  arrowRadius: 0,
  arrowSize: 5,
  closeDelay: 0,
  color: 'brand.0',
  disabled: false,
  events: { hover: true, focus: true, touch: true },
  inline: false,
  keepMounted: false,
  multiline: false,
  offset: 5,
  openDelay: 0,
  position: 'top',
  radius: 'sm',
  width: 'auto',
  withArrow: false,
  withinPortal: false,
  zIndex: 1,
};

const render = function Component(args: TooltipProps) {
  return (
    <Tooltip {...args}>
      <Button>Hover over me</Button>
    </Tooltip>
  );
};

const meta: Meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        height: '100px',
      },
    },
  },
  argTypes: {
    arrowOffset: { control: { type: 'number' } },
    arrowPosition: {
      options: ['center', 'side'],
      control: { type: 'select' },
    },
    arrowRadius: { control: { type: 'number' } },
    arrowSize: { control: { type: 'number' } },
    closeDelay: { control: { type: 'number' } },
    color: { control: { type: 'color' } },
    disabled: { control: { type: 'boolean' } },
    inline: { control: { type: 'boolean' } },
    keepMounted: { control: { type: 'boolean' } },
    multiline: { control: { type: 'boolean' } },
    offset: { control: { type: 'number' } },
    openDelay: { control: { type: 'number' } },
    position: {
      options: [
        'bottom',
        'left',
        'right',
        'top',
        'bottom-end',
        'bottom-start',
        'left-end',
        'left-start',
        'right-end',
        'right-start',
        'top-end',
        'top-start',
      ],
      control: { type: 'select' },
    },
    radius: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    width: { control: { type: 'number' } },
    withArrow: { control: { type: 'boolean' } },
    withinPortal: { control: { type: 'boolean' } },
    zIndex: { control: { type: 'number' } },
  },
};

export default meta;

export const BasicTooltip: StoryObj<TooltipProps> = {
  args: {
    ...defaults,
    label: 'This is a basic tooltip',
  },
  render,
};

export const WithArrowTooltip: StoryObj<TooltipProps> = {
  args: {
    ...defaults,
    label: 'Tooltip with an arrow',
    withArrow: true,
  },
  render,
};

export const DisabledTooltip: StoryObj<TooltipProps> = {
  args: {
    ...defaults,
    label: 'This tooltip is disabled',
    disabled: true,
  },
  render,
};
