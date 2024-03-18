import type { Meta, StoryObj } from '@storybook/react';
import { Text, type TextProps } from '../components/Text';
import { MetaMask } from 'react-web3-icons';
import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  leftIcon: {
    marginRight: '12px',
  },
  rightIcon: {
    marginLeft: '12px',
  },
}));

const StyleProvider: React.FC<{
  children: (classes: ReturnType<typeof useStyles>) => JSX.Element;
}> = ({ children }) => {
  const classes = useStyles();
  return children(classes);
};

const defaults: TextProps = {
  align: 'left',
  color: 'subtle.0',
  inherit: false,
  inline: false,
  italic: false,
  size: 'md',
  span: false,
  strikethrough: false,
  transform: 'none',
  truncate: true,
  underline: false,
  variant: 'text' as 'text' | 'gradient',
  weight: 400,
  children: 'This is a sample text.',
};

const meta: Meta<TextProps> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    align: {
      options: ['left', 'right', 'center', 'justify'],
      control: { type: 'select' },
    },
    color: {
      control: { type: 'color' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    transform: {
      options: ['none', 'capitalize', 'lowercase', 'uppercase'],
      control: { type: 'select' },
    },
    variant: {
      options: ['text', 'gradient'],
      control: { type: 'select' },
    },
    weight: {
      control: { type: 'number' },
    },
  },
};

export default meta;

export const Default: StoryObj<TextProps> = {
  args: {
    ...defaults,
  },
};

export const GradientText: StoryObj<TextProps> = {
  args: {
    ...defaults,
    variant: 'gradient',
    gradient: {
      from: 'cyan',
      to: 'blue',
      deg: 45,
    },
  },
};

export const TextWithLeftIcon: StoryObj<TextProps> = {
  args: {
    ...defaults,
    icon: (
      <StyleProvider>
        {({ classes }) => <MetaMask className={classes.leftIcon} />}
      </StyleProvider>
    ),
  },
};

export const TextWithRightIcon: StoryObj<TextProps> = {
  args: {
    ...defaults,
    rightIcon: (
      <StyleProvider>
        {({ classes }) => <MetaMask className={classes.rightIcon} />}
      </StyleProvider>
    ),
  },
};

export const TextWithBothIcons: StoryObj<TextProps> = {
  args: {
    ...defaults,
    icon: (
      <StyleProvider>
        {({ classes }) => <MetaMask className={classes.leftIcon} />}
      </StyleProvider>
    ),
    rightIcon: (
      <StyleProvider>
        {({ classes }) => <MetaMask className={classes.rightIcon} />}
      </StyleProvider>
    ),
  },
};
