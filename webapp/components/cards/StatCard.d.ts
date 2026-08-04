/** Profile stat tile (minutes sat / tracks completed / gates passed) — used in a 3-column grid. */
export interface StatCardProps {
  value: React.ReactNode;
  label: string;
  style?: React.CSSProperties;
}
export declare function StatCard(props: StatCardProps): JSX.Element;
