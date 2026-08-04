/* "Where do I begin?" — a short intake for people who have never sat, and for anyone
   who wants a Path chosen for them rather than browsing five traditions.
   Four questions, one at a time, no scoring language and no urgency. Saved to the
   member's record, so the answer follows them and Mārga can point at it afterwards. */
const { Sheet, Button, Chip } = window.ToUnknownDesignSystem_9d38c1;
const SIcon = window.TUIcon;

const TU_QUESTIONS = [
  {
    id: "experience",
    ask: TR("q.experience","Have you sat before?"),
    note: TR("q.experience.note","There is no wrong answer here — only a different place to start."),
    options: [
      { v: "never",   label: TR("q.experience.never","Never"), sub: TR("q.experience.never.sub","I have not meditated at all") },
      { v: "some",    label: TR("q.experience.some","A little"), sub: TR("q.experience.some.sub","I have tried, on and off") },
      { v: "regular", label: TR("q.experience.regular","I have a practice"), sub: TR("q.experience.regular.sub","I sit most days") },
    ],
  },
  {
    id: "why",
    ask: TR("q.why","What brings you?"),
    note: TR("q.why.note","Say the truest one, not the most impressive one."),
    options: [
      { v: "restless", label: TR("q.why.restless","My mind will not settle"), sub: TR("q.why.restless.sub","restlessness, worry, noise") },
      { v: "grief",    label: TR("q.why.grief","Something heavy"), sub: TR("q.why.grief.sub","loss, pain, an ending") },
      { v: "curious",  label: TR("q.why.curious","I want to see how the mind works"), sub: TR("q.why.curious.sub","curiosity, insight") },
      { v: "love",     label: TR("q.why.love","I am looking for something to love"), sub: TR("q.why.love.sub","devotion, connection") },
      { v: "steady",   label: TR("q.why.steady","I want to be steadier"), sub: TR("q.why.steady.sub","discipline, character") },
    ],
  },
  {
    id: "door",
    ask: TR("q.door","Which door feels open?"),
    note: TR("q.door.note","Every tradition works through a different sense."),
    options: [
      { v: "breath",  label: TR("q.door.breath","The breath"), sub: TR("q.door.breath.sub","watching it, nothing added") },
      { v: "senses",  label: TR("q.door.senses","The body and senses"), sub: TR("q.door.senses.sub","sound, sensation, presence") },
      { v: "inquiry", label: TR("q.door.inquiry","A question"), sub: TR("q.door.inquiry.sub","who is aware? what is left?") },
      { v: "heart",   label: TR("q.door.heart","The heart"), sub: TR("q.door.heart.sub","prayer, surrender, gratitude") },
      { v: "reason",  label: TR("q.door.reason","Reason and will"), sub: TR("q.door.reason.sub","reflection on how to live") },
    ],
  },
  {
    id: "time",
    ask: TR("q.time","How long can you honestly sit?"),
    note: TR("q.time.note","Honestly — a short sitting kept beats a long one abandoned."),
    options: [
      { v: "short",  label: TR("q.time.short","Ten minutes"), sub: TR("q.time.short.sub","most days, if I am kind about it") },
      { v: "medium", label: TR("q.time.medium","Fifteen to twenty"), sub: TR("q.time.medium.sub","I can protect that") },
      { v: "long",   label: TR("q.time.long","Half an hour or more"), sub: TR("q.time.long.sub","I have the time and the will") },
    ],
  },
];

/* The door someone names decides the tradition; the reason they came breaks a tie. */
function suggestPath(a) {
  const byDoor = { breath: "vipassana", senses: "tantra", inquiry: "vedanta", heart: "bhakti", reason: "stoic" };
  const byWhy  = { restless: "vipassana", grief: "bhakti", curious: "vedanta", love: "bhakti", steady: "stoic" };
  return byDoor[a.door] || byWhy[a.why] || "vipassana";
}

function StartHere({ open, onClose, onOpenPath, go }) {
  const [session, setSession] = React.useState(window.TULive && window.TULive.session());
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [result, setResult] = React.useState(null);   // { path, course }
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => window.TULive ? window.TULive.onAuth(setSession) : undefined, []);
  React.useEffect(() => { if (open) { setStep(0); setAnswers({}); setResult(null); } }, [open]);

  if (!open) return null;

  const q = TU_QUESTIONS[step];
  const total = TU_QUESTIONS.length;

  const choose = (v) => {
    const next = { ...answers, [q.id]: v };
    setAnswers(next);
    if (step + 1 < total) { setStep(step + 1); return; }
    finish(next);
  };

  const finish = async (all) => {
    setSaving(true);
    const pathId = suggestPath(all);
    try {
      const paths = await window.TULive.loadPaths();
      const path = paths.find((p) => p.id === pathId) || paths[0];
      const courses = await window.TULive.loadPathCourses(pathId);
      // a beginner starts at the gentlest door: a taster, else the first free course, else the first
      const course = courses.find((c) => c.is_trial) || courses.find((c) => c.free) || courses[0];
      await window.TULive.saveIntake(all, pathId);
      setResult({ path, course });
    } catch (e) {
      setResult({ path: null, course: null });
    }
    setSaving(false);
  };

  /* ---- signed out: this is the one thing we ask for an account first ---- */
  if (!session) {
    return <Sheet open onClose={onClose} ariaLabel="Where to begin">
      <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"0 2px 10px"}}>{TR("start.eyebrow","where to begin")}</p>
      <h2 className="tu-display" style={{margin:0,fontSize:26,color:"var(--ink)"}}>{TR("start.title","Let us find your Path.")}</h2>
      <p style={{margin:"10px 2px 0",font:"400 14px/1.6 var(--font-sans)",color:"var(--text-secondary)"}}>
        {TR("start.blurb","Four questions, about a minute. We keep the answer with your practice so the Path is waiting the next time you open the app — which is why it needs an account first.")}
      </p>
      <Button wide style={{marginTop:20}} onClick={()=>{ onClose(); go && go("profile"); }}>{TR("start.signin","Sign in to begin")}</Button>
      <Button variant="quiet" wide style={{marginTop:6}} onClick={onClose}>{TR("start.notnow","Not now")}</Button>
    </Sheet>;
  }

  /* ---- the answer ---- */
  if (result) {
    const p = result.path, c = result.course;
    return <Sheet open onClose={onClose} ariaLabel="Where to begin">
      <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"0 2px 12px"}}>{TR("start.result","your starting place")}</p>
      {p ? <>
        <div style={{position:"relative",height:150,borderRadius:"var(--r-lg)",overflow:"hidden",
          background:"#15140F",marginBottom:16,boxShadow:"var(--lift-1)"}}>
          {p.image && <img src={p.image} alt="" style={{width:"100%",height:"100%",objectFit:"cover",
            objectPosition:"center top"}}/>}
        </div>
        <p className="tu-eyebrow" style={{margin:"0 2px 6px"}}>{p.tradition} · {p.source}</p>
        <h2 className="tu-display" style={{margin:0,fontSize:26,color:"var(--ink)"}}>{p.name}</h2>
        <p style={{margin:"8px 2px 0",font:"400 14px/1.6 var(--font-sans)",color:"var(--text-secondary)"}}>{p.essence}</p>
        {c && <p style={{margin:"14px 2px 0",font:"400 14px/1.6 var(--font-serif)",color:"var(--gold-deep)"}}>
          {TR("start.begin.with","Begin with")} <b style={{fontWeight:400,color:"var(--ink)"}}>{c.title}</b>.
        </p>}
        <Button wide style={{marginTop:20}} onClick={()=>{ onClose(); onOpenPath && onOpenPath(p); }}>
          {TR("start.open","Open this Path")}</Button>
        <Button variant="quiet" wide style={{marginTop:6}} onClick={()=>{ setResult(null); setStep(0); setAnswers({}); }}>
          {TR("start.retake","Answer again")}</Button>
        <p style={{margin:"16px 2px 0",font:"400 12.5px/1.6 var(--font-sans)",color:"var(--text-tertiary)"}}>
          {TR("start.nothinglocked","Nothing is locked to this. Every Path stays open — this is only where we would start you.")}
        </p>
      </> : <p style={{margin:0,color:"var(--text-secondary)"}}>Could not reach the Paths just now. Please try again.</p>}
    </Sheet>;
  }

  /* ---- the questions ---- */
  return <Sheet open onClose={onClose} ariaLabel="Where to begin">
    <div style={{display:"flex",alignItems:"center",gap:10,margin:"0 2px 16px"}}>
      <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:0,flex:1}}>{TR("start.question","question")} {step+1} / {total}</p>
      {step > 0 && <button onClick={()=>setStep(step-1)} className="tu-press"
        style={{background:"none",border:0,cursor:"pointer",font:"500 11.5px/1 var(--font-sans)",
          color:"var(--text-tertiary)",padding:"6px 2px"}}>{TR("start.back","Back")}</button>}
    </div>

    <div aria-hidden="true" style={{display:"flex",gap:5,margin:"0 2px 20px"}}>
      {TU_QUESTIONS.map((_, i) => <span key={i} style={{flex:1,height:3,borderRadius:99,
        background: i <= step ? "var(--gold-deep)" : "rgba(25,24,19,0.10)",
        transition:"background-color .4s var(--ease-out)"}}/>)}
    </div>

    <h2 className="tu-display" style={{margin:0,fontSize:25,color:"var(--ink)"}}>{q.ask}</h2>
    <p style={{margin:"8px 2px 18px",font:"400 13.5px/1.6 var(--font-sans)",color:"var(--text-secondary)"}}>{q.note}</p>

    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {q.options.map((o) => (
        <button key={o.v} onClick={()=>choose(o.v)} className="tu-press"
          style={{display:"flex",alignItems:"center",gap:12,width:"100%",textAlign:"left",cursor:"pointer",
            font:"inherit",minHeight:62,padding:"12px 14px",borderRadius:"var(--r-md)",
            background:"rgba(255,255,255,0.62)",
            WebkitBackdropFilter:"var(--glass-blur)", backdropFilter:"var(--glass-blur)",
            border:"0.5px solid rgba(24,22,16,0.10)",
            boxShadow:"inset 0 1px 0 rgba(255,255,255,0.85), var(--lift-1)"}}>
          <span style={{flex:1,minWidth:0}}>
            <b style={{display:"block",font:"600 14px/1.35 var(--font-sans)",letterSpacing:"-0.01em",color:"var(--ink)"}}>{o.label}</b>
            <small style={{color:"var(--text-tertiary)",fontSize:12.5}}>{o.sub}</small>
          </span>
          <span aria-hidden="true" style={{color:"var(--text-tertiary)",flex:"0 0 auto"}}>
            <SIcon name="chevron" size={16}/></span>
        </button>
      ))}
    </div>

    {saving && <p style={{margin:"16px 2px 0",font:"400 13px/1.6 var(--font-serif)",color:"var(--gold-deep)"}}>
      {TR("start.finding","Finding your Path…")}</p>}
  </Sheet>;
}
window.StartHere = StartHere;
window.TU_SUGGEST_PATH = suggestPath;
