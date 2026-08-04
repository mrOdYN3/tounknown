/** Quiet pill toast — gold hairline, white blur; the app whispers ("15 min sat · the next track has opened"). */
export interface ToastProps {
  message: React.ReactNode;
  /** Visible state — animates in/out with spring. */
  show?: boolean;
  /** Fix above the tab bar (app usage). false renders inline for previews. */
  fixed?: boolean;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
