// Prints one page's text in on-page order with its translation beside it, so a
// page can be read top to bottom in the other language before anything is built.
//
//   node scripts/i18n/page-view.js index.html            # source and target
//   node scripts/i18n/page-view.js index.html --target   # target language only
//
// Reads translations from i18n/work/out/*.json, falling back to
// i18n/translations.json once the work has been merged.

const fs = require("fs");
const path = require("path");
const { segmentHtml } = require("../lib/i18n-segment");

const ROOT = path.resolve(__dirname, "..", "..");
const page = process.argv[2];
const targetOnly = process.argv.includes("--target");
if (!page) {
  console.error("usage: node scripts/i18n/page-view.js <page.html> [--target]");
  process.exit(2);
}

const segs = JSON.parse(fs.readFileSync(path.join(ROOT, "i18n", "segments.json"), "utf8")).segments;
const idByKey = new Map(segs.map((s) => [s.key, s.id]));
const target = new Map();

const merged = path.join(ROOT, "i18n", "translations.json");
if (fs.existsSync(merged)) {
  const { entries } = JSON.parse(fs.readFileSync(merged, "utf8"));
  for (const [key, e] of Object.entries(entries)) target.set(idByKey.get(key), e.src === "ko" ? e.en : e.ko);
}
const outDir = path.join(ROOT, "i18n", "work", "out");
if (fs.existsSync(outDir)) {
  for (const f of fs.readdirSync(outDir).filter((f) => f.endsWith(".json"))) {
    for (const e of JSON.parse(fs.readFileSync(path.join(outDir, f), "utf8")).segments || []) {
      target.set(e.id, e.target);
    }
  }
}

const html = fs.readFileSync(path.join(ROOT, "public_html", page), "utf8");
let missing = 0;
for (const o of segmentHtml(html)) {
  const t = target.get(idByKey.get(o.key));
  if (t == null) missing++;
  const label = [o.kind, o.tag, o.attr].filter(Boolean).join(" ");
  if (targetOnly) console.log(t == null ? `[${label}] (untranslated) ${o.key}` : t);
  else console.log(`[${label}] ${o.key}\n    -> ${t == null ? "(untranslated)" : t}`);
}
if (missing) console.log(`\n${missing} segment(s) on this page have no translation yet`);
