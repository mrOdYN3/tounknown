import React from "react";
/* Social links row — thin-stroke SVG glyphs, tertiary ink, gold on hover. */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const ICONS = {
  telegram: <svg width="18" height="18" viewBox="0 0 24 24" {...S}><path d="M21.5 4.5 2.9 11.7c-.8.3-.8 1.4.1 1.6l4.7 1.5 1.8 5.6c.2.8 1.2 1 1.8.4l2.6-2.6 4.8 3.5c.7.5 1.7.1 1.9-.8l3-14.6c.2-1-.8-1.8-1.7-1.4Z"/><path d="m7.7 14.8 10.6-8.4"/></svg>,
  instagram: <svg width="18" height="18" viewBox="0 0 24 24" {...S}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.5" fill="currentColor"/></svg>,
  x: <svg width="18" height="18" viewBox="0 0 24 24" {...S}><path d="m4 4 16 16M20 4 4 20"/></svg>,
  youtube: <svg width="18" height="18" viewBox="0 0 24 24" {...S}><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10.5 9.5 4.5 2.5-4.5 2.5Z"/></svg>,
  insight: <svg width="18" height="18" viewBox="0 0 24 24" {...S}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg>,
  patreon: <svg width="18" height="18" viewBox="0 0 24 24" {...S}><circle cx="14.5" cy="9" r="5.5"/><path d="M4.5 3.5v17"/></svg>,
  trustpilot: <svg width="18" height="18" viewBox="0 0 24 24" {...S}><path d="m12 3 2.4 5.8 6.1.4-4.7 4 1.5 6-5.3-3.3L6.7 19.2l1.5-6-4.7-4 6.1-.4Z"/></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" {...S}><rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>,
};
export const SOCIAL_LINKS = [
  { id: "telegram", label: "Telegram", href: "https://t.me/tounknowndotcom" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/tounknowndotcom" },
  { id: "x", label: "X", href: "https://x.com/tounknowndotcom" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com/@tounknowndotcom" },
  { id: "insight", label: "Insight Timer", href: "https://insighttimer.com/dyn" },
  { id: "patreon", label: "Patreon", href: "https://patreon.com/c/tounknowndotcom" },
  { id: "trustpilot", label: "Trustpilot", href: "https://trustpilot.com/review/tounknown.com" },
  { id: "mail", label: "Email", href: "mailto:tounknown.com@gmail.com" },
];
export function SocialLinks({ size = 18, gap = 6, tone = "ink", style }) {
  const color = tone === "light" ? "rgba(255,255,255,0.6)" : "var(--text-tertiary)";
  const hover = tone === "light" ? "#FFFFFF" : "var(--gold-deep)";
  return <nav aria-label="Social links" style={{ display: "flex", gap, justifyContent: "center", flexWrap: "wrap", ...style }}>
    {SOCIAL_LINKS.map(l => <a key={l.id} href={l.href} target="_blank" rel="noreferrer" aria-label={l.label} title={l.label}
      onMouseEnter={e => e.currentTarget.style.color = hover} onMouseLeave={e => e.currentTarget.style.color = color}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", color, transition: "color .25s var(--spring)" }}>
      {React.cloneElement(ICONS[l.id], { width: size, height: size })}
    </a>)}
  </nav>;
}
