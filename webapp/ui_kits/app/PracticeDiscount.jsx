/* What practice has already earned, shown where the practice lives.
   No streak language, no red numbers for a missed day — a month is counted at its end,
   and until then this is simply a record of days sat. */
const { Button } = window.ToUnknownDesignSystem_9d38c1;
const PDIcon = window.TUIcon;

function PracticeDiscount() {
  const [data, setData] = React.useState(null);
  const [session, setSession] = React.useState(window.TULive && window.TULive.session());
  const [gift, setGift] = React.useState(null);
  const [err, setErr] = React.useState(null);
  const [pooled, setPooled] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [redeemed, setRedeemed] = React.useState(null);

  React.useEffect(() => window.TULive ? window.TULive.onAuth(setSession) : undefined, []);
  React.useEffect(() => {
    if (!session) { setData(null); return; }
    window.TULive.practiceSummary().then(setData).catch(() => setData(null));
  }, [session]);

  if (!session || !data) return null;

  const { days, daysInMonth, discount, next, history } = data;
  const pct = Math.min(100, Math.round((days / (next ? next.days : 30)) * 100));
  const giftable = (history || []).filter((h) => h.discount_pct >= 100 && h.status === "earned");

  return <section style={{margin:"26px 0 0"}}>
    <p className="tu-eyebrow tu-eyebrow-dot" style={{margin:"0 2px 10px"}}>
      {TR("practice.eyebrow","practice, not payment")}</p>

    <div className="tu-glass" style={{borderRadius:"var(--r-lg)",padding:"20px 18px"}}>
      <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:12}}>
        <p style={{margin:0,font:"400 26px/1 var(--font-serif)",color:"var(--ink)"}}>
          {days} <span style={{fontSize:14,color:"var(--text-secondary)"}}>
            {TR("practice.days","days sat this month")}</span></p>
        {discount > 0 && <span style={{font:"600 13px/1 var(--font-sans)",color:"var(--gold-deep)",
          background:"rgba(217,164,65,0.16)",border:"0.5px solid rgba(168,120,31,0.3)",
          padding:"7px 12px",borderRadius:"var(--r-full)",whiteSpace:"nowrap"}}>
          −{discount}%</span>}
      </div>

      <div aria-hidden="true" style={{height:6,borderRadius:99,background:"rgba(25,24,19,0.07)",
        margin:"14px 0 10px",overflow:"hidden"}}>
        <div style={{height:"100%",width:pct+"%",borderRadius:99,
          background:"linear-gradient(90deg,var(--gold-deep),var(--gold-bright))",
          transition:"width .9s var(--ease-spring)"}}/>
      </div>

      <p style={{margin:0,font:"400 13px/1.6 var(--font-sans)",color:"var(--text-secondary)"}}>
        {next
          ? `${next.days - days} ${TR("practice.more","more days this month and next month is")} ${next.pct}% ${TR("practice.off","off")}.`
          : TR("practice.full","Every day this month. Next month is on us — keep it, or give it to someone who cannot pay.")}
      </p>
      <p style={{margin:"8px 0 0",font:"400 12px/1.55 var(--font-sans)",color:"var(--text-tertiary)"}}>
        {TR("practice.rule","20 days · 25% — 25 days · 50% — every day · free. Counted at the end of the month; a missed day costs nothing.")}
      </p>

      {giftable.length > 0 && <div style={{marginTop:16,paddingTop:14,borderTop:"0.5px solid var(--hairline)"}}>
        <p style={{margin:"0 0 10px",font:"400 13.5px/1.6 var(--font-serif)",color:"var(--gold-deep)"}}>
          {TR("practice.gift.lead","You earned a free month. You can give it away instead.")}</p>
        {gift
          ? <div>
              <p style={{margin:0,font:"600 17px/1 var(--font-sans)",color:"var(--ink)",letterSpacing:"0.08em"}}>{gift}</p>
              <p style={{margin:"8px 0 0",fontSize:12.5,color:"var(--text-tertiary)"}}>
                {TR("practice.gift.done","Give this to whoever needs it. They enter it below.")}</p>
            </div>
          : pooled
          ? <p style={{margin:0,font:"400 13.5px/1.6 var(--font-serif)",color:"var(--sage)"}}>
              {TR("practice.pool.done","Released. Someone who wrote to say they cannot pay will be given this month. ☸")}</p>
          : <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <Button variant="ghost" onClick={()=>{
                window.TULive.giftMonth(giftable[0].id).then(setGift).catch((e)=>setErr(String(e.message||e)));
              }} style={{minHeight:40,padding:"0 16px",fontSize:12.5}}>
                {TR("practice.gift.cta","Give it to someone I know")}</Button>
              <Button variant="quiet" onClick={()=>{
                window.TULive.poolMonth(giftable[0].id).then(()=>setPooled(true)).catch((e)=>setErr(String(e.message||e)));
              }} style={{minHeight:40,padding:"0 14px",fontSize:12.5}}>
                {TR("practice.pool.cta","Put it in the scholarship pool")}</Button>
            </div>}
        {err && <p style={{margin:"8px 0 0",fontSize:12,color:"#a33"}}>{err}</p>}
      </div>}

      <div style={{marginTop:16,paddingTop:14,borderTop:"0.5px solid var(--hairline)"}}>
        <p style={{margin:"0 0 10px",fontSize:12.5,color:"var(--text-tertiary)"}}>
          {TR("practice.redeem.lead","Been given a month by another practitioner?")}</p>
        {redeemed
          ? <p style={{margin:0,font:"400 13.5px/1.6 var(--font-serif)",color:"var(--sage)"}}>
              {TR("practice.redeem.done","It is yours. Sit well. ☸")}</p>
          : <form onSubmit={(e)=>{ e.preventDefault();
              window.TULive.redeemCode(code.trim()).then(()=>setRedeemed(true))
                .catch((x)=>setErr(String(x.message||x))); }}
              style={{display:"flex",gap:8}}>
              <input value={code} onChange={(e)=>{setCode(e.target.value);setErr(null);}}
                placeholder="TU-XXXXXX" aria-label="Gift code"
                style={{flex:1,minWidth:0,padding:"0 14px",minHeight:42,fontSize:14,font:"inherit",
                  borderRadius:"var(--r-full)",border:"0.5px solid rgba(24,22,16,0.14)",
                  background:"rgba(255,255,255,0.86)",color:"var(--ink)",outline:"none",
                  letterSpacing:"0.06em",textTransform:"uppercase"}}/>
              <Button type="submit" disabled={code.trim().length < 4}
                style={{minHeight:42,padding:"0 18px",fontSize:12.5}}>
                {TR("practice.redeem.cta","Redeem")}</Button>
            </form>}
      </div>
    </div>
  </section>;
}
window.PracticeDiscount = PracticeDiscount;
