/** Fixed bottom tab bar — Home · Mārga · Sangha · Dāna · Sādhana; active tab gold; quiet gold membership dot. */
export interface TabBarTab {
  id: string;
  label: string;
  /** One of the brand icons: "home" | "path" | "sangha" | "dana" | "profile". */
  icon: "home" | "path" | "sangha" | "dana" | "profile";
  /** Quiet gold dot (membership state) — never a "PRO" badge. */
  dot?: boolean;
}
export interface TabBarProps {
  /** Defaults to the app's five tabs. */
  tabs?: TabBarTab[];
  active: string;
  onChange?: (id: string) => void;
  /** Fixed to viewport bottom (default). false = inline for previews. */
  fixed?: boolean;
  style?: React.CSSProperties;
}
export declare function TabBar(props: TabBarProps): JSX.Element;
