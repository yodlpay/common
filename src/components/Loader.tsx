import { Loader as MantineLoader } from '@mantine/core';
import type {
  MantineColor,
  LoaderProps as MantineLoaderProps,
} from '@mantine/core';
import { type ExtendedMantineSize } from '../types';

export type LoaderProps = {
  /**
   * Loader color from theme.
   */
  color?: MantineColor;

  /**
   * Predefined sizes or number for loader width.
   */
  size?: ExtendedMantineSize;

  /**
   * Loader appearance variant.
   */
  variant?: 'bars' | 'oval' | 'dots';
  /**
   * Loader class name
   */
  className?: string;
} & MantineLoaderProps;

export const Loader = ({ className, ...props }: LoaderProps) => {
  return <MantineLoader {...props} className={className} />;
};
