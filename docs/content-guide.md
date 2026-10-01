# Content and data guide

How OneVision pages should present numbers and copy so they read as written by
people who know the subject, not generated. Written 2026-09-28 after the CEO and
the site owner said the data sections felt "AI-like" and the charts had "no
axes, no data". Colour was not the problem; content was.

## 1. What makes a page read as AI-made

Several of these together are the tell. One on its own is fine.

**Copy (English)**
- Em dashes everywhere, "not just X, but Y" / "It's not X. It's Y." pairs,
  lists that always come in threes, a recap sentence closing every section.
- Buzzwords and puffery: seamless, empower, unlock, leverage, robust,
  best-in-class, "at the intersection of", "in today's fast-paced world".
- Hedging ("may help you", "can potentially"), vague attribution ("experts
  say", "studies show") with no source.
- Every card the same length, often exactly two sentences.

**Copy (Korean)**
- "A가 아니라 B입니다" 구조의 반복 ("단순 과외가 아니라...", "‘서류상 좋은 선택’이 아니라...").
- 강조용 따옴표 남발 (“데이터”, “계산 가능한 전략”, “살린” 케이스), 화살표(→) 나열.
- 넓고 추상적인 단어: 체계적, 맞춤형, 최적화, 한눈에, 한 번에, 효율, 강화, 활용.
- 영어와 한국어를 섞은 소제목 (State Data Board, Motion 데이터 표).
- 모든 문장이 반듯하고 길이가 비슷함. 구체적인 사례, 이름, 날짜가 없음.

**Design**
- Count-up numbers, "shine" sweeps, and animated charts that re-draw for no
  reason. Motion should carry information or be absent.
- Rows of identical KPI tiles and three-card grids repeated section after
  section. Uniform padding, radius and card height everywhere.
- Donut, gauge and sparkline widgets with no scale, no benchmark and no time
  frame.
- Emoji as icons, generic testimonials, stock imagery in place of real photos.

Sources: [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing),
[925 Studios: AI slop web design](https://www.925studios.co/blog/ai-slop-web-design-guide),
[Sikora: 10 signs a website was built by AI](https://sikora.software/blog/ai-website-design),
[AIToolPick: 30-point checklist](https://aitoolpick.org/blog/ai-generated-website-checklist/),
[firstcall-web: 5 AI sentence patterns](https://firstcall-web.com/5-sentence-patterns-that-make-ai-copy-instantly-recognizable-in-order-of-annoyance/),
[국민일보: AI 생성 댓글의 말투](https://www.kmib.co.kr/article/view.asp?arcid=1750668896),
[브런치: AI 말투를 따라하면 생기는 일](https://brunch.co.kr/@bbt/108).

## 2. How people who present data well do it

1. **Every number is real and checkable.** It has a unit, a date or period, a
   definition, and a source (or, for OneVision's own results, the count behind
   it: "2024–2026 편입 지원 23명 중 19명 합격").
2. **The chart title states the finding**, as a sentence: "같은 주립대라도 거주민
   등록금은 비거주민의 3분의 1이 안 됩니다", not "도시별 체감 비용".
3. **Axes with units, values labelled on or next to the bars**, a source line
   under the chart.
4. **Context**: a comparison or benchmark (another state, the U.S. average,
   last year). A lone number is not information.
5. **A table when there are only a few exact numbers.** Charts are for
   comparison and trend; tables are for exact values. Don't draw what a table
   says better.
6. **One message per chart, no decoration.** No gauges, donuts or sparklines
   unless they have a scale and a reason. No "relative index" percentages.
7. **Current.** State the academic or tax year. Check it again before each
   season.

Sources: [Tufte's data-ink and chartjunk principles](https://jtr13.github.io/cc19/tuftes-principles-of-data-ink.html),
[Stephen Few, Common pitfalls in dashboard design](https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf),
[Datawrapper: text in data visualizations](https://www.datawrapper.de/blog/text-in-data-visualizations),
[GWU Libraries: data visualization best practices](https://libguides.gwu.edu/dataviz/best_practices),
[Versta Research: try tables instead of charts](https://verstaresearch.com/blog/try-using-tables-instead-of-charts/),
[NN/g: trustworthiness in web design](https://www.nngroup.com/articles/trustworthy-design/).

## 3. Why invented numbers are also a legal risk

- Korea: on 2025-02-03 the Fair Trade Commission fined 공단기 (ST Unitas)
  109 million won under the 표시광고법 for advertising a "합격률 80%" that was
  really 49–66%. A qualifier added in small grey text did not help; the FTC
  called it deceptive. ([경향신문](https://www.khan.co.kr/article/202502032032005))
- U.S.: the FTC requires a reasonable basis for any objective claim before it
  is published, and statistics in ads must be backed by the data they cite.
  ([FTC Advertising FAQ](https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business))

OneVision's pages currently show pass and success rates (92%, 88%, 90%, 84%)
and outcome figures, several labelled 예시 in small text. That is the pattern
the FTC sanctioned.

## 4. Audit of the data sections (2026-09-28)

| Page | What it shows now | Problem | Replace with |
|---|---|---|---|
| immigration | 생활비 지수(상대) 90% etc., line chart with no axes, "상담 가정의 72%", spark bars | invented indices, chart without scale | **Done (prototype):** 2026–27 tuition, resident vs nonresident, chart with axis and sources; tax and rent table from Tax Foundation and Census ACS 2024 |
| index, admissions | 92% 목표 대학 합격률, 88% 편입 성공률, 300+ 세션, 120+ 학생, 68% / 32% / 76% (예시) | unverified success rates, some marked 예시 | real counts with period and definition from OneVision's records, or remove. Verifiable facts instead: number of published admit stories, schools admitted to, years in operation, team |
| transfer | 88% 성공률, 2.2배 리스크 감소, +0.38 GPA, readiness bars 86/72/64/78, case "54% → 100%" | invented; also treats IGETC as current | public UC transfer admit rates by campus, TAG campuses, and the fact that **Cal-GETC replaced IGETC for students starting community college from fall 2025**; keep the case study only if it is a real (anonymised) student |
| freshman | readiness bars 78/64/52/46, 70% donut, 12-week sparkline, tier × fit scoreboard | describes no real student | a real grade-by-grade timeline and application deadlines (UC Nov 30, EA/ED Nov 1, RD Jan), a sample of what the family receives |
| graduate | readiness 84/72/86/64, 81% | same | the actual application calendar (most PhD deadlines Dec 1–15), what OneVision delivers each week |
| coaching | 87/92/78%, 90/75/82%, −60% / +45% / +70% 멘탈 안정도 / +35% | unmeasurable claims | a sample week and a sample weekly report to parents; real before/after only with the student count behind it |
| housing | qualitative table (Texas / Indiana / Wisconsin) | no numbers | same approach as immigration if kept |

## 5. Rules for new content

- No number without a source, a period and a unit. OneVision's own results
  need the count (n) and the years.
- Never mark something 예시 and show it as a result. If it's an example, say
  what it is an example of ("학생 A의 12학년 9월 체크리스트 예시").
- Chart title = the finding. Axis, units, source line, as-of date.
- Prefer a table for a handful of exact figures.
- No count-up or re-drawing animations on data.
- House style still applies: no em dashes or middle dots, light bold.

## 6. Site structure criteria (2026-09-28)

Built from the team's competitor research (14 Korean study-abroad and
admissions sites, `원비전 유학원_어학원 웹사이트 중심 리서치 정리.xlsx`) and the
sources above. What the research showed:

- Most competitors leave out the specifics parents compare: program length,
  meeting frequency, how many schools, cost, contact hours. Stating them is the
  easiest way to stand out.
- Almost every site has an FAQ and a consultation booking flow.
- Strong sites show real results and consultant credentials, sample work and
  a clear schedule; weak ones have outdated pages, confusing navigation,
  text inside images and obviously AI-written copy.

Rules for OneVision pages:

1. **A program page answers, in order:** who it is for, what we do, how it
   runs (length, how often, channel), how pricing works, who does it, real
   results or sourced data, and how to book.
2. **One page, one job.** A section that repeats another section is cut. The
   5-step process lives on the About page only.
3. **Trust from real things.** Named people with credentials, admit stories
   that link to a full story, dated and sourced numbers. No placeholders
   ("추후 업데이트", "예시", "Consultant A"), no decorative stock-photo sections.
4. **Six or fewer sections per page**, one primary action (상담 예약).
5. **Plain copy.** Section 1's list applies to every heading and paragraph.
6. **One-stop is part of the offer.** Home, About, First-year, Transfer,
   Graduate and Immigration pages show the path OneVision (admissions) →
   KL Legal Services (visa, green card) → EZ이민 (EB-3). Legal work is done by
   the law firm; say so.

Applied on 2026-09-28: removed the generic process strips (home, first-year),
the stock gallery (programs), the 4/8/12-week section that repeated the
packages (coaching), the qualitative state cards that repeated the sourced
table (immigration), the value cards (about), the placeholder profile blocks
(Yun Lee), and rewrote 67 sentences that used the patterns in section 1.

Still to add when the information exists: contact hours, consultation
format and length, a price range or how pricing is decided, CPA profile
details (requested from Yun Lee).

## 7. Partner content (2026-09-30)

The CEO asked for more of iminstory.com (KL Legal Services) and ezimmin.com
(EZ이민) on the site. Rule used: keep only what a OneVision family needs to
decide or to make contact, and check every rule or number against the
government or university source before using it.

Taken, on immigration.html#partners:
- Five family situations with the matching path (OPT to H-1B to EB-2/EB-3,
  EB-2 NIW/EB-1, EB-3 for a parent, E-2, EB-5), one line on requirements and
  who handles it.
- Two facts parents must check first: green cards cover unmarried children
  under 21 (CSPA protects part of the processing time), and UC resident tuition
  for permanent residents and some visa holders such as E-2 after a year in
  California. Sources: USCIS, UC residence rules.
- Contacts and how consultations work: KL is in person or by phone, booked
  online with a consultation fee; EZ이민 has U.S. and Seoul offices.
- EZ이민's EB-3 steps and example employer types from its public list.
- 최경규's English name is Kyunggu Choi (signed that way on the firm's English
  page).

Left out: welcome and mission copy, client testimonials, approval-rate and
"guaranteed" claims, the firm's business and family law practice, the
half-price document service, blog teasers, and EZ이민's statement that a
parent of a minor F-1 student may get an F-2 visa (F-2 is for the student's
spouse and children, not parents).
