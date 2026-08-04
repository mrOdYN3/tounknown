/** Sticky translucent app header — brand mark left, iOS compact title fades in on scroll. */
export interface AppHeaderProps {
  /** Compact title shown when scrolled (e.g. "Mārga — the Paths"). */
  title?: string;
  /** Scrolled state: hairline + compact title visible. */
  scrolled?: boolean;
  /** Logo URL; falls back to the 26px breathing orb. */
  logo?: string;
  /** Brand name text. Default "toUnknown". */
  brand?: string;
  style?: React.CSSProperties;
}
export declare function AppHeader(props: AppHeaderProps): JSX.Element;
