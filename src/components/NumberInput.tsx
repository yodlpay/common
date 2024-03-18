import {
  NumberInput as MantineNumberInput,
  type NumberInputProps as MantineNumberInputProps,
} from '@mantine/core';
import { forwardRef, type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type NumberInputProps = {
  /** The decimal separator */
  decimalSeparator?: string;

  /** Default value for uncontrolled component */
  defaultValue?: number | '';

  /** Input description, displayed after label */
  description?: ReactNode;

  /** Props spread to description element */
  descriptionProps?: Record<string, any>;

  /** Disabled input state */
  disabled?: boolean;

  /** Displays error message after input */
  error?: ReactNode;

  /** Props spread to error element */
  errorProps?: Record<string, any>;

  /** Formats the number into the input */
  formatter?: (value: number | '') => string;

  /** Get increment/decrement handlers */
  handlersRef?: React.Ref<{
    increment: () => void;
    decrement: () => void;
  }>;

  /** Removes increment/decrement controls */
  hideControls?: boolean;

  /** Adds icon on the left side of input */
  icon?: ReactNode;

  /** Width of icon section */
  iconWidth?: number | string;

  /** Input container component, defaults to React.Fragment */
  inputContainer?: (children: ReactNode) => ReactNode;

  /** Controls order of the Input.Wrapper elements */
  inputWrapperOrder?: ('input' | 'label' | 'error' | 'description')[];

  /** Input label, displayed before input */
  label?: ReactNode;

  /** Props spread to label element */
  labelProps?: Record<string, any>;

  /** Maximum possible value */
  max?: number;

  /** Minimal possible value */
  min?: number;

  /** Prevent value clamp on blur */
  noClampOnBlur?: boolean;

  /** Called when value changes */
  onChange?: (value: number | string) => void;

  /** Parses the value from formatter, should be used with formatter at the same time */
  parser?: (value: string) => number | '';

  /** Amount of digits after the decimal point */
  precision?: number;

  /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Only works if a precision is given, removes the trailing zeros, false by default */
  removeTrailingZeros?: boolean;

  /** Sets required on input element */
  required?: boolean;

  /** Right section of input, similar to icon but on the right */
  rightSection?: ReactNode;

  /** Props spread to rightSection div element */
  rightSectionProps?: Record<string, any>;

  /** Width of right section, is used to calculate input padding-right */
  rightSectionWidth?: number | string;

  /** Input size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** First value if no initial value was set and increment/decrement is triggered using controls or up/down arrows */
  startValue?: number;

  /** Number by which value will be incremented/decremented with controls and up/down arrows */
  step?: number;

  /** Initial delay in milliseconds before stepping the value */
  stepHoldDelay?: number;

  /** Delay before stepping the value. Can be a number of milliseconds or a function that receives the current step count and returns the delay in milliseconds */
  stepHoldInterval?: number | ((stepCount: number) => number);

  /** The thousands separator */
  thousandsSeparator?: string;

  /** Input type, defaults to text */
  type?: 'number' | 'text';

  /** Input value for controlled component */
  value?: number | '';

  /** Defines input appearance, defaults to default in light color scheme and filled in dark */
  variant?: 'unstyled' | 'default' | 'filled';

  /** Determines whether required asterisk should be rendered, overrides required prop, does not add required attribute to the input */
  withAsterisk?: boolean;

  /** Props passed to root element (InputWrapper component) */
  wrapperProps?: Record<string, any>;

  /** Input name attribute (used with forms) */
  name?: string;

  /** Input should use Controller from react-hook-form */
  useController?: boolean;

  /** Input class name */
  className?: string;
} & Omit<MantineNumberInputProps, 'onChange'>;

export const NumberInput = forwardRef(
  (
    {
      name,
      value,
      className,
      onChange = () => null,
      useController = false,
      ...props
    }: NumberInputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const context = useFormContext();

    const handleChange = (val: number | '') => {
      onChange(val);
    };

    if (useController && name && context) {
      return (
        <Controller
          name={name}
          control={context.control}
          render={({ field }) => (
            <MantineNumberInput
              {...props}
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                handleChange(val);
              }}
              onBlur={field.onBlur}
              className={className}
              ref={ref}
            />
          )}
        />
      );
    }

    return (
      <MantineNumberInput
        {...props}
        value={value}
        onChange={handleChange}
        className={className}
        ref={ref}
      />
    );
  },
);
