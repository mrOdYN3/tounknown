const { Interlude, TierCard, Button, DanaChips, GiveSlider } = window.ToUnknownDesignSystem_9d38c1;
const PAYPAL = "https://www.paypal.com/donate?hosted_button_id=H5VQT3VLQBUBJ";

function DanaScreen({ go, toast }) {
  const T = window.TU;
  const [busy, setBusy] = React.useState(null);   // plan id being opened
  const [note, setNote] = React.useState(null);   // { text, tone }
  const [session, setSession] = React.useState(window.TULive && window.TULive.session());
  const [member, setMember] = React.useState(window.TULive && window.TULive.member());
  React.useEffect(() => window.TULive ? window.TULive.onAuth((s,m)=>{setSession(s);setMember(m);}) : undefined, []);

  const active = window.TULive && window.TULive.isMember();

  const buy = (plan) => {
    if (!window.TULive) return;
    setNote(null); setBusy(plan);
    window.TULive.checkout(plan)
      .then((url) => { window.location.href = url; })
      .catch((e) => {
        setBusy(null);
        const msg = String(e.message || e);
        setNote(/not configured/i.test(msg)
          ? { text: "Card payments open shortly. Until then you can give quietly via PayPal — every dāna reaches the same place.", tone: "gold" }
          : { text: msg, tone: "gold" });
      });
  };

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

    {note && <section style={{padding:"0 20px 4px"}}>
      <div style={{padding:"14px 16px",borderRadius:18,background:"rgba(217,164,65,0.10)",border:"0.5px solid rgba(168,120,31,0.25)",
        fontFamily:"var(--font-serif)",fontSize:13.5,color:"var(--gold-deep)"}}>
        {note.text}
        <div style={{marginTop:10}}><a href={PAYPAL} target="_blank" rel="noopener" style={{fontWeight:600}}>{TR("dana.paypal","Give via PayPal ↗")}</a></div>
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

      <TierCard chip={TR("dana.tier.seeker","seeker")} price="$0" priceNote="· dāna" bullets={[TR("dana.tier.seeker.1","First gate of every Path — free forever"),TR("dana.tier.seeker.2","Community, read-only"),TR("dana.tier.seeker.3","Give only if it feels true")]}>
        <Button variant="ghost" wide onClick={()=>go("paths")}>{TR("dana.tier.seeker.cta","Start free")}</Button>
      </TierCard>

      <TierCard hot chip={TR("dana.tier.student","student · toUnknown+")} chipTone="gold" price="$11" priceNote="/mo or $88/yr"
        bullets={[TR("dana.tier.student.1","Every Path, unlocked by your practice"),TR("dana.tier.student.2","Sangha participation"),TR("dana.tier.student.3","Sangha participation + monthly satsang")]}>
        <GiveSlider style={{marginBottom:14}}/>
        <Button wide onClick={()=>buy("student-monthly")}>{buyLabel("student-monthly",TR("dana.tier.student.cta","Become a Student"))}</Button>
        <Button variant="quiet" wide onClick={()=>buy("student-yearly")}>{buyLabel("student-yearly",TR("dana.tier.student.year","or $88 / year — two months free"))}</Button>
      </TierCard>

      <TierCard chip={TR("dana.tier.sadhaka","sādhaka · the guided circle")} chipTone="green" price="$33" priceNote="/mo"
        bullets={[TR("dana.tier.sadhaka.1","Everything in Student"),TR("dana.tier.sadhaka.2","A place in the first guided circle — max 30, when it opens"),TR("dana.tier.sadhaka.3","Monthly live guidance once the circle is running"),TR("dana.tier.sadhaka.4","Your gate reflections read by a teacher")]}>
        <Button wide onClick={()=>buy("sadhaka-monthly")}>{buyLabel("sadhaka-monthly",TR("dana.tier.sadhaka.cta","Enter the circle"))}</Button>
      </TierCard>

      <TierCard chip={TR("dana.tier.founding","founding member")} price="$108" priceNote="· once" bullets={[TR("dana.tier.founding.1","Lifetime Student membership"),TR("dana.tier.founding.2","You keep the library, whatever happens next")]}>
        <Button variant="ghost" wide onClick={()=>buy("founding-once")}>{buyLabel("founding-once",TR("dana.tier.founding.cta","Become founding"))}</Button>
      </TierCard>
    </section>

    {!session && <p style={{textAlign:"center",fontSize:13,color:"var(--text-tertiary)",margin:"14px 20px 0"}}>
      Sign in from the Sādhana tab first — your membership follows your email.</p>}

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
  </div>;
}
window.DanaScreen = DanaScreen;
