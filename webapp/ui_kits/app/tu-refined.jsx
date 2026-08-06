/* toUnknown — refined component layer.
   Drop-in replacements for the design-system primitives, rebuilt with liquid-glass
   materials, optical type and spring motion. Mutates the DS namespace, so every
   screen picks these up without changing a single import. Loads before the screens. */
(function () {
const DS = window.ToUnknownDesignSystem_9d38c1;
const Icon = window.TUIcon;

/* ---------------------------------------------------------------- Button -- */
function Button({ variant = "gold", wide = false, children, style, ...rest }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    font: "600 14px/1 var(--font-sans)", letterSpacing: "-0.01em",
    padding: "0 20px", minHeight: 46, borderRadius: "var(--r-full)",
    width: wide ? "100%" : undefined, cursor: "pointer", border: 0,
    WebkitTapHighlightColor: "transparent", position: "relative", isolation: "isolate",
  };
  const skins = {
    // primary — ink pill with a specular top edge, the way light sits on glass
    gold: {
      background: "linear-gradient(180deg, #2A2823 0%, var(--ink) 62%)",
      color: "#FBFAF7",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 1px 2px rgba(25,24,19,.18), 0 10px 26px -10px rgba(25,24,19,.5)",
    },
    ghost: {
      background: "var(--glass-thick)",
      WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)",
      color: "var(--ink)",
      border: "0.5px solid rgba(24,22,16,0.10)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), var(--lift-1)",
    },
    quiet: { background: "transparent", color: "var(--text-secondary)", minHeight: 40, fontWeight: 500 },
    seal: {
      background: "linear-gradient(180deg, var(--gold-bright) 0%, var(--gold-deep) 100%)",
      color: "#fff",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.34), var(--lift-gold)",
    },
  };
  return <button className="tu-press" style={{ ...base, ...(skins[variant] || skins.gold), ...style }} {...rest}>{children}</button>;
}

/* ------------------------------------------------------------------ Chip -- */
function Chip({ tone = "neutral", onDark = false, children, style }) {
  const tones = {
    gold:    { background: "rgba(217,164,65,0.16)", color: "var(--gold-deep)", border: "0.5px solid rgba(168,120,31,0.30)" },
    green:   { background: "rgba(94,138,74,0.14)",  color: "var(--sage)",      border: "0.5px solid rgba(94,138,74,0.28)" },
    neutral: { background: "rgba(25,24,19,0.055)",  color: "var(--text-secondary)", border: "0.5px solid rgba(24,22,16,0.08)" },
  };
  const dark = { background: "rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.94)", border: "0.5px solid rgba(255,255,255,0.24)",
    WebkitBackdropFilter: "blur(10px)", backdropFilter: "blur(10px)" };
  return <span style={{
    display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 11px",
    borderRadius: "var(--r-full)", font: "600 11px/1.4 var(--font-sans)", letterSpacing: "0.01em",
    whiteSpace: "nowrap", ...(onDark ? dark : tones[tone] || tones.neutral), ...style }}>{children}</span>;
}

/* ------------------------------------------------------------------- Orb -- */
function Orb({ size = 56, still = false, glow = true, style }) {
  return <div style={{ position: "relative", width: size, height: size, ...style }}>
    {glow && !still && [0, 1].map((i) => (
      <span key={i} aria-hidden="true" style={{
        position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(217,164,65,0.5)",
        animation: `tu-halo 6s var(--ease-spring) infinite`, animationDelay: `${i * 3}s` }} />
    ))}
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "radial-gradient(circle at 32% 28%, #F0CE87 0%, var(--gold-bright) 42%, var(--gold-deep) 100%)",
      boxShadow: glow ? "inset 0 2px 6px rgba(255,255,255,0.6), 0 0 46px rgba(217,164,65,0.42)" : "none",
      animation: still ? "none" : "tu-breathe 6s ease-in-out infinite" }} />
  </div>;
}

/* -------------------------------------------------------------- Interlude -- */
function Interlude({ quote, attribution, size = 17, ornament = true, style }) {
  return <section style={{ padding: "42px 26px", textAlign: "center", ...style }}>
    {ornament && <div aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
      <span style={{ height: 0.5, width: 34, background: "linear-gradient(90deg, transparent, rgba(168,120,31,0.5))" }} />
      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold-deep)", opacity: 0.7 }} />
      <span style={{ height: 0.5, width: 34, background: "linear-gradient(90deg, rgba(168,120,31,0.5), transparent)" }} />
    </div>}
    <p className="tu-display" style={{ margin: 0, fontSize: size + 1, color: "var(--ink)", textWrap: "balance", lineHeight: 1.42 }}>{quote}</p>
    {attribution && <p className="tu-eyebrow" style={{ margin: "14px 0 0", opacity: 0.85 }}>{attribution}</p>}
  </section>;
}

/* ---------------------------------------------------------------- Ring ---- */
function Ring({ value = 0, size = 40, stroke = 2.5 }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return <svg width={size} height={size} style={{ display: "block", transform: "rotate(-90deg)" }} aria-hidden="true">
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={stroke} />
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--gold-bright)" strokeWidth={stroke}
      strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (c * Math.min(100, value)) / 100}
      style={{ transition: "stroke-dashoffset 900ms var(--ease-spring)" }} />
  </svg>;
}

/* -------------------------------------------------------------- PathCard -- */
function PathCard({ image, lineage, title, essence, progress, meta, layout = "list", onClick, style, imagePos, frost = true }) {
  const row = layout === "row";
  // Cover art fills the card. Square covers are composed top-down — the deity, the face,
  // the title — so anchoring to the top keeps the subject and crops only empty ground.
  const fit = "cover";
  const boxRef = React.useRef(null);
  return <article className="tu-lift tu-press" onClick={onClick} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined}
    onKeyDown={(e) => { if (onClick && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onClick(); } }}
    style={{
      position: "relative", overflow: "hidden", cursor: onClick ? "pointer" : "default",
      borderRadius: "var(--r-lg)", minHeight: row ? 280 : 250,
      width: row ? 232 : "auto", flex: row ? "0 0 auto" : undefined, scrollSnapAlign: row ? "start" : undefined,
      background: "#15140F", boxShadow: "var(--lift-2)", isolation: "isolate", ...style }} ref={boxRef}>
    {image && <img src={image} alt="" aria-hidden="true" loading="lazy" style={{
      position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
      // most covers are composed top-down, but a card built for its own frame can say otherwise
      objectPosition: imagePos || "center top", transform: "scale(1.02)",
      transition: "transform 1.1s var(--ease-spring)" }} />}
    {/* Two-part scrim. A tonal wash for mood, then a frosted base so the card's own
        words stay legible even over cover art that already carries typography. */}
    <div aria-hidden="true" style={{ position: "absolute", inset: 0,
      background: "linear-gradient(180deg, rgba(12,11,8,0.06) 0%, rgba(12,11,8,0.28) 38%, rgba(12,11,8,0.72) 100%)" }} />
    {/* The frosted base keeps the card's words legible over busy art — but it blurs whatever
        is behind it. A card whose subject sits in that zone asks for frost={false}, and gets
        a deeper tonal gradient instead so the type still reads. */}
    {!frost && <div aria-hidden="true" style={{ position: "absolute", inset: 0,
      background: "linear-gradient(100deg, rgba(12,11,8,0.88) 0%, rgba(12,11,8,0.66) 42%, rgba(12,11,8,0.08) 78%)" }} />}
    {frost && <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "68%",
      borderRadius: "0 0 var(--r-lg) var(--r-lg)",
      WebkitBackdropFilter: "blur(16px) saturate(120%)", backdropFilter: "blur(16px) saturate(120%)",
      background: "linear-gradient(180deg, transparent 0%, rgba(12,11,8,0.30) 46%, rgba(12,11,8,0.62) 100%)",
      WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 44%)",
      maskImage: "linear-gradient(180deg, transparent 0%, #000 44%)" }} />}
    {typeof progress === "number" && progress > 0 && (
      <div style={{ position: "absolute", top: 14, right: 14, display: "grid", placeItems: "center" }}>
        <Ring value={progress} />
        <span className="tu-num" style={{ position: "absolute", font: "600 10px/1 var(--font-sans)", color: "#fff" }}>{progress}%</span>
      </div>
    )}
    <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column",
      justifyContent: "flex-end", padding: row ? "18px 16px" : "20px", minHeight: row ? 280 : 250 }}>
      {lineage && <p style={{ margin: "0 0 6px", font: "400 11.5px/1.45 var(--font-serif)", color: "rgba(240,206,135,0.94)" }}>{lineage}</p>}
      <h3 className="tu-display" style={{ margin: 0, fontSize: row ? 19 : 21, color: "#fff", textShadow: "0 1px 20px rgba(0,0,0,0.34)" }}>{title}</h3>
      {essence && <p style={{ margin: "6px 0 0", font: "400 13px/1.5 var(--font-sans)", color: "rgba(255,255,255,0.80)" }}>{essence}</p>}
      {meta && meta.length > 0 && <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
        {meta.map((m, i) => <Chip key={i} onDark tone={m.gold ? "gold" : "neutral"}>{m.label}</Chip>)}
      </div>}
    </div>
  </article>;
}

/* -------------------------------------------------------------- StatCard -- */
function StatCard({ value, label, style }) {
  return <div className="tu-glass" style={{ borderRadius: "var(--r-md)", padding: "16px 12px", textAlign: "center", ...style }}>
    <div className="tu-num" style={{ font: "600 24px/1 var(--font-sans)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{value}</div>
    <div className="tu-eyebrow" style={{ marginTop: 7, color: "var(--text-tertiary)" }}>{label}</div>
  </div>;
}

/* -------------------------------------------------------------- TierCard -- */
function TierCard({ chip, chipTone = "neutral", title, price, priceNote, bullets = [], hot = false, children, style, details }) {
  // A tier should be able to say exactly what it is, without the card becoming an essay.
  const [open, setOpen] = React.useState(false);
  return <section className={hot ? "tu-gold-seal" : "tu-glass"} style={{ borderRadius: "var(--r-lg)", padding: 22, position: "relative", overflow: "hidden", ...style }}>
    {hot && <div aria-hidden="true" style={{ position: "absolute", top: -60, right: -40, width: 180, height: 180,
      background: "radial-gradient(circle, rgba(217,164,65,0.20), transparent 68%)", pointerEvents: "none" }} />}
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {chip && <Chip tone={hot ? "gold" : chipTone}>{chip}</Chip>}
      {details && <button onClick={() => setOpen(!open)} aria-expanded={open}
        aria-label={open ? "Hide what is included" : "What is included"} className="tu-press"
        style={{ width: 22, height: 22, borderRadius: "50%", cursor: "pointer", flex: "0 0 auto",
          display: "grid", placeItems: "center", font: "600 12px/1 var(--font-sans)",
          background: open ? "rgba(217,164,65,0.22)" : "rgba(25,24,19,0.06)",
          color: open ? "var(--gold-deep)" : "var(--text-tertiary)",
          border: "0.5px solid " + (open ? "rgba(168,120,31,0.4)" : "rgba(24,22,16,0.10)"),
          transition: "background-color .25s, color .25s" }}>?</button>}
    </div>
    {title && <h3 className="tu-display" style={{ margin: chip ? "12px 0 0" : 0, fontSize: 19, color: "var(--ink)" }}>{title}</h3>}
    {price && <div style={{ display: "flex", alignItems: "baseline", gap: 7, margin: "10px 0 0" }}>
      <span className="tu-num" style={{ font: "600 30px/1 var(--font-sans)", letterSpacing: "-0.03em", color: "var(--ink)" }}>{price}</span>
      {priceNote && <span style={{ font: "400 13px/1 var(--font-sans)", color: "var(--text-tertiary)" }}>{priceNote}</span>}
    </div>}
    {bullets.length > 0 && <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
      {bullets.map((b, i) => <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", font: "400 13.5px/1.5 var(--font-sans)", color: "var(--text-secondary)" }}>
        <span style={{ color: "var(--gold-deep)", marginTop: 1, flex: "0 0 auto" }}><Icon name="check" size={14} stroke={2} /></span>{b}
      </li>)}
    </ul>}
    {/* What is included, opened by the ? beside the tier name. */}
    {details && open && <div style={{ margin: "16px 0 0", padding: "14px 16px",
      borderRadius: 16, background: "rgba(25,24,19,0.035)", border: "0.5px solid var(--hairline)" }}>
      {details.map((d, i) => (
        <div key={i} style={{ marginBottom: i === details.length - 1 ? 0 : 12 }}>
          <b style={{ display: "block", font: "600 12.5px/1.4 var(--font-sans)", color: "var(--ink)" }}>{d.t}</b>
          <span style={{ font: "400 12.5px/1.6 var(--font-sans)", color: "var(--text-secondary)" }}>{d.d}</span>
        </div>))}
    </div>}
    {children && <div style={{ marginTop: 18 }}>{children}</div>}
  </section>;
}

/* --------------------------------------------------------------- StepRow -- */
function StepRow({ title, subtitle, state = "idle", gate = false, lockedNote, action, onAction, style }) {
  // "open" is for spoken tracks — introductions and talks. They are listened to, not sat,
  // so they are never locked and never gate what follows.
  const done = state === "done", next = state === "next",
        locked = state === "locked", open = state === "open";
  const skin = done
    ? { background: "rgba(94,138,74,0.12)", borderColor: "rgba(94,138,74,0.34)", color: "var(--sage)" }
    : next
    ? { background: "rgba(217,164,65,0.18)", borderColor: "rgba(168,120,31,0.5)", color: "var(--gold-deep)" }
    : open
    ? { background: "rgba(25,24,19,0.05)", borderColor: "rgba(24,22,16,0.12)", color: "var(--text-secondary)" }
    : { background: "rgba(25,24,19,0.035)", borderColor: "rgba(24,22,16,0.08)", color: "var(--text-tertiary)" };
  const glyph = gate ? "gate" : done ? "check" : next ? "play" : open ? "headphones" : "lock";
  return <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0",
    borderBottom: "0.5px solid var(--hairline)", fontFamily: "var(--font-sans)", ...style }}>
    <div style={{ width: 38, height: 38, borderRadius: "50%", flex: "0 0 auto", display: "grid", placeItems: "center",
      borderWidth: "0.5px", borderStyle: "solid", position: "relative", ...skin }}>
      <Icon name={glyph} size={16} stroke={1.7} />
      {next && <span aria-hidden="true" style={{ position: "absolute", inset: -1, borderRadius: "50%",
        border: "1px solid rgba(217,164,65,0.55)", animation: "tu-halo 3.2s var(--ease-spring) infinite" }} />}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <b style={{ display: "block", font: "600 13.5px/1.4 var(--font-sans)", letterSpacing: "-0.01em",
        color: locked ? "var(--text-tertiary)" : "var(--text-body)" }}>{title}</b>
      {subtitle && <small style={{ color: "var(--text-tertiary)", fontSize: 12 }}>{subtitle}</small>}
      {locked && lockedNote && <div style={{ marginTop: 4, font: "400 11.5px/1.45 var(--font-serif)", color: "var(--gold-deep)", opacity: 0.9 }}>☸ {lockedNote}</div>}
    </div>
    {(next || open) && action && <Button variant={open ? "ghost" : "gold"} onClick={onAction}
      style={{ minHeight: 38, padding: "0 16px", fontSize: 12.5 }}>{action}</Button>}
  </div>;
}

/* ---------------------------------------------------------------- Sheet ---- */
function Sheet({ open, onClose, children, maxWidth = 440, ariaLabel = "Sheet", style }) {
  React.useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === "Escape" && onClose && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    addEventListener("keydown", k);
    return () => { removeEventListener("keydown", k); document.body.style.overflow = prev; };
  }, [open, onClose]);
  if (!open) return null;
  return <div role="dialog" aria-modal="true" aria-label={ariaLabel} style={{ position: "fixed", inset: 0, zIndex: 90 }}>
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(20,18,12,0.30)",
      WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)", animation: "tu-fade .32s var(--ease-out)" }} />
    <div style={{
      position: "absolute", left: "50%", bottom: 0,
      width: "100%", maxWidth, maxHeight: "92dvh", overflowY: "auto", overscrollBehavior: "contain",
      borderRadius: "var(--r-xl) var(--r-xl) 0 0", padding: "10px 20px calc(30px + env(safe-area-inset-bottom))",
      background: "var(--glass-thick)",
      WebkitBackdropFilter: "var(--glass-blur-deep)", backdropFilter: "var(--glass-blur-deep)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.94), var(--shadow-sheet)",
      transform: "translate(-50%,0)",
      animation: "tu-sheet-in .46s var(--ease-spring)", ...style }}>
      <div aria-hidden="true" style={{ width: 38, height: 4.5, borderRadius: 99, background: "rgba(25,24,19,0.16)", margin: "0 auto 16px" }} />
    {children}
    </div>
  </div>;
}

/* ------------------------------------------------------------- AppHeader -- */
function AppHeader({ title = "", scrolled = false, logo, brand = "toUnknown", style }) {
  return <header style={{
    position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", gap: 10,
    padding: "13px 20px", minHeight: 56,
    background: scrolled ? "rgba(251,250,247,0.72)" : "transparent",
    WebkitBackdropFilter: scrolled ? "var(--glass-blur)" : "none", backdropFilter: scrolled ? "var(--glass-blur)" : "none",
    borderBottom: scrolled ? "0.5px solid rgba(24,22,16,0.07)" : "0.5px solid transparent",
    boxShadow: scrolled ? "inset 0 1px 0 rgba(255,255,255,0.8)" : "none",
    transition: "background .4s var(--ease-out), border-color .4s var(--ease-out), backdrop-filter .4s var(--ease-out)",
    fontFamily: "var(--font-sans)", ...style }}>
    {logo && <img src={logo} alt="" width="24" height="24" style={{ width: 24, height: 24, objectFit: "contain" }} />}
    <b style={{ font: "600 16px/1 var(--font-sans)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{brand}</b>
    <span aria-live="polite" style={{
      marginLeft: "auto", font: "400 13px/1 var(--font-serif)", color: "var(--text-tertiary)",
      opacity: scrolled ? 1 : 0, transform: scrolled ? "none" : "translateY(-4px)",
      transition: "opacity .36s var(--ease-out), transform .36s var(--ease-spring)" }}>{title}</span>
  </header>;
}

/* ---------------------------------------------------------------- TabBar -- */
function TabBar({ tabs, active, onChange, fixed = true, style }) {
  const items = tabs ?? [
    { id: "home", label: "Home", icon: "home" },
    { id: "paths", label: "Mārga", icon: "marga" },
    { id: "community", label: "Sangha", icon: "sangha" },
    { id: "membership", label: "Dāna", icon: "dana" },
    { id: "profile", label: "Sādhana", icon: "sadhana" },
  ];
  return <nav aria-label="Main" style={{
    position: fixed ? "fixed" : "relative", bottom: fixed ? "calc(14px + env(safe-area-inset-bottom))" : undefined,
    left: fixed ? "50%" : undefined, transform: fixed ? "translateX(-50%)" : undefined,
    width: "calc(100% - 28px)", maxWidth: 412, zIndex: 60,
    display: "flex", gap: 2, padding: 6, borderRadius: "var(--r-full)",
    background: "rgba(251,250,247,0.74)",
    WebkitBackdropFilter: "var(--glass-blur-deep)", backdropFilter: "var(--glass-blur-deep)",
    border: "0.5px solid rgba(24,22,16,0.08)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), var(--lift-3)",
    fontFamily: "var(--font-sans)", ...style }}>
    {items.map((t) => {
      const on = t.id === active;
      return <button key={t.id} aria-label={t.label} aria-current={on ? "page" : undefined}
        onClick={() => onChange && onChange(t.id)} style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          border: 0, cursor: "pointer", font: "600 9.5px/1.2 var(--font-sans)", letterSpacing: "0.01em",
          padding: "8px 0 7px", minHeight: 46, borderRadius: "var(--r-full)", position: "relative",
          WebkitTapHighlightColor: "transparent",
          color: on ? "var(--gold-deep)" : "var(--text-tertiary)",
          background: on ? "rgba(217,164,65,0.13)" : "transparent",
          transition: "color .3s var(--ease-out), background-color .42s var(--ease-spring)" }}>
        <span style={{ transform: on ? "translateY(-1px) scale(1.06)" : "none",
          transition: "transform .42s var(--ease-spring)" }}>
          <Icon name={t.icon} size={21} stroke={on ? 1.8 : 1.5} />
        </span>
        {t.label}
      </button>;
    })}
  </nav>;
}

/* ----------------------------------------------------------- TeacherCard -- */
function TeacherCard({ avatar, name, lineage, bio, parampara, style }) {
  return <section className="tu-glass" style={{ display: "flex", gap: 16, alignItems: "center", borderRadius: "var(--r-lg)", padding: 18, ...style }}>
    <img src={avatar} alt={name} width="70" height="70" style={{ width: 70, height: 70, borderRadius: "50%",
      objectFit: "cover", objectPosition: "top", flex: "0 0 auto", background: "#181826",
      boxShadow: "0 0 0 0.5px rgba(24,22,16,0.10), var(--lift-1)" }} />
    <div style={{ minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
        <b style={{ font: "600 15px/1.2 var(--font-sans)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{name}</b>
        <Chip tone="gold">Guide</Chip>
      </div>
      <p style={{ margin: "3px 0 0", font: "400 12.5px/1.5 var(--font-serif)", color: "var(--gold-deep)" }}>{lineage}</p>
      {bio && <p style={{ margin: "6px 0 0", font: "400 13px/1.5 var(--font-sans)", color: "var(--text-secondary)" }}>{bio}</p>}
    </div>
  </section>;
}

/* ------------------------------------------------------------ CircleCard -- */
function CircleCard({ title, description, locked = false, lockedLabel = "opens with toUnknown+", onJoin, style }) {
  return <section className="tu-glass" style={{ display: "flex", alignItems: "center", gap: 14, borderRadius: "var(--r-md)", padding: 16, ...style }}>
    <div style={{ width: 40, height: 40, borderRadius: "50%", flex: "0 0 auto", display: "grid", placeItems: "center",
      background: "rgba(25,24,19,0.045)", border: "0.5px solid rgba(24,22,16,0.08)", color: "var(--text-tertiary)" }}>
      <Icon name={locked ? "lock" : "sangha"} size={17} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <b style={{ display: "block", font: "600 14px/1.35 var(--font-sans)", color: "var(--ink)" }}>{title}</b>
      {description && <small style={{ color: "var(--text-tertiary)", fontSize: 12.5 }}>{description}</small>}
    </div>
    {locked
      ? <button onClick={onJoin} className="tu-press" style={{ font: "400 11.5px/1.3 var(--font-serif)", color: "var(--gold-deep)",
          background: "none", border: 0, cursor: "pointer", textAlign: "right", maxWidth: 110 }}>{lockedLabel}</button>
      : <Button variant="ghost" onClick={onJoin} style={{ minHeight: 38, padding: "0 14px", fontSize: 12.5 }}>Join</Button>}
  </section>;
}

/* ----------------------------------------------------------- SocialLinks -- */
function SocialLinks({ size = 18, gap = 4, tone = "ink", style }) {
  const links = [
    ["telegram", "https://t.me/tounknowndotcom", "Telegram"],
    ["instagram", "https://instagram.com/tounknowndotcom", "Instagram"],
    ["x", "https://twitter.com/tounknowndotcom", "X"],
    ["youtube", "https://www.youtube.com/@tounknowndotcom", "YouTube"],
    ["insight", "https://insighttimer.com/dyn", "Insight Timer"],
    ["mail", "mailto:tounknown.com@gmail.com", "Email"],
  ];
  return <div style={{ display: "flex", gap, justifyContent: "center", alignItems: "center", ...style }}>
    {links.map(([icon, href, label]) => (
      <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener" aria-label={label}
        className="tu-press" style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: "50%",
          color: tone === "light" ? "rgba(255,255,255,0.72)" : "var(--text-tertiary)", transition: "color .25s, background-color .25s" }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold-deep)"; e.currentTarget.style.background = "rgba(217,164,65,0.10)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = tone === "light" ? "rgba(255,255,255,0.72)" : "var(--text-tertiary)"; e.currentTarget.style.background = "transparent"; }}>
        <Icon name={icon} size={size} />
      </a>))}
  </div>;
}

/* ------------------------------------------------------------- DanaChips -- */
function DanaChips({ amounts = [5, 11, 22, 54], custom = true, selected, onSelect, style }) {
  const [sel, setSel] = React.useState(selected ?? amounts[1]);
  const pick = (v) => { setSel(v); onSelect && onSelect(v); };
  const all = custom ? amounts.concat(["Custom"]) : amounts;
  return <div className="tu-scroll-x" style={{ display: "flex", gap: 8, overflowX: "auto", ...style }}>
    {all.map((a) => {
      const on = sel === a;
      return <button key={a} onClick={() => pick(a)} className="tu-press" style={{
        flex: "0 0 auto", minHeight: 44, padding: "0 20px", borderRadius: "var(--r-full)", cursor: "pointer",
        font: "600 13.5px/1 var(--font-sans)",
        border: on ? "0.5px solid transparent" : "0.5px solid rgba(24,22,16,0.10)",
        background: on ? "linear-gradient(180deg, #2A2823, var(--ink))" : "var(--glass-thick)",
        WebkitBackdropFilter: "var(--glass-blur)", backdropFilter: "var(--glass-blur)",
        color: on ? "#FBFAF7" : "var(--text-secondary)",
        boxShadow: on ? "inset 0 1px 0 rgba(255,255,255,0.18), var(--lift-2)" : "inset 0 1px 0 rgba(255,255,255,0.85)" }}>
        {typeof a === "number" ? `$${a}` : a}
      </button>;
    })}
  </div>;
}

/* ------------------------------------------------------------ GiveSlider -- */
function GiveSlider({ min = 11, max = 33, step = 1, value, onChange, period = "/mo", style }) {
  const [v, setV] = React.useState(value ?? min);
  const pct = ((v - min) / (max - min)) * 100;
  return <div style={{ ...style }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
      <span className="tu-eyebrow">give more, if it feels true</span>
      <span className="tu-num" style={{ font: "600 15px/1 var(--font-sans)", color: "var(--ink)" }}>${v}<span style={{ font: "400 12px/1 var(--font-sans)", color: "var(--text-tertiary)" }}>{period}</span></span>
    </div>
    <input type="range" min={min} max={max} step={step} value={v} aria-label="Monthly dāna"
      onChange={(e) => { const n = Number(e.target.value); setV(n); onChange && onChange(n); }}
      style={{ width: "100%", height: 28, appearance: "none", WebkitAppearance: "none", background: "transparent", cursor: "pointer",
        "--pct": pct + "%" }} className="tu-range" />
  </div>;
}

/* ----------------------------------------------------------------- Toast -- */
function Toast({ message, show = true, fixed = false, style }) {
  if (!show) return null;
  return <div role="status" style={{
    position: fixed ? "fixed" : "relative", left: fixed ? "50%" : undefined,
    bottom: fixed ? "calc(90px + env(safe-area-inset-bottom))" : undefined,
    transform: fixed ? "translateX(-50%)" : undefined, zIndex: 80,
    display: "flex", alignItems: "center", gap: 9, padding: "12px 20px", borderRadius: "var(--r-full)",
    background: "rgba(24,22,16,0.90)", WebkitBackdropFilter: "blur(20px)", backdropFilter: "blur(20px)",
    color: "#FBFAF7", font: "500 13px/1.35 var(--font-sans)", boxShadow: "var(--shadow-toast)",
    maxWidth: "calc(100% - 40px)",
    animation: `${fixed ? "tu-rise-centred" : "tu-rise"} .42s var(--ease-spring)`, ...style }}>{message}</div>;
}

Object.assign(DS, { Button, Chip, Orb, Interlude, PathCard, StatCard, TierCard, StepRow,
  Sheet, AppHeader, TabBar, TeacherCard, CircleCard, SocialLinks, DanaChips, GiveSlider, Toast });
window.TURing = Ring;
})();
