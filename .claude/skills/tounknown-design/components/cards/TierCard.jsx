import React from "react";
import { Chip } from "../core/Chip.jsx";
/* Membership/tier card. hot = gold border + glow (the featured tier). Bullets use gold · markers. */
export function TierCard({ chip, chipTone = "neutral", title, price, priceNote, bullets = [], hot = false, children, style }) {
  return <div style={{
    borderRadius: 24, border: hot ? "0.5px solid rgba(168,120,31,0.45)" : "0.5px solid var(--hairline)",
    background: "rgba(255,255,255,0.62)", backdropFilter: "blur(20px) saturate(1.5)", WebkitBackdropFilter: "blur(20px) saturate(1.5)", padding: 20, position: "relative",
    boxShadow: hot ? "var(--shadow-gold)" : "var(--shadow-card)", fontFamily: "var(--font-sans)", ...style }}>
    {chip && <Chip tone={chipTone}>{chip}</Chip>}
    {title && <h3 style={{ margin: "10px 0 0", fontSize: 17, fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "0.2px", color: "var(--text-body)" }}>{title}</h3>}
    {price && <div style={{ fontSize: 25, fontWeight: 600, letterSpacing: "-0.4px", margin: "8px 0 2px", color: "var(--text-body)" }}>
      {price}{priceNote && <small style={{ fontSize: 14, color: "var(--text-tertiary)", fontWeight: 500 }}> {priceNote}</small>}
    </div>}
    {bullets.length > 0 && <ul style={{ listStyle: "none", margin: "14px 0 18px", padding: 0 }}>
      {bullets.map((b, i) => <li key={i} style={{ padding: "4.5px 0", color: "var(--text-secondary)", fontSize: 12.5, lineHeight: 1.5, display: "flex", gap: 10 }}>
        <span style={{ color: "var(--gold-deep)", fontWeight: 700 }}>·</span>{b}</li>)}
    </ul>}
    {children}
  </div>;
}
