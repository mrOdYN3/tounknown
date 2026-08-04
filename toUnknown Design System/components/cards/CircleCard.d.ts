/** Sangha circle card — locked state is a soft blur veil with one quiet gold serif line; content stays visible so the library sells itself. */
export interface CircleCardProps {
  title: string;
  description: string;
  /** Members-only veil. */
  locked?: boolean;
  /** Veil caption. Default "opens with toUnknown+". */
  lockedLabel?: string;
  /** Renders a quiet "join" link in the veil. */
  onJoin?: () => void;
  style?: React.CSSProperties;
}
export declare function CircleCard(props: CircleCardProps): JSX.Element;
