/** "Give more if it feels true" slider — base price is the minimum; the slider only raises. Serif caption. */
export interface GiveSliderProps {
  /** Base (minimum) amount. Default 11. */
  min?: number;
  /** Default 33. */
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  /** Suffix after the amount. Default "/mo". */
  period?: string;
  style?: React.CSSProperties;
}
export declare function GiveSlider(props: GiveSliderProps): JSX.Element;
