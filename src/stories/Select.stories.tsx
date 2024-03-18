import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { CHAINS } from '../constants';
import { SIZE_OPTIONS } from '../styles';
import { Select, type SelectProps } from '../components/Select';

const SELECT_DATA = CHAINS.map((chain) => chain.chainName);
const SELECT_DESCRIPTION_DATA = CHAINS.map((item) => ({
  label: item.chainName,
  value: item.chainName,
  description: 'Token',
}));
const SELECT_ICON_DATA = CHAINS.map((item) => ({
  label: item.chainName,
  value: item.chainName,
  image: item.logoUri,
}));
const SELECT_FULL_DATA = CHAINS.map((item) => ({
  label: item.chainName,
  value: item.chainName,
  description: 'Token',
  image: item.logoUri,
}));

const defaults = {
  allowDeselect: false,
  clearable: false,
  creatable: false,
  description: 'Token',
  disabled: false,
  dropdownComponent: null,
  dropdownPosition: 'bottom' as 'bottom' | 'top' | 'flip',
  error: null,
  hoverOnSearchChange: false,
  icon: null,
  iconWidth: undefined,
  initiallyOpened: false,
  inputContainer: undefined,
  inputWrapperOrder: ['description', 'input', 'label', 'error'] as (
    | 'input'
    | 'label'
    | 'error'
    | 'description'
  )[],
  itemComponent: undefined,
  label: null,
  limit: undefined,
  maxDropdownHeight: undefined,
  nothingFound: null,
  portalProps: {},
  positionDependencies: [],
  radius: 'md' as 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  required: false,
  rightSection: null,
  rightSectionWidth: undefined,
  searchable: false,
  selectOnBlur: false,
  shadow: 'xl' as 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  shouldCreate: undefined,
  size: 'md' as 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  switchDirectionOnFlip: false,
  transitionProps: {},
  variant: 'default',
  withAsterisk: false,
  withinPortal: true,
  wrapperProps: {},
  zIndex: 200,
  name: 'select',
  hideText: false,
};

const render = function Component(args: SelectProps) {
  const [, setArgs] = useArgs();

  const handleChange = (value: string) => {
    setArgs({ value });
  };

  return <Select {...args} onChange={handleChange} />;
};

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        height: '200px',
      },
    },
  },
  argTypes: {
    allowDeselect: {
      control: { type: 'boolean' },
    },
    clearable: {
      control: { type: 'boolean' },
    },
    creatable: {
      control: { type: 'boolean' },
    },
    description: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    dropdownPosition: {
      options: ['bottom', 'top', 'flip'],
      control: { type: 'select' },
    },
    error: {
      control: { type: 'text' },
    },
    filterDataOnExactSearchMatch: {
      control: { type: 'boolean' },
    },
    hoverOnSearchChange: {
      control: { type: 'boolean' },
    },
    icon: {
      control: { type: 'text' },
    },
    initiallyOpened: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    maxDropdownHeight: {
      control: { type: 'number' },
    },
    nothingFound: {
      control: { type: 'text' },
    },
    radius: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
    },
    required: {
      control: { type: 'boolean' },
    },
    searchValue: {
      control: { type: 'text' },
    },
    searchable: {
      control: { type: 'boolean' },
    },
    selectOnBlur: {
      control: { type: 'boolean' },
    },
    shadow: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
    },
    size: {
      options: SIZE_OPTIONS,
      control: { type: 'select' },
    },
    value: {
      control: { type: 'text' },
    },
    variant: {
      options: ['unstyled', 'default', 'filled'],
      control: { type: 'select' },
    },
    withAsterisk: {
      control: { type: 'boolean' },
    },
    withinPortal: {
      control: { type: 'boolean' },
    },
    zIndex: {
      control: { type: 'number' },
    },
    hideText: {
      control: { type: 'boolean' },
    },
    data: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...defaults,
    value: SELECT_DATA[0],
    data: SELECT_DATA,
  },
  render,
};

export const Searchable: Story = {
  args: {
    ...defaults,
    value: SELECT_DATA[0],
    data: SELECT_DATA,
    searchable: true,
  },
  render,
};

export const Error: Story = {
  args: {
    ...defaults,
    value: SELECT_DATA[0],
    data: SELECT_DATA,
    error: 'Something went wrong',
  },
  render,
};

export const Clearable: Story = {
  args: {
    ...defaults,
    value: SELECT_DATA[0],
    data: SELECT_DATA,
    clearable: true,
  },
  render,
};

export const WithDescription: Story = {
  args: {
    ...defaults,
    value: SELECT_DESCRIPTION_DATA[0].value,
    data: SELECT_DESCRIPTION_DATA,
  },
  render,
};

export const WithIcon: Story = {
  args: {
    ...defaults,
    value: SELECT_ICON_DATA[0].value,
    data: SELECT_ICON_DATA,
  },
  render,
};

export const WithIconAndDescription: Story = {
  args: {
    ...defaults,
    value: SELECT_FULL_DATA[0].value,
    data: SELECT_FULL_DATA,
  },
  render,
};

export const WithHiddenText: Story = {
  args: {
    ...defaults,
    value: SELECT_ICON_DATA[0].value,
    data: SELECT_ICON_DATA,
    hideText: true,
  },
  render,
};
