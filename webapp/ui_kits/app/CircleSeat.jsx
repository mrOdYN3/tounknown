/* The guided circle, made visible.
 *
 * $33 and $11 bought the same thing for as long as this tier has existed: the tier column was
 * written by the Stripe webhook and read by nothing. This is the screen that reads it — a
 * numbered seat out of thirty, the reflections a teacher has answered, and, for everyone else,
 * an honest count of how many seats are left rather than an evergreen "max 30".
 */
const CSIcon = window.TUIcon;

function CircleSeat({ compact }) {
  const [c, setC] = React.useState(null);
  React.useEffect(() => {
    const load = () => {
      const s = window.TULive && window.TULive.session();
      fetch("/api/circle", s ? { headers: { Authorization: "Bearer " + s.access_token } } : undefined)
        .then((r) => (r.ok ? r.json() : null)).then(setC).catch(() => {});
    };
    load();
    return window.TULive ? window.TULive.onAuth(load) : undefined;
  }, []);
  if (!c) return null;

  const mine = !!c.seat;

  // For anyone outside the circle this is just a true number, shown where the claim is made.
  if (!mine) {
    if (!compact) return null;
    return <span style={{font:"500 12px/1 var(--font-sans)",color:"var(--text-tertiary)"}}>
      {c.open > 0
        ? TR("circle.open", "{n} of {cap} seats open").replace("{n}", c.open).replace("{cap}", c.cap)
        : TR("circle.full", "All {cap} seats taken").replace("{cap}", c.cap)}
    </span>;
  }

  const since = c.since ? new Date(c.since).toLocaleDateString(undefined, { month: "long", year: "numeric" }) : null;

  return <section style={{padding:"0 20px",marginTop:compact ? 0 : 22}}>
    <div className="tu-glass" style={{borderRadius:"var(--r-lg)",padding:"20px 20px 18px",
      boxShadow:"var(--lift-1)"}}>

      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
        <div aria-hidden="true" style={{display:"grid",placeItems:"center",width:40,height:40,flex:"0 0 auto",
          borderRadius:"50%",background:"rgba(104,118,79,0.14)",border:"0.5px solid rgba(104,118,79,0.3)",
          color:"var(--sage-deep)"}}><CSIcon name="sangha" size={19}/></div>
        <div style={{minWidth:0}}>
          <p style={{margin:0,font:"600 10.5px/1.3 var(--font-sans)",textTransform:"uppercase",
            letterSpacing:"0.14em",color:"var(--sage-deep)"}}>{TR("circle.eyebrow","the guided circle")}</p>
          <b style={{display:"block",font:"400 17px/1.3 var(--font-serif)",letterSpacing:"-0.01em",
            color:"var(--ink)",marginTop:3}}>
            {TR("circle.seat","Seat {n} of {cap}").replace("{n}", c.seat).replace("{cap}", c.cap)}</b>
        </div>
      </div>

      <p style={{margin:"0 0 14px",font:"400 13.5px/1.65 var(--font-sans)",color:"var(--text-secondary)"}}>
        {since
          ? TR("circle.since","Yours since {m}. The circle is capped at {cap} so that a teacher can actually know who is in it.")
              .replace("{m}", since).replace("{cap}", c.cap)
          : TR("circle.since.plain","The circle is capped at 30 so that a teacher can actually know who is in it.")}
      </p>

      {/* Thirty small marks. Yours is filled. */}
      <div aria-hidden="true" style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:16}}>
        {Array.from({length: c.cap}, (_, i) => <span key={i} style={{
          width:8,height:8,borderRadius:"50%",
          background: i + 1 === c.seat ? "var(--sage-deep)"
                    : i < c.seats ? "rgba(104,118,79,0.34)" : "rgba(24,22,16,0.09)",
          outline: i + 1 === c.seat ? "2px solid rgba(104,118,79,0.22)" : "none",
          outlineOffset: 1,
        }}/>)}
      </div>

      <div style={{display:"flex",gap:10,paddingTop:14,borderTop:"0.5px solid var(--hairline)"}}>
        <Stat n={c.reflections || 0} label={TR("circle.reflections","reflections written")}/>
        <Stat n={c.answered || 0} label={TR("circle.answered","answered by a teacher")}/>
        <Stat n={c.open} label={TR("circle.seatsleft","seats still open")}/>
      </div>

      {c.reflections > 0 && !c.answered &&
        <p style={{margin:"14px 0 0",font:"400 13px/1.6 var(--font-serif)",color:"var(--text-tertiary)"}}>
          {TR("circle.waiting","Your reflection is in the queue. A reply is written by a person, so it takes a few days.")}</p>}

      {c.latest && c.latest.teacher_note &&
        <div style={{marginTop:14,padding:"14px 16px",borderRadius:16,background:"rgba(104,118,79,0.09)",
          border:"0.5px solid rgba(104,118,79,0.24)"}}>
          <p style={{margin:"0 0 6px",font:"600 10.5px/1.3 var(--font-sans)",textTransform:"uppercase",
            letterSpacing:"0.13em",color:"var(--sage-deep)"}}>{TR("circle.from","from your teacher")}</p>
          <p style={{margin:0,font:"400 14px/1.65 var(--font-serif)",color:"var(--ink)"}}>{c.latest.teacher_note}</p>
        </div>}
    </div>
  </section>;
}

function Stat({ n, label }) {
  return <div style={{flex:1,minWidth:0}}>
    <b style={{display:"block",font:"400 21px/1 var(--font-serif)",color:"var(--ink)"}}>{n}</b>
    <span style={{display:"block",marginTop:4,font:"400 11.5px/1.35 var(--font-sans)",
      color:"var(--text-tertiary)"}}>{label}</span>
  </div>;
}

window.TUCircleSeat = CircleSeat;
