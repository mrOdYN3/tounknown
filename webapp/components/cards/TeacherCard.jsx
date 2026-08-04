import React from "react";
import { Chip } from "../core/Chip.jsx";
/* Teacher card — portrait, Guide chip, gold serif lineage, bio, gold serif paramparā chain. */
export function TeacherCard({ avatar, name, lineage, bio, parampara, style }) {
  return <div style={{ display: "flex", gap: 16, alignItems: "center", background: "rgba(255,255,255,0.62)", backdropFilter: "blur(20px) saturate(1.5)", WebkitBackdropFilter: "blur(20px) saturate(1.5)",
    border: "0.5px solid var(--hairline)", borderRadius: 22, padding: 18, fontFamily: "var(--font-sans)", ...style }}>
    <img src={avatar} alt={`${name}, meditation teacher`} width="72" height="72"
      style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flex: "0 0 auto", background: "#181826" }} />
    <div>
      <b style={{ color: "var(--text-body)" }}>{name}</b>{" "}
      <Chip tone="gold" style={{ fontSize: 10, padding: "2px 8px" }}>Guide</Chip><br />
      <span style={{ fontFamily: "var(--font-serif)",  fontSize: 12.5, color: "var(--gold-deep)" }}>{lineage}</span>
      {bio && <p style={{ margin: "5px 0 0", color: "var(--text-secondary)", fontSize: 13 }}>{bio}</p>}
      {parampara && <p style={{ margin: "8px 0 0", fontFamily: "var(--font-serif)",  fontSize: 12, color: "var(--gold-deep)", lineHeight: 1.7 }}>{parampara.join(" → ")}</p>}
    </div>
  </div>;
}
