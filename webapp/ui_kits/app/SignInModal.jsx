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
  </React.Fragment>;
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
      {note.kind!=="signin" && <Disc name={note.icon||"spark"}/>}

      {note.kind==="signin"
        ? <SignInPanel plan={note.plan} onDone={onClose}/>
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
          {note.dismiss || TR("common.close","Close")}</SIButton>

        {/* Kept, and kept quiet. Whoever needs this line will look for it; putting it at the
            size of the offer would make it read like a discount, which it is not. */}
        {note.fine && <p style={{margin:"16px 0 0",paddingTop:14,borderTop:"0.5px solid var(--hairline)",
          font:"400 11px/1.55 var(--font-sans)",color:"var(--text-tertiary)"}}>{note.fine}</p>}
      </div>
    </div>, document.body);
}

window.TUNotice = Notice;
window.TU_PENDING_PLAN = SI_PENDING;
