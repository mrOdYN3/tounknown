import React from "react";
/* Curriculum step row. state: done | next | locked | idle. gate renders ⛩/☸. */
export function StepRow({ title, subtitle, state = "idle", gate = false, lockedNote, action, onAction, style }) {
  const done = state === "done", next = state === "next", locked = state === "locked";
  const ico = gate ? (done ? "☸" : "⛩") : (done ? "✓" : next ? "▶" : "·");
  const icoStyle = done
    ? { background: "rgba(94,138,74,0.12)", borderColor: "rgba(94,138,74,0.35)", color: "var(--sage)" }
    : next
    ? { background: "rgba(217,164,65,0.18)", borderColor: "rgba(168,120,31,0.5)", color: "var(--gold-deep)", animation: "pulseGold 3s ease-in-out infinite" }
    : { background: "var(--surface-2)", borderColor: "var(--hairline)", color: "var(--text-secondary)" };
  return <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0",
    borderBottom: "0.5px solid var(--hairline)", fontFamily: "var(--font-sans)", ...style }}>
    <style>{`@keyframes pulseGold{0%,100%{box-shadow:0 0 0 0 rgba(217,164,65,0.25)}50%{box-shadow:0 0 0 8px rgba(217,164,65,0)}}`}</style>
    <div style={{ width: 36, height: 36, borderRadius: "50%", flex: "0 0 auto", display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 15, borderWidth: "0.5px", borderStyle: "solid", ...icoStyle }}>{ico}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <b style={{ display: "block", fontSize: 13.5, letterSpacing: "-0.1px", color: locked ? "var(--text-tertiary)" : "var(--text-body)" }}>{title}</b>
      {subtitle && <small style={{ color: "var(--text-tertiary)", fontSize: 12 }}>{subtitle}</small>}
      {locked && lockedNote && <div style={{ marginTop: 3, fontFamily: "var(--font-serif)",  fontSize: 12, color: "var(--gold-deep)", opacity: 0.85 }}>☸ {lockedNote}</div>}
    </div>
    {next && action && <button onClick={onAction} style={{ padding: "8px 14px", fontSize: 12.5, flex: "0 0 auto", border: 0, cursor: "pointer",
      font: "inherit", fontWeight: 600, borderRadius: 999, background: "var(--ink)", color: "#FBFAF7", boxShadow: "var(--shadow-btn)", minHeight: 38 }}>{action}</button>}
  </div>;
}
