import {
  createStyles,
  NavLink as MantineNavLink,
  type MantineSize,
  type NavLinkProps as MantineNavLinkProps,
  type Variants,
  clsx,
} from "@mantine/core";
import { Flex } from "./Flex";
import { Text } from "./Text";
import { forwardRef, type ReactNode } from "react";
import { MOBILE_BREAKPOINT, addLineClamp } from "../styles";
import { Indicator, type IndicatorProps } from "./Indicator";

// TODO - WIP

export const NAVLINK_PADDINGS = {
  sm: "6px 8px",
  md: "8px",
  lg: "8px",
};

export const NAVLINK_MOBILE_PADDINGS = {
  sm: "6px 8px",
  md: "8px",
  lg: "8px",
};

export const NAVLINK_HEIGHTS = {
  sm: "54px",
  md: "54px",
  lg: "54px",
};

export const NAVLINK_FONT_SIZES = {
  sm: "16px",
  md: "16px",
  lg: "16px",
};

export const NAVLINK_MOBILE_FONT_SIZES = {
  sm: "16px",
  md: "16px",
  lg: "16px",
};

export const NAVLINK_MOBILE_FONT_WEIGHTS = {
  sm: 500,
  md: 400,
  lg: 400,
};

const useStyles = createStyles(
  (theme, { withBorder, size, rightIcon }: NavLinkProps) => ({
    navLinkRoot: {
      border: "1px solid",
      borderRadius: theme.radius.xl,
      borderColor: withBorder ? "rgba(100, 104, 107, 0.50)" : "transparent",
      padding: NAVLINK_PADDINGS[size as keyof typeof NAVLINK_PADDINGS],
      height: NAVLINK_HEIGHTS[size as keyof typeof NAVLINK_HEIGHTS],
      "&:hover": {
        background: theme.colors?.level?.[1],
      },
      [theme.fn.smallerThan(MOBILE_BREAKPOINT)]: {
        padding:
          NAVLINK_MOBILE_PADDINGS[size as keyof typeof NAVLINK_MOBILE_PADDINGS],
      },
    },
    navLinkLabel: {
      fontSize: NAVLINK_FONT_SIZES[size as keyof typeof NAVLINK_FONT_SIZES],
      fontWeight:
        NAVLINK_MOBILE_FONT_WEIGHTS[
          size as keyof typeof NAVLINK_MOBILE_FONT_WEIGHTS
        ],
      color: theme.colors?.primary?.[0],
      ...addLineClamp(),
      [theme.fn.smallerThan(MOBILE_BREAKPOINT)]: {
        fontSize:
          NAVLINK_MOBILE_FONT_SIZES[
            size as keyof typeof NAVLINK_MOBILE_FONT_SIZES
          ],
      },
    },
    navLinkDescription: {
      fontWeight: 400,
      fontSize: theme.fontSizes.sm,
      color: theme.colors?.subtle?.[0],
      ...addLineClamp(),
    },
    navLinkRightSection: {
      marginRight: !!rightIcon ? "16px" : "0",
    },
  })
);

export type NavLinkProps = {
  /**
   * NavLink active state
   */
  active?: boolean;
  /**
   * NavLink child links
   */
  children?: ReactNode;
  /**
   * NavLink children offset (key of theme.spacing)
   */
  childrenOffset?: number | "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * NavLink color (key of theme.colors)
   */
  color?: string;
  /**
   * NavLink should be opened by default
   */
  defaultOpened?: boolean;
  /**
   * NavLink secondary link description
   */
  description?: ReactNode;
  /**
   * NavLink should right section rotate when collapse is opened
   */
  disableRightSectionRotation?: boolean;
  /**
   * NavLink disabled state
   */
  disabled?: boolean;
  /**
   * NavLink should display icon on the left side of the label
   */
  icon?: ReactNode;
  /**
   * NavLink should display badge on the right side of the label
   */
  badge?: ReactNode;
  /**
   * NavLink main link content
   */
  label?: ReactNode;
  /**
   * NavLink should label and description wrap on the next line
   */
  noWrap?: boolean;
  /**
   * NavLink onChange handler
   */
  onChange?: (opened: boolean) => void;
  /**
   * NavLink onClick handler
   */
  onClick?: () => void;
  /**
   * NavLink opened state
   */
  opened?: boolean;
  /**
   * NavLink should secondary label be displayed on the right side of the component
   */
  rightLabel?: ReactNode;
  /**
   * NavLink should secondary description be displayed on the right side of the component
   */
  rightDescription?: ReactNode;
  /**
   * NavLink should icon be displayed on the right side of the label
   */
  rightIcon?: ReactNode;
  /**
   * NavLink variant
   */
  variant?: Variants<"light" | "filled" | "subtle">;
  /**
   * NavLink should display border
   */
  withBorder?: boolean;
  /**
   * NavLink should display indicator
   */
  withIndicator?: boolean;
  /**
   * NavLink indicator props
   */
  indicatorProps?: Omit<IndicatorProps, "children">;
  /**
   * NavLink size
   */
  size?: Omit<MantineSize, "xs" | "xl">;
  /**
   * NavLink class name
   */
  className?: string;
} & MantineNavLinkProps;

export const NavLink = forwardRef(
  (
    {
      icon,
      size = "md",
      withIndicator = false,
      className,
      rightLabel,
      rightDescription,
      rightIcon,
      rightSection,
      indicatorProps,
      ...props
    }: NavLinkProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const { classes } = useStyles({
      ...props,
      size,
      rightLabel,
      rightDescription,
      rightIcon,
      rightSection,
    });

    let labelContent = props.label;
    let rightSectionContent = null;

    if (props.badge) {
      labelContent = (
        <Flex align="center">
          <Text className={classes.navLinkLabel}>{props.label}</Text>
          {props.badge}
        </Flex>
      );
    }

    if (rightLabel || rightDescription || rightIcon) {
      rightSectionContent = (
        <Flex align="center">
          {rightLabel || rightDescription ? (
            <Flex direction="column" className={classes.navLinkRightSection}>
              {rightLabel && (
                <Text className={classes.navLinkLabel} align="right">
                  {rightLabel}
                </Text>
              )}
              {rightDescription && (
                <Text className={classes.navLinkDescription} align="right">
                  {rightDescription}
                </Text>
              )}
            </Flex>
          ) : null}
          {rightIcon}
        </Flex>
      );
    }

    if (rightSection) {
      rightSectionContent = rightSection;
    }

    return (
      <MantineNavLink
        {...props}
        icon={
          withIndicator ? (
            <Indicator {...indicatorProps}>{icon}</Indicator>
          ) : (
            icon
          )
        }
        label={labelContent}
        rightSection={rightSectionContent}
        classNames={{
          root: clsx(classes.navLinkRoot, className),
          label: classes.navLinkLabel,
          description: classes.navLinkDescription,
        }}
        ref={ref}
      />
    );
  }
);
