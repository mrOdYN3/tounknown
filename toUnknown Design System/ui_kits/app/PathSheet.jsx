const { Sheet, StepRow, Chip, Button } = window.ToUnknownDesignSystem_9d38c1;
function PathSheet({ path, onClose }) {
  const T = window.TU, t = T.teacher;
  if (!path) return null;
  return <Sheet open={!!path} onClose={onClose} ariaLabel="Path details">
    <div style={{borderRadius:20,overflow:"hidden",height:150,background:`url('${path.image}') center/cover`,marginBottom:16}}></div>
    <span style={{fontFamily:"var(--font-serif)",fontSize:12.5,color:"var(--gold-deep)"}}>{path.tradition} · {path.source}</span>
    <h2 style={{margin:"4px 0",fontSize:18,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>{path.name}</h2>
    <p style={{margin:0,fontSize:13.5,color:"var(--text-secondary)"}}>{path.essence}</p>
    <div style={{display:"flex",alignItems:"center",gap:10,margin:"12px 0 4px"}}>
      <img src={t.avatar} alt={t.name} style={{width:34,height:34,borderRadius:"50%",objectFit:"cover",objectPosition:"top"}}/>
      <div><b style={{fontSize:13.5,color:"var(--ink)"}}>{t.name}</b> <Chip tone="gold" style={{fontSize:10,padding:"2px 8px"}}>paramparā ☸</Chip><br/>
        <span style={{fontFamily:"var(--font-serif)",fontSize:12,color:"var(--text-secondary)"}}>{t.lineage}</span></div>
    </div>
    <p style={{fontFamily:"var(--font-serif)",fontSize:12,color:"var(--gold-deep)",margin:"4px 0 2px",lineHeight:1.7}}>{t.parampara.join(" → ")}</p>
    <div style={{marginTop:14}}>
      {path.steps.map((s,i)=>{
        const prev = path.steps[i-1];
        const state = s.done ? "done" : s.next ? "next" : "locked";
        const sub = s.gate ? "Opens after the sitting before it" : `${s.min} min${s.free?" · free":""}`;
        return <StepRow key={i} gate={!!s.gate} state={s.gate&&!s.done&&!s.next?"idle":state} title={s.t} subtitle={sub}
          lockedNote={state==="locked"&&!s.gate&&prev?`opens when you have sat ${prev.t.length>26?prev.t.slice(0,26)+"…":prev.t}`:undefined}
          action={s.next?(s.gate?"Enter":"Sit"):undefined}/>;
      })}
    </div>
    <Button variant="ghost" wide style={{marginTop:16}}>Full guided audio course ↗</Button>
  </Sheet>;
}
window.PathSheet = PathSheet;
