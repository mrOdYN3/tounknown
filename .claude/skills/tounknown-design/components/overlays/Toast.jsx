import React from "react";
/* Quiet pill toast — white blur, gold hairline. Position above the tab bar. */
export function Toast({ message, show = true, fixed = false, style }) {
  return <div role="status" aria-live="polite" style={{
    position: fixed ? "fixed" : "relative", bottom: fixed ? 100 : undefined, left: fixed ? "50%" : undefined,
    transform: fixed ? `translateX(-50%) translateY(${show ? 0 : 16}px)` : undefined,
    opacity: show ? 1 : 0, zIndex: 99, background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", color: "var(--text-body)",
    border: "0.5px solid rgba(168,120,31,0.35)", padding: "12px 22px", borderRadius: 999,
    fontSize: 14, fontWeight: 500, transition: "all .38s var(--spring)", pointerEvents: "none",
    boxShadow: "var(--shadow-toast)", maxWidth: "88%", textAlign: "center",
    display: "inline-block", fontFamily: "var(--font-sans)", ...style }}>{message}</div>;
}
