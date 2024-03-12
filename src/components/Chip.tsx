import {
  Chip as MantineChip,
  createStyles,
  type ChipProps as MantineChipProps,
  clsx,
} from '@mantine/core'
import { forwardRef, type ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { type ExtendedMantineSize } from '../types'
import { px } from '@mantine/core'

const paddingSizes = {
  xs: px('1rem'),
  sm: px('1.25rem'),
  md: px('1.5rem'),
  lg: px('1.75rem'),
  xl: px('2rem'),
} as Record<ExtendedMantineSize, number>

type StylesProps = {
  size: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const useStyles = createStyles((theme, { size }: StylesProps) => {
  return {
    chip: {
      '&>label': {
        '&[data-checked]': {
          paddingLeft: `${paddingSizes[size]}px`,
          paddingRight: `${paddingSizes[size]}px`,
        },
        '&>span': {
          display: 'none',
        },
      },
    },
  }
})

export type ChipProps = {
  /**
   * Chip checked state
   */
  checked?: boolean

  /**
   * Chip label
   */
  children: ReactNode

  /**
   * Chip color
   */
  color?: string

  /**
   * Chip id to bind input with label
   */
  id?: string

  /**
   * Chip radius size (key of theme.radius)
   */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Chip size
   */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Chip input type
   */
  type?: 'checkbox' | 'radio'

  /**
   * Chip variant
   */
  variant?: 'outline' | 'light' | 'filled'

  /**
   * Chip props added to wrapper element
   */
  wrapperProps?: Record<string, any>
  /**
   * Chip onChange handler
   */
  onChange?: (value: boolean) => void
  /**
   * Chip name attribute (used with forms)
   */
  name?: string
  /**
   * Chip should use Controller from react-hook-form
   */
  useController?: boolean
  /**
   * Chip class name
   */
  className?: string
} & MantineChipProps

/**
 * Chip component for user interaction
 */
export const Chip = forwardRef(
  (
    {
      name,
      children,
      className,
      size = 'md',
      checked = false,
      onChange = () => null,
      useController = false,
      ...props
    }: ChipProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const context = useFormContext()
    const { classes } = useStyles({ size })

    if (useController && name && context) {
      return (
        <Controller
          name={name}
          control={context.control}
          render={({ field }) => (
            <MantineChip
              {...props}
              size={size}
              checked={field.value}
              onChange={(value: boolean) => field.onChange(value)}
              className={clsx(classes.chip, className)}
              ref={ref}
            >
              {children}
            </MantineChip>
          )}
        />
      )
    }

    return (
      <MantineChip
        {...props}
        size={size}
        checked={checked}
        onChange={onChange}
        className={clsx(classes.chip, className)}
        ref={ref}
      >
        {children}
      </MantineChip>
    )
  },
)
