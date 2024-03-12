import {
  Avatar as MantineAvatar,
  type AvatarProps as MantineAvatarProps,
  type MantineColor,
  type MantineGradient,
  type Variants,
} from '@mantine/core'
import { forwardRef, type ReactNode } from 'react'

export type AvatarProps = {
  /**
   * Image alt text or title for placeholder variant
   */
  alt?: string

  /**
   * Custom placeholder
   */
  children?: ReactNode

  /**
   * Key of theme.colors
   */
  color?: MantineColor

  /**
   * Gradient input, only used when variant="gradient", theme.defaultGradient by default
   */
  gradient?: MantineGradient

  /**
   * `<img />` element attributes
   */
  imageProps?: Record<string, any>

  /**
   * Key of theme.radius or any valid CSS value to set border-radius, "xl" by default
   */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Avatar width and height
   */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Image url
   */
  src?: string

  /**
   * Controls appearance
   */
  variant?: Variants<'outline' | 'light' | 'filled' | 'gradient'>
  /**
   * Avatar class name
   */
  className?: string
} & MantineAvatarProps

const InnerAvatar = forwardRef(
  ({ className, ...props }: AvatarProps, ref: React.Ref<HTMLDivElement>) => {
    return <MantineAvatar ref={ref} {...props} className={className} />
  },
)

const AvatarGroup = MantineAvatar.Group

const Avatar = Object.assign(InnerAvatar, {
  Group: AvatarGroup,
})

export { Avatar }
