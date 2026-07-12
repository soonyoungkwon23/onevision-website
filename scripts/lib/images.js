// Auto-generated branded SVG artwork for each post: hero banner, mid-article
// "at a glance" band, and card thumbnail. Inline SVG (rendered in the DOM, so
// it uses the page's Pretendard / Noto Serif KR fonts and Korean renders
// correctly). No external assets, no licensing — scales to every post.
const { escapeHtml } = require("./template");

// Per-category theming: shared burgundy family, distinct accent + icon.
const THEME = {
  bsn: { g1: "#8f1631", g2: "#490b1b", accent: "#f2acc0", kicker: "BSN · 미국 간호대학", pill: "BSN 간호대학", icon: "pulse" },
  mba: { g1: "#6d1228", g2: "#3a0e1e", accent: "#ecc888", kicker: "MBA · 미국 경영대학원", pill: "MBA", icon: "chart" },
  column: { g1: "#472742", g2: "#271327", accent: "#cdb4dc", kicker: "칼럼 · 유학 인사이트", pill: "칼럼", icon: "doc" },
};

// Line-icon path data drawn in a 0 0 24 24 box, stroked with currentColor.
const ICONS = {
  pulse: '<path d="M2 13h4l2.5-7 4 14 3-9 2 2h4.5" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  chart: '<path d="M4 20V4M4 20h16M8 20v-6M13 20V9M18 20v-9" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  doc: '<path d="M7 3h7l4 4v14H7zM14 3v4h4" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  target: '<circle cx="12" cy="12" r="8" fill="none" stroke-width="2"/><circle cx="12" cy="12" r="3.4" fill="none" stroke-width="2"/>',
  coin: '<circle cx="12" cy="12" r="8" fill="none" stroke-width="2"/><path d="M12 7.5v9M9.6 9.4c0-1.2 1.1-1.9 2.4-1.9s2.4.6 2.4 1.8c0 2.6-4.8 1.4-4.8 4 0 1.2 1.1 1.9 2.4 1.9s2.4-.7 2.4-1.9" fill="none" stroke-width="1.7" stroke-linecap="round"/>',
  plane: '<path d="M3 12l18-8-7 18-2.5-7.5z" fill="none" stroke-width="2" stroke-linejoin="round"/>',
  cap: '<path d="M12 4L2 9l10 5 8-4v6M6 12v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
};

function iconG(name, x, y, size, color, opacity = 1) {
  const s = size / 24;
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${color}" color="${color}" opacity="${opacity}">${ICONS[name] || ""}</g>`;
}

// Greedy word-wrap into up to `maxLines` lines of ~`perLine` chars.
function wrap(text, perLine, maxLines) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if (!cur) cur = w;
    else if ((cur + " " + w).length <= perLine) cur += " " + w;
    else { lines.push(cur); cur = w; if (lines.length === maxLines - 1) break; }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  // If words remain, ellipsize the last line.
  const used = lines.join(" ").split(/\s+/).length;
  if (used < words.length && lines.length) lines[lines.length - 1] = lines[lines.length - 1] + "…";
  return lines;
}

function theme(cat) {
  return THEME[cat] || THEME.column;
}

// Big banner at the top of a post.
function heroSvg(post) {
  const t = theme(post.category);
  const uid = `${post.category}-${post.slug}`;
  const nameLines = wrap(post.universityEn || post.title, 26, 3);
  const big = nameLines.length >= 3 ? 40 : 52;
  const lh = nameLines.length >= 3 ? 50 : 62;
  // Center the name lower so the first line clears the kicker (y≈150) while the
  // last line stays above the JTC lockup (y≈386).
  const nameY = Math.max(206, Math.round(272 - ((nameLines.length - 1) * lh) / 2));

  return `<svg class="art-hero" viewBox="0 0 1200 420" width="1200" height="420" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${escapeHtml(post.universityEn)} ${t.pill}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hg-${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.g1}"/><stop offset="1" stop-color="${t.g2}"/>
    </linearGradient>
    <clipPath id="hc-${uid}"><rect width="1200" height="420" rx="0"/></clipPath>
  </defs>
  <g clip-path="url(#hc-${uid})">
    <rect width="1200" height="420" fill="url(#hg-${uid})"/>
    <circle cx="1050" cy="360" r="230" fill="none" stroke="${t.accent}" stroke-width="1.5" opacity="0.18"/>
    <circle cx="1050" cy="360" r="330" fill="none" stroke="${t.accent}" stroke-width="1.5" opacity="0.12"/>
    <circle cx="1050" cy="360" r="430" fill="none" stroke="${t.accent}" stroke-width="1.5" opacity="0.07"/>
    ${iconG(t.icon, 902, 70, 250, t.accent, 0.14)}
    <g font-family="'Pretendard Variable', system-ui, sans-serif">
      <rect x="72" y="66" width="${44 + t.pill.length * 17}" height="38" rx="19" fill="${t.accent}" opacity="0.22"/>
      <text x="94" y="91" fill="${t.accent}" font-size="19" font-weight="700" letter-spacing="0.5">${escapeHtml(t.pill)}</text>
      <text x="74" y="150" fill="#ffffff" opacity="0.72" font-size="17" font-weight="600" letter-spacing="2">ONEVISION 입학 전략 가이드</text>
    </g>
    <g font-family="'Noto Serif KR', serif" fill="#ffffff">
      ${nameLines.map((l, i) => `<text x="72" y="${nameY + i * lh}" font-size="${big}" font-weight="600">${escapeHtml(l)}</text>`).join("\n      ")}
    </g>
    <g font-family="'Pretendard Variable', system-ui, sans-serif">
      <text x="72" y="386" fill="${t.accent}" font-size="18" font-weight="700" letter-spacing="1">JTC</text>
      <text x="112" y="386" fill="#ffffff" opacity="0.6" font-size="16" font-weight="500">OneVision Consulting · 미국 유학·이민 컨설팅</text>
    </g>
  </g>
</svg>`;
}

// Compact thumbnail for listing cards.
function thumbSvg(post) {
  const t = theme(post.category);
  const uid = `t-${post.category}-${post.slug}`;
  const nameLines = wrap(post.universityEn || post.title, 20, 3);
  // Flow the name DOWN from a fixed top that clears the category badge (y 52–88),
  // shrinking type on 3-line names so the last line stays above the footer (y≈404).
  const big = nameLines.length >= 3 ? 30 : 38;
  const lh = nameLines.length >= 3 ? 38 : 46;
  const nameY = 150;
  return `<svg class="art-thumb" viewBox="0 0 800 440" width="800" height="440" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${escapeHtml(post.universityEn)}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.g1}"/><stop offset="1" stop-color="${t.g2}"/></linearGradient>
  <clipPath id="c${uid}"><rect width="800" height="440"/></clipPath></defs>
  <g clip-path="url(#c${uid})">
    <rect width="800" height="440" fill="url(#${uid})"/>
    <circle cx="690" cy="380" r="150" fill="none" stroke="${t.accent}" stroke-width="1.4" opacity="0.20"/>
    <circle cx="690" cy="380" r="230" fill="none" stroke="${t.accent}" stroke-width="1.4" opacity="0.11"/>
    ${iconG(t.icon, 560, 44, 190, t.accent, 0.16)}
    <rect x="54" y="52" width="${40 + t.pill.length * 16}" height="36" rx="18" fill="${t.accent}" opacity="0.24"/>
    <text x="74" y="76" font-family="'Pretendard Variable', system-ui, sans-serif" fill="${t.accent}" font-size="18" font-weight="700">${escapeHtml(t.pill)}</text>
    <g font-family="'Noto Serif KR', serif" fill="#ffffff">
      ${nameLines.map((l, i) => `<text x="56" y="${nameY + i * lh}" font-size="${big}" font-weight="600">${escapeHtml(l)}</text>`).join("\n      ")}
    </g>
    <text x="56" y="404" font-family="'Pretendard Variable', system-ui, sans-serif" fill="#ffffff" opacity="0.62" font-size="17" font-weight="600" letter-spacing="1">OneVision 입학 전략 가이드</text>
  </g>
</svg>`;
}

// Mid-article "at a glance" band — three pillars every guide covers.
function bandSvg(post) {
  const t = theme(post.category);
  const uid = `b-${post.category}-${post.slug}`;
  const pillars = [
    { icon: "target", title: "합격 전략", sub: "GPA · 시험 · 에세이 · 마감" },
    { icon: "coin", title: "비용 · 재정", sub: "학비 · 장학금 · 총비용" },
    { icon: "plane", title: "비자 · 취업 경로", sub: "OPT · 스폰서 · 영주권" },
  ];
  const col = (p, cx) => `
    <g transform="translate(${cx} 0)">
      <circle cx="46" cy="66" r="30" fill="${t.g1}" opacity="0.10"/>
      ${iconG(p.icon, 30, 50, 32, t.g1)}
      <text x="92" y="58" font-family="'Noto Serif KR', serif" fill="#1a1a1f" font-size="24" font-weight="600">${escapeHtml(p.title)}</text>
      <text x="92" y="86" font-family="'Pretendard Variable', system-ui, sans-serif" fill="#6b6864" font-size="16">${escapeHtml(p.sub)}</text>
    </g>`;
  return `<svg class="art-band" viewBox="0 0 1200 190" width="1200" height="190" role="img" aria-label="이 가이드에서 다루는 핵심" xmlns="http://www.w3.org/2000/svg">
  <defs><clipPath id="${uid}"><rect width="1200" height="190" rx="18"/></clipPath></defs>
  <g clip-path="url(#${uid})">
    <rect width="1200" height="190" fill="#f7f2ef"/>
    <rect width="6" height="190" fill="${t.g1}"/>
    <text x="40" y="44" font-family="'Pretendard Variable', system-ui, sans-serif" fill="${t.g1}" font-size="15" font-weight="700" letter-spacing="1.5">이 가이드에서 다루는 핵심</text>
    <g transform="translate(0 60)">
      ${col(pillars[0], 40)}
      ${col(pillars[1], 440)}
      ${col(pillars[2], 830)}
    </g>
  </g>
</svg>`;
}

module.exports = { heroSvg, thumbSvg, bandSvg };
