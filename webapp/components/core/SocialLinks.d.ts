import React from "react";
/** Social links row — thin-stroke glyphs for toUnknown's channels (Telegram, Instagram, X, YouTube, Insight Timer, Patreon, Trustpilot, email). 44px hit targets. */
export interface SocialLinksProps {
  /** Glyph size in px. Default 18. */
  size?: number;
  /** Gap between icons. Default 6. */
  gap?: number;
  /** "ink" (tertiary → gold hover, light surfaces) or "light" (white60 → white, dark surfaces). */
  tone?: "ink" | "light";
  style?: React.CSSProperties;
}
export declare function SocialLinks(props: SocialLinksProps): JSX.Element;
