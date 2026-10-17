---
name: translate-zh
description: Translate OneVision site pages from Korean into natural Simplified Chinese (the /zh/ site) and keep the Chinese version in sync after Korean edits. Covers the standard (i18n/CRITERIA.zh.md), the glossary and phrase rules, the translate → check → review → merge → build pipeline, and how to judge naturalness when the site owner cannot read Chinese. Use when the user asks to update, fix, extend or review the Chinese site, or after Korean copy changes that need Chinese translations.
---

# Translate to Simplified Chinese (/zh/)

The Chinese site at `/zh/` is generated at build time from the Korean source
pages and `i18n/translations.zh.json`, exactly like `/en/`. The 114 blog
guides are Korean only and are not translated.

## Files

| File | What it is |
| --- | --- |
| `i18n/CRITERIA.zh.md` | The binding standard: fidelity, names, numbers, house style, register, reviewer rubric. Read it in full before translating or reviewing. |
| `i18n/glossary.zh.json` | Binding terms (`terms`), names kept as written (`keep`), phrases that fail the check (`banned`) or warn (`avoid`), and the spacing rule. |
| `i18n/zh-terminology.md` | Researched Chinese terms for U.S. admissions, aid, visas and immigration, and 137 university names, with sources. |
| `i18n/zh-style-notes.md` | Research on natural Chinese: AI tells, translationese, agency clichés, register, concision, numbers, with 48 before → after pairs and sources. |
| `docs/zh-site-technical.md` | Fonts, line breaking, China access, SEO and language-menu research behind `css/zh.css` and `scripts/i18n/build-locale.js`. |
| `i18n/translations.zh.json` | The Chinese translation memory, keyed by the Korean source text. |

## After a Korean edit (the usual case)

1. `node scripts/i18n/extract.js` (refreshes `i18n/segments.json`).
2. Keep English in sync first (see `i18n/CRITERIA.md`); Chinese work items
   carry the English as a meaning reference.
3. `node scripts/i18n/prepare-zh.js 1` writes only the new or changed
   sentences to `i18n/work/zh/in/`. Use more batches for big changes.
4. Translate each work file to `i18n/work/zh/out/<same name>.json` following
   `i18n/CRITERIA.zh.md` Part A (format in A8). For more than a few dozen
   segments, give each batch to its own subagent with the files above.
5. `node scripts/i18n/check-zh.js` until zero errors. Treat warnings as
   prompts to rewrite, not noise: each one names a pattern Chinese readers
   notice.
6. Review every batch twice, in this order, editing the out file in place and
   logging each change to `i18n/work/zh/review/b<N>-<lens>.json`
   (`[{ "id", "before", "after", "criterion", "why" }]`):
   - **Fidelity lens:** compare with the Korean clause by clause (C1 to C4,
     C7). Back-translate in your head; smooth Chinese that says more than the
     Korean is the usual failure.
   - **Naturalness lens:** read the Chinese alone, page by page
     (`node scripts/i18n/page-view.js <page> --lang zh --target`), and fix
     anything a mainland editor would not write (C5, C6, C8, C9). Apply the
     reviewer checklist in `i18n/zh-style-notes.md` section (f).
7. `node scripts/i18n/check-zh.js` again, then
   `node scripts/i18n/merge-zh.js --prune` and
   `node scripts/i18n/check-zh.js --memory --all`.
8. `node scripts/build.js` (or `node scripts/i18n/build-locale.js zh`) and
   confirm "0 untranslated". Look at the changed pages at 375px and 1280px.

## Judging naturalness without reading Chinese

The owner cannot check Chinese by eye, so quality comes from process:
- the mechanical gate (`check-zh.js`) for everything a rule can catch,
- two independent review lenses, the second reading the Chinese without the
  source,
- consistency checks across pages (the same Korean term must map to the same
  Chinese term; grep the memory),
- and, for anything customer-facing that changes a lot, a short back-translation
  into English for the owner to compare with the Korean meaning.

Recommend a native mainland reader review new pages when one is available.

## Decisions already made (do not reopen without the owner)

- Simplified Chinese, mainland usage; `<html lang="zh-CN">`, `hreflang="zh-Hans"`.
- System Chinese fonts only on `/zh/` (no Google Fonts or jsDelivr: unreliable
  in mainland China). Headings bold sans.
- Spacing: a space between Chinese and Latin letters or codes, none before or
  after plain numbers.
- People's names stay as written (Latin, or Hangul for Korean-only names);
  never invent Chinese characters for a Korean name.
- Program names and test, form and visa codes stay in Latin letters.
- 您 for parents, used sparingly; no exclamation marks, no ——, no ·.
