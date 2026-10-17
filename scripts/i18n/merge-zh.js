// Folds reviewed Chinese work files into i18n/translations.zh.json.
//
//   node scripts/i18n/merge-zh.js            # add and update entries
//   node scripts/i18n/merge-zh.js --prune    # also drop entries no page uses
//
// Entries are keyed by the source text (Korean, or English for the few
// English-only strings on the Korean pages), exactly like the English memory,
// so a sentence keeps its translation through edits elsewhere on the page and
// an edited sentence shows up as new work the next time prepare-zh.js runs.
// Run `node scripts/i18n/check-zh.js` on the work files first.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const MEMORY = path.join(ROOT, "i18n", "translations.zh.json");
const OUT_DIR = path.join(ROOT, "i18n", "work", "zh", "out");
const prune = process.argv.includes("--prune");

const segList = JSON.parse(fs.readFileSync(path.join(ROOT, "i18n", "segments.json"), "utf8")).segments;
const segs = new Map(segList.map((s) => [s.id, s]));
const memory = fs.existsSync(MEMORY) ? JSON.parse(fs.readFileSync(MEMORY, "utf8")) : { entries: {} };

let added = 0, updated = 0, dropped = 0;
const files = fs.existsSync(OUT_DIR) ? fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".json")).sort() : [];
for (const f of files) {
  for (const e of JSON.parse(fs.readFileSync(path.join(OUT_DIR, f), "utf8")).segments || []) {
    const s = segs.get(e.id);
    if (!s || typeof e.target !== "string") continue;
    const entry = {
      src: s.src,
      zh: e.action === "keep" ? s.key : e.target,
      keep: e.action === "keep" || undefined,
      numbers_ok: e.numbers_ok || undefined,
      kinds: s.kinds,
      pages: s.pages,
    };
    if (!memory.entries[s.key]) added++;
    else if (JSON.stringify(memory.entries[s.key]) !== JSON.stringify(entry)) updated++;
    memory.entries[s.key] = entry;
  }
}

if (prune) {
  const keys = new Set(segList.map((s) => s.key));
  for (const k of Object.keys(memory.entries)) if (!keys.has(k)) { delete memory.entries[k]; dropped++; }
}

const sorted = {};
for (const k of Object.keys(memory.entries).sort()) sorted[k] = memory.entries[k];
fs.writeFileSync(
  MEMORY,
  JSON.stringify({
    about: "Korean/Simplified Chinese translation memory for the static site, keyed by source text. Standard: i18n/CRITERIA.zh.md.",
    count: Object.keys(sorted).length,
    entries: sorted,
  }, null, 2) + "\n"
);
console.log(`Chinese translation memory: ${Object.keys(sorted).length} entries (${added} added, ${updated} updated, ${dropped} dropped)`);
