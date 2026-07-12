// Weekly publisher. Deterministic — runs in CI (publish-weekly.yml).
//
//   node scripts/publish.js [--count N]
//
// Promotes the next N posts with status: ready (lowest `order` first) to
// status: published with today's date (Asia/Seoul). Posts that never passed
// the enhancement gate (status: draft) are ignored — nothing unreviewed can
// ever go live through this path.

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { ROOT, readConfig, todaySeoul } = require("./lib/template");

const CONTENT = path.join(ROOT, "content", "guides");

function main() {
  const config = readConfig();
  const idx = process.argv.indexOf("--count");
  const raw = idx !== -1 ? process.argv[idx + 1] : "";
  const count = raw && /^\d+$/.test(raw) ? parseInt(raw, 10) : config.dripRate;

  const ready = [];
  for (const cat of fs.existsSync(CONTENT) ? fs.readdirSync(CONTENT) : []) {
    const catDir = path.join(CONTENT, cat);
    if (!fs.statSync(catDir).isDirectory()) continue;
    for (const f of fs.readdirSync(catDir).filter((f) => f.endsWith(".md"))) {
      const file = path.join(catDir, f);
      const fm = matter.read(file);
      if (fm.data.status === "ready") ready.push({ file, fm });
    }
  }
  ready.sort((a, b) => (a.fm.data.order || 0) - (b.fm.data.order || 0));

  if (ready.length === 0) {
    // GitHub Actions warning annotation — visible in the run summary.
    console.log("::warning::Publish queue is empty — run a local convert+enhance batch to refill it.");
    console.log("Nothing to publish.");
    return;
  }

  const batch = ready.slice(0, count);
  const today = todaySeoul();
  for (const { file, fm } of batch) {
    fm.data.status = "published";
    fm.data.publishDate = today;
    fs.writeFileSync(file, matter.stringify(fm.content, fm.data));
    console.log(`published: ${fm.data.category}/${fm.data.slug} (order ${fm.data.order})`);
  }
  console.log(`\nPublished ${batch.length} post(s); ${ready.length - batch.length} remain in the queue.`);
}

main();
