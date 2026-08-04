/** Curriculum step row — tracks unlock by practice (abhyāsa), gates are Dīkṣā moments. */
export interface StepRowProps {
  title: React.ReactNode;
  /** e.g. "15 min · free", "Opens after the sitting before it". */
  subtitle?: string;
  /** done (sage ✓/☸), next (gold pulse ▶/⛩ + action), locked (dim + gold seal note), idle. */
  state?: "done" | "next" | "locked" | "idle";
  /** Dīkṣā gate row — icon becomes ⛩ (☸ when done). */
  gate?: boolean;
  /** Gold serif note under locked rows, e.g. `opens when you have sat Day 2`. */
  lockedNote?: string;
  /** Button label on the next step ("Sit" / "Enter"). */
  action?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}
export declare function StepRow(props: StepRowProps): JSX.Element;
