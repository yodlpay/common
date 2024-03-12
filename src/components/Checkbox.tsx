import { CheckCircleIcon } from '@heroicons/react/20/solid'
import {
  Checkbox as MantineCheckbox,
  clsx,
  createStyles,
  rem,
  type CheckboxGroupProps as MantineCheckboxGroupProps,
  type CheckboxProps as MantineCheckboxProps,
  type MantineColor,
} from '@mantine/core'
import { forwardRef, type FC, type ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Flex } from './Flex'
import { Text } from './Text'

type StylesProps = {
  checked: boolean
  variant: 'default' | 'outline'
}

const useStyles = createStyles((theme, { checked, variant }: StylesProps) => ({
  checkbox: {
    '& .mantine-Checkbox-body': {
      WebkitUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',

      ...(variant === 'outline' && {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.colors?.base?.[0],
        border: `1px solid ${theme.colors?.base?.[0]}`,
        borderRadius: theme.radius.md,
        minHeight: rem(52),
        padding: rem(16),
      }),
    },

    '& .mantine-Checkbox-icon': {
      ...(variant === 'outline' && {
        display: 'none',
      }),
    },

    '& .mantine-Checkbox-input': {
      cursor: 'pointer',
      ...(variant === 'default' && {
        display: 'flex',
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        background: 'transparent',
        border: '1px solid #DEE2E6',
      }),
      ...(variant === 'outline' && {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        background: 'transparent',
      }),
    },

    '& .mantine-Checkbox-input:checked': {
      ...(variant === 'default' && {
        background: theme.colors?.brand?.[0],
        color: '#fff',
        border: `1px solid ${theme.colors?.brand?.[0]}`,
      }),
      ...(variant === 'outline' && {
        border: `1px solid ${theme.colors?.subtle?.[0]}`,
        background: theme.colors?.level?.[2],
      }),
    },

    '& .mantine-Checkbox-labelWrapper': {
      ...(variant === 'outline' && {
        zIndex: 1,
        width: '100%',
      }),
    },

    '& .mantine-Checkbox-label': {
      cursor: 'pointer',
      ...(variant === 'outline' && {
        fontSize: rem(14),
        color: theme.colors?.primary?.[0],
        paddingLeft: 0,
        fontWeight: checked ? 600 : 400,
      }),
    },

    '& .mantine-Checkbox-inner': {
      ...(variant === 'outline' && {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
      }),
    },
  },
  checkIcon: {
    color: theme.colors?.subtle?.[0],
  },
}))

export type CheckboxProps = {
  /** Key of theme.colors */
  color?: MantineColor

  /** Determines whether the checkbox is checked or unchecked initially. */
  checked?: boolean

  /** Description, displayed after the label */
  description?: ReactNode

  /** Error message displayed after the input */
  error?: ReactNode

  /** Icon rendered before the label */
  icon?: ReactNode

  /** Icon rendered when checkbox has checked or indeterminate state */
  checkIcon?: FC<{ indeterminate: boolean; className: string }>

  /** Indeterminate state of checkbox, if set, `checked` prop is ignored */
  indeterminate?: boolean

  /** Checkbox label */
  label?: ReactNode

  /** Position of the label */
  labelPosition?: 'left' | 'right'

  /** Called when value changes */
  onChange?: (value: boolean) => void

  /** Key of theme.radius or any valid CSS value to set border-radius. Defaults to theme.defaultRadius. */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Controls label font-size and checkbox width and height */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Checkbox should use Controller from react-hook-form */
  useController?: boolean

  /** Transition duration in ms */
  transitionDuration?: number

  /** Props added to the root element */
  wrapperProps?: Record<string, any>

  /** Controls appearance */
  variant?: 'default' | 'outline'

  /** Input class name */
  className?: string
} & Omit<MantineCheckboxProps, 'icon' | 'onChange'>

export type CheckboxGroupProps = {
  /** `<Checkbox />` components */
  children: ReactNode

  /** Initial selected checkboxes, use for uncontrolled components, overridden by value prop */
  defaultValue?: string[]

  /** Input description, displayed after label */
  description?: ReactNode

  /** Props spread to description element */
  descriptionProps?: Record<string, any>

  /** Displays error message after input */
  error?: ReactNode

  /** Props spread to error element */
  errorProps?: Record<string, any>

  /** Input container component, defaults to React.Fragment */
  inputContainer?: (children: ReactNode) => ReactNode

  /** Controls order of the Input.Wrapper elements */
  inputWrapperOrder?: ('input' | 'label' | 'error' | 'description')[]

  /** Input label, displayed before input */
  label?: ReactNode

  /** Props spread to label element */
  labelProps?: Record<string, any>

  /** Called when value changes */
  onChange?: (value: string[]) => void

  /** Adds required attribute to the input and red asterisk on the right side of label */
  required?: boolean

  /** Controls label font-size and checkbox width and height */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Value of selected checkboxes, use for controlled components */
  value?: string[]

  /** Determines whether required asterisk should be rendered, overrides required prop, does not add required attribute to the input */
  withAsterisk?: boolean

  /** Props added to Input.Wrapper component (root element) */
  wrapperProps?: Record<string, any>
} & MantineCheckboxGroupProps

const InnerCheckbox = forwardRef(
  (
    {
      name,
      className,
      icon,
      checkIcon,
      label,
      variant = 'default',
      checked = false,
      useController = false,
      onChange = () => null,
      ...props
    }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const context = useFormContext()

    const { classes } = useStyles({ checked, variant })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.checked
      onChange(value)
    }

    const renderContent = (icon?: ReactNode) => (
      <>
        <Flex align="center">
          {icon && icon}
          <Text ml={'12px'}>{label}</Text>
        </Flex>
        {checked && (
          <CheckCircleIcon
            width="16px"
            height="16px"
            className={classes.checkIcon}
          />
        )}
      </>
    )

    let renderedLabel =
      variant === 'outline' ? (
        <Flex align="center" justify="space-between">
          {renderContent()}
        </Flex>
      ) : (
        label
      )

    if (icon) {
      renderedLabel =
        variant === 'outline' ? (
          <Flex align="center" justify="space-between">
            {renderContent(icon)}
          </Flex>
        ) : (
          <Flex align="center">
            {icon}
            <Text ml={'6px'}>{label}</Text>
          </Flex>
        )
    }

    if (useController && name && context) {
      return (
        <Controller
          name={name}
          control={context?.control}
          render={({ field }) => (
            <MantineCheckbox
              {...props}
              key={`${field.name}_${field.value}`}
              checked={field.value}
              label={renderedLabel}
              icon={checkIcon}
              value={field.value}
              onChange={(e) => {
                field.onChange(e)
                handleChange(e)
              }}
              onBlur={field.onBlur}
              className={clsx(classes.checkbox, className)}
              ref={ref}
            />
          )}
        />
      )
    }

    return (
      <MantineCheckbox
        {...props}
        checked={checked}
        label={renderedLabel}
        icon={checkIcon}
        onChange={handleChange}
        className={clsx(classes.checkbox, className)}
        ref={ref}
      />
    )
  },
)

const CheckboxGroup = MantineCheckbox.Group

const Checkbox = Object.assign(InnerCheckbox, {
  Group: CheckboxGroup,
})

export { Checkbox }
