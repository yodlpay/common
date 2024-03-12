import { Cog8ToothIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { createStyles, rem } from '@mantine/core'
import { type ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ActionIcon } from './ActionIcon'
import { Checkbox } from './Checkbox'
import { Flex } from './Flex'
import { Text } from './Text'

type StylesProps = {
  configured: boolean
}

const useStyles = createStyles((theme, { configured }: StylesProps) => ({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: rem(40),
    width: '100%',
  },
  checkbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& .mantine-Checkbox-body': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      WebkitUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
    },

    '& .mantine-Checkbox-input': {
      display: 'flex',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      background: 'transparent',
      border: '1px solid #DEE2E6',
      cursor: 'pointer',
    },

    '& .mantine-Checkbox-input:checked': {
      background: theme.colors?.brand?.[0],
      color: '#fff',
      border: `1px solid ${theme.colors?.brand?.[0]}`,
    },

    '& .mantine-Checkbox-label': {
      paddingLeft: 0,
      cursor: 'pointer',
    },
  },
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: rem(24),
  },
  label: {
    display: 'flex',
    marginLeft: rem(8),
  },
  details: {
    display: 'flex',
    marginLeft: rem(8),
  },
  config: {
    display: 'flex',
    marginRight: rem(4),
  },
  configIconWrapper: {
    ...(configured && {
      border: 'none',
      borderBottom: `2px solid ${theme.colors?.brand?.[0]}`,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    }),
  },
  configIcon: {
    color: configured ? theme.colors?.brand?.[0] : theme.colors?.subtle?.[0],
  },
}))

export type ConfigItemProps = {
  /** Checkbox id used to identify the item on configure icon click */
  id?: string

  /** Determines whether the checkbox is checked or unchecked initially. */
  checked?: boolean

  /** Optional icon to be displayed next to the checkbox label. */
  icon?: React.ReactNode

  /** Config label displayed next to the config icon. */
  config?: ReactNode

  /** Determine whether the item is configured */
  configured?: boolean

  /** Config icon to be displayed for configuring the item. */
  configIcon?: 'cog' | 'pencil'

  /** Label text displayed next to the checkbox. */
  label: ReactNode

  /** Additional details or description displayed next to the checkbox label. */
  details?: ReactNode

  /** Determines whether the checkbox is configurable, i.e., shows a configuration icon next to it. */
  configurable?: boolean

  /** Callback function that is called when the checkbox state changes. */
  onChange?: (isChecked: boolean) => void

  /** Callback function that is called when the configure icon is clicked. */
  onConfigure?: ({ name, id }: { name?: string; id?: string }) => void

  /** Checkbox name attribute (used with forms). */
  name?: string

  /** Determines if the checkbox should use `Controller` from react-hook-form. */
  useController?: boolean
}

export const ConfigItem = ({
  id,
  icon,
  label,
  details,
  configurable,
  checked = false,
  onChange = () => null,
  onConfigure = () => null,
  name,
  useController = false,
  config,
  configIcon = 'cog',
  configured = false,
}: ConfigItemProps) => {
  const context = useFormContext()

  const { classes } = useStyles({ configured })

  const renderedConfigIcon =
    configIcon === 'cog' ? (
      <Cog8ToothIcon width="20px" className={classes.configIcon} />
    ) : (
      <PencilSquareIcon width="16px" className={classes.configIcon} />
    )

  const containsRightSection = !!config || configurable

  const handleChange = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = event.currentTarget.checked
    onChange(value)
  }

  const handleClick = () => {
    onConfigure({ name, id })
  }

  if (!!useController && !!name && !!context) {
    return (
      <Controller
        name={name}
        control={context?.control}
        render={({ field }) => (
          <Flex
            key={`${field.name}_${field.value}`}
            className={classes.container}
          >
            <Checkbox
              {...(id && { id })}
              checked={field.value}
              onClick={(e) => {
                field.onChange(e)
                handleChange(e)
              }}
              label={
                <Flex className={classes.wrapper}>
                  {icon && icon}
                  <Text
                    c="primary.0"
                    size={15}
                    weight={500}
                    className={classes.label}
                  >
                    {label}
                  </Text>
                  {details ? (
                    <Text c="subtle.0" size={13} className={classes.details}>
                      {details}
                    </Text>
                  ) : null}
                </Flex>
              }
              className={classes.checkbox}
            />
            {containsRightSection && (
              <Flex>
                {config ? (
                  <Text c="subtle.0" size={13} className={classes.config}>
                    {config}
                  </Text>
                ) : null}
                {configurable && (
                  <ActionIcon
                    onClick={handleClick}
                    className={classes.configIconWrapper}
                  >
                    {renderedConfigIcon}
                  </ActionIcon>
                )}
              </Flex>
            )}
          </Flex>
        )}
      />
    )
  }

  return (
    <Flex className={classes.container}>
      <Checkbox
        {...(id && { id })}
        checked={checked}
        onClick={handleChange}
        label={
          <Flex className={classes.wrapper}>
            {icon && icon}
            <Text
              c="primary.0"
              size={15}
              weight={500}
              className={classes.label}
            >
              {label}
            </Text>
            {details ? (
              <Text c="subtle.0" size={13} className={classes.details}>
                {details}
              </Text>
            ) : null}
          </Flex>
        }
        className={classes.checkbox}
      />
      {containsRightSection && (
        <Flex align="center">
          {config ? (
            <Text c="subtle.0" size={13} className={classes.config}>
              {config}
            </Text>
          ) : null}
          {configurable && (
            <ActionIcon
              onClick={handleClick}
              className={classes.configIconWrapper}
            >
              {renderedConfigIcon}
            </ActionIcon>
          )}
        </Flex>
      )}
    </Flex>
  )
}
