#!/usr/bin/env node
/* Compile the app for production.
 *
 * The app is authored as .jsx compiled in the browser by Babel — lovely to edit,
 * but it makes every visitor download Babel (~900 KB) and run a compiler before
 * anything appears. This produces a dist/ where the JSX is already plain JS and
 * React is the production build.
 *
 *   node build/build.js        → webapp-dist/
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "webapp");
const OUT = path.join(ROOT, "webapp-dist");
const APP = "ui_kits/app";

const REACT_PROD = {
  "react.development.js": "react.production.min.js",
  "react-dom.development.js": "react-dom.production.min.js",
};

function copyDir(from, to, skip = () => false) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, entry.name), d = path.join(to, entry.name);
    if (skip(s)) continue;
    if (entry.isDirectory()) copyDir(s, d, skip);
    else fs.copyFileSync(s, d);
  }
}

// 1. copy everything except the build's own output
fs.rmSync(OUT, { recursive: true, force: true });
copyDir(SRC, OUT, (p) => p.includes("/assets/photos"));   // originals stay out of the deploy

// 2. compile every .jsx in the app folder to .js
const appDir = path.join(OUT, APP);
const jsx = fs.readdirSync(appDir).filter((f) => f.endsWith(".jsx"));
let bytesIn = 0, bytesOut = 0;
for (const f of jsx) {
  const file = path.join(appDir, f);
  const code = fs.readFileSync(file, "utf8");
  bytesIn += code.length;
  const res = babel.transformSync(code, {
    filename: file,
    presets: [[require.resolve("@babel/preset-react"), { runtime: "classic" }]],
    compact: false,
    comments: false,
    sourceMaps: false,
  });
  // Under the in-browser transformer each script got its own scope. As plain scripts they
  // would share the global one, and several files legitimately declare the same names
  // (Button, Chip, StepRow…). Wrap each module to keep the original semantics.
  const wrapped = "(function(){\n" + res.code + "\n})();\n";
  fs.writeFileSync(file.replace(/\.jsx$/, ".js"), wrapped);
  fs.unlinkSync(file);
  bytesOut += wrapped.length;
}

// 3. rewrite index.html: plain scripts, production React, no Babel
const idx = path.join(appDir, "index.html");
let html = fs.readFileSync(idx, "utf8");
html = html.replace(/<script type="text\/babel" src="([^"]+)\.jsx(\?[^"]*)?"><\/script>/g,
  (_, name, q) => `<script src="${name}.js${q || ""}"></script>`);
// the bootstrap block is inline JSX — compile it in place
html = html.replace(/<script type="text\/babel">([\s\S]*?)<\/script>/, (_, body) => {
  const out = babel.transformSync(body, {
    filename: "bootstrap.jsx",
    presets: [[require.resolve("@babel/preset-react"), { runtime: "classic" }]],
    compact: false, comments: false,
  }).code;
  return `<script>\n${out}\n</script>`;
});
// production React, and Babel is no longer needed at all
for (const [dev, prod] of Object.entries(REACT_PROD)) html = html.split(dev).join(prod);
html = html.replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone[^>]*><\/script>\s*/g, "");
// the integrity hashes belong to the dev builds; drop them rather than ship wrong ones
html = html.replace(/ integrity="[^"]*"/g, "");
fs.writeFileSync(idx, html);

// 4. same treatment for the desktop shell if it uses babel
const desk = path.join(appDir, "desktop.html");
if (fs.existsSync(desk)) {
  let d = fs.readFileSync(desk, "utf8");
  d = d.replace(/<script type="text\/babel" src="([^"]+)\.jsx(\?[^"]*)?"><\/script>/g,
    (_, n, q) => `<script src="${n}.js${q || ""}"></script>`);
  fs.writeFileSync(desk, d);
}

// A syntax error must fail the build, not the browser. babel.transformSync already threw
// above if anything was malformed, so reaching here means every module compiled.
const kb = (n) => Math.round(n / 1024) + " KB";
console.log(`compiled ${jsx.length} JSX files: ${kb(bytesIn)} → ${kb(bytesOut)}`);
console.log("Babel removed from the page; React switched to the production build");
console.log("output: webapp-dist/");
