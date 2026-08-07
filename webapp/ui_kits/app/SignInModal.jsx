/* One modal for everything that used to be a coloured band above the fold.
 *
 * A message about signing in belongs on top of the button that provoked it, not at the top of a
 * page the reader has already scrolled past. Both the tuition ladder and the Path sheet raise
 * the same question — "who are you?" — so they raise it the same way, and take the answer in
 * place rather than sending anyone to another tab.
 *
 *   <Notice note={note} onClose={...} />
 *   note = { kind:"signin", plan }                     — asks for an email, sends the link
 *        | { text, sub, icon, paypal, action }         — says one thing and closes
 */
const { Button: SIButton } = window.ToUnknownDesignSystem_9d38c1;
const SIIcon = window.TUIcon;
const SI_PAYPAL = "https://www.paypal.com/donate?hosted_button_id=H5VQT3VLQBUBJ";
const SI_PENDING = "tu.pending-plan";

/* The disc above the message. Gold while it is asking, sage once it has done the thing —
   the same green the gate counter uses for "that is enough". */
function Disc({ name, tone = "gold" }) {
  const green = tone === "done";
  return <div aria-hidden="true" style={{display:"grid",placeItems:"center",width:48,height:48,
    margin:"0 auto 16px", borderRadius:"50%",
    background: green ? "rgba(104,118,79,0.16)" : "rgba(217,164,65,0.15)",
    border: "0.5px solid " + (green ? "rgba(104,118,79,0.34)" : "rgba(168,120,31,0.28)"),
    color: green ? "var(--sage-deep)" : "var(--gold-deep)",
    transition: "background .4s var(--ease-out), border-color .4s var(--ease-out), color .4s var(--ease-out)",
    animation: green ? "tu-pop .42s var(--ease-spring)" : undefined}}>
    <SIIcon name={name} size={green ? 22 : 21} stroke={green ? 2 : undefined}/>
  </div>;
}

function SignInPanel({ plan, onDone }) {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState("idle");

  // Held across the round trip to the inbox, so following the link resumes what was asked for
  // rather than dropping the reader on the home screen.
  React.useEffect(() => {
    if (plan) { try { sessionStorage.setItem(SI_PENDING, plan); } catch {} }
  }, [plan]);

  if (state === "sent") return <React.Fragment>
    <Disc name="check" tone="done"/>
    <p style={{margin:0,font:"400 19px/1.35 var(--font-serif)",letterSpacing:"-0.01em",color:"var(--ink)"}}>
      {TR("dana.signin.sent","Check your inbox.")}</p>
    {/* Their own address back to them: the commonest reason a link never arrives is a typo,
        and seeing it is how you catch one. */}
    <p style={{margin:"12px 0 0",font:"500 13.5px/1.5 var(--font-sans)",color:"var(--sage-deep)",
      wordBreak:"break-word"}}>{email.trim()}</p>
    <p style={{margin:"10px 0 0",font:"400 13.5px/1.6 var(--font-sans)",color:"var(--text-secondary)"}}>
      {plan
        ? TR("dana.signin.sent.sub","The link signs you in and brings you straight back to this step. ☸")
        : TR("signin.sent.sub.plain","The link signs you in. Your practice will be waiting. ☸")}</p>
    <p style={{margin:"14px 0 0",font:"400 12px/1.55 var(--font-sans)",color:"var(--text-tertiary)"}}>
      {TR("dana.signin.sent.spam","It usually lands within a minute. If not, look in spam.")}</p>
  </React.Fragment>;

  return <React.Fragment>
    <p style={{margin:0,font:"400 17px/1.4 var(--font-serif)",color:"var(--ink)"}}>
      {TR("dana.signin.title","First, your email.")}</p>
    <p style={{margin:"10px 0 0",font:"400 13.5px/1.6 var(--font-sans)",color:"var(--text-secondary)"}}>
      {TR("dana.signin.sub","No password. Your membership and your practice both follow this address.")}</p>
    <form onSubmit={(e)=>{ e.preventDefault(); if(!email.trim()) return; setState("sending");
        window.TULive.signIn(email.trim()).then(()=>setState("sent")).catch(()=>setState("error")); }}
      style={{marginTop:18,display:"flex",flexDirection:"column",gap:8}}>
      <input type="email" required autoFocus value={email} onChange={(e)=>setEmail(e.target.value)}
        placeholder="you@example.com" aria-label="Email address"
        style={{padding:"0 16px",minHeight:46,font:"400 15px var(--font-sans)",borderRadius:"var(--r-full)",
          textAlign:"center",border:"0.5px solid rgba(24,22,16,0.12)",background:"rgba(255,255,255,0.9)",
          color:"var(--ink)",outline:"none"}}/>
      <SIButton type="submit" wide disabled={state==="sending"} style={{opacity:state==="sending"?0.6:1}}>
        {state==="sending" ? TR("dana.signin.sending","Sending…") : TR("dana.signin.cta","Send the link")}</SIButton>
    </form>
    {state==="error" && <p style={{margin:"10px 0 0",fontSize:12.5,color:"#a33"}}>
      {TR("dana.signin.error","Could not send — try again in a minute.")}</p>}
    <OAuthRow/>
  </React.Fragment>;
}

/* Asked once, when someone lands back from the emailed link and we still have no name for them.
   Skippable — the practice does not need one — and never asked twice. */
function NamePanel({ onClose }) {
  const [name, setName] = React.useState("");
  const [state, setState] = React.useState("idle");
  const done = () => { try { localStorage.setItem("tu.asked-name","1"); } catch {} onClose(); };
  if (state === "saved") return <React.Fragment>
    <Disc name="check" tone="done"/>
    <p style={{margin:0,font:"400 19px/1.35 var(--font-serif)",color:"var(--ink)"}}>
      {TR("welcome.done","Welcome, {n}.").replace("{n}", name.trim())}</p>
    <p style={{margin:"10px 0 0",font:"400 13.5px/1.6 var(--font-sans)",color:"var(--text-secondary)"}}>
      {TR("welcome.done.sub","Your practice is saved to this account from here on. ☸")}</p>
  </React.Fragment>;
  return <React.Fragment>
    <Disc name="sadhana"/>
    <p style={{margin:0,font:"400 19px/1.35 var(--font-serif)",color:"var(--ink)"}}>
      {TR("welcome.title","You are in. What should we call you?")}</p>
    <p style={{margin:"10px 0 0",font:"400 13.5px/1.6 var(--font-sans)",color:"var(--text-secondary)"}}>
      {TR("welcome.sub","Only your teacher and the circle see this. You can skip it and stay anonymous.")}</p>
    <form onSubmit={(e)=>{ e.preventDefault(); if(!name.trim()) return done(); setState("saving");
        window.TULive.saveProfile({ display_name: name.trim() })
          .then(()=>setState("saved")).catch(()=>setState("error"))
          .finally(()=>{ try { localStorage.setItem("tu.asked-name","1"); } catch {} }); }}
      style={{marginTop:18,display:"flex",flexDirection:"column",gap:8}}>
      <input autoFocus value={name} onChange={(e)=>setName(e.target.value)} maxLength={48}
        placeholder={TR("profile.name.ph","Your name")} aria-label="Your name"
        style={{padding:"0 16px",minHeight:46,font:"400 15px var(--font-sans)",borderRadius:"var(--r-full)",
          textAlign:"center",border:"0.5px solid rgba(24,22,16,0.12)",background:"rgba(255,255,255,0.9)",
          color:"var(--ink)",outline:"none"}}/>
      <SIButton type="submit" wide disabled={state==="saving"} style={{opacity:state==="saving"?0.6:1}}>
        {state==="saving" ? TR("profile.name.saving","Saving…") : TR("welcome.cta","That is me")}</SIButton>
    </form>
    {state==="error" && <p style={{margin:"10px 0 0",fontSize:12.5,color:"#a33"}}>
      {TR("profile.name.error","Could not save — try again.")}</p>}
  </React.Fragment>;
}

/* Social sign-in, rendered only for providers the project has actually enabled — the list comes
   from the server, so this is empty until Google or Apple is switched on in the dashboard and
   there is never a button that leads nowhere.

   Supabase links an OAuth identity to an existing user when the provider hands back the same,
   verified email address. Everyone here signed in through a link they clicked, so their address
   is verified and the same person lands on the same account, practice and membership intact.
   The exception worth knowing is Apple's Hide My Email, which returns a private relay address:
   it cannot match, so that route makes a second account. */
const MARKS = {
  google: <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-4H24v7.5h12c-.2 2-1.5 5-4.4 7l6.7 5.2C42.2 36.2 45 30.7 45 24z"/>
    <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.9-12.5-9.2l-7.1 5.5C8 41.1 15.4 46 24 46z"/>
    <path fill="#FBBC05" d="M11.5 28.3a13.5 13.5 0 010-8.6l-7.1-5.5a22 22 0 000 19.6z"/>
    <path fill="#EA4335" d="M24 9.5c3.2 0 6 1.1 8.2 3.2l6.1-6.1C34.9 3.1 29.9 1 24 1 15.4 1 8 5.9 4.4 14.2l7.1 5.5C13.3 13.4 18.2 9.5 24 9.5z"/>
  </svg>,
  apple: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.4 12.8c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.2 1.2-2.4 1.3-2.5-.1 0-2.5-1-2.5-3.6zM14.2 5.9c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3z"/>
  </svg>,
};
const LABELS = { google: "Google", apple: "Apple" };

function OAuthRow({ compact }) {
  const [list, setList] = React.useState(null);
  const [busy, setBusy] = React.useState(null);
  React.useEffect(() => {
    let live = true;
    if (window.TULive && window.TULive.providers)
      window.TULive.providers().then((p) => { if (live) setList(p); }).catch(() => setList([]));
    return () => { live = false; };
  }, []);
  if (!list || !list.length) return null;

  return <div style={{marginTop:compact?12:16}}>
    <div aria-hidden="true" style={{display:"flex",alignItems:"center",gap:10,margin:"0 0 12px"}}>
      <span style={{flex:1,height:1,background:"var(--hairline)"}}/>
      <span style={{font:"500 11px/1 var(--font-sans)",letterSpacing:"0.08em",textTransform:"uppercase",
        color:"var(--text-tertiary)"}}>{TR("auth.or","or")}</span>
      <span style={{flex:1,height:1,background:"var(--hairline)"}}/>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {list.map((k) => (
        <SIButton key={k} variant="ghost" wide disabled={busy===k}
          style={{opacity:busy===k?0.6:1,gap:10}}
          onClick={()=>{ setBusy(k); window.TULive.signInWith(k).catch(()=>setBusy(null)); }}>
          {MARKS[k]}{TR("auth.continue","Continue with {p}").replace("{p}", LABELS[k])}
        </SIButton>))}
    </div>
  </div>;
}

function Notice({ note, onClose }) {
  if (!note) return null;
  // Portalled to <body>. The Path sheet carries a transform and a backdrop-filter, either of
  // which makes it the containing block for a position:fixed child — a modal opened from inside
  // it was pinned to the sheet's own 440px box instead of the window. Rendering through the body
  // means the overlay never depends on which screen raised it.
  return ReactDOM.createPortal(
    <div role="dialog" aria-modal="true" className="tu-overlay" onClick={onClose}
    style={{position:"fixed",inset:0,zIndex:220,display:"grid",placeItems:"center",padding:22,
      background:"rgba(14,13,10,0.42)",WebkitBackdropFilter:"blur(7px)",backdropFilter:"blur(7px)",
      animation:"tu-fade .22s var(--ease-out)"}}>
    <div onClick={(e)=>e.stopPropagation()} className="tu-glass"
      style={{width:"min(392px,100%)",borderRadius:"var(--r-xl)",padding:"28px 24px 20px",
        textAlign:"center",boxShadow:"var(--lift-2)",animation:"tu-rise .32s var(--ease-spring)"}}>
      {note.kind!=="signin" && note.kind!=="name" && <Disc name={note.icon||"spark"}/>}

      {note.kind==="signin" ? <SignInPanel plan={note.plan} onDone={onClose}/>
        : note.kind==="name" ? <NamePanel onClose={onClose}/>
        : <React.Fragment>
            <p style={{margin:0,font:"400 19px/1.35 var(--font-serif)",letterSpacing:"-0.01em",color:"var(--ink)"}}>{note.text}</p>
            {note.sub && <p style={{margin:"10px 0 0",font:"400 13.5px/1.6 var(--font-sans)",color:"var(--text-secondary)"}}>{note.sub}</p>}
            {note.price && <p style={{margin:"14px 0 0",font:"600 12px/1.4 var(--font-sans)",
              textTransform:"uppercase",letterSpacing:"0.1em",color:"var(--gold-deep)"}}>{note.price}</p>}
            {note.action && <SIButton variant={note.cta ? "go" : "gold"} wide style={{marginTop:note.price?12:18}}
              onClick={()=>{ onClose(); note.action.run(); }}>{note.action.label}</SIButton>}
            {note.paypal && <SIButton variant="ghost" wide style={{marginTop:note.action?8:18}}
              onClick={()=>window.open(SI_PAYPAL,"_blank","noopener")}>{TR("dana.paypal","Give via PayPal ↗")}</SIButton>}
          </React.Fragment>}

        <SIButton variant="quiet" wide style={{marginTop:8}} onClick={onClose}>
          {note.dismiss || (note.kind==="name" ? TR("welcome.skip","Skip for now") : TR("common.close","Close"))}</SIButton>

        {/* Kept, and kept quiet. Whoever needs this line will look for it; putting it at the
            size of the offer would make it read like a discount, which it is not. */}
        {note.fine && <p style={{margin:"16px 0 0",paddingTop:14,borderTop:"0.5px solid var(--hairline)",
          font:"400 11px/1.55 var(--font-sans)",color:"var(--text-tertiary)"}}>{note.fine}</p>}
      </div>
    </div>, document.body);
}

window.TUNotice = Notice;
window.TUOAuthRow = OAuthRow;
window.TU_PENDING_PLAN = SI_PENDING;
