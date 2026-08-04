/** Pill chip for tags and states. Gold tone only for meaning: membership, seals, dāna, paramparā. */
export interface ChipProps {
  /** neutral (default), gold (sacred/meaningful), green (done/positive). */
  tone?: "neutral" | "gold" | "green";
  /** Variant for use on dark photo scrims. */
  onDark?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Chip(props: ChipProps): JSX.Element;
