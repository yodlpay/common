import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react'
import { SIZE_OPTIONS } from '../styles'
import { Chip, type ChipProps } from '../components/Chip'

const defaults = {
  checked: false,
  color: 'brand.0',
  radius: 'xl' as 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  size: 'md' as 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  type: 'checkbox' as 'checkbox' | 'radio',
  variant: 'outline' as 'outline' | 'light' | 'filled',
  name: 'chip',
}

const render = function Component(args: ChipProps) {
  const [, setArgs] = useArgs()

  const handleChange = (checked: boolean) => {
    setArgs({ checked })
  }

  return <Chip {...args} onChange={handleChange} />
}

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'color' },
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
      options: ['checkbox', 'radio'],
      control: { type: 'select' },
    },
    variant: {
      options: ['outline', 'light', 'filled'],
      control: { type: 'select' },
    },
    checked: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    ...defaults,
    children: 'Primary chip',
  },
  render,
}

export const Secondary: Story = {
  args: {
    ...defaults,
    children: 'Secondary chip',
    color: 'secondary',
  },
  render,
}

export const Small: Story = {
  args: {
    ...defaults,
    children: 'Small chip',
    size: 'sm',
  },
  render,
}

export const Large: Story = {
  args: {
    ...defaults,
    children: 'Large chip',
    size: 'lg',
  },
  render,
}

export const Checkbox: Story = {
  args: {
    ...defaults,
    children: 'Checkbox chip',
    type: 'checkbox',
  },
  render,
}

export const Radio: Story = {
  args: {
    ...defaults,
    children: 'Radio chip',
    type: 'radio',
  },
  render,
}
