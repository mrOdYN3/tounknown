import React from "react";
import { Chip } from "../core/Chip.jsx";
/* Path/course card — photo with dark base scrim, gold serif lineage line, white text.
   layout: "list" (full-width, min 200px) or "row" (240px snap-scroll hcard). */
export function PathCard({ image, lineage, title, essence, progress, meta, layout = "list", onClick, style }) {
  const isRow = layout === "row";
  return <div role="button" tabIndex={0} onClick={onClick}
    onKeyDown={e => { if (e.key === "Enter" && onClick) onClick(e); }}
    style={{
      position: "relative", borderRadius: isRow ? 22 : 24, overflow: "hidden", cursor: "pointer",
      border: "0.5px solid var(--hairline)", boxShadow: "var(--shadow-photo)",
      minHeight: isRow ? 300 : 200, flex: isRow ? "0 0 240px" : undefined, scrollSnapAlign: isRow ? "start" : undefined,
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      transition: "transform .3s var(--spring)", fontFamily: "var(--font-sans)", ...style }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${image}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#181826" }} />
    <div style={{ position: "absolute", inset: 0, background: "var(--scrim-photo)" }} />
    <div style={{ position: "relative", padding: 16, color: "#F5F4F0" }}>
      {lineage && <span style={{ fontFamily: "var(--font-serif)",  fontSize: 12.5, color: "var(--gold-bright)" }}>{lineage}</span>}
      <h3 style={{ margin: "6px 0 3px", fontSize: 17, fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "0.2px" }}>{title}</h3>
      {essence && <p style={{ margin: 0, fontSize: 12.5, color: "rgba(255,255,255,0.75)" }}>{essence}</p>}
      {(progress != null || meta) && <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
        {progress != null && <div style={{ width: 30, height: 30, borderRadius: "50%", position: "relative", flex: "0 0 auto",
          background: `conic-gradient(var(--gold-bright) ${progress}%, rgba(255,255,255,0.25) 0)` }}>
          <div style={{ position: "absolute", inset: 2.5, borderRadius: "50%", background: "rgba(25,24,19,0.75)" }} />
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{progress}%</span>
        </div>}
        {meta && meta.map((m, i) => <Chip key={i} onDark tone={m.gold ? "gold" : "neutral"}>{m.label ?? m}</Chip>)}
      </div>}
    </div>
  </div>;
}
