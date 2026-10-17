// Mechanical gate for the Simplified Chinese translation. It catches what a
// reader skims past and what the site owner cannot check by eye: a dropped
// marker, a changed number, Korean or Traditional characters left in, Western
// punctuation inside Chinese, house-style breaks, and the stock phrases that
// make Chinese copy read as machine-written or translated. Judgment calls
// (naturalness, fidelity) belong to the reviewers; see i18n/CRITERIA.zh.md.
//
//   node scripts/i18n/check-zh.js                 # every file in i18n/work/zh/out
//   node scripts/i18n/check-zh.js <file.json> ... # specific work files
//   node scripts/i18n/check-zh.js --memory        # the merged translations.zh.json
//   node scripts/i18n/check-zh.js --memory --all  # ...and require full coverage
//
// Exit 1 on any error. Warnings are advisory and go to reviewers.
//
// Work file format, written by translators:
//   { "segments": [ { "id": "...", "action": "translate" | "keep",
//                     "target": "...", "numbers_ok": "why (optional)" } ] }

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const SEGMENTS = path.join(ROOT, "i18n", "segments.json");
const GLOSSARY = path.join(ROOT, "i18n", "glossary.json");
const GLOSSARY_ZH = path.join(ROOT, "i18n", "glossary.zh.json");
const MEMORY = path.join(ROOT, "i18n", "translations.zh.json");
const OUT_DIR = path.join(ROOT, "i18n", "work", "zh", "out");

const HANGUL = /[가-힣ㄱ-ㅎㅏ-ㅣ]/;
const HAN = "\\u3400-\\u4dbf\\u4e00-\\u9fff";
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august",
  "september", "october", "november", "december"];

const segList = JSON.parse(fs.readFileSync(SEGMENTS, "utf8")).segments;
const segs = new Map(segList.map((s) => [s.id, s]));
const glossary = JSON.parse(fs.readFileSync(GLOSSARY, "utf8"));
const gz = fs.existsSync(GLOSSARY_ZH) ? JSON.parse(fs.readFileSync(GLOSSARY_ZH, "utf8")) : { keep: [], terms: [], banned: [], avoid: [] };

// Names and IDs that stay as written, in any script (Hangul tutor names,
// KakaoTalk IDs, company names with no Chinese form).
const KEEP = [...new Set([...(glossary.keep || []), ...(gz.keep || [])])];
const STRICT = (gz.terms || []).filter((t) => t.strict);

// Frequent Traditional-only characters. A Simplified page should contain none.
const TRADITIONAL = new Set([..."們個這來時會說學國與對發後見長開關門問題體點還進過認種實現經裡電話機場東車號務業書灣區戶歲歷曆聽興應當際隨難護須響頁類顯風飛馬鳥麼黃齊龍讓請謝識讀議變計記許設證試該語誤課調談論諮詢員資費質購貸貿賽趕跡軟較輕輸農連運遠適選遺邊郵醫錄鐘鎮陽隊階險雖雙雜離靈願顧飯館驗黨齡為無並亂價優僅備傳傷億償儲兒內冊寫減劃創動勞勢華單協廠廣慶懷態戰擇據擔擴斷條樂標樣構權歡氣溝準滿漢潛熱營爭獎環產畫監盡碩確禮稱穩窮競筆節範簡紀約紅級統結給絡續總綜網緣練縣績羅職聯聲脫腦舉舊藝術衛補裝製複復規視親覺觀訂訊託訴診詞詳誰貝負財貨責貴賴軍載輔輯辦達違遲遷鄉釋鐵錯鏡間閉閱陣陳陸隱雞靜韻頂項順預領頭顏額養駕驚魚鮮鳳麗麥齒雲匯彙裏著僱"].filter((c) => c !== "著"));

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordRe = (t) => new RegExp(`(?<![A-Za-z])${esc(t)}(?![A-Za-z])`);
const listOf = (re, s) => (s.match(re) || []).sort().join(" ");

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
    MONTHS.forEach((m, i) => {
      t = t.replace(new RegExp(`\\b${m}\\b`, "gi"), ` ${i + 1} `);
      t = t.replace(new RegExp(`\\b${m.slice(0, 3)}\\.?(?=\\s*\\d)`, "gi"), ` ${i + 1} `);
    });
  }
  return (t.match(/\d+(?:\.\d+)?/g) || []).sort().join(" ");
}

// Text with markers, URLs, emails and ${...} removed, for punctuation checks.
const prose = (s) =>
  s.replace(/<\/?t\d+\/?>/g, " ")
    .replace(/https?:\/\/[^\s"<>)）]+/g, " ")
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, " ")
    .replace(/\$\{[^}]*\}/g, " ");

const RE = {
  asciiPunctAfterHan: new RegExp(`[${HAN}][,;:!?]`),
  asciiPunctBeforeHan: new RegExp(`[,;:!?]\\s*[${HAN}]`),
  asciiPeriodAfterHan: new RegExp(`[${HAN}]\\.(?!\\d)`),
  asciiParenWithHan: new RegExp(`\\([^()]*[${HAN}][^()]*\\)`),
  straightQuoteHan: new RegExp(`["'][^"']*[${HAN}]`),
  fullwidthAlnum: /[０-９Ａ-Ｚａ-ｚ]/,
  slashBetweenHan: new RegExp(`[${HAN}]\\s*/\\s*[${HAN}]`),
  asciiEllipsis: /\.\.\.|(?<!…)…(?!…)/,
  spaceInsideHan: new RegExp(`[${HAN}] +[${HAN}]`),
  noSpaceHanLatin: new RegExp(`[${HAN}][A-Za-z]|[A-Za-z][${HAN}]`),
  // A plain number touching Chinese across a space. Codes that end in a
  // digit (F-1 签证, EB-3 职业移民, I-485) are Latin words and keep the space.
  // Numbered headings ("1. 申请背景") are list numbering, not numbers in text.
  spaceHanDigit: new RegExp(`(?<![A-Za-z0-9$.,+-])[0-9][0-9,]*(?:\\.[0-9]+)? +[${HAN}]|[${HAN}] +[0-9][0-9.,]*(?![A-Za-z0-9-])`),
  spaceAroundFullPunct: /\s[，。、；：！？）」』”]|[（「『“]\s/,
};

function check(entry) {
  const errors = [];
  const warnings = [];
  const seg = segs.get(entry.id);
  if (!seg) return { errors: [`unknown id ${entry.id}`], warnings };
  const src = seg.key;
  const tgt = typeof entry.target === "string" ? entry.target : "";
  const isJs = seg.kinds.includes("js");

  if (!tgt.trim()) errors.push("empty target");
  if (entry.action === "keep") {
    if (tgt !== src) errors.push("action keep but target differs from source");
    if (seg.src === "ko") errors.push("action keep on a Korean source");
    return { errors, warnings };
  }

  const ms = markers(src), mt = markers(tgt);
  if (ms.sorted !== mt.sorted) errors.push(`markers differ: source [${ms.sorted}] target [${mt.sorted}]`);
  else if (!mt.nested) errors.push("markers not properly nested");

  const ds = digits(src, seg.src === "en"), dt = digits(tgt, false);
  if (ds !== dt) {
    const msg = `numbers differ: source [${ds}] target [${dt}]`;
    if (entry.numbers_ok) warnings.push(`${msg} (accepted: ${entry.numbers_ok})`);
    else errors.push(msg);
  }

  const urlRe = /https?:\/\/[^\s"<>)）]+|[\w.+-]+@[\w-]+\.[\w.]+/g;
  if (listOf(urlRe, src) !== listOf(urlRe, tgt)) errors.push("urls or emails differ");
  if (listOf(/\$\{[^}]*\}/g, src) !== listOf(/\$\{[^}]*\}/g, tgt)) errors.push("${...} expressions differ");
  if (isJs) {
    const tags = (s) => (s.match(/<[^>]+>/g) || []).join("");
    if (tags(src) !== tags(tgt)) errors.push("js: html tags inside the string changed");
  }

  // Script: no Korean left (except names kept as written), no Traditional.
  let rest = tgt;
  for (const k of KEEP) if (HANGUL.test(k)) rest = rest.split(k).join("");
  if (HANGUL.test(rest)) errors.push("Korean left in the Chinese target");
  const trad = [...new Set([...tgt].filter((c) => TRADITIONAL.has(c)))];
  if (trad.length) errors.push(`Traditional characters: ${trad.join("")}`);

  // House style: no em dash (so no Chinese ——) and no middle dot.
  if (/[—―]/.test(tgt)) errors.push("house style: em dash (—— or —) in target");
  if (/[·・‧•](?!\s)/.test(tgt) && !/[·・‧•]/.test(src)) errors.push("house style: middle dot in target");

  // Punctuation inside Chinese prose.
  // Paired markers vanish and line-break markers become line breaks, so markup
  // never creates or hides a space.
  // A space between two marked elements (<t1>专业</t1> <t2>商科</t2>) separates
  // separate elements on the page, not words in a sentence.
  const p = isJs ? "" : prose(tgt.replace(/<\/t\d+>\s+<t\d+>/g, "\n").replace(/<\/?t\d+>/g, "").replace(/<t\d+\/>/g, "\n"));
  if (p) {
    if (RE.asciiPunctAfterHan.test(p) || RE.asciiPunctBeforeHan.test(p)) errors.push("ASCII , ; : ! ? next to Chinese (use full-width ，；：！？)");
    if (RE.asciiPeriodAfterHan.test(p)) errors.push("ASCII period after Chinese (use 。)");
    if (RE.asciiParenWithHan.test(p)) errors.push("ASCII parentheses around Chinese (use （）)");
    if (RE.straightQuoteHan.test(p)) errors.push("straight quotes around Chinese (use “”)");
    if (RE.fullwidthAlnum.test(p)) errors.push("full-width letters or digits (use half-width)");
    if (RE.asciiEllipsis.test(p)) warnings.push("ellipsis: use …… (two ellipsis characters)");
    if (RE.slashBetweenHan.test(p)) warnings.push("slash between Chinese words (use 、 or 和/或)");
    if (RE.spaceInsideHan.test(p)) warnings.push("space between two Chinese characters");
    if (RE.spaceAroundFullPunct.test(p)) warnings.push("space next to full-width punctuation");
    // Spacing (i18n/CRITERIA.zh.md A5): a space between Chinese and Latin
    // letters or codes, none between Chinese and plain numbers. Paired markers
    // are removed without a gap so <t1>OPT</t1>签证 is still caught.
    const tight = tgt.replace(/<\/?t\d+>/g, "").replace(/<t\d+\/>/g, " ");
    const sp = gz.spacing || {};
    if (sp.latin === "space" && RE.noSpaceHanLatin.test(prose(tight))) warnings.push("no space between Chinese and Latin letters (F-1 签证, OneVision 的)");
    if (sp.digits === "none" && RE.spaceHanDigit.test(prose(tight))) warnings.push("space between Chinese and a number (12个月, 11月30日)");
  }

  // Phrase rules read the visible text: paired markers vanish, a line break
  // marker counts as a break, so markup never makes a sentence look longer.
  const visible = tgt.replace(/<\/?t\d+>/g, "").replace(/<t\d+\/>/g, "\n");
  // Phrases that read as machine-written or as translationese.
  for (const b of gz.banned || []) {
    const re = new RegExp(b.re || esc(b.text));
    if (re.test(visible) && !(b.unlessSource && new RegExp(b.unlessSource).test(src))) errors.push(`banned phrase "${b.text}": ${b.why}`);
  }
  for (const a of gz.avoid || []) {
    const re = new RegExp(a.re || esc(a.text), "g");
    const n = (visible.match(re) || []).length;
    if (n > (a.max || 0)) warnings.push(`avoid "${a.text}" (${n}x): ${a.why}`);
  }

  // Names, IDs and proper nouns that must stay exactly as written.
  for (const k of KEEP) {
    if (wordRe(k).test(src) && !wordRe(k).test(tgt)) errors.push(`keep term changed: "${k}"`);
  }
  // Binding terminology.
  for (const t of STRICT) {
    const hay = (t.ignore_ko || []).reduce((s, x) => s.split(x).join(""), src);
    if (!hay.includes(t.ko)) continue;
    const ok = [t.zh, ...(t.alts || [])].some((w) => tgt.includes(w));
    if (!ok) errors.push(`glossary: "${t.ko}" should be "${t.zh}"`);
  }

  const plain = (s) => s.replace(/<\/?t\d+\/?>/g, "").trim();
  const ratio = plain(tgt).length / Math.max(1, plain(src).length);
  if (seg.src === "ko" && (ratio < 0.35 || ratio > 1.5)) warnings.push(`length ratio ${ratio.toFixed(2)} (zh/ko)`);

  return { errors, warnings };
}

// ---- run
const argv = process.argv.slice(2);
const requireAll = argv.includes("--all");
const useMemory = argv.includes("--memory");
let sets = [];
if (useMemory) {
  const mem = JSON.parse(fs.readFileSync(MEMORY, "utf8")).entries;
  const byKey = new Map(segList.map((s) => [s.key, s.id]));
  const rows = [];
  for (const [k, e] of Object.entries(mem)) {
    const id = byKey.get(k);
    if (!id) continue;
    rows.push({ id, action: e.keep ? "keep" : "translate", target: e.keep ? k : e.zh, numbers_ok: e.numbers_ok });
  }
  sets.push({ name: "translations.zh.json", segments: rows });
} else {
  let files = argv.filter((a) => !a.startsWith("--"));
  if (!files.length && fs.existsSync(OUT_DIR)) files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".json")).map((f) => path.join(OUT_DIR, f));
  for (const f of files) {
    try {
      sets.push({ name: path.basename(f), segments: JSON.parse(fs.readFileSync(f, "utf8")).segments || [] });
    } catch (e) {
      console.log(`ERROR ${path.basename(f)}: not valid JSON (${e.message})`);
      process.exitCode = 1;
    }
  }
}

let nErr = 0, nWarn = 0, nSeg = 0;
const seen = new Set();
for (const set of sets) {
  for (const entry of set.segments) {
    nSeg++;
    if (seen.has(entry.id)) {
      console.log(`ERROR ${set.name} ${entry.id}: duplicate id`);
      nErr++;
    }
    seen.add(entry.id);
    const { errors, warnings } = check(entry);
    for (const e of errors) console.log(`ERROR ${set.name} ${entry.id}: ${e}`);
    for (const w of warnings) console.log(`warn  ${set.name} ${entry.id}: ${w}`);
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
console.log(`\nchecked ${nSeg} segment(s) in ${sets.length} set(s): ${nErr} error(s), ${nWarn} warning(s)`);
process.exit(nErr || process.exitCode ? 1 : 0);
