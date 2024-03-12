import { clsx, createStyles } from '@mantine/core'
import { ExtendedMantineSize } from '../types'
import { Flex } from './Flex'
import { Loader } from './Loader'
import { Text } from './Text'

type StylesProps = {
  shouldGrow: boolean
}

const useStyles = createStyles((theme, { shouldGrow }: StylesProps) => ({
  container: {
    flexGrow: shouldGrow ? 1 : 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export type LoadingIndicatorProps = {
  label: string
  labelSize?: ExtendedMantineSize
  spinnerSize?: ExtendedMantineSize
  horizontal?: boolean
  shouldGrow?: boolean
  verticalMargin?: number
  horizontalMargin?: number
  className?: string
}

export const LoadingIndicator = ({
  label,
  className,
  labelSize = 15,
  spinnerSize = 18,
  horizontal = false,
  shouldGrow = true,
  verticalMargin = 16,
  horizontalMargin = 4,
}: LoadingIndicatorProps) => {
  const { classes } = useStyles({ shouldGrow })

  return (
    <Flex
      className={clsx(classes.container, className)}
      direction={horizontal ? 'row' : 'column'}
    >
      <Flex mt={verticalMargin}>
        <Loader color="subtle.0" size={spinnerSize} />
      </Flex>
      <Flex my={verticalMargin} ml={horizontalMargin}>
        <Text c="subtle.0" size={labelSize}>
          {label}
        </Text>
      </Flex>
    </Flex>
  )
}
