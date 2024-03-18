import { createStyles } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode } from 'react';
import { Dai, Ethereum, Matic, Usdc } from 'react-web3-icons';
import { ListItem } from '../components/ListItem';

// TODO - WIP

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        height: '150px',
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const useStyles = createStyles({
  tokenWrapper: {
    '& > svg': {
      margin: '0 3px',
    },
  },
});

type TokenWrapperProps = {
  children: ReactNode;
};

const TokenWrapper = ({ children }: TokenWrapperProps) => {
  const { classes } = useStyles();

  return <div className={classes.tokenWrapper}>{children}</div>;
};

export const Primary: Story = {
  args: {
    data: [
      {
        label: 'Ethereum',
        rightSection: (
          <TokenWrapper>
            <Ethereum />
            <Usdc />
            <Dai />
          </TokenWrapper>
        ),
      },
      {
        label: 'Polygon',
        rightSection: (
          <TokenWrapper>
            <Matic />
            <Usdc />
          </TokenWrapper>
        ),
      },
      {
        label: 'Arbitrum',
        rightSection: (
          <TokenWrapper>
            <Dai />
          </TokenWrapper>
        ),
      },
    ],
    onClick: () => null,
  },
};
