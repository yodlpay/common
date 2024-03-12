import type { Meta, StoryObj } from '@storybook/react'
import { Modal, type ModalProps } from '../components/Modal'
import { Button } from '../components/Button'
import { useArgs } from '@storybook/preview-api'
import { ScrollArea } from '@mantine/core'
import { SIZE_OPTIONS } from '../styles'

const defaults = {
  centered: false,
  closeButtonProps: {},
  closeOnClickOutside: true,
  closeOnEscape: true,
  fullScreen: false,
  id: 'modal',
  keepMounted: false,
  lockScroll: false,
  overlayProps: {},
  padding: 'md' as 'md' | 'xl' | 'xs' | 'sm' | 'lg',
  portalProps: {},
  size: 'md',
  radius: 'md',
  returnFocus: true,
  scrollAreaComponent: ScrollArea.Autosize,
  shadow: 'xl',
  target: '',
  title: 'Title',
  transitionProps: {},
  trapFocus: true,
  withCloseButton: true,
  withOverlay: true,
  withinPortal: true,
  xOffset: '5vw',
  yOffset: '5vw',
  zIndex: 200,
  opened: false,
  children: <div>Content</div>,
  onClose: () => null,
}

const render = function Component(args: ModalProps) {
  const [, setArgs] = useArgs()

  const handleToggle = () => {
    setArgs({ opened: !args.opened })
  }

  return (
    <div>
      <Modal {...args} onClose={handleToggle} />
      <Button onClick={handleToggle}>Open modal</Button>
    </div>
  )
}

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    centered: {
      control: { type: 'boolean' },
    },
    closeOnClickOutside: {
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
    },
    fullScreen: {
      control: { type: 'boolean' },
    },
    keepMounted: {
      control: { type: 'boolean' },
    },
    lockScroll: {
      control: { type: 'boolean' },
    },
    padding: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
    },
    shadow: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
    },
    radius: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
    },
    returnFocus: {
      control: { type: 'boolean' },
    },
    trapFocus: {
      control: { type: 'boolean' },
    },
    withCloseButton: {
      control: { type: 'boolean' },
    },
    withOverlay: {
      control: { type: 'boolean' },
    },
    withinPortal: {
      control: { type: 'boolean' },
    },
    size: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
    },
    variant: {
      options: ['light', 'filled', 'outline', 'dot', 'gradient'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...defaults,
    opened: false,
    children: <div>Content</div>,
  },
  render,
}

export const Centered: Story = {
  args: {
    ...defaults,
    opened: false,
    centered: true,
    children: <div>Content</div>,
  },
  render,
}

export const FullScreen: Story = {
  args: {
    ...defaults,
    opened: false,
    fullScreen: true,
    children: <div>Content</div>,
  },
  render,
}
