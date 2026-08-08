const { PathCard, TierCard, Chip, StepRow, Button } = window.ToUnknownDesignSystem_9d38c1;
function PathsScreen({ openPath }) {
  const T = window.TU;
  const [paths, setPaths] = React.useState(null);
  const [prog, setProg] = React.useState({});
  const [suggested, setSuggested] = React.useState(null);
  const [session, setSession] = React.useState(window.TULive && window.TULive.session());

  React.useEffect(() => window.TULive ? window.TULive.onAuth((s)=>setSession(s)) : undefined, []);
  React.useEffect(() => {
    if (!window.TULive) return;
    window.TULive.loadPaths().then(setPaths).catch(() => setPaths(null));
  }, []);
  React.useEffect(() => {
    if (!window.TULive) return;
    window.TULive.loadProgress().then(setProg).catch(() => setProg({}));
    window.TULive.loadIntake().then((i) => setSuggested(i && i.suggested_path)).catch(() => setSuggested(null));
  }, [session]);

  const all = (paths && paths.length) ? paths : T.paths.map((p)=>({...p, status:"living", kind:"lineage"}));
  const lineage = all.filter((p) => p.status === "living" && p.kind !== "collection");
  const collections = all.filter((p) => p.status === "living" && p.kind === "collection");
  const awaiting = all.filter((p) => p.status === "awaiting");

  const card = (p) => {
    const g = prog[p.id];
    const meta = [];
    if (suggested === p.id) meta.push({ label: TR("paths.suggested","suggested for you"), gold: true });
    if (g && g.total) meta.push({ label: `${g.total} sittings` });
    if (g && g.done) meta.push({ label: TR("paths.onpath","on the path"), gold: true });
    else if (suggested !== p.id) meta.push({ label: TR("paths.firstfree","first gate free") });
    return <PathCard key={p.id} imagePos={p.kind === "collection" ? "center center" : undefined} frost={p.kind !== "collection"} image={p.image} lineage={`${p.tradition} · ${p.source}`} title={p.name}
      essence={p.essence} progress={g ? g.pct : 0} meta={meta} onClick={()=>openPath(p)}/>;
  };

  return <div>
    {/* The monk on his alms round — the living lineage, on the screen that lists the Paths. */}
    <div className="tu-band" style={{height:"clamp(260px, 38vh, 380px)"}}>
      <div className="tu-band-img" style={{backgroundImage:`url('${T.monkBowl}')`,
        backgroundSize:"cover",backgroundPosition:"18% 30%"}}/>
    </div>
    <div style={{padding:"0 20px"}}>
    <h1 className="tu-display-xl" style={{margin:0,color:"var(--ink)"}}>Mārga</h1>
    <p className="tu-lede" style={{margin:"12px 0 18px"}}><b>{TR("paths.lede.b","The Paths.")}</b> {TR("paths.lede","A living library of humanity's contemplative roots.")}</p>
    <button onClick={()=>window.TUStart && window.TUStart()} className="tu-press tu-inline-cta"
      style={{display:"flex",alignItems:"center",gap:9,width:"100%",justifyContent:"center",cursor:"pointer",
        font:"600 12.5px/1 var(--font-sans)",minHeight:46,marginBottom:22,borderRadius:"var(--r-full)",
        background:"rgba(217,164,65,0.10)",border:"0.5px solid rgba(168,120,31,0.28)",color:"var(--gold-deep)"}}>
      {suggested ? TR("paths.again","Answer again — find another starting place") : TR("paths.start","Not sure where to start? Four questions")}
    </button>
    <div className="tu-grid" style={{display:"flex",flexDirection:"column",gap:16}}>{lineage.map(card)}</div>

    {collections.length > 0 && <>
      <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"34px 0 10px"}}>for the whole family</p>
      <p className="tu-lede" style={{marginBottom:16,fontSize:19}}><b>Not a lineage Path.</b> Short sittings and stories for children, and whoever sits beside them.</p>
      <div className="tu-grid" style={{display:"flex",flexDirection:"column",gap:16}}>{collections.map(card)}</div>
    </>}

    <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"34px 0 10px"}}>{TR("paths.awaiting","awaiting their teachers")}</p>
    <p className="tu-lede" style={{marginBottom:10,fontSize:19}}><b>Each Path opens</b> when its authorized lineage teacher joins the Sangha Circle.</p>
    {awaiting.map(f=><div key={f.id||f.name} style={{display:"flex",alignItems:"center",gap:14,padding:"15px 0",borderBottom:"0.5px solid var(--hairline)"}}>
      <div style={{width:40,height:40,borderRadius:"50%",flex:"0 0 auto",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--surface-2)",border:"0.5px solid var(--hairline)",fontSize:15}}>⛩</div>
      <div style={{flex:1,minWidth:0}}>
        <b style={{display:"block",fontSize:15,letterSpacing:"-0.2px",color:"var(--text-secondary)"}}>{f.name}</b>
        <small style={{fontFamily:"var(--font-serif)",color:"var(--gold-deep)",opacity:0.8,fontSize:12.5}}>{f.tradition} · {f.source}</small>
      </div>
      <a href={`mailto:tounknown.com@gmail.com?subject=${encodeURIComponent("Teaching application — "+f.name)}`}
        style={{fontFamily:"var(--font-serif)",fontSize:12,color:"var(--gold-deep)",textDecoration:"none"}}>awaiting its ācārya · apply</a>
    </div>)}
    <div style={{marginTop:20}}>
      <TierCard chip="for teachers" title="Teach with us — the Sangha Circle">
        <p style={{margin:"6px 0 0",fontSize:13,color:"var(--text-secondary)"}}>Authentic lineage teachers only. Who taught your teacher? Which tradition, which source texts?</p>
        <Button variant="ghost" wide style={{marginTop:14}}
          onClick={()=>{window.location.href="mailto:tounknown.com@gmail.com?subject="+encodeURIComponent("Teaching application — Sangha Circle")+"&body="+encodeURIComponent("My tradition:\nWho taught me:\nSource texts I teach from:\nYears of practice:\n");}}>
          Apply · state your lineage</Button>
      </TierCard>
    </div>
    </div>
  </div>;
}
window.PathsScreen = PathsScreen;
