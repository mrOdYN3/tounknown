/** toUnknown button. Primary ("gold" variant) is an INK-BLACK pill with white text — gold is reserved for meaning, not buttons. */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** "gold" = primary ink pill (historic name), "ghost" = translucent white hairline, "quiet" = text-only. */
  variant?: "gold" | "ghost" | "quiet";
  /** Full-width. */
  wide?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
