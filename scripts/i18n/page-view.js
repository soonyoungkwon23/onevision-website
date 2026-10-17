// Prints one page's text in on-page order with its translation beside it, so a
// page can be read top to bottom in the other language before anything is built.
//
//   node scripts/i18n/page-view.js index.html                 # Korean and English
//   node scripts/i18n/page-view.js index.html --target        # English only
//   node scripts/i18n/page-view.js index.html --lang zh       # Korean and Chinese
//   node scripts/i18n/page-view.js index.html --lang zh --target
//
// Reads translations from the work folder (i18n/work/out for English,
// i18n/work/zh/out for Chinese), falling back to the merged memory.

const fs = require("fs");
const path = require("path");
const { segmentHtml } = require("../lib/i18n-segment");

const ROOT = path.resolve(__dirname, "..", "..");
const args = process.argv.slice(2);
const page = args.find((a) => a.endsWith(".html"));
const targetOnly = args.includes("--target");
const lang = args.includes("--lang") ? args[args.indexOf("--lang") + 1] : "en";
if (!page || !["en", "zh"].includes(lang)) {
  console.error("usage: node scripts/i18n/page-view.js <page.html> [--lang en|zh] [--target]");
  process.exit(2);
}

const segs = JSON.parse(fs.readFileSync(path.join(ROOT, "i18n", "segments.json"), "utf8")).segments;
const idByKey = new Map(segs.map((s) => [s.key, s.id]));
const target = new Map();

const merged = path.join(ROOT, "i18n", lang === "zh" ? "translations.zh.json" : "translations.json");
if (fs.existsSync(merged)) {
  const { entries } = JSON.parse(fs.readFileSync(merged, "utf8"));
  for (const [key, e] of Object.entries(entries)) {
    const t = lang === "zh" ? (e.keep ? key : e.zh) : e.src === "ko" ? e.en : e.ko;
    target.set(idByKey.get(key), t);
  }
}
const outDir = path.join(ROOT, "i18n", "work", ...(lang === "zh" ? ["zh", "out"] : ["out"]));
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
