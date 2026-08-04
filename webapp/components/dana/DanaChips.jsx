import React from "react";
/* Dāna amount chips — $5 · $11 · $22 · $54 · Custom; gold selected state, only raises, never pressures. */
export function DanaChips({ amounts = [5, 11, 22, 54], custom = true, selected, onSelect, style }) {
  const [sel, setSel] = React.useState(selected ?? amounts[1]);
  const pick = v => { setSel(v); onSelect && onSelect(v); };
  const chip = (v, label) => {
    const on = sel === v;
    return <button key={String(v)} aria-pressed={on} onClick={() => pick(v)} style={{
      padding: "11px 18px", borderRadius: 999, cursor: "pointer", font: "inherit", fontWeight: 700, fontSize: 15,
      minHeight: 44, transition: "all .25s var(--spring)",
      background: on ? "rgba(217,164,65,0.18)" : "var(--surface-2)",
      border: on ? "0.5px solid var(--gold-deep)" : "0.5px solid var(--hairline)",
      color: on ? "var(--gold-deep)" : "var(--text-secondary)", transform: on ? "scale(1.05)" : "none" }}>{label}</button>;
  };
  return <div role="group" aria-label="Donation amounts" style={{ display: "flex", gap: 10, justifyContent: "center",
    fontFamily: "var(--font-sans)", flexWrap: "wrap", ...style }}>
    {amounts.map(a => chip(a, `$${a}`))}
    {custom && chip("custom", "Custom")}
  </div>;
}
