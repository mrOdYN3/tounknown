import React from "react";
/* Sangha circle card. locked shows a blurred veil with a gold serif join line — content stays visible beneath. */
export function CircleCard({ title, description, locked = false, lockedLabel = "opens with toUnknown+", onJoin, style }) {
  return <div style={{ borderRadius: 20, border: "0.5px solid var(--hairline)", background: "rgba(255,255,255,0.62)", backdropFilter: "blur(20px) saturate(1.5)", WebkitBackdropFilter: "blur(20px) saturate(1.5)", padding: 16, position: "relative", overflow: "hidden", fontFamily: "var(--font-sans)", ...style }}>
    <b style={{ color: "var(--text-body)" }}>{title}</b>
    <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: 13.5 }}>{description}</p>
    {locked && <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)",
      background: "rgba(251,250,247,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
      <span style={{ fontFamily: "var(--font-serif)",  fontSize: 13.5, color: "var(--gold-deep)" }}>
        {lockedLabel}{onJoin && <> · <a href="#" onClick={e => { e.preventDefault(); onJoin(); }} style={{ color: "var(--gold-deep)" }}>join</a></>}
      </span>
    </div>}
  </div>;
}
