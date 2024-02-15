import {
  NativeSelect,
  clsx,
  createStyles,
  rem,
  type SelectItem,
} from "@mantine/core";
import { forwardRef, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { NumberInput, type NumberInputProps } from "./NumberInput";
import { TextInput, type TextInputProps } from "./TextInput";

type StylesProps = {
  variant: "unstyled" | "default" | "filled";
  width: number;
};

const useStyles = createStyles((theme, { variant, width }: StylesProps) => ({
  input: {
    "& .mantine-TextInput-input": {
      ...(variant !== "unstyled" && {
        color: theme.colors?.subtle?.[0],
        borderRadius: theme.radius.md,
        borderColor: theme.colors?.level?.[2],
        paddingRight: rem(width),
      }),
    },

    "& .mantine-NumberInput-input": {
      ...(variant !== "unstyled" && {
        color: theme.colors?.primary?.[0],
        borderRadius: theme.radius.md,
        borderColor: theme.colors?.level?.[2],
        paddingRight: rem(width),
      }),
    },

    "& .mantine-NumberInput-icon": {
      ...(variant !== "unstyled" && {
        color: theme.colors?.primary?.[0],
      }),
    },

    "& .mantine-Input-rightSection": {
      width: "auto",

      "& > div": {
        height: "100%",
        "& > div": {
          height: "100%",
          "& > select": {
            height: "100%",
          },
        },
      },
    },

    "& .mantine-NativeSelect-input": {
      minHeight: 0,
      lineHeight: "normal",
      cursor: "pointer",
    },

    "& .mantine-NativeSelect-rightSection": {
      marginRight: rem(8),
    },

    "& .mantine-TextInput-error": {
      color: theme.colors?.error?.[0],
    },

    "& .mantine-NumberInput-error": {
      color: theme.colors?.error?.[0],
    },
  },
  select: {
    "& .mantine-NativeSelect-input": {
      fontWeight: 500,
      borderColor: theme.colors?.level?.[2],
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
}));

export type ComboboxProps = {
  /**
   * Combobox data
   */
  data: SelectItem[];
  /**
   * Combobox input onChange handler
   */
  onInputChange?: (value: string | number) => void;
  /**
   * Combobox select onChange handler
   */
  onSelectChange?: (value: string) => void;
  /**
   * Combobox input name attribute (used with forms)
   */
  inputName?: string;
  /**
   * Combobox select name attribute (used with forms)
   */
  selectName?: string;
  /**
   * Combobox should use Controller from react-hook-form
   */
  useController?: boolean;
  /**
   * Controlled input value
   */
  inputValue?: string | number;
  /**
   * Controlled select value
   */
  selectValue?: string;
  /**
   * Combobox input class name
   */
  inputClassName?: string;

  /**
   * Combobox select class name
   */
  selectClassName?: string;
  /**
   * Combobox input type
   */
  inputType?: "text" | "number";
} & (TextInputProps & NumberInputProps);

const renderInput = (
  inputType: "text" | "number",
  inputRef: React.Ref<HTMLInputElement>,
  props: TextInputProps | NumberInputProps
) => {
  return inputType === "text" ? (
    <TextInput {...(props as TextInputProps)} ref={inputRef} />
  ) : (
    <NumberInput
      {...(props as NumberInputProps)}
      inputMode="numeric"
      ref={inputRef}
    />
  );
};

export const Combobox = forwardRef(
  (
    {
      inputName,
      selectName,
      inputValue,
      selectValue,
      data,
      inputClassName,
      selectClassName,
      variant = "default",
      size = "md",
      inputType = "text",
      onInputChange = () => null,
      onSelectChange = () => null,
      useController = false,
      ...props
    }: ComboboxProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const context = useFormContext();

    const selectRef = useRef<HTMLSelectElement | null>(null);

    const width = (selectRef?.current?.offsetWidth ?? 0) + 14;

    const { classes } = useStyles({ variant, width });

    const handleInputChange = (value: string | number) => {
      onInputChange(value);
    };

    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const value = event.target.value;
      onSelectChange(value);
    };

    const select = (
      <NativeSelect
        ref={selectRef}
        value={selectValue}
        data={data}
        variant={variant}
        onChange={handleSelectChange}
        className={clsx(classes.select, selectClassName)}
      />
    );

    if (useController && inputName && selectName && context) {
      const select = (
        <Controller
          name={selectName}
          control={context?.control}
          render={({ field }) => (
            <NativeSelect
              ref={selectRef}
              data={data}
              value={field.value}
              onChange={(e) => {
                handleSelectChange(e);
                field.onChange(e);
              }}
              onBlur={field.onBlur}
              variant={variant}
              className={clsx(classes.select, selectClassName)}
            />
          )}
        />
      );

      return renderInput(inputType, ref, {
        ...props,
        name: inputName,
        useController,
        variant,
        size,
        rightSection: select,
        className: clsx(classes.input, inputClassName),
      } as TextInputProps | NumberInputProps);
    }

    return renderInput(inputType, ref, {
      ...props,
      variant,
      size,
      value: inputValue,
      rightSection: select,
      onChange: handleInputChange,
      className: clsx(classes.input, inputClassName),
    } as TextInputProps | NumberInputProps);
  }
);
