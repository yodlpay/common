// Popover.stories.tsx
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import React, { type ReactElement } from "react";
import { Button } from "../components/Button";
import { Popover, type PopoverProps } from "../components/Popover";

const defaults: PopoverProps = {
  arrowOffset: 10,
  arrowPosition: "center",
  arrowRadius: 4,
  arrowSize: 6,
  clickOutsideEvents: ["mousedown", "touchstart"],
  closeOnClickOutside: true,
  closeOnEscape: true,
  children: null,
  defaultOpened: false,
  disabled: false,
  id: "default-popover",
  keepMounted: false,
  offset: 8,
  onChange: undefined,
  onClose: undefined,
  onOpen: undefined,
  onPositionChange: undefined,
  opened: false,
  portalProps: {},
  position: "bottom",
  positionDependencies: [],
  radius: "sm",
  returnFocus: false,
  shadow: "md",
  transitionProps: { duration: 150, transition: "fade" },
  trapFocus: false,
  width: 200,
  withArrow: true,
  withRoles: true,
  withinPortal: false,
  zIndex: 1,
};

const render = function Component(props: PopoverProps) {
  const [args, setArgs] = useArgs();

  const handleToggle = () => {
    setArgs({ opened: !props.opened });
  };

  const componentChildren =
    props.children &&
    typeof props.children === "object" &&
    "props" in props.children &&
    "children" in props.children.props
      ? props.children.props.children
      : null;

  const firstChild = React.isValidElement(componentChildren[0])
    ? componentChildren[0]
    : null;

  const targetWithOnClick = firstChild
    ? React.cloneElement(firstChild as ReactElement, { onClick: handleToggle })
    : null;

  const restOfChildren =
    componentChildren && Array.isArray(componentChildren)
      ? componentChildren.slice(1)
      : null;

  return (
    <div>
      <Popover {...props} opened={args.opened}>
        {targetWithOnClick}
        {restOfChildren}
      </Popover>
    </div>
  );
};

const meta: Meta<PopoverProps> = {
  title: "Components/Popover",
  component: Popover,
  argTypes: {
    arrowOffset: {
      control: { type: "number" },
    },
    arrowPosition: {
      options: ["center", "side"],
      control: { type: "select" },
    },
    arrowRadius: {
      control: { type: "number" },
    },
    arrowSize: {
      control: { type: "number" },
    },
    clickOutsideEvents: {
      control: { type: "array" },
    },
    closeOnClickOutside: {
      control: { type: "boolean" },
    },
    closeOnEscape: {
      control: { type: "boolean" },
    },
    defaultOpened: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    id: {
      control: { type: "text" },
    },
    keepMounted: {
      control: { type: "boolean" },
    },
    middlewares: {
      control: { type: "object" },
    },
    offset: {
      control: { type: "object" },
    },
    onChange: {
      action: "changed",
    },
    onClose: {
      action: "closed",
    },
    onOpen: {
      action: "opened",
    },
    onPositionChange: {
      action: "positionChanged",
    },
    opened: {
      control: { type: "boolean" },
    },
    portalProps: {
      control: { type: "object" },
    },
    position: {
      options: [
        "bottom",
        "left",
        "right",
        "top",
        "bottom-end",
        "bottom-start",
        "left-end",
        "left-start",
        "right-end",
        "right-start",
        "top-end",
        "top-start",
      ],
      control: { type: "select" },
    },
    positionDependencies: {
      control: { type: "array" },
    },
    radius: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    returnFocus: {
      control: { type: "boolean" },
    },
    shadow: {
      control: { type: "text" },
    },
    transitionProps: {
      control: { type: "object" },
    },
    trapFocus: {
      control: { type: "boolean" },
    },
    width: {
      control: { type: "text" },
    },
    withArrow: {
      control: { type: "boolean" },
    },
    withRoles: {
      control: { type: "boolean" },
    },
    withinPortal: {
      control: { type: "boolean" },
    },
    zIndex: {
      control: { type: "number" },
    },
    children: {
      control: { type: "object" },
    },
  },
};

export default meta;

export const Default: StoryObj<PopoverProps> = {
  args: {
    ...defaults,
    children: (
      <>
        <Popover.Target>
          <Button c="onColor.0" color="brand.0">
            Click me
          </Button>
        </Popover.Target>
        <Popover.Dropdown>This is the popover content!</Popover.Dropdown>
      </>
    ),
  },
  render,
};

export const Disabled: StoryObj<PopoverProps> = {
  args: {
    ...defaults,
    disabled: true,
    children: (
      <>
        <Popover.Target>
          <Button c="onColor.0" color="brand.0">
            Disabled popover
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          This popover is disabled and should not open.
        </Popover.Dropdown>
      </>
    ),
  },
  render,
};

export const CustomPosition: StoryObj<PopoverProps> = {
  args: {
    ...defaults,
    position: "right-end",
    children: (
      <>
        <Popover.Target>
          <Button c="onColor.0" color="brand.0">
            Custom position
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          This popover uses custom positioning.
        </Popover.Dropdown>
      </>
    ),
  },
  render,
};

export const KeepMounted: StoryObj<PopoverProps> = {
  args: {
    ...defaults,
    keepMounted: true,
    children: (
      <>
        <Popover.Target>
          <Button c="onColor.0" color="brand.0">
            Keep mounted
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          This popover stays in the DOM when closed.
        </Popover.Dropdown>
      </>
    ),
  },
  render,
};
