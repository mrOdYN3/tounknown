const { Sheet, StepRow, Chip, Button } = window.ToUnknownDesignSystem_9d38c1;
const Icon = window.TUIcon;
const mins = (sec) => {
  if (!sec) return null;
  const m = Math.round(sec / 60);
  return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60 ? (m % 60) + " min" : ""}`.trim() : `${m} min`;
};
function PathSheet({ path, onClose }) {
  const T = window.TU, t = T.teacher;
  const [courses, setCourses] = React.useState([]);
  const [course, setCourse] = React.useState(null);   // selected course
  const [tracks, setTracks] = React.useState(null);
  const [session, setSession] = React.useState(window.TULive && window.TULive.session());
  const [member, setMember] = React.useState(window.TULive && window.TULive.member());
  const [playing, setPlaying] = React.useState(null); // track id
  const [unlockedIdx, setUnlockedIdx] = React.useState(0); // abhyāsa: opens by sitting
  const [needLogin, setNeedLogin] = React.useState(false);
  const [scrubNote, setScrubNote] = React.useState(false);
  const [circleNote, setCircleNote] = React.useState(false);
  const [gatesPassed, setGatesPassed] = React.useState(new Set());
  const [gateOpen, setGateOpen] = React.useState(null);      // the gate track being written for
  const [reflection, setReflection] = React.useState("");
  const [gateErr, setGateErr] = React.useState(null);
  const PAGE = 12;
  const [shown, setShown] = React.useState(PAGE);   // how many tracks of this course are listed
  const selRef = React.useRef(null);
  React.useEffect(() => {
    const el = selRef.current;
    if (el) el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [course]);
  const [courseSeconds, setCourseSeconds] = React.useState({});
  React.useEffect(() => {
    if (!window.TULive) return;
    window.TULive.loadCourseStats()
      .then((rows) => setCourseSeconds(Object.fromEntries(rows.map((r) => [r.course_id, r.seconds]))))
      .catch(() => {});
  }, []);
  const audioRef = React.useRef(null);

  React.useEffect(() => window.TULive ? window.TULive.onAuth((sn,m)=>{setSession(sn);setMember(m);}) : undefined, []);

  // Which track the <audio> element currently holds. Reassigning src restarts playback from
  // zero, so pause/resume must not touch it — that was silently discarding whole sittings.
  const loadedRef = React.useRef(null);
  const stopAudio = () => {
    const a = audioRef.current;
    if (a) { a.pause(); a.removeAttribute("src"); }
    loadedRef.current = null; setPlaying(null);
  };

  const selectCourse = React.useCallback((c) => {
    setCourse(c); setTracks(null); setUnlockedIdx(0); setNeedLogin(false); stopAudio();
    window.TULive.loadCourseTracks(c.id).then((ts) => {
      setTracks(ts);
      const gateIds = ts.filter((x) => x.is_gate).map((x) => x.id);
      if (gateIds.length) window.TULive.loadGatesPassed(gateIds).then(setGatesPassed).catch(() => {});
      window.TULive.loadUnlocks(ts.map((x) => x.id)).then((done) => {
        const sits = ts.filter((x) => x.is_sitting !== false);
        let i = 0; while (i < sits.length && done.has(sits[i].id)) i++;
        setUnlockedIdx(i);   // how many sittings are behind you
      });
    }).catch(() => setTracks([]));
  }, []);

  React.useEffect(() => {
    setCourses([]); setCourse(null); setTracks(null); setUnlockedIdx(0); setNeedLogin(false); setScrubNote(false); setGateOpen(null); setGatesPassed(new Set()); stopAudio();
    if (path && window.TULive) {
      window.TULive.loadPathCourses(path.id).then((cs) => {
        setCourses(cs);
        if (cs.length) selectCourse(cs[0]);
      }).catch(() => setCourses([]));
    }
  }, [path, selectCourse]);

  if (!path) return null;

  const free = !!(course && course.free);
  const hasMembership = !!session && window.TULive.isMember();
  const inCircle = !!session && window.TULive.isSadhaka && window.TULive.isSadhaka();
  const allowed = free || hasMembership;
  const canPlay = (tr) => allowed || tr.free_preview === true;   // the opening is always open

  const sit = (tr) => {
    const a = audioRef.current;
    if (playing === tr.id) { a.pause(); setPlaying(null); return; }
    if (!canPlay(tr)) { setNeedLogin(true); return; }
    // a Dīkṣā gate asks for words before it asks for silence
    if (tr.is_gate && !gatesPassed.has(tr.id)) {
      if (!session) { setNeedLogin(true); return; }
      setGateOpen(tr); setReflection(""); setGateErr(null); return;
    }
    setNeedLogin(false);
    if (loadedRef.current !== tr.id) {          // a different track — load it
      a.src = window.TULive.streamUrl(tr.id);
      loadedRef.current = tr.id;
    }                                           // same track — resume where it stopped
    a.play().then(() => setPlaying(tr.id)).catch(() => setNeedLogin(true));
  };

  const liveTracks = tracks && tracks.length ? tracks : null;

  return <Sheet open={!!path} onClose={onClose} className="tu-sheet-desktop" ariaLabel="Path details">
    {/* Cover art. Some covers are photographs, some are illustrations on white —
        a blurred copy behind lets either sit whole, without an arbitrary crop. */}
    {(() => {
      const art = (course && course.cover_url) || path.image;
      return <div style={{position:"relative",height:172,borderRadius:"var(--r-lg)",overflow:"hidden",
        marginBottom:18,background:"#15140F",boxShadow:"var(--lift-1)"}}>
        <div aria-hidden="true" style={{position:"absolute",inset:0,
          background:"linear-gradient(180deg,#1B1A15 0%,#0C0B08 100%)"}}/>
        <img key={art} src={art} alt="" style={{position:"relative",display:"block",width:"100%",height:"100%",
          objectFit:"cover",objectPosition:"center top",animation:"tu-fade .5s var(--ease-out)"}}/>
      </div>;
    })()}
    <p className="tu-eyebrow" style={{margin:"0 0 6px"}}>{path.tradition} · {path.source}</p>
    <h2 className="tu-display" style={{margin:0,fontSize:26,color:"var(--ink)"}}>{path.name}</h2>
    <p style={{margin:"7px 0 0",font:"400 14px/1.5 var(--font-sans)",color:"var(--text-secondary)"}}>{path.essence}</p>
    <div style={{display:"flex",alignItems:"center",gap:10,margin:"12px 0 4px"}}>
      <img src={t.avatar} alt={t.name} style={{width:34,height:34,borderRadius:"50%",objectFit:"cover",objectPosition:"top"}}/>
      <div><b style={{fontSize:14,letterSpacing:"-0.01em",color:"var(--ink)"}}>{t.name}</b> <Chip tone="gold">Guide</Chip><br/>
        <span style={{font:"400 12.5px/1.5 var(--font-serif)",color:"var(--text-secondary)"}}>{t.lineage}</span></div>
    </div>

    <audio ref={audioRef} onEnded={()=>{
      const done = playing;
      setPlaying(null);
      if (!done || !window.TULive) return;
      window.TULive.recordPractice(done, audioRef.current.duration, true);
      const track = (liveTracks || []).find(x => x.id === done);
      if (track && track.is_sitting === false) return;   // a talk unlocks nothing
      // the next sitting opens only if the server agrees this one was really sat
      window.TULive.saveUnlock(done).then((granted) => {
        if (!granted) { setScrubNote(true); return; }
        setScrubNote(false);
        if (liveTracks) {
          const sits = liveTracks.filter(x => x.is_sitting !== false);
          const n = sits.findIndex(x => x.id === done);
          if (n >= 0 && n === unlockedIdx) setUnlockedIdx(n + 1);
        }
      });
    }} style={{display:"none"}}/>

    {/* The Dīkṣā Gate. Practice is not enough on its own here — the tradition asks you to
        put it into your own words, and a teacher reads what you write. */}
    {gateOpen && <div style={{margin:"14px 0",padding:"20px 18px",borderRadius:"var(--r-lg)",
      background:"rgba(217,164,65,0.09)",border:"0.5px solid rgba(168,120,31,0.34)",
      boxShadow:"var(--lift-1)"}}>
      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
        <span style={{display:"grid",placeItems:"center",width:34,height:34,borderRadius:"50%",
          background:"rgba(217,164,65,0.2)",color:"var(--gold-deep)"}}><Icon name="gate" size={17}/></span>
        <p className="tu-eyebrow" style={{margin:0,color:"var(--gold-deep)"}}>
          {TR("gate.eyebrow","the dīkṣā gate")}</p>
      </div>
      <h3 style={{margin:"0 0 8px",font:"400 20px/1.25 var(--font-serif)",letterSpacing:"-0.01em",color:"var(--ink)"}}>
        {TR("gate.title","Before you go deeper, say where you are.")}</h3>
      <p style={{margin:"0 0 14px",font:"400 13.5px/1.65 var(--font-sans)",color:"var(--text-secondary)"}}>
        {inCircle
          ? TR("gate.blurb.circle","What has changed since you began sitting? What is harder than you expected? Write plainly — a teacher in your circle reads this and writes back.")
          : TR("gate.blurb","What has changed since you began sitting? What is harder than you expected? Write plainly — nothing scores this. It stays yours.")}</p>
      <textarea value={reflection} onChange={(e)=>{ setReflection(e.target.value); setGateErr(null); }}
        rows={6} placeholder={TR("gate.placeholder","In your own words…")}
        style={{width:"100%",boxSizing:"border-box",padding:"13px 15px",borderRadius:16,resize:"vertical",
          font:"400 14px/1.6 var(--font-sans)",color:"var(--ink)",background:"rgba(255,255,255,0.86)",
          border:"0.5px solid rgba(24,22,16,0.14)",outline:"none"}}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,marginTop:6}}>
        <small style={{color: reflection.trim().length >= 120 ? "var(--sage)" : "var(--text-tertiary)",fontSize:12}}>
          {reflection.trim().length}/120</small>
        {gateErr && <small style={{color:"#a33",fontSize:12,flex:1,textAlign:"right"}}>{gateErr}</small>}
      </div>
      <Button wide style={{marginTop:12}} disabled={reflection.trim().length < 120}
        onClick={()=>{
          window.TULive.submitReflection(gateOpen.id, reflection.trim())
            .then((r)=>{ setCircleNote(!!(r && r.willBeRead));
                        setGatesPassed(new Set([...gatesPassed, gateOpen.id]));
                        const t = gateOpen; setGateOpen(null); setReflection("");
                        setTimeout(()=>sit(t), 60); })
            .catch((e)=>setGateErr(String(e.message||e)));
        }}>{TR("gate.submit","Pass the gate")}</Button>
      <Button variant="quiet" wide style={{marginTop:6}} onClick={()=>setGateOpen(null)}>
        {TR("gate.later","Not yet")}</Button>
    </div>}

    {circleNote && <div style={{margin:"10px 0",padding:"12px 15px",borderRadius:14,
      background:"rgba(122,138,106,0.12)",border:"0.5px solid rgba(122,138,106,0.3)",
      font:"400 13px/1.55 var(--font-serif)",color:"var(--sage-deep, #55603F)"}}>
      {TR("gate.sent.circle","Your reflection has gone to your teacher. You will hear back inside the circle.")}
    </div>}

    {scrubNote && <div style={{margin:"10px 0",padding:"12px 15px",borderRadius:14,
      background:"rgba(217,164,65,0.09)",border:"0.5px solid rgba(168,120,31,0.22)",
      font:"400 13px/1.55 var(--font-serif)",color:"var(--gold-deep)"}}>
      {TR("sheet.scrub","The next sitting opens after this one has been sat through — not skipped. ☸")}
    </div>}

    {courses.length > 1 && <div style={{margin:"18px 0 4px"}}>
      <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"0 2px 10px"}}>
        {TR("sheet.course","course")} {Math.max(1, courses.findIndex(c=>course&&c.id===course.id)+1)} / {courses.length}
        <span style={{color:"var(--text-tertiary)",fontWeight:500,letterSpacing:"0.04em",
          textTransform:"none",marginLeft:8}}>{TR("sheet.swipe","— swipe to change")}</span></p>

      {/* A strip of covers. Swipe through the path's courses; the one under the gold ring
          is the one listed below. Small, quiet, and the artwork does the identifying. */}
      <div className="tu-scroll-x" style={{display:"flex",gap:10,overflowX:"auto",
        scrollSnapType:"x mandatory",padding:"2px 2px 10px",WebkitOverflowScrolling:"touch"}}>
        {courses.map((c) => {
          const sel = course && c.id === course.id;
          return <button key={c.id} onClick={()=>selectCourse(c)} aria-label={c.title}
            aria-current={sel ? "true" : undefined} ref={sel ? selRef : null}
            style={{flex:"0 0 auto",width:60,height:60,padding:0,cursor:"pointer",borderRadius:16,
              scrollSnapAlign:"center",position:"relative",overflow:"hidden",background:"#15140F",
              border:"0.5px solid rgba(24,22,16,0.10)",
              outline: sel ? "2px solid var(--gold-bright)" : "2px solid transparent",
              outlineOffset: 1,
              opacity: sel ? 1 : 0.55,
              transform: sel ? "scale(1)" : "scale(0.93)",
              boxShadow: sel ? "var(--lift-2)" : "none",
              transition:"opacity .34s var(--ease-out), transform .38s var(--ease-spring), outline-color .3s"}}>
            {c.cover_url && <img src={c.cover_url} alt="" style={{width:"100%",height:"100%",
              objectFit:"cover",objectPosition:"center top",background:"#15140F",display:"block"}}/>}
            {c.free && <span aria-hidden="true" style={{position:"absolute",left:0,right:0,bottom:0,
              padding:"2px 0 3px",font:"600 8px/1 var(--font-sans)",letterSpacing:"0.06em",
              textAlign:"center",textTransform:"uppercase",color:"#15140F",
              background:"var(--gold-bright)"}}>{c.is_trial ? "taster" : "free"}</span>}
          </button>;
        })}
      </div>

      <h3 style={{margin:"2px 2px 2px",font:"600 15px/1.35 var(--font-sans)",
        letterSpacing:"-0.015em",color:"var(--ink)"}}>{course ? course.title : ""}</h3>
      <p style={{margin:"3px 2px 0",fontSize:12.5,color:"var(--text-tertiary)"}}>
        {course ? [`${course.sittingCount ?? course.trackCount} ${TR("sheet.sittings","sittings")}`, mins(courseSeconds[course.id]),
          course.is_trial ? "a taster — free" : course.free ? "free" : null]
          .filter(Boolean).join(" · ") : ""}</p>

      {course && course.description &&
        <p style={{margin:"10px 2px 0",font:"400 13px/1.6 var(--font-sans)",color:"var(--text-secondary)"}}>
          {course.description}</p>}
    </div>}

    {needLogin && <div style={{margin:"12px 0",padding:"14px 16px",borderRadius:16,background:"rgba(217,164,65,0.10)",border:"0.5px solid rgba(168,120,31,0.25)",fontSize:13.5,color:"var(--gold-deep)",fontFamily:"var(--font-serif)"}}>
      {!session
        ? "Sign in from the Sādhana tab to sit this course. The introductions here are free to hear, and no one is turned away for money."
        : "This course opens with membership. No one is turned away for money — one honest paragraph to tounknown.com@gmail.com is enough."}
      <div style={{marginTop:10}}>
        <Button onClick={()=>{ onClose(); window.TUGo && window.TUGo(session ? "membership" : "profile"); }}
          style={{minHeight:40,padding:"0 18px",fontSize:12.5}}>
          {session ? "See the tuition ladder" : "Go to sign in"}</Button>
      </div>
    </div>}

    <div style={{marginTop:10}}>
      {liveTracks ? (() => {
        // Introductions and talks are listened to, not sat — they never gate anything.
        // Only the guided sittings form the chain.
        const sits = liveTracks.filter((x) => x.is_sitting !== false);
        const sitIndex = new Map(sits.map((x, n) => [x.id, n]));
        return liveTracks.slice(0, shown).map((tr) => {
          const isPlaying = playing === tr.id;
          const talk = tr.is_sitting === false;
          const n = sitIndex.get(tr.id);
          const state = talk ? "open"
            : n < unlockedIdx ? "done" : n === unlockedIdx ? "next" : "locked";
          const prevSit = talk ? null : sits[n - 1];
          const verb = talk ? "listen" : "sit";
          const access = tr.free_preview ? TR("sheet.freehear","free to hear")
            : (course && course.is_trial) ? TR("sheet.taster","taster")
            : free ? TR("sheet.free","free") : allowed ? TR("sheet.member","member")
            : session ? TR("sheet.needmember","opens with membership") : (talk ? TR("sheet.signin.listen","sign in to listen") : TR("sheet.signin","sign in to sit"));
          return <StepRow key={tr.id} gate={!!tr.is_gate} state={state}
            title={tr.title}
            subtitle={[mins(tr.seconds), talk ? TR("sheet.intro","introduction") : null,
              isPlaying ? "sitting now…" : access].filter(Boolean).join(" · ")}
            lockedNote={state==="locked" && prevSit
              ? `${TR("sheet.opens","opens when you have sat")} ${prevSit.title.length>26?prevSit.title.slice(0,26)+"…":prevSit.title}` : undefined}
            action={(talk || state==="next") ? (isPlaying ? TR("sheet.pause","Pause") : talk ? TR("sheet.listen","Listen") : TR("sheet.sit","Sit")) : undefined}
            onAction={()=>sit(tr)}/>;
        });
      })() : tracks === null ? (
        // placeholder rows while the course loads — same height, so the sheet does not jump
        <div aria-hidden="true" style={{opacity:0.5}}>
          {[0,1,2,3,4].map((i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"15px 2px",minHeight:64,
              borderBottom:"0.5px solid var(--hairline)"}}>
              <span style={{width:38,height:38,borderRadius:"50%",flex:"0 0 auto",background:"rgba(25,24,19,0.06)"}}/>
              <span style={{flex:1}}>
                <span style={{display:"block",height:11,width:`${68-i*6}%`,borderRadius:4,background:"rgba(25,24,19,0.08)"}}/>
                <span style={{display:"block",height:9,width:"34%",borderRadius:4,marginTop:8,background:"rgba(25,24,19,0.05)"}}/>
              </span>
            </div>))}
        </div>
      ) : tracks ? <p style={{fontSize:13,color:"var(--text-tertiary)",textAlign:"center",margin:"14px 0"}}>No tracks in this course yet.</p>
        : path.steps.map((s,i)=>{
        const prev = path.steps[i-1];
        const state = s.done ? "done" : s.next ? "next" : "locked";
        const sub = s.gate ? "Opens after the sitting before it" : `${s.min} min${s.free?" · free":""}`;
        return <StepRow key={i} gate={!!s.gate} state={s.gate&&!s.done&&!s.next?"idle":state} title={s.t} subtitle={sub}
          lockedNote={state==="locked"&&!s.gate&&prev?`opens when you have sat ${prev.t.length>26?prev.t.slice(0,26)+"…":prev.t}`:undefined}
          action={s.next?(s.gate?"Enter":"Sit"):undefined}/>;
      })}
      {liveTracks && liveTracks.length > shown &&
        <Button variant="ghost" wide style={{marginTop:14}}
          onClick={()=>setShown(Math.min(shown + 24, liveTracks.length))}>
          {TR("sheet.more","Show more")} · {liveTracks.length - shown} {TR("sheet.remaining","remaining")}
        </Button>}
      {liveTracks && liveTracks.length > PAGE && shown >= liveTracks.length &&
        <button onClick={()=>setShown(PAGE)} className="tu-press"
          style={{display:"block",margin:"12px auto 0",background:"none",border:0,cursor:"pointer",
            font:"500 12px/1 var(--font-sans)",color:"var(--text-tertiary)"}}>
          {TR("sheet.collapse","Collapse the list")}</button>}
    </div>
  </Sheet>;
}
window.PathSheet = PathSheet;
