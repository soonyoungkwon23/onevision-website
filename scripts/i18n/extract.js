// Collects every translatable segment on the static pages into one deduplicated
// list, i18n/segments.json. The same sentence on five pages is one entry, so it
// is translated once and reads identically everywhere.
//
//   node scripts/i18n/extract.js
//
// Each entry keeps where it appears and the surrounding context (tag, class,
// nearest heading) so a translator can tell a button label from a heading.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { segmentHtml, HANGUL } = require("../lib/i18n-segment");

const ROOT = path.resolve(__dirname, "..", "..");
const PUBLIC = path.join(ROOT, "public_html");
const OUT = path.join(ROOT, "i18n", "segments.json");

// Shared chrome first so navigation terms are fixed before page copy uses them.
const FIRST = ["header.html", "footer.html", "index.html", "about.html"];
const pages = fs
  .readdirSync(PUBLIC)
  .filter((f) => f.endsWith(".html"))
  .sort((a, b) => {
    const ia = FIRST.indexOf(a), ib = FIRST.indexOf(b);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    return a.localeCompare(b);
  });

const byKey = new Map();
let occurrences = 0;

for (const page of pages) {
  const html = fs.readFileSync(path.join(PUBLIC, page), "utf8");
  for (const o of segmentHtml(html)) {
    occurrences++;
    let s = byKey.get(o.key);
    if (!s) {
      s = {
        id: crypto.createHash("sha1").update(o.key).digest("hex").slice(0, 10),
        key: o.key,
        src: HANGUL.test(o.key) ? "ko" : "en",
        kinds: [],
        markers: o.markers || 0,
        pages: [],
        contexts: [],
      };
      byKey.set(o.key, s);
    }
    if (!s.kinds.includes(o.kind)) s.kinds.push(o.kind);
    if (!s.pages.includes(page)) s.pages.push(page);
    if (s.contexts.length < 3) {
      s.contexts.push({ page, kind: o.kind, tag: o.tag, attr: o.attr, cls: o.cls, section: o.section });
    }
  }
}

const segments = [...byKey.values()];
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), pages, segments }, null, 2) + "\n");

const count = (f) => segments.filter(f).length;
const chars = (f) => segments.filter(f).reduce((n, s) => n + s.key.length, 0);
console.log(`pages: ${pages.length}`);
console.log(`occurrences: ${occurrences}, unique segments: ${segments.length}`);
console.log(`  ko source: ${count((s) => s.src === "ko")} (${chars((s) => s.src === "ko")} chars)`);
console.log(`  en source: ${count((s) => s.src === "en")} (${chars((s) => s.src === "en")} chars)`);
for (const k of ["title", "meta", "block", "textrun", "attr", "js"]) {
  console.log(`  kind ${k.padEnd(8)} ${count((s) => s.kinds.includes(k))}`);
}
console.log(`  with inline markers: ${count((s) => s.markers > 0)}`);
console.log(`wrote ${path.relative(ROOT, OUT)}`);
