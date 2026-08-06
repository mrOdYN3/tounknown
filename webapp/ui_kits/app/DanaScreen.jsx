const { Interlude, TierCard, Button, DanaChips, GiveSlider } = window.ToUnknownDesignSystem_9d38c1;
const PAYPAL = "https://www.paypal.com/donate?hosted_button_id=H5VQT3VLQBUBJ";
const Icon = window.TUIcon;
const PENDING = "tu.pending-plan";
const SeatCount = (p) => (window.TUCircleSeat ? <window.TUCircleSeat {...p}/> : null);
const Notice = (p) => (window.TUNotice ? <window.TUNotice {...p}/> : null);

function DanaScreen({ go, toast }) {
  // Real generosity, counted — the only social proof this product should show.
  const [pool, setPool] = React.useState(null);
  React.useEffect(() => {
    fetch("/api/practice/pool").then((r) => r.ok ? r.json() : null).then(setPool).catch(() => {});
  }, []);
  const T = window.TU;
  const [busy, setBusy] = React.useState(null);   // plan id being opened
  const [note, setNote] = React.useState(null);   // { text, tone }
  const [session, setSession] = React.useState(window.TULive && window.TULive.session());
  const [member, setMember] = React.useState(window.TULive && window.TULive.member());
  React.useEffect(() => window.TULive ? window.TULive.onAuth((s,m)=>{setSession(s);setMember(m);}) : undefined, []);

  const active = window.TULive && window.TULive.isMember();

  const buy = (plan) => {
    if (!window.TULive) return;
    setNote(null);
    // Signing in is part of buying, not an errand to run first on another screen.
    if (!window.TULive.session()) {
      try { sessionStorage.setItem(PENDING, plan); } catch {}
      return setNote({ kind: "signin", plan });
    }
    setBusy(plan);
    window.TULive.checkout(plan)
      .then((url) => { window.location.href = url; })
      .catch((e) => {
        setBusy(null);
        const msg = String(e.message || e);
        setNote(/not configured/i.test(msg)
          ? { text: "Card payments open shortly.",
              sub: "Until then you can give quietly via PayPal — every dāna reaches the same place.",
              paypal: true, icon: "spark" }
          : { text: "That did not open.", sub: msg, icon: "close" });
      });
  };

  // Come back from the email link and the checkout you asked for opens itself.
  React.useEffect(() => {
    if (!session || !window.TULive) return;
    let plan = null;
    try { plan = sessionStorage.getItem(PENDING); sessionStorage.removeItem(PENDING); } catch {}
    if (plan) buy(plan);
  }, [session]);

  const buyLabel = (plan, label) => busy === plan ? "Opening…" : label;

  return <div>
    <Interlude style={{paddingTop:44}} quote={TR("dana.interlude","These meditations are offered freely — in the spirit of generosity.")} attribution={TR("dana.interlude.attrib","— dāna, the root of a connected life")}/>

    {active && <section style={{padding:"0 20px 4px"}}>
      <div style={{padding:"14px 16px",borderRadius:18,background:"rgba(217,164,65,0.12)",border:"0.5px solid rgba(168,120,31,0.3)"}}>
        <b style={{fontSize:13.5,color:"var(--ink)"}}>You are a {member && member.tier ? member.tier : "member"}.</b>
        <p style={{margin:"4px 0 0",fontSize:13,color:"var(--text-secondary)"}}>{TR("dana.member.thanks","Every Path is open to you. Thank you for holding this place open for others.")}</p>
        <Button variant="ghost" style={{marginTop:14,minHeight:40,padding:"0 16px",fontSize:12.5}}
          onClick={()=>{ window.TULive.portal().then((u)=>{window.location.href=u;})
            .catch((e)=>setNote({text:String(e.message||e)})); }}>
          {TR("dana.manage","Manage or cancel membership")}</Button>
      </div>
    </section>}


    <section style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:16}}>
      {/* The thing that makes this ladder different from every other subscription — it belongs
          before the prices, not after them. */}
      <div style={{margin:"0 0 18px",padding:"18px 18px 16px",borderRadius:"var(--r-lg)",
        background:"rgba(217,164,65,0.10)",border:"0.5px solid rgba(168,120,31,0.32)"}}>
        <p className="tu-eyebrow" style={{margin:"0 0 8px",color:"var(--gold-deep)"}}>
          {TR("dana.discount.eyebrow","practice lowers the price")}</p>
        <p style={{margin:0,font:"400 16px/1.45 var(--font-serif)",color:"var(--ink)"}}>
          {TR("dana.discount.lead","The more you sit, the less you pay.")}</p>
        <p style={{margin:"8px 0 0",font:"400 13.5px/1.65 var(--font-sans)",color:"var(--text-secondary)"}}>
          {TR("dana.discount.body","Sit on 20 days in a month and the next month is 25% less. 25 days, half price. Every day, and the next month is free — keep it, or give it to someone who cannot pay. Counted at the end of the month, so a missed day costs nothing.")}</p>
      </div>

      {pool && pool.months_available > 0 &&
        <p style={{margin:"0 0 16px",textAlign:"center",font:"400 13px/1.6 var(--font-serif)",color:"var(--gold-deep)"}}>
          {pool.months_available} {pool.months_available === 1
            ? TR("dana.pool.one","month is waiting in the scholarship pool")
            : TR("dana.pool.many","months are waiting in the scholarship pool")}
          {" · "}{TR("dana.pool.by","given by")} {pool.given_by} {pool.given_by === 1
            ? TR("dana.pool.p1","practitioner") : TR("dana.pool.pn","practitioners")}
        </p>}

      <TierCard details={[
        {t:"What you can sit today",d:"The whole first course of the Vipassana Path, a 15-minute taster that needs no account, and the opening introductions of every other Path."},
        {t:"What stays closed",d:"The guided sittings inside the other Paths. You can hear how each course begins before deciding."},
        {t:"What it costs",d:"Nothing, ever. Give only if the practice was worth something to you."},
      ]} chip={TR("dana.tier.seeker","seeker")} price="$0" priceNote="· dāna" bullets={[TR("dana.tier.seeker.1","First gate of every Path — free forever"),TR("dana.tier.seeker.2","Community, read-only"),TR("dana.tier.seeker.3","Give only if it feels true")]}>
        <Button variant="ghost" wide onClick={()=>go("paths")}>{TR("dana.tier.seeker.cta","Start free")}</Button>
      </TierCard>

      <TierCard details={[
        {t:"Every Path, unlocked by sitting",d:"All 284 guided sittings across five traditions, plus the Kids & Family collection. Tracks open in order as you sit them — never by paying."},
        {t:"Practice lowers what you pay",d:"20 days sat in a month takes 25% off the next; 25 days half; every day makes it free. Counted at month end, so a missed day costs nothing."},
        {t:"Dīkṣā Gates",d:"At the threshold of deeper material you write a short reflection, read by a teacher."},
        {t:"Sangha",d:"The circle lives on Telegram while the in-app Sangha is built. The monthly satsang begins when the circle does."},
        {t:"Billing",d:"$11 a month or $88 a year. Cancel any time from your own billing page — access runs to the end of the period you paid for."},
      ]} hot chip={TR("dana.tier.student","student · toUnknown+")} chipTone="gold" price="$11" priceNote="/mo or $88/yr"
        bullets={[TR("dana.tier.student.1","Every Path, unlocked by your practice"),TR("dana.tier.student.2","Downloads are coming; sittings stream for now"),TR("dana.tier.student.3","Sangha participation as the circle opens")]}>
        <GiveSlider style={{marginBottom:14}}/>
        <Button wide onClick={()=>buy("student-monthly")}>{buyLabel("student-monthly",TR("dana.tier.student.cta","Become a Student"))}</Button>
        <Button variant="quiet" wide onClick={()=>buy("student-yearly")}>{buyLabel("student-yearly",TR("dana.tier.student.year","or $88 / year — two months free"))}</Button>
      </TierCard>

      <TierCard details={[
        {t:"Everything in Student",d:"The full library, the practice discount, the gates."},
        {t:"A place in the first guided circle",d:"No more than thirty practitioners with a lineage teacher. The circle has not opened yet — this holds your place in it."},
        {t:"Monthly live guidance",d:"Begins once the circle is running. Until then this tier gives you Student access and a reserved seat."},
        {t:"Your reflections read",d:"Gate reflections are read and answered by a teacher rather than filed."},
        {t:"Honestly",d:"If you want the library today, Student is the same access for $11. Choose this to hold a seat and support the circle being built."},
      ]} chip={TR("dana.tier.sadhaka","sādhaka · the guided circle")} chipTone="green" price="$33" priceNote="/mo"
        bullets={[TR("dana.tier.sadhaka.1","Everything in Student"),TR("dana.tier.sadhaka.2","A numbered seat in the guided circle — thirty, and no more"),TR("dana.tier.sadhaka.3","Monthly live guidance once the circle is running"),TR("dana.tier.sadhaka.4","Every gate reflection read and answered by a teacher")]}>
        {/* The real number, taken from the roster, rather than an evergreen "max 30". */}
        <div style={{marginBottom:10}}><SeatCount compact/></div>
        <Button wide onClick={()=>buy("sadhaka-monthly")}>{buyLabel("sadhaka-monthly",TR("dana.tier.sadhaka.cta","Enter the circle"))}</Button>
      </TierCard>

      <TierCard details={[
        {t:"Lifetime Student membership",d:"Paid once. Every Path, every sitting, for as long as toUnknown exists — no renewal, no lapse."},
        {t:"Why it exists",d:"It funds the recordings and the server before there is recurring revenue to do it."},
        {t:"What it is not",d:"It is not a subscription and does not renew. It is a one-time gift with lifetime access attached."},
      ]} chip={TR("dana.tier.founding","founding member")} price="$108" priceNote="· once" bullets={[TR("dana.tier.founding.1","Lifetime Student membership"),TR("dana.tier.founding.2","You keep the library, whatever happens next")]}>
        <Button variant="ghost" wide onClick={()=>buy("founding-once")}>{buyLabel("founding-once",TR("dana.tier.founding.cta","Become founding"))}</Button>
      </TierCard>
    </section>


    <section style={{padding:"0 20px"}}>
      <div style={{borderRadius:24,overflow:"hidden",border:"0.5px solid var(--hairline)",marginTop:26,boxShadow:"var(--shadow-photo)"}}>
        <img src={T.danaImg} alt="Dāna — the practice of generosity" width="1440" height="756" loading="lazy" style={{display:"block",width:"100%",height:140,objectFit:"cover"}}/>
      </div>
      <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"22px 0 10px"}}>{TR("dana.once","one-time dāna")}</p>
      <p className="tu-lede" style={{marginBottom:16}}><b>No fixed cost.</b> No pressure — only presence, and the freedom to give if it feels true.</p>
      <DanaChips style={{margin:"20px 0"}}/>
      <Button wide onClick={()=>{window.open(PAYPAL,"_blank","noopener");}}>Give with a free heart</Button>
      <p style={{textAlign:"center",margin:"12px 0 0"}}><a href={PAYPAL} target="_blank" rel="noopener" style={{color:"var(--text-tertiary)",fontSize:13}}>or quietly via PayPal</a></p>
    </section>

    {T.reviews && T.reviews.length > 0 && <section style={{padding:"30px 0 4px"}}>
      <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"0 20px 12px"}}>from practitioners</p>
      <div className="tu-scroll-x" style={{display:"flex",gap:12,overflowX:"auto",
        scrollSnapType:"x mandatory",padding:"2px 20px 8px"}}>
        {T.reviews.map((r,i)=>(
          <figure key={i} className="tu-glass" style={{flex:"0 0 auto",width:250,margin:0,
            borderRadius:"var(--r-lg)",padding:18,scrollSnapAlign:"start",
            display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <blockquote style={{margin:0,font:"400 14px/1.55 var(--font-serif)",color:"var(--ink)"}}>
              “{r.text}”</blockquote>
            <figcaption style={{marginTop:14,fontSize:11.5,color:"var(--text-tertiary)"}}>
              <br/>
              {r.author}</figcaption>
          </figure>))}
      </div>
      <p style={{textAlign:"center",margin:"6px 20px 0",fontSize:12,color:"var(--text-tertiary)"}}>
        {TR("dana.reviews.note","From practitioners who sat these courses.")}</p>
    </section>}

    <Interlude quote="No one is turned away for money."
      attribution="scholarship — write us one honest paragraph · apply"/>
    <p style={{textAlign:"center",margin:"-8px 20px 0"}}>
      <a href={"mailto:tounknown.com@gmail.com?subject="+encodeURIComponent("Scholarship request")}
        style={{fontFamily:"var(--font-serif)",fontSize:13,color:"var(--gold-deep)"}}>write to us ↗</a></p>

    {/* Asked where the question was raised, never as a band above the fold. */}
    <Notice note={note} onClose={()=>setNote(null)}/>
  </div>;
}
window.DanaScreen = DanaScreen;
