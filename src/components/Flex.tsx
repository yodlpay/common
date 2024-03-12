import {
  Flex as MantineFlex,
  createStyles,
  type FlexProps as MantineFlexProps,
  type SpacingValue,
  type SystemProp,
  clsx,
} from '@mantine/core'
import React from 'react'

type StylesProps = {
  grow?: number
  flex?: number
}

const useStyles = createStyles((theme, { grow, flex }: StylesProps) => ({
  flex: {
    ...(grow !== undefined && { flexGrow: grow as number }),
    ...(flex !== undefined && { flex }),
  },
}))

export type FlexProps = {
  /**
   * `align-items` CSS property
   */
  align?: string

  /**
   * `column-gap` CSS property
   */
  columnGap?: SystemProp<SpacingValue>

  /**
   * `flex-direction` CSS property
   */
  direction?: string

  /**
   * `gap` CSS property
   */
  gap?: SystemProp<SpacingValue>

  /**
   * `justify-content` CSS property
   */
  justify?: string

  /**
   * `row-gap` CSS property
   */
  rowGap?: SystemProp<SpacingValue>

  /**
   * `flex-wrap` CSS property
   */
  wrap?: string

  /**
   * `flex-grow` CSS property
   */
  grow?: number

  /**
   * `flex` CSS property
   */
  flex?: number

  /**
   * Flex class name
   */
  className?: string
} & MantineFlexProps

export const Flex = ({ className, flex, grow, ...props }: FlexProps) => {
  const { classes } = useStyles({ grow, flex })

  return <MantineFlex {...props} className={clsx(classes.flex, className)} />
}
