# OneVision Website + Blog Pipeline

Static site for https://onevisionconsulting.us plus a fully automated blog
publishing pipeline (SEO for Naver + Google).

## How it works

```
DOCX guide ──► npm run convert ──► content/guides/<cat>/<slug>.md   (status: draft)
Naver cafe ──► /extract-cafe   ──►            〃

draft ──► /enhance-guides (Claude Code: rewrite + fact gate + judge) ──► status: ready

ready ──► GitHub Actions (Mon 09:00 KST) publish.js → build.js → FTPS deploy ──► live
```

- `public_html/` — the deployed site. `public_html/blog/`, `sitemap.xml`,
  `rss.xml` are **generated** by `scripts/build.js` (gitignored; CI rebuilds).
- `content/guides/{bsn,mba,column}/*.md` — the source of truth for posts.
  `status: draft → ready → published` (only `/enhance-guides` sets `ready`,
  only `scripts/publish.js` sets `published`).
- `content/.originals/` — pre-enhancement snapshots (fact-gate baseline).
- Posts can NEVER go live without passing the enhancement gate: `publish.js`
  ignores drafts, and `build.js` refuses published posts without `enhancedDate`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run convert` | Convert DOCX in `content/inbox/` (or `--source <dir>`) to draft posts + QC report |
| `npm run build` | Regenerate `public_html/blog/`, sitemap, RSS (deterministic; runs in CI) |
| `npm run publish-posts -- --count N` | Promote next N `ready` posts to `published` (CI runs this weekly) |
| `npm run check-facts -- --all` | Fact-preservation gate: originals vs current |
| `npm run serve` | Local preview of `public_html` |

Claude Code skills: `/enhance-guides` (mandatory quality gate),
`/extract-cafe` (browser-assisted Naver cafe import).

## Weekly cadence

`.github/workflows/publish-weekly.yml` runs Monday 09:00 KST: publishes the
next `dripRate` posts from the queue (see `site.config.json`), commits, builds,
deploys over FTPS. `deploy.yml` builds + deploys on every push to `main`.
Manual run: GitHub → Actions → Weekly Publish → Run workflow (optional `count`).

## One-time setup (after cloning / repo creation)

1. **GitHub secrets** (repo → Settings → Secrets and variables → Actions):
   `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` — from Hostinger hPanel →
   Files → FTP Accounts. Check the FTP root: if the account already lands in
   `public_html`, change `server-dir` in both workflow files to `./`.
2. **First deploy**: Actions → Build & Deploy → Run workflow. First run uploads
   the full site (~23 MB); later runs are incremental (state-file sync).
   Afterwards delete Hostinger's placeholder `default.php` on the server once.
3. **Search consoles**: register the domain in Google Search Console and Naver
   Search Advisor (서치어드바이저), put the verification codes into
   `site.config.json` → `verification`, push. Then submit `sitemap.xml` to
   both, and `rss.xml` to Naver as well (speeds up Naver indexing). Request
   indexing (수집 요청) for the seed batch URLs.

## Adding new guides (weekly routine)

1. Drop new `.docx` into `content/inbox/` (or run with
   `--source "C:\Users\pc\Desktop\OneVision Guides"`).
2. `npm run convert` — review the QC report it prints.
3. In Claude Code: `/enhance-guides` — runs the rewrite + gates, promotes to
   `ready`, shows a spot-check report.
4. Commit + push. The Monday job drips them out automatically.
