// Builds the English site under public_html/en/. Kept as its own entry point
// for existing commands; the shared logic for every language lives in
// build-locale.js.
//
//   node scripts/i18n/build-en.js

const { buildLocale, staticPages, CANONICAL_OVERRIDE } = require("./build-locale");

function buildEnglish(config) {
  return buildLocale("en", config);
}

module.exports = { buildEnglish, staticPages, CANONICAL_OVERRIDE };

if (require.main === module) {
  const { readConfig } = require("../lib/template");
  const r = buildEnglish(readConfig());
  console.log(`English site: ${r.pages} pages in public_html/en/ (${r.missing} untranslated sentence(s))`);
}
