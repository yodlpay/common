import type { Meta, StoryObj } from '@storybook/react'
import {
  ErrorIndicator,
  type ErrorIndicatorProps,
} from '../components/ErrorIndicator'

const defaults: ErrorIndicatorProps = {
  error: 'Something went wrong',
  errorSize: 15,
  iconSize: 18,
  horizontal: false,
  shouldGrow: true,
  verticalMargin: 0,
  horizontalMargin: 0,
  withRetry: false,
}

const meta: Meta<ErrorIndicatorProps> = {
  title: 'Components/ErrorIndicator',
  component: ErrorIndicator,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'text',
      description: 'Error message or object',
    },
    errorSize: {
      control: 'number',
      description: 'Font size of the error message',
    },
    iconSize: {
      control: 'number',
      description: 'Size of the icon',
    },
    horizontal: {
      control: 'boolean',
      description: 'Layout direction',
    },
    shouldGrow: {
      control: 'boolean',
      description: 'Whether the component should grow to fill its container',
    },
    withRetry: {
      control: 'boolean',
      description: 'Displays a retry button',
    },
  },
} satisfies Meta<typeof ErrorIndicator>

export default meta

export const Default: StoryObj<ErrorIndicatorProps> = {
  args: {
    ...defaults,
    verticalMargin: 6,
  },
}

export const WithRetry: StoryObj<ErrorIndicatorProps> = {
  args: {
    ...defaults,
    withRetry: true,
    handleRetry: () => alert('Retry clicked'),
    verticalMargin: 6,
  },
}

export const HorizontalLayout: StoryObj<ErrorIndicatorProps> = {
  args: {
    ...defaults,
    horizontal: true,
    horizontalMargin: 6,
  },
}
