import React from "react";
/* toUnknown button. Variants: gold (primary — ink pill, white text), ghost (translucent white), quiet (text-only). */
export function Button({ variant = "gold", wide = false, children, style, ...rest }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    border: 0, cursor: "pointer", font: "inherit", fontWeight: 600, fontSize: "14px",
    padding: "12px 20px", borderRadius: 999, minHeight: 44, userSelect: "none",
    textDecoration: "none", color: "inherit", fontFamily: "var(--font-sans)",
    transition: "transform .28s var(--spring), background .2s",
    width: wide ? "100%" : undefined,
  };
  const variants = {
    gold: { background: "var(--ink)", color: "#FBFAF7", boxShadow: "var(--shadow-btn)" },
    ghost: { background: "rgba(255,255,255,0.72)", backdropFilter: "blur(10px)", border: "0.5px solid var(--hairline)", color: "var(--ink)", boxShadow: "0 2px 10px rgba(60,50,20,0.06)" },
    quiet: { background: "transparent", color: "var(--text-secondary)", fontWeight: 500, boxShadow: "none" },
  };
  return <button
    style={{ ...base, ...variants[variant], ...style }}
    onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
    onMouseUp={e => { e.currentTarget.style.transform = ""; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
    {...rest}>{children}</button>;
}
