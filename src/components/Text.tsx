import {
  Text as MantineText,
  createStyles,
  type DefaultMantineColor,
  type MantineGradient,
  type TextProps as MantineTextProps,
  type Variants,
  createPolymorphicComponent,
} from "@mantine/core";
import { forwardRef, type ReactNode } from "react";
import { Flex } from "./Flex";

const useStyles = createStyles((theme) => ({
  text: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export type TextProps = {
  /**
   * Sets text-align CSS property
   */
  align?: string;

  /**
   * Key of theme.colors or any valid CSS color
   */
  color?: DefaultMantineColor | "dimmed";

  /**
   * Controls gradient settings in gradient variant only
   */
  gradient?: MantineGradient;

  /**
   * Inherit font properties from parent element
   */
  inherit?: boolean;

  /**
   * Sets line-height to 1 for centering
   */
  inline?: boolean;

  /**
   * Adds font-style: italic style
   */
  italic?: boolean;

  /**
   * CSS -webkit-line-clamp property
   */
  lineClamp?: number;

  /**
   * Key of theme.fontSizes or any valid CSS value to set font-size
   */
  size?: number | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Shorthand for component="span"
   */
  span?: boolean;

  /**
   * Add strikethrough styles
   */
  strikethrough?: boolean;

  /**
   * Sets text-transform CSS property
   */
  transform?: "none" | "capitalize" | "lowercase" | "uppercase";

  /**
   * CSS truncate overflowing text with an ellipsis
   */
  truncate?: true | "end" | "start";

  /**
   * Underline the text
   */
  underline?: boolean;

  /**
   * Link or text variant
   */
  variant?: Variants<"text" | "gradient">;

  /**
   * Sets font-weight CSS property
   */
  weight?: number;

  /**
   * Text content
   */
  children: ReactNode;
  /**
   * Text should display icon on the left side of the label
   */
  icon?: ReactNode;
  /**
   * Text should display icon on the right side of the label
   */
  rightIcon?: ReactNode;
  /**
   * Text class name
   */
  className?: string;
} & MantineTextProps;

export const TextBlueprint = forwardRef(
  (
    { className, rightIcon, ...props }: TextProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { classes } = useStyles();

    if (props.icon || rightIcon) {
      return (
        <Flex className={classes.text}>
          {props.icon && props.icon}
          <MantineText {...props} ref={ref} className={className} />
          {rightIcon && rightIcon}
        </Flex>
      );
    }
    return <MantineText {...props} ref={ref} className={className} />;
  }
);

export const Text = createPolymorphicComponent<"div", TextProps>(TextBlueprint);
