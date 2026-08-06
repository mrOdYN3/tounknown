const { Chip, CircleCard } = window.ToUnknownDesignSystem_9d38c1;
const SeatPanel = () => (window.TUCircleSeat ? <window.TUCircleSeat/> : null);
function SanghaScreen({ go }) {
  const T = window.TU;
  return <div>
    <div style={{position:"relative",height:260,overflow:"hidden",marginBottom:4}}>
      <div style={{position:"absolute",inset:0,background:`url('${T.sanghaHall}') 50% 48%/cover`,backgroundColor:"#1A1008"}}/>
      <div style={{position:"absolute",inset:0,
        background:"linear-gradient(180deg,rgba(11,11,16,0.30) 0%,rgba(251,250,247,0.05) 58%,var(--paper-1) 100%)"}}/>
    </div>
    <div style={{padding:"0 20px"}}>
    <h1 className="tu-display-xl" style={{margin:0,color:"var(--ink)"}}>{TR("sangha.title","Sangha")}</h1>
    <p className="tu-lede" style={{margin:"12px 0 24px"}}><b>{TR("sangha.lede.b","Not a feed.")}</b> {TR("sangha.lede","A circle of practitioners.")}</p>
    </div>
    {/* If you pay for the circle, the circle should be somewhere you can see. */}
    <div style={{margin:"0 -20px 20px"}}><SeatPanel/></div>
    <div style={{padding:"0 20px"}}>
    <div style={{borderRadius:24,border:"0.5px solid rgba(168,120,31,0.45)",boxShadow:"var(--shadow-gold)",background:"rgba(255,255,255,0.62)",backdropFilter:"blur(20px) saturate(1.5)",overflow:"hidden",marginBottom:16}}>
      <img src={T.satsang} alt="True meditation — live satsang" width="768" height="400" loading="lazy" style={{display:"block",width:"100%",height:150,objectFit:"cover"}}/>
      <div style={{padding:18}}>
        <Chip tone="gold">{TR("sangha.satsang","live satsang")}</Chip>
        <h3 style={{margin:"8px 0 0",fontSize:17,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>{TR("sangha.monthly","Monthly live sitting with DYNN")}</h3>
        <p style={{margin:"4px 0 0",fontSize:13,color:"var(--text-secondary)"}}>{TR("sangha.satsang.desc","Members sit together, then ask. Recordings join the library.")}</p>
      </div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {T.circles.map(([n,d],i)=><CircleCard key={n} title={n} description={d} locked onJoin={()=>go("membership")}/>)}
    </div>
    <p style={{fontSize:13.5,textAlign:"center",margin:"20px 0",color:"var(--text-secondary)"}}>{TR("sangha.telegram","While the in-app Sangha is being built, the circle lives on")} <a href="https://t.me/tounknowndotcom" target="_blank" style={{color:"var(--gold-deep)"}}>Telegram</a>.</p>
    </div>
  </div>;
}
window.SanghaScreen = SanghaScreen;
