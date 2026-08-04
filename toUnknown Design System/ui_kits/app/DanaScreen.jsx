const { Interlude, TierCard, Button, DanaChips, GiveSlider } = window.ToUnknownDesignSystem_9d38c1;
function DanaScreen({ go, toast }) {
  const T = window.TU;
  return <div>
    <Interlude style={{paddingTop:44}} quote="These meditations are offered freely — in the spirit of generosity." attribution="— dāna, the root of a connected life"/>
    <section style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:16}}>
      <TierCard chip="seeker" price="$0" priceNote="· dāna" bullets={["First gate of every Path — free forever","Community, read-only","Give only if it feels true"]}>
        <Button variant="ghost" wide onClick={()=>go("paths")}>Start free</Button>
      </TierCard>
      <TierCard hot chip="student · toUnknown+" chipTone="gold" price="$11" priceNote="/mo or $88/yr"
        bullets={["All four Paths, unlocked by your practice","Downloads for offline sitting","Sangha participation + monthly satsang"]}>
        <GiveSlider style={{marginBottom:14}}/>
        <Button wide onClick={toast}>Become a Student</Button>
        <Button variant="quiet" wide onClick={toast}>or $88 / year — two months free</Button>
      </TierCard>
      <TierCard chip="sādhaka · the guided circle" chipTone="green" price="$33" priceNote="/mo"
        bullets={["Everything in Student","A circle of max 30 with a lineage teacher","Monthly live small-group guidance + direct Q&A","Gate reviews — your practice, seen"]}>
        <Button wide onClick={toast}>Enter the circle</Button>
      </TierCard>
      <TierCard chip="founding member" price="$108" priceNote="· once" bullets={["Lifetime Student membership","Your name on the gratitude wall"]}>
        <Button variant="ghost" wide onClick={toast}>Become founding</Button>
      </TierCard>
    </section>
    <section style={{padding:"0 20px"}}>
      <div style={{borderRadius:24,overflow:"hidden",border:"0.5px solid var(--hairline)",marginTop:26,boxShadow:"var(--shadow-photo)"}}>
        <img src={T.danaImg} alt="Dāna — the practice of generosity" width="1440" height="756" loading="lazy" style={{display:"block",width:"100%",height:140,objectFit:"cover"}}/>
      </div>
      <h2 style={{margin:"18px 0 6px",fontSize:18,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>One-time dāna</h2>
      <p style={{margin:"0 0 6px",fontSize:13.5,color:"var(--text-secondary)"}}>No fixed cost. No pressure. Only presence, and the freedom to give — if it feels true.</p>
      <DanaChips style={{margin:"20px 0"}}/>
      <Button wide onClick={toast}>Give with a free heart</Button>
      <p style={{textAlign:"center",margin:"12px 0 0"}}><a href="https://www.paypal.com/donate?hosted_button_id=H5VQT3VLQBUBJ" target="_blank" style={{color:"var(--text-tertiary)",fontSize:13}}>or quietly via PayPal</a></p>
    </section>
    <Interlude quote="No one is turned away for money." attribution="scholarship — write us one honest paragraph · apply"/>
  </div>;
}
window.DanaScreen = DanaScreen;
