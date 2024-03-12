import type { Meta, StoryObj } from '@storybook/react'
import { Collapse, type CollapseProps } from '../components/Collapse'
import { Button } from '../components/Button'
import { useArgs } from '@storybook/preview-api'
import { Text } from '../components/Text'
import { Flex } from '../components/Flex'

const defaults: CollapseProps = {
  in: false,
  transitionDuration: 300,
  transitionTimingFunction: 'ease',
  animateOpacity: true,
  children: 'Content inside collapse',
}

const render = function Component(args: CollapseProps) {
  const [, setArgs] = useArgs()

  const handleToggle = () => {
    setArgs({ in: !args.in })
  }

  return (
    <Flex direction="column">
      <Collapse {...args}>
        <Text color="subtle.0">Content inside collapse</Text>
      </Collapse>
      <Button w="200px" onClick={handleToggle}>
        Toggle Collapse
      </Button>
    </Flex>
  )
}

const meta: Meta<CollapseProps> = {
  title: 'Components/Collapse',
  component: Collapse,
  tags: ['autodocs'],
  argTypes: {
    in: {
      control: { type: 'boolean' },
      description: 'Open/close state of the Collapse component.',
    },
    transitionDuration: {
      control: { type: 'number' },
      description: 'Transition duration in milliseconds.',
    },
    transitionTimingFunction: {
      control: { type: 'text' },
      description: 'Transition timing function (e.g., ease, linear, etc.).',
    },
    animateOpacity: {
      control: { type: 'boolean' },
      description: 'Whether opacity should be animated or not.',
    },
  },
}

export default meta

export const Default: StoryObj<typeof meta> = {
  args: {
    ...defaults,
  },
  render,
}

export const LongerTransition: StoryObj<typeof meta> = {
  args: {
    ...defaults,
    transitionDuration: 1000,
  },
  render,
}

export const LinearTransition: StoryObj<typeof meta> = {
  args: {
    ...defaults,
    transitionTimingFunction: 'linear',
  },
  render,
}
