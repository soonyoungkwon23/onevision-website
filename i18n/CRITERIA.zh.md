# OneVision Simplified Chinese translation criteria

The standard every Korean → Simplified Chinese translation on
onevisionconsulting.us is written and judged against. Translators follow
Part A, reviewers score against Part B, and `node scripts/i18n/check-zh.js`
enforces the mechanical rules. The site owner does not read Chinese, so these
rules have to carry the judgment a native editor would otherwise bring.

Style rules marked (research) come from the research notes in
`i18n/zh-style-notes.md`, which give the sources and more examples.

## Who reads the Chinese version

Chinese-speaking parents (mainland China first, and Chinese families in the
U.S.) deciding whether to hire OneVision for a child's U.S. admissions,
community-college transfer, graduate school or immigration plan. Some readers
are the students themselves.

They must come away with **the same facts, the same offer and the same next
step** as a Korean parent reading the Korean page. Natural Chinese is the
second requirement, never a reason to change what the page says.

---

## Part A. How to translate

### A1. Translate the Korean, sentence by sentence

- The **Korean** text (`key`) is the source. The English (`en`) in each work
  item is a reviewed translation of the same sentence: use it to confirm
  meaning, never as the text to translate, and never copy its sentence shape.
- Carry every unit of meaning. **Add nothing, drop nothing**: no adjectives,
  promises or sales language the Korean lacks; keep every hedge and condition
  (보통 → 通常, 일부 → 部分, ~할 수 있습니다 → 可以/可能, 대부분 → 大多数).
- Reorder, split and join clauses as Chinese grammar requires. Korean puts
  long modifiers before the noun; Chinese usually should not (see A4).
- Korean often omits the subject. Supply 我们 (OneVision), 您 (the parent) or
  学生 only where Chinese needs one; Chinese also omits subjects freely.
- Honorific endings (님, 드립니다, 주세요) carry politeness, not words. Use 您
  where a pronoun is needed and 请 for requests, and nothing more.

### A2. Direction and keep

- Korean source (`src: "ko"`): translate into Simplified Chinese.
- English-only source (`src: "en"`): translate it if it is ordinary words
  (a button, a label). If it is only proper nouns that stay the same in every
  language (a school name in a logo block, a program name such as
  Application Atelier, a person's English name, KakaoTalk, an address in the
  U.S.), set `"action": "keep"` and repeat the source exactly.

### A3. Names

- People: a name already written in Latin letters stays in Latin letters
  (Jay Choi, Sarah Lee). A name written in both forms, such as
  "윤지용 (Lance Yoon)", stays exactly as written. A Hangul-only name that has
  an English form elsewhere on the site uses that English form, as the English
  site does (김동현 → Donghyun Kim, 최경규 → Kyunggu Choi; both are glossary
  terms). Any other Hangul-only name stays in Hangul (it is on the glossary
  keep list). Never invent Chinese characters for a Korean name, and never
  use a middle dot to join name parts.
- Universities and organizations: use the standard mainland Chinese name from
  `i18n/glossary.zh.json` (加州大学伯克利分校, 哥伦比亚大学). Where the Korean
  page itself writes a school name in English (logo blocks, card headers),
  keep the English. An organization with no Chinese or official English name
  keeps the form the English site uses (often Hangul).
- Programs and products: OneVision program names (Future Scholars,
  Application Atelier, Transfer Intensive, Academic Coaching & Study Lab,
  Immigration & Housing Family Session) stay in English. Tests, platforms and
  forms keep their Latin names (SAT, AP, GPA, Common App, FAFSA, CSS Profile,
  OPT, H-1B, I-20, EB-3); add a Chinese gloss only where the glossary says so.
- Brand: 원비전 / 원비전 컨설팅 → OneVision / OneVision Consulting.
- Korea-specific terms (수능, 내신, 특목고, 카카오톡, 네이버 카페, Korean
  addresses) follow `i18n/glossary.zh.json`. KakaoTalk and Naver keep their
  Latin brand names.

### A4. Markers, numbers and data

- `<t1>...</t1>` and `<t2/>` stand for inline HTML (bold, links, line
  breaks). Every marker in the source appears in the target exactly once,
  correctly nested, wrapping the equivalent Chinese words. Never add, drop,
  renumber or merge them.
- Every number stays in Arabic digits, exactly: prices, percentages, years,
  grades, counts, phone numbers, dates. 11월 30일 → 11月30日; 8–11학년 →
  8–11年级. Do not convert currencies or units. Do not write numbers as
  Chinese numerals (三个 → 3个) when the source has digits.
- Keep URLs, email addresses and `${...}` expressions character for
  character. In a `js` segment translate only the human-readable text.

### A5. House style, punctuation, spacing, numbers

- No em dash: never ——, never —. Use a comma, colon, full stop or
  parentheses. No middle dot (·): keep people's names in Latin letters, and
  where a school's standard Chinese name contains ·, use its English name.
- No exclamation marks (！), no emoji, no added bold or emphasis.
- Full-width punctuation in Chinese sentences: ，。、；：？（）“”. Mainland
  quotes are “ ”, not 「」. Ellipsis is ……. Lists of two or three items inside
  a sentence take 、; four or more become a bullet list if the markup allows.
- Korean writes lists with slashes (유학/편입/이민). Chinese uses 、 or 和.
- **Spacing (decided 2026-10-16):** a half-width space between Chinese and
  Latin letters or codes (`F-1 签证`, `OneVision 的顾问`, `GPA 3.0`), and no
  space between Chinese and plain numbers (`12个月`, `11月30日`,
  `15,588美元`, `2026年`). No space next to full-width punctuation.
- Numbers: Arabic digits, thousands separators for 1,000 and up
  (15,588美元), never in years. Money in running text: `15,588美元`; tables
  may keep `$15,588` if the Korean table does. Dates `2026年11月30日`,
  `11月30日`. Academic year: `2026-2027学年` (write the second year in full;
  set `numbers_ok` because the Korean writes 2026–27). Ranges in sentences use
  至 (3至5所, 8至11年级); tables and chart labels may keep the source's –.
  Scores: `托福100分` becomes `TOEFL 100分` because test names stay Latin;
  `GPA 3.0（满分4.0）`. Measure words: 位 for people, 所 for schools, 份 for
  documents, 封 for letters, 篇 for essays, 门 for courses.

### A6. Register and voice (research)

- **Plain service register.** Write as a careful consultant explaining things
  to a parent across a desk: facts in the order the parent needs them, no
  sales tone. Chinese readers spot "AI味" as correct-but-empty sentences,
  stock openers and closers, stacked four-character phrases and jargon.
- **您, sparingly.** Address parents as 您, never 你 (except 你们 inside an
  FAQ question in the parent's own voice). Drop 您 wherever the sentence is
  clear without it; at most one per short paragraph. Never 您们.
- **The child** is 孩子 in parent-facing copy, 学生 when describing
  requirements or process, 子女 in immigration-law contexts. The firm is 我们
  or OneVision, never 本公司/我司.
- **Short sentences, one point each:** 15 to 30 characters, hard cap 40.
  Paragraphs of at most three sentences.
- **Verbs, not nouns.** 进行评估 → 评估; 作出决定 → 决定; 提供帮助 → 帮.
  Cut preposition shells (作为, 关于, 对于…来说, 在…方面, 通过, 基于, 随着)
  and put the real subject first. Keep one half of 因为…所以 / 如果…那么 /
  虽然…但是 at most. Active voice, except set phrases (被录取, 被拒签).
- **No padding:** 相关, 有关, 方面, 情况, 问题 (费用问题), 一个, 一定的, 非常,
  能够 → 能, 将会 → 会. Name the thing instead of 相关材料.
- **No empty praise.** 专业, 优质, 高效, 贴心, 资深, 经验丰富, 全面, 个性化
  only with the fact behind them in the same sentence, and only if the Korean
  says it. Never add them.
- **Never** promise or imply an outcome (保录取, 包过, 圆梦, 直通车), never
  use luxury or urgency wording (尊享, 专属, 名额有限, 立即预约), never open
  with a grand frame (随着…不断发展, 在当今时代) or close with a slogan
  (总而言之, 让我们…). `i18n/glossary.zh.json` lists them; the checker fails
  them.
- **一站式** at most once per page, immediately followed by what it means
  (升学和移民可以在同一处咨询).
- **Headings and labels** are short noun phrases matching the menu (关于我们,
  美国本科申请, 转学申请, 研究生申请, 常见问题). Buttons are 2 to 6
  characters, verb first, no punctuation: 预约咨询, 预约免费咨询, 联系我们,
  了解详情, 进一步了解, 提交. Not 立即/马上/点击.
- **FAQ:** the question in the parent's words, ending in ？; the answer opens
  with the answer (能/不能/需要/一般…), then at most two sentences.
- **Korean-source traps:** 진행하다 is not 进行; ~에 대해 is not 关于; ~을
  통해 is not 通过; ~들 is not 们; chains of ~의 are not chains of 的. False
  friends: 상담 → 咨询, 합격 → 录取, 입학사정관 → 招生官, 학부모 → 家长,
  유학원 → 留学机构, 영주권 → 绿卡.
- **Do not over-correct.** Passive voice, varied sentence length and real
  sequences (第一步, 首先 in actual steps) are fine where the content needs
  them. The aim is plain Chinese, not a different text.

### A7. When the source is wrong

Translate what is there and report it in your notes as a source issue (a
typo, a placeholder, an inconsistency). Never fix the source silently.

### A8. Work files

`node scripts/i18n/prepare-zh.js` writes `i18n/work/zh/in/b<N>-p<M>.json`.
Each segment has `id`, `src` (ko or en), `key` (the source text), `en` (the
reviewed English, for meaning only), `kinds`, `markers`, `appears_on` and
`context` (page, element, CSS class, section heading).

Write the same file name to `i18n/work/zh/out/`:

```json
{ "segments": [
  { "id": "a1b2c3d4e5", "action": "translate", "target": "…" },
  { "id": "f6a7b8c9d0", "action": "keep", "target": "<exact source>" },
  { "id": "0a1b2c3d4e", "action": "translate", "target": "…", "numbers_ok": "2026–27 written as 2026-2027" }
] }
```

Every input segment appears once. Then run
`node scripts/i18n/check-zh.js i18n/work/zh/out/b<N>-p<M>.json` until it
reports zero errors, and resolve warnings unless the source justifies them.
Record source issues and any term you had to decide that is not in the
glossary in `i18n/work/zh/review/b<N>-notes.md`.

---

## Part B. How to judge (reviewer rubric)

A segment passes when it has no Critical and no Major issue.

| # | Criterion | Severity | Fails when |
| --- | --- | --- | --- |
| C1 | Fidelity | Critical | Anything added to or missing from the Korean, including hedges, conditions and qualifiers. |
| C2 | Meaning in context | Critical | The Chinese says something different, or takes the wrong sense for this page and element (a button read as a heading, 합격 read as passing an exam). |
| C3 | Data and markers | Critical | A marker, number, URL, email, name or `${...}` is missing, changed or wraps the wrong words. |
| C4 | Terminology | Major | A glossary term is not used, a proper noun was translated, or one source term is rendered two ways. |
| C5 | Natural Chinese | Major | A mainland native reader would notice it was translated or machine-written: translationese, Korean word order, stock AI phrasing, wrong collocation, wrong register. |
| C6 | Concision | Major | Words that carry no meaning: padding, doubled verbs, stacked modifiers, filler openers, a longer phrase where a shorter one says the same. |
| C7 | Audience fit | Major | A Chinese parent would not get the same facts, offer and next step as the Korean reader, or a U.S. education or immigration term is not the one Chinese families and official Chinese sources use. |
| C8 | UI fit | Minor | A label or button is much longer than its siblings or not parallel with them. |
| C9 | Punctuation and house style | Minor | Western punctuation inside Chinese, ——, a middle dot, or added emphasis. |

### How to check fidelity without being fooled by fluency

Read the Chinese on its own and translate it back into Korean in your head.
Compare clause by clause with the source. Anything on only one side is an
addition or omission. Smooth Chinese that says a little more than the Korean
(an extra 专业, 全面, 一对一, 高效) is the most common failure.

### How to check naturalness

Ask of each sentence: would a careful mainland editor at a serious
publication, writing this from scratch for parents, write it this way? If a
shorter, plainer version says the same thing, use it. If the sentence would
only exist because it was translated, rewrite it.

### A batch is done when

- every segment passes Part B,
- `node scripts/i18n/check-zh.js` reports zero errors,
- and each page, read top to bottom in Chinese
  (`node scripts/i18n/page-view.js <page> --lang zh --target`), reads as one
  coherent page with the same term for the same thing throughout.
