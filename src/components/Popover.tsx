// Popover.tsx
import {
  Popover as MantinePopover,
  type PopoverProps as MantinePopoverProps,
  type MantineShadow,
  type PortalProps,
  type TransitionProps,
} from "@mantine/core";
import type {
  FloatingAxesOffsets,
  FloatingPosition,
} from "@mantine/core/lib/Floating/types";
import type {
  PopoverMiddlewares,
  PopoverWidth,
} from "@mantine/core/lib/Popover/Popover.types";
import { type ReactNode } from "react";

export type PopoverProps = {
  /** Arrow offset from the edge of the dropdown in px */
  arrowOffset?: number;

  /** Arrow position relative to dropdown */
  arrowPosition?: "center" | "side";

  /** Arrow border-radius */
  arrowRadius?: number;

  /** Arrow size in px */
  arrowSize?: number;

  /** Popover class name */
  className?: string;

  /** Events that trigger outside clicks */
  clickOutsideEvents?: string[];

  /** Determines whether dropdown should be closed on outside clicks, defaults to true */
  closeOnClickOutside?: boolean;

  /** Determines whether dropdown should be closed when Escape key is pressed, defaults to true */
  closeOnEscape?: boolean;

  /** Initial opened state for uncontrolled component */
  defaultOpened?: boolean;

  /** If set, popover dropdown will not render */
  disabled?: boolean;

  /** id base to create accessibility connections */
  id?: string;

  /** If set dropdown will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
  keepMounted?: boolean;

  /** Floating UI middlewares to configure position handling */
  middlewares?: PopoverMiddlewares;

  /** Default Y axis or either (main, cross, alignment) X and Y axis space between target element and dropdown */
  offset?: number | FloatingAxesOffsets;

  /** Called with current state when dropdown opens or closes */
  onChange?: (opened: boolean) => void;

  /** Called when dropdown closes */
  onClose?: () => void;

  /** Called when dropdown opens */
  onOpen?: () => void;

  /** Called when dropdown position changes */
  onPositionChange?: (position: FloatingPosition) => void;

  /** Controls dropdown opened state */
  opened: boolean;

  /** Props to pass down to the portal when withinPortal is true */
  portalProps?: Omit<PortalProps, "children" | "withinPortal">;

  /** Dropdown position relative to target */
  position?: PopoverWidth;

  /** useEffect dependencies to force update dropdown position */
  positionDependencies?: any[];

  /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
  radius?: number | "xs" | "sm" | "md" | "lg" | "xl";

  /** Determines whether focus should be automatically returned to control when dropdown closes, false by default */
  returnFocus?: boolean;

  /** Key of theme.shadow or any other valid CSS box-shadow value */
  shadow?: MantineShadow;

  /** Props added to Transition component that used to animate dropdown presence */
  transitionProps?: Partial<Omit<TransitionProps, "mounted">>;

  /** Determines whether focus should be trapped within dropdown, defaults to false */
  trapFocus?: boolean;

  /** Dropdown width, or 'target' to make dropdown width the same as target element */
  width?: PopoverWidth;

  /** Determines whether component should have an arrow */
  withArrow?: boolean;

  /** Determines whether dropdown and target element should have accessible roles, defaults to true */
  withRoles?: boolean;

  /** Determines whether dropdown should be rendered within Portal, defaults to false */
  withinPortal?: boolean;

  /** Dropdown z-index */
  zIndex?: number;

  /** Content for the Popover.Target and Popover.Dropdown components */
  children: ReactNode;
} & MantinePopoverProps;

const InnerPopover: React.FC<PopoverProps> = ({
  children,
  opened = false,
  onChange = () => null,
  className,
  ...props
}) => {
  const handleChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <MantinePopover
      {...props}
      opened={opened}
      onChange={handleChange}
      classNames={{ dropdown: className }}
    >
      {children}
    </MantinePopover>
  );
};

const PopoverTarget = MantinePopover.Target;
const PopoverDropdown = MantinePopover.Dropdown;

const Popover = Object.assign(InnerPopover, {
  Target: PopoverTarget,
  Dropdown: PopoverDropdown,
});

export { Popover };
