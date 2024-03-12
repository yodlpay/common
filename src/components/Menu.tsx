import {
  Menu as MantineMenu,
  type MantineColor,
  type MenuItemProps as MantineMenuItemProps,
  type MenuProps as MantineMenuProps,
  type MantineShadow,
  type PortalProps,
  type TransitionProps,
  createStyles,
  clsx,
} from '@mantine/core'
import type {
  FloatingAxesOffsets,
  FloatingPosition,
} from '@mantine/core/lib/Floating/types'
import type {
  PopoverMiddlewares,
  PopoverWidth,
} from '@mantine/core/lib/Popover/Popover.types'
import { useState, type ReactNode } from 'react'

const useStyles = createStyles((theme) => ({
  menu: {
    borderRadius: '14px',
    background: theme.colors?.level?.[1],
    border: `1px solid ${theme.colors?.level?.[2]}`,
    overflow: 'hidden',

    '& .mantine-Menu-item': {
      borderRadius: theme.radius.lg,
      '&:hover': {
        background: theme.colors?.level?.[2],
      },
    },
  },
}))

export type MenuProps = {
  /** Arrow offset from the edge of the dropdown in px */
  arrowOffset?: number

  /** Arrow position relative to dropdown */
  arrowPosition?: 'center' | 'side'

  /** Arrow border-radius */
  arrowRadius?: number

  /** Arrow size in px */
  arrowSize?: number

  /** Menu content */
  children?: ReactNode

  /** Menu class name */
  className?: string

  /** Events that trigger outside clicks */
  clickOutsideEvents?: string[]

  /** Close delay in ms, applicable only to trigger="hover" variant */
  closeDelay?: number

  /** Determines whether dropdown should be closed on outside clicks, default to true */
  closeOnClickOutside?: boolean

  /** Determines whether dropdown should be closed when Escape key is pressed, defaults to true */
  closeOnEscape?: boolean

  /** Determines whether Menu should be closed when item is clicked */
  closeOnItemClick?: boolean

  /** Menu contents */
  data?: {
    id: string | number
    label?: ReactNode
    divider?: boolean
    item?: ReactNode
    props?: MenuItemProps
  }[]

  /** Uncontrolled menu initial opened state */
  defaultOpened?: boolean

  /** If set, popover dropdown will not render */
  disabled?: boolean

  /** id base to create accessibility connections */
  id?: string

  /** If set dropdown will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
  keepMounted?: boolean

  /** Determines whether arrow key presses should loop though items (first to last and last to first) */
  loop?: boolean

  /** Floating ui middlewares to configure position handling */
  middlewares?: PopoverMiddlewares

  /** Default Y axis or either (main, cross, alignment) X and Y axis space between target element and dropdown */
  offset?: number | FloatingAxesOffsets

  /** Called when menu opened state changes */
  onChange?: (opened: boolean) => void

  /** Called when Menu is closed */
  onClose?: () => void

  /** Called when Menu is opened */
  onOpen?: () => void

  /** Called when dropdown position changes */
  onPositionChange?: (position: FloatingPosition) => void

  /** Open delay in ms, applicable only to trigger="hover" variant */
  openDelay?: number

  /** Controlled menu opened state */
  opened?: boolean

  /** Props to pass down to the portal when withinPortal is true */
  portalProps?: Omit<PortalProps, 'children' | 'withinPortal'>

  /** Dropdown position relative to target */
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

  /** useEffect dependencies to force update dropdown position */
  positionDependencies?: any[]

  /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Determines whether focus should be automatically returned to control when dropdown closes, false by default */
  returnFocus?: boolean

  /** Key of theme.shadow or any other valid css box-shadow value */
  shadow?: MantineShadow

  /** Menu target item */
  target?: ReactNode

  /** Props added to Transition component that used to animate dropdown presence, use to configure duration and animation type, { duration: 150, transition: 'fade' } by default */
  transitionProps?: Partial<Omit<TransitionProps, 'mounted'>>

  /** Event which should open menu */
  trigger?: 'click' | 'hover'

  /** Dropdown width, or 'target' to make dropdown width the same as target element */
  width?: PopoverWidth

  /** Determines whether component should have an arrow */
  withArrow?: boolean

  /** Determines whether dropdown should be rendered within Portal, defaults to false */
  withinPortal?: boolean

  /** Dropdown z-index */
  zIndex?: number
} & MantineMenuProps

export type MenuItemProps = {
  /** Item label */
  children?: ReactNode

  /** Determines whether menu should be closed when item is clicked, overrides closeOnItemClick prop on Menu component */
  closeMenuOnClick?: boolean

  /** Key of theme.colors */
  color?: MantineColor

  /** Icon rendered on the left side of the label */
  icon?: ReactNode

  /** Section rendered on the right side of the label */
  rightSection?: ReactNode
} & MantineMenuItemProps

export type MenuDropdownProps = {
  /** Item label */
  children: ReactNode
}

export type MenuTargetProps = {
  /** Target element */
  children: ReactNode

  /** Key of the prop that should be used to get element ref */
  refProp?: string
}

export const Menu = ({
  children,
  target,
  data,
  opened = false,
  onChange = () => null,
  className,
  ...props
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(opened)

  const { classes } = useStyles()

  const handleChange = (value: boolean) => {
    setIsOpen(value)
    onChange(value)
  }

  return (
    children ?? (
      <MantineMenu
        {...props}
        opened={isOpen}
        onChange={handleChange}
        classNames={{ dropdown: clsx(classes.menu, className) }}
      >
        <MantineMenu.Target>{target}</MantineMenu.Target>

        <MantineMenu.Dropdown>
          {data?.map((item) => {
            if (item.label)
              return (
                <MantineMenu.Label key={item.id}>
                  {item.label}
                </MantineMenu.Label>
              )
            if (item.divider) return <MantineMenu.Divider key={item.id} />
            return (
              <MantineMenu.Item key={item.id} {...item.props}>
                {item.item}
              </MantineMenu.Item>
            )
          })}
        </MantineMenu.Dropdown>
      </MantineMenu>
    )
  )
}
