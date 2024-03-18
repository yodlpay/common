import { List as MantineList } from '@mantine/core';
import { type ReactNode } from 'react';

export type ListProps = {
  /**
   * Center items with an icon.
   */
  center?: boolean;

  /**
   * `<List.Item />` components only.
   */
  children?: ReactNode;

  /**
   * List contents
   */
  data?: { content: string; icon?: ReactNode; list?: ReactNode }[];

  /**
   * Icon that should replace the list item dot.
   */
  icon?: ReactNode;

  /**
   * Define the list style.
   */
  listStyleType?:
    | 'disc'
    | 'decimal'
    | 'none'
    | 'circle'
    | 'square'
    | 'decimal-leading-zero'
    | 'lower-roman'
    | 'upper-roman'
    | 'lower-greek'
    | 'lower-latin'
    | 'upper-latin'
    | 'armenian'
    | 'georgian';

  /**
   * Font size from the theme or a specific number.
   */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Spacing between items from theme or a specific number.
   */
  spacing?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * List type: ol or ul.
   */
  type?: 'ordered' | 'unordered';

  /**
   * Include padding-left to offset the list from the main content.
   */
  withPadding?: boolean;

  /**
   * List class name.
   */
  className?: string;
};

export type ListItemProps = {
  /**
   * Item content.
   */
  children: ReactNode;

  /**
   * Icon to replace the bullet.
   */
  icon?: ReactNode;

  /**
   * List.Item class name.
   */
  className?: string;
};

export const List = ({
  children,
  data,
  type = 'unordered',
  className,
  ...props
}: ListProps) => {
  return (
    <MantineList {...props} type={type} className={className}>
      {children ??
        data?.map((item) => (
          <MantineList.Item
            key={item.content}
            {...(item.icon && { icon: item.icon })}
          >
            {item.content} {item.list && item.list}
          </MantineList.Item>
        ))}
    </MantineList>
  );
};

List.Item = MantineList.Item;
