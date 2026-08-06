const { Orb, Button, Chip, Interlude, PathCard, TierCard, StepRow } = window.ToUnknownDesignSystem_9d38c1;
const SocialLinks = window.ToUnknownDesignSystem_9d38c1.SocialLinks || (()=>null);
const Icon = window.TUIcon;
/* The four steps, opened one at a time. They looked tappable, so now they are —
   each explains itself, and the two that lead somewhere say where. */
function HowItWorks({ go }) {
  const [open, setOpen] = React.useState(0);
  const steps = [
    { n: "1", title: TR("how.1.title","Choose a lineage Path"),
      lead: TR("how.1.lead","Vipassana · Tantra · Vedanta · Bhakti · Stoic — each names its tradition, source text and era."),
      body: TR("how.1.body","Nothing here is invented. Every Path descends from a living tradition and cites where it comes from, so you always know whose practice you are sitting."),
      cta: { label: TR("how.1.cta","See the Paths"), to: "paths" } },
    { n: "2", title: TR("how.2.title","Unlock by abhyāsa — steady practice"),
      lead: TR("how.2.lead","Each sitting opens only after you have sat the one before it."),
      body: TR("how.2.body","Introductions and talks are open to listen to whenever you like. The guided sittings open in order, and only once the previous one has genuinely been sat — the timing is checked, so a track cannot be skipped to the end.") },
    { n: "☸", title: TR("how.3.title","Pass the Dīkṣā Gate"), gate: true,
      lead: TR("how.3.lead","Practice hours and a written reflection — the sādhaka seal."),
      body: TR("how.3.body","At the threshold of a deeper stage you are asked to put your practice into your own words. Nothing scores it. In the guided circle a teacher reads it and writes back.") },
    { n: "4", title: TR("how.4.title","Give by gratitude"),
      lead: TR("how.4.lead","Dāna appears after practice, never before."),
      body: TR("how.4.body","You are never asked for money before you have sat — and practice lowers the price: 20 days of sitting in a month takes 25% off the next, 25 days half, every day makes it free. Vipassana's first course stays free, every Path opens with free introductions, and no one is turned away for money."),
      cta: { label: TR("how.4.cta","The tuition ladder"), to: "membership" } },
  ];
  return <div style={{marginTop:4}}>
    {steps.map((s, i) => {
      const on = open === i;
      return <div key={s.title} style={{borderBottom:"0.5px solid var(--hairline)"}}>
        <button onClick={()=>setOpen(on ? -1 : i)} aria-expanded={on} className="tu-press"
          style={{display:"flex",alignItems:"center",gap:14,width:"100%",textAlign:"left",
            background:"none",border:0,cursor:"pointer",font:"inherit",padding:"15px 2px",minHeight:64}}>
          <span style={{width:38,height:38,flex:"0 0 auto",borderRadius:"50%",display:"grid",placeItems:"center",
            font:"600 13px/1 var(--font-sans)",borderWidth:"0.5px",borderStyle:"solid",
            background: on ? "rgba(217,164,65,0.18)" : "rgba(25,24,19,0.045)",
            borderColor: on ? "rgba(168,120,31,0.5)" : "rgba(24,22,16,0.08)",
            color: on ? "var(--gold-deep)" : "var(--text-tertiary)",
            transition:"background-color .3s, border-color .3s, color .3s"}}>{s.n}</span>
          <span style={{flex:1,minWidth:0}}>
            <b style={{display:"block",font:"600 13.5px/1.4 var(--font-sans)",letterSpacing:"-0.01em",color:"var(--text-body)"}}>{s.title}</b>
            <small style={{color:"var(--text-tertiary)",fontSize:12}}>{s.lead}</small>
          </span>
          <span aria-hidden="true" style={{color:"var(--text-tertiary)",flex:"0 0 auto",
            transform: on ? "rotate(90deg)" : "none", transition:"transform .34s var(--ease-spring)"}}>
            <Icon name="chevron" size={16}/></span>
        </button>
        {on && <div style={{padding:"0 2px 18px 52px",animation:"tu-rise .34s var(--ease-spring)"}}>
          <p style={{margin:0,font:"400 13.5px/1.65 var(--font-sans)",color:"var(--text-secondary)"}}>{s.body}</p>
          {s.cta && <Button variant="ghost" style={{marginTop:14,minHeight:40,padding:"0 16px",fontSize:12.5}}
            onClick={()=>go(s.cta.to)}>{s.cta.label}</Button>}
        </div>}
      </div>;
    })}
  </div>;
}

function HomeScreen({ openPath, go }) {
  const T = window.TU;
  const [paths, setPaths] = React.useState(null);
  React.useEffect(() => {
    if (window.TULive) window.TULive.loadPaths().then(setPaths).catch(() => setPaths(null));
  }, []);
  const all = (paths && paths.length) ? paths : T.paths.map((p)=>({...p, status:"living", kind:"lineage"}));
  const living = all.filter((p) => p.status === "living" && p.kind !== "collection");
  const collection = all.find((p) => p.status === "living" && p.kind === "collection");
  const byId = (id, fallbackIdx) => living.find((p) => p.id === id) || living[fallbackIdx] || all[fallbackIdx];
  return <div>
    <div className="tu-haze" style={{position:"relative",minHeight:560,display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",textAlign:"center",padding:"140px 22px 60px",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`url('${T.hero}') center 28%/cover no-repeat`,backgroundColor:"#0B0B10"}}></div>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 90% 70% at 50% 60%,rgba(11,11,16,0.6) 0%,rgba(11,11,16,0.35) 55%,rgba(11,11,16,0.7) 100%)"}}></div>
      <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <img src="../../assets/wordmark-white.png" alt="toUnknown" style={{width:250,height:"auto",display:"block",marginBottom:18}}/>
        <p style={{margin:"0 0 8px",fontFamily:"var(--font-serif)",fontSize:11.5,letterSpacing:"2.5px",textTransform:"uppercase",color:"rgba(245,244,240,0.88)",textWrap:"balance"}}>{T.brand.tagline}</p>
        <p style={{margin:"0 0 30px",fontFamily:"var(--font-serif)",fontSize:14,color:"rgba(255,255,255,0.68)"}}>{T.brand.subline}</p>
        <div style={{display:"flex",gap:12,justifyContent:"center"}}>
          <Button onClick={()=>go("paths")}>{TR("home.cta.begin","Begin a Path")}</Button>
          <Button variant="ghost" onClick={()=>openPath(byId("vipassana",0))}>{TR("home.cta.free","Sit 15 min free")}</Button>
        </div>
      </div>
    </div>
    <section style={{padding:"26px 20px 0"}}>
      <button onClick={()=>window.TUStart && window.TUStart()} className="tu-glass tu-press tu-lift"
        style={{display:"flex",alignItems:"center",gap:14,width:"100%",textAlign:"left",cursor:"pointer",
          font:"inherit",borderRadius:"var(--r-lg)",padding:"18px 18px 18px 16px",minHeight:84}}>
        <span style={{width:44,height:44,flex:"0 0 auto",borderRadius:"50%",display:"grid",placeItems:"center",
          background:"rgba(217,164,65,0.16)",border:"0.5px solid rgba(168,120,31,0.3)",color:"var(--gold-deep)"}}>
          <Icon name="marga" size={21}/></span>
        <span style={{flex:1,minWidth:0}}>
          <b style={{display:"block",font:"600 14.5px/1.35 var(--font-sans)",letterSpacing:"-0.01em",color:"var(--ink)"}}>
            {TR("home.start.title","Never meditated before?")}</b>
          <small style={{color:"var(--text-tertiary)",fontSize:12.5}}>
            {TR("home.start.sub","Four questions, and we will name the Path to start on.")}</small>
        </span>
        <span aria-hidden="true" style={{color:"var(--text-tertiary)",flex:"0 0 auto"}}><Icon name="chevron" size={17}/></span>
      </button>
    </section>

    <Interlude quote={T.brand.philosophy} attribution="— the toUnknown way"/>
    <section style={{padding:"0 20px",textAlign:"center"}}>
      <p className="tu-inscribe" style={{margin:0,fontSize:15,color:"var(--ink)"}}>FEATURED</p>
      <p className="tu-inscribe" style={{margin:"6px 0 24px",fontSize:11,color:"var(--text-tertiary)",letterSpacing:"0.22em"}}>MEDITATION TECHNIQUES</p>
      {/* A 150px square turned 45° needs 150·√2 ≈ 212px of room, or its corners
          reach into the type above and below. Reserve the diagonal, not the side. */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:214,margin:"6px 0 22px"}}>
        <div style={{width:150,height:150,transform:"rotate(45deg)",overflow:"hidden",borderRadius:6,
          boxShadow:"var(--lift-3)",outline:"0.5px solid rgba(168,120,31,0.28)",outlineOffset:-1}}>
          <img src="../../assets/covers/shiva-meditation-online.jpg" alt="Shiva Nataraja" style={{width:"100%",height:"100%",objectFit:"cover",transform:"rotate(-45deg) scale(1.42)"}}/>
        </div>
      </div>
      <div style={{textAlign:"left",display:"flex",flexDirection:"column",gap:20}}>
        <div className="tu-glass tu-lift" style={{borderRadius:"var(--r-2xl)",padding:24}}>
          <h3 className="tu-display" style={{margin:0,fontSize:20,color:"var(--ink)"}}>Vigyan Bhairav Tantra</h3>
          <p style={{margin:"10px 0 16px",fontSize:13.5,color:"var(--text-secondary)"}}>{TR("home.vbt.body","112 guided audio techniques given by Shiva in the Vijñāna Bhairava Tantra — an ancient scripture whose 112 doors each lead to the same recognition.")}</p>
          <Button onClick={()=>openPath(byId("tantra",1))}>{TR("home.vbt.cta","Try a technique")}</Button>
        </div>
        <div className="tu-glass tu-lift" style={{borderRadius:"var(--r-2xl)",padding:24}}>
          <h3 className="tu-display" style={{margin:0,fontSize:20,color:"var(--ink)"}}>Vipassana Meditation</h3>
          <p style={{margin:"10px 0 16px",fontSize:13.5,color:"var(--text-secondary)"}}>{TR("home.vip.body","The technique Gautama Buddha rediscovered 2,500 years ago, resting on three things: sīla (conduct), samādhi (collected attention), paññā (insight).")}</p>
          <Button onClick={()=>openPath(byId("vipassana",0))}>{TR("home.vip.cta","Begin here")}</Button>
        </div>
      </div>
    </section>
    <section style={{padding:"0 20px",marginTop:34}}>
      <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"0 0 10px"}}>{TR("home.paths.eyebrow","the living paths")}</p>
      <p className="tu-lede" style={{marginBottom:16}}><b>{TR("home.paths.lede.b","Only the roots.")}</b> {TR("home.paths.lede","From every ancient tradition — one Path at a time, walked, not browsed.")}</p>
    </section>
    <p className="tu-rail-hint">
      {TR("home.paths.hint","swipe for all the Paths")}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h13M13 6.5 18.5 12 13 17.5" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"/></svg>
    </p>
    <div className="tu-rail-wrap">
    <div className="tu-scroll-x tu-rail-to-grid" onScroll={(e)=>{
        const el = e.currentTarget;
        // hide the fade once there is nothing further to reach
        el.parentNode.dataset.end = (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) ? "true" : "false";
      }} style={{display:"flex",gap:14,overflowX:"auto",scrollSnapType:"x mandatory",padding:"4px 20px 18px"}}>
      {living.map(p=><PathCard key={p.id} layout="row" image={p.image} lineage={`${p.tradition} · ${p.source}`} title={p.name} essence={p.essence} onClick={()=>openPath(p)}/>)}
    </div>
    </div>
    {collection && <section style={{padding:"6px 20px 0",marginTop:30}}>
      <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"0 0 10px"}}>{TR("home.kids.eyebrow","for children")}</p>
      <p className="tu-lede" style={{marginBottom:16}}>
        <b>{TR("home.kids.lede.b","Little ones sit too.")}</b> {TR("home.kids.lede","Short stories and sittings for ages 6–12 — and whoever sits beside them.")}</p>
      <PathCard imagePos="center center" frost={false} image={collection.image} lineage={`${collection.tradition} · ${collection.source}`}
        title={collection.name} essence={collection.essence} onClick={()=>openPath(collection)}/>
    </section>}

    {/* An arch cut from the page — the shape of a stupa niche — with the monk inside it and
        the inscription beneath. A portrait deserves a frame, not a full-bleed wash. */}
    <section style={{padding:"clamp(48px,7vw,88px) 20px",textAlign:"center"}}>
      <div style={{position:"relative",width:"min(420px,78%)",margin:"0 auto",
        aspectRatio:"4 / 5", borderRadius:"999px 999px 22px 22px", overflow:"hidden",
        background:"#0B0B10", boxShadow:"var(--shadow-photo)"}}>
        <img src={T.monkBowl} alt="A monk on his alms round, Burma" loading="lazy"
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"24% 38%"}}/>
        <div aria-hidden="true" style={{position:"absolute",inset:0,
          background:"linear-gradient(180deg,rgba(11,11,16,0.10) 0%,rgba(11,11,16,0.05) 55%,rgba(11,11,16,0.55) 100%)"}}/>
        <div aria-hidden="true" style={{position:"absolute",inset:0,borderRadius:"inherit",
          border:"0.5px solid rgba(217,164,65,0.34)"}}/>
      </div>
      <div aria-hidden="true" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,margin:"26px 0 18px"}}>
        <span style={{height:0.5,width:44,background:"linear-gradient(90deg,transparent,rgba(168,120,31,0.55))"}}/>
        <span style={{width:4,height:4,borderRadius:"50%",background:"var(--gold-deep)",opacity:0.8}}/>
        <span style={{height:0.5,width:44,background:"linear-gradient(90deg,rgba(168,120,31,0.55),transparent)"}}/>
      </div>
      <p className="tu-inscribe" style={{margin:0,fontSize:"clamp(19px,2.4vw,26px)",color:"var(--ink)"}}>
        THEREFORE, DON'T TRY</p>
      <p className="tu-eyebrow" style={{margin:"14px 0 0",color:"var(--gold-deep)"}}>— on effortless effort</p>
    </section>
    {/* An emblem, not a photograph — so it wants air and an inscription, not a picture frame. */}
    <section style={{padding:"14px 20px 6px",textAlign:"center"}}>
      <div aria-hidden="true" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:22}}>
        <span style={{height:0.5,width:40,background:"linear-gradient(90deg,transparent,rgba(168,120,31,0.5))"}}/>
        <span style={{width:4,height:4,borderRadius:"50%",background:"var(--gold-deep)",opacity:0.7}}/>
        <span style={{height:0.5,width:40,background:"linear-gradient(90deg,rgba(168,120,31,0.5),transparent)"}}/>
      </div>
      <img src={T.masterpiece} alt="You suffer because you desire — toUnknown"
        width="768" height="583" loading="lazy"
        style={{display:"block",width:"min(260px,62%)",height:"auto",margin:"0 auto",
          mixBlendMode:"multiply"}}/>
      <p className="tu-display" style={{margin:"20px auto 0",maxWidth:"22ch",fontSize:17,
        color:"var(--ink)",lineHeight:1.4}}>You are your <i>own</i> masterpiece.</p>
      <p className="tu-eyebrow" style={{margin:"12px 0 0",opacity:0.85}}>— nothing to become</p>
    </section>
    <section style={{padding:"0 20px"}}>
      <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"22px 0 10px"}}>{TR("home.how.eyebrow","how it works")}</p>
      <p className="tu-lede" style={{marginBottom:14}}><b>{TR("home.how.lede.b","Unlocked by sitting,")}</b> {TR("home.how.lede","never by paying.")}</p>
      <HowItWorks go={go}/>
    </section>
    <section style={{padding:"0 20px",marginTop:34}}>
      <TierCard hot chip="membership" chipTone="gold" title="One membership. Every Path.">
        <p style={{margin:"6px 0 0",fontSize:13.5,color:"var(--text-secondary)"}}>$11/month or $88/year — and the guided Sādhaka circle for those who go deep.</p>
        <Button wide style={{marginTop:16}} onClick={()=>go("membership")}>See the tuition ladder</Button>
      </TierCard>
    </section>
    <section style={{padding:"0 20px",marginTop:26,textAlign:"center"}}>
      <p style={{margin:"0 0 10px",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text-tertiary)"}}>Sat with us? Tell others</p>
      <a href="https://www.trustpilot.com/evaluate/tounknown.com" target="_blank" rel="noopener">
        <img src={T.trustpilot} alt="Review toUnknown on Trustpilot" width="200" height="33" loading="lazy" style={{borderRadius:8}}/></a>
    </section>
    <div style={{padding:"36px 20px 20px",textAlign:"center",color:"var(--text-tertiary)",fontSize:12}}><SocialLinks style={{marginBottom:10}}/><a href="/paths/" style={{color:"var(--text-tertiary)"}}>All Paths</a> · <a href="/faq" style={{color:"var(--text-tertiary)"}}>FAQ</a> · <a href="/membership" style={{color:"var(--text-tertiary)"}}>Membership</a><br/>© 2026 toUnknown · <a href="/legal.html" style={{color:"var(--text-tertiary)"}}>Terms &amp; privacy</a></div>
  </div>;
}
window.HomeScreen = HomeScreen;
