# OneVision Blog — Content Strategy & Auto-Generation Roadmap

_Generated 2026-07-12 from multi-source research (Korean search demand, Naver/Google SEO, competitor gaps). Companion planning doc to the pipeline in this repo._

---

# OneVision Content Roadmap — Auto-Generation Plan for Naver + Google

**Scope:** what to generate next off the existing convert→enhance→publish pipeline. Grounded in the current mechanics: 106 live school guides (56 BSN, 50 MBA), a regex fact-gate (`check-facts.js`) that pins every number token and every Latin proper-noun phrase and enforces matching H2/H3 counts and a 0.7–1.4 length ratio, the `/enhance-guides` Korean-rewrite + judge layer, and a 20-posts/week drip (Monday 09:00 KST). Three new `column`-style categories are implied below; add them to `site.config.json.categories` before first convert.

Bottom line up front: the biggest untapped ROI is **not** more school pages — it's the **evergreen thematic cluster + the immigration funnel**, because that's where Korean demand is highest-intent, competitors are thin, and OneVision uniquely owns the full 유학→취업→이민 story. The school matrix is a strong *long-tail footprint* play but has diminishing marginal returns and rising Google scaled-content risk. Rank order: **Pillar B (evergreen) > Pillar A (matrix expansion) > Pillar C (listicles)**, with the immigration sub-cluster of B being the single highest-leverage thing to build first.

---

## PILLAR A — Expand the school × program matrix

You already proved this model works (106 pages). The question is *which axes to extend*, ranked by demand-per-page and by how cleanly each page passes the fact-gate.

**A1. `[School] 편입 가이드` — transfer guides per school. HIGHEST priority in this pillar.**
This is the sweet spot: 편입 is an existing OneVision service line, demand is strong, and supply is thin (undergrad-transfer brief, Tier 2/3). Mirror the exact model that produced the BSN/MBA set — one `[School] 편입 가이드` per school covering transfer GPA, deadlines, and for California schools the ASSIST articulation + UC TAG mechanics. Start with the ~30–40 highest-search schools (UC system, big state flagships, CC-feeder targets), not all of them.
- Keywords captured: `[학교명] 편입 조건`, `[학교명] 편입 지원 자격`, `UC 편입`, `커뮤니티 칼리지 편입`.
- Demand: high · Competition: low-moderate (thin incumbents) · **Auto-generate: MEDIUM.** Transfer-credit rules (WES/ECE, ASSIST articulation, junior=60 / sophomore=30 credits) are structured and citable, but per-school transfer GPA cutoffs and deadlines vary and must be grounded per-school (see §3). California ASSIST data is the risky part — treat as "cite official, hedge specifics."

**A2. Add the missing BSN/MBA schools + a second program per existing school.**
- Fill BSN gaps toward the U.S. News BSN ranked set; add high-demand MBA schools you skipped. Cheapest wins because the template + data model already exist.
- **New program axis on schools you already cover:** `[School] MSBA / 데이터사이언스 석사 가이드` and `[School] CS 석사 가이드`. The mba-grad brief flags MSBA/데이터사이언스/CS 석사 as the "취업 잘되는" STEM-OPT-eligible adjacencies where H-1B sponsor jobs concentrate. These reuse your MBA template and tie straight into the STEM-OPT immigration angle.
- Keywords: `[학교명] BSN 지원 자격`, `[학교명] MSBA`, `[학교명] 데이터사이언스 석사`, `미국 취업 잘되는 전공`.
- Demand: high (STEM 석사) · Competition: moderate · **Auto-generate: MEDIUM** (STEM-designation status per program must be grounded, not inferred — a program's CIP/STEM status is a factual claim).

**A3. `[School] 조건부 입학 / Pathway 가이드` — conditional-admission per school.**
Real pain-point demand (`내신 낮아도 미국 대학`, `조건부 입학`), underserved by quality content. Only for schools that actually run INTO/Kaplan/Navitas-style pathway or conditional programs — do **not** auto-generate this for schools without one (hallucination risk is high). Curate the eligible-school list manually, then template.
- Demand: moderate-high · Competition: low · **Auto-generate: HARD to do safely** — gate to a hand-verified school whitelist.

Matrix-expansion caveat for Google: every added school page must clear your existing scaled-content bar (the SEO brief's ≥500 unique Korean words, ≤40% template share, distinct query per page). The `/enhance-guides` layer already forces per-page uniqueness; keep enforcing it, because a `[School] 편입` set that's boilerplate-with-name-swapped is exactly what Google's Scaled Content Abuse policy demotes.

---

## PILLAR B — Evergreen thematic guides (highest ROI overall)

These are the money pages: head/mid-tail service-intent keywords, high conversion, and mostly beatable incumbents. Publish into a new `column` (칼럼·후기) category — you already have it configured. Structure each as **pillar → spokes**, and build the four hub pages the SEO brief recommends (신입학 / 편입학 / 대학원 / 이민·비자) as the internal-link backbone.

Group order below is also priority order: **비자·이민 first** (highest intent + OneVision's unique full-funnel ownership + immigration is where "후기/방법" demand is densest), then **MBA·대학원**, then **간호**, then **편입**, then **신입학**.

### 비자·이민 (build first — the funnel hub + spokes)

1. **미국 유학 후 취업·이민 전체 루트 (F-1 → OPT → STEM OPT → H-1B → 영주권)** — pillar/hub. Keyword: `미국 취업 이민 루트`, `OPT H1B 영주권 순서`. Owns the funnel; no competitor holds it in one voice. This is the internal-link hub linking to guides 2–8.
2. **STEM OPT 3년 완벽 가이드 (12+24개월)** — keyword: `STEM OPT 3년`, `STEM OPT 연장`. Bust the "비즈니스 석사는 OPT 1년" myth. OneVision already owns this content on Threads — repurpose. Include the STEM-qualifying field list and the H-1B cumulative-odds stat (25% → 44% → 58%).
3. **F-1 학생비자 인터뷰 질문 + 후기 (실제 받은 질문 N개)** — keyword: `미국 학생비자 인터뷰 질문`, `F1 비자 인터뷰 후기`. Strongest evergreen "후기" demand in the whole visa vertical. Canonical questions + "취업 단어는 피하라" + 비이민 의도 입증 tip.
4. **미국 학생비자(F-1) 신청 절차: DS-160 · SEVIS · 비용 총정리 (2026)** — keyword: `DS-160 작성 방법`, `SEVIS 비용`, `F1 비자 비용`. Load-bearing facts: SEVIS I-901 $350, MRV $185, 5-step flow.
5. **H-1B 취업비자 + $10만 수수료, 유학생인 나는 내야 하나? (2026)** — keyword: `H1B 10만 달러 수수료`, `유학생 H1B 영향`. News-driven anxiety traffic; the killer nuance is F-1 change-of-status exemption. **Flag: fast-moving policy — highest refresh cadence.**
6. **EB-3 취업이민 영주권 완벽 가이드 (숙련·비숙련)** — keyword: `EB-3 영주권`, `미국 취업이민`. Highest commercial value → feeds 이민 consult leads. Include the labor-cert fraud warning for E-A-T.
7. **미국 영주권 문호 분석 (N월)** — keyword: `취업이민 문호`, `visa bulletin 한국`. **Auto-generate MONTHLY** — recurring-traffic asset your pipeline is uniquely suited to own. See §5.
8. **간호사 EB-3 / Schedule A 영주권 가이드** — keyword: `간호사 이민`, `EB-3 간호사`, `Schedule A`. Bridges nursing↔immigration; RN is a Schedule A occupation (no PERM). Cross-link from every BSN school page.

Demand: very high · Competition: moderate (law firms + 이주공사, beatable on funnel-ownership + freshness) · **Auto-generate: MEDIUM-HARD.** This is YMYL — every page needs a "이민 변호사 상담 권장" disclaimer + consult CTA. Fees/문호/policy are the risky tokens (see §3). The pillar-structure and question-form H2s are easy; the specific dollar/date facts must be grounded.

### MBA·대학원

9. **미국 대학원 유학 완벽 가이드 (A to Z)** — pillar. Keyword: `미국 대학원 유학`, `미국 대학원 준비`.
10. **미국 MBA 유학 완벽 가이드** — pillar. Keyword: `미국 MBA 유학`, `미국 MBA 준비`.
11. **STEM MBA / STEM 지정 MBA로 OPT 3년** — keyword: `STEM MBA OPT 3년`, `STEM 지정 MBA`. Differentiated; ties MBA↔immigration. Name the programs searchers name (Emory Goizueta One-Year, Georgetown MSBA).
12. **GRE 준비 할까 말까? + GRE 면제 (2027 지원자)** — keyword: `GRE 면제`, `GRE 준비`. Test-optional policy differs by program — huge timely topic.
13. **미국 MBA GMAT 몇 점이면? (합격자 평균)** — keyword: `미국 MBA GMAT 점수`. M7 avg 732, 명문 700+.
14. **낮은 학점(GPA)으로 미국 대학원/MBA 합격하는 법** — keyword: `낮은 학점 미국 대학원`. GPA conversion (한국 4.5 → 미국 3.0≈3.22–3.38), SOP/추천서 극복.
15. **미국 MBA / 대학원 SOP · 에세이 · 추천서 쓰는 법** — keyword: `미국 MBA 에세이`, `SOP 작성법`. High conversion.
16. **30대에 미국 유학, 늦었을까? (기회비용 현실)** — keyword: `30대 유학`, `직장 그만두고 유학`. Emotionally-driven, high-engagement, converts.
17. **미국 MBA vs 국내 MBA + 온라인/파트타임/EMBA 비교** — keyword: `미국 MBA vs 국내 MBA`, `온라인 MBA`. Comparison intent.
18. **미국 대학원 비용·학비·장학금 현실 ("MBA는 장학금 극히 적음")** — keyword: `미국 대학원 비용`, `MBA 장학금`. Honest numbers, under-served.

Demand: high · Competition: high but beatable on freshness + honesty (고우해커스/leadersuhak run keyword-stuffed series) · **Auto-generate: EASY-MEDIUM** (process/how-to is easy; GMAT averages and cost figures need grounding).

### 간호 (nursing)

19. **미국 간호사 되는 법 완벽 가이드 (BSN → NCLEX → RN → 취업 → 이민)** — pillar. Keyword: `미국 간호사 되는 법`, `미국 간호대학 유학`. Hub for all BSN school pages + guide #8.
20. **NCLEX-RN 완벽 가이드 (응시 자격·비용·CGFNS·준비)** — keyword: `NCLEX 미국 간호사`, `NCLEX 응시 자격`. High evergreen intent.
21. **한국 간호사 → 미국 RN 전환 (면허·CGFNS·VisaScreen)** — keyword: `한국 간호사 미국 취업`. Distinct high-intent audience (working nurses, not just students).

Demand: high, tightly targeted · Competition: moderate · **Auto-generate: MEDIUM** (NCLEX/CGFNS procedures are stable and citable; fees/pass-rate numbers need grounding).

### 편입 (transfer) — thematic spokes behind the A1 school set

22. **미국 대학 편입 완벽 가이드 (junior vs sophomore, 학점 인정, 타임라인)** — pillar. Keyword: `미국 편입`, `편입 준비`.
23. **커뮤니티 칼리지 → UC 편입 (TAG / ASSIST)** — keyword: `커뮤니티 칼리지 편입`, `TAG 편입 보장`. Cost hook ($10k CC vs $60k 4yr). TAG = 6 campuses, GPA 2.7–3.4; UCLA/UCB/UCSD excluded.
24. **한국 대학 재학 중 미국 편입 (WES / ECE / syllabus 학점 인정)** — keyword: `한국 대학 미국 편입`, `WES 학점 인증`. Clear query, almost no quality supply — easiest win in this group.
25. **미국 편입 에세이 / 편입 추천서** — keyword: `미국 편입 에세이 예시`, `미국 편입 추천서`. Transfer-specific (not freshman) is scarce.

Demand: moderate-high, low competition · **Auto-generate: MEDIUM** (WES/ASSIST mechanics are citable; ASSIST specifics risky).

### 신입학 (freshman) — lowest priority (saturated head terms)

26. **미국 대학 지원 일정 타임라인 (2026, Common App → ED/EA → RD → 커밋)** — keyword: `미국 대학 지원 일정`. Template this ONCE as canonical, reuse across all school guides.
27. **SAT 필수 vs Test-Optional 미국 대학 리스트 (2026 정책 트래커)** — keyword: `SAT 필수 대학 2026`, `test optional 미국 대학`. **Freshness is the only edge** — publish dated, sourced, refresh yearly. Message: "test-optional ≠ test-blind; 유학생은 제출하라."

Demand: very high but saturated · **Auto-generate: MEDIUM** (the timeline is easy/stable; the test-policy school list is HARD — it's a factual roster that changes yearly and must be human-verified each cycle).

---

## PILLAR C — Ranking / listicle guides

Listicles win featured snippets and Naver 스마트블록 "리스트형" intent, and they're natural internal-link hubs down into your school pages. But **rankings are the single most hallucination-prone content type** — a wrong rank or tuition number is both a trust and a YMYL problem. Auto-generate the *scaffold*; ground every ranked row in one source dataset (see §3). Priority: build these as hubs that link to A-pillar school pages you already have.

- **미국 간호대학 순위 TOP 20 (BSN, U.S. News 기준)** — keyword: `미국 간호대학 순위`. You already hold U.S. News BSN ranks in frontmatter across 56 pages — assemble from your own data, zero external hallucination.
- **미국 MBA 순위 TOP 20** — keyword: `미국 MBA 순위`.
- **미국 MBA 학비 순위 TOP 20** — keyword: `미국 MBA 학비`. (고우해커스 ranks for this; beat on freshness.)
- **STEM 지정 MBA / STEM 석사 프로그램 리스트** — keyword: `STEM 지정 MBA`, `STEM 전공 리스트`.
- **미국 취업 잘되는 전공 / H-1B 스폰서 많은 전공 TOP 10** — keyword: `미국 취업 잘되는 전공`.
- **커뮤니티 칼리지 → UC 편입 잘 되는 학교 / TAG 6개 캠퍼스** — keyword: `UC 편입 잘되는 학교`.
- **미국 간호사 연봉 순위 (주별 RN 연봉)** — keyword: `미국 간호사 연봉`. Ground on BLS OEWS.

Demand: high (listicles over-index on click intent) · Competition: high for head-term rankings, low for niche ones (STEM MBA list, TAG list) · **Auto-generate: EASY for the ones sourced from your OWN frontmatter (nursing/MBA rank + tuition tables), HARD for anything requiring a fresh external ranking. Never let the model invent or reorder a ranking.**

---

## 3. Factual-accuracy design — how to auto-generate without hallucinating

The current fact-gate is a **preservation** gate, not a **truth** gate. It guarantees the enhancement rewrite doesn't *lose or invent* number tokens or drop Latin proper nouns relative to the original DOCX/draft — it does nothing to verify the draft's facts were right in the first place. So the design principle is: **facts must be correct at the source (the draft), and the gate keeps them intact through enhancement.** Push accuracy upstream, into a grounding dataset the drafts are built from.

**Ground on a structured data layer, not the model's memory.** Extend the existing `scripts/lib/university-list.json` into a per-entity facts table that convert reads from, so every number on the page traces to a row you control:

- **School facts** (per BSN/MBA/편입 school): tuition (with year stamp), TOEFL/IELTS min, U.S. News rank + year, deadlines, STEM-designation flag, ASSIST/TAG eligibility, pathway-program flag. You already store rank/tuition in frontmatter — promote these into the data file as the single source of truth.
- **Immigration facts table** (one shared file, most volatile): SEVIS $350, MRV $185/$205, H-1B cap 85,000 (20k+65k), the $100k fee + F-1 exemption, STEM OPT +24mo, current Visa Bulletin dates. This is the file the monthly 문호 job and the annual visa-fee refresh both read. **Everything with a `(2026)` token in a title reads its numbers from here.**
- **Ranking datasets:** U.S. News BSN/MBA (you own it in frontmatter), BLS OEWS for RN salary. Listicles assemble rows from these — the model writes prose *around* fixed rows, never generates the rows.

**How the two gates apply:** the pipeline stays convert (build draft *from the data table*, so numbers are correct by construction) → `/enhance-guides` (Korean human-tone rewrite + judge) → `check-facts.js` (pins every number + proper noun through the rewrite, ±40% length, matching H2/H3). Add one upstream check to `check-facts.js` or convert: **assert every number token in a draft exists in the grounding table** (reject "orphan facts" the model introduced that don't trace to data). That converts the preservation gate into a light truth gate at near-zero cost.

**Risk tiers — what NOT to fully automate:**
- **RED (human-verify every cycle, never fully auto):** the SAT test-required/optional school roster (#27), the H-1B $100k-fee explainer (#5), any Visa Bulletin date (#7), 조건부 입학 school eligibility (A3), STEM-designation status per program (A2). These are YMYL + fast-moving + high-consequence-if-wrong. Pipeline generates the *draft and prose*; a human confirms the roster/figures before `ready`.
- **YELLOW (auto with grounded data + disclaimer):** all 비자·이민 guides, NCLEX/CGFNS fees, GMAT averages, tuition figures, ASSIST/TAG specifics. Auto-generate but read from the facts table and stamp "마지막 업데이트: YYYY-MM."
- **GREEN (safe to auto at volume):** process/how-to/emotional guides (SOP writing, 30대 유학, essay guides, interview-question narratives, the funnel-route pillar), and listicles sourced from your own frontmatter (nursing/MBA rank tables). No volatile external facts.

Every YMYL page (all 비자·이민, all 간호 licensure, 편입 credit) needs a standing disclaimer block ("개인 상황에 따라 다르며, 이민 변호사/전문가 상담 권장") + consult CTA — protects ranking (E-A-T) and converts.

---

## 4. Naver-specific playbook — top 5 concrete actions

1. **Register + verify onevisionconsulting.us in 네이버 서치어드바이저, and wire sitemap.xml + RSS auto-resubmission into the publish batch.** Nothing external ranks on Naver until indexed (~14–16 day initial crawl); RSS pings fastest for new posts. Your `verification.naverSiteVerification` field is currently empty and `build.js` already generates sitemap/rss — close this loop first. Call 웹페이지 수집 (request indexing) per new URL each batch.

2. **Run the Naver 카페/블로그 bridge as a required distribution step, not an afterthought.** You already have `cafe.naver.com/onevisionconsulting` and `blog.naver.com/onevision_consulting` (in `sameAs`). For every external guide, publish a condensed, experience-rich native Naver post targeting one 스마트블록 subtopic, with "전체 가이드 보기 →" linking to the external page. Do NOT duplicate full text (dilutes both). Treat these links as a traffic/brand channel — they're `nofollow`, no backlink authority.

3. **Mine 스마트블록 subtopics before generating each guide, and make them the H2/H3 skeleton.** Search the target keyword on Naver, read the auto-generated block subtopics — those *are* the real user intents. Feed them into convert as the section outline so the page maps to how Naver clusters that query. This is a cheap pipeline input that materially raises top-block placement.

4. **Give every guide a strong keyword-relevant 대표 이미지 and lead with a "후기/사례/현실" experiential block + a numbered 체크리스트.** Naver's D.I.A.+ pulls the feature image into the SERP snippet and rewards first-hand 경험; blog/카페 blocks favor narrative + checklist over pure explainer. Your `scripts/lib/images.js` already handles images — enforce a unique, on-topic 대표 이미지 per page as a gate.

5. **Silo content into tight topical hubs so C-Rank reads OneVision as a focused authority per topic, not a diffuse site.** Build the four hubs (신입학 / 편입학 / 대학원 / 이민·비자); each links down to its school guides and spokes, and they link back up (8–15 internal links/guide). A site spanning nursing+MBA+visa reads as topically diffuse to C-Rank unless siloed — the hub structure fixes this and simultaneously gives Google the topical authority its helpful-content system rewards. Stamp year + semester into titles ("2027 가을학기…") and refresh annually; Naver rewards freshness and competitors rank partly on it.

---

## 5. Suggested cadence & pipeline fit

The existing loop is unchanged: **drop source → `npm run convert` → `/enhance-guides` (rewrite + fact gate + judge → `ready`) → Monday 09:00 KST GitHub Action drips `dripRate` (20) posts → build → FTPS deploy.** Everything below plugs into that without new infrastructure. First, add `column` sub-categories or new categories to `site.config.json` so hubs/spokes get proper section labels and URLs.

**Config prep (one-time):** add hub categories to `site.config.json.categories` (e.g. `visa`, `grad`, `transfer`, `nursing-guide`) or route all thematic pages through `column` with a sub-tag; wire `naverSiteVerification`; add the immigration facts table under `scripts/lib/`.

**Sequencing against the seasonal calendar (front-load, don't dump all at once):**
- **Now → Q3 (Jul–Sep):** 비자·이민 cluster (B #1–8) + STEM-OPT — evergreen, highest ROI, immediately relevant, and it's the differentiator. Also the test-prep/GRE/GMAT guides (B #12–13), which peak in Korean search May–Sep.
- **Late summer → fall:** SOP/에세이/추천서 (#15, #25) — peaks Jul–Oct as applicants write essays.
- **Nov–Jan:** deadline checklists, DS-160/F-1 procedure (#4), 미국 대학 지원 일정 (#26).
- **Jan–Mar:** 합격 후 F-1 visa + interview (#3) content — hands the funnel from admissions into immigration.
- **Apr–Jun (next cycle):** school-research + ranking listicles (Pillar C) + 편입 school set (A1) — matches when Korean searchers do school selection.

**Drip math:** at 20/week the ~30 thematic guides (Pillar B+C) fit in ~2 weeks of queue but should be *paced* onto the seasonal calendar, not dumped — spread them so Naver sees steady fresh publishing (a freshness signal) rather than one spike. Reserve most of each week's 20 for the A1 편입 school set (large long-tail footprint) and interleave 2–4 thematic guides per week so both engines see topical hubs filling in alongside the matrix.

**Two recurring automated assets (highest pipeline leverage, unique to your setup):**
- **Monthly 문호 page (#7):** a `cron`/scheduled convert job reads the immigration facts table's updated Visa Bulletin dates, regenerates "미국 영주권 문호 분석 (N월)", runs it through enhance + gate, ships on the next drip. Proven recurring-traffic pattern (law firms do this manually) — your pipeline does it cheaply. Ideal candidate for a scheduled task.
- **Annual refresh sweep:** re-stamp year tokens in titles ("2026 → 2027"), re-pull the RED-tier rosters (SAT test-policy, visa fees), regenerate, human-verify, republish. Freshness is the moat against stale 유학원/law-firm posts — bake "마지막 업데이트: YYYY-MM" into every dated guide so the refresh is visible to both engines.

**Pipeline additions to make, in priority order:** (1) immigration/school facts table + orphan-fact assertion in convert/`check-facts.js`; (2) RED-tier human-verify checkpoint before `ready` (a status like `needs-review` between draft and ready for RED topics); (3) auto sitemap/RSS resubmission + Naver 수집 request in the publish step; (4) enforce unique 대표 이미지 + ≥500 unique-word / ≤40%-template gates already implied by `/enhance-guides`; (5) 스마트블록-subtopic outline as a convert input.

---

**Files referenced:** `C:\Users\pc\Desktop\OneVision Website\scripts\check-facts.js` (fact-preservation gate), `C:\Users\pc\Desktop\OneVision Website\site.config.json` (category + verification config to extend), `C:\Users\pc\Desktop\OneVision Website\scripts\lib\university-list.json` (per-school data model to promote into a grounding table), `C:\Users\pc\Desktop\OneVision Website\scripts\lib\images.js` (대표 이미지 handling), `README.md` (convert→enhance→publish contract + weekly drip).
