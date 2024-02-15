import {
  Box as MantineBox,
  type BoxProps as MantineBoxProps,
  type MantineTheme,
} from "@mantine/core";
import React from "react";

export type BoxProps = {
  /**
   * A polymorphic component, you can change the root element.
   */
  component?: "div" | "a";

  /**
   * Inline styles applied to the root element.
   */
  sx?: MantineTheme;

  /**
   * Other props are passed to the root element.
   */
  [key: string]: unknown;
  /**
   * Box class name
   */
  className?: string;
} & MantineBoxProps;

export const Box = ({ className, ...props }: BoxProps) => {
  return <MantineBox {...props} className={className} />;
};
