/* @ds-bundle: {"format":4,"namespace":"ToUnknownDesignSystem_9d38c1","components":[{"name":"CircleCard","sourcePath":"components/cards/CircleCard.jsx"},{"name":"PathCard","sourcePath":"components/cards/PathCard.jsx"},{"name":"StatCard","sourcePath":"components/cards/StatCard.jsx"},{"name":"TeacherCard","sourcePath":"components/cards/TeacherCard.jsx"},{"name":"TierCard","sourcePath":"components/cards/TierCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Interlude","sourcePath":"components/core/Interlude.jsx"},{"name":"Orb","sourcePath":"components/core/Orb.jsx"},{"name":"SOCIAL_LINKS","sourcePath":"components/core/SocialLinks.jsx"},{"name":"SocialLinks","sourcePath":"components/core/SocialLinks.jsx"},{"name":"DanaChips","sourcePath":"components/dana/DanaChips.jsx"},{"name":"GiveSlider","sourcePath":"components/dana/GiveSlider.jsx"},{"name":"StepRow","sourcePath":"components/lists/StepRow.jsx"},{"name":"AppHeader","sourcePath":"components/navigation/AppHeader.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"},{"name":"Sheet","sourcePath":"components/overlays/Sheet.jsx"},{"name":"Toast","sourcePath":"components/overlays/Toast.jsx"}],"sourceHashes":{"components/cards/CircleCard.jsx":"aef37b12a10b","components/cards/PathCard.jsx":"2249ee693b1a","components/cards/StatCard.jsx":"867c6f827d13","components/cards/TeacherCard.jsx":"604592ff67bd","components/cards/TierCard.jsx":"ee6e85cece27","components/core/Button.jsx":"9be0ee647209","components/core/Chip.jsx":"386643eae2da","components/core/Interlude.jsx":"0244f089d111","components/core/Orb.jsx":"ebc435ecae7a","components/core/SocialLinks.jsx":"294f44548893","components/dana/DanaChips.jsx":"5f55a32fef25","components/dana/GiveSlider.jsx":"fb4338440084","components/lists/StepRow.jsx":"1fd6611ec371","components/navigation/AppHeader.jsx":"b26304f79c56","components/navigation/TabBar.jsx":"6d486bf2386d","components/overlays/Sheet.jsx":"e06242f72ad3","components/overlays/Toast.jsx":"2c7da0aba55f","ui_kits/app/DanaScreen.jsx":"9db3d678030b","ui_kits/app/DesktopScreens.jsx":"84460435d8e8","ui_kits/app/HomeScreen.jsx":"de0cfdf59273","ui_kits/app/PathSheet.jsx":"2589cbc78a71","ui_kits/app/PathsScreen.jsx":"1db35df3a1ea","ui_kits/app/ProfileScreen.jsx":"7daaf408c86f","ui_kits/app/SanghaScreen.jsx":"2ad630655140","ui_kits/app/data.js":"4fe7b2049ef7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ToUnknownDesignSystem_9d38c1 = window.ToUnknownDesignSystem_9d38c1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/CircleCard.jsx
try { (() => {
/* Sangha circle card. locked shows a blurred veil with a gold serif join line — content stays visible beneath. */
function CircleCard({
  title,
  description,
  locked = false,
  lockedLabel = "opens with toUnknown+",
  onJoin,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 20,
      border: "0.5px solid var(--hairline)",
      background: "rgba(255,255,255,0.62)",
      backdropFilter: "blur(20px) saturate(1.5)",
      WebkitBackdropFilter: "blur(20px) saturate(1.5)",
      padding: 16,
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      color: "var(--text-secondary)",
      fontSize: 13.5
    }
  }, description), locked && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
      background: "rgba(251,250,247,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 13.5,
      color: "var(--gold-deep)"
    }
  }, lockedLabel, onJoin && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onJoin();
    },
    style: {
      color: "var(--gold-deep)"
    }
  }, "join")))));
}
Object.assign(__ds_scope, { CircleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CircleCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatCard.jsx
try { (() => {
/* Profile stat tile — big number over an 11px uppercase label. */
function StatCard({
  value,
  label,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.62)",
      backdropFilter: "blur(20px) saturate(1.5)",
      WebkitBackdropFilter: "blur(20px) saturate(1.5)",
      border: "0.5px solid var(--hairline)",
      borderRadius: 18,
      padding: "14px 10px",
      textAlign: "center",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      fontSize: 21,
      fontWeight: 600,
      letterSpacing: "-0.5px",
      color: "var(--text-body)"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9.5,
      color: "var(--text-tertiary)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      whiteSpace: "nowrap"
    }
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* toUnknown button. Variants: gold (primary — ink pill, white text), ghost (translucent white), quiet (text-only). */
function Button({
  variant = "gold",
  wide = false,
  children,
  style,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: 0,
    cursor: "pointer",
    font: "inherit",
    fontWeight: 600,
    fontSize: "14px",
    padding: "12px 20px",
    borderRadius: 999,
    minHeight: 44,
    userSelect: "none",
    textDecoration: "none",
    color: "inherit",
    fontFamily: "var(--font-sans)",
    transition: "transform .28s var(--spring), background .2s",
    width: wide ? "100%" : undefined
  };
  const variants = {
    gold: {
      background: "var(--ink)",
      color: "#FBFAF7",
      boxShadow: "var(--shadow-btn)"
    },
    ghost: {
      background: "rgba(255,255,255,0.72)",
      backdropFilter: "blur(10px)",
      border: "0.5px solid var(--hairline)",
      color: "var(--ink)",
      boxShadow: "0 2px 10px rgba(60,50,20,0.06)"
    },
    quiet: {
      background: "transparent",
      color: "var(--text-secondary)",
      fontWeight: 500,
      boxShadow: "none"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = "scale(0.97)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "";
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/* Pill chip. tone: neutral | gold (meaning: membership, seals, dāna) | green (done/positive). onDark for photo scrims. */
function Chip({
  tone = "neutral",
  onDark = false,
  children,
  style
}) {
  const tones = onDark ? {
    neutral: {
      background: "rgba(255,255,255,0.14)",
      color: "rgba(255,255,255,0.85)",
      borderColor: "rgba(255,255,255,0.25)"
    },
    gold: {
      background: "rgba(217,164,65,0.25)",
      color: "#E8B95A",
      borderColor: "rgba(217,164,65,0.45)"
    },
    green: {
      background: "rgba(127,176,105,0.25)",
      color: "#A9CE97",
      borderColor: "rgba(127,176,105,0.4)"
    }
  } : {
    neutral: {
      background: "var(--surface-2)",
      color: "var(--text-secondary)",
      borderColor: "var(--hairline)"
    },
    gold: {
      background: "rgba(217,164,65,0.16)",
      color: "var(--gold-deep)",
      borderColor: "rgba(168,120,31,0.3)"
    },
    green: {
      background: "rgba(94,138,74,0.12)",
      color: "var(--sage)",
      borderColor: "rgba(94,138,74,0.28)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      fontWeight: 600,
      padding: "4px 10px",
      borderRadius: 999,
      borderWidth: "0.5px",
      borderStyle: "solid",
      fontFamily: "var(--font-sans)",
      ...tones[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/cards/PathCard.jsx
try { (() => {
/* Path/course card — photo with dark base scrim, gold serif lineage line, white text.
   layout: "list" (full-width, min 200px) or "row" (240px snap-scroll hcard). */
function PathCard({
  image,
  lineage,
  title,
  essence,
  progress,
  meta,
  layout = "list",
  onClick,
  style
}) {
  const isRow = layout === "row";
  return /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    onClick: onClick,
    onKeyDown: e => {
      if (e.key === "Enter" && onClick) onClick(e);
    },
    style: {
      position: "relative",
      borderRadius: isRow ? 22 : 24,
      overflow: "hidden",
      cursor: "pointer",
      border: "0.5px solid var(--hairline)",
      boxShadow: "var(--shadow-photo)",
      minHeight: isRow ? 300 : 200,
      flex: isRow ? "0 0 240px" : undefined,
      scrollSnapAlign: isRow ? "start" : undefined,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      transition: "transform .3s var(--spring)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url('${image}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "#181826"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-photo)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: 16,
      color: "#F5F4F0"
    }
  }, lineage && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 12.5,
      color: "var(--gold-bright)"
    }
  }, lineage), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "6px 0 3px",
      fontSize: 17,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px"
    }
  }, title), essence && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12.5,
      color: "rgba(255,255,255,0.75)"
    }
  }, essence), (progress != null || meta) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12,
      alignItems: "center"
    }
  }, progress != null && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      position: "relative",
      flex: "0 0 auto",
      background: `conic-gradient(var(--gold-bright) ${progress}%, rgba(255,255,255,0.25) 0)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 2.5,
      borderRadius: "50%",
      background: "rgba(25,24,19,0.75)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 9,
      fontWeight: 600,
      color: "rgba(255,255,255,0.85)"
    }
  }, progress, "%")), meta && meta.map((m, i) => /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    key: i,
    onDark: true,
    tone: m.gold ? "gold" : "neutral"
  }, m.label ?? m)))));
}
Object.assign(__ds_scope, { PathCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PathCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/TeacherCard.jsx
try { (() => {
/* Teacher card — portrait, paramparā ☸ chip, gold serif lineage, bio, gold serif paramparā chain. */
function TeacherCard({
  avatar,
  name,
  lineage,
  bio,
  parampara,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "center",
      background: "rgba(255,255,255,0.62)",
      backdropFilter: "blur(20px) saturate(1.5)",
      WebkitBackdropFilter: "blur(20px) saturate(1.5)",
      border: "0.5px solid var(--hairline)",
      borderRadius: 22,
      padding: 18,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: `${name}, meditation teacher`,
    width: "72",
    height: "72",
    style: {
      width: 72,
      height: 72,
      borderRadius: "50%",
      objectFit: "cover",
      objectPosition: "top",
      flex: "0 0 auto",
      background: "#181826"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)"
    }
  }, name), " ", /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    tone: "gold",
    style: {
      fontSize: 10,
      padding: "2px 8px"
    }
  }, "parampar\u0101 \u2638"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 12.5,
      color: "var(--gold-deep)"
    }
  }, lineage), bio && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "5px 0 0",
      color: "var(--text-secondary)",
      fontSize: 13
    }
  }, bio), parampara && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontFamily: "var(--font-serif)",
      fontSize: 12,
      color: "var(--gold-deep)",
      lineHeight: 1.7
    }
  }, parampara.join(" → "))));
}
Object.assign(__ds_scope, { TeacherCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TeacherCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/TierCard.jsx
try { (() => {
/* Membership/tier card. hot = gold border + glow (the featured tier). Bullets use gold · markers. */
function TierCard({
  chip,
  chipTone = "neutral",
  title,
  price,
  priceNote,
  bullets = [],
  hot = false,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 24,
      border: hot ? "0.5px solid rgba(168,120,31,0.45)" : "0.5px solid var(--hairline)",
      background: "rgba(255,255,255,0.62)",
      backdropFilter: "blur(20px) saturate(1.5)",
      WebkitBackdropFilter: "blur(20px) saturate(1.5)",
      padding: 20,
      position: "relative",
      boxShadow: hot ? "var(--shadow-gold)" : "var(--shadow-card)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, chip && /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    tone: chipTone
  }, chip), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "10px 0 0",
      fontSize: 17,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--text-body)"
    }
  }, title), price && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 25,
      fontWeight: 600,
      letterSpacing: "-0.4px",
      margin: "8px 0 2px",
      color: "var(--text-body)"
    }
  }, price, priceNote && /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: 14,
      color: "var(--text-tertiary)",
      fontWeight: 500
    }
  }, " ", priceNote)), bullets.length > 0 && /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "14px 0 18px",
      padding: 0
    }
  }, bullets.map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      padding: "4.5px 0",
      color: "var(--text-secondary)",
      fontSize: 12.5,
      lineHeight: 1.5,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold-deep)",
      fontWeight: 700
    }
  }, "\xB7"), b))), children);
}
Object.assign(__ds_scope, { TierCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TierCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Interlude.jsx
try { (() => {
/* Sacred quote interlude — a full-width breathing pause between sections, with an ornamental gold rule. */
function Interlude({
  quote,
  attribution,
  size = 17,
  ornament = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "52px 28px",
      textAlign: "center",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, ornament && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      width: 56,
      height: 1,
      margin: "0 auto 22px",
      background: "linear-gradient(90deg,transparent,rgba(168,120,31,0.55),transparent)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif)",
      fontSize: size,
      lineHeight: 1.5,
      color: "var(--text-body)",
      textWrap: "pretty"
    }
  }, quote), attribution && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 14,
      fontSize: 11,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--text-tertiary)"
    }
  }, attribution));
}
Object.assign(__ds_scope, { Interlude });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Interlude.jsx", error: String((e && e.message) || e) }); }

// components/core/Orb.jsx
try { (() => {
/* The breathing brand mark — toUnknown's heartbeat. Renders the gold trident-tree logo (inlined), breathing on a 6s cycle. Used in the practice player and decorative heartbeat moments. */
const LOGO_GOLD = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAAD4CAYAAADB0SsLAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAA+KADAAQAAAABAAAA+AAAAAARVQCKAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAAk/klEQVR4Ae2de5QU9ZXH61fdMwMDIs8ZRBRwdU1QkYcziMtrQXBPEDGbA+TlCTGuisYs6jF6QLKYfZiH0ewaEdBEk5z8oZuYk+g52agY1CEgMIBuMMbj+kiIPEZwHBEYZrpqv7eZX091O93VPV3Pnm+dM/Or+lV11f19fnWrbv3q3luGwYkESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESIAESCBkAqrU4z++eHHi1RGv9jcSA03nbwe0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BwEqeDz6qSQpxcsNSvsonrH/mPPqLGc/EvWGbWz1E/lNzkouVgABKngFdGJPTWCEVk9U+l4dFbxC+5wRWhXasSU2iwpeIrA4bZ5Ju6yMndlyp73V/pfeatlUKnGJCl6JvepoEyO0HDD64CwVvMI7nRFaFd7BLs2jgrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDMBKnice4+yk4ALASq4CyCuJoE4E6CCx7n3KDsJuBCggrsA4moSiDOBZJyFD1t227aPKcPe2y2HOmTYdlv3MudKJUCmpRIrvD0VvDCfgmtXrtv5FDaQP04eESBTj0B27YYmurc8uTcSiBQBKnikuoPCkIC3BKjg3vLk3kggUgSo4JHqDgpDAt4SoIJ7y5N7I4FIEaCCR6o7KAwJeEuACu4tT+6NBCJFgAoeqe6gMCTgLQEquLc8uTcSiBQBKnikuoPCkIC3BKjg3vLk3kggUgSo4JHqDgpDAt4SYLCJtzwjuTdGaEWyWygUCZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACZAACVQEgf8Hs31NLdQ9atcAAAAASUVORK5CYII=";
function Orb({
  size = 56,
  still = false,
  glow = true,
  style
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: LOGO_GOLD,
    alt: "",
    "aria-hidden": "true",
    style: {
      width: size,
      height: "auto",
      flex: "0 0 auto",
      filter: glow ? "drop-shadow(0 0 26px rgba(217,164,65,0.45))" : "none",
      animation: still ? "none" : "breathe var(--breathe-duration, 6s) ease-in-out infinite",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Orb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Orb.jsx", error: String((e && e.message) || e) }); }

// components/core/SocialLinks.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Social links row — thin-stroke SVG glyphs, tertiary ink, gold on hover. */
const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const ICONS = {
  telegram: /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24"
  }, S), /*#__PURE__*/React.createElement("path", {
    d: "M21.5 4.5 2.9 11.7c-.8.3-.8 1.4.1 1.6l4.7 1.5 1.8 5.6c.2.8 1.2 1 1.8.4l2.6-2.6 4.8 3.5c.7.5 1.7.1 1.9-.8l3-14.6c.2-1-.8-1.8-1.7-1.4Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7.7 14.8 10.6-8.4"
  })),
  instagram: /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24"
  }, S), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.2",
    cy: "6.8",
    r: "0.5",
    fill: "currentColor"
  })),
  x: /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24"
  }, S), /*#__PURE__*/React.createElement("path", {
    d: "m4 4 16 16M20 4 4 20"
  })),
  youtube: /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24"
  }, S), /*#__PURE__*/React.createElement("rect", {
    x: "2.5",
    y: "5.5",
    width: "19",
    height: "13",
    rx: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m10.5 9.5 4.5 2.5-4.5 2.5Z"
  })),
  insight: /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24"
  }, S), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3.2 2"
  })),
  patreon: /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24"
  }, S), /*#__PURE__*/React.createElement("circle", {
    cx: "14.5",
    cy: "9",
    r: "5.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.5 3.5v17"
  })),
  trustpilot: /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24"
  }, S), /*#__PURE__*/React.createElement("path", {
    d: "m12 3 2.4 5.8 6.1.4-4.7 4 1.5 6-5.3-3.3L6.7 19.2l1.5-6-4.7-4 6.1-.4Z"
  })),
  mail: /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24"
  }, S), /*#__PURE__*/React.createElement("rect", {
    x: "2.5",
    y: "5",
    width: "19",
    height: "14",
    rx: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3.5 7 8.5 6 8.5-6"
  }))
};
const SOCIAL_LINKS = [{
  id: "telegram",
  label: "Telegram",
  href: "https://t.me/tounknowndotcom"
}, {
  id: "instagram",
  label: "Instagram",
  href: "https://instagram.com/tounknowndotcom"
}, {
  id: "x",
  label: "X",
  href: "https://x.com/tounknowndotcom"
}, {
  id: "youtube",
  label: "YouTube",
  href: "https://youtube.com/@tounknowndotcom"
}, {
  id: "insight",
  label: "Insight Timer",
  href: "https://insighttimer.com/dyn"
}, {
  id: "patreon",
  label: "Patreon",
  href: "https://patreon.com/c/tounknowndotcom"
}, {
  id: "trustpilot",
  label: "Trustpilot",
  href: "https://trustpilot.com/review/tounknown.com"
}, {
  id: "mail",
  label: "Email",
  href: "mailto:tounknown.com@gmail.com"
}];
function SocialLinks({
  size = 18,
  gap = 6,
  tone = "ink",
  style
}) {
  const color = tone === "light" ? "rgba(255,255,255,0.6)" : "var(--text-tertiary)";
  const hover = tone === "light" ? "#FFFFFF" : "var(--gold-deep)";
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Social links",
    style: {
      display: "flex",
      gap,
      justifyContent: "center",
      flexWrap: "wrap",
      ...style
    }
  }, SOCIAL_LINKS.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: l.href,
    target: "_blank",
    rel: "noreferrer",
    "aria-label": l.label,
    title: l.label,
    onMouseEnter: e => e.currentTarget.style.color = hover,
    onMouseLeave: e => e.currentTarget.style.color = color,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: "50%",
      color,
      transition: "color .25s var(--spring)"
    }
  }, React.cloneElement(ICONS[l.id], {
    width: size,
    height: size
  }))));
}
Object.assign(__ds_scope, { SOCIAL_LINKS, SocialLinks });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SocialLinks.jsx", error: String((e && e.message) || e) }); }

// components/dana/DanaChips.jsx
try { (() => {
/* Dāna amount chips — $5 · $11 · $22 · $54 · Custom; gold selected state, only raises, never pressures. */
function DanaChips({
  amounts = [5, 11, 22, 54],
  custom = true,
  selected,
  onSelect,
  style
}) {
  const [sel, setSel] = React.useState(selected ?? amounts[1]);
  const pick = v => {
    setSel(v);
    onSelect && onSelect(v);
  };
  const chip = (v, label) => {
    const on = sel === v;
    return /*#__PURE__*/React.createElement("button", {
      key: String(v),
      "aria-pressed": on,
      onClick: () => pick(v),
      style: {
        padding: "11px 18px",
        borderRadius: 999,
        cursor: "pointer",
        font: "inherit",
        fontWeight: 700,
        fontSize: 15,
        minHeight: 44,
        transition: "all .25s var(--spring)",
        background: on ? "rgba(217,164,65,0.18)" : "var(--surface-2)",
        border: on ? "0.5px solid var(--gold-deep)" : "0.5px solid var(--hairline)",
        color: on ? "var(--gold-deep)" : "var(--text-secondary)",
        transform: on ? "scale(1.05)" : "none"
      }
    }, label);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Donation amounts",
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "center",
      fontFamily: "var(--font-sans)",
      flexWrap: "wrap",
      ...style
    }
  }, amounts.map(a => chip(a, `$${a}`)), custom && chip("custom", "Custom"));
}
Object.assign(__ds_scope, { DanaChips });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/dana/DanaChips.jsx", error: String((e && e.message) || e) }); }

// components/dana/GiveSlider.jsx
try { (() => {
/* "Give more if it feels true" slider — base is the minimum; only raises, never pressures. */
function GiveSlider({
  min = 11,
  max = 33,
  step = 1,
  value,
  onChange,
  period = "/mo",
  style
}) {
  const [v, setV] = React.useState(value ?? min);
  const set = x => {
    setV(x);
    onChange && onChange(x);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--text-tertiary)",
      marginBottom: 8
    }
  }, "give more, if it feels true"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: v,
    onChange: e => set(+e.target.value),
    "aria-label": "Amount \u2014 give more if it feels true",
    style: {
      width: "100%",
      accentColor: "var(--gold-deep)",
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      color: "var(--text-tertiary)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "$", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--gold-deep)",
      fontSize: 15
    }
  }, v), period), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)"
    }
  }, "if it feels true")));
}
Object.assign(__ds_scope, { GiveSlider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/dana/GiveSlider.jsx", error: String((e && e.message) || e) }); }

// components/lists/StepRow.jsx
try { (() => {
/* Curriculum step row. state: done | next | locked | idle. gate renders ⛩/☸. */
function StepRow({
  title,
  subtitle,
  state = "idle",
  gate = false,
  lockedNote,
  action,
  onAction,
  style
}) {
  const done = state === "done",
    next = state === "next",
    locked = state === "locked";
  const ico = gate ? done ? "☸" : "⛩" : done ? "✓" : next ? "▶" : "·";
  const icoStyle = done ? {
    background: "rgba(94,138,74,0.12)",
    borderColor: "rgba(94,138,74,0.35)",
    color: "var(--sage)"
  } : next ? {
    background: "rgba(217,164,65,0.18)",
    borderColor: "rgba(168,120,31,0.5)",
    color: "var(--gold-deep)",
    animation: "pulseGold 3s ease-in-out infinite"
  } : {
    background: "var(--surface-2)",
    borderColor: "var(--hairline)",
    color: "var(--text-secondary)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 0",
      borderBottom: "0.5px solid var(--hairline)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes pulseGold{0%,100%{box-shadow:0 0 0 0 rgba(217,164,65,0.25)}50%{box-shadow:0 0 0 8px rgba(217,164,65,0)}}`), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 15,
      borderWidth: "0.5px",
      borderStyle: "solid",
      ...icoStyle
    }
  }, ico), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      fontSize: 13.5,
      letterSpacing: "-0.1px",
      color: locked ? "var(--text-tertiary)" : "var(--text-body)"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("small", {
    style: {
      color: "var(--text-tertiary)",
      fontSize: 12
    }
  }, subtitle), locked && lockedNote && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      fontFamily: "var(--font-serif)",
      fontSize: 12,
      color: "var(--gold-deep)",
      opacity: 0.85
    }
  }, "\u2638 ", lockedNote)), next && action && /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      padding: "8px 14px",
      fontSize: 12.5,
      flex: "0 0 auto",
      border: 0,
      cursor: "pointer",
      font: "inherit",
      fontWeight: 600,
      borderRadius: 999,
      background: "var(--ink)",
      color: "#FBFAF7",
      boxShadow: "var(--shadow-btn)",
      minHeight: 38
    }
  }, action));
}
Object.assign(__ds_scope, { StepRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/StepRow.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppHeader.jsx
try { (() => {
/* Sticky blurred app header — logo mark + name left, compact title fades in when scrolled. */
function AppHeader({
  title = "",
  scrolled = false,
  logo,
  brand = "toUnknown",
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px",
      background: "var(--surface-blur)",
      backdropFilter: "var(--blur-header)",
      WebkitBackdropFilter: "var(--blur-header)",
      borderBottom: scrolled ? "0.5px solid var(--hairline)" : "0.5px solid transparent",
      transition: "border-color .3s",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 700,
      fontSize: 15,
      color: "var(--text-body)"
    }
  }, logo ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: `${brand} logo`,
    style: {
      height: 28,
      width: "auto",
      borderRadius: 7
    }
  }) : /*#__PURE__*/React.createElement(__ds_scope.Orb, {
    size: 26,
    glow: false
  }), brand), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: "-0.2px",
      color: "var(--text-body)",
      opacity: scrolled ? 1 : 0,
      transform: scrolled ? "none" : "translateY(4px)",
      transition: "all .3s var(--spring)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26
    }
  }));
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
/* Fixed bottom tab bar — 5 tabs, SF Symbols-style stroke icons, gold active, optional member dot. */
const ICONS = {
  home: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 11.5 12 4l8 7.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 10v9h11v-9"
  })),
  path: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6 20c0-7 12-4 12-13"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "5",
    r: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "20",
    r: "1.8"
  })),
  sangha: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "9",
    r: "2.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15.5",
    cy: "9",
    r: "2.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.5 19c.8-3.2 2.7-4.8 5-4.8s4.2 1.6 5 4.8M12.6 14.6c.9-.3 1.9-.4 2.9-.4 2.3 0 4.2 1.6 5 4.8"
  })),
  dana: /*#__PURE__*/React.createElement("path", {
    d: "M12 3.5c2.5 3.2 6.5 4 6.5 8.4 0 3.9-2.9 6.6-6.5 6.6s-6.5-2.7-6.5-6.6c0-4.4 4-5.2 6.5-8.4Z"
  }),
  profile: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8.4",
    r: "3.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.8 20c1.2-3.8 3.9-5.6 7.2-5.6s6 1.8 7.2 5.6"
  }))
};
function TabBar({
  tabs,
  active,
  onChange,
  fixed = true,
  style
}) {
  const items = tabs ?? [{
    id: "home",
    label: "Home",
    icon: "home"
  }, {
    id: "paths",
    label: "Mārga",
    icon: "path"
  }, {
    id: "community",
    label: "Sangha",
    icon: "sangha"
  }, {
    id: "membership",
    label: "Dāna",
    icon: "dana"
  }, {
    id: "profile",
    label: "Sādhana",
    icon: "profile"
  }];
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Main",
    style: {
      position: fixed ? "fixed" : "relative",
      bottom: 0,
      left: fixed ? "50%" : undefined,
      transform: fixed ? "translateX(-50%)" : undefined,
      width: "100%",
      maxWidth: 430,
      zIndex: 40,
      display: "flex",
      background: "rgba(251,250,247,0.82)",
      backdropFilter: "var(--blur-tabbar)",
      WebkitBackdropFilter: "var(--blur-tabbar)",
      borderTop: "0.5px solid var(--hairline)",
      padding: "8px 6px 10px",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, items.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      "aria-label": t.label,
      onClick: () => onChange && onChange(t.id),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: 0,
        cursor: "pointer",
        color: on ? "var(--gold-deep)" : "var(--text-tertiary)",
        font: "inherit",
        fontSize: 10.5,
        fontWeight: 600,
        padding: "6px 0",
        minHeight: 48,
        position: "relative",
        transition: "color .25s"
      }
    }, t.dot && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 4,
        right: "calc(50% - 16px)",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "var(--gold-deep)"
      }
    }), /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      style: {
        width: 23,
        height: 23,
        stroke: "currentColor",
        fill: "none",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        transition: "transform .3s var(--spring)",
        transform: on ? "translateY(-1px)" : "none"
      }
    }, ICONS[t.icon] ?? ICONS.home), t.label);
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Sheet.jsx
try { (() => {
/* Bottom sheet with grabber handle — translucent white blur, 28px top radius, Esc closes. */
function Sheet({
  open,
  onClose,
  children,
  maxWidth = 430,
  ariaLabel = "Sheet",
  style
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === "Escape" && onClose) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": ariaLabel,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: open ? "flex" : "none",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(30,28,20,0.32)",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      opacity: open ? 1 : 0,
      transition: "opacity .32s"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      maxWidth,
      maxHeight: "92%",
      overflowY: "auto",
      background: "var(--sheet-blur)",
      backdropFilter: "var(--blur-sheet)",
      WebkitBackdropFilter: "var(--blur-sheet)",
      borderRadius: "28px 28px 0 0",
      border: "0.5px solid var(--hairline)",
      borderBottom: "none",
      transform: open ? "none" : "translateY(40px)",
      opacity: open ? 1 : 0,
      transition: "all .38s var(--spring)",
      padding: "10px 22px 28px",
      boxShadow: "var(--shadow-sheet)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 5,
      borderRadius: 99,
      background: "rgba(25,24,19,0.18)",
      margin: "6px auto 18px"
    }
  }), children));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Sheet.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Toast.jsx
try { (() => {
/* Quiet pill toast — white blur, gold hairline. Position above the tab bar. */
function Toast({
  message,
  show = true,
  fixed = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    "aria-live": "polite",
    style: {
      position: fixed ? "fixed" : "relative",
      bottom: fixed ? 100 : undefined,
      left: fixed ? "50%" : undefined,
      transform: fixed ? `translateX(-50%) translateY(${show ? 0 : 16}px)` : undefined,
      opacity: show ? 1 : 0,
      zIndex: 99,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      color: "var(--text-body)",
      border: "0.5px solid rgba(168,120,31,0.35)",
      padding: "12px 22px",
      borderRadius: 999,
      fontSize: 14,
      fontWeight: 500,
      transition: "all .38s var(--spring)",
      pointerEvents: "none",
      boxShadow: "var(--shadow-toast)",
      maxWidth: "88%",
      textAlign: "center",
      display: "inline-block",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, message);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Toast.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/DanaScreen.jsx
try { (() => {
const {
  Interlude,
  TierCard,
  Button,
  DanaChips,
  GiveSlider
} = window.ToUnknownDesignSystem_9d38c1;
function DanaScreen({
  go,
  toast
}) {
  const T = window.TU;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Interlude, {
    style: {
      paddingTop: 44
    },
    quote: "These meditations are offered freely \u2014 in the spirit of generosity.",
    attribution: "\u2014 d\u0101na, the root of a connected life"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(TierCard, {
    chip: "seeker",
    price: "$0",
    priceNote: "\xB7 d\u0101na",
    bullets: ["First gate of every Path — free forever", "Community, read-only", "Give only if it feels true"]
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    wide: true,
    onClick: () => go("paths")
  }, "Start free")), /*#__PURE__*/React.createElement(TierCard, {
    hot: true,
    chip: "student \xB7 toUnknown+",
    chipTone: "gold",
    price: "$11",
    priceNote: "/mo or $88/yr",
    bullets: ["All four Paths, unlocked by your practice", "Downloads for offline sitting", "Sangha participation + monthly satsang"]
  }, /*#__PURE__*/React.createElement(GiveSlider, {
    style: {
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement(Button, {
    wide: true,
    onClick: toast
  }, "Become a Student"), /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    wide: true,
    onClick: toast
  }, "or $88 / year \u2014 two months free")), /*#__PURE__*/React.createElement(TierCard, {
    chip: "s\u0101dhaka \xB7 the guided circle",
    chipTone: "green",
    price: "$33",
    priceNote: "/mo",
    bullets: ["Everything in Student", "A circle of max 30 with a lineage teacher", "Monthly live small-group guidance + direct Q&A", "Gate reviews — your practice, seen"]
  }, /*#__PURE__*/React.createElement(Button, {
    wide: true,
    onClick: toast
  }, "Enter the circle")), /*#__PURE__*/React.createElement(TierCard, {
    chip: "founding member",
    price: "$108",
    priceNote: "\xB7 once",
    bullets: ["Lifetime Student membership", "Your name on the gratitude wall"]
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    wide: true,
    onClick: toast
  }, "Become founding"))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 24,
      overflow: "hidden",
      border: "0.5px solid var(--hairline)",
      marginTop: 26,
      boxShadow: "var(--shadow-photo)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: T.danaImg,
    alt: "D\u0101na \u2014 the practice of generosity",
    width: "1440",
    height: "756",
    loading: "lazy",
    style: {
      display: "block",
      width: "100%",
      height: 140,
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "18px 0 6px",
      fontSize: 18,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, "One-time d\u0101na"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, "No fixed cost. No pressure. Only presence, and the freedom to give \u2014 if it feels true."), /*#__PURE__*/React.createElement(DanaChips, {
    style: {
      margin: "20px 0"
    }
  }), /*#__PURE__*/React.createElement(Button, {
    wide: true,
    onClick: toast
  }, "Give with a free heart"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      margin: "12px 0 0"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.paypal.com/donate?hosted_button_id=H5VQT3VLQBUBJ",
    target: "_blank",
    style: {
      color: "var(--text-tertiary)",
      fontSize: 13
    }
  }, "or quietly via PayPal"))), /*#__PURE__*/React.createElement(Interlude, {
    quote: "No one is turned away for money.",
    attribution: "scholarship \u2014 write us one honest paragraph \xB7 apply"
  }));
}
window.DanaScreen = DanaScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/DanaScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/DesktopScreens.jsx
try { (() => {
const {
  Orb,
  Button,
  Chip,
  Interlude,
  PathCard,
  TierCard,
  StatCard,
  TeacherCard,
  CircleCard,
  StepRow,
  DanaChips,
  GiveSlider
} = window.ToUnknownDesignSystem_9d38c1;
const SocialLinks = window.ToUnknownDesignSystem_9d38c1.SocialLinks || (() => null);
const WRAP = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 32px"
};
function DHome({
  openPath,
  go
}) {
  const T = window.TU;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minHeight: 560,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `url('${T.hero}') center 30%/cover`,
      backgroundColor: "#0B0B10"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse 70% 75% at 50% 50%,rgba(11,11,16,0.55) 0%,rgba(11,11,16,0.3) 55%,rgba(11,11,16,0.72) 100%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "72px 32px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-white.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      width: 56,
      height: "auto",
      marginBottom: 24,
      animation: "breathe 6s ease-in-out infinite"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wordmark-white.png",
    alt: "toUnknown",
    style: {
      width: 300,
      height: "auto",
      display: "block",
      marginBottom: 20
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 8px",
      fontFamily: "var(--font-serif)",
      fontSize: 12.5,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "rgba(245,244,240,0.88)"
    }
  }, T.brand.tagline), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 32px",
      fontFamily: "var(--font-serif)",
      fontSize: 15,
      color: "rgba(255,255,255,0.68)"
    }
  }, T.brand.subline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => go("paths")
  }, "Begin a Path"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => openPath(T.paths[0])
  }, "Sit 15 min free")))), /*#__PURE__*/React.createElement(Interlude, {
    quote: T.brand.philosophy,
    attribution: "\u2014 the toUnknown way",
    size: 26,
    style: {
      padding: "64px 28px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.1fr 1fr",
      gap: 32,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 210,
      height: 210,
      transform: "rotate(45deg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-photo)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=789,fit=crop/d95DMJoWQZi9KZO2/shiva-meditation-online-A85Vy47MEOF7lOJL.jpg",
    alt: "Shiva Nataraja",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: "rotate(-45deg) scale(1.42)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 24,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "3.5px",
      color: "var(--ink)"
    }
  }, "FEATURED"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0",
      fontSize: 14,
      letterSpacing: "3px",
      color: "var(--text-secondary)",
      fontFamily: "var(--font-serif)"
    }
  }, "MEDITATION TECHNIQUES"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--gold-deep)",
      fontSize: 18
    }
  }, "\u2193")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: T.satsang,
    alt: "True meditation",
    style: {
      width: 210,
      height: 210,
      objectFit: "cover",
      borderRadius: "50%",
      boxShadow: "var(--shadow-photo)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 64,
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 19,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "Vigyan Bhairav Tantra"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 18px",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, "112 Guided Audio Meditation techniques by Shiva (Vij\xF1ana Bhairava Tantra). An ancient Indian scripture unveils 112 transformative meditation techniques guiding seekers toward ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "spiritual awakening, self-realization.")), /*#__PURE__*/React.createElement(Button, {
    onClick: () => openPath(T.paths[1])
  }, "Let's try")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 19,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "Vipassana Meditation"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 18px",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, "An ancient meditation technique rediscovered by Gautama Buddha over 2500 years ago \u2014 three fundamental elements: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "S\u012Bla"), " (moral conduct), ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "Samadhi"), " (focused attention and equanimity), ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "Pa\xF1\xF1a"), " (wisdom and insight)."), /*#__PURE__*/React.createElement(Button, {
    onClick: () => openPath(T.paths[0])
  }, "Start!")))), /*#__PURE__*/React.createElement("div", {
    style: WRAP
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 4px",
      fontSize: 21,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "The four Paths"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 20px",
      fontSize: 13.5,
      color: "var(--text-secondary)",
      maxWidth: 560
    }
  }, "Only the roots \u2014 from every ancient tradition. One Path at a time, walked, not browsed."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16
    }
  }, T.paths.map(p => /*#__PURE__*/React.createElement(PathCard, {
    key: p.id,
    image: p.image,
    lineage: `${p.tradition} · ${p.source}`,
    title: p.name,
    essence: p.essence,
    style: {
      minHeight: 320,
      borderRadius: 22
    },
    onClick: () => openPath(p)
  })))), /*#__PURE__*/React.createElement(Interlude, {
    quote: "THEREFORE, DON'T TRY",
    attribution: "\u2014 on effortless effort",
    size: 24,
    style: {
      padding: "60px 28px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 32,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 24,
      overflow: "hidden",
      border: "0.5px solid var(--hairline)",
      boxShadow: "var(--shadow-photo)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: T.masterpiece,
    alt: "You are your own masterpiece \u2014 toUnknown",
    width: "768",
    height: "583",
    loading: "lazy",
    style: {
      display: "block",
      width: "100%",
      height: "auto"
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: 14,
      margin: "12px 0 0",
      fontFamily: "var(--font-serif)",
      color: "var(--text-secondary)"
    }
  }, "You are your OWN masterpiece...")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 6px",
      fontSize: 21,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "How it works"), /*#__PURE__*/React.createElement(StepRow, {
    state: "next",
    title: "Choose a lineage Path",
    subtitle: "Vipassana \xB7 Tantra \xB7 Vedanta \xB7 Bhakti \u2014 each cites its root text and era"
  }), /*#__PURE__*/React.createElement(StepRow, {
    title: "Unlock by abhy\u0101sa \u2014 steady practice",
    subtitle: "Each track opens only after you have sat the one before. Never by payment"
  }), /*#__PURE__*/React.createElement(StepRow, {
    gate: true,
    title: "Pass the D\u012Bk\u1E63\u0101 Gate",
    subtitle: "Practice hours + a written reflection \u2014 the s\u0101dhaka seal"
  }), /*#__PURE__*/React.createElement(StepRow, {
    title: "Give by gratitude",
    subtitle: "D\u0101na appears after practice, never before"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      marginTop: 48,
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 24,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement(TierCard, {
    hot: true,
    chip: "membership",
    chipTone: "gold",
    title: "One membership. Every Path."
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, "$11/month or $88/year \u2014 and the guided S\u0101dhaka circle for those who go deep."), /*#__PURE__*/React.createElement(Button, {
    style: {
      marginTop: 16
    },
    onClick: () => go("membership")
  }, "See the tuition ladder")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 11,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--text-tertiary)"
    }
  }, "Trusted by practitioners"), /*#__PURE__*/React.createElement("img", {
    src: T.trustpilot,
    alt: "Trustpilot reviews",
    width: "200",
    height: "33",
    loading: "lazy",
    style: {
      borderRadius: 8,
      margin: "0 auto"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "48px 20px 28px",
      textAlign: "center",
      color: "var(--text-tertiary)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(SocialLinks, {
    style: {
      marginBottom: 10
    }
  }), "\xA9 2026 toUnknown \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "https://tounknown.com/terms-of-use",
    target: "_blank",
    style: {
      color: "var(--text-tertiary)"
    }
  }, "Terms")));
}
function DPaths({
  openPath
}) {
  const T = window.TU;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      paddingTop: 40
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 32,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.4px",
      color: "var(--ink)"
    }
  }, "M\u0101rga"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 24px",
      fontFamily: "var(--font-serif)",
      fontSize: 15,
      color: "var(--text-secondary)"
    }
  }, "The Paths \u2014 a living library of humanity's contemplative roots."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 18
    }
  }, T.paths.map((p, i) => /*#__PURE__*/React.createElement(PathCard, {
    key: p.id,
    image: p.image,
    lineage: `${p.tradition} · ${p.source}`,
    title: p.name,
    essence: p.essence,
    progress: i === 0 ? 17 : 0,
    meta: [{
      label: `${p.steps.filter(s => !s.gate).length} sittings`
    }, i === 0 ? {
      label: "on the path",
      gold: true
    } : {
      label: "first gate free"
    }],
    style: {
      minHeight: 240
    },
    onClick: () => openPath(p)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 32,
      marginTop: 44,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 4px",
      fontSize: 20,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "Paths awaiting their teachers"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px",
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, "Each Path opens when its authorized lineage teacher joins the Sangha Circle."), /*#__PURE__*/React.createElement("div", {
    style: {
      columns: 2,
      columnGap: 32
    }
  }, T.futurePaths.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.name,
    style: {
      breakInside: "avoid",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "13px 0",
      borderBottom: "0.5px solid var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: "50%",
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--surface-2)",
      border: "0.5px solid var(--hairline)",
      fontSize: 14
    }
  }, "\u26E9"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      fontSize: 14.5,
      letterSpacing: "-0.2px",
      color: "var(--text-secondary)"
    }
  }, f.name), /*#__PURE__*/React.createElement("small", {
    style: {
      fontFamily: "var(--font-serif)",
      color: "var(--gold-deep)",
      opacity: 0.8,
      fontSize: 12
    }
  }, f.tradition, " \xB7 ", f.source)))))), /*#__PURE__*/React.createElement(TierCard, {
    chip: "for teachers",
    title: "Teach with us \u2014 the Sangha Circle"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, "Authentic lineage teachers only. Name your parampar\u0101 \u2014 who taught your teacher?"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    wide: true,
    style: {
      marginTop: 14
    }
  }, "Apply \xB7 state your lineage"))));
}
function DSangha({
  go
}) {
  const T = window.TU;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      paddingTop: 40
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 32,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.4px",
      color: "var(--ink)"
    }
  }, "Sangha"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 24px",
      fontFamily: "var(--font-serif)",
      fontSize: 15,
      color: "var(--text-secondary)"
    }
  }, "Not a feed. A circle of practitioners."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 24,
      border: "0.5px solid rgba(168,120,31,0.45)",
      boxShadow: "var(--shadow-gold)",
      background: "rgba(255,255,255,0.62)",
      backdropFilter: "blur(20px) saturate(1.5)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: T.satsang,
    alt: "True meditation \u2014 live satsang",
    width: "768",
    height: "400",
    loading: "lazy",
    style: {
      display: "block",
      width: "100%",
      height: 260,
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "gold"
  }, "live satsang"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "8px 0 0",
      fontSize: 18,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, "Monthly live sitting with DYN"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, "Members sit together, then ask. Recordings join the library."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, T.circles.map(([n, d]) => /*#__PURE__*/React.createElement(CircleCard, {
    key: n,
    title: n,
    description: d,
    locked: true,
    onJoin: () => go("membership")
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      textAlign: "center",
      margin: "8px 0 0",
      color: "var(--text-secondary)"
    }
  }, "While the in-app Sangha is being built, the circle lives on ", /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/tounknowndotcom",
    target: "_blank",
    style: {
      color: "var(--gold-deep)"
    }
  }, "Telegram"), "."))));
}
function DDana({
  go,
  toast
}) {
  const T = window.TU;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Interlude, {
    style: {
      paddingTop: 56
    },
    size: 26,
    quote: "These meditations are offered freely \u2014 in the spirit of generosity.",
    attribution: "\u2014 d\u0101na, the root of a connected life"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 18,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement(TierCard, {
    chip: "seeker",
    price: "$0",
    priceNote: "\xB7 d\u0101na",
    bullets: ["First gate of every Path — free forever", "Community, read-only", "Give only if it feels true"]
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    wide: true,
    onClick: () => go("paths")
  }, "Start free")), /*#__PURE__*/React.createElement(TierCard, {
    hot: true,
    chip: "student \xB7 toUnknown+",
    chipTone: "gold",
    price: "$11",
    priceNote: "/mo or $88/yr",
    bullets: ["All four Paths, unlocked by practice", "Downloads for offline sitting", "Sangha + monthly satsang"]
  }, /*#__PURE__*/React.createElement(GiveSlider, {
    style: {
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement(Button, {
    wide: true,
    onClick: toast
  }, "Become a Student")), /*#__PURE__*/React.createElement(TierCard, {
    chip: "s\u0101dhaka \xB7 the guided circle",
    chipTone: "green",
    price: "$33",
    priceNote: "/mo",
    bullets: ["Everything in Student", "A circle of max 30 with a lineage teacher", "Monthly live guidance + Q&A"]
  }, /*#__PURE__*/React.createElement(Button, {
    wide: true,
    onClick: toast
  }, "Enter the circle")), /*#__PURE__*/React.createElement(TierCard, {
    chip: "founding member",
    price: "$108",
    priceNote: "\xB7 once",
    bullets: ["Lifetime Student membership", "Your name on the gratitude wall"]
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    wide: true,
    onClick: toast
  }, "Become founding"))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 32,
      marginTop: 40,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 24,
      overflow: "hidden",
      border: "0.5px solid var(--hairline)",
      boxShadow: "var(--shadow-photo)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: T.danaImg,
    alt: "D\u0101na \u2014 the practice of generosity",
    width: "1440",
    height: "756",
    loading: "lazy",
    style: {
      display: "block",
      width: "100%",
      height: 240,
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 6px",
      fontSize: 20,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "One-time d\u0101na"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, "No fixed cost. No pressure. Only presence, and the freedom to give \u2014 if it feels true."), /*#__PURE__*/React.createElement(DanaChips, {
    style: {
      margin: "18px 0",
      justifyContent: "flex-start"
    }
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: toast
  }, "Give with a free heart"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.paypal.com/donate?hosted_button_id=H5VQT3VLQBUBJ",
    target: "_blank",
    style: {
      color: "var(--text-tertiary)",
      fontSize: 13
    }
  }, "or quietly via PayPal")))), /*#__PURE__*/React.createElement(Interlude, {
    quote: "No one is turned away for money.",
    attribution: "scholarship \u2014 write us one honest paragraph \xB7 apply"
  }));
}
function DProfile() {
  const T = window.TU;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...WRAP,
      paddingTop: 40
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 32,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.4px",
      color: "var(--ink)"
    }
  }, "Your s\u0101dhana"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 32,
      marginTop: 20,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: 15,
    label: "minutes sat"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: 1,
    label: "tracks completed"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: 0,
    label: "gates passed"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      textAlign: "center",
      fontFamily: "var(--font-serif)",
      color: "var(--text-secondary)",
      margin: "0 0 26px"
    }
  }, "You are on the Path. Keep sitting."), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 6px",
      fontSize: 19,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "Your teacher"), /*#__PURE__*/React.createElement(TeacherCard, {
    avatar: T.teacher.avatar,
    name: T.teacher.name,
    lineage: T.teacher.lineage,
    bio: T.teacher.bio,
    parampara: T.teacher.parampara
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 6px",
      fontSize: 19,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "Questions"), [["Can I practice without paying?", "Yes. The first gate of every Path is free, and no one is turned away for money — write one honest paragraph to apply for a scholarship."], ["How do Paths unlock?", "By practice, not payment. Each track opens after you have sat the one before — the way real retreats and lineages work."], ["The Sanskrit we use", "Sādhana — practice · Mārga — the path · Dīkṣā — the gate · Abhyāsa — steady repetition · Dāna — generosity · Sangha — community · Satsang — gathering in truth · Sādhaka — committed practitioner · Ācārya — teacher · Paramparā — the unbroken chain of transmission."]].map(([q, a]) => /*#__PURE__*/React.createElement("details", {
    key: q,
    style: {
      borderBottom: "0.5px solid var(--hairline)",
      padding: "14px 0"
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 15,
      color: "var(--ink)"
    }
  }, q), /*#__PURE__*/React.createElement("p", {
    style: {
      paddingTop: 10,
      color: "var(--text-secondary)",
      fontSize: 14.5,
      margin: 0
    }
  }, a))))));
}
Object.assign(window, {
  DHome,
  DPaths,
  DSangha,
  DDana,
  DProfile
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/DesktopScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/HomeScreen.jsx
try { (() => {
const {
  Orb,
  Button,
  Chip,
  Interlude,
  PathCard,
  TierCard,
  StepRow
} = window.ToUnknownDesignSystem_9d38c1;
const SocialLinks = window.ToUnknownDesignSystem_9d38c1.SocialLinks || (() => null);
function HomeScreen({
  openPath,
  go
}) {
  const T = window.TU;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minHeight: 500,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "56px 20px 44px",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `url('${T.hero}') center 30%/cover`,
      backgroundColor: "#0B0B10"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse 90% 70% at 50% 52%,rgba(11,11,16,0.6) 0%,rgba(11,11,16,0.35) 55%,rgba(11,11,16,0.7) 100%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wordmark-white.png",
    alt: "toUnknown",
    style: {
      width: 250,
      height: "auto",
      display: "block",
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 8px",
      fontFamily: "var(--font-serif)",
      fontSize: 11.5,
      letterSpacing: "2.5px",
      textTransform: "uppercase",
      color: "rgba(245,244,240,0.88)",
      textWrap: "balance"
    }
  }, T.brand.tagline), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 30px",
      fontFamily: "var(--font-serif)",
      fontSize: 14,
      color: "rgba(255,255,255,0.68)"
    }
  }, T.brand.subline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => go("paths")
  }, "Begin a Path"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => openPath(T.paths[0])
  }, "Sit 15 min free")))), /*#__PURE__*/React.createElement(Interlude, {
    quote: T.brand.philosophy,
    attribution: "\u2014 the toUnknown way"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 20px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 19,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "3px",
      color: "var(--ink)"
    }
  }, "FEATURED"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 4px",
      fontSize: 12,
      letterSpacing: "2px",
      color: "var(--text-secondary)",
      fontFamily: "var(--font-serif)"
    }
  }, "MEDITATION TECHNIQUES"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 22px",
      color: "var(--gold-deep)"
    }
  }, "\u2193"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "0 0 26px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      height: 150,
      transform: "rotate(45deg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-photo)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=789,fit=crop/d95DMJoWQZi9KZO2/shiva-meditation-online-A85Vy47MEOF7lOJL.jpg",
    alt: "Shiva Nataraja",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: "rotate(-45deg) scale(1.42)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.62)",
      backdropFilter: "blur(20px) saturate(1.5)",
      WebkitBackdropFilter: "blur(20px) saturate(1.5)",
      border: "0.5px solid var(--hairline)",
      borderRadius: 24,
      padding: 20,
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 17,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, "Vigyan Bhairav Tantra"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 16px",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, "112 Guided Audio Meditation techniques by Shiva (Vij\xF1ana Bhairava Tantra). An ancient Indian scripture unveils 112 transformative techniques guiding seekers toward ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "spiritual awakening, self-realization.")), /*#__PURE__*/React.createElement(Button, {
    onClick: () => openPath(T.paths[1])
  }, "Let's try")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.62)",
      backdropFilter: "blur(20px) saturate(1.5)",
      WebkitBackdropFilter: "blur(20px) saturate(1.5)",
      border: "0.5px solid var(--hairline)",
      borderRadius: 24,
      padding: 20,
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 17,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, "Vipassana Meditation"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 16px",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, "An ancient technique rediscovered by Gautama Buddha over 2500 years ago \u2014 three fundamental elements: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "S\u012Bla"), " (moral conduct), ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "Samadhi"), " (focused attention and equanimity), ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "Pa\xF1\xF1a"), " (wisdom and insight)."), /*#__PURE__*/React.createElement(Button, {
    onClick: () => openPath(T.paths[0])
  }, "Start!")))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 20px",
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 4px",
      fontSize: 18,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, "The four Paths"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, "Only the roots \u2014 from every ancient tradition. One Path at a time, walked, not browsed.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      overflowX: "auto",
      scrollSnapType: "x mandatory",
      padding: "4px 20px 18px"
    }
  }, T.paths.map(p => /*#__PURE__*/React.createElement(PathCard, {
    key: p.id,
    layout: "row",
    image: p.image,
    lineage: `${p.tradition} · ${p.source}`,
    title: p.name,
    essence: p.essence,
    onClick: () => openPath(p)
  }))), /*#__PURE__*/React.createElement(Interlude, {
    quote: "THEREFORE, DON'T TRY",
    attribution: "\u2014 on effortless effort"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 20px",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 24,
      overflow: "hidden",
      border: "0.5px solid var(--hairline)",
      boxShadow: "var(--shadow-photo)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: T.masterpiece,
    alt: "You are your own masterpiece \u2014 toUnknown",
    width: "768",
    height: "583",
    loading: "lazy",
    style: {
      display: "block",
      width: "100%",
      height: "auto"
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      fontSize: 14,
      margin: "12px 0 0",
      fontFamily: "var(--font-serif)",
      color: "var(--text-secondary)"
    }
  }, "You are your OWN masterpiece...")), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "20px 0 4px",
      fontSize: 18,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, "How it works"), /*#__PURE__*/React.createElement(StepRow, {
    state: "next",
    title: "Choose a lineage Path",
    subtitle: "Vipassana \xB7 Tantra \xB7 Vedanta \xB7 Bhakti \u2014 each cites its root text and era"
  }), /*#__PURE__*/React.createElement(StepRow, {
    title: "Unlock by abhy\u0101sa \u2014 steady practice",
    subtitle: "Each track opens only after you have sat the one before. Never by payment"
  }), /*#__PURE__*/React.createElement(StepRow, {
    gate: true,
    title: "Pass the D\u012Bk\u1E63\u0101 Gate",
    subtitle: "Practice hours + a written reflection \u2014 the s\u0101dhaka seal"
  }), /*#__PURE__*/React.createElement(StepRow, {
    title: "Give by gratitude",
    subtitle: "D\u0101na appears after practice, never before. No one is turned away for money"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 20px",
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement(TierCard, {
    hot: true,
    chip: "membership",
    chipTone: "gold",
    title: "One membership. Every Path."
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, "$11/month or $88/year \u2014 and the guided S\u0101dhaka circle for those who go deep."), /*#__PURE__*/React.createElement(Button, {
    wide: true,
    style: {
      marginTop: 16
    },
    onClick: () => go("membership")
  }, "See the tuition ladder"))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 20px",
      marginTop: 26,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 10px",
      fontSize: 11,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--text-tertiary)"
    }
  }, "Trusted by practitioners"), /*#__PURE__*/React.createElement("img", {
    src: T.trustpilot,
    alt: "Trustpilot reviews",
    width: "200",
    height: "33",
    loading: "lazy",
    style: {
      borderRadius: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "36px 20px 20px",
      textAlign: "center",
      color: "var(--text-tertiary)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(SocialLinks, {
    style: {
      marginBottom: 10
    }
  }), "\xA9 2026 toUnknown \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "https://tounknown.com/terms-of-use",
    target: "_blank",
    style: {
      color: "var(--text-tertiary)"
    }
  }, "Terms")));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/PathSheet.jsx
try { (() => {
const {
  Sheet,
  StepRow,
  Chip,
  Button
} = window.ToUnknownDesignSystem_9d38c1;
function PathSheet({
  path,
  onClose
}) {
  const T = window.TU,
    t = T.teacher;
  if (!path) return null;
  return /*#__PURE__*/React.createElement(Sheet, {
    open: !!path,
    onClose: onClose,
    ariaLabel: "Path details"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 20,
      overflow: "hidden",
      height: 150,
      background: `url('${path.image}') center/cover`,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 12.5,
      color: "var(--gold-deep)"
    }
  }, path.tradition, " \xB7 ", path.source), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "4px 0",
      fontSize: 18,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, path.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, path.essence), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      margin: "12px 0 4px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: t.avatar,
    alt: t.name,
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      objectFit: "cover",
      objectPosition: "top"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 13.5,
      color: "var(--ink)"
    }
  }, t.name), " ", /*#__PURE__*/React.createElement(Chip, {
    tone: "gold",
    style: {
      fontSize: 10,
      padding: "2px 8px"
    }
  }, "parampar\u0101 \u2638"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 12,
      color: "var(--text-secondary)"
    }
  }, t.lineage))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 12,
      color: "var(--gold-deep)",
      margin: "4px 0 2px",
      lineHeight: 1.7
    }
  }, t.parampara.join(" → ")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, path.steps.map((s, i) => {
    const prev = path.steps[i - 1];
    const state = s.done ? "done" : s.next ? "next" : "locked";
    const sub = s.gate ? "Opens after the sitting before it" : `${s.min} min${s.free ? " · free" : ""}`;
    return /*#__PURE__*/React.createElement(StepRow, {
      key: i,
      gate: !!s.gate,
      state: s.gate && !s.done && !s.next ? "idle" : state,
      title: s.t,
      subtitle: sub,
      lockedNote: state === "locked" && !s.gate && prev ? `opens when you have sat ${prev.t.length > 26 ? prev.t.slice(0, 26) + "…" : prev.t}` : undefined,
      action: s.next ? s.gate ? "Enter" : "Sit" : undefined
    });
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    wide: true,
    style: {
      marginTop: 16
    }
  }, "Full guided audio course \u2197"));
}
window.PathSheet = PathSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/PathSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/PathsScreen.jsx
try { (() => {
const {
  PathCard,
  TierCard,
  Chip,
  StepRow,
  Button
} = window.ToUnknownDesignSystem_9d38c1;
function PathsScreen({
  openPath
}) {
  const T = window.TU;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 20,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "M\u0101rga"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 20px",
      fontFamily: "var(--font-serif)",
      color: "var(--text-secondary)"
    }
  }, "The Paths \u2014 a living library of humanity's contemplative roots."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, T.paths.map((p, i) => /*#__PURE__*/React.createElement(PathCard, {
    key: p.id,
    image: p.image,
    lineage: `${p.tradition} · ${p.source}`,
    title: p.name,
    essence: p.essence,
    progress: i === 0 ? 17 : 0,
    meta: [{
      label: `${p.steps.filter(s => !s.gate).length} sittings`
    }, i === 0 ? {
      label: "on the path",
      gold: true
    } : {
      label: "first gate free"
    }],
    onClick: () => openPath(p)
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "30px 0 4px",
      fontSize: 18,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, "Paths awaiting their teachers"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px",
      fontSize: 13.5,
      color: "var(--text-secondary)"
    }
  }, "Each Path opens when its authorized lineage teacher joins the Sangha Circle."), T.futurePaths.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "15px 0",
      borderBottom: "0.5px solid var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--surface-2)",
      border: "0.5px solid var(--hairline)",
      fontSize: 15
    }
  }, "\u26E9"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      fontSize: 15,
      letterSpacing: "-0.2px",
      color: "var(--text-secondary)"
    }
  }, f.name), /*#__PURE__*/React.createElement("small", {
    style: {
      fontFamily: "var(--font-serif)",
      color: "var(--gold-deep)",
      opacity: 0.8,
      fontSize: 12.5
    }
  }, f.tradition, " \xB7 ", f.source)), /*#__PURE__*/React.createElement("a", {
    href: "mailto:tounknown.com@gmail.com",
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 12,
      color: "var(--gold-deep)",
      textDecoration: "none"
    }
  }, "awaiting its \u0101c\u0101rya \xB7 apply"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(TierCard, {
    chip: "for teachers",
    title: "Teach with us \u2014 the Sangha Circle"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, "Authentic lineage teachers only. Name your parampar\u0101 \u2014 who taught your teacher? Which tradition, which source texts?"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    wide: true,
    style: {
      marginTop: 14
    }
  }, "Apply \xB7 state your lineage"))));
}
window.PathsScreen = PathsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/PathsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ProfileScreen.jsx
try { (() => {
const {
  StatCard,
  TeacherCard
} = window.ToUnknownDesignSystem_9d38c1;
const SocialLinks = window.ToUnknownDesignSystem_9d38c1.SocialLinks || (() => null);
function ProfileScreen() {
  const T = window.TU;
  const faq = [["What is the Tounknown Family?", '"Generosity is the root of a connected life." The community exists through voluntary giving — a digital Sangha supporting mindful living.'], ["Can I practice without paying?", "Yes. The first gate of every Path is free, and no one is turned away for money — write one honest paragraph to apply for a scholarship."], ["How do Paths unlock?", "By practice, not payment. Each track opens after you have sat the one before — the way real retreats and lineages work."], ["The Sanskrit we use", "Sādhana — daily spiritual practice · Mārga — the path · Dīkṣā — initiation, the gate · Abhyāsa — steady, devoted repetition · Dāna — generosity · Sangha — the community · Satsang — gathering in truth · Sādhaka — the committed practitioner · Ācārya — the teacher · Paramparā — the unbroken chain of transmission; every teacher here names theirs."]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 20,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "Your s\u0101dhana"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 12,
      margin: "18px 0"
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: 15,
    label: "minutes sat"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: 1,
    label: "tracks completed"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: 0,
    label: "gates passed"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      textAlign: "center",
      fontFamily: "var(--font-serif)",
      color: "var(--text-secondary)",
      margin: 0
    }
  }, "You are on the Path. Keep sitting."), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "30px 0 6px",
      fontSize: 18,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, "Your teacher"), /*#__PURE__*/React.createElement(TeacherCard, {
    avatar: T.teacher.avatar,
    name: T.teacher.name,
    lineage: T.teacher.lineage,
    bio: T.teacher.bio,
    parampara: T.teacher.parampara
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "26px 0 6px",
      fontSize: 18,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, "Questions"), faq.map(([q, a]) => /*#__PURE__*/React.createElement("details", {
    key: q,
    style: {
      borderBottom: "0.5px solid var(--hairline)",
      padding: "14px 0"
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 15,
      color: "var(--ink)"
    }
  }, q), /*#__PURE__*/React.createElement("p", {
    style: {
      paddingTop: 10,
      color: "var(--text-secondary)",
      fontSize: 14.5,
      margin: 0
    }
  }, a))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "36px 0 20px",
      textAlign: "center",
      color: "var(--text-tertiary)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(SocialLinks, {
    style: {
      marginBottom: 10
    }
  }), "\xA9 2026 toUnknown"));
}
window.ProfileScreen = ProfileScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ProfileScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/SanghaScreen.jsx
try { (() => {
const {
  Chip,
  CircleCard
} = window.ToUnknownDesignSystem_9d38c1;
function SanghaScreen({
  go
}) {
  const T = window.TU;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 20,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.3px",
      color: "var(--ink)"
    }
  }, "Sangha"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 20px",
      fontFamily: "var(--font-serif)",
      color: "var(--text-secondary)"
    }
  }, "Not a feed. A circle of practitioners."), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 24,
      border: "0.5px solid rgba(168,120,31,0.45)",
      boxShadow: "var(--shadow-gold)",
      background: "rgba(255,255,255,0.62)",
      backdropFilter: "blur(20px) saturate(1.5)",
      overflow: "hidden",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: T.satsang,
    alt: "True meditation \u2014 live satsang",
    width: "768",
    height: "400",
    loading: "lazy",
    style: {
      display: "block",
      width: "100%",
      height: 150,
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "gold"
  }, "live satsang"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "8px 0 0",
      fontSize: 17,
      fontFamily: "var(--font-serif)",
      fontWeight: 400,
      letterSpacing: "0.2px",
      color: "var(--ink)"
    }
  }, "Monthly live sitting with DYN"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, "Members sit together, then ask. Recordings join the library."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, T.circles.map(([n, d], i) => /*#__PURE__*/React.createElement(CircleCard, {
    key: n,
    title: n,
    description: d,
    locked: true,
    onJoin: () => go("membership")
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      textAlign: "center",
      margin: "20px 0",
      color: "var(--text-secondary)"
    }
  }, "While the in-app Sangha is being built, the circle lives on ", /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/tounknowndotcom",
    target: "_blank",
    style: {
      color: "var(--gold-deep)"
    }
  }, "Telegram"), "."));
}
window.SanghaScreen = SanghaScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/SanghaScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
/* toUnknown app data — lifted verbatim from tounknown-app.html #tu-config */
window.TU = {
  logo: "../../assets/logo-black.png",
  hero: "../../assets/hero-monks.png",
  masterpiece: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=583,fit=crop/d95DMJoWQZi9KZO2/tounknown.com-YX41rpojaNUDwELy.png",
  trustpilot: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=61,fit=crop/d95DMJoWQZi9KZO2/trustpilot-vipassana.life-95flksHt92UTTjoa.png",
  satsang: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=768,fit=crop/d95DMJoWQZi9KZO2/true-meditation-AzGjpnnRKjCvn38p.jpg",
  danaImg: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/d95DMJoWQZi9KZO2/dana-m5Kn67gab6IJl6G1.jpg",
  brand: {
    tagline: "KNOW THYSELF THROUGH SPIRITUAL STRENGTH",
    subline: "this is not religion — this is inner universe",
    philosophy: "WE DON'T GIVE ANSWERS. WE CREATE A SPACE WHERE YOU HEAR YOUR OWN"
  },
  teacher: {
    id: "dyn",
    name: "DYN",
    lineage: "Vipassana · S.N. Goenka & Pa-Auk traditions",
    parampara: ["Gautama Buddha", "Ledi Sayadaw", "Saya Thetgyi", "Sayagyi U Ba Khin", "S.N. Goenka", "DYN"],
    bio: "Founder. 20+ Vipassana courses, retreats in 15+ countries. Hatha Yoga since 2017, Ashtanga since 2020.",
    avatar: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=466,fit=crop/d95DMJoWQZi9KZO2/dyn-A3QlQeJvnpinw4Vv.jpg"
  },
  paths: [{
    id: "vipassana",
    name: "The Vipassana Path",
    tradition: "Theravāda Buddhism",
    source: "Pali Canon · ~5th c. BCE",
    essence: "See things as they are. Sīla, Samādhi, Pañña.",
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=768,fit=crop/d95DMJoWQZi9KZO2/vipassana-meditation-course-part-1---anapanasati-online-A1aw3ookEphPVrPR.jpg",
    steps: [{
      t: "Anapanasati — the first breath",
      min: 15,
      free: true,
      done: true
    }, {
      t: "Day 1 · Arriving in the body",
      min: 15,
      next: true
    }, {
      t: "Day 2 · The breath at the nostrils",
      min: 15
    }, {
      t: "Day 3 · Equanimity with sensation",
      min: 15
    }, {
      t: "DĪKṢĀ GATE · reflection & seal",
      gate: true
    }, {
      t: "Part 2 · deepening (opens beyond the gate)",
      min: 20
    }]
  }, {
    id: "tantra",
    name: "The Tantra Path",
    tradition: "Kashmir Shaivism",
    source: "Vigyan Bhairav Tantra · ~8th c.",
    essence: "112 doorways of Shiva — breath, sound, presence.",
    image: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=scale-down/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1749811476032-covercopy.jpg",
    steps: [{
      t: "Technique 6 · Breathing in the throat",
      min: 15,
      free: true,
      next: true
    }, {
      t: "Technique 7 · Savoring the taste of existence",
      min: 15
    }, {
      t: "Technique 11 · Passage of breath through the nose",
      min: 15
    }, {
      t: "DĪKṢĀ GATE · reflection & seal",
      gate: true
    }, {
      t: "Parts I–XI · all 112 techniques (43 h 11 min)",
      min: 15
    }]
  }, {
    id: "vedanta",
    name: "The Vedanta Path",
    tradition: "Advaita Vedanta",
    source: "Upaniṣadic non-duality",
    essence: "I am — before every thought. Himalayan silence.",
    image: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1750926107990-covercopy.jpg",
    steps: [{
      t: "I Am · resting as presence",
      min: 23,
      free: true,
      next: true
    }, {
      t: "The witness and the witnessed",
      min: 27
    }, {
      t: "Silence beyond thought",
      min: 30
    }, {
      t: "DĪKṢĀ GATE · reflection & seal",
      gate: true
    }, {
      t: "Merging with cosmic awareness",
      min: 35
    }]
  }, {
    id: "bhakti",
    name: "The Bhakti Path",
    tradition: "Bhakti Yoga",
    source: "The way of devotion",
    essence: "Whispers of God — surrender, prayer, unconditional love.",
    image: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1751001777618-cover_copy_n6ztvgd.jpg",
    steps: [{
      t: "Opening the heart · breath as prayer",
      min: 18,
      free: true,
      next: true
    }, {
      t: "Surrender · letting the Divine hold",
      min: 25
    }, {
      t: "Selfless service of the heart",
      min: 30
    }, {
      t: "DĪKṢĀ GATE · reflection & seal",
      gate: true
    }, {
      t: "All ten whispers (6 h 45 min)",
      min: 40
    }]
  }],
  futurePaths: [{
    name: "The Zen Path",
    tradition: "Chan / Zen Buddhism",
    source: "Zazen · Shikantaza · ~6th c."
  }, {
    name: "The Tibetan Path",
    tradition: "Vajrayāna · Dzogchen",
    source: "Rigpa & Mahāmudrā"
  }, {
    name: "The Yoga Path",
    tradition: "Rāja Yoga",
    source: "Yoga Sūtras of Patañjali · ~2nd c. BCE"
  }, {
    name: "The Sufi Path",
    tradition: "Islamic mysticism",
    source: "Dhikr & Muraqaba"
  }, {
    name: "The Taoist Path",
    tradition: "Taoism",
    source: "Zuowang · Tao Te Ching · ~4th c. BCE"
  }, {
    name: "The Stoic Path",
    tradition: "Greco-Roman philosophy",
    source: "Marcus Aurelius · Epictetus"
  }, {
    name: "The Hesychast Path",
    tradition: "Christian mysticism",
    source: "Prayer of the Heart · Philokalia"
  }, {
    name: "The Kabbalistic Path",
    tradition: "Jewish mysticism",
    source: "Hitbodedut & contemplation"
  }],
  circles: [["Vipassana Circle", "Sīla, sits and honest questions"], ["Tantra Circle", "112 doorways, one at a time"], ["Vedanta Circle", "Self-inquiry beyond thought"], ["Kids & Family Grove", "Mindfulness for little ones"]]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.CircleCard = __ds_scope.CircleCard;

__ds_ns.PathCard = __ds_scope.PathCard;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.TeacherCard = __ds_scope.TeacherCard;

__ds_ns.TierCard = __ds_scope.TierCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Interlude = __ds_scope.Interlude;

__ds_ns.Orb = __ds_scope.Orb;

__ds_ns.SOCIAL_LINKS = __ds_scope.SOCIAL_LINKS;

__ds_ns.SocialLinks = __ds_scope.SocialLinks;

__ds_ns.DanaChips = __ds_scope.DanaChips;

__ds_ns.GiveSlider = __ds_scope.GiveSlider;

__ds_ns.StepRow = __ds_scope.StepRow;

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.TabBar = __ds_scope.TabBar;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.Toast = __ds_scope.Toast;

})();
