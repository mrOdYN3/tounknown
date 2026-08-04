/** Dāna amount chips ($5 · $11 · $22 · $54 · Custom) — gold selected state; giving is invited, never pressured. */
export interface DanaChipsProps {
  /** Default [5,11,22,54]. */
  amounts?: number[];
  /** Append the "Custom" chip. Default true. */
  custom?: boolean;
  /** Initially selected amount (default second chip). */
  selected?: number | "custom";
  onSelect?: (value: number | "custom") => void;
  style?: React.CSSProperties;
}
export declare function DanaChips(props: DanaChipsProps): JSX.Element;
