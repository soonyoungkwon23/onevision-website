// Reports whether the YMYL fact table is fresh enough to publish from.
//
//   node scripts/check-freshness.js          # exit 1 if anything is stale
//   node scripts/check-freshness.js --warn   # always exit 0, just report
//
// Runs in CI before the weekly publish so a stale table is visible in the run
// summary, and locally before you flip anything to `ready`.

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { ROOT } = require("./lib/template");
const { auditFacts } = require("./lib/freshness");

const CONTENT = path.join(ROOT, "content", "guides");
const WARN_ONLY = process.argv.includes("--warn");

function ymylPostsAwaitingPublish() {
  const out = [];
  for (const cat of fs.existsSync(CONTENT) ? fs.readdirSync(CONTENT) : []) {
    const dir = path.join(CONTENT, cat);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const fm = matter.read(path.join(dir, f));
      if (fm.data.ymyl && fm.data.status === "ready") out.push(fm.data.slug || f);
    }
  }
  return out;
}

const audit = auditFacts();
const queued = ymylPostsAwaitingPublish();

if (audit.ok) {
  console.log(`Facts fresh. Last full review was ${audit.reviewedAge} day(s) ago.`);
  if (queued.length) {
    console.log(`${queued.length} YMYL post(s) cleared to publish: ${queued.join(", ")}`);
  }
  process.exit(0);
}

for (const p of audit.problems) {
  const line = `[${p.kind}] ${p.key}: ${p.message}`;
  console.log(WARN_ONLY ? `::warning::${line}` : `::error::${line}`);
}

if (queued.length) {
  console.log(
    `::warning::${queued.length}건의 YMYL 글이 발행 대기 중이며 근거표가 갱신될 때까지 보류됩니다: ` +
      queued.join(", ")
  );
}

console.log("");
console.log("다시 확인한 뒤 scripts/lib/facts-immigration.json 의 lastReviewed 와");
console.log("각 항목의 verified 날짜를 갱신하면 발행이 재개됩니다.");

process.exit(WARN_ONLY ? 0 : 1);
