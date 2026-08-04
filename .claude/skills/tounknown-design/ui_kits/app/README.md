# UI Kit — the toUnknown app

Pixel-faithful recreation of `tounknown-app.html` (the flagship mobile web app), composed from the design-system components. 430px frame centered on the ambient warm stage. Interactive: tab navigation, path sheet with unlock-by-practice steps, dāna chips, give slider.

- `index.html` — mobile entry (430px frame); loads all screens, owns tab state + sheet state.
- `desktop.html` — desktop web adaptation: sticky top nav (pill links), 1100px content grid, 4-up path/tier grids, two-column sections. Reuses `data.js` + `PathSheet.jsx` with `DesktopScreens.jsx`.
- `data.js` — brand copy, paths, teacher, tiers (lifted verbatim from the source `tu-config`).
- `HomeScreen.jsx` · `PathsScreen.jsx` · `SanghaScreen.jsx` · `DanaScreen.jsx` · `ProfileScreen.jsx` — one per tab.
- `PathSheet.jsx` — the path detail bottom sheet (curriculum steps, paramparā).

Not built (out of scope for the static kit): practice timer countdown, gate reflection flow — represented visually in the sheet only.
