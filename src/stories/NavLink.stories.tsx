/* eslint-disable jsx-a11y/anchor-has-content */
import { CheckBadgeIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { createStyles } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react";
import { Ethereum, MetaMask, Shib } from "react-web3-icons";
import { MINIMAL_SIZE_OPTIONS } from "../styles";
import { NavLink, type NavLinkProps } from "../components/NavLink";

const useStyles = createStyles((theme) => ({
  chevronIcon: {
    fill: theme.colors?.subtle?.[0],
  },
  badge: {
    marginLeft: "4px",
  },
}));

const StyleProvider: React.FC<{
  children: (classes: ReturnType<typeof useStyles>) => JSX.Element;
}> = ({ children }) => {
  const classes = useStyles();
  return children(classes);
};

// TODO - WIP

const defaults: NavLinkProps = {
  active: false,
  childrenOffset: "md",
  color: "brand.0",
  defaultOpened: false,
  disableRightSectionRotation: false,
  disabled: false,
  noWrap: false,
  variant: "subtle",
  size: "md",
  style: { background: "black" },
  withBorder: true,
};

const meta: Meta<NavLinkProps> = {
  title: "Components/NavLink",
  component: NavLink,
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: { type: "boolean" },
    },
    childrenOffset: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    color: {
      control: { type: "color" },
    },
    defaultOpened: {
      control: { type: "boolean" },
    },
    disableRightSectionRotation: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    noWrap: {
      control: { type: "boolean" },
    },
    variant: {
      options: ["light", "filled", "subtle"],
      control: { type: "select" },
    },
    withBorder: {
      control: { type: "boolean" },
    },
    size: {
      options: MINIMAL_SIZE_OPTIONS,
      control: { type: "select" },
    },
  },
};

export default meta;

export const SmallWithFullProps: StoryObj<NavLinkProps> = {
  args: {
    ...defaults,
    label: "SHIB",
    badge: (
      <StyleProvider>
        {({ classes }) => (
          <CheckBadgeIcon
            width="15px"
            height="15px"
            className={classes.badge}
          />
        )}
      </StyleProvider>
    ),
    description: "SHIBA INU",
    icon: <Shib fontSize="32px" />,
    rightLabel: "671M SHIB",
    rightDescription: "≈ $53.11",
    rightIcon: (
      <StyleProvider>
        {({ classes }) => (
          <ChevronRightIcon
            className={classes.chevronIcon}
            width="32px"
            height="32px"
          />
        )}
      </StyleProvider>
    ),
    size: "sm",
  },
};

export const MediumWithIconAndLabel: StoryObj<NavLinkProps> = {
  args: {
    ...defaults,
    label: "Ethereum",
    icon: <Ethereum fontSize="32px" />,
    rightIcon: (
      <StyleProvider>
        {({ classes }) => (
          <ChevronRightIcon
            className={classes.chevronIcon}
            width="32px"
            height="32px"
          />
        )}
      </StyleProvider>
    ),
    size: "md",
  },
};

export const LargeWithIconAndLabel: StoryObj<NavLinkProps> = {
  args: {
    ...defaults,
    label: "MetaMask",
    icon: <MetaMask fontSize="32px" />,
    rightIcon: (
      <StyleProvider>
        {({ classes }) => (
          <ChevronRightIcon
            className={classes.chevronIcon}
            width="32px"
            height="32px"
          />
        )}
      </StyleProvider>
    ),
    size: "lg",
  },
};
