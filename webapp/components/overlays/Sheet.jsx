import React from "react";
/* Bottom sheet with grabber handle — translucent white blur, 28px top radius, Esc closes. */
export function Sheet({ open, onClose, children, maxWidth = 430, ariaLabel = "Sheet", style }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === "Escape" && onClose) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  return <div role="dialog" aria-modal="true" aria-label={ariaLabel} style={{
    position: "fixed", inset: 0, zIndex: 60, display: open ? "flex" : "none", justifyContent: "center" }}>
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(30,28,20,0.32)",
      backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", opacity: open ? 1 : 0, transition: "opacity .32s" }} />
    <div style={{ position: "absolute", bottom: 0, width: "100%", maxWidth, maxHeight: "92%", overflowY: "auto",
      background: "var(--sheet-blur)", backdropFilter: "var(--blur-sheet)", WebkitBackdropFilter: "var(--blur-sheet)",
      borderRadius: "28px 28px 0 0", border: "0.5px solid var(--hairline)", borderBottom: "none",
      transform: open ? "none" : "translateY(40px)", opacity: open ? 1 : 0, transition: "all .38s var(--spring)",
      padding: "10px 22px 28px", boxShadow: "var(--shadow-sheet)", fontFamily: "var(--font-sans)", ...style }}>
      <div style={{ width: 38, height: 5, borderRadius: 99, background: "rgba(25,24,19,0.18)", margin: "6px auto 18px" }} />
      {children}
    </div>
  </div>;
}
