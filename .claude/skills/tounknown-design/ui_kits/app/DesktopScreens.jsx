const { Orb, Button, Chip, Interlude, PathCard, TierCard, StatCard, TeacherCard, CircleCard, StepRow, DanaChips, GiveSlider } = window.ToUnknownDesignSystem_9d38c1;
const SocialLinks = window.ToUnknownDesignSystem_9d38c1.SocialLinks || (()=>null);
const WRAP = { maxWidth: 1100, margin: "0 auto", padding: "0 32px" };

function DHome({ openPath, go }) {
  const T = window.TU;
  return <div>
    <div style={{position:"relative",minHeight:560,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`url('${T.hero}') center 30%/cover`,backgroundColor:"#0B0B10"}}></div>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 75% at 50% 50%,rgba(11,11,16,0.55) 0%,rgba(11,11,16,0.3) 55%,rgba(11,11,16,0.72) 100%)"}}></div>
      <div style={{position:"relative",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",padding:"72px 32px"}}>
        <img src="../../assets/logo-white.png" alt="" aria-hidden="true" style={{width:56,height:"auto",marginBottom:24,animation:"breathe 6s ease-in-out infinite"}}/>
        <img src="../../assets/wordmark-white.png" alt="toUnknown" style={{width:300,height:"auto",display:"block",marginBottom:20}}/>
        <p style={{margin:"0 0 8px",fontFamily:"var(--font-serif)",fontSize:12.5,letterSpacing:"3px",textTransform:"uppercase",color:"rgba(245,244,240,0.88)"}}>{T.brand.tagline}</p>
        <p style={{margin:"0 0 32px",fontFamily:"var(--font-serif)",fontSize:15,color:"rgba(255,255,255,0.68)"}}>{T.brand.subline}</p>
        <div style={{display:"flex",gap:12,justifyContent:"center"}}>
          <Button onClick={()=>go("paths")}>Begin a Path</Button>
          <Button variant="ghost" onClick={()=>openPath(T.paths[0])}>Sit 15 min free</Button>
        </div>
      </div>
    </div>
    <Interlude quote={T.brand.philosophy} attribution="— the toUnknown way" size={26} style={{padding:"64px 28px"}}/>
    <div style={{...WRAP,marginBottom:56}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr 1fr",gap:32,alignItems:"center"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
          <div style={{width:210,height:210,transform:"rotate(45deg)",overflow:"hidden",boxShadow:"var(--shadow-photo)"}}>
            <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=789,fit=crop/d95DMJoWQZi9KZO2/shiva-meditation-online-A85Vy47MEOF7lOJL.jpg" alt="Shiva Nataraja" style={{width:"100%",height:"100%",objectFit:"cover",transform:"rotate(-45deg) scale(1.42)"}}/>
          </div>
        </div>
        <div style={{textAlign:"center"}}>
          <h2 style={{margin:0,fontSize:24,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"3.5px",color:"var(--ink)"}}>FEATURED</h2>
          <p style={{margin:"4px 0",fontSize:14,letterSpacing:"3px",color:"var(--text-secondary)",fontFamily:"var(--font-serif)"}}>MEDITATION TECHNIQUES</p>
          <p style={{margin:0,color:"var(--gold-deep)",fontSize:18}}>↓</p>
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <img src={T.satsang} alt="True meditation" style={{width:210,height:210,objectFit:"cover",borderRadius:"50%",boxShadow:"var(--shadow-photo)"}}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,marginTop:36}}>
        <div>
          <h3 style={{margin:0,fontSize:19,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>Vigyan Bhairav Tantra</h3>
          <p style={{margin:"12px 0 18px",fontSize:13.5,color:"var(--text-secondary)"}}>112 Guided Audio Meditation techniques by Shiva (Vijñana Bhairava Tantra). An ancient Indian scripture unveils 112 transformative meditation techniques guiding seekers toward <b style={{color:"var(--ink)"}}>spiritual awakening, self-realization.</b></p>
          <Button onClick={()=>openPath(T.paths[1])}>Let's try</Button>
        </div>
        <div>
          <h3 style={{margin:0,fontSize:19,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>Vipassana Meditation</h3>
          <p style={{margin:"12px 0 18px",fontSize:13.5,color:"var(--text-secondary)"}}>An ancient meditation technique rediscovered by Gautama Buddha over 2500 years ago — three fundamental elements: <b style={{color:"var(--ink)"}}>Sīla</b> (moral conduct), <b style={{color:"var(--ink)"}}>Samadhi</b> (focused attention and equanimity), <b style={{color:"var(--ink)"}}>Pañña</b> (wisdom and insight).</p>
          <Button onClick={()=>openPath(T.paths[0])}>Start!</Button>
        </div>
      </div>
    </div>
    <div style={WRAP}>
      <h2 style={{margin:"0 0 4px",fontSize:21,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>The four Paths</h2>
      <p style={{margin:"0 0 20px",fontSize:13.5,color:"var(--text-secondary)",maxWidth:560}}>Only the roots — from every ancient tradition. One Path at a time, walked, not browsed.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
        {T.paths.map(p=><PathCard key={p.id} image={p.image} lineage={`${p.tradition} · ${p.source}`} title={p.name} essence={p.essence} style={{minHeight:320,borderRadius:22}} onClick={()=>openPath(p)}/>)}
      </div>
    </div>
    <Interlude quote="THEREFORE, DON'T TRY" attribution="— on effortless effort" size={24} style={{padding:"60px 28px"}}/>
    <div style={{...WRAP,display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"center"}}>
      <div>
        <div style={{borderRadius:24,overflow:"hidden",border:"0.5px solid var(--hairline)",boxShadow:"var(--shadow-photo)"}}>
          <img src={T.masterpiece} alt="You are your own masterpiece — toUnknown" width="768" height="583" loading="lazy" style={{display:"block",width:"100%",height:"auto"}}/>
        </div>
        <p style={{textAlign:"center",fontSize:14,margin:"12px 0 0",fontFamily:"var(--font-serif)",color:"var(--text-secondary)"}}>You are your OWN masterpiece...</p>
      </div>
      <div>
        <h2 style={{margin:"0 0 6px",fontSize:21,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>How it works</h2>
        <StepRow state="next" title="Choose a lineage Path" subtitle="Vipassana · Tantra · Vedanta · Bhakti — each cites its root text and era"/>
        <StepRow title="Unlock by abhyāsa — steady practice" subtitle="Each track opens only after you have sat the one before. Never by payment"/>
        <StepRow gate title="Pass the Dīkṣā Gate" subtitle="Practice hours + a written reflection — the sādhaka seal"/>
        <StepRow title="Give by gratitude" subtitle="Dāna appears after practice, never before"/>
      </div>
    </div>
    <div style={{...WRAP,marginTop:48,display:"grid",gridTemplateColumns:"2fr 1fr",gap:24,alignItems:"stretch"}}>
      <TierCard hot chip="membership" chipTone="gold" title="One membership. Every Path.">
        <p style={{margin:"6px 0 0",fontSize:13.5,color:"var(--text-secondary)"}}>$11/month or $88/year — and the guided Sādhaka circle for those who go deep.</p>
        <Button style={{marginTop:16}} onClick={()=>go("membership")}>See the tuition ladder</Button>
      </TierCard>
      <div style={{textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"center",gap:10}}>
        <p style={{margin:0,fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text-tertiary)"}}>Trusted by practitioners</p>
        <img src={T.trustpilot} alt="Trustpilot reviews" width="200" height="33" loading="lazy" style={{borderRadius:8,margin:"0 auto"}}/>
      </div>
    </div>
    <div style={{padding:"48px 20px 28px",textAlign:"center",color:"var(--text-tertiary)",fontSize:12}}><SocialLinks style={{marginBottom:10}}/>© 2026 toUnknown · <a href="https://tounknown.com/terms-of-use" target="_blank" style={{color:"var(--text-tertiary)"}}>Terms</a></div>
  </div>;
}

function DPaths({ openPath }) {
  const T = window.TU;
  return <div style={{...WRAP,paddingTop:40}}>
    <h1 style={{margin:0,fontSize:32,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.4px",color:"var(--ink)"}}>Mārga</h1>
    <p style={{margin:"8px 0 24px",fontFamily:"var(--font-serif)",fontSize:15,color:"var(--text-secondary)"}}>The Paths — a living library of humanity's contemplative roots.</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
      {T.paths.map((p,i)=><PathCard key={p.id} image={p.image} lineage={`${p.tradition} · ${p.source}`} title={p.name} essence={p.essence}
        progress={i===0?17:0} meta={[{label:`${p.steps.filter(s=>!s.gate).length} sittings`}, i===0?{label:"on the path",gold:true}:{label:"first gate free"}]}
        style={{minHeight:240}} onClick={()=>openPath(p)}/>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:32,marginTop:44,alignItems:"start"}}>
      <div>
        <h2 style={{margin:"0 0 4px",fontSize:20,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>Paths awaiting their teachers</h2>
        <p style={{margin:"0 0 6px",fontSize:13,color:"var(--text-secondary)"}}>Each Path opens when its authorized lineage teacher joins the Sangha Circle.</p>
        <div style={{columns:2,columnGap:32}}>
          {T.futurePaths.map(f=><div key={f.name} style={{breakInside:"avoid",display:"flex",alignItems:"center",gap:14,padding:"13px 0",borderBottom:"0.5px solid var(--hairline)"}}>
            <div style={{width:38,height:38,borderRadius:"50%",flex:"0 0 auto",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--surface-2)",border:"0.5px solid var(--hairline)",fontSize:14}}>⛩</div>
            <div style={{minWidth:0}}>
              <b style={{display:"block",fontSize:14.5,letterSpacing:"-0.2px",color:"var(--text-secondary)"}}>{f.name}</b>
              <small style={{fontFamily:"var(--font-serif)",color:"var(--gold-deep)",opacity:0.8,fontSize:12}}>{f.tradition} · {f.source}</small>
            </div>
          </div>)}
        </div>
      </div>
      <TierCard chip="for teachers" title="Teach with us — the Sangha Circle">
        <p style={{margin:"6px 0 0",fontSize:13,color:"var(--text-secondary)"}}>Authentic lineage teachers only. Name your paramparā — who taught your teacher?</p>
        <Button variant="ghost" wide style={{marginTop:14}}>Apply · state your lineage</Button>
      </TierCard>
    </div>
  </div>;
}

function DSangha({ go }) {
  const T = window.TU;
  return <div style={{...WRAP,paddingTop:40}}>
    <h1 style={{margin:0,fontSize:32,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.4px",color:"var(--ink)"}}>Sangha</h1>
    <p style={{margin:"8px 0 24px",fontFamily:"var(--font-serif)",fontSize:15,color:"var(--text-secondary)"}}>Not a feed. A circle of practitioners.</p>
    <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:24,alignItems:"start"}}>
      <div style={{borderRadius:24,border:"0.5px solid rgba(168,120,31,0.45)",boxShadow:"var(--shadow-gold)",background:"rgba(255,255,255,0.62)",backdropFilter:"blur(20px) saturate(1.5)",overflow:"hidden"}}>
        <img src={T.satsang} alt="True meditation — live satsang" width="768" height="400" loading="lazy" style={{display:"block",width:"100%",height:260,objectFit:"cover"}}/>
        <div style={{padding:22}}>
          <Chip tone="gold">live satsang</Chip>
          <h3 style={{margin:"8px 0 0",fontSize:18,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>Monthly live sitting with DYN</h3>
          <p style={{margin:"4px 0 0",fontSize:13.5,color:"var(--text-secondary)"}}>Members sit together, then ask. Recordings join the library.</p>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {T.circles.map(([n,d])=><CircleCard key={n} title={n} description={d} locked onJoin={()=>go("membership")}/>)}
        <p style={{fontSize:13.5,textAlign:"center",margin:"8px 0 0",color:"var(--text-secondary)"}}>While the in-app Sangha is being built, the circle lives on <a href="https://t.me/tounknowndotcom" target="_blank" style={{color:"var(--gold-deep)"}}>Telegram</a>.</p>
      </div>
    </div>
  </div>;
}

function DDana({ go, toast }) {
  const T = window.TU;
  return <div>
    <Interlude style={{paddingTop:56}} size={26} quote="These meditations are offered freely — in the spirit of generosity." attribution="— dāna, the root of a connected life"/>
    <div style={{...WRAP,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18,alignItems:"stretch"}}>
      <TierCard chip="seeker" price="$0" priceNote="· dāna" bullets={["First gate of every Path — free forever","Community, read-only","Give only if it feels true"]}>
        <Button variant="ghost" wide onClick={()=>go("paths")}>Start free</Button>
      </TierCard>
      <TierCard hot chip="student · toUnknown+" chipTone="gold" price="$11" priceNote="/mo or $88/yr"
        bullets={["All four Paths, unlocked by practice","Downloads for offline sitting","Sangha + monthly satsang"]}>
        <GiveSlider style={{marginBottom:14}}/>
        <Button wide onClick={toast}>Become a Student</Button>
      </TierCard>
      <TierCard chip="sādhaka · the guided circle" chipTone="green" price="$33" priceNote="/mo"
        bullets={["Everything in Student","A circle of max 30 with a lineage teacher","Monthly live guidance + Q&A"]}>
        <Button wide onClick={toast}>Enter the circle</Button>
      </TierCard>
      <TierCard chip="founding member" price="$108" priceNote="· once" bullets={["Lifetime Student membership","Your name on the gratitude wall"]}>
        <Button variant="ghost" wide onClick={toast}>Become founding</Button>
      </TierCard>
    </div>
    <div style={{...WRAP,display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,marginTop:40,alignItems:"center"}}>
      <div style={{borderRadius:24,overflow:"hidden",border:"0.5px solid var(--hairline)",boxShadow:"var(--shadow-photo)"}}>
        <img src={T.danaImg} alt="Dāna — the practice of generosity" width="1440" height="756" loading="lazy" style={{display:"block",width:"100%",height:240,objectFit:"cover"}}/>
      </div>
      <div>
        <h2 style={{margin:"0 0 6px",fontSize:20,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>One-time dāna</h2>
        <p style={{margin:"0 0 6px",fontSize:13.5,color:"var(--text-secondary)"}}>No fixed cost. No pressure. Only presence, and the freedom to give — if it feels true.</p>
        <DanaChips style={{margin:"18px 0",justifyContent:"flex-start"}}/>
        <Button onClick={toast}>Give with a free heart</Button>
        <p style={{margin:"12px 0 0"}}><a href="https://www.paypal.com/donate?hosted_button_id=H5VQT3VLQBUBJ" target="_blank" style={{color:"var(--text-tertiary)",fontSize:13}}>or quietly via PayPal</a></p>
      </div>
    </div>
    <Interlude quote="No one is turned away for money." attribution="scholarship — write us one honest paragraph · apply"/>
  </div>;
}

function DProfile() {
  const T = window.TU;
  return <div style={{...WRAP,paddingTop:40}}>
    <h1 style={{margin:0,fontSize:32,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.4px",color:"var(--ink)"}}>Your sādhana</h1>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,marginTop:20,alignItems:"start"}}>
      <div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
          <StatCard value={15} label="minutes sat"/><StatCard value={1} label="tracks completed"/><StatCard value={0} label="gates passed"/>
        </div>
        <p style={{fontSize:14,textAlign:"center",fontFamily:"var(--font-serif)",color:"var(--text-secondary)",margin:"0 0 26px"}}>You are on the Path. Keep sitting.</p>
        <h2 style={{margin:"0 0 6px",fontSize:19,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>Your teacher</h2>
        <TeacherCard avatar={T.teacher.avatar} name={T.teacher.name} lineage={T.teacher.lineage} bio={T.teacher.bio} parampara={T.teacher.parampara}/>
      </div>
      <div>
        <h2 style={{margin:"0 0 6px",fontSize:19,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>Questions</h2>
        {[["Can I practice without paying?","Yes. The first gate of every Path is free, and no one is turned away for money — write one honest paragraph to apply for a scholarship."],
          ["How do Paths unlock?","By practice, not payment. Each track opens after you have sat the one before — the way real retreats and lineages work."],
          ["The Sanskrit we use","Sādhana — practice · Mārga — the path · Dīkṣā — the gate · Abhyāsa — steady repetition · Dāna — generosity · Sangha — community · Satsang — gathering in truth · Sādhaka — committed practitioner · Ācārya — teacher · Paramparā — the unbroken chain of transmission."]
        ].map(([q,a])=><details key={q} style={{borderBottom:"0.5px solid var(--hairline)",padding:"14px 0"}}>
          <summary style={{cursor:"pointer",fontWeight:600,fontSize:15,color:"var(--ink)"}}>{q}</summary>
          <p style={{paddingTop:10,color:"var(--text-secondary)",fontSize:14.5,margin:0}}>{a}</p>
        </details>)}
      </div>
    </div>
  </div>;
}
Object.assign(window, { DHome, DPaths, DSangha, DDana, DProfile });
