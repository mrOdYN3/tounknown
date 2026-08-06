const { StatCard, TeacherCard } = window.ToUnknownDesignSystem_9d38c1;
const SocialLinks = window.ToUnknownDesignSystem_9d38c1.SocialLinks || (()=>null);
const Btn = window.ToUnknownDesignSystem_9d38c1.Button;
function AuthCard() {
  const [session, setSession] = React.useState(window.TULive && window.TULive.session());
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState("idle"); // idle | sending | sent | error
  React.useEffect(() => window.TULive ? window.TULive.onAuth(setSession) : undefined, []);
  if (!window.TULive) return null;

  const card = {padding:"20px", borderRadius:"var(--r-lg)", margin:"20px 0"};

  if (session) return <div className="tu-glass" style={card}>
    <b style={{fontSize:13.5,color:"var(--ink)"}}>{TR("profile.signedin","Signed in")}</b>
    <p style={{margin:"4px 0 10px",fontSize:13,color:"var(--text-secondary)"}}>{session.user.email}</p>
    <Btn variant="ghost" onClick={()=>window.TULive.signOut()} style={{minHeight:40,padding:"0 16px",fontSize:12.5}}>Sign out</Btn>
  </div>;

  return <div className="tu-glass" style={card}>
    <b style={{fontSize:14.5,letterSpacing:"-0.01em",color:"var(--ink)"}}>{TR("profile.signin.title","Sign in to keep your practice")}</b>
    <p style={{margin:"4px 0 10px",fontSize:13,color:"var(--text-secondary)"}}>{TR("profile.signin.sub","No password — we send a link to your email.")}</p>
    {state==="sent" ? <p style={{margin:0,fontFamily:"var(--font-serif)",fontSize:13,color:"var(--gold-deep)"}}>{TR("profile.sent","Check your inbox — the link signs you in. ☸")}</p> :
    <form onSubmit={e=>{e.preventDefault(); if(!email) return; setState("sending");
        window.TULive.signIn(email.trim()).then(()=>setState("sent")).catch(()=>setState("error"));}}
      style={{display:"flex",gap:8}}>
      <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
        style={{flex:1,minWidth:0,padding:"0 16px",minHeight:46,fontSize:14,font:"inherit",borderRadius:"var(--r-full)",
          border:"0.5px solid rgba(24,22,16,0.12)",background:"rgba(255,255,255,0.86)",color:"var(--ink)",outline:"none"}}/>
      <Btn type="submit" disabled={state==="sending"} style={{opacity:state==="sending"?0.6:1}}>
        {state==="sending"?"Sending…":"Send link"}</Btn>
    </form>}
    {state==="error" && <p style={{margin:"8px 0 0",fontSize:12.5,color:"#a33"}}>{TR("profile.error","Could not send — try again in a minute.")}</p>}
  </div>;
}
function ProfileScreen() {
  const T = window.TU;
  const [stats, setStats] = React.useState(null);
  const [session, setSession] = React.useState(window.TULive && window.TULive.session());
  React.useEffect(() => window.TULive ? window.TULive.onAuth(setSession) : undefined, []);
  React.useEffect(() => {
    if (session && window.TULive) window.TULive.loadStats().then(setStats).catch(()=>setStats(null));
    else setStats(null);
  }, [session]);
  const faq = [
    [TR("profile.q1","What is the Tounknown Family?"), '"Generosity is the root of a connected life." The community exists through voluntary giving — a digital Sangha supporting mindful living.'],
    [TR("profile.q2","Can I practice without paying?"), "Yes. The first gate of every Path is free, and no one is turned away for money — write one honest paragraph to apply for a scholarship."],
    [TR("profile.q3","How do Paths unlock?"), "By practice, not payment. Each track opens after you have sat the one before — the way real retreats and lineages work."],
    [TR("profile.q4","The Sanskrit we use"), "Sādhana — daily spiritual practice · Mārga — the path · Dīkṣā — initiation, the gate · Abhyāsa — steady, devoted repetition · Dāna — generosity · Sangha — the community · Satsang — gathering in truth · Sādhaka — the committed practitioner · Ācārya — the teacher · Paramparā — the unbroken chain of transmission; every teacher here names theirs."],
  ];
  return <div style={{padding:"22px 20px 0"}}>
    <h1 className="tu-display-xl" style={{margin:0,color:"var(--ink)"}}>{TR("title.sadhana","Your sādhana")}</h1>
    <AuthCard/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,margin:"18px 0"}}>
      <StatCard value={stats?stats.minutes:0} label={TR("profile.minutes","minutes sat")}/><StatCard value={stats?stats.completed:0} label={TR("profile.sittings","sittings")}/><StatCard value={0} label={TR("profile.gates","gates passed")}/>
    </div>
    <p className="tu-lede" style={{textAlign:"center",fontSize:16,margin:"4px 0 0"}}><b>{TR("profile.onpath.b","You are on the Path.")}</b> {TR("profile.onpath","Keep sitting.")}</p>
    {window.PracticeDiscount ? <window.PracticeDiscount/> : null}
    <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"32px 0 12px"}}>{TR("profile.guide","your guide")}</p>
    <TeacherCard avatar={T.teacher.avatar} name={T.teacher.name} lineage={T.teacher.lineage} bio={T.teacher.bio}/>
    <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"30px 0 10px"}}>{TR("profile.questions","questions")}</p>
    {faq.map(([q,a])=><details key={q} style={{borderBottom:"0.5px solid var(--hairline)",padding:"14px 0"}}>
      <summary style={{cursor:"pointer",fontWeight:600,fontSize:15,color:"var(--ink)"}}>{q}</summary>
      <p style={{paddingTop:10,color:"var(--text-secondary)",fontSize:14.5,margin:0}}>{a}</p>
    </details>)}
    <div style={{padding:"36px 0 20px",textAlign:"center",color:"var(--text-tertiary)",fontSize:12}}>
      <SocialLinks style={{marginBottom:10}}/>
      © 2026 toUnknown
    </div>
  </div>;
}
window.ProfileScreen = ProfileScreen;
