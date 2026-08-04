/** iOS-style bottom sheet — grabber handle, white blur, spring slide-up; scrim click + Esc close. */
export interface SheetProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  /** Sheet width cap; matches the 430px app frame by default. */
  maxWidth?: number;
  ariaLabel?: string;
  style?: React.CSSProperties;
}
export declare function Sheet(props: SheetProps): JSX.Element;
