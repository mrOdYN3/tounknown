const { StatCard, TeacherCard } = window.ToUnknownDesignSystem_9d38c1;
const SocialLinks = window.ToUnknownDesignSystem_9d38c1.SocialLinks || (()=>null);
function ProfileScreen() {
  const T = window.TU;
  const faq = [
    ["What is the Tounknown Family?", '"Generosity is the root of a connected life." The community exists through voluntary giving — a digital Sangha supporting mindful living.'],
    ["Can I practice without paying?", "Yes. The first gate of every Path is free, and no one is turned away for money — write one honest paragraph to apply for a scholarship."],
    ["How do Paths unlock?", "By practice, not payment. Each track opens after you have sat the one before — the way real retreats and lineages work."],
    ["The Sanskrit we use", "Sādhana — daily spiritual practice · Mārga — the path · Dīkṣā — initiation, the gate · Abhyāsa — steady, devoted repetition · Dāna — generosity · Sangha — the community · Satsang — gathering in truth · Sādhaka — the committed practitioner · Ācārya — the teacher · Paramparā — the unbroken chain of transmission; every teacher here names theirs."],
  ];
  return <div style={{padding:"22px 20px 0"}}>
    <h1 style={{margin:0,fontSize:20,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.3px",color:"var(--ink)"}}>Your sādhana</h1>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,margin:"18px 0"}}>
      <StatCard value={15} label="minutes sat"/><StatCard value={1} label="tracks completed"/><StatCard value={0} label="gates passed"/>
    </div>
    <p style={{fontSize:14,textAlign:"center",fontFamily:"var(--font-serif)",color:"var(--text-secondary)",margin:0}}>You are on the Path. Keep sitting.</p>
    <h2 style={{margin:"30px 0 6px",fontSize:18,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>Your teacher</h2>
    <TeacherCard avatar={T.teacher.avatar} name={T.teacher.name} lineage={T.teacher.lineage} bio={T.teacher.bio} parampara={T.teacher.parampara}/>
    <h2 style={{margin:"26px 0 6px",fontSize:18,fontFamily:"var(--font-serif)",fontWeight:400,letterSpacing:"0.2px",color:"var(--ink)"}}>Questions</h2>
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
