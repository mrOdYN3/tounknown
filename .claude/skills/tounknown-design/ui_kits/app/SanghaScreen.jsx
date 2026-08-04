const { Chip, CircleCard } = window.ToUnknownDesignSystem_9d38c1;
function SanghaScreen({ go }) {
  const T = window.TU;
  return <div style={{padding:"22px 20px 0"}}>
    <h1 style={{margin:0,fontSize:20,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>Sangha</h1>
    <p style={{margin:"8px 0 20px",fontFamily:"var(--font-serif)",color:"var(--text-secondary)"}}>Not a feed. A circle of practitioners.</p>
    <div style={{borderRadius:24,border:"0.5px solid rgba(168,120,31,0.45)",boxShadow:"var(--shadow-gold)",background:"rgba(255,255,255,0.62)",backdropFilter:"blur(20px) saturate(1.5)",overflow:"hidden",marginBottom:16}}>
      <img src={T.satsang} alt="True meditation — live satsang" width="768" height="400" loading="lazy" style={{display:"block",width:"100%",height:150,objectFit:"cover"}}/>
      <div style={{padding:18}}>
        <Chip tone="gold">live satsang</Chip>
        <h3 style={{margin:"8px 0 0",fontSize:17,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>Monthly live sitting with DYN</h3>
        <p style={{margin:"4px 0 0",fontSize:13,color:"var(--text-secondary)"}}>Members sit together, then ask. Recordings join the library.</p>
      </div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {T.circles.map(([n,d],i)=><CircleCard key={n} title={n} description={d} locked onJoin={()=>go("membership")}/>)}
    </div>
    <p style={{fontSize:13.5,textAlign:"center",margin:"20px 0",color:"var(--text-secondary)"}}>While the in-app Sangha is being built, the circle lives on <a href="https://t.me/tounknowndotcom" target="_blank" style={{color:"var(--gold-deep)"}}>Telegram</a>.</p>
  </div>;
}
window.SanghaScreen = SanghaScreen;
