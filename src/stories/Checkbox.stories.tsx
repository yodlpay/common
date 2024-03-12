import { createStyles } from '@mantine/core'
import type { Meta, StoryObj } from '@storybook/react'
import { Usdc } from 'react-web3-icons'
import { Checkbox, type CheckboxProps } from '../components/Checkbox'
import { useArgs } from '@storybook/preview-api'

const useStyles = createStyles(() => ({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
}))

const StyleProvider: React.FC<{
  children: (classes: ReturnType<typeof useStyles>) => JSX.Element
}> = ({ children }) => {
  const classes = useStyles()
  return children(classes)
}

const defaults: CheckboxProps = {
  color: 'brand.0',
  label: 'Sample Label',
  labelPosition: 'right',
  size: 'md',
  checked: false,
}

const render = function Component(args: CheckboxProps) {
  const [, setArgs] = useArgs()

  const handleChange = (checked: boolean) => {
    setArgs({ checked })
  }

  return <Checkbox {...args} onChange={handleChange} />
}

const meta: Meta<CheckboxProps> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    labelPosition: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    variant: {
      options: ['default', 'outline'],
      control: { type: 'select' },
    },
  },
}

export default meta

export const Default: StoryObj<CheckboxProps> = {
  args: {
    ...defaults,
  },
  render,
}

export const WithDescription: StoryObj<CheckboxProps> = {
  args: {
    ...defaults,
    description: 'Sample description',
  },
  render,
}

export const WithIcon: StoryObj<CheckboxProps> = {
  args: {
    ...defaults,
    icon: <Usdc width="16px" height="16px" />,
  },
  render,
}

export const WithError: StoryObj<CheckboxProps> = {
  args: {
    ...defaults,
    error: 'This is an error message',
  },
  render,
}

export const Outline: StoryObj<CheckboxProps> = {
  args: {
    ...defaults,
    variant: 'outline',
    icon: <Usdc width="16px" height="16px" />,
  },
  render,
}

export const CheckboxGroupStory: StoryObj<CheckboxProps> = {
  render: () => (
    <StyleProvider>
      {({ classes }) => (
        <Checkbox.Group defaultValue={['option1']} className={classes.group}>
          <Checkbox label="Option 1" value="option1" />
          <Checkbox label="Option 2" value="option2" />
          <Checkbox label="Option 3" value="option3" />
        </Checkbox.Group>
      )}
    </StyleProvider>
  ),
}

CheckboxGroupStory.storyName = 'Checkbox Group'
