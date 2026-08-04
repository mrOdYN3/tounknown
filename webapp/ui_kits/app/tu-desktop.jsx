/* Desktop layer.
 *
 * The phone layout is the product; this is not a second product. On a wide screen the
 * same screens get a side rail instead of a bottom tab bar, and room to lay their cards
 * out in a grid. Below 1024px none of this renders and the phone layout is untouched.
 */
const DIcon = window.TUIcon;

/* One source of truth for "this is a desktop", shared by the shell and the sheet. */
function useWide(query = "(min-width: 1024px)") {
  const [wide, setWide] = React.useState(
    typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false);
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(query);
    const on = (e) => setWide(e.matches);
    mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
    setWide(mq.matches);
    return () => (mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on));
  }, [query]);
  return wide;
}

const TR_ = (k, f) => (window.TR ? window.TR(k, f) : f);

function railItems() {
  return [
    { id: "home",       label: TR_("nav.home", "Home"),        icon: "home",    note: TR_("rail.home", "begin here") },
    { id: "paths",      label: TR_("nav.paths", "Mārga"),      icon: "marga",   note: TR_("rail.paths", "the paths") },
    { id: "community",  label: TR_("nav.sangha", "Sangha"),    icon: "sangha",  note: TR_("rail.sangha", "the circle") },
    { id: "membership", label: TR_("nav.dana", "Dāna"),        icon: "dana",    note: TR_("rail.dana", "giving") },
    { id: "profile",    label: TR_("nav.sadhana", "Sādhana"),  icon: "sadhana", note: TR_("rail.sadhana", "your practice") },
  ];
}

function SideRail({ active, onChange }) {
  return <nav aria-label="Main" className="tu-rail">
    <button className="tu-rail-brand" onClick={() => onChange("home")} aria-label="toUnknown home">
      <img src={window.TU.logo} alt="" aria-hidden="true" width="26" height="26"/>
      <span>toUnknown</span>
    </button>

    <div className="tu-rail-items">
      {railItems().map((t) => {
        const on = t.id === active;
        return <button key={t.id} onClick={() => onChange(t.id)} aria-current={on ? "page" : undefined}
          className={"tu-rail-item" + (on ? " on" : "")}>
          <span className="tu-rail-icon"><DIcon name={t.icon} size={19}/></span>
          <span className="tu-rail-label"><b>{t.label}</b><small>{t.note}</small></span>
        </button>;
      })}
    </div>

    <button className="tu-rail-start" onClick={() => window.TUStart && window.TUStart()}>
      <span className="tu-rail-icon"><DIcon name="marga" size={18}/></span>
      <span className="tu-rail-label">
        <b>{TR_("rail.start", "Where to begin")}</b>
        <small>{TR_("rail.start.sub", "four questions")}</small>
      </span>
    </button>

    <p className="tu-rail-foot">
      {TR_("home.how.lede.b", "Unlocked by sitting,")}<br/>{TR_("home.how.lede", "never by paying.")}
    </p>
  </nav>;
}

window.TUUseWide = useWide;
window.TUSideRail = SideRail;
