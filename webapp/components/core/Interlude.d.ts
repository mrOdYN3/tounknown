/** Serif-italic quote interlude — the breathing pause between sections; carries the copy-bank lines. */
export interface InterludeProps {
  /** The sacred line, usually verbatim from the copy bank. */
  quote: React.ReactNode;
  /** Small uppercase label under the quote, e.g. "— the toUnknown way". */
  attribution?: string;
  /** Quote font size (px). Default 21. */
  size?: number;
  /** Ornamental gold hairline rule above the quote. Default true. */
  ornament?: boolean;
  style?: React.CSSProperties;
}
export declare function Interlude(props: InterludeProps): JSX.Element;
