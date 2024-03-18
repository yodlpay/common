import {
  Tabs as MantineTabs,
  clsx,
  createStyles,
  rem,
  type MantineColor,
  type TabsProps as MantineTabsProps,
} from '@mantine/core';
import { useState, type ReactNode } from 'react';

const useStyles = createStyles((theme, { variant }: TabsProps) => {
  const SHARED_PROPS = {
    border: 'none',
    height: rem(26),
    padding: '4px 12px',
    color: theme.colors?.primary?.[0],
    background: theme.colors?.level?.[2],
    borderRadius: rem(16),
  };

  return {
    tabs: {
      '& .mantine-Tabs-tabsList': {
        ...(variant === 'pill' && { border: 'none', gap: rem(12) }),
      },
      '& .mantine-Tabs-tab[data-active]': {
        ...(variant === 'pill' && {
          ...SHARED_PROPS,

          '& .mantine-Tabs-tabLabel': {
            ...(variant === 'pill' && {
              color: theme.colors?.primary?.[0],
            }),
          },

          '& .mantine-Tabs-tabIcon': {
            ...(variant === 'pill' && {
              color: theme.colors?.primary?.[0],
            }),
          },
        }),
      },
      '& .mantine-Tabs-tab': {
        ...(variant === 'pill' && {
          ...SHARED_PROPS,
          background: theme.colors?.level?.[0],

          '&:hover:not([data-active])': {
            background: theme.colors?.level?.[1],
          },

          '& .mantine-Tabs-tabLabel': {
            ...(variant === 'pill' && {
              fontSize: rem(13),
              color: theme.colors?.subtle?.[0],
              fontWeight: 500,
            }),
          },

          '& .mantine-Tabs-tabIcon': {
            ...(variant === 'pill' && {
              color: theme.colors?.subtle?.[0],
            }),
          },
        }),
      },
    },
  };
});

export type TabsProps = {
  /** Determines whether tab should be activated with arrow key press. Defaults to true. */
  activateTabWithKeyboard?: boolean;

  /** Determines whether tab can be deactivated. Defaults to false. */
  allowTabDeactivation?: boolean;

  /** Tabs contents */
  data?: {
    value: string;
    tab: {
      icon?: ReactNode;
      rightSection?: ReactNode;
      content: ReactNode;
    };
    panel: {
      content: ReactNode;
    };
  }[];

  /** Tabs list props if data is used */
  listProps?: {
    grow?: boolean;
    position?: 'left' | 'right' | 'center' | 'apart';
  };

  /** Tabs content. */
  children?: ReactNode;

  /** Key of theme.colors. */
  color?: MantineColor;

  /** Default value for uncontrolled component. */
  defaultValue?: string;

  /** Base id, used to generate ids that connect labels with controls. By default generated randomly. */
  id?: string;

  /** Determines whether tabs should have inverted styles. */
  inverted?: boolean;

  /** If set to false, Tabs.Panel content will not stay mounted when tab is not active. */
  keepMounted?: boolean;

  /** Determines whether arrow key presses should loop though items (first to last and last to first). */
  loop?: boolean;

  /** Tabs orientation, can be vertical or horizontal. */
  orientation?: 'horizontal' | 'vertical';

  /** Tabs.List placement relative to Tabs.Panel, applicable only for orientation="vertical", left by default. */
  placement?: 'left' | 'right';

  /** Key of theme.radius or any valid CSS value to set border-radius. Defaults to theme default radius. */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Value for controlled component. */
  value?: string;

  /** Controls appearance */
  variant?: 'default' | 'pill';

  /** Tabs class name */
  className?: string;

  /** Tabs on change handler */
  onChange?: (value: string | null) => void;
} & Omit<MantineTabsProps, 'children' | 'onChange'>;

export type TabsTabProps = {
  /** Tab label. */
  children: ReactNode;

  /** Key of theme.colors. */
  color?: MantineColor;

  /** Icon to be displayed before the label. */
  icon?: ReactNode;

  /** Content to be displayed after the label. */
  rightSection?: ReactNode;

  /** Value used to connect Tab with the associated panel. */
  value: string;
};

export type TabsListProps = {
  /** `<Tabs.Tab />` components. */
  children: ReactNode;

  /** Determines whether tabs should take the whole space. */
  grow?: boolean;

  /** Alignment of the tabs. */
  position?: 'left' | 'right' | 'center' | 'apart';
};

export type TabsPanelProps = {
  /** Content of the panel. */
  children: ReactNode;

  /** Value of the associated tab control. */
  value: string;
};

export const Tabs = ({
  children,
  data,
  listProps,
  className,
  defaultValue,
  variant = 'default',
  onChange = () => null,
  ...props
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string | undefined | null>(
    defaultValue,
  );

  const handleChange = (value: string) => {
    setActiveTab(value);
    onChange(value);
  };

  const { classes } = useStyles({ variant });

  return (
    <MantineTabs
      {...props}
      value={activeTab}
      onTabChange={handleChange}
      className={clsx(classes.tabs, className)}
    >
      {children ??
        (data && (
          <>
            <Tabs.List {...listProps}>
              {data.map((item) => (
                <Tabs.Tab
                  key={`tab-${item.value}`}
                  value={item.value}
                  {...(item.tab.icon && { icon: item.tab.icon })}
                  {...(item.tab.rightSection && {
                    rightSection: item.tab.rightSection,
                  })}
                >
                  {item.tab.content}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {data.map((item) => (
              <Tabs.Panel key={`panel-${item.value}`} value={item.value}>
                {item.panel.content}
              </Tabs.Panel>
            ))}
          </>
        ))}
    </MantineTabs>
  );
};

Tabs.Tab = MantineTabs.Tab;

Tabs.List = MantineTabs.List;

Tabs.Panel = MantineTabs.Panel;
