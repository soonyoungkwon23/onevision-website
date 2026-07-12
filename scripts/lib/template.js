// Shared helpers for the blog pipeline: tiny template renderer, header/footer
// baking, slugs, HTML escaping, dates.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const PUBLIC = path.join(ROOT, "public_html");

function readConfig() {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
}

// {{{var}}} inserts raw HTML, {{var}} inserts escaped text.
function render(template, vars) {
  return template
    .replace(/\{\{\{(\w+)\}\}\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : ""))
    .replace(/\{\{(\w+)\}\}/g, (_, k) => (vars[k] != null ? escapeHtml(String(vars[k])) : ""));
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Rewrite relative href/src in a header/footer fragment to root-absolute so the
// fragment works when baked into pages under /blog/<category>/.
function rootRelative(fragmentHtml) {
  return fragmentHtml.replace(
    /(href|src)="(?!https?:|\/\/|\/|#|mailto:|tel:|javascript:|data:)([^"]+)"/g,
    (_, attr, url) => `${attr}="/${url}"`
  );
}

function bakedHeader() {
  return rootRelative(fs.readFileSync(path.join(PUBLIC, "header.html"), "utf8"));
}

function bakedFooter() {
  return rootRelative(fs.readFileSync(path.join(PUBLIC, "footer.html"), "utf8"));
}

// ASCII slug from a filename token sequence.
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Anchor id for a heading (Korean text allowed — browsers handle unicode ids).
function anchorId(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

// Today's date in Asia/Seoul as YYYY-MM-DD.
function todaySeoul() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
}

function formatDateKo(iso) {
  if (!iso) return "";
  const [y, m, d] = String(iso).split("-").map(Number);
  return `${y}년 ${m}월 ${d}일`;
}

module.exports = {
  ROOT,
  PUBLIC,
  readConfig,
  render,
  escapeHtml,
  rootRelative,
  bakedHeader,
  bakedFooter,
  slugify,
  anchorId,
  todaySeoul,
  formatDateKo,
};
