import {
  Indicator as MantineIndicator,
  type IndicatorProps as MantineIndicatorProps,
  type MantineColor,
} from '@mantine/core';
import type { ReactNode } from 'react';

export type IndicatorProps = {
  /** Element that should have an indicator */
  children: ReactNode;

  /** Color from theme.colors or any other valid CSS color value */
  color?: MantineColor;

  /** When component is disabled it renders children without indicator */
  disabled?: boolean;

  /** Determines whether indicator container should be an inline element */
  inline?: boolean;

  /** Indicator label */
  label?: ReactNode;

  /** Changes position offset, usually used when element has border-radius */
  offset?: number;

  /** Indicator position relative to child element */
  position?:
    | 'bottom-end'
    | 'bottom-start'
    | 'top-end'
    | 'top-start'
    | 'bottom-center'
    | 'top-center'
    | 'middle-center'
    | 'middle-end'
    | 'middle-start';

  /** Indicator processing animation */
  processing?: boolean;

  /** Key of theme.radius or any valid CSS value to set border-radius, 1000rem by default */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Indicator width and height */
  size?: string | number;

  /** Determines whether indicator should have border */
  withBorder?: boolean;

  /** Indicator z-index */
  zIndex?: number;
} & MantineIndicatorProps;

export const Indicator = ({ children, ...props }: IndicatorProps) => {
  return <MantineIndicator {...props}>{children}</MantineIndicator>;
};
