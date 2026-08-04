/** Membership/tier card for the tuition ladder (Seeker $0 · Student $11 · Sādhaka $33 · Founding $108). */
export interface TierCardProps {
  /** Small chip label, e.g. "seeker", "student · toUnknown+". */
  chip?: string;
  chipTone?: "neutral" | "gold" | "green";
  title?: React.ReactNode;
  /** e.g. "$11" — rendered 30/700. */
  price?: React.ReactNode;
  /** e.g. "/mo or $88/yr", "· once". */
  priceNote?: string;
  bullets?: React.ReactNode[];
  /** Featured tier: gold hairline border + gold glow. */
  hot?: boolean;
  /** CTA buttons, sliders, etc. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function TierCard(props: TierCardProps): JSX.Element;
