/** The breathing brand mark — toUnknown's heartbeat. Renders the gold trident-tree logo, breathing on a 6s cycle. */
export interface OrbProps {
  /** Width in px. Practice player 150, hero 56–72, small accents 26–44. */
  size?: number;
  /** Freeze the breathing animation (pre-practice state). */
  still?: boolean;
  /** Gold drop-shadow glow. */
  glow?: boolean;
  style?: React.CSSProperties;
}
export declare function Orb(props: OrbProps): JSX.Element;
