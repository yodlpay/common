import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { createStyles } from '@mantine/core';
import { ExtendedMantineSize } from '../types';
import { Button } from './Button';
import { Flex } from './Flex';
import { Text } from './Text';

type StylesProps = {
  shouldGrow: boolean;
};

const useStyles = createStyles((theme, { shouldGrow }: StylesProps) => ({
  container: {
    flexGrow: shouldGrow ? 1 : 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
  },
  icon: {
    fill: theme.colors?.subtle?.[0],
  },
}));

export type ErrorIndicatorProps = {
  error?: Error | string | null;
  errorSize?: number | ExtendedMantineSize;
  iconSize?: number | string;
  horizontal?: boolean;
  shouldGrow?: boolean;
  verticalMargin?: number;
  horizontalMargin?: number;
  withRetry?: boolean;
  className?: string;
  handleRetry?: () => void;
};

export const ErrorIndicator = ({
  error,
  className,
  errorSize = 15,
  iconSize = 18,
  horizontal = false,
  shouldGrow = true,
  verticalMargin = 16,
  horizontalMargin = 0,
  withRetry = false,
  handleRetry = () => null,
}: ErrorIndicatorProps) => {
  const { classes } = useStyles({ shouldGrow });

  return (
    <Flex
      grow={shouldGrow ? 1 : 0}
      align="center"
      justify="center"
      direction="column"
      className={className}
    >
      <Flex
        align="center"
        justify="center"
        direction={horizontal ? 'row' : 'column'}
      >
        <Flex mt={verticalMargin}>
          <ExclamationTriangleIcon
            className={classes.icon}
            width={iconSize}
            height={iconSize}
          />
        </Flex>
        <Flex my={verticalMargin} ml={horizontalMargin}>
          <Text c="subtle.0" size={errorSize}>
            {typeof error === 'string'
              ? error
              : (error as Error)?.message ?? 'Unknown error'}
          </Text>
        </Flex>
      </Flex>
      {withRetry && (
        <Flex my={16}>
          <Button
            c="onColor.0"
            color="brand.0"
            className={classes.button}
            onClick={handleRetry}
          >
            Try again
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
