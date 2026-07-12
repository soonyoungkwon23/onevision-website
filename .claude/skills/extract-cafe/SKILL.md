---
name: extract-cafe
description: Browser-assisted extraction of the OneVision Naver cafe back-catalog (cafe.naver.com/onevisionconsulting) into content/guides/column/*.md drafts. Use when the user asks to inventory, extract, scrape, or import Naver cafe posts. Requires the user to be logged into Naver in Chrome (Claude in Chrome extension).
---

# Extract Naver Cafe Posts

The cafe is login-walled — extraction runs through the user's logged-in Chrome
session via the Claude in Chrome tools (`mcp__claude-in-chrome__*`). Never
attempt headless/HTTP scraping of cafe.naver.com; it will not work and risks
the account.

State lives in `content/naver-cafe/inventory.json`:

```json
{
  "generatedAt": "2026-07-12",
  "posts": [
    {
      "id": "123",
      "url": "https://cafe.naver.com/onevisionconsulting/123",
      "title": "…",
      "board": "게시판 이름",
      "date": "2026-01-05",
      "status": "listed | extracted | converted | skipped-duplicate",
      "slug": "…",
      "note": ""
    }
  ]
}
```

## Session 1 — Inventory (run once, resume as needed)

1. Confirm the Chrome extension is connected and the user is logged into Naver.
2. Open the cafe's 전체글보기 (all posts) list. Page through every list page;
   for each row capture id/url/title/board/date into `inventory.json` with
   `status: "listed"`. The cafe UI uses an iframe (`cafe_main`) — read the
   iframe content, not the outer page.
3. Dedupe against the DOCX-sourced guides: a cafe post whose title contains a
   university/program that already exists under `content/guides/{bsn,mba}/`
   → `status: "skipped-duplicate"`, note which slug supersedes it. The local
   DOCX versions always win. Show the dedupe list to the user for review.

## Session 2..N — Extraction (batches of ~10-20)

For each post with `status: "listed"`:
1. Navigate to the post URL, read the article body from the `cafe_main` iframe.
2. Save images: download each content image to
   `public_html/images/blog/<slug>/NN.<ext>` and reference it in the Markdown
   as `/images/blog/<slug>/NN.<ext>`. Skip decorative banners/stickers.
3. Convert the body to Markdown. Front-matter (same schema as guides):
   `title` (cafe title, cleaned), `slug` (ASCII, from title keywords),
   `category: column`, `source: naver-cafe`, `description` (first sentences,
   ≤160 chars), `status: draft`, `order` (append after current max),
   `publishDate/updatedDate/enhancedDate: null`, plus `originalUrl` and
   `originalDate` (the cafe date — keep it; the enhancement layer may surface
   it in the text).
4. Write to `content/guides/column/<slug>.md`, set inventory `status:
   "extracted"` → after review `"converted"`.

## After each batch

- Run `/enhance-guides` over the new drafts (mandatory gate — same as DOCX
  posts). Then `node scripts/build.js`, commit, push.
- Update `inventory.json` statuses so the next session resumes cleanly.
