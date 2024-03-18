import {
  ExclamationCircleIcon,
  LightBulbIcon,
} from '@heroicons/react/20/solid';
import { clsx, createStyles, rem } from '@mantine/core';
import { type ReactNode } from 'react';
import { ExtendedMantineSize } from '../types';
import { Flex } from './Flex';
import { Text } from './Text';

type StylesProps = {
  shouldGrow: boolean;
  padding: string;
  backgroundShade: number;
  withBorder: boolean;
  borderRadius: string;
};

const useStyles = createStyles(
  (
    theme,
    {
      shouldGrow,
      padding,
      backgroundShade,
      withBorder,
      borderRadius,
    }: StylesProps,
  ) => ({
    container: {
      flexGrow: shouldGrow ? 1 : 0,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius,
      ...(backgroundShade !== -1 && {
        backgroundColor: theme.colors?.level?.[backgroundShade],
      }),
      ...(padding && { padding }),
      ...(withBorder && { border: `1px solid ${theme.colors?.level?.[1]}` }),
    },
    icon: {
      fill: theme.colors?.subtle?.[0],
    },
  }),
);

export type WarningIndicatorProps = {
  label: ReactNode;
  description?: string;
  labelColor?: string;
  labelSize?: number | ExtendedMantineSize;
  iconSize?: number | string;
  horizontal?: boolean;
  shouldGrow?: boolean;
  verticalMargin?: number;
  withBorder?: boolean;
  labelBold?: boolean;
  horizontalMargin?: number;
  borderRadius?: string;
  padding?: string;
  backgroundShade?: number;
  type?: 'info' | 'warning';
  className?: string;
};

export const WarningIndicator = ({
  label,
  className,
  description = '',
  labelColor = 'primary.0',
  labelSize = 15,
  iconSize = 18,
  horizontal = false,
  shouldGrow = true,
  withBorder = false,
  labelBold = false,
  verticalMargin = 16,
  horizontalMargin = 0,
  borderRadius = rem(8),
  padding = '',
  type = 'warning',
  backgroundShade = -1,
}: WarningIndicatorProps) => {
  const { classes } = useStyles({
    shouldGrow,
    padding,
    backgroundShade,
    withBorder,
    borderRadius,
  });

  const sharedProps = {
    className: classes.icon,
    width: iconSize,
    height: iconSize,
  };

  const renderedIcon =
    type === 'warning' ? (
      <ExclamationCircleIcon {...sharedProps} />
    ) : (
      <LightBulbIcon {...sharedProps} />
    );

  return (
    <Flex
      className={clsx(classes.container, className)}
      direction={horizontal ? 'row' : 'column'}
    >
      <Flex mt={verticalMargin}>{renderedIcon}</Flex>
      <Flex direction="column" my={verticalMargin} ml={horizontalMargin}>
        <Text
          c={labelColor}
          weight={labelBold ? 500 : 400}
          size={labelSize}
          align={horizontal ? 'left' : 'center'}
        >
          {label}
        </Text>
        {description && (
          <Text c="subtle.0" size={13}>
            {description}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
