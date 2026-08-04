import React from "react";
/* Sacred quote interlude — a full-width breathing pause between sections, with an ornamental gold rule. */
export function Interlude({ quote, attribution, size = 17, ornament = true, style }) {
  return <div style={{ padding: "52px 28px", textAlign: "center", fontFamily: "var(--font-sans)", ...style }}>
    {ornament && <div aria-hidden="true" style={{ width: 56, height: 1, margin: "0 auto 22px", background: "linear-gradient(90deg,transparent,rgba(168,120,31,0.55),transparent)" }} />}
    <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: size, lineHeight: 1.5, color: "var(--text-body)", textWrap: "pretty" }}>{quote}</p>
    {attribution && <span style={{ display: "block", marginTop: 14, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)" }}>{attribution}</span>}
  </div>;
}
