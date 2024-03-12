import {
  ActionIcon as MantineActionIcon,
  type ActionIconProps as MantineActionIconProps,
  type LoaderProps,
  type MantineColor,
  type MantineGradient,
} from '@mantine/core'
import { forwardRef, type ReactNode } from 'react'

export type ActionIconProps = {
  /**
   * Action icon onClick handler
   */
  onClick: () => void
  /**
   * Icon to be displayed
   */
  children: ReactNode

  /**
   * Action icon color (key of theme.colors)
   */
  color?: MantineColor

  /**
   * Action icon disabled state
   */
  disabled?: boolean

  /**
   * Action icon gradient input, only used when variant="gradient", theme.defaultGradient by default
   */
  gradient?: MantineGradient

  /**
   * Action icon props added to Loader component (only visible when `loading` prop is set)
   */
  loaderProps?: LoaderProps

  /**
   * Action icon loading state
   */
  loading?: boolean

  /**
   * Action icon radius size (key of theme.radius)
   */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Action icon button size
   */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Action icon variant
   */
  variant?:
    | 'outline'
    | 'transparent'
    | 'light'
    | 'default'
    | 'filled'
    | 'gradient'
    | 'subtle'
  /**
   * Action class name
   */
  className?: string
} & MantineActionIconProps

export const ActionIcon = forwardRef(
  (
    { className, onClick = () => null, ...props }: ActionIconProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <MantineActionIcon
        {...props}
        ref={ref}
        onClick={onClick}
        className={className}
      />
    )
  },
)
