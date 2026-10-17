// Splits segments that still need a Chinese translation into work files.
//
//   node scripts/i18n/prepare-zh.js [batches=8] [maxCharsPerPart=5000]
//
// Same idea as prepare.js, for Simplified Chinese: anything already in
// i18n/translations.zh.json is skipped, so after a site edit only new or
// changed sentences go out. The Korean source is what gets translated; each
// segment also carries the reviewed English translation as a reference for
// meaning, never as the source.
//
// Output: i18n/work/zh/in/b<batch>-p<part>.json. Translators write the same
// file name to i18n/work/zh/out/ (format in i18n/CRITERIA.zh.md).

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const SEGMENTS = path.join(ROOT, "i18n", "segments.json");
const EN_MEMORY = path.join(ROOT, "i18n", "translations.json");
const ZH_MEMORY = path.join(ROOT, "i18n", "translations.zh.json");
const WORK = path.join(ROOT, "i18n", "work", "zh");

const nBatches = parseInt(process.argv[2] || "8", 10);
const maxChars = parseInt(process.argv[3] || "5000", 10);

const read = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);
const { pages, segments } = read(SEGMENTS);
const en = (read(EN_MEMORY) || { entries: {} }).entries;
const done = (read(ZH_MEMORY) || { entries: {} }).entries;

// Related pages travel together so one translator keeps terms consistent:
// shared chrome and core service pages, then immigration/housing/staff, then
// the acceptance stories, which share one structure.
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
  if (acc >= target * batches.length && batches.length < nBatches) batches.push([]);
  batches[batches.length - 1].push(...list);
  acc += list.reduce((n, s) => n + s.key.length, 0);
}

for (const d of ["in", "out", "review"]) fs.mkdirSync(path.join(WORK, d), { recursive: true });
for (const f of fs.readdirSync(path.join(WORK, "in"))) fs.unlinkSync(path.join(WORK, "in", f));

const summary = [];
batches.forEach((list, bi) => {
  if (!list.length) return;
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
    const body = {
      batch: bi + 1,
      part: pi + 1,
      pages: [...new Set(segs.map(firstPage))],
      segments: segs.map((s) => ({
        id: s.id,
        src: s.src,
        key: s.key,
        en: en[s.key] && !en[s.key].keep ? en[s.key].en : undefined,
        kinds: s.kinds,
        markers: s.markers,
        appears_on: s.pages.slice(0, 5),
        context: s.contexts.map((c) => [c.page, c.kind, c.tag, c.attr, c.cls, c.section && `under "${c.section}"`]
          .filter(Boolean).join(" | ")),
      })),
    };
    fs.writeFileSync(path.join(WORK, "in", `b${bi + 1}-p${pi + 1}.json`), JSON.stringify(body, null, 2) + "\n");
  });
  summary.push({ batch: bi + 1, parts: parts.length, segments: list.length,
    chars: list.reduce((n, s) => n + s.key.length, 0), pages: [...new Set(list.map(firstPage))] });
});

console.log(`to translate: ${todo.length} segments, ${total} chars (already done: ${segments.length - todo.length})`);
for (const b of summary) {
  console.log(`batch ${b.batch}: ${b.segments} segments, ${b.chars} chars, ${b.parts} parts`);
  console.log(`  pages: ${b.pages.join(", ")}`);
}
