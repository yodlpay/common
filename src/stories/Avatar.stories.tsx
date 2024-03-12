import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, type AvatarProps } from '../components/Avatar'

const defaults: AvatarProps = {
  alt: 'User Avatar',
  color: 'brand.0',
  radius: 'xl',
  size: 'md',
  variant: 'filled',
}

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'color' },
    },
    radius: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    variant: {
      options: ['outline', 'light', 'filled', 'gradient'],
      control: {
        type: 'select',
      },
    },
  },
}

export default meta

export const Default: StoryObj<AvatarProps> = {
  args: {
    ...defaults,
    src: 'https://miro.medium.com/v2/resize:fit:1020/1*jZ9v-2QShwnfCwHlEZCmDw.png',
  },
}

export const WithCustomPlaceholder: StoryObj<AvatarProps> = {
  args: {
    ...defaults,
    children: <span>U</span>,
  },
}
