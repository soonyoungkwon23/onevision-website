---
name: enhance-guides
description: Run the mandatory AI enhancement + evaluation layer over draft blog posts (content/guides/**, status draft) — Korean editorial rewrite for human tone, fact-preservation gate, LLM judge — and promote passing posts to status ready so the weekly publisher can pick them up. Use when the user asks to enhance guides, process the draft queue, or prepare posts for publishing.
---

# Enhance Guides — the mandatory quality gate

Every post must pass this layer before it can publish. `scripts/publish.js` only
publishes `status: ready`; this skill is the only thing that sets `ready`.

## Process (batch, parallel via the Workflow tool)

1. **Select** posts with `status: draft` from `content/guides/**/*.md` (batch of
   5–15; more only if the user asks). Interleave categories.
2. **Snapshot originals**: for each selected post, if
   `content/.originals/<category>/<slug>.md` does not exist, copy the draft
   there BEFORE any rewrite. Never overwrite an existing original.
3. **Rewrite** (one agent per post, parallel): apply the editorial rules below,
   editing the post file in place (body + front-matter `description` only).
4. **Fact gate** (deterministic): `node scripts/check-facts.js --all` (or pass
   the two files). Any FAIL → the rewrite agent (or a fresh one) revises with
   the failure list; max 2 retries, then revert the file from
   `content/.originals/` and flag it in the report.
5. **Judge** (one adversarial agent per post): given original + enhanced, score
   1–10 on (a) AI-tell removal / natural human editorial voice in Korean,
   (b) factual fidelity, (c) Korean fluency & consistent 존댓말 register,
   (d) structure preservation. Pass = every score ≥ 7 AND no fidelity issue.
   Below threshold → one revise loop, then revert + flag.
6. **Promote**: passing posts get `status: ready` and `enhancedDate: <today>`.
   Leave `order`, `publishDate` untouched.
7. **Report** to the user: per post — judge scores, notable changes, fact-gate
   result; plus the list of reverted/flagged posts.

## Editorial rewrite rules (Korean)

The writer persona: 미국 대학 입학 컨설팅 회사의 시니어 에디터. 10년차
컨설턴트가 학부모와 학생에게 직접 설명하듯, 정확하고 구체적으로.

**Hard constraints — violating any of these fails the gate:**
- 모든 숫자·금액·퍼센트·날짜·시험 점수는 원문 그대로 (표기 형식까지 동일하게:
  `$29,704`는 `$29,704`로, `98%`는 `98%`로).
- 모든 영문 고유명사(학교·프로그램·병원·기업·도시명)는 원문 표기 그대로.
- 새로운 사실·수치·사례를 지어내지 않는다. 원문에 없는 정보 추가 금지.
- 원문에 있는 사실을 삭제하지 않는다 (문장 재배치·통합은 가능, 정보 손실은 불가).
- 마크다운 구조 유지: `##`/`###` 제목의 개수·순서·의미 동일 (제목 문구는 다듬을
  수 있음), `<!--cta-->` 마커와 그 뒤 CTA 블록 유지.
- 전체 길이는 원문의 ±20% 이내. 존댓말(합니다체) 유지.

**What to actually change:**
- AI 티가 나는 패턴 제거: "첫째, … 둘째, … 셋째, …" 나열의 기계적 반복,
  "~는 다음과 같습니다", "~로 정리됩니다", "~라고 할 수 있습니다" 같은
  상투적 마무리, 모든 문단이 같은 길이·같은 리듬으로 끝나는 단조로움.
- 문장 리듬에 변화: 긴 설명 문장 사이에 짧은 문장. 단락 길이 다양화.
- 구체성 전진 배치: 핵심 수치(학비, 합격률, 연봉, 마감일)를 문단 뒤가 아니라
  앞으로. 독자가 스캔할 때 숫자가 먼저 보이게.
- 템플릿 보일러플레이트 제거: 106개 가이드가 같은 생성 템플릿에서 나왔기 때문에
  도입부·전환부 문형이 서로 겹친다. 이 포스트만의 표현으로 바꿔서 가이드 간
  중복 문구를 없앤다 (SEO 중복 콘텐츠 방지 — 다른 가이드와 문장이 겹치지 않게).
- 자연스러운 한국어: 번역투("~에 위치한", "~를 제공합니다"의 남발) 대신
  한국 교육 컨설팅 업계에서 실제 쓰는 표현.
- front-matter `description`: 검색 결과에서 클릭하고 싶어지는 문장으로 재작성
  (≤160자, 핵심 수치 1–2개 포함, 본문에 있는 사실만).

## After a batch

- `node scripts/build.js`가 통과하는지 확인 (구조 검증 겸용).
- `git add content && git commit` — 커밋 메시지에 배치 크기와 판정 요약.
- 사용자에게 스팟체크 리포트 전달.
