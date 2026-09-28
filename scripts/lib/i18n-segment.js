// Splits a static page into translatable segments.
//
// The unit is a whole block (a <p>, <li>, <h2>, <a>, ...) whose contents are
// only text and inline tags, not the individual text nodes. Korean sentences on
// this site are routinely split across <br>, <strong> and <span>, and English
// needs those clauses in a different order, so translating fragment by fragment
// produces broken sentences. Inline tags become numbered markers (<t1>..</t1>,
// <t2/>) that a translator can move, and are restored from the original tag on
// the way back in.
//
// Walk order is deterministic, so the Nth segment of a page can be located again
// by re-running the same walk. That is what the injection step relies on.

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

const norm = (s) => s.replace(/[\s ]+/g, " ").trim();

function isElement(n) {
  return n && (n.type === "tag" || n.type === "script" || n.type === "style");
}

function inlineOnly(node) {
  for (const c of node.children || []) {
    if (!isElement(c)) continue;
    if (!INLINE.has(c.name) || !inlineOnly(c)) return false;
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

function segmentHtml(html) {
  const $ = cheerio.load(html);
  const occ = [];

  const title = $("head > title").first();
  if (title.length) {
    const t = norm(title.text());
    if (LETTER.test(t)) occ.push({ kind: "title", key: t });
  }
  $("head meta").each((_, el) => {
    const k = el.attribs.name || el.attribs.property || "";
    const v = el.attribs.content;
    if (META_KEYS.test(k) && v && LETTER.test(v)) occ.push({ kind: "meta", attr: k, key: norm(v) });
  });

  let section = "";
  const pushAttrs = (node) => {
    for (const a of ATTRS) {
      const v = node.attribs && node.attribs[a];
      if (v && LETTER.test(v)) occ.push({ kind: "attr", attr: a, tag: node.name, key: norm(v), section });
    }
  };
  const descendantAttrs = (node) => {
    for (const c of node.children || []) {
      if (c.type === "tag") {
        pushAttrs(c);
        descendantAttrs(c);
      }
    }
  };

  function visit(node) {
    if (node.type !== "tag" || SKIP.has(node.name)) return;
    pushAttrs(node);
    const txt = plainText(node);
    if (inlineOnly(node) && LETTER.test(txt)) {
      const tags = [];
      const key = norm(tokenize(node, tags));
      occ.push({
        kind: "block",
        tag: node.name,
        cls: (node.attribs.class || "").slice(0, 60),
        key,
        markers: tags.length,
        section,
      });
      if (/^h[1-4]$/.test(node.name)) section = norm(txt).slice(0, 60);
      descendantAttrs(node);
      return;
    }
    for (const c of node.children || []) {
      if (c.type === "tag") visit(c);
      else if (c.type === "text" && LETTER.test(c.data)) {
        occ.push({ kind: "textrun", tag: node.name, key: norm(c.data), section });
      }
    }
  }

  const body = $("body").get(0);
  for (const c of (body && body.children) || []) visit(c);

  // Korean rendered by inline JavaScript (the housing comparison table, status
  // messages). Kept verbatim: the injection step replaces the literal in place.
  $("script").each((_, el) => {
    if (el.attribs && el.attribs.src) return;
    const code = $(el).html() || "";
    const re = /(["'`])((?:\\[\s\S]|(?!\1)[\s\S])*?)\1/g;
    let m;
    while ((m = re.exec(code))) {
      const lit = m[2];
      if (!HANGUL.test(lit) || lit.length > 600) continue;
      if (m[1] !== "`" && /\n/.test(lit)) continue;
      occ.push({ kind: "js", quote: m[1], key: lit });
    }
  });

  return occ.map((o, i) => ({ ordinal: i, ...o }));
}

module.exports = { segmentHtml, tokenize, norm, INLINE, VOID_INLINE, HANGUL, LETTER };
