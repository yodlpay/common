import {
  Menu as MantineMenu,
  type MenuProps as MantineListItemProps,
} from '@mantine/core'
import React, { type ReactNode } from 'react'

// TODO - WIP

export type ListItemProps = {
  /**
   * ListItem contents
   */
  data: {
    label: string
    icon?: ReactNode
    rightSection?: ReactNode
    color?: string
    onClick?: () => void
  }[]
  /**
   * ListItem click handler
   */
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  /**
   * ListItem class name
   */
  className?: string
} & MantineListItemProps

/**
 * ListItem component
 */
export const ListItem = ({
  data,
  onClick,
  className,
  ...props
}: ListItemProps) => {
  return (
    <MantineMenu
      shadow="md"
      width="100%"
      {...props}
      defaultOpened
      closeOnClickOutside={false}
      closeOnEscape={false}
      closeOnItemClick={false}
    >
      <MantineMenu.Dropdown onClick={onClick}>
        {data.map((item) => (
          <MantineMenu.Item
            key={item.label}
            icon={item.icon}
            rightSection={item.rightSection}
            color={item.color}
            onClick={item.onClick}
            className={className}
          >
            {item.label}
          </MantineMenu.Item>
        ))}
      </MantineMenu.Dropdown>
    </MantineMenu>
  )
}
