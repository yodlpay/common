import React from 'react';
import { Collapse as MantineCollapse } from '@mantine/core';

export type CollapseProps = {
  /**
   * Should opacity be animated.
   */
  animateOpacity?: boolean;

  /**
   * Content that should be collapsed.
   */
  children: React.ReactNode;

  /**
   * Opened state.
   */
  in: boolean;

  /**
   * Called each time transition ends.
   */
  onTransitionEnd?: () => void;

  /**
   * Transition duration in milliseconds.
   */
  transitionDuration?: number;

  /**
   * Transition timing function (ease, linear, etc.).
   */
  transitionTimingFunction?: string;
  /**
   * Collapse class name
   */
  className?: string;
};

export const Collapse = ({ className, ...props }: CollapseProps) => {
  return <MantineCollapse {...props} className={className} />;
};
