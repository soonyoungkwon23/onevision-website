// Fact-freshness audit for YMYL content (the 비자·이민 cluster).
//
// The fact-preservation gate in check-facts.js only proves that a rewrite kept
// the numbers its source had. It cannot tell you the source itself went stale,
// which is exactly what happened between 2026-07-13 and 2026-08-22: five facts
// in the visa cluster changed underneath drafts that still read as correct.
//
// This module answers the other question. Has anyone verified these facts
// recently enough to publish them? publish.js refuses to promote a post marked
// `ymyl: true` when the answer is no, so the weekly cron cannot quietly ship
// immigration advice that nobody has re-checked.

const fs = require("fs");
const path = require("path");
const { ROOT, todaySeoul } = require("./template");

const FACTS_FILE = path.join(ROOT, "scripts", "lib", "facts-immigration.json");
const DEFAULT_MAX_AGE_DAYS = 30;

function daysBetween(fromIso, toIso) {
  return Math.round((Date.parse(toIso) - Date.parse(fromIso)) / 86400000);
}

// Returns { ok, today, reviewedAge, problems: [{kind, key, message}] }.
function auditFacts(today) {
  const now = today || todaySeoul();
  const facts = JSON.parse(fs.readFileSync(FACTS_FILE, "utf8"));
  const meta = facts._meta || {};
  const globalMax = meta.maxAgeDays || DEFAULT_MAX_AGE_DAYS;
  const problems = [];

  const reviewedAge = meta.lastReviewed ? daysBetween(meta.lastReviewed, now) : Infinity;
  if (reviewedAge > globalMax) {
    problems.push({
      kind: "stale-review",
      key: "_meta.lastReviewed",
      message:
        `근거표 전체 재검토가 ${reviewedAge}일 전입니다. 허용 기준은 ${globalMax}일입니다. ` +
        `각 항목을 다시 확인한 뒤 lastReviewed 날짜를 갱신하세요.`,
    });
  }

  for (const [key, f] of Object.entries(facts)) {
    if (key === "_meta" || !f || typeof f !== "object") continue;

    // A fact with a known end date stops being true on that date, however
    // recently someone looked at it.
    if (f.expiresOn && Date.parse(now) >= Date.parse(f.expiresOn)) {
      problems.push({
        kind: "expired",
        key,
        message:
          `${f.expiresOn}자로 효력이 끝나는 근거입니다. 후속 조치가 있었는지 확인하고 ` +
          `본문과 근거표를 갱신한 뒤 expiresOn을 다시 설정하세요.`,
      });
    }

    if (f.tier === "RED") {
      const max = f.maxAgeDays || globalMax;
      const age = f.verified ? daysBetween(f.verified, now) : Infinity;
      if (age > max) {
        problems.push({
          kind: "stale-fact",
          key,
          message: `RED 항목 확인이 ${age}일 전입니다. 이 항목의 허용 기준은 ${max}일입니다.`,
        });
      }
    }
  }

  return { ok: problems.length === 0, today: now, reviewedAge, problems };
}

module.exports = { auditFacts, FACTS_FILE, DEFAULT_MAX_AGE_DAYS };
