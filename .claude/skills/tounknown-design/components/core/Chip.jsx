import React from "react";
/* Pill chip. tone: neutral | gold (meaning: membership, seals, dāna) | green (done/positive). onDark for photo scrims. */
export function Chip({ tone = "neutral", onDark = false, children, style }) {
  const tones = onDark ? {
    neutral: { background: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.25)" },
    gold: { background: "rgba(217,164,65,0.25)", color: "#E8B95A", borderColor: "rgba(217,164,65,0.45)" },
    green: { background: "rgba(127,176,105,0.25)", color: "#A9CE97", borderColor: "rgba(127,176,105,0.4)" },
  } : {
    neutral: { background: "var(--surface-2)", color: "var(--text-secondary)", borderColor: "var(--hairline)" },
    gold: { background: "rgba(217,164,65,0.16)", color: "var(--gold-deep)", borderColor: "rgba(168,120,31,0.3)" },
    green: { background: "rgba(94,138,74,0.12)", color: "var(--sage)", borderColor: "rgba(94,138,74,0.28)" },
  };
  return <span style={{
    display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600,
    padding: "4px 10px", borderRadius: 999, borderWidth: "0.5px", borderStyle: "solid",
    fontFamily: "var(--font-sans)", ...tones[tone], ...style }}>{children}</span>;
}
