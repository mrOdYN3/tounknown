import React from "react";
/* "Give more if it feels true" slider — base is the minimum; only raises, never pressures. */
export function GiveSlider({ min = 11, max = 33, step = 1, value, onChange, period = "/mo", style }) {
  const [v, setV] = React.useState(value ?? min);
  const set = x => { setV(x); onChange && onChange(x); };
  return <div style={{ fontFamily: "var(--font-sans)", ...style }}>
    <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
      color: "var(--text-tertiary)", marginBottom: 8 }}>give more, if it feels true</div>
    <input type="range" min={min} max={max} step={step} value={v} onChange={e => set(+e.target.value)}
      aria-label="Amount — give more if it feels true"
      style={{ width: "100%", accentColor: "var(--gold-deep)", height: 44 }} />
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-tertiary)" }}>
      <span>$<b style={{ color: "var(--gold-deep)", fontSize: 15 }}>{v}</b>{period}</span>
      <span style={{ fontFamily: "var(--font-serif)" }}>if it feels true</span>
    </div>
  </div>;
}
