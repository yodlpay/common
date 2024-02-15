import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, type AccordionProps } from "../components/Accordion";

const defaults: AccordionProps = {
  variant: "default",
  chevronPosition: "right",
  chevronSize: "sm",
  loop: false,
  multiple: false,
  radius: "sm",
  transitionDuration: 300,
  order: 2,
  children: null,
  data: [
    { value: "item-1", label: "Label 1", content: "Content 1" },
    { value: "item-2", label: "Label 2", content: "Content 2" },
  ],
};

const meta: Meta<AccordionProps> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    chevronPosition: {
      options: ["left", "right"],
      control: { type: "select" },
    },
    chevronSize: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    loop: {
      control: { type: "boolean" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    radius: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    transitionDuration: {
      control: { type: "number" },
    },
    order: {
      options: [2, 3, 4, 5, 6],
      control: { type: "select" },
    },
    variant: {
      options: ["default", "contained", "filled", "separated"],
      control: { type: "select" },
    },
  },
};

export default meta;

export const Default: StoryObj<AccordionProps> = {
  args: {
    ...defaults,
  },
};

export const DifferentTransitionDuration: StoryObj<AccordionProps> = {
  args: {
    ...defaults,
    transitionDuration: 1000,
  },
};

export const FilledVariant: StoryObj<AccordionProps> = {
  args: {
    ...defaults,
    variant: "filled",
  },
};

export const SeparatedVariant: StoryObj<AccordionProps> = {
  args: {
    ...defaults,
    variant: "separated",
  },
};

export const LeftChevronPosition: StoryObj<AccordionProps> = {
  args: {
    ...defaults,
    chevronPosition: "left",
  },
};
