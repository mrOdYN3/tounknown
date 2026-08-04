import React from "react";
/* Fixed bottom tab bar — 5 tabs, SF Symbols-style stroke icons, gold active, optional member dot. */
const ICONS = {
  home: <><path d="M4 11.5 12 4l8 7.5"/><path d="M6.5 10v9h11v-9"/></>,
  path: <><path d="M6 20c0-7 12-4 12-13"/><circle cx="18" cy="5" r="1.8"/><circle cx="6" cy="20" r="1.8"/></>,
  sangha: <><circle cx="8.5" cy="9" r="2.6"/><circle cx="15.5" cy="9" r="2.6"/><path d="M3.5 19c.8-3.2 2.7-4.8 5-4.8s4.2 1.6 5 4.8M12.6 14.6c.9-.3 1.9-.4 2.9-.4 2.3 0 4.2 1.6 5 4.8"/></>,
  dana: <path d="M12 3.5c2.5 3.2 6.5 4 6.5 8.4 0 3.9-2.9 6.6-6.5 6.6s-6.5-2.7-6.5-6.6c0-4.4 4-5.2 6.5-8.4Z"/>,
  profile: <><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.8 3.9-5.6 7.2-5.6s6 1.8 7.2 5.6"/></>,
};
export function TabBar({ tabs, active, onChange, fixed = true, style }) {
  const items = tabs ?? [
    { id: "home", label: "Home", icon: "home" },
    { id: "paths", label: "Mārga", icon: "path" },
    { id: "community", label: "Sangha", icon: "sangha" },
    { id: "membership", label: "Dāna", icon: "dana" },
    { id: "profile", label: "Sādhana", icon: "profile" },
  ];
  return <nav aria-label="Main" style={{
    position: fixed ? "fixed" : "relative", bottom: 0, left: fixed ? "50%" : undefined,
    transform: fixed ? "translateX(-50%)" : undefined, width: "100%", maxWidth: 430, zIndex: 40,
    display: "flex", background: "rgba(251,250,247,0.82)", backdropFilter: "var(--blur-tabbar)", WebkitBackdropFilter: "var(--blur-tabbar)",
    borderTop: "0.5px solid var(--hairline)", padding: "8px 6px 10px", fontFamily: "var(--font-sans)", ...style }}>
    {items.map(t => {
      const on = t.id === active;
      return <button key={t.id} aria-label={t.label} onClick={() => onChange && onChange(t.id)} style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none",
        border: 0, cursor: "pointer", color: on ? "var(--gold-deep)" : "var(--text-tertiary)",
        font: "inherit", fontSize: 10.5, fontWeight: 600, padding: "6px 0", minHeight: 48, position: "relative", transition: "color .25s" }}>
        {t.dot && <span style={{ position: "absolute", top: 4, right: "calc(50% - 16px)", width: 6, height: 6, borderRadius: "50%", background: "var(--gold-deep)" }} />}
        <svg viewBox="0 0 24 24" style={{ width: 23, height: 23, stroke: "currentColor", fill: "none", strokeWidth: 1.6,
          strokeLinecap: "round", strokeLinejoin: "round", transition: "transform .3s var(--spring)", transform: on ? "translateY(-1px)" : "none" }}>{ICONS[t.icon] ?? ICONS.home}</svg>
        {t.label}
      </button>;
    })}
  </nav>;
}
