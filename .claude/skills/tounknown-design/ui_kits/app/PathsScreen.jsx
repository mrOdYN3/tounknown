const { PathCard, TierCard, Chip, StepRow, Button } = window.ToUnknownDesignSystem_9d38c1;
function PathsScreen({ openPath }) {
  const T = window.TU;
  return <div style={{padding:"22px 20px 0"}}>
    <h1 style={{margin:0,fontSize:20,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>Mārga</h1>
    <p style={{margin:"8px 0 20px",fontFamily:"var(--font-serif)",color:"var(--text-secondary)"}}>The Paths — a living library of humanity's contemplative roots.</p>
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {T.paths.map((p,i)=><PathCard key={p.id} image={p.image} lineage={`${p.tradition} · ${p.source}`} title={p.name} essence={p.essence}
        progress={i===0?17:0} meta={[{label:`${p.steps.filter(s=>!s.gate).length} sittings`}, i===0?{label:"on the path",gold:true}:{label:"first gate free"}]}
        onClick={()=>openPath(p)}/>)}
    </div>
    <h2 style={{margin:"30px 0 4px",fontSize:18,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>Paths awaiting their teachers</h2>
    <p style={{margin:"0 0 6px",fontSize:13.5,color:"var(--text-secondary)"}}>Each Path opens when its authorized lineage teacher joins the Sangha Circle.</p>
    {T.futurePaths.map(f=><div key={f.name} style={{display:"flex",alignItems:"center",gap:14,padding:"15px 0",borderBottom:"0.5px solid var(--hairline)"}}>
      <div style={{width:40,height:40,borderRadius:"50%",flex:"0 0 auto",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--surface-2)",border:"0.5px solid var(--hairline)",fontSize:15}}>⛩</div>
      <div style={{flex:1,minWidth:0}}>
        <b style={{display:"block",fontSize:15,letterSpacing:"-0.2px",color:"var(--text-secondary)"}}>{f.name}</b>
        <small style={{fontFamily:"var(--font-serif)",color:"var(--gold-deep)",opacity:0.8,fontSize:12.5}}>{f.tradition} · {f.source}</small>
      </div>
      <a href="mailto:tounknown.com@gmail.com" style={{fontFamily:"var(--font-serif)",fontSize:12,color:"var(--gold-deep)",textDecoration:"none"}}>awaiting its ācārya · apply</a>
    </div>)}
    <div style={{marginTop:20}}>
      <TierCard chip="for teachers" title="Teach with us — the Sangha Circle">
        <p style={{margin:"6px 0 0",fontSize:13,color:"var(--text-secondary)"}}>Authentic lineage teachers only. Name your paramparā — who taught your teacher? Which tradition, which source texts?</p>
        <Button variant="ghost" wide style={{marginTop:14}}>Apply · state your lineage</Button>
      </TierCard>
    </div>
  </div>;
}
window.PathsScreen = PathsScreen;
