import { createStyles } from '@mantine/core'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/Button'
import { Flex, type FlexProps } from '../components/Flex'

const useStyles = createStyles(() => ({
  flex: {
    height: '150px',
  },
}))

const defaults: FlexProps = {
  direction: 'row',
  align: 'center',
  justify: 'center',
  gap: 'md',
}

const render = function Component(args: FlexProps) {
  const { classes } = useStyles()

  return (
    <Flex {...args} className={classes.flex}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Flex>
  )
}

const meta: Meta<FlexProps> = {
  title: 'Components/Flex',
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        height: '200px',
      },
    },
  },
  argTypes: {
    direction: {
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      control: {
        type: 'select',
      },
    },
    align: {
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      control: {
        type: 'select',
      },
    },
    justify: {
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      control: {
        type: 'select',
      },
    },
    gap: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
}

export default meta

export const Default: StoryObj<FlexProps> = {
  args: {
    ...defaults,
  },
  render,
}

export const ColumnDirection: StoryObj<FlexProps> = {
  args: {
    ...defaults,
    direction: 'column',
  },
  render,
}
