// Generates the English site under public_html/en/ from the Korean source pages
// and the translation memory. Runs as part of scripts/build.js, so CI rebuilds
// it on every deploy; the output is gitignored like the blog.
//
//   node scripts/i18n/build-en.js
//
// Each English page gets lang="en", its own canonical URL, hreflang links to
// its Korean counterpart, asset paths that work from the /en/ folder, and a
// language switch that points back to Korean. A sentence with no translation
// is left in Korean and reported, rather than blocking the whole deploy.

const fs = require("fs");
const path = require("path");
const { localize, rewriteForSubdir } = require("../lib/i18n-localize");

const ROOT = path.resolve(__dirname, "..", "..");
const PUBLIC = path.join(ROOT, "public_html");
const EN_DIR = path.join(PUBLIC, "en");
const MEMORY = path.join(ROOT, "i18n", "translations.json");

// Orphan duplicate of staff-sangwanhan.html; canonicalised to it in both languages.
const CANONICAL_OVERRIDE = { "staff-sangwonhan.html": "staff-sangwanhan.html" };
const EN_CSS_VERSION = "20260927e";

function staticPages() {
  return fs.readdirSync(PUBLIC).filter((f) => f.endsWith(".html") && !f.startsWith("naver")).sort();
}

// English writes lists as "major/campus/requirements", one unbreakable word to
// the browser. In the narrow cards on phones that word gets cut at an arbitrary
// letter. A <wbr> after each slash lets the line break there instead.
const SLASH_BETWEEN_WORDS = /([A-Za-z0-9)”"'])\/(?=[A-Za-z0-9(“"'])/g;
const NO_WBR = new Set(["script", "style", "textarea", "title", "option", "noscript"]);
const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function allowBreakAfterSlash($) {
  const texts = [];
  $("body")
    .find("*")
    .contents()
    .each((_, n) => {
      if (n.type === "text" && !NO_WBR.has(n.parent.name) && SLASH_BETWEEN_WORDS.test(n.data)) texts.push(n);
      SLASH_BETWEEN_WORDS.lastIndex = 0;
    });
  for (const n of texts) $(n).replaceWith(escapeText(n.data).replace(SLASH_BETWEEN_WORDS, "$1/<wbr>"));
}

function buildEnglish({ baseUrl }) {
  const entries = JSON.parse(fs.readFileSync(MEMORY, "utf8")).entries;
  const lookup = (key) => entries[key];
  const pages = staticPages();
  const enPages = new Set(pages);
  const missing = [];

  fs.rmSync(EN_DIR, { recursive: true, force: true });
  fs.mkdirSync(EN_DIR, { recursive: true });

  for (const page of pages) {
    const src = fs.readFileSync(path.join(PUBLIC, page), "utf8");
    const fragment = !/<html[\s>]/i.test(src);
    const result = localize(src, "en", lookup);
    const $ = result.$;
    for (const k of result.missing) missing.push(`${page}: ${k.slice(0, 80)}`);

    rewriteForSubdir($, enPages);
    allowBreakAfterSlash($);

    $(".lang-switch").each((_, el) => {
      el.attribs.href = "/";
      el.attribs.hreflang = "ko";
      el.attribs.lang = "ko";
      el.attribs["aria-label"] = "한국어";
      $(el).find(".lang-switch-label, .lang-switch-short").text("한국어");
    });

    if (!fragment) {
      const canon = CANONICAL_OVERRIDE[page] || page;
      const p = canon === "index.html" ? "" : canon;
      $('link[rel="canonical"], link[rel="alternate"][hreflang]').remove();
      $("head").append(
        `\n    <link rel="canonical" href="${baseUrl}/en/${p}" />` +
          `\n    <link rel="alternate" hreflang="ko" href="${baseUrl}/${p}" />` +
          `\n    <link rel="alternate" hreflang="en" href="${baseUrl}/en/${p}" />` +
          `\n    <link rel="alternate" hreflang="x-default" href="${baseUrl}/${p}" />\n  `
      );
      $('meta[property="og:locale"]').attr("content", "en_US");
      // English-only layout fixes, last in <head> so they win over page styles.
      $("head").append(`<link rel="stylesheet" href="/css/en.css?v=${EN_CSS_VERSION}" />\n  `);
    }

    fs.writeFileSync(path.join(EN_DIR, page), fragment ? $("body").html() : $.html());
  }

  if (missing.length) {
    console.log(`::warning::${missing.length} sentence(s) have no English translation yet and stay Korean on /en/. Run the i18n workflow (extract, prepare, translate, check, merge).`);
    for (const m of missing.slice(0, 20)) console.log(`  untranslated ${m}`);
  }
  return { pages: pages.length, missing: missing.length };
}

module.exports = { buildEnglish, staticPages, CANONICAL_OVERRIDE };

if (require.main === module) {
  const { readConfig } = require("../lib/template");
  const r = buildEnglish(readConfig());
  console.log(`English site: ${r.pages} pages in public_html/en/ (${r.missing} untranslated sentence(s))`);
}
