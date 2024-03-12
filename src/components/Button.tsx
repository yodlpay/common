import {
  Button as MantineButton,
  UnstyledButton,
  clsx,
  createPolymorphicComponent,
  createStyles,
  rem,
  type LoaderProps,
  type ButtonProps as MantineButtonProps,
  type MantineColor,
  type MantineGradient,
  type MantineNumberSize,
  type MantineSize,
  type Variants,
  type SystemProp,
} from '@mantine/core'
import { forwardRef, type ReactNode } from 'react'
import type { ExtendedMantineSize } from '../types'
import { getColorFromProp } from '../styles'

const HEIGHT_SIZE_MAPPER = {
  xs: rem(24),
  sm: rem(32),
  md: rem(40),
  lg: rem(48),
  xl: rem(56),
} as Record<ExtendedMantineSize, string>

const FONT_SIZE_MAPPER = {
  xs: rem(13),
  sm: rem(15),
  md: rem(15),
  lg: rem(15),
  xl: rem(15),
} as Record<ExtendedMantineSize, string>

type ButtonVariant = Variants<
  | 'outline'
  | 'white'
  | 'light'
  | 'default'
  | 'filled'
  | 'gradient'
  | 'subtle'
  | 'link'
  | 'unstyled'
>

type StylesProps = {
  variant: ButtonVariant
  color: MantineColor
  radius: MantineNumberSize
  size: MantineSize
  fontSize?: number
  fontWeight?: number
  c?: SystemProp<MantineColor>
}

const useStyles = createStyles(
  (
    theme,
    { variant, color, radius, size, fontSize, fontWeight, c }: StylesProps,
  ) => ({
    button: {
      fontSize: fontSize ?? FONT_SIZE_MAPPER[size as ExtendedMantineSize],
      fontWeight,
      height: HEIGHT_SIZE_MAPPER[size as ExtendedMantineSize],
      ...(radius && {
        borderRadius: theme.radius[radius as keyof typeof theme.radius],
      }),
      ...(variant === 'link' && { color }),
      ...(variant === 'filled' && {
        backgroundColor: getColorFromProp(color),
        '&:hover': {
          backgroundColor: theme.fn.darken(getColorFromProp(color), 0.2),
        },
        '&:disabled': {
          ...(c && { color: getColorFromProp(c as string) }),
          opacity: 0.5,
          backgroundColor: getColorFromProp(color),
        },
      }),
      ...(variant === 'outline' && {
        borderColor: getColorFromProp(color),
        '&:hover': {
          backgroundColor: theme.fn.darken(getColorFromProp(color), 0.3),
        },
        '&:disabled': {
          ...(c && { color: getColorFromProp(c as string) }),
          opacity: 0.5,
          backgroundColor: 'transparent',
          borderColor: getColorFromProp(color),
        },
      }),
    },
  }),
)

export type ButtonProps = {
  /**
   * Button variant
   */
  variant?: ButtonVariant
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset'
  /**
   * Button text-transform property
   */
  uppercase?: boolean
  /**
   * Button size
   */
  size?: MantineSize
  /**
   * Button border radius
   */
  radius?: MantineNumberSize
  /**
   * Button right side icon
   */
  rightIcon?: ReactNode
  /**
   * Button left side icon
   */
  leftIcon?: ReactNode
  /**
   * Button loading state
   */
  loading?: boolean
  /**
   * Button loader position
   */
  loaderPosition?: 'left' | 'right' | 'center'
  /**
   * Button props added to Loader component
   */
  loaderProps?: LoaderProps
  /**
   * Button width (100% of parent element or auto)
   */
  fullWidth?: boolean
  /**
   * Button gradient (applies to gradient variant only)
   */
  gradient?: MantineGradient
  /**
   * Button disabled state
   */
  disabled?: boolean
  /**
   * Button compact state
   */
  compact?: boolean
  /**
   * Button color (key of theme.colors)
   */
  color?: MantineColor
  /**
   * Button font size
   */
  fontSize?: number
  /**
   * Button font weight
   */
  fontWeight?: number
  /**
   * Button contents
   */
  children: ReactNode
  /**
   * Button click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Button class name
   */
  className?: string
} & MantineButtonProps
/**
 * Primary UI component for user interaction
 */
export const ButtonBlueprint = forwardRef(
  (
    {
      color = 'brand.0',
      variant = 'filled',
      type = 'button',
      radius = 'md',
      size = 'md',
      c,
      fontWeight = 600,
      fontSize,
      onClick = () => null,
      className,
      children,
      ...props
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const { classes } = useStyles({
      variant,
      color,
      radius,
      size,
      fontSize,
      fontWeight,
      c,
    })

    if (variant === 'unstyled') {
      return (
        <UnstyledButton
          {...props}
          onClick={onClick}
          ref={ref}
          className={clsx(classes.button, className)}
        >
          {children}
        </UnstyledButton>
      )
    }

    return (
      <MantineButton
        {...props}
        size={size}
        color={color}
        variant={variant}
        type={type}
        onClick={onClick}
        ref={ref}
        className={clsx(classes.button, className)}
      >
        {children}
      </MantineButton>
    )
  },
)

export const Button = createPolymorphicComponent<'button', ButtonProps>(
  ButtonBlueprint,
)
