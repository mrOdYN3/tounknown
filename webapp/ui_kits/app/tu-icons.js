/* toUnknown — icon set. Thin-stroke line glyphs (1.5px, round caps), drawn on a 24px grid.
   Inline SVG so there is no CDN dependency and every glyph inherits currentColor. */
(function () {
  const P = {
    // navigation
    home: "M3.6 10.5 12 4l8.4 6.5M5.5 9.4V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.4M9.8 20v-5.2a2.2 2.2 0 0 1 4.4 0V20",
    marga: { d: "M7 17.8c0-3.6 2.6-5 5-6.1s5-2.4 5-6", circles: [[7,19.6,1.5,"fill"],[17,4.6,1.6,"stroke"]] },
    sangha: "M9 11.5a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM3.2 19.4c0-3 2.6-4.8 5.8-4.8s5.8 1.8 5.8 4.8M16.4 5.6a3 3 0 0 1 0 5.8M17.8 14.9c2 .5 3.4 1.9 3.4 4",
    dana: "M12 3.8c3.1 3.4 5.2 6.2 5.2 8.9A5.2 5.2 0 0 1 12 18a5.2 5.2 0 0 1-5.2-5.3c0-2.7 2.1-5.5 5.2-8.9Z",
    sadhana: "M12 11.8a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2ZM4.8 20c0-3.6 3.2-5.6 7.2-5.6s7.2 2 7.2 5.6",
    // actions
    play: "M8.4 5.6 18 12l-9.6 6.4V5.6Z",
    pause: "M9.5 5.5v13M14.5 5.5v13",
    lock: "M7 10.6V8.2a5 5 0 0 1 10 0v2.4M6.2 10.6h11.6a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H6.2a1 1 0 0 1-1-1v-7.2a1 1 0 0 1 1-1Z",
    check: "M5 12.6 9.8 17.2 19 7.4",
    gate: "M4 6.2h16M5.6 6.2v13M18.4 6.2v13M5.6 10.4h12.8M9.6 19.2V12M14.4 19.2V12",
    arrow: "M5 12h13.5M13 6.6 18.6 12 13 17.4",
    chevron: "M9.5 6.5 15 12l-5.5 5.5",
    close: "M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5",
    mail: "M4 7.4h16v9.2H4zM4.4 7.8 12 13l7.6-5.2",
    clock: "M12 20.2a8.2 8.2 0 1 0 0-16.4 8.2 8.2 0 0 0 0 16.4ZM12 7.6V12l3 1.8",
    headphones: "M4.6 15.4v-3a7.4 7.4 0 0 1 14.8 0v3M4.6 14h1.8a1 1 0 0 1 1 1v3.2a1 1 0 0 1-1 1H5.6a1 1 0 0 1-1-1V14ZM19.4 14h-1.8a1 1 0 0 0-1 1v3.2a1 1 0 0 0 1 1h.8a1 1 0 0 0 1-1V14Z",
    spark: "M12 4.2c.6 3.6 1.6 4.6 5.2 5.2-3.6.6-4.6 1.6-5.2 5.2-.6-3.6-1.6-4.6-5.2-5.2 3.6-.6 4.6-1.6 5.2-5.2ZM17.6 15.4c.3 1.7.8 2.2 2.5 2.5-1.7.3-2.2.8-2.5 2.5-.3-1.7-.8-2.2-2.5-2.5 1.7-.3 2.2-.8 2.5-2.5Z",
    leaf: "M19.4 4.6C9.8 4.6 5 8.4 5 14.2c0 2.8 1.6 5.2 1.6 5.2S8.4 12 19.4 4.6ZM6.6 19.4C10.8 15 14.2 13 19.4 12",
    bookmark: "M7 4.6h10a1 1 0 0 1 1 1v13.8L12 15.8l-6 3.6V5.6a1 1 0 0 1 1-1Z",
  };
  const SOCIAL = {
    telegram: "M20.6 5.2 3.9 11.6c-.9.3-.9 1.5.1 1.8l4.2 1.3 1.6 4.7c.3.8 1.3 1 1.9.3l2.2-2.4 4.3 3.2c.7.5 1.7.1 1.9-.7l2.4-13c.2-1-.8-1.8-1.9-1.6ZM8.5 14.4 17.6 8l-7.4 7.2-.3 3.1",
    instagram: "M7.4 3.9h9.2a3.5 3.5 0 0 1 3.5 3.5v9.2a3.5 3.5 0 0 1-3.5 3.5H7.4a3.5 3.5 0 0 1-3.5-3.5V7.4a3.5 3.5 0 0 1 3.5-3.5ZM12 8.3a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4ZM17 7h.01",
    x: "M4.4 4.4l6.3 8.4-6.4 6.8M19.6 19.6l-6.3-8.4 6.2-6.8",
    youtube: "M4 8.4a2.4 2.4 0 0 1 2.4-2.4h11.2A2.4 2.4 0 0 1 20 8.4v7.2a2.4 2.4 0 0 1-2.4 2.4H6.4A2.4 2.4 0 0 1 4 15.6V8.4ZM10.4 9.4l4.4 2.6-4.4 2.6V9.4Z",
    insight: "M12 20.2a8.2 8.2 0 1 0 0-16.4 8.2 8.2 0 0 0 0 16.4ZM12 8v4.4M12 15.6h.01",
  };

  function Icon({ name, size = 22, stroke = 1.5, style, ...rest }) {
    const spec = P[name] || SOCIAL[name];
    if (!spec) return null;
    const d = typeof spec === "string" ? spec : spec.d;
    const circles = (typeof spec === "string" ? null : spec.circles) || [];
    const kids = d.split("M").filter(Boolean).map((seg, i) =>
      React.createElement("path", {
        key: "p" + i, d: "M" + seg, stroke: "currentColor", strokeWidth: stroke,
        strokeLinecap: "round", strokeLinejoin: "round",
      }));
    circles.forEach(([cx, cy, r, mode], i) => kids.push(
      React.createElement("circle", {
        key: "c" + i, cx, cy, r,
        fill: mode === "fill" ? "currentColor" : "none",
        stroke: mode === "fill" ? "none" : "currentColor", strokeWidth: stroke,
      })));
    return React.createElement("svg", {
      width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true",
      style: { display: "block", flex: "0 0 auto", ...style }, ...rest,
    }, kids);
  }

  window.TUIcon = Icon;
  window.TUIconNames = Object.keys(P).concat(Object.keys(SOCIAL));
})();
