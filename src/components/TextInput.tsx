import {
  TextInput as MantineTextInput,
  clsx,
  createStyles,
  type TextInputProps as MantineTextInputProps,
} from '@mantine/core';
import { forwardRef, type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type StylesProps = {
  variant: 'unstyled' | 'default' | 'filled';
};

const useStyles = createStyles((theme, { variant }: StylesProps) => ({
  input: {
    '& .mantine-TextInput-input': {
      ...(variant !== 'unstyled' && {
        background:
          variant === 'default' ? 'transparent' : theme.colors?.level?.[1],
        color:
          variant === 'default'
            ? theme.colors?.primary?.[0]
            : theme.colors?.primary?.[0],
        borderRadius: theme.radius.md,
        borderColor: theme.colors?.primary?.[0],
      }),
    },

    '& .mantine-TextInput-error': {
      color: theme.colors?.error?.[0],
    },
  },
}));

export type TextInputProps = {
  /**
   * TextInput description
   */
  description?: ReactNode;
  /**
   * TextInput props spread to description element
   */
  descriptionProps?: Record<string, any>;
  /**
   * TextInput disabled state
   */
  disabled?: boolean;
  /**
   * TextInput should display error message
   */
  error?: ReactNode;
  /**
   * TextInput props added to error element
   */
  errorProps?: Record<string, any>;
  /**
   * TextInput icon on the left side of the input
   */
  icon?: ReactNode;
  /**
   * TextInput width of the icon section
   */
  iconWidth?: string | number;

  /**
   * TextInput container component (defaults to React.Fragment)
   */
  inputContainer?: (children: ReactNode) => ReactNode;
  /**
   * TextInput onChange handler
   */
  onChange?: (value: string) => void;
  /**
   * Controls order of the TextInput.Wrapper elements
   */
  inputWrapperOrder?: ('input' | 'label' | 'error' | 'description')[];
  /**
   * TextInput label
   */
  label?: ReactNode;
  /**
   * TextInput props add to label element
   */
  labelProps?: Record<string, any>;
  /**
   * TextInput radius size (key of theme.radius)
   */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * TextInput should be required
   */
  required?: boolean;
  /**
   * TextInput right section, similar to icon but on the right
   */
  rightSection?: ReactNode;
  /**
   * Props spread to rightSection div element
   */
  rightSectionProps?: Record<string, any>;
  /**
   * TextInput width of right section, is used to calculate input padding-right
   */
  rightSectionWidth?: string | number;
  /**
   * TextInput size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * TextInput element type
   */
  type?: string;
  /**
   * TextInput variant
   */
  variant?: 'unstyled' | 'default' | 'filled';
  /**
   * TextInput should required asterisk be rendered, overrides required prop, does not add required attribute to the input
   */
  withAsterisk?: boolean;
  /**
   * TextInput props added to root element (TextInputWrapper component)
   */
  wrapperProps?: Record<string, any>;
  /**
   * TextInput name attribute (used with forms)
   */
  name?: string;
  /**
   * TextInput should use Controller from react-hook-form
   */
  useController?: boolean;
  /**
   * Controlled input value
   */
  value?: string;
  /**
   * TextInput class name
   */
  className?: string;
} & Omit<MantineTextInputProps, 'onChange'>;

export const TextInput = forwardRef(
  (
    {
      name,
      value,
      className,
      variant = 'default',
      size = 'md',
      onChange = () => null,
      useController = false,
      ...props
    }: TextInputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const context = useFormContext();

    const { classes } = useStyles({ variant });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onChange(value);
    };

    if (useController && name && context) {
      return (
        <Controller
          name={name}
          control={context?.control}
          render={({ field }) => (
            <MantineTextInput
              {...props}
              variant={variant}
              size={size}
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              onBlur={field.onBlur}
              className={clsx(classes.input, className)}
              ref={ref}
            />
          )}
        />
      );
    }

    return (
      <MantineTextInput
        {...props}
        name={name}
        variant={variant}
        size={size}
        value={value}
        onChange={handleChange}
        className={clsx(classes.input, className)}
        ref={ref}
      />
    );
  },
);
