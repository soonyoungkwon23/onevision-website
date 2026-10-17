// Generates the translated sites (English at /en/, Simplified Chinese at /zh/)
// from the Korean source pages and each language's translation memory. Runs as
// part of scripts/build.js, so CI rebuilds them on every deploy; the output is
// gitignored like the blog.
//
//   node scripts/i18n/build-locale.js [en|zh ...]
//
// Each page gets its own lang, canonical URL, hreflang links to every language
// version, asset paths that work from the subfolder, the header and footer
// written into the HTML, and a language menu pointing at this page in each
// language. A sentence with no translation is left in Korean and reported,
// rather than blocking the whole deploy.

const fs = require("fs");
const path = require("path");
const { localize, rewriteForSubdir } = require("../lib/i18n-localize");

const ROOT = path.resolve(__dirname, "..", "..");
const PUBLIC = path.join(ROOT, "public_html");

// Orphan duplicate of staff-sangwanhan.html; canonicalised to it in every language.
const CANONICAL_OVERRIDE = { "staff-sangwonhan.html": "staff-sangwanhan.html" };

// hreflang codes for the alternate links. Korean lives at the root.
const ALTERNATES = [
  { code: "ko", hreflang: "ko", dir: "" },
  { code: "en", hreflang: "en", dir: "en/" },
  { code: "zh", hreflang: "zh-Hans", dir: "zh/" },
];

const LOCALES = {
  en: {
    dir: "en",
    field: "en",
    htmlLang: "en",
    ogLocale: "en_US",
    label: "English",
    short: "EN",
    memory: path.join(ROOT, "i18n", "translations.json"),
    css: "/css/en.css?v=20260928b",
    breakAfterSlash: true,
  },
  zh: {
    dir: "zh",
    field: "zh",
    htmlLang: "zh-CN",
    ogLocale: "zh_CN",
    label: "简体中文",
    short: "中文",
    contentLanguage: "zh-CN",
    memory: path.join(ROOT, "i18n", "translations.zh.json"),
    css: "/css/zh.css?v=20261016d",
    // Google Fonts and jsDelivr are unreliable from mainland China, and a
    // render-blocking stylesheet that never loads can leave the page blank for
    // over a minute. The Korean fonts have no Simplified Chinese glyphs anyway;
    // zh.css uses the reader's system Chinese fonts instead.
    dropExternalFonts: true,
  },
};

function staticPages() {
  return fs.readdirSync(PUBLIC).filter((f) => f.endsWith(".html") && !f.startsWith("naver")).sort();
}

const pagePath = (page) => {
  const canon = CANONICAL_OVERRIDE[page] || page;
  return canon === "index.html" ? "" : canon;
};

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

const FONT_HOSTS = /fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net\/npm\/pretendard/;

function dropExternalFonts($) {
  $("link").each((_, el) => {
    if (FONT_HOSTS.test(el.attribs.href || "")) $(el).remove();
  });
  // @import of the same font CSS inside inline <style> blocks.
  $("style").each((_, el) => {
    const t = (el.children || []).find((c) => c.type === "text");
    if (t) t.data = t.data.replace(/@import\s+url\([^)]*(fonts\.googleapis\.com|jsdelivr\.net)[^)]*\)\s*;?/g, "");
  });
}

// The header's language menu: the button shows the current language.
function setLanguageMenu($, loc) {
  $(".lang-menu-current").text(loc.label);
  $(".lang-menu-short").text(loc.short);
}

// Points the menu links at this page's counterparts and marks the current
// one, so the links work before JavaScript runs and crawlers that do not run
// it (Baidu) see them. js/common.js does the same in the browser.
function setLanguageLinks($, code, page) {
  const p = pagePath(page);
  $(".lang-menu-list a[data-lang]").each((_, a) => {
    const alt = ALTERNATES.find((x) => x.code === a.attribs["data-lang"]);
    if (!alt) return;
    a.attribs.href = `/${alt.dir}${p}`;
    if (alt.code === code) a.attribs["aria-current"] = "page";
    else delete a.attribs["aria-current"];
  });
}

function alternateLinks(baseUrl, page) {
  const p = pagePath(page);
  return (
    ALTERNATES.map((a) => `\n    <link rel="alternate" hreflang="${a.hreflang}" href="${baseUrl}/${a.dir}${p}" />`).join("") +
    `\n    <link rel="alternate" hreflang="x-default" href="${baseUrl}/${p}" />`
  );
}

function buildLocale(code, { baseUrl }) {
  const loc = LOCALES[code];
  if (!loc) throw new Error(`unknown locale ${code}`);
  const outDir = path.join(PUBLIC, loc.dir);
  const memory = fs.existsSync(loc.memory) ? JSON.parse(fs.readFileSync(loc.memory, "utf8")).entries : {};
  const lookup = (key) => memory[key];
  const pages = staticPages();
  const localPages = new Set(pages);
  const missing = [];

  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const render = (page) => {
    const src = fs.readFileSync(path.join(PUBLIC, page), "utf8");
    const result = localize(src, loc.field, lookup);
    const $ = result.$;
    for (const k of result.missing) missing.push(`${page}: ${k.slice(0, 80)}`);
    rewriteForSubdir($, localPages, loc.dir);
    if (loc.breakAfterSlash) allowBreakAfterSlash($);
    setLanguageMenu($, loc);
    return { $, fragment: !/<html[\s>]/i.test(src) };
  };

  // Header and footer are rendered once and written into every page, so the
  // translated pages carry their navigation in the HTML itself. js/common.js
  // only fetches them when <header>/<footer> is empty.
  const shared = {};
  for (const f of ["header.html", "footer.html"]) {
    if (localPages.has(f)) shared[f] = render(f).$("body").html();
  }

  for (const page of pages) {
    const { $, fragment } = render(page);

    if (!fragment) {
      const header = $("header").first();
      if (shared["header.html"] && header.length && !header.children().length) header.html(shared["header.html"]);
      const footer = $("footer").first();
      if (shared["footer.html"] && footer.length && !footer.children().length) footer.html(shared["footer.html"]);
      setLanguageLinks($, code, page);

      $("html").attr("lang", loc.htmlLang);
      $('link[rel="canonical"], link[rel="alternate"][hreflang]').remove();
      $("head").append(`\n    <link rel="canonical" href="${baseUrl}/${loc.dir}/${pagePath(page)}" />` + alternateLinks(baseUrl, page) + "\n  ");
      $('meta[property="og:locale"]').attr("content", loc.ogLocale);
      if (loc.contentLanguage) {
        $('meta[http-equiv="content-language"]').remove();
        $("head").prepend(`\n    <meta http-equiv="content-language" content="${loc.contentLanguage}" />`);
      }
      if (loc.dropExternalFonts) dropExternalFonts($);
      // Language-specific layout fixes, last in <head> so they win over page styles.
      $("head").append(`<link rel="stylesheet" href="${loc.css}" />\n  `);
    }

    fs.writeFileSync(path.join(outDir, page), fragment ? $("body").html() : $.html());
  }

  if (missing.length) {
    console.log(`::warning::${missing.length} sentence(s) have no ${loc.label} translation yet and stay Korean on /${loc.dir}/. Run the i18n workflow for this language.`);
    for (const m of missing.slice(0, 20)) console.log(`  untranslated ${m}`);
  }
  return { pages: pages.length, missing: missing.length };
}

module.exports = { buildLocale, LOCALES, ALTERNATES, alternateLinks, staticPages, CANONICAL_OVERRIDE };

if (require.main === module) {
  const { readConfig } = require("../lib/template");
  const codes = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(LOCALES);
  for (const c of codes) {
    const r = buildLocale(c, readConfig());
    console.log(`${LOCALES[c].label} site: ${r.pages} pages in public_html/${LOCALES[c].dir}/ (${r.missing} untranslated sentence(s))`);
  }
}
