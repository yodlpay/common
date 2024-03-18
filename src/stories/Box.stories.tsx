import type { Meta, StoryObj } from '@storybook/react';
import { Box, type BoxProps } from '../components/Box';
import { type MantineTheme } from '@mantine/core';

const meta: Meta<BoxProps> = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    component: {
      control: { type: 'text' },
      defaultValue: 'div',
    },
  },
};

export default meta;

export const Default: StoryObj<BoxProps> = {
  args: {
    children: 'Default Box',
    sx: (theme: MantineTheme) => ({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors?.dark?.[6]
          : theme.colors?.gray?.[0],
      textAlign: 'center',
      padding: '30px',
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors?.dark?.[5]
            : theme.colors?.gray?.[1],
      },
    }),
  },
};

export const AsAnchor: StoryObj<BoxProps> = {
  args: {
    component: 'a',
    children: 'Box as Anchor',
    href: '#',
    target: '_blank',
    sx: (theme: MantineTheme) => ({
      display: 'block',
      backgroundColor: theme.colors?.gray?.[0],
      color: theme.colors?.blue?.[7],
      textAlign: 'center',
      padding: '30px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.colors?.gray?.[1],
      },
    }),
  },
};
