const { Chip, CircleCard } = window.ToUnknownDesignSystem_9d38c1;
const SeatPanel = () => (window.TUCircleSeat ? <window.TUCircleSeat/> : null);
function SanghaScreen({ go }) {
  const T = window.TU;
  return <div>
    {/* No hero here for now — the artwork moved to Sādhana. */}
    <div style={{padding:"0 20px"}}>
    <h1 className="tu-display-xl" style={{margin:0,color:"var(--ink)"}}>{TR("sangha.title","Sangha")}</h1>
    <p className="tu-lede" style={{margin:"12px 0 24px"}}><b>{TR("sangha.lede.b","Not a feed.")}</b> {TR("sangha.lede","A circle of practitioners.")}</p>
    </div>
    {/* If you pay for the circle, the circle should be somewhere you can see. */}
    <div style={{margin:"0 -20px 20px"}}><SeatPanel/></div>
    <div style={{padding:"0 20px"}}>
    <div style={{borderRadius:24,border:"0.5px solid rgba(168,120,31,0.45)",boxShadow:"var(--shadow-gold)",background:"rgba(255,255,255,0.62)",backdropFilter:"blur(20px) saturate(1.5)",overflow:"hidden",marginBottom:16}}>
      {/* The photograph is a cold blue against a room of paper-white and temple gold, so it is
          veiled rather than printed: held back to 78%, saturation eased, and faded into the card
          at its foot so there is no hard seam between picture and paper. It reads as light
          through glass instead of a stock photo dropped into a box. */}
      <div style={{position:"relative",height:150,overflow:"hidden"}}>
        {/* Masked, not overlaid. A white gradient laid on top only approximates the card beneath
            and leaves a seam wherever the two disagree; masking fades the photograph's own alpha
            to nothing, so whatever is behind simply arrives. No edge to see at any opacity. */}
        <img src={T.satsang} alt="True meditation — live satsang" width="1400" height="788" loading="lazy"
          style={{display:"block",width:"100%",height:"100%",objectFit:"cover",objectPosition:"58% 44%",
            opacity:0.8,filter:"saturate(0.86) contrast(0.97)",
            WebkitMaskImage:"linear-gradient(180deg,#000 0%,#000 46%,rgba(0,0,0,0.55) 76%,rgba(0,0,0,0) 100%)",
            maskImage:"linear-gradient(180deg,#000 0%,#000 46%,rgba(0,0,0,0.55) 76%,rgba(0,0,0,0) 100%)"}}/>
        <div aria-hidden="true" style={{position:"absolute",inset:0,
          background:"radial-gradient(120% 90% at 62% 44%,rgba(217,164,65,0.16) 0%,rgba(217,164,65,0) 62%)",
          mixBlendMode:"soft-light"}}/>
      </div>
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
