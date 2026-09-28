// Splits segments that still need translating into work files for translators.
//
//   node scripts/i18n/prepare.js [batches=3] [maxCharsPerPart=5000]
//
// Anything already in i18n/translations.json is skipped, so after a site edit
// only new or changed sentences go out for translation.
//
// Pages are grouped so one translator sees related pages together: the core
// service pages, then immigration, housing and staff, then the acceptance
// stories, which share one structure and should read consistently.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const SEGMENTS = path.join(ROOT, "i18n", "segments.json");
const DONE = path.join(ROOT, "i18n", "translations.json");
const WORK = path.join(ROOT, "i18n", "work");

const nBatches = parseInt(process.argv[2] || "3", 10);
const maxChars = parseInt(process.argv[3] || "5000", 10);

const { pages, segments } = JSON.parse(fs.readFileSync(SEGMENTS, "utf8"));
const done = fs.existsSync(DONE) ? JSON.parse(fs.readFileSync(DONE, "utf8")).entries || {} : {};

const group = (p) => (/^admit-/.test(p) ? 2 : /^(immigration|housing|staff-)/.test(p) ? 1 : 0);
const pageOrder = [...pages].sort((a, b) => group(a) - group(b) || pages.indexOf(a) - pages.indexOf(b));

const todo = segments.filter((s) => !done[s.key]);
const firstPage = (s) => s.pages[0];
const byPage = new Map(pageOrder.map((p) => [p, []]));
for (const s of todo) byPage.get(firstPage(s)).push(s);

const total = todo.reduce((n, s) => n + s.key.length, 0);
const target = total / nBatches;
const batches = [[]];
let acc = 0;
for (const p of pageOrder) {
  const list = byPage.get(p);
  if (!list.length) continue;
  const size = list.reduce((n, s) => n + s.key.length, 0);
  if (acc >= target * batches.length && batches.length < nBatches) batches.push([]);
  batches[batches.length - 1].push(...list);
  acc += size;
}

for (const d of ["in", "out", "review"]) {
  const dir = path.join(WORK, d);
  fs.mkdirSync(dir, { recursive: true });
  if (d === "in") for (const f of fs.readdirSync(dir)) fs.unlinkSync(path.join(dir, f));
}

const summary = [];
batches.forEach((list, bi) => {
  const parts = [[]];
  let c = 0;
  for (const s of list) {
    if (c + s.key.length > maxChars && parts[parts.length - 1].length) {
      parts.push([]);
      c = 0;
    }
    parts[parts.length - 1].push(s);
    c += s.key.length;
  }
  parts.forEach((segs, pi) => {
    const name = `b${bi + 1}-p${pi + 1}`;
    const body = {
      batch: bi + 1,
      part: pi + 1,
      pages: [...new Set(segs.map(firstPage))],
      segments: segs.map((s) => ({
        id: s.id,
        src: s.src,
        key: s.key,
        kinds: s.kinds,
        markers: s.markers,
        appears_on: s.pages.slice(0, 5),
        context: s.contexts.map((c) => [c.page, c.kind, c.tag, c.attr, c.cls, c.section && `under "${c.section}"`]
          .filter(Boolean).join(" | ")),
      })),
    };
    fs.writeFileSync(path.join(WORK, "in", `${name}.json`), JSON.stringify(body, null, 2) + "\n");
  });
  const chars = list.reduce((n, s) => n + s.key.length, 0);
  summary.push({ batch: bi + 1, parts: parts.length, segments: list.length, chars,
    pages: [...new Set(list.map(firstPage))] });
});

console.log(`to translate: ${todo.length} segments, ${total} chars (already done: ${segments.length - todo.length})`);
for (const b of summary) {
  console.log(`batch ${b.batch}: ${b.segments} segments, ${b.chars} chars, ${b.parts} parts`);
  console.log(`  pages: ${b.pages.join(", ")}`);
}
