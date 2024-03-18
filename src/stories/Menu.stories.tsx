import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { MetaMask } from 'react-web3-icons';
import { Menu, type MenuProps } from '../components/Menu';
import { Button } from '../components/Button';

const defaults: MenuProps = {
  opened: false,
  target: <Button>Open menu</Button>,
  data: [
    { id: '1', label: 'Header' },
    { id: '2', item: 'Item 1' },
    { id: '3', item: 'Item 2' },
    { id: '4', divider: true },
    { id: '5', item: 'Item 3' },
  ],
};

const render = function Component(props: MenuProps) {
  const [args, setArgs] = useArgs();

  const handleChange = (opened: boolean) => {
    setArgs({ opened });
  };

  return <Menu {...props} opened={args.opened} onChange={handleChange} />;
};

const meta: Meta<MenuProps> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        height: '250px',
      },
    },
  },
  argTypes: {
    arrowOffset: {
      control: { type: 'number' },
    },
    arrowPosition: {
      options: ['center', 'side'],
      control: { type: 'select' },
    },
    arrowRadius: {
      control: { type: 'number' },
    },
    arrowSize: {
      control: { type: 'number' },
    },
    clickOutsideEvents: {
      control: { type: 'array' },
    },
    closeDelay: {
      control: { type: 'number' },
    },
    closeOnClickOutside: {
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
    },
    closeOnItemClick: {
      control: { type: 'boolean' },
    },
    defaultOpened: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    id: {
      control: { type: 'text' },
    },
    keepMounted: {
      control: { type: 'boolean' },
    },
    loop: {
      control: { type: 'boolean' },
    },
    offset: {
      control: { type: 'number' },
    },
    openDelay: {
      control: { type: 'number' },
    },
    opened: {
      control: { type: 'boolean' },
    },
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
    returnFocus: {
      control: { type: 'boolean' },
    },
    shadow: {
      control: { type: 'text' },
    },
    trigger: {
      options: ['click', 'hover'],
      control: { type: 'select' },
    },
    width: {
      control: { type: 'text' },
    },
    withArrow: {
      control: { type: 'boolean' },
    },
    withinPortal: {
      control: { type: 'boolean' },
    },
    zIndex: {
      control: { type: 'number' },
    },
  },
};

export default meta;

export const Default: StoryObj<MenuProps> = {
  args: {
    ...defaults,
  },
  render,
};

export const WithArrow: StoryObj<MenuProps> = {
  args: {
    ...defaults,
    withArrow: true,
  },
  render,
};

export const RightPositioned: StoryObj<MenuProps> = {
  args: {
    ...defaults,
    position: 'right',
  },
  render,
};

export const WithIcons: StoryObj<MenuProps> = {
  args: {
    ...defaults,
    data: [
      { id: '1', item: 'First item', props: { icon: <MetaMask /> } },
      { id: '2', item: 'Second item' },
      { id: '3', divider: true },
      { id: '4', label: 'Label' },
      { id: '5', item: 'Third item' },
    ],
  },
  render,
};

export const HoverTrigger: StoryObj<MenuProps> = {
  args: {
    ...defaults,
    trigger: 'hover',
  },
  render,
};
