// Static site generator for the blog section. Deterministic — safe to run in CI.
//
//   node scripts/build.js
//
// Reads content/guides/**/*.md, renders posts with status: published into
// public_html/blog/, regenerates blog indexes, sitemap.xml and rss.xml.
// Exits non-zero on structural problems so CI fails instead of deploying junk.

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");
const {
  ROOT,
  PUBLIC,
  readConfig,
  render,
  escapeHtml,
  bakedHeader,
  bakedFooter,
  anchorId,
  formatDateKo,
} = require("./lib/template");
const schema = require("./lib/schema");
const images = require("./lib/images");

const md = new MarkdownIt({ html: true, linkify: false });
const CONTENT = path.join(ROOT, "content", "guides");
const BLOG_OUT = null; // set in main() from config

function fail(msg) {
  console.error(`BUILD FAILED: ${msg}`);
  process.exit(1);
}

function loadPosts() {
  const posts = [];
  if (!fs.existsSync(CONTENT)) return posts;
  for (const cat of fs.readdirSync(CONTENT)) {
    const catDir = path.join(CONTENT, cat);
    if (!fs.statSync(catDir).isDirectory()) continue;
    for (const f of fs.readdirSync(catDir).filter((f) => f.endsWith(".md"))) {
      const fm = matter.read(path.join(catDir, f));
      posts.push({ ...fm.data, body: fm.content, file: path.join(catDir, f) });
    }
  }
  return posts;
}

function validate(posts, config) {
  const seen = new Set();
  for (const p of posts) {
    const key = `${p.category}/${p.slug}`;
    if (!p.title || !p.slug || !p.category || !p.description) fail(`missing front-matter fields in ${p.file}`);
    if (!config.categories[p.category]) fail(`unknown category "${p.category}" in ${p.file}`);
    if (seen.has(key)) fail(`duplicate slug ${key}`);
    seen.add(key);
    if (!p.body || p.body.trim().length < 200) fail(`empty/short body in ${p.file}`);
    if (p.status === "published") {
      if (!p.publishDate) fail(`published post without publishDate: ${key}`);
      if (!p.enhancedDate) fail(`published post never passed the enhancement gate: ${key}`);
    }
  }
}

// Split a post body into lead (before first ##), main (## sections), cta (after <!--cta-->).
function splitBody(bodyMd) {
  let mainMd = bodyMd;
  let ctaMd = "";
  const ctaIdx = bodyMd.indexOf("<!--cta-->");
  if (ctaIdx !== -1) {
    ctaMd = bodyMd.slice(ctaIdx + "<!--cta-->".length);
    mainMd = bodyMd.slice(0, ctaIdx);
  }
  const h2Idx = mainMd.search(/^## /m);
  const leadMd = h2Idx > 0 ? mainMd.slice(0, h2Idx) : "";
  const sectionsMd = h2Idx > 0 ? mainMd.slice(h2Idx) : mainMd;
  return { leadMd, sectionsMd, ctaMd };
}

// Add ids to h2/h3 and build a nested TOC.
function addAnchors(html) {
  const toc = [];
  const seen = new Map();
  const out = html.replace(/<(h2|h3)>([\s\S]*?)<\/\1>/g, (m, tag, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let id = anchorId(text) || "section";
    const n = (seen.get(id) || 0) + 1;
    seen.set(id, n);
    if (n > 1) id = `${id}-${n}`;
    toc.push({ level: tag === "h2" ? 2 : 3, text, id });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  return { html: out, toc };
}

function tocHtml(toc) {
  if (!toc.length) return "";
  let html = "<ol>";
  let open3 = false;
  for (const item of toc) {
    if (item.level === 2) {
      if (open3) { html += "</ol></li>"; open3 = false; }
      else if (html !== "<ol>") html += "</li>";
      html += `<li><a href="#${item.id}">${escapeHtml(item.text)}</a>`;
    } else {
      if (!open3) { html += "<ol>"; open3 = true; }
      html += `<li><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`;
    }
  }
  if (open3) html += "</ol></li>";
  else if (html !== "<ol>") html += "</li>";
  return html + "</ol>";
}

function postUrl(config, p) {
  return `${config.baseUrl}/${config.blogPathPrefix}/${p.category}/${p.slug}.html`;
}

function verificationMeta(config) {
  const tags = [];
  if (config.verification.googleSiteVerification)
    tags.push(`<meta name="google-site-verification" content="${config.verification.googleSiteVerification}" />`);
  if (config.verification.naverSiteVerification)
    tags.push(`<meta name="naver-site-verification" content="${config.verification.naverSiteVerification}" />`);
  return tags.join("\n    ");
}

function cardHtml(config, p) {
  const cat = config.categories[p.category];
  // Lowercased haystack for the client-side live search: EN + KO university
  // name, title, description, category label. Quotes stripped so the attribute
  // stays well-formed.
  const search = escapeHtml(
    [p.universityEn, p.universityKo, p.title, p.description, cat.label]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .replace(/"/g, " ")
  );
  return `<a class="post-card" data-category="${p.category}" data-search="${search}" href="/${config.blogPathPrefix}/${p.category}/${p.slug}.html">
    <span class="pc-thumb">${images.thumbSvg(p)}</span>
    <span class="pc-body">
      <span class="pc-cat">${escapeHtml(cat.shortLabel)}</span>
      <span class="pc-title">${escapeHtml(p.title)}</span>
      <span class="pc-desc">${escapeHtml(p.description)}</span>
      <span class="pc-date">${formatDateKo(p.publishDate)}</span>
    </span>
  </a>`;
}

function relatedHtml(config, p, published) {
  const sameCat = published
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .sort((a, b) => a.order - b.order);
  if (!sameCat.length) return "";
  const start = sameCat.findIndex((x) => x.order > p.order);
  const picks = [];
  for (let k = 0; k < Math.min(3, sameCat.length); k++) {
    picks.push(sameCat[((start === -1 ? 0 : start) + k) % sameCat.length]);
  }
  const cat = config.categories[p.category];
  return picks
    .map(
      (r) => `<a class="related-card" href="/${config.blogPathPrefix}/${r.category}/${r.slug}.html">
      <span class="rc-cat">${escapeHtml(cat.shortLabel)}</span>
      <span class="rc-title">${escapeHtml(r.title)}</span>
    </a>`
    )
    .join("\n");
}

function buildPost(config, tpl, headerHtml, footerHtml, p, published) {
  const { leadMd, sectionsMd, ctaMd } = splitBody(p.body);
  const { html: bodyHtml, toc } = addAnchors(md.render(sectionsMd));
  const url = postUrl(config, p);
  const cat = config.categories[p.category];

  const jsonLd =
    schema.toScriptTag(schema.article(p, url, config)) +
    schema.toScriptTag(
      schema.breadcrumbs([
        { name: "홈", url: `${config.baseUrl}/` },
        { name: config.blogNavLabel, url: `${config.baseUrl}/${config.blogPathPrefix}/index.html` },
        { name: cat.label, url: `${config.baseUrl}/${config.blogPathPrefix}/${p.category}/index.html` },
        { name: p.title, url },
      ])
    );

  // Lead the <title> with the Korean university name Koreans actually search
  // on Naver (e.g. "듀크대학교"), unless the title already contains it.
  const koPrefix = p.universityKo && !p.title.includes(p.universityKo) ? `${p.universityKo} ` : "";
  return render(tpl, {
    pageTitle: `${koPrefix}${p.title} | 원비전컨설팅`,
    title: p.title,
    description: p.description,
    canonicalUrl: url,
    siteName: config.siteName,
    ogImage: config.baseUrl + config.organization.ogImage,
    publishDate: p.publishDate || "",
    publishDateKo: formatDateKo(p.publishDate),
    verificationMeta: verificationMeta(config),
    jsonLd,
    headerHtml,
    footerHtml,
    blogNavLabel: config.blogNavLabel,
    category: p.category,
    categoryLabel: cat.label,
    heroSvg: images.heroSvg(p),
    bandSvg: images.bandSvg(p),
    leadHtml: md.render(leadMd),
    tocHtml: tocHtml(toc),
    bodyHtml,
    ctaHtml: ctaMd ? md.render(ctaMd) : "",
    relatedHtml: relatedHtml(config, p, published),
  });
}

function buildIndexPage(config, tpl, headerHtml, footerHtml, opts) {
  const { posts, categoryKey } = opts;
  const isAll = !categoryKey;
  const urlPath = isAll
    ? `/${config.blogPathPrefix}/index.html`
    : `/${config.blogPathPrefix}/${categoryKey}/index.html`;
  const url = config.baseUrl + urlPath;

  const catsWithPosts = Object.keys(config.categories).filter((c) => posts.some((p) => p.category === c));
  const filtersHtml = isAll
    ? `<div class="blog-filters">
        <button class="filter-btn active" type="button" onclick="setFilter('all', this)">전체</button>
        ${catsWithPosts
          .map(
            (c) =>
              `<button class="filter-btn" type="button" onclick="setFilter('${c}', this)">${escapeHtml(config.categories[c].label)}</button>`
          )
          .join("\n")}
      </div>`
    : "";

  const shown = isAll ? posts : posts.filter((p) => p.category === categoryKey);
  const cardsHtml = shown.length
    ? shown.map((p) => cardHtml(config, p)).join("\n")
    : `<p class="empty-note">아직 게시된 가이드가 없습니다. 곧 첫 가이드가 공개됩니다.</p>`;

  const heading = isAll
    ? "미국 대학 입학 전략 가이드"
    : `${config.categories[categoryKey].label} 입학 전략 가이드`;
  const description = isAll
    ? "원비전컨설팅이 직접 리서치한 미국 대학 입학 전략 가이드 — BSN 간호대학, MBA 등 학교별 합격 전략, 비용, 비자·취업 경로까지 한눈에."
    : `미국 ${config.categories[categoryKey].label} 프로그램 입학 전략 가이드 모음 — 학교별 합격 전략, 지원 요건, 비용, 비자·취업 경로 분석.`;

  const jsonLd = schema.toScriptTag(schema.organization(config));

  return {
    urlPath,
    html: render(tpl, {
      pageTitle: `${heading} | 원비전컨설팅`,
      heading,
      subheading:
        "합격 데이터, 지원 요건, 비용, 졸업 후 비자·취업 경로까지 — 원비전컨설팅 리서치팀이 학교별로 정리한 심층 가이드입니다.",
      description,
      canonicalUrl: url,
      siteName: config.siteName,
      ogImage: config.baseUrl + config.organization.ogImage,
      verificationMeta: verificationMeta(config),
      jsonLd,
      headerHtml,
      footerHtml,
      filtersHtml,
      cardsHtml,
      indexPageSize: config.indexPageSize,
    }),
  };
}

function corePages() {
  return fs
    .readdirSync(PUBLIC)
    .filter(
      (f) =>
        f.endsWith(".html") && !["header.html", "footer.html", "default.php"].includes(f) && !f.startsWith("naver")
    )
    .sort();
}

function buildSitemap(config, published) {
  const urls = [];
  for (const f of corePages()) {
    urls.push({ loc: `${config.baseUrl}/${f === "index.html" ? "" : f}` });
  }
  urls.push({ loc: `${config.baseUrl}/${config.blogPathPrefix}/index.html` });
  const cats = [...new Set(published.map((p) => p.category))].sort();
  for (const c of cats) urls.push({ loc: `${config.baseUrl}/${config.blogPathPrefix}/${c}/index.html` });
  for (const p of published) {
    urls.push({ loc: postUrl(config, p), lastmod: p.updatedDate || p.publishDate });
  }
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function buildRss(config, published) {
  const items = [...published]
    .sort((a, b) => String(b.publishDate).localeCompare(String(a.publishDate)) || b.order - a.order)
    .slice(0, config.rssItemLimit)
    .map((p) => {
      const url = postUrl(config, p);
      const pub = new Date(`${p.publishDate}T09:00:00+09:00`).toUTCString();
      return `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${p.description}]]></description>
      <pubDate>${pub}</pubDate>
    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${config.siteName} — ${config.blogNavLabel}]]></title>
    <link>${config.baseUrl}/${config.blogPathPrefix}/index.html</link>
    <description><![CDATA[미국 대학 입학 전략 가이드 — 원비전컨설팅]]></description>
    <language>ko</language>
${items}
  </channel>
</rss>
`;
}

function main() {
  const config = readConfig();
  const blogDir = path.join(PUBLIC, config.blogPathPrefix);
  const posts = loadPosts();
  validate(posts, config);

  const published = posts
    .filter((p) => p.status === "published")
    .sort((a, b) => String(b.publishDate).localeCompare(String(a.publishDate)) || a.order - b.order);

  const headerHtml = bakedHeader();
  const footerHtml = bakedFooter();
  const postTpl = fs.readFileSync(path.join(ROOT, "templates", "post.html"), "utf8");
  const indexTpl = fs.readFileSync(path.join(ROOT, "templates", "index.html"), "utf8");

  // Clean and rebuild the generated tree.
  fs.rmSync(blogDir, { recursive: true, force: true });
  fs.mkdirSync(blogDir, { recursive: true });

  for (const p of published) {
    const html = buildPost(config, postTpl, headerHtml, footerHtml, p, published);
    const dir = path.join(blogDir, p.category);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${p.slug}.html`), html);
  }

  // Blog landing + category indexes (only categories that have published posts).
  const landing = buildIndexPage(config, indexTpl, headerHtml, footerHtml, { posts: published });
  fs.writeFileSync(path.join(blogDir, "index.html"), landing.html);
  for (const c of [...new Set(published.map((p) => p.category))]) {
    const page = buildIndexPage(config, indexTpl, headerHtml, footerHtml, { posts: published, categoryKey: c });
    fs.mkdirSync(path.join(blogDir, c), { recursive: true });
    fs.writeFileSync(path.join(blogDir, c, "index.html"), page.html);
  }

  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), buildSitemap(config, published));
  fs.writeFileSync(path.join(PUBLIC, "rss.xml"), buildRss(config, published));

  const queued = posts.filter((p) => p.status === "ready").length;
  const drafts = posts.filter((p) => p.status === "draft").length;
  console.log(
    `Build OK — published: ${published.length}, ready (queued): ${queued}, drafts: ${drafts}. ` +
      `Generated ${published.length} post pages + ${1 + new Set(published.map((p) => p.category)).size} index pages + sitemap + rss.`
  );
}

main();
