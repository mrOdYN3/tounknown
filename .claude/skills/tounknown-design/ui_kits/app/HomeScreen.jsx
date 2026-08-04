const { Orb, Button, Chip, Interlude, PathCard, TierCard, StepRow } = window.ToUnknownDesignSystem_9d38c1;
const SocialLinks = window.ToUnknownDesignSystem_9d38c1.SocialLinks || (()=>null);
function HomeScreen({ openPath, go }) {
  const T = window.TU;
  return <div>
    <div style={{position:"relative",minHeight:500,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"56px 20px 44px",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`url('${T.hero}') center 30%/cover`,backgroundColor:"#0B0B10"}}></div>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 90% 70% at 50% 52%,rgba(11,11,16,0.6) 0%,rgba(11,11,16,0.35) 55%,rgba(11,11,16,0.7) 100%)"}}></div>
      <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <img src="../../assets/wordmark-white.png" alt="toUnknown" style={{width:250,height:"auto",display:"block",marginBottom:18}}/>
        <p style={{margin:"0 0 8px",fontFamily:"var(--font-serif)",fontSize:11.5,letterSpacing:"2.5px",textTransform:"uppercase",color:"rgba(245,244,240,0.88)",textWrap:"balance"}}>{T.brand.tagline}</p>
        <p style={{margin:"0 0 30px",fontFamily:"var(--font-serif)",fontSize:14,color:"rgba(255,255,255,0.68)"}}>{T.brand.subline}</p>
        <div style={{display:"flex",gap:12,justifyContent:"center"}}>
          <Button onClick={()=>go("paths")}>Begin a Path</Button>
          <Button variant="ghost" onClick={()=>openPath(T.paths[0])}>Sit 15 min free</Button>
        </div>
      </div>
    </div>
    <Interlude quote={T.brand.philosophy} attribution="— the toUnknown way"/>
    <section style={{padding:"0 20px",textAlign:"center"}}>
      <h2 style={{margin:0,fontSize:19,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"3px",color:"var(--ink)"}}>FEATURED</h2>
      <p style={{margin:"2px 0 4px",fontSize:12,letterSpacing:"2px",color:"var(--text-secondary)",fontFamily:"var(--font-serif)"}}>MEDITATION TECHNIQUES</p>
      <p style={{margin:"0 0 22px",color:"var(--gold-deep)"}}>↓</p>
      <div style={{display:"flex",justifyContent:"center",margin:"0 0 26px"}}>
        <div style={{width:150,height:150,transform:"rotate(45deg)",overflow:"hidden",boxShadow:"var(--shadow-photo)"}}>
          <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=789,fit=crop/d95DMJoWQZi9KZO2/shiva-meditation-online-A85Vy47MEOF7lOJL.jpg" alt="Shiva Nataraja" style={{width:"100%",height:"100%",objectFit:"cover",transform:"rotate(-45deg) scale(1.42)"}}/>
        </div>
      </div>
      <div style={{textAlign:"left",display:"flex",flexDirection:"column",gap:20}}>
        <div style={{background:"rgba(255,255,255,0.62)",backdropFilter:"blur(20px) saturate(1.5)",WebkitBackdropFilter:"blur(20px) saturate(1.5)",border:"0.5px solid var(--hairline)",borderRadius:24,padding:20,boxShadow:"var(--shadow-card)"}}>
          <h3 style={{margin:0,fontSize:17,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>Vigyan Bhairav Tantra</h3>
          <p style={{margin:"10px 0 16px",fontSize:13.5,color:"var(--text-secondary)"}}>112 Guided Audio Meditation techniques by Shiva (Vijñana Bhairava Tantra). An ancient Indian scripture unveils 112 transformative techniques guiding seekers toward <b style={{color:"var(--ink)"}}>spiritual awakening, self-realization.</b></p>
          <Button onClick={()=>openPath(T.paths[1])}>Let's try</Button>
        </div>
        <div style={{background:"rgba(255,255,255,0.62)",backdropFilter:"blur(20px) saturate(1.5)",WebkitBackdropFilter:"blur(20px) saturate(1.5)",border:"0.5px solid var(--hairline)",borderRadius:24,padding:20,boxShadow:"var(--shadow-card)"}}>
          <h3 style={{margin:0,fontSize:17,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>Vipassana Meditation</h3>
          <p style={{margin:"10px 0 16px",fontSize:13.5,color:"var(--text-secondary)"}}>An ancient technique rediscovered by Gautama Buddha over 2500 years ago — three fundamental elements: <b style={{color:"var(--ink)"}}>Sīla</b> (moral conduct), <b style={{color:"var(--ink)"}}>Samadhi</b> (focused attention and equanimity), <b style={{color:"var(--ink)"}}>Pañña</b> (wisdom and insight).</p>
          <Button onClick={()=>openPath(T.paths[0])}>Start!</Button>
        </div>
      </div>
    </section>
    <section style={{padding:"0 20px",marginTop:34}}>
      <h2 style={{margin:"0 0 4px",fontSize:18,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>The four Paths</h2>
      <p style={{margin:"0 0 14px",fontSize:13,color:"var(--text-secondary)"}}>Only the roots — from every ancient tradition. One Path at a time, walked, not browsed.</p>
    </section>
    <div style={{display:"flex",gap:14,overflowX:"auto",scrollSnapType:"x mandatory",padding:"4px 20px 18px"}}>
      {T.paths.map(p=><PathCard key={p.id} layout="row" image={p.image} lineage={`${p.tradition} · ${p.source}`} title={p.name} essence={p.essence} onClick={()=>openPath(p)}/>)}
    </div>
    <Interlude quote="THEREFORE, DON'T TRY" attribution="— on effortless effort"/>
    <section style={{padding:"0 20px",marginBottom:6}}>
      <div style={{borderRadius:24,overflow:"hidden",border:"0.5px solid var(--hairline)",boxShadow:"var(--shadow-photo)"}}>
        <img src={T.masterpiece} alt="You are your own masterpiece — toUnknown" width="768" height="583" loading="lazy" style={{display:"block",width:"100%",height:"auto"}}/>
      </div>
      <p style={{textAlign:"center",fontSize:14,margin:"12px 0 0",fontFamily:"var(--font-serif)",color:"var(--text-secondary)"}}>You are your OWN masterpiece...</p>
    </section>
    <section style={{padding:"0 20px"}}>
      <h2 style={{margin:"20px 0 4px",fontSize:18,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>How it works</h2>
      <StepRow state="next" title="Choose a lineage Path" subtitle="Vipassana · Tantra · Vedanta · Bhakti — each cites its root text and era"/>
      <StepRow title="Unlock by abhyāsa — steady practice" subtitle="Each track opens only after you have sat the one before. Never by payment"/>
      <StepRow gate title="Pass the Dīkṣā Gate" subtitle="Practice hours + a written reflection — the sādhaka seal"/>
      <StepRow title="Give by gratitude" subtitle="Dāna appears after practice, never before. No one is turned away for money"/>
    </section>
    <section style={{padding:"0 20px",marginTop:34}}>
      <TierCard hot chip="membership" chipTone="gold" title="One membership. Every Path.">
        <p style={{margin:"6px 0 0",fontSize:13.5,color:"var(--text-secondary)"}}>$11/month or $88/year — and the guided Sādhaka circle for those who go deep.</p>
        <Button wide style={{marginTop:16}} onClick={()=>go("membership")}>See the tuition ladder</Button>
      </TierCard>
    </section>
    <section style={{padding:"0 20px",marginTop:26,textAlign:"center"}}>
      <p style={{margin:"0 0 10px",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text-tertiary)"}}>Trusted by practitioners</p>
      <img src={T.trustpilot} alt="Trustpilot reviews" width="200" height="33" loading="lazy" style={{borderRadius:8}}/>
    </section>
    <div style={{padding:"36px 20px 20px",textAlign:"center",color:"var(--text-tertiary)",fontSize:12}}><SocialLinks style={{marginBottom:10}}/>© 2026 toUnknown · <a href="https://tounknown.com/terms-of-use" target="_blank" style={{color:"var(--text-tertiary)"}}>Terms</a></div>
  </div>;
}
window.HomeScreen = HomeScreen;
