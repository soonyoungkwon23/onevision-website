// Fact-preservation gate for the enhancement layer. Runs locally.
//
//   node scripts/check-facts.js <original.md> <enhanced.md>
//   node scripts/check-facts.js --all        # compare content/.originals/** vs content/guides/**
//
// Extracts every number-bearing fact token (dollar amounts, percentages,
// dates, bare numbers) and every Latin proper-noun phrase from the original,
// and fails if the enhanced version lost any of them or introduced new
// number facts that the original never contained. The enhancement rewrite
// may reorganize and rephrase freely — but tuition figures, test scores,
// deadlines, pass rates and school names must survive verbatim.

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { ROOT } = require("./lib/template");

const ORIGINALS = path.join(ROOT, "content", ".originals");
const CONTENT = path.join(ROOT, "content", "guides");

function stripMd(s) {
  return s
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/[#*_>`\[\]()|-]/g, " ")
    .replace(/\s+/g, " ");
}

// Number-bearing fact tokens. Normalizes commas so "118,816" === "118816".
function numberFacts(text) {
  const out = new Map(); // token -> count
  const re = /\$\s?[\d,]+(?:\.\d+)?|\d[\d,]*(?:\.\d+)?\s?%|\d[\d,]*(?:\.\d+)?/g;
  for (const m of text.matchAll(re)) {
    const tok = m[0].replace(/[\s,]/g, "");
    out.set(tok, (out.get(tok) || 0) + 1);
  }
  return out;
}

// Latin proper-noun phrases (school names, program names, cities).
function properNouns(text) {
  const out = new Set();
  const re = /(?:[A-Z][A-Za-z&.'-]*)(?:\s+(?:of|the|and|at|in|for|[A-Z][A-Za-z&.'-]*))*/g;
  for (const m of text.matchAll(re)) {
    const phrase = m[0].trim();
    if (phrase.length >= 3 && /[A-Z]/.test(phrase)) out.add(phrase);
  }
  return out;
}

function compare(origFile, newFile) {
  const origRaw = matter.read(origFile).content;
  const newRaw = matter.read(newFile).content;
  const orig = stripMd(origRaw);
  const enh = stripMd(newRaw);

  const problems = [];

  // Structure sanity: same section skeleton, no truncation or runaway growth.
  const count = (s, re) => (s.match(re) || []).length;
  const oH2 = count(origRaw, /^## /gm), nH2 = count(newRaw, /^## /gm);
  const oH3 = count(origRaw, /^### /gm), nH3 = count(newRaw, /^### /gm);
  if (oH2 !== nH2) problems.push(`h2 count changed: ${oH2} -> ${nH2}`);
  if (oH3 !== nH3) problems.push(`h3 count changed: ${oH3} -> ${nH3}`);
  const ratio = newRaw.length / origRaw.length;
  if (ratio < 0.7 || ratio > 1.4) problems.push(`length ratio out of range: ${ratio.toFixed(2)}`);
  const oNums = numberFacts(orig);
  const nNums = numberFacts(enh);
  for (const [tok] of oNums) {
    if (!nNums.has(tok)) problems.push(`lost number: ${tok}`);
  }
  for (const [tok] of nNums) {
    if (!oNums.has(tok)) problems.push(`new number not in original: ${tok}`);
  }
  const oProper = properNouns(orig);
  const nProperText = enh;
  for (const phrase of oProper) {
    if (!nProperText.includes(phrase)) problems.push(`lost name: ${phrase}`);
  }
  return problems;
}

function main() {
  const args = process.argv.slice(2);
  const pairs = [];

  if (args[0] === "--all") {
    if (!fs.existsSync(ORIGINALS)) {
      console.error("No content/.originals directory — nothing to compare.");
      process.exit(1);
    }
    for (const cat of fs.readdirSync(ORIGINALS)) {
      const catDir = path.join(ORIGINALS, cat);
      if (!fs.statSync(catDir).isDirectory()) continue;
      for (const f of fs.readdirSync(catDir).filter((f) => f.endsWith(".md"))) {
        const cur = path.join(CONTENT, cat, f);
        if (fs.existsSync(cur)) pairs.push([path.join(catDir, f), cur]);
      }
    }
  } else if (args.length === 2) {
    pairs.push([args[0], args[1]]);
  } else {
    console.error("Usage: check-facts.js <original.md> <enhanced.md> | --all");
    process.exit(1);
  }

  let failures = 0;
  for (const [o, n] of pairs) {
    const problems = compare(o, n);
    const name = path.relative(ROOT, n);
    if (problems.length) {
      failures++;
      console.log(`FAIL ${name}`);
      for (const p of problems.slice(0, 20)) console.log(`     ${p}`);
      if (problems.length > 20) console.log(`     …and ${problems.length - 20} more`);
    } else {
      console.log(`PASS ${name}`);
    }
  }
  console.log(`\n${pairs.length - failures}/${pairs.length} passed`);
  if (failures) process.exit(1);
}

main();
