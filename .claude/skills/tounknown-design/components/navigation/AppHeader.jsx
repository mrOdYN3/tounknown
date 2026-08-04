import React from "react";
import { Orb } from "../core/Orb.jsx";
/* Sticky blurred app header — logo mark + name left, compact title fades in when scrolled. */
export function AppHeader({ title = "", scrolled = false, logo, brand = "toUnknown", style }) {
  return <header style={{ position: "sticky", top: 0, zIndex: 20, display: "flex", alignItems: "center",
    justifyContent: "space-between", padding: "12px 20px",
    background: "var(--surface-blur)", backdropFilter: "var(--blur-header)", WebkitBackdropFilter: "var(--blur-header)",
    borderBottom: scrolled ? "0.5px solid var(--hairline)" : "0.5px solid transparent",
    transition: "border-color .3s", fontFamily: "var(--font-sans)", ...style }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 15, color: "var(--text-body)" }}>
      {logo ? <img src={logo} alt={`${brand} logo`} style={{ height: 28, width: "auto", borderRadius: 7 }} /> : <Orb size={26} glow={false} />}
      {brand}
    </div>
    <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.2px", color: "var(--text-body)",
      opacity: scrolled ? 1 : 0, transform: scrolled ? "none" : "translateY(4px)", transition: "all .3s var(--spring)" }}>{title}</div>
    <div style={{ width: 26 }} />
  </header>;
}
