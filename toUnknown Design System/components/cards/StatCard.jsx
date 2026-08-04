import React from "react";
/* Profile stat tile — big number over an 11px uppercase label. */
export function StatCard({ value, label, style }) {
  return <div style={{ background: "rgba(255,255,255,0.62)", backdropFilter: "blur(20px) saturate(1.5)", WebkitBackdropFilter: "blur(20px) saturate(1.5)", border: "0.5px solid var(--hairline)", borderRadius: 18,
    padding: "14px 10px", textAlign: "center", fontFamily: "var(--font-sans)", ...style }}>
    <b style={{ display: "block", fontSize: 21, fontWeight: 600, letterSpacing: "-0.5px", color: "var(--text-body)" }}>{value}</b>
    <span style={{ fontSize: 9.5, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{label}</span>
  </div>;
}
