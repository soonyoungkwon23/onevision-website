// Mechanical gate for translations. Catches what a reader skims past: a dropped
// bold marker, a changed number, a mangled template expression, a glossary term
// used inconsistently, Korean left in the English version.
//
//   node scripts/i18n/check.js                      # every file in i18n/work/out
//   node scripts/i18n/check.js i18n/work/out/b1-p2.json [...]
//   node scripts/i18n/check.js --all                # also require full coverage
//
// Exit 1 on any error. Warnings are advisory and for reviewers.
//
// Output file format, written by translators:
//   { "segments": [ { "id": "...", "action": "translate" | "keep",
//                     "target": "...", "numbers_ok": "why (optional)" } ] }

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const SEGMENTS = path.join(ROOT, "i18n", "segments.json");
const GLOSSARY = path.join(ROOT, "i18n", "glossary.json");
const OUT_DIR = path.join(ROOT, "i18n", "work", "out");

const HANGUL = /[가-힣]/;
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august",
  "september", "october", "november", "december"];

const segs = new Map(JSON.parse(fs.readFileSync(SEGMENTS, "utf8")).segments.map((s) => [s.id, s]));
const glossary = JSON.parse(fs.readFileSync(GLOSSARY, "utf8"));
const strict = glossary.terms.filter((t) => t.strict);
const koNames = glossary.terms.filter((t) => t.strict && /^[가-힣]{2,4}$/.test(t.ko));

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordRe = (t) => new RegExp(`(?<![A-Za-z])${esc(t)}(?![A-Za-z])`);

function markers(s) {
  const toks = s.match(/<\/?t\d+\/?>/g) || [];
  const stack = [];
  let nested = true;
  for (const t of toks) {
    if (/\/>$/.test(t)) continue;
    if (t.startsWith("</")) {
      if (stack.pop() !== t.slice(2, -1)) nested = false;
    } else stack.push(t.slice(1, -1));
  }
  if (stack.length) nested = false;
  return { sorted: [...toks].sort().join(" "), nested };
}

function digits(s, isEnglish) {
  let t = s.replace(/<\/?t\d+\/?>/g, " ").replace(/(\d),(?=\d{3}\b)/g, "$1");
  if (isEnglish) {
    // Full month names always count; three-letter abbreviations only when a
    // number follows ("Jun 5"), so a name like "Itami Jun" is not read as June.
    MONTHS.forEach((m, i) => {
      t = t.replace(new RegExp(`\\b${m}\\b`, "gi"), ` ${i + 1} `);
      t = t.replace(new RegExp(`\\b${m.slice(0, 3)}\\.?(?=\\s*\\d)`, "gi"), ` ${i + 1} `);
    });
  }
  return (t.match(/\d+(?:\.\d+)?/g) || []).sort().join(" ");
}

const listOf = (re, s) => (s.match(re) || []).sort().join(" ");

function check(entry) {
  const errors = [];
  const warnings = [];
  const seg = segs.get(entry.id);
  if (!seg) return { errors: [`unknown id ${entry.id}`], warnings };
  const src = seg.key;
  const tgt = typeof entry.target === "string" ? entry.target : "";
  const toEnglish = seg.src === "ko";
  const isJs = seg.kinds.includes("js");

  if (!tgt.trim()) errors.push("empty target");
  if (entry.action === "keep") {
    if (tgt !== src) errors.push("action keep but target differs from source");
    return { errors, warnings };
  }

  const ms = markers(src), mt = markers(tgt);
  if (ms.sorted !== mt.sorted) errors.push(`markers differ: source [${ms.sorted}] target [${mt.sorted}]`);
  else if (!mt.nested) errors.push("markers not properly nested");

  const ds = digits(src, !toEnglish), dt = digits(tgt, toEnglish);
  if (ds !== dt) {
    const msg = `numbers differ: source [${ds}] target [${dt}]`;
    if (entry.numbers_ok) warnings.push(`${msg} (accepted: ${entry.numbers_ok})`);
    else errors.push(msg);
  }

  const urlRe = /https?:\/\/[^\s"<>)]+|[\w.+-]+@[\w-]+\.[\w.]+/g;
  if (listOf(urlRe, src) !== listOf(urlRe, tgt)) errors.push("urls or emails differ");
  if (listOf(/\$\{[^}]*\}/g, src) !== listOf(/\$\{[^}]*\}/g, tgt)) errors.push("${...} expressions differ");
  if (isJs) {
    const tags = (s) => (s.match(/<[^>]+>/g) || []).join("");
    if (tags(src) !== tags(tgt)) errors.push("js: html tags inside the string changed");
  }

  if (/[—·]/.test(tgt)) errors.push("house style: em dash or middle dot in target");

  if (toEnglish) {
    let rest = tgt;
    for (const n of koNames) if (tgt.includes(n.en)) rest = rest.split(n.ko).join("");
    if (HANGUL.test(rest)) errors.push("Korean left in the English target");
  } else if (!HANGUL.test(tgt)) {
    errors.push("English source not translated into Korean (use action keep if it is proper nouns only)");
  }

  for (const k of glossary.keep) {
    const re = wordRe(k);
    if (re.test(src) && !re.test(tgt)) errors.push(`keep term changed: "${k}"`);
  }
  for (const t of strict) {
    const from = toEnglish ? t.ko : t.en;
    const to = toEnglish ? [t.en, ...(t.alts_en || [])] : [t.ko, ...(t.alts_ko || [])];
    // ignore_ko: Korean strings that contain the term but are not it (e.g. 편입니다 = "tends to be")
    const hay = toEnglish ? (t.ignore_ko || []).reduce((s, x) => s.split(x).join(""), src) : src;
    if (!hay.includes(from)) continue;
    const ok = to.some((w) => (toEnglish ? tgt.toLowerCase().includes(w.toLowerCase()) : tgt.includes(w)));
    if (!ok) errors.push(`glossary: "${from}" should be "${to[0]}"`);
  }

  const plain = (s) => s.replace(/<\/?t\d+\/?>/g, "").trim();
  const ratio = plain(tgt).length / Math.max(1, plain(src).length);
  if (toEnglish && (ratio < 0.9 || ratio > 5)) warnings.push(`length ratio ${ratio.toFixed(2)} (en/ko)`);
  if (!toEnglish && (ratio < 0.15 || ratio > 1.2)) warnings.push(`length ratio ${ratio.toFixed(2)} (ko/en)`);
  if (/ {2,}/.test(tgt)) warnings.push("double space");

  return { errors, warnings };
}

// ---- run
const argv = process.argv.slice(2);
const requireAll = argv.includes("--all");
let files = argv.filter((a) => !a.startsWith("--"));
if (!files.length && fs.existsSync(OUT_DIR)) {
  files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".json")).map((f) => path.join(OUT_DIR, f));
}

let nErr = 0, nWarn = 0, nSeg = 0;
const seen = new Set();
for (const f of files) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(f, "utf8"));
  } catch (e) {
    console.log(`ERROR ${path.basename(f)}: not valid JSON (${e.message})`);
    nErr++;
    continue;
  }
  for (const entry of data.segments || []) {
    nSeg++;
    if (seen.has(entry.id)) {
      console.log(`ERROR ${path.basename(f)} ${entry.id}: duplicate id`);
      nErr++;
    }
    seen.add(entry.id);
    const { errors, warnings } = check(entry);
    for (const e of errors) console.log(`ERROR ${path.basename(f)} ${entry.id}: ${e}`);
    for (const w of warnings) console.log(`warn  ${path.basename(f)} ${entry.id}: ${w}`);
    nErr += errors.length;
    nWarn += warnings.length;
  }
}
if (requireAll) {
  for (const id of segs.keys()) {
    if (!seen.has(id)) {
      console.log(`ERROR missing translation for ${id}: ${segs.get(id).key.slice(0, 60)}`);
      nErr++;
    }
  }
}
console.log(`\nchecked ${nSeg} segment(s) in ${files.length} file(s): ${nErr} error(s), ${nWarn} warning(s)`);
process.exit(nErr ? 1 : 0);
