import {
  Modal as MantineModal,
  createStyles,
  type ModalProps as MantineModalProps,
  type MantineNumberSize,
  type MantineShadow,
  type MantineSize,
  type ModalBaseCloseButtonProps,
  type ModalBaseOverlayProps,
  type PortalProps,
  type TransitionProps,
  rem,
} from '@mantine/core';
import { type ScrollAreaComponent } from '@mantine/core/lib/Modal/Modal.context';
import { type ReactNode } from 'react';
import { MOBILE_BREAKPOINT } from '../styles';

const useStyles = createStyles((theme) => ({
  modalOverlay: {
    zIndex: 1,
  },
  modalInner: {
    zIndex: 15,
    paddingLeft: 0,
    paddingRight: 0,
    [theme.fn.smallerThan(MOBILE_BREAKPOINT)]: {
      padding: rem(6),
    },
  },
  modalContent: {
    borderRadius: theme.radius.xl,
    maxWidth: '450px',
    maxHeight: '660px',
    height: '100%',
    flexGrow: 1,
    background: theme.colors?.base?.[0],
    [theme.fn.smallerThan(MOBILE_BREAKPOINT)]: {
      maxWidth: '100%',
    },
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
    height: '100%',
    padding: 0,
  },
}));

export type ModalProps = {
  /**
   * Modal centered state
   */
  centered?: boolean;
  /**
   * Modal props added to close button
   */
  closeButtonProps?: ModalBaseCloseButtonProps;
  /**
   * Modal should close on click outside
   */
  closeOnClickOutside?: boolean;
  /**
   * Modal should close on escape press
   */
  closeOnEscape?: boolean;
  /**
   * Modal should take full screen
   */
  fullScreen?: boolean;
  /**
   * Modal id to connect modal/drawer with body and title
   */
  id?: string;
  /**
   * Modal should remain mounted when hidden
   */
  keepMounted?: boolean;
  /**
   * Modal should disable user scroll when open
   */
  lockScroll?: boolean;
  /**
   * Modal props added to Overlay component
   */
  overlayProps?: ModalBaseOverlayProps;
  /**
   * Modal padding
   */
  padding?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Modal props added to the portal (when withinPortal is true)
   */
  portalProps?: Omit<PortalProps, 'children' | 'target' | 'withinPortal'>;
  /**
   * Modal size
   */
  size?: MantineSize;
  /**
   * Modal border radius
   */
  radius?: MantineNumberSize;
  /**
   * Modal should return focus to last active element on close
   */
  returnFocus?: boolean;
  /**
   * Modal scroll area component
   */
  scrollAreaComponent?: ScrollAreaComponent;
  /**
   * Modal shadow (key of theme.shadows)
   */
  shadow?: MantineShadow;
  /**
   * Modal target element
   */
  target?: string | HTMLElement;
  /**
   * Modal title
   */
  title?: ReactNode;
  /**
   * Modal props added to Transition component
   */
  transitionProps?: Partial<Omit<TransitionProps, 'mounted'>>;
  /**
   * Modal should trap focus
   */
  trapFocus?: boolean;
  /**
   * Modal should render close button
   */
  withCloseButton?: boolean;
  /**
   * Modal should render overlay
   */
  withOverlay?: boolean;
  /**
   * Modal should be rendered inside Portal
   */
  withinPortal?: boolean;
  /**
   * Modal left/right offset
   */
  xOffset?: React.CSSProperties['marginLeft'];
  /**
   * Modal top/bottom offset
   */
  yOffset?: React.CSSProperties['marginTop'];
  /**
   * Modal zIndex
   */
  zIndex?: number;
  /**
   * Modal visibility
   */
  opened: boolean;
  /**
   * Modal contents
   */
  children: ReactNode;
  /**
   * Modal close handler
   */
  onClose: () => void;
  /**
   * Modal class name
   */
  className?: string;
} & MantineModalProps;
/**
 * Container for payment flow
 */
export const Modal = ({
  opened,
  children,
  onClose,
  className,
  ...props
}: ModalProps) => {
  const { classes } = useStyles();

  return (
    <MantineModal
      {...props}
      opened={opened}
      onClose={onClose}
      classNames={{
        overlay: classes.modalOverlay,
        content: classes.modalContent,
        body: classes.modalBody,
        inner: classes.modalInner,
      }}
      className={className}
    >
      {children}
    </MantineModal>
  );
};
