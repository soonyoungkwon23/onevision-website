// Measures how well the translation held up under review, from the reviewers'
// change logs rather than their own summaries.
//
//   node scripts/i18n/report.js
//
// First-pass accuracy is the share of segments that neither reviewer had to
// touch. Each change is attributed to the rubric criterion the reviewer cited.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const WORK = path.join(ROOT, "i18n", "work");
const read = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);

const total = new Map();
for (const f of fs.readdirSync(path.join(WORK, "in")).filter((f) => f.endsWith(".json"))) {
  const b = f.match(/^b(\d+)/)[1];
  total.set(b, (total.get(b) || 0) + read(path.join(WORK, "in", f)).segments.length);
}

const touched = { fidelity: new Set(), language: new Set(), consistency: new Set() };
const byCrit = {};
const bySev = {};
const perBatch = [];
for (const [b, n] of [...total.entries()].sort()) {
  const row = { batch: b, segments: n };
  for (const lens of ["fidelity", "language"]) {
    const log = read(path.join(WORK, "review", `b${b}-${lens}.json`));
    const changes = (log && log.changes) || [];
    const ids = new Set(changes.map((c) => c.id));
    ids.forEach((id) => touched[lens].add(id));
    row[lens] = ids.size;
    for (const c of changes) {
      const k = `${lens} ${c.criterion || "?"}`;
      byCrit[k] = (byCrit[k] || 0) + 1;
      if (c.severity) bySev[c.severity] = (bySev[c.severity] || 0) + 1;
    }
  }
  perBatch.push(row);
}
const cons = read(path.join(WORK, "review", "consistency.json"));
((cons && cons.changes) || []).forEach((c) => touched.consistency.add(c.id));

const all = [...total.values()].reduce((a, b) => a + b, 0);
const anyReview = new Set([...touched.fidelity, ...touched.language]);
const pct = (x) => `${((100 * x) / all).toFixed(1)}%`;

console.log("batch  segments  fidelity-fixed  language-fixed");
for (const r of perBatch) {
  console.log(`  ${r.batch}      ${String(r.segments).padStart(4)}       ${String(r.fidelity).padStart(4)}           ${String(r.language).padStart(4)}`);
}
console.log("");
console.log(`segments:                         ${all}`);
console.log(`fixed by fidelity review:         ${touched.fidelity.size} (${pct(touched.fidelity.size)})`);
console.log(`fixed by language review:         ${touched.language.size} (${pct(touched.language.size)})`);
console.log(`fixed by either reviewer:         ${anyReview.size} (${pct(anyReview.size)})`);
console.log(`first-pass accuracy:              ${pct(all - anyReview.size)} passed both reviews untouched`);
console.log(`changed in consistency pass:      ${touched.consistency.size}`);
console.log("");
console.log("changes by criterion:");
for (const [k, v] of Object.entries(byCrit).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(22)} ${v}`);
if (Object.keys(bySev).length) {
  console.log("changes by severity:");
  for (const [k, v] of Object.entries(bySev)) console.log(`  ${k.padEnd(22)} ${v}`);
}
