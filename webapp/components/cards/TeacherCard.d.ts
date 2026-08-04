/** Ācārya (teacher) card — portrait, gold serif lineage line, and the paramparā chain in gold serif. */
export interface TeacherCardProps {
  /** Portrait URL. */
  avatar: string;
  name: string;
  /** e.g. "Vipassana · S.N. Goenka & Pa-Auk traditions". */
  lineage: string;
  bio?: string;
  /** The unbroken chain, e.g. ["Gautama Buddha","Ledi Sayadaw",…,"DYNN"] — joined with " → ". */
  parampara?: string[];
  style?: React.CSSProperties;
}
export declare function TeacherCard(props: TeacherCardProps): JSX.Element;
