// DOCX guide → Markdown post converter. Runs LOCALLY only (never in CI).
//
// Usage:
//   node scripts/convert-docx.js                        # converts content/inbox/**/*.docx
//   node scripts/convert-docx.js --source <dir> [...]   # converts DOCX from other folder(s)
//   node scripts/convert-docx.js --dry-run              # parse + QC report, write nothing
//
// Each DOCX becomes content/guides/{bsn|mba}/{slug}.md with front-matter and
// status: draft. Processed inbox files move to content/docx-archive/.
// A QC report (content/convert-report.json) flags any off-pattern file.

const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");
const TurndownService = require("turndown");
const matter = require("gray-matter");
const { ROOT, slugify } = require("./lib/template");

const OUT_DIR = path.join(ROOT, "content", "guides");
const INBOX = path.join(ROOT, "content", "inbox");
const ARCHIVE = path.join(ROOT, "content", "docx-archive");
const NAMES_PATH = path.join(__dirname, "lib", "university-names.json");

const AD_MARKER = "전략이 결과를 바꾼다"; // consulting-ad heading, present in every guide
const TOC_MARKER = /^목차\s*:?\s*$/;
const DOC_SUFFIX = /_?입학_전략_가이드\.docx$/i;

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-" });

function parseArgs(argv) {
  const args = { sources: [], dryRun: false };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--source") args.sources.push(argv[++i]);
    else if (argv[i] === "--dry-run") args.dryRun = true;
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  return args;
}

function listDocx(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".docx") && !f.startsWith("~$"))
    .map((f) => path.join(dir, f));
}

// Split mammoth's flat HTML output into top-level elements.
function splitTopLevel(html) {
  const out = [];
  const re = /<(h1|h2|h3|p|ul|ol|table)(?:\s[^>]*)?>[\s\S]*?<\/\1>/g;
  let m;
  while ((m = re.exec(html)) !== null) out.push({ tag: m[1], html: m[0] });
  return out;
}

function textOf(elHtml) {
  return elHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function isBoldPara(el) {
  return el.tag === "p" && /^<p(?:\s[^>]*)?>\s*<strong>/.test(el.html);
}

// Filename → { slugBase, category } e.g. Alabama_Capstone_BSN_입학_전략_가이드.docx
function parseFilename(file) {
  const base = path.basename(file);
  const stem = base.replace(DOC_SUFFIX, "");
  const tokens = stem.split("_").filter(Boolean);
  const progIdx = tokens.findIndex((t) => /^(bsn|mba)$/i.test(t));
  if (progIdx === -1) return null;
  const category = tokens[progIdx].toLowerCase();
  const nameTokens = tokens.slice(0, progIdx).concat(tokens.slice(progIdx + 1));
  if (nameTokens.length === 0) return null;
  return { category, slugBase: slugify(nameTokens.join("-")) };
}

// First sentence(s) of the intro, cut to <=160 chars for the meta description.
function makeDescription(introText) {
  const clean = introText.replace(/\s+/g, " ").trim();
  const sentences = clean.split(/(?<=다\.|요\.|[.!?])\s+/);
  let desc = "";
  for (const s of sentences) {
    if (!desc) desc = s;
    else if ((desc + " " + s).length <= 160) desc += " " + s;
    else break;
  }
  if (desc.length > 160) desc = desc.slice(0, 157).trimEnd() + "…";
  return desc;
}

async function convertOne(file, names) {
  const parsed = parseFilename(file);
  if (!parsed) return { file, ok: false, error: "unparseable filename (no BSN/MBA token)" };
  const { category, slugBase } = parsed;

  const { value: html, messages } = await mammoth.convertToHtml({ path: file });
  const els = splitTopLevel(html);
  if (els.length < 10) return { file, ok: false, error: `only ${els.length} elements parsed` };

  // 1. Title block: leading bold paragraphs (2-3 lines).
  let i = 0;
  const titleLines = [];
  while (i < els.length && isBoldPara(els[i]) && titleLines.length < 4) {
    const t = textOf(els[i].html);
    if (TOC_MARKER.test(t)) break;
    titleLines.push(t);
    i++;
  }
  if (titleLines.length < 1) return { file, ok: false, error: "title block not found" };

  const program = category.toUpperCase();
  const docTitleIdx = titleLines.findIndex((t) => t.includes("입학 전략 가이드"));
  const nameLines = titleLines.filter((_, idx) => idx !== docTitleIdx);
  let universityEn = nameLines[0] || "";
  let schoolEn = nameLines[1] || "";
  let displayName;
  if (nameLines.length === 0 && docTitleIdx !== -1) {
    // Single-line title variant: "TCU Neeley School of Business MBA 입학 전략 가이드"
    displayName = titleLines[docTitleIdx].replace(/\s*(BSN|MBA)?\s*입학\s*전략\s*가이드\s*$/i, "").trim();
    universityEn = displayName;
  } else {
    // Avoid "Duke University Duke University School of Nursing …" repetition.
    displayName =
      schoolEn && schoolEn.includes(universityEn) ? schoolEn : [universityEn, schoolEn].filter(Boolean).join(" ");
  }
  const title = `${displayName} ${program} 입학 전략 가이드`;

  // 2. Intro: elements until the 목차 marker.
  const introEls = [];
  while (i < els.length && !(isBoldPara(els[i]) && TOC_MARKER.test(textOf(els[i].html)))) {
    if (els[i].tag === "h1") break; // no TOC marker found — stop at first section
    introEls.push(els[i]);
    i++;
  }

  // 3. Skip the plain-text TOC (everything until the first h1).
  while (i < els.length && els[i].tag !== "h1") i++;

  // 4. Body: from first h1 up to the consulting-ad marker.
  const bodyEls = [];
  let adEls = [];
  for (; i < els.length; i++) {
    const el = els[i];
    if (el.tag === "p" && isBoldPara(el) && textOf(el.html).includes(AD_MARKER)) {
      adEls = els.slice(i);
      break;
    }
    bodyEls.push(el);
  }

  const h1Count = bodyEls.filter((e) => e.tag === "h1").length;
  const h2Count = bodyEls.filter((e) => e.tag === "h2").length;

  // Demote headings: docx h1 → md ##, docx h2 → md ### (page <h1> is the post title).
  const demote = (elHtml) =>
    elHtml
      .replace(/<(\/?)h2((?:\s[^>]*)?)>/g, "<$1h3$2>")
      .replace(/<(\/?)h1((?:\s[^>]*)?)>/g, "<$1h2$2>");

  const introMd = td.turndown(introEls.map((e) => e.html).join("\n"));
  const bodyMd = td.turndown(bodyEls.map((e) => demote(e.html)).join("\n"));
  const adMd = adEls.length ? td.turndown(adEls.map((e) => demote(e.html)).join("\n")) : "";

  const introText = textOf(introEls.map((e) => e.html).join(" "));
  const description = makeDescription(introText);

  const known = names[slugBase] || {};
  const front = {
    title,
    slug: slugBase,
    category,
    source: "docx",
    universityEn,
    universityKo: known.universityKo || "",
    schoolEn,
    description,
    status: "draft",
    order: 0, // assigned after all files are converted
    publishDate: null,
    updatedDate: null,
    enhancedDate: null,
  };

  const content = [introMd, bodyMd, adMd ? "<!--cta-->\n\n" + adMd : ""].filter(Boolean).join("\n\n");
  const wordCount = content.replace(/\s+/g, " ").length;

  return {
    file,
    ok: true,
    category,
    slug: slugBase,
    front,
    content,
    qc: {
      h1: h1Count,
      h2: h2Count,
      titleLines: titleLines.length,
      hasAd: adEls.length > 0,
      descriptionLen: description.length,
      chars: wordCount,
      mammothWarnings: messages.filter((m) => m.type === "warning").length,
      flags: [
        h1Count < 4 || h1Count > 7 ? `unusual h1 count: ${h1Count}` : null,
        h2Count < 8 ? `low h2 count: ${h2Count}` : null,
        adEls.length === 0 ? "consulting-ad block not found" : null,
        !description ? "empty description" : null,
        wordCount < 3000 ? `short content: ${wordCount} chars` : null,
      ].filter(Boolean),
    },
  };
}

// Interleave categories when assigning queue order so BSN and MBA both flow weekly.
function assignOrder(results, existingMax) {
  const byCat = {};
  for (const r of results) (byCat[r.category] = byCat[r.category] || []).push(r);
  for (const list of Object.values(byCat)) list.sort((a, b) => a.slug.localeCompare(b.slug));
  const cats = Object.keys(byCat).sort();
  let order = existingMax;
  let added = true;
  while (added) {
    added = false;
    for (const c of cats) {
      const next = byCat[c].shift();
      if (next) {
        next.front.order = ++order;
        added = true;
      }
    }
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const names = fs.existsSync(NAMES_PATH) ? JSON.parse(fs.readFileSync(NAMES_PATH, "utf8")) : {};

  const sourceDirs = args.sources.length ? args.sources : [INBOX];
  const files = sourceDirs.flatMap(listDocx);
  if (files.length === 0) {
    console.log(`No .docx files found in: ${sourceDirs.join(", ")}`);
    return;
  }
  console.log(`Converting ${files.length} DOCX file(s)…`);

  // Existing queue max order, so new batches append after current queue.
  let existingMax = 0;
  const existingSlugs = new Set();
  if (fs.existsSync(OUT_DIR)) {
    for (const cat of fs.readdirSync(OUT_DIR)) {
      const catDir = path.join(OUT_DIR, cat);
      if (!fs.statSync(catDir).isDirectory()) continue;
      for (const f of fs.readdirSync(catDir).filter((f) => f.endsWith(".md"))) {
        const fm = matter.read(path.join(catDir, f));
        existingMax = Math.max(existingMax, fm.data.order || 0);
        existingSlugs.add(`${cat}/${fm.data.slug}`);
      }
    }
  }

  const results = [];
  for (const file of files) {
    try {
      results.push(await convertOne(file, names));
    } catch (e) {
      results.push({ file, ok: false, error: e.message });
    }
  }

  const good = results.filter((r) => r.ok);
  const bad = results.filter((r) => !r.ok);
  const dupes = good.filter((r) => existingSlugs.has(`${r.category}/${r.slug}`));
  const fresh = good.filter((r) => !existingSlugs.has(`${r.category}/${r.slug}`));
  assignOrder(fresh, existingMax);

  if (!args.dryRun) {
    for (const r of fresh) {
      const dir = path.join(OUT_DIR, r.category);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, `${r.slug}.md`), matter.stringify("\n" + r.content + "\n", r.front));
      // Archive inbox files only; leave external --source files in place.
      if (path.dirname(r.file) === INBOX) {
        fs.mkdirSync(ARCHIVE, { recursive: true });
        fs.renameSync(r.file, path.join(ARCHIVE, path.basename(r.file)));
      }
    }
  }

  const report = {
    date: new Date().toISOString(),
    converted: fresh.map((r) => ({ slug: `${r.category}/${r.slug}`, order: r.front.order, ...r.qc })),
    skippedDuplicates: dupes.map((r) => `${r.category}/${r.slug}`),
    failed: bad.map((r) => ({ file: path.basename(r.file), error: r.error })),
  };
  fs.mkdirSync(path.join(ROOT, "content"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "content", "convert-report.json"), JSON.stringify(report, null, 2));

  const flagged = fresh.filter((r) => r.qc.flags.length);
  console.log(`\nConverted: ${fresh.length}  Duplicates skipped: ${dupes.length}  Failed: ${bad.length}`);
  if (flagged.length) {
    console.log(`\nFlagged for review (${flagged.length}):`);
    for (const r of flagged) console.log(`  ${r.category}/${r.slug}: ${r.qc.flags.join("; ")}`);
  }
  for (const r of bad) console.log(`  FAILED ${path.basename(r.file)}: ${r.error}`);
  console.log(`\nFull report: content/convert-report.json`);
  if (bad.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
