# OneVision translation criteria

This is the standard every Korean/English translation on onevisionconsulting.us
is written and judged against. Translators follow Part A. Reviewers score every
segment against Part B. `node scripts/i18n/check.js` enforces the mechanical
rules automatically.

## Who reads each language

- **Korean version:** Korean parents deciding whether to hire OneVision for their
  child's US admissions, transfer, graduate school, or immigration plan.
- **English version:** their children, who read English more comfortably than
  Korean, and English-first parents. Often high school or college students
  already in the US system.

Both readers must come away with **the same facts, the same offer, and the same
next step**. That is what "effective" means for this site. A translation that
reads beautifully but promises something the other language does not, or drops a
qualifier, has failed.

---

## Part A. How to translate

### A1. Faithful, sentence by sentence

Carry every unit of meaning in the source into the target. **Add nothing. Drop
nothing.** "Word for word" here means no embellishment and no summarizing. It
does not mean keeping Korean word order: Korean and English grammar differ, so
reorder clauses, change parts of speech, and split or join sentences only as far
as the target language requires to be correct and natural.

- Do not add adjectives, intensifiers, or sales language that the source lacks
  ("world-class", "premier", "best-in-class", "seamless", "unlock").
- Do not drop hedges, conditions, or qualifiers ("보통", "일부", "대부분", "~할 수
  있습니다", "usually", "may").
- Keep rhetorical questions as questions and quotations as quotations.
- Keep the source's level of certainty. "~하는 편입니다" is "tends to", not "is".
- Honorifics (님, 드립니다) have no English equivalent and are simply not
  translated. Do not invent "dear" or "kindly".
- Korean often omits the subject. Supply "we" (OneVision), "you" (the parent or
  student) or "students" from context, never a subject the source does not imply.

### A2. Direction

- Segment with Korean in it (`src: "ko"`): translate into English.
- Segment with no Korean (`src: "en"`): translate into Korean, **unless** it is
  only proper nouns that stay the same in both languages (a school name, a
  program name, a person's English name, "KakaoTalk"). Then set
  `"action": "keep"` and repeat the source exactly.

### A3. Register

- **English:** plain, professional American English. US spelling and US
  education vocabulary. No slang, no hype.
- **Korean:** 합니다체 for sentences, matching the rest of the site. Labels,
  buttons and headings stay as noun phrases, as Korean UI normally is.
- **Casing (English):** navigation, buttons, short labels and headings of eight
  words or fewer in Title Case. Anything that is a full sentence in sentence case.

### A4. Glossary and names

`i18n/glossary.json` is binding. Entries marked `strict` must be used exactly.
Program names, platform names, test names, university names and course titles
stay as written in both languages.

People's names:
- A name already written in both forms, such as "윤지용 (Lance Yoon)", stays
  exactly as written in both languages.
- A Korean-only name becomes the English name in the glossary on the English
  version.
- An English-only name (Jay Choi, Charlotte Choi, Sarah Lee) stays in English on
  the Korean version.

### A5. Markers, numbers and data

- `<t1>...</t1>` and `<t2/>` stand for inline HTML (bold, links, line breaks).
  Every marker in the source must appear in the target exactly once, correctly
  nested. Move them so they wrap the equivalent words in the target language.
  Never add, drop, renumber or merge them.
- Keep every number as digits, exactly: prices, percentages, years, grades,
  counts, phone numbers, dates. "8–11학년" is "grades 8–11", not "grades eight to
  eleven". Do not convert currencies or units.
- Keep URLs, email addresses and `${...}` template expressions character for
  character.
- A `js` segment is a JavaScript string. Translate only the human-readable text.
  Leave any HTML tags, attributes, `${...}` expressions, and punctuation that is
  part of code exactly as they are.

### A6. House style (both languages)

- No em dash (—) and no middle dot (·). Use a comma, colon, period or
  parentheses instead. En dashes in number ranges ("8–11") are fine.
- Do not add bold or emphasis. Emphasis only comes from markers that exist in the
  source.

### A7. When the source itself is wrong

Translate what is there and report it separately as a source issue: a typo, a
placeholder left in live copy, a wrong page title, a factual inconsistency.
Never silently fix the source in the translation.

---

## Part B. How to judge (reviewer rubric)

Score every segment. A segment **passes** when it has no Critical and no Major
issue.

| # | Criterion | Severity | Fails when |
| --- | --- | --- | --- |
| C1 | Fidelity | Critical | Anything in the target is not in the source (addition), or anything in the source is missing (omission), including hedges and qualifiers. |
| C2 | Meaning in context | Critical | The target says something different from the source, or picks the wrong sense for this page and this element (a button read as a heading, 합격 read as "passing a test"). |
| C3 | Data and markers | Critical | A marker, number, URL, email, name or `${...}` is missing, changed or moved to the wrong words. |
| C4 | Terminology | Major | A strict glossary term is not used, a proper noun was translated, or the same source term is translated two different ways. |
| C5 | Natural language | Major | A native reader would notice it was translated: wrong grammar, unnatural collocation, Korean word order carried into English, English sentence rhythm carried into Korean, wrong register. |
| C6 | Audience fit | Major | A Korean parent reading the Korean and a student reading the English would not get the same facts, offer and next step, or a US education term is not the one US schools actually use. |
| C7 | UI fit | Minor | A label or button is much longer than its siblings, breaks the casing rule, or is not parallel with sibling items in the same list. |
| C8 | House style | Minor | An em dash or middle dot appears, or emphasis was added. |

### How to check fidelity (C1) without being fooled by fluency

Read the target on its own and translate it back in your head into the source
language. Then compare that back-translation to the source, clause by clause.
Anything present on only one side is an addition or omission. Fluent English
that says slightly more than the Korean is the most common failure and the
easiest to miss, so look for it specifically.

### Effectiveness overall

A batch is effective when:
- every segment passes Part B,
- `node scripts/i18n/check.js` reports zero errors,
- and a page read top to bottom in the target language reads as one coherent
  page, with the same term used for the same thing throughout.
