import {
  Accordion as MantineAccordion,
  clsx,
  createStyles,
  type AccordionProps as MantineAccordionProps,
} from "@mantine/core";
import { type ReactNode } from "react";

const useStyles = createStyles(() => ({
  accordion: {},
  item: {},
  hiddenControl: {
    "& > .mantine-Accordion-control": {
      padding: 0,
      "& > .mantine-Accordion-chevron": {
        display: "none",
      },
    },
  },
}));

export type AccordionProps = {
  /**
   * Replaces chevron on all items
   */
  chevron?: ReactNode;

  /**
   * Accordion contents
   */
  data?: {
    value: string;
    label?: ReactNode;
    content?: ReactNode;
    ref?: React.Ref<HTMLDivElement>;
  }[];

  /**
   * Determines position of the chevron
   */
  chevronPosition?: "left" | "right";

  /**
   * Chevron size
   */
  chevronSize?: string | number;

  /**
   * Accordion content
   */
  children?: ReactNode;

  /**
   * Default value for uncontrolled component
   */
  defaultValue?: string | string[];

  /**
   * Determines whether chevron rotation should be disabled
   */
  disableChevronRotation?: boolean;

  /**
   * Base id, used to generate ids that connect labels with controls, by default generated randomly
   */
  id?: string;

  /**
   * Determines whether arrow key presses should loop though items (first to last and last to first)
   */
  loop?: boolean;

  /**
   * Determines whether multiple items can be opened at a time
   */
  multiple?: boolean;

  /**
   * Callback for controlled component
   */
  onChange?: (value: unknown) => void;

  /**
   * Heading order, has no effect on visuals
   */
  order?: 2 | 3 | 4 | 5 | 6;

  /**
   * Key of theme.radius or any valid CSS value to set border-radius, ignored when variant="default"
   */
  radius?: number | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Transition duration in ms, set 0 to disable transitions
   */
  transitionDuration?: number;

  /**
   * Value for controlled component
   */
  value?: string | string[];

  /**
   * Controls visuals
   */
  variant?: "default" | "contained" | "filled" | "separated";

  /**
   * Accordion class name
   */
  className?: string;
} & Omit<MantineAccordionProps, "children">;

export const Accordion = ({
  children,
  defaultValue,
  data,
  className,
  ...props
}: AccordionProps) => {
  const { classes } = useStyles();

  return (
    <MantineAccordion
      {...props}
      defaultValue={defaultValue}
      className={clsx(classes.accordion, className)}
    >
      {children ??
        data?.map((item) => (
          <MantineAccordion.Item
            ref={item.ref}
            key={item.value}
            value={item.value}
            className={clsx(
              classes.item,
              !item.content && classes.hiddenControl
            )}
          >
            {item.label && (
              <MantineAccordion.Control>{item.label}</MantineAccordion.Control>
            )}
            {item.content && (
              <MantineAccordion.Panel>{item.content}</MantineAccordion.Panel>
            )}
          </MantineAccordion.Item>
        ))}
    </MantineAccordion>
  );
};
