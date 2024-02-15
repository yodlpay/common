import {
  Cog8ToothIcon,
  InboxIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, type TabsProps } from "../components/Tabs";

const defaults: TabsProps = {
  color: "brand.0",
  defaultValue: "gallery",
  data: [
    {
      value: "gallery",
      tab: {
        icon: <PhotoIcon width="16px" />,
        content: "Gallery",
      },
      panel: {
        content: "Gallery tab content",
      },
    },
    {
      value: "messages",
      tab: {
        icon: <InboxIcon width="16px" />,
        content: "Messages",
      },
      panel: {
        content: "Messages tab content",
      },
    },
    {
      value: "settings",
      tab: {
        icon: <Cog8ToothIcon width="16px" />,
        content: "Settings",
      },
      panel: {
        content: "Settings tab content",
      },
    },
  ],
};

const meta: Meta<TabsProps> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    activateTabWithKeyboard: { control: { type: "boolean" } },
    allowTabDeactivation: { control: { type: "boolean" } },
    color: { control: { type: "color" } },
    defaultValue: { control: { type: "text" } },
    id: { control: { type: "text" } },
    inverted: { control: { type: "boolean" } },
    keepMounted: { control: { type: "boolean" } },
    loop: { control: { type: "boolean" } },
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "select" },
    },
    placement: {
      options: ["left", "right"],
      control: { type: "select" },
    },
    radius: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    value: { control: { type: "text" } },
    variant: {
      options: ["default", "pill"],
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<TabsProps> = {
  args: defaults,
};

export const Pill: StoryObj<TabsProps> = {
  args: {
    ...defaults,
    variant: "pill",
  },
};

export const WithGrow: StoryObj<TabsProps> = {
  args: {
    ...defaults,
    data: defaults?.data?.map((item) => ({
      ...item,
    })),
    listProps: {
      grow: true,
    },
  },
};

export const CenteredTabs: StoryObj<TabsProps> = {
  args: {
    ...defaults,
    data: defaults?.data?.map((item) => ({
      ...item,
    })),
    listProps: {
      position: "center",
    },
  },
};

export const VerticalOrientation: StoryObj<TabsProps> = {
  args: {
    ...defaults,
    orientation: "vertical",
  },
};

export const WithRightPlacement: StoryObj<TabsProps> = {
  args: {
    ...defaults,
    orientation: "vertical",
    placement: "right",
  },
};
