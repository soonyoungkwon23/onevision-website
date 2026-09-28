// Renders a page in one language from its source HTML and the translation
// memory. The source pages are Korean; localize(html, "en", ...) produces the
// English page. Segments are found by walking the page exactly as the
// extractor did, and looked up by their source text.

const cheerio = require("cheerio");
const { walk, tokenize, norm } = require("./i18n-segment");

const escText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function openTag(t, isVoid) {
  const attrs = Object.entries(t.attribs)
    .map(([k, v]) => (v === "" ? ` ${k}` : ` ${k}="${escAttr(v)}"`))
    .join("");
  return `<${t.name}${attrs}${isVoid ? " /" : ""}>`;
}

// Turns a translated string with <tN> markers back into HTML, using the
// original tags recorded when the source block was tokenized.
function rebuild(target, tags) {
  const byN = new Map(tags.map((t) => [t.n, t]));
  const tag = (n) => {
    const t = byN.get(Number(n));
    if (!t) throw new Error(`translation has marker t${n} that the source block does not`);
    return t;
  };
  return target
    .split(/(<\/?t\d+\/?>)/)
    .map((part) => {
      let m;
      if ((m = part.match(/^<t(\d+)\/>$/))) return openTag(tag(m[1]), true);
      if ((m = part.match(/^<t(\d+)>$/))) return openTag(tag(m[1]), false);
      if ((m = part.match(/^<\/t(\d+)>$/))) return `</${tag(m[1]).name}>`;
      return escText(part);
    })
    .join("");
}

function escapeForQuote(s, quote) {
  const re = new RegExp(`(?<!\\\\)${quote === "`" ? "`" : quote}`, "g");
  return s.replace(re, `\\${quote}`);
}

// lookup(key) returns a memory entry { src, ko, en, keep } or undefined.
// Returns { html, replaced, missing: [keys] }.
function localize(html, lang, lookup) {
  const $ = cheerio.load(html);
  const missing = [];
  const jsEdits = new Map();
  let replaced = 0;

  walk($, (occ, ref) => {
    const e = lookup(occ.key);
    if (!e) {
      missing.push(occ.key);
      return;
    }
    const target = e[lang];
    if (e.keep || target == null || target === occ.key) return;
    replaced++;
    switch (occ.kind) {
      case "title":
        $(ref.el).text(target);
        break;
      case "meta":
      case "attr":
        ref.el.attribs[ref.attr] = target;
        break;
      case "block":
        $(ref.el).html(rebuild(target, ref.tags));
        break;
      case "textrun": {
        const lead = ref.text.data.match(/^\s*/)[0];
        const trail = ref.text.data.match(/\s*$/)[0];
        ref.text.data = lead + target + trail;
        break;
      }
      case "js": {
        if (!jsEdits.has(ref.el)) jsEdits.set(ref.el, []);
        jsEdits.get(ref.el).push({ start: ref.start, end: ref.end, value: escapeForQuote(target, ref.quote) });
        break;
      }
    }
  });

  // Apply script edits back to front so earlier offsets stay valid.
  for (const [el, edits] of jsEdits) {
    const textNode = (el.children || []).find((c) => c.type === "text");
    if (!textNode) continue;
    let code = textNode.data;
    for (const ed of edits.sort((a, b) => b.start - a.start)) {
      code = code.slice(0, ed.start) + ed.value + code.slice(ed.end);
    }
    textNode.data = code;
  }

  $("html").attr("lang", lang);
  return { $, html: $.html(), replaced, missing };
}

// Rewrites URLs for a page served from /en/: assets become root-absolute, links
// to pages that exist in English stay relative (so they resolve inside /en/),
// and links to Korean-only sections (the blog) point back to the root.
function rewriteForSubdir($, enPages) {
  const isPage = (p) => enPages.has(p);
  const fix = (v) => {
    if (!v || /^(https?:|\/\/|mailto:|tel:|javascript:|data:|#)/i.test(v)) return v;
    if (v.startsWith("/")) {
      const m = v.match(/^\/([^?#]*)(.*)$/);
      if (m[1] === "") return `/en/${m[2]}`;
      if (isPage(m[1])) return `/en/${m[1]}${m[2]}`;
      return v;
    }
    const path = v.split(/[?#]/)[0];
    if (!path.includes("/") && isPage(path)) return v;
    return `/${v.replace(/^\.\//, "")}`;
  };
  const cssUrls = (css) =>
    css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (all, q, u) =>
      /^(https?:|\/\/|data:|\/|#)/.test(u) ? all : `url(${q}/${u.replace(/^\.\//, "")}${q})`
    );

  $("*").each((_, el) => {
    for (const a of ["href", "src", "action", "poster", "data-src"]) {
      if (el.attribs && el.attribs[a] != null) el.attribs[a] = fix(el.attribs[a]);
    }
    if (el.attribs && el.attribs.srcset) {
      el.attribs.srcset = el.attribs.srcset.replace(/(^|,\s*)([^\s,]+)/g, (all, sep, u) => sep + fix(u));
    }
    if (el.attribs && el.attribs.style) el.attribs.style = cssUrls(el.attribs.style);
  });
  $("style").each((_, el) => {
    const t = (el.children || []).find((c) => c.type === "text");
    if (t) t.data = cssUrls(t.data);
  });
  // Navigation and asset paths written inside inline scripts.
  $("script").each((_, el) => {
    const t = (el.children || []).find((c) => c.type === "text");
    if (!t) return;
    t.data = t.data
      .replace(/(["'`])\/#/g, "$1/en/#")
      .replace(/(["'`])(images|icons|css|js|blog)\//g, "$1/$2/");
  });
}

module.exports = { localize, rewriteForSubdir, rebuild, norm, tokenize };
