// Folds reviewed work files into the translation memory, i18n/translations.json.
//
//   node scripts/i18n/merge.js
//
// Entries are keyed by the source text, so a sentence keeps its translation
// through later edits elsewhere on the page, and an edited sentence shows up as
// new work the next time prepare.js runs. Existing entries are never dropped.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const MEMORY = path.join(ROOT, "i18n", "translations.json");
const OUT_DIR = path.join(ROOT, "i18n", "work", "out");

const segs = new Map(
  JSON.parse(fs.readFileSync(path.join(ROOT, "i18n", "segments.json"), "utf8")).segments.map((s) => [s.id, s])
);
const memory = fs.existsSync(MEMORY) ? JSON.parse(fs.readFileSync(MEMORY, "utf8")) : { entries: {} };

let added = 0, updated = 0;
for (const f of fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".json")).sort()) {
  for (const e of JSON.parse(fs.readFileSync(path.join(OUT_DIR, f), "utf8")).segments || []) {
    const s = segs.get(e.id);
    if (!s) continue;
    const entry = {
      src: s.src,
      ko: s.src === "ko" ? s.key : e.target,
      en: s.src === "en" ? s.key : e.target,
      keep: e.action === "keep" || undefined,
      kinds: s.kinds,
      pages: s.pages,
    };
    if (!memory.entries[s.key]) added++;
    else if (JSON.stringify(memory.entries[s.key]) !== JSON.stringify(entry)) updated++;
    memory.entries[s.key] = entry;
  }
}

const sorted = {};
for (const k of Object.keys(memory.entries).sort()) sorted[k] = memory.entries[k];
fs.writeFileSync(
  MEMORY,
  JSON.stringify({ about: "Korean/English translation memory for the static site, keyed by source text.", count: Object.keys(sorted).length, entries: sorted }, null, 2) + "\n"
);
console.log(`translation memory: ${Object.keys(sorted).length} entries (${added} added, ${updated} updated)`);
