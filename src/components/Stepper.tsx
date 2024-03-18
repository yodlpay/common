import {
  Stepper as MantineStepper,
  type StepperProps as MantineStepperProps,
  type StepProps as MantineStepProps,
  clsx,
  createStyles,
  type MantineColor,
  rem,
} from '@mantine/core';
import { type ReactNode } from 'react';
import type { ExtendedMantineSize } from '../types';

const WIDTH = rem(24);

const SHARED_ICON_STYLES = {
  width: `${rem(15)} !important`,
  height: `${rem(10)} !important`,
};

const SHARED_MOBILE_ICON_STYLES = {
  width: `${rem(10)} !important`,
  height: `${rem(10)} !important`,
};

type StylesProps = {
  shouldBreakpoint: boolean;
  showOnlyActiveStepDetails: boolean;
  breakpoint: ExtendedMantineSize;
};

const useStyles = createStyles(
  (
    theme,
    { shouldBreakpoint, showOnlyActiveStepDetails, breakpoint }: StylesProps,
  ) => ({
    stepper: {
      ...(showOnlyActiveStepDetails && {
        "& .mantine-Stepper-step:not([data-progress='true'])": {
          '& .mantine-Stepper-stepBody': {
            height: 0,
            width: 0,
            overflow: 'hidden',
            position: 'absolute',
            opacity: 0,
            transition: 'opacity 500ms ease',
          },
          '& .mantine-Stepper-stepIcon': {
            color: theme.colors?.subtle?.[0],
            border: `1px solid ${theme.colors?.level?.[1]}`,
          },
        },
      }),
      "& .mantine-Stepper-step[data-progress='true']": {
        '& .mantine-Stepper-stepLabel': {
          color: theme.colors?.primary?.[0],
        },
      },
      '& .mantine-Stepper-stepIcon': {
        background: theme.colors?.level?.[1],
        border: `1px solid ${theme.colors?.brand?.[0]}`,
        color: theme.colors?.primary?.[0],
        fontSize: rem(15),
        fontWeight: 500,
        borderRadius: '50%',
        minWidth: WIDTH,
        width: WIDTH,
        height: WIDTH,
        '& svg': {
          ...SHARED_ICON_STYLES,
        },
        [theme.fn.smallerThan(breakpoint)]: {
          fontSize: rem(13),
          '& svg': {
            ...SHARED_MOBILE_ICON_STYLES,
          },
        },
        '&[data-progress]': {
          border: `1px solid ${theme.colors?.brand?.[0]}`,
        },
        '& .mantine-Stepper-stepCompletedIcon': {
          color: theme.colors?.base?.[0],
        },
      },
      '& .mantine-Stepper-stepIcon[data-completed]': {
        background: theme.colors?.brand?.[0],
        border: `1px solid ${theme.colors?.brand?.[0]}`,
        color: theme.colors?.base?.[0],
        '& svg': {
          ...SHARED_ICON_STYLES,
        },
        [theme.fn.smallerThan(breakpoint)]: {
          '& svg': {
            ...SHARED_MOBILE_ICON_STYLES,
          },
        },
      },
      '& .mantine-Stepper-verticalSeparator': {
        top: `calc(${WIDTH} + calc(0.625rem / 2))`,
        left: `calc(${WIDTH} / 2)`,
      },
      '& .mantine-Stepper-separator': {
        marginLeft: rem(8),
        marginRight: rem(8),
        backgroundColor: theme.colors?.level?.[2],
        ...(shouldBreakpoint && {
          [theme.fn.smallerThan(breakpoint)]: {
            marginLeft: `calc(${WIDTH} / 2 - 0.0625rem)`,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
          },
        }),
      },
      '& .mantine-Stepper-stepBody': {
        ...(showOnlyActiveStepDetails && {
          transition: 'opacity 500ms ease',
          opacity: 1,
          position: 'static',
          height: 'auto',
          width: 'auto',
        }),
        ...(!shouldBreakpoint && {
          [theme.fn.smallerThan(breakpoint)]: {
            display: 'none',
          },
        }),
      },
    },
  }),
);

type StepFragmentComponent = ReactNode | ((props: unknown) => ReactNode);

export type StepperProps = {
  /** Active step index */
  active: number;

  /** Whether to enable click on upcoming steps. Defaults to true. */
  allowNextStepsSelect?: boolean;

  /** Breakpoint at which orientation will change from horizontal to vertical */
  breakpoint?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Should stepper change to vertical orientation on smaller screen sizes */
  shouldBreakpoint?: boolean;

  /** Stepper contents */
  data?: {
    label?: string;
    description?: string;
    content?: string;
  }[];

  /** `<Stepper.Step />` components only */
  children?: ReactNode;

  /** Active and progress Step colors from theme.colors */
  color?: MantineColor;

  /** Step icon displayed when step is completed */
  completedIcon?: ReactNode | StepFragmentComponent;

  /** Key of theme.spacing or any valid CSS value to set content padding-top */
  contentPadding?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Step icon, defaults to step index + 1 when rendered within Stepper */
  icon?: ReactNode | StepFragmentComponent;

  /** Icon position relative to step body */
  iconPosition?: 'left' | 'right';

  /** Step icon size */
  iconSize?: number;

  /** Called when step is clicked */
  onStepClick?: (stepIndex: number) => void;

  /** Component orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Step icon displayed when step is in progress */
  progressIcon?: ReactNode | StepFragmentComponent;

  /** Key of theme.radius or any valid CSS value to set border-radius. Defaults to "xl". */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Component size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Should only show details for the currently active step */
  showOnlyActiveStepDetails?: boolean;

  /** Custom class for the stepper */
  className?: string;
} & Omit<MantineStepperProps, 'children'>;

export type StepperStepProps = {
  /** Set to false to disable clicks on step */
  allowStepClick?: boolean;

  /** Should step selection be allowed */
  allowStepSelect?: boolean;

  /** Step color from theme.colors */
  color?: MantineColor;

  /** Step icon displayed when step is completed */
  completedIcon?: ReactNode | StepFragmentComponent;

  /** Step description */
  description?: ReactNode | StepFragmentComponent;

  /** Step icon, defaults to step index + 1 when rendered within Stepper */
  icon?: ReactNode | StepFragmentComponent;

  /** Icon position relative to step body */
  iconPosition?: 'left' | 'right';

  /** Step icon wrapper size */
  iconSize?: number;

  /** Step label, render after icon */
  label?: ReactNode | StepFragmentComponent;

  /** Indicates loading state on step */
  loading?: boolean;

  /** Component orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Step icon displayed when step is in progress */
  progressIcon?: ReactNode | StepFragmentComponent;

  /** Key of theme.radius or any valid CSS value to set border-radius. Defaults to "xl". */
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Component size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Step state, controlled by Steps component */
  state?: 'stepInactive' | 'stepProgress' | 'stepCompleted';

  /** Step index, controlled by Steps component */
  step?: number;

  /** Should icon be displayed */
  withIcon?: boolean;
} & MantineStepProps;

export const Stepper = ({
  active,
  onStepClick,
  data,
  children,
  className,
  breakpoint = 'xs',
  allowNextStepsSelect = false,
  shouldBreakpoint = false,
  showOnlyActiveStepDetails = false,
  ...props
}: StepperProps) => {
  const { classes } = useStyles({
    shouldBreakpoint,
    showOnlyActiveStepDetails,
    breakpoint,
  });

  return (
    <MantineStepper
      {...props}
      breakpoint={shouldBreakpoint ? breakpoint : 0}
      active={active}
      onStepClick={onStepClick}
      allowNextStepsSelect={allowNextStepsSelect}
      className={clsx(classes.stepper, className)}
    >
      {children ??
        data?.map((item, index) =>
          index >= data.length - 1 ? (
            <MantineStepper.Completed key={item.label}>
              {item.content}
            </MantineStepper.Completed>
          ) : (
            <MantineStepper.Step
              key={item.label}
              label={item.label ?? ''}
              description={item.description ?? ''}
            >
              {item.content}
            </MantineStepper.Step>
          ),
        )}
    </MantineStepper>
  );
};
