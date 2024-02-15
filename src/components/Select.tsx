import {
  Select as MantineSelect,
  createStyles,
  type MantineNumberSize,
  type SelectItem as MantineSelectItem,
  type SelectProps as MantineSelectProps,
  type MantineShadow,
  type PortalProps,
  type SelectItem,
  type TransitionProps,
  type Variants,
} from "@mantine/core";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
  type ReactNode,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import { type ExtendedMantineSize } from "../types";
import { Avatar } from "./Avatar";
import { Flex } from "./Flex";
import { Text } from "./Text";

const imageSizes = {
  xs: 14,
  sm: 20,
  md: 30,
} as Record<ExtendedMantineSize, number>;

type StylesProps = {
  containsImage: boolean;
  isLoading: boolean;
  imageUri: string;
  size: ExtendedMantineSize;
  radius: MantineNumberSize;
  variant: Variants<"unstyled" | "default" | "filled">;
  hideText: boolean;
};

const useStyles = createStyles(
  (
    theme,
    {
      containsImage,
      isLoading,
      imageUri,
      size,
      radius,
      variant,
      hideText,
    }: StylesProps
  ) => ({
    selectWrapper: {
      ...(containsImage && {
        "&::before": {
          content: '""',
          display: "block",
          width: `${imageSizes[SIZE_MAPPER[size]]}px`,
          height: `${imageSizes[SIZE_MAPPER[size]]}px`,
          backgroundImage: `url(${
            isLoading
              ? theme.colorScheme === "dark"
                ? "/assets/images/spinner_light.svg"
                : "/assets/images/spinner_dark.svg"
              : imageUri
          })`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          left: "6px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        },
      }),
    },
    selectDropdown: {
      borderRadius: "14px",
      background: theme.colors?.level?.[1],
      border: `1px solid ${theme.colors?.level?.[2]}`,
      overflow: "hidden",
    },
    selectInput: {
      color: theme.colors?.primary?.[0],
      ...(variant === "unstyled" && { border: "none" }),
      ...(variant === "unstyled" && { background: "transparent !important" }),
      ...(hideText && { fontSize: "0px !important" }),
      borderRadius: theme.radius[radius as keyof typeof theme.radius],
      paddingLeft: containsImage
        ? `${imageSizes[SIZE_MAPPER[size]] + 16}px`
        : "",
    },
    selectItem: {
      color: theme.colors?.primary?.[0],
      borderRadius: theme.radius.lg,
      "&[data-hovered]": {
        background: theme.colors?.level?.[2],
      },
      "&[data-selected]": {
        background: theme.colors?.brand?.[0],
        "&:hover": {
          background: theme.colors?.brand?.[0],
        },
      },
    },
    rightSection: {
      ...(containsImage && {
        width: "26px",
        stroke: theme.colors?.subtle?.[0],
        strokeWidth: "0.4px",
      }),
    },
  })
);

const SIZE_MAPPER = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "sm",
  xl: "md",
} as Record<ExtendedMantineSize, ExtendedMantineSize>;

type SelectItemProps = {
  image?: string;
  label?: string;
  description?: string;
  size: ExtendedMantineSize;
};

const SelectItem = ({
  image,
  label,
  description,
  size,
  ...props
}: SelectItemProps) => (
  <div {...props}>
    <Flex wrap="nowrap" align="center" gap={label || description ? size : 0}>
      {image && <Avatar src={image} size={SIZE_MAPPER[size]} />}

      <div>
        {label && <Text size={size}>{label}</Text>}
        {description && (
          <Text size={SIZE_MAPPER[size]} opacity={0.65}>
            {description}
          </Text>
        )}
      </div>
    </Flex>
  </div>
);

export type SelectProps = {
  /**
   * Dropdown should allow deselect
   */
  allowDeselect?: boolean;
  /**
   * Dropdown props added to clear button
   */
  clearButtonProps?: Pick<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "key"
  >;
  /**
   * Dropdown is clearable
   */
  clearable?: boolean;
  /**
   * Dropdown should allow creatable option
   */
  creatable?: boolean;
  /**
   * Dropdown input description
   */
  description?: ReactNode;
  /**
   * Dropdown props added to description element
   */
  descriptionProps?: Record<string, any>;
  /**
   * Dropdown disabled state
   */
  disabled?: boolean;
  /**
   * Dropdown component
   */
  dropdownComponent?: ReactNode;
  /**
   * Dropdown position
   */
  dropdownPosition?: "bottom" | "top" | "flip";
  /**
   * Dropdown error message
   */
  error?: ReactNode;
  /**
   * Dropdown props added to error
   */
  errorProps?: Record<string, any>;
  /**
   * Dropdown filter function
   */
  filter?: (value: string, item: SelectItem) => boolean;
  /**
   * Dropdown should filter on exact match
   */
  filterDataOnExactSearchMatch?: boolean;
  /**
   * Dropdown function to create label
   */
  getCreateLabel?: (query: string) => ReactNode;
  /**
   * Dropdown should hover on first result when search changes
   */
  hoverOnSearchChange?: boolean;

  /**
   * Dropdown should add icon on the left side of input
   */
  icon?: ReactNode;

  /**
   * Dropdown idth of icon section
   */
  iconWidth?: string | number;

  /**
   * Initial dropdown opened state
   */
  initiallyOpened?: boolean;

  /**
   * Input container component, defaults to React.Fragment
   */
  inputContainer?: (children: ReactNode) => ReactNode;

  /**
   * Dropdown order of the Input.Wrapper elements
   */
  inputWrapperOrder?: ("input" | "label" | "error" | "description")[];

  /**
   * Dropdown change item renderer
   */
  itemComponent?: FC<any>;

  /**
   * Input label, displayed before input
   */
  label?: ReactNode;

  /**
   * Props spread to label element
   */
  labelProps?: Record<string, any>;

  /**
   * Limit amount of items displayed at a time for searchable select
   */
  limit?: number;

  /**
   * Maximum dropdown height
   */
  maxDropdownHeight?: number;

  /**
   * Nothing found label
   */
  nothingFound?: ReactNode;

  /**
   * Select onChange handler
   */
  onChange?: (value: string) => void;

  /**
   * Called when create option is selected
   */
  onCreate?: (query: string) => string | SelectItem;

  /**
   * Called when dropdown is closed
   */
  onDropdownClose?: () => void;

  /**
   * Called when dropdown is opened
   */
  onDropdownOpen?: () => void;

  /**
   * Called each time search value changes
   */
  onSearchChange?: (query: string) => void;

  /**
   * Props to pass down to the portal when withinPortal is true
   */
  portalProps?: Omit<PortalProps, "children" | "withinPortal">;

  /**
   * useEffect dependencies to force update dropdown position
   */
  positionDependencies?: any[];

  /**
   * Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default
   */
  radius?: number | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Adds required attribute to the input and red asterisk on the right side of label
   */
  required?: boolean;

  /**
   * Right section of input, similar to icon but on the right
   */
  rightSection?: ReactNode;

  /**
   * Props spread to rightSection div element
   */
  rightSectionProps?: Record<string, any>;

  /**
   * Width of right section, is used to calculate input padding-right
   */
  rightSectionWidth?: string | number;

  /**
   * Controlled search input value
   */
  searchValue?: string;

  /**
   * Set to true to enable search
   */
  searchable?: boolean;

  /**
   * Select highlighted item on blur
   */
  selectOnBlur?: boolean;

  /**
   * Dropdown shadow from theme or any value to set box-shadow
   */
  shadow?: MantineShadow;

  /**
   * Function to determine if create label should be displayed
   */
  shouldCreate?: (query: string, data: SelectItem[]) => boolean;

  /**
   * Input size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Dropdown should switch item order and keyboard navigation on dropdown position flip
   */
  switchDirectionOnFlip?: boolean;

  /**
   * Props added to Transition component that used to animate dropdown presence
   */
  transitionProps?: Partial<Omit<TransitionProps, "mounted">>;

  /**
   * Controlled input value
   */
  value?: string;

  /**
   * Defines input appearance
   */
  variant?: Variants<"unstyled" | "default" | "filled">;

  /**
   * Dropdown should asterisk be rendered
   */
  withAsterisk?: boolean;

  /**
   * Dropdown should render in a Portal
   */
  withinPortal?: boolean;

  /**
   * Dropdown props added to root element
   */
  wrapperProps?: Record<string, any>;

  /**
   * Dropdown z-index
   */
  zIndex?: number;

  /**
   * Dropdown contents
   */
  data: readonly (string | MantineSelectItem)[];
  /**
   * Dropdown change callback
   */
  callback?: (value: string | null) => void;
  /**
   * Dropdown name attribute (used with forms)
   */
  name?: string;
  /**
   * Dropdown should use Controller from react-hook-form
   */
  useController?: boolean;
  /**
   * Dropdown is loading data (used with image)
   */
  isLoading?: boolean;
  /**
   * Dropdown should hide input text
   */
  hideText?: boolean;
  /**
   * Select class name
   */
  className?: string;
} & MantineSelectProps;
/**
 * Dropdown component
 */
export const Select = forwardRef(
  (
    {
      name,
      value,
      data,
      className,
      size = "md",
      radius = "md",
      onChange = () => null,
      callback = () => null,
      useController = false,
      isLoading = false,
      hideText = false,
      variant = "default",
      ...props
    }: SelectProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const containsImage = typeof data?.[0] !== "string" && !!data?.[0]?.image;
    const selectedItem = data.find(
      (item) => typeof item !== "string" && item?.value === value
    );
    const imageUri =
      typeof selectedItem !== "string" ? selectedItem?.image : "";

    const context = useFormContext();
    const { classes } = useStyles({
      containsImage,
      isLoading,
      imageUri,
      size,
      radius,
      variant,
      hideText,
    });

    if (useController && name && context) {
      return (
        <Controller
          name={name}
          control={context?.control}
          render={({ field }) => (
            <MantineSelect
              {...props}
              variant={variant}
              radius={radius}
              value={field.value}
              size={size}
              itemComponent={({ image, label, description, ...itemProps }) => (
                <SelectItem
                  {...itemProps}
                  image={image}
                  label={label}
                  description={description}
                  size={size}
                />
              )}
              onChange={field.onChange}
              onBlur={field.onBlur}
              data={data}
              ref={ref}
              className={className}
              classNames={{
                wrapper: classes.selectWrapper,
                dropdown: classes.selectDropdown,
                input: classes.selectInput,
                item: classes.selectItem,
                rightSection: classes.rightSection,
              }}
            />
          )}
        />
      );
    }

    return (
      <MantineSelect
        {...props}
        variant={variant}
        radius={radius}
        value={value}
        size={size}
        itemComponent={({ image, label, description, ...itemProps }) => (
          <SelectItem
            {...itemProps}
            image={image}
            label={label}
            description={description}
            size={size}
          />
        )}
        onChange={onChange}
        data={data}
        ref={ref}
        className={className}
        classNames={{
          wrapper: classes.selectWrapper,
          dropdown: classes.selectDropdown,
          input: classes.selectInput,
          item: classes.selectItem,
          rightSection: classes.rightSection,
        }}
      />
    );
  }
);
