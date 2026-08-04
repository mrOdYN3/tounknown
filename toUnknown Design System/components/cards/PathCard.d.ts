/** Path/course photo card — dark base scrim, gold serif lineage line, white text, optional progress ring. */
export interface PathCardProps {
  /** Cover photo URL (CDN — see assets/images.md). */
  image: string;
  /** Lineage line: "tradition · source text · era", e.g. "Theravāda Buddhism · Pali Canon · ~5th c. BCE". */
  lineage?: string;
  title: React.ReactNode;
  /** One-line essence under the title. */
  essence?: string;
  /** 0–100 — renders the conic progress ring. */
  progress?: number;
  /** Chips, e.g. [{label:"5 sittings"},{label:"on the path",gold:true}] or plain strings. */
  meta?: Array<string | { label: string; gold?: boolean }>;
  /** "list" full-width (default) or "row" 240px snap-scroll card. */
  layout?: "list" | "row";
  onClick?: (e: any) => void;
  style?: React.CSSProperties;
}
export declare function PathCard(props: PathCardProps): JSX.Element;
