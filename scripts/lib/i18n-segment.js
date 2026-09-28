// Splits a static page into translatable segments, and walks it again to put
// translations back.
//
// The unit is a whole block (a <p>, <li>, <h2>, <a>, ...) whose contents are
// only text and inline tags, not the individual text nodes. Korean sentences on
// this site are routinely split across <br>, <strong> and <span>, and English
// needs those clauses in a different order, so translating fragment by fragment
// produces broken sentences. Inline tags become numbered markers (<t1>..</t1>,
// <t2/>) that a translator can move, and are restored from the original tag on
// the way back in.
//
// Extraction and injection share walk(), so both see exactly the same segments
// in exactly the same order. Elements marked data-i18n="skip" (the language
// switch) are never translated.

const cheerio = require("cheerio");

const INLINE = new Set([
  "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em", "font",
  "i", "img", "kbd", "label", "mark", "q", "s", "samp", "small", "span", "strong",
  "sub", "sup", "time", "u", "var", "wbr",
]);
const VOID_INLINE = new Set(["br", "img", "wbr"]);
const SKIP = new Set(["script", "style", "noscript", "svg", "template", "iframe", "head", "textarea"]);
const ATTRS = ["alt", "title", "placeholder", "aria-label"];
const META_KEYS = /^(description|og:title|og:description|og:site_name|twitter:title|twitter:description)$/;
const LETTER = /[A-Za-z가-힣]/;
const HANGUL = /[가-힣]/;
const JS_LITERAL = /(["'`])((?:\\[\s\S]|(?!\1)[\s\S])*?)\1/g;

const norm = (s) => s.replace(/[\s ]+/g, " ").trim();
const skipped = (n) => n.attribs && n.attribs["data-i18n"] === "skip";

function isElement(n) {
  return n && (n.type === "tag" || n.type === "script" || n.type === "style");
}

function inlineOnly(node) {
  for (const c of node.children || []) {
    if (!isElement(c)) continue;
    if (!INLINE.has(c.name) || skipped(c) || !inlineOnly(c)) return false;
  }
  return true;
}

function plainText(node) {
  let s = "";
  for (const c of node.children || []) {
    if (c.type === "text") s += c.data;
    else if (isElement(c)) s += plainText(c);
  }
  return s;
}

// Text with inline tags replaced by numbered markers. `tags` receives the
// original tag for each marker so it can be restored exactly.
function tokenize(node, tags) {
  let out = "";
  for (const c of node.children || []) {
    if (c.type === "text") out += c.data;
    else if (isElement(c)) {
      const n = tags.length + 1;
      if (VOID_INLINE.has(c.name)) {
        tags.push({ n, name: c.name, attribs: { ...c.attribs }, void: true });
        out += `<t${n}/>`;
      } else {
        tags.push({ n, name: c.name, attribs: { ...c.attribs } });
        out += `<t${n}>` + tokenize(c, tags) + `</t${n}>`;
      }
    }
  }
  return out;
}

// Calls visit(occurrence, ref) for every segment in document order. `ref` gives
// the injection step what it needs to replace that segment in place.
function walk($, visit) {
  const title = $("head > title").first();
  if (title.length) {
    const t = norm(title.text());
    if (LETTER.test(t)) visit({ kind: "title", key: t }, { el: title.get(0) });
  }
  $("head meta").each((_, el) => {
    const k = el.attribs.name || el.attribs.property || "";
    const v = el.attribs.content;
    if (META_KEYS.test(k) && v && LETTER.test(v)) visit({ kind: "meta", attr: k, key: norm(v) }, { el, attr: "content" });
  });

  let section = "";
  const attrs = (node) => {
    for (const a of ATTRS) {
      const v = node.attribs && node.attribs[a];
      if (v && LETTER.test(v)) visit({ kind: "attr", attr: a, tag: node.name, key: norm(v), section }, { el: node, attr: a });
    }
  };
  const descendantAttrs = (node) => {
    for (const c of node.children || []) {
      if (c.type === "tag" && !skipped(c)) {
        attrs(c);
        descendantAttrs(c);
      }
    }
  };

  function visitNode(node) {
    if (node.type !== "tag" || skipped(node)) return;
    // A textarea's contents are what the visitor types, but its placeholder is
    // visible copy and must be translated.
    if (node.name === "textarea") {
      attrs(node);
      return;
    }
    if (SKIP.has(node.name)) return;
    attrs(node);
    const txt = plainText(node);
    if (inlineOnly(node) && LETTER.test(txt)) {
      const tags = [];
      const key = norm(tokenize(node, tags));
      visit(
        { kind: "block", tag: node.name, cls: (node.attribs.class || "").slice(0, 60), key, markers: tags.length, section },
        { el: node, tags }
      );
      if (/^h[1-4]$/.test(node.name)) section = norm(txt).slice(0, 60);
      descendantAttrs(node);
      return;
    }
    for (const c of node.children || []) {
      if (c.type === "tag") visitNode(c);
      else if (c.type === "text" && LETTER.test(c.data)) {
        visit({ kind: "textrun", tag: node.name, key: norm(c.data), section }, { text: c });
      }
    }
  }

  const body = $("body").get(0);
  for (const c of (body && body.children) || []) visitNode(c);

  // Korean rendered by inline JavaScript (the housing comparison table, status
  // messages). Kept verbatim: injection replaces the literal in place.
  $("script").each((_, el) => {
    if (el.attribs && el.attribs.src) return;
    const code = $(el).html() || "";
    JS_LITERAL.lastIndex = 0;
    let m;
    while ((m = JS_LITERAL.exec(code))) {
      const lit = m[2];
      if (!HANGUL.test(lit) || lit.length > 600) continue;
      if (m[1] !== "`" && /\n/.test(lit)) continue;
      visit({ kind: "js", quote: m[1], key: lit }, { el, start: m.index + 1, end: m.index + 1 + lit.length, quote: m[1] });
    }
  });
}

function segmentHtml(html) {
  const $ = cheerio.load(html);
  const occ = [];
  walk($, (o) => occ.push(o));
  return occ.map((o, i) => ({ ordinal: i, ...o }));
}

module.exports = { walk, segmentHtml, tokenize, norm, INLINE, VOID_INLINE, HANGUL, LETTER };
