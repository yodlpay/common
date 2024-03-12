import {
  Tooltip as MantineTooltip,
  createStyles,
  type MantineColor,
  type MantineSize,
  type TooltipProps as MantineTooltipProps,
} from '@mantine/core'
import { type ReactNode } from 'react'

type StylesProps = {
  maxWidth: number | 'auto'
}

const useStyles = createStyles((theme, { maxWidth }: StylesProps) => ({
  tooltip: {
    maxWidth: maxWidth === 'auto' ? 'auto' : `${maxWidth}px`,
    wordBreak: 'break-word',
  },
}))

/**
 * Tooltip component props
 */
export type TooltipProps = {
  /** Arrow offset */
  arrowOffset?: number

  /** Arrow position */
  arrowPosition?: 'center' | 'side'

  /** Arrow radius */
  arrowRadius?: number

  /** Arrow size */
  arrowSize?: number

  /** Target element */
  children: ReactNode

  /** Close delay in ms */
  closeDelay?: number

  /** Key of theme.colors */
  color?: MantineColor

  /** Disables tooltip */
  disabled?: boolean

  /** Determines which events will be used to show tooltip */
  events?: { hover: boolean; focus: boolean; touch: boolean }

  /** Set if tooltip is attached to an inline element */
  inline?: boolean

  /** If set tooltip will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
  keepMounted?: boolean

  /** Tooltip label */
  label: ReactNode

  /** Defines whether content should be wrapped on to the next line */
  multiline?: boolean

  /** Space between target element and tooltip */
  offset?: number

  /** Called when tooltip position changes */
  onPositionChange?: (position: string) => void

  /** Open delay in ms */
  openDelay?: number

  /** Controls opened state */
  opened?: boolean

  /** Props to pass down to the portal when withinPortal is true */
  portalProps?: any

  /** Tooltip position relative to target element (default) or mouse (floating) */
  position?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'

  /** useEffect dependencies to force update tooltip position */
  positionDependencies?: any[]

  /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
  radius?: MantineSize

  /** Key of the prop that should be used to get element ref */
  refProp?: string

  /** Props added to Transition component that used to animate tooltip presence, use to configure duration and animation type, { duration: 100, transition: 'fade' } by default */
  transitionProps?: any

  /** Tooltip width */
  width?: number | 'auto'

  /** Tooltip max width */
  maxWidth?: number | 'auto'

  /** Determines whether component should have an arrow */
  withArrow?: boolean

  /** Determines whether tooltip should be rendered within Portal */
  withinPortal?: boolean

  /** Tooltip z-index */
  zIndex?: number

  /**
   * Tooltip class name
   */
  className?: string
} & MantineTooltipProps

/**
 * Tooltip component
 */
export const Tooltip = ({
  className,
  multiline = true,
  maxWidth = 200,
  events = { hover: true, focus: true, touch: true },
  ...props
}: TooltipProps) => {
  const { classes } = useStyles({ maxWidth })

  return (
    <MantineTooltip
      {...props}
      multiline={multiline}
      events={events}
      classNames={{
        tooltip: classes.tooltip,
      }}
      className={className}
    />
  )
}
