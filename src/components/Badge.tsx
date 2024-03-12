import {
  Badge as MantineBadge,
  clsx,
  createStyles,
  type BadgeProps as MantineBadgeProps,
  type BadgeVariant as MantineBadgeVariant,
  type MantineColor,
  type MantineGradient,
  type MantineNumberSize,
  type MantineSize,
} from '@mantine/core'
import { forwardRef, type ReactNode } from 'react'
import { CUSTOM_COLORS } from '../styles'

const useStyles = createStyles((theme, { isActive, onClick }: BadgeProps) => ({
  badge: {
    fontWeight: 'normal',
    textTransform: 'none',
    cursor: onClick ? 'pointer' : 'auto',
    ...(isActive !== undefined && {
      borderColor: 'transparent',
      background: isActive
        ? theme.colors?.positiveBase
        : CUSTOM_COLORS.positiveBaseInactive,
      color: isActive
        ? theme.colors?.positive
        : theme.colorScheme === 'light'
        ? CUSTOM_COLORS.positiveLightInactive
        : CUSTOM_COLORS.positiveDarkInactive,
    }),
    '& .mantine-Badge-leftSection': {
      display: 'flex',
    },
    '& .mantine-Badge-rightSection': {
      display: 'flex',
    },
  },
}))

type BadgeComponentType = 'button' | 'div' | undefined

export type BadgeProps = {
  component?: BadgeComponentType
  /**
   * Badge variant
   */
  variant?: MantineBadgeVariant
  /**
   * Badge size
   */
  size?: MantineSize
  /**
   * Badge border radius
   */
  radius?: MantineNumberSize
  /**
   * Badge right side section
   */
  rightSection?: ReactNode
  /**
   * Badge left side section
   */
  leftSection?: ReactNode
  /**
   * Badge gradient (applies to gradient variant only)
   */
  gradient?: MantineGradient
  /**
   * Badge width (100% of parent element or auto)
   */
  fullWidth?: boolean
  /**
   * Badge color (key of theme.colors)
   */
  color?: MantineColor
  /**
   *
   * Badge contents
   */
  children: ReactNode
  /**
   * Badge should display activity indicator
   */
  isActive?: boolean
  /**
   * Badge onClick handler
   */
  onClick?: () => void
  /**
   * Badge class name
   */
  className?: string
} & MantineBadgeProps
/**
 * Primary UI component for user interaction
 */

export const Badge = forwardRef(
  (
    {
      variant = 'outline',
      size = 'lg',
      radius = 'md',
      className,
      onClick,
      children,
      isActive,
      ...props
    }: BadgeProps,
    ref: React.Ref<HTMLDivElement | HTMLButtonElement>,
  ) => {
    const { classes } = useStyles({
      variant,
      size,
      children,
      onClick,
      isActive,
      ...props,
    })

    if (onClick) {
      return (
        <MantineBadge
          {...props}
          radius={radius}
          size={size}
          variant={variant}
          className={clsx(classes.badge, className)}
          ref={ref as React.Ref<HTMLButtonElement>}
          component="button"
          onClick={onClick}
        >
          {children}
        </MantineBadge>
      )
    } else {
      return (
        <MantineBadge
          {...props}
          size={size}
          variant={variant}
          className={clsx(classes.badge, className)}
          ref={ref as React.Ref<HTMLDivElement>}
          component="div"
        >
          {children}
        </MantineBadge>
      )
    }
  },
)
