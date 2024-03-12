import {
  Progress as MantineProgress,
  type MantineColor,
  type ProgressProps as MantineProgressProps,
} from '@mantine/core'

export type ProgressSection = {
  value: number
  color?: string
  label?: string
  tooltip?: string
}

export type ProgressProps = {
  /**
   * Whether to animate striped progress bars.
   */
  animate?: boolean

  /**
   * Progress color from theme.
   */
  color?: MantineColor

  /**
   * Text to be placed inside the progress bar.
   */
  label?: string

  /**
   * Key of theme.radius or any valid CSS value to set border-radius.
   */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Replaces value if present, renders multiple sections instead of single one.
   */
  sections?: ProgressSection[]

  /**
   * Height of progress bar.
   */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Adds stripes.
   */
  striped?: boolean

  /**
   * Percent of filled bar (0-100).
   */
  value?: number
  /**
   * Progress class name
   */
  className?: string
} & MantineProgressProps

export const Progress = ({ className, ...props }: ProgressProps) => {
  return <MantineProgress {...props} className={className} />
}
