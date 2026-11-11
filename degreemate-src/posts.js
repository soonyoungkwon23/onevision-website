// DegreeMate blog posts. build.js renders each one in Korean (blog/<slug>.html)
// and English (en/blog/<slug>.html).
//
// Following docs/reference-sites/reference-guide.md section 6: lead with
// how-to posts, use real <h2> headings (styled as blue bars), and end every
// post with the same CTA box (added by build.js, not written here).
// House style: no em dashes, no middle dots, light bold, no invented numbers.
"use strict";

module.exports = [
  {
    slug: "essay-outline",
    date: "2026-11-11",
    ko: {
      title: "영어 에세이 쓰는 법: 초안보다 한 줄 주장이 먼저",
      desc: "영어 에세이가 막막할 때 주장 한 줄과 개요부터 잡는 순서를 정리했습니다.",
      body: `
<p>영어 에세이 과제를 받으면 첫 문장을 고민하다가 시간을 다 쓰는 경우가 많습니다. 영어가 모국어가 아니면 더 그렇습니다. 그런데 막히는 이유는 영어 실력보다 쓸 내용이 아직 정리되지 않아서인 경우가 많습니다. 쓰기 전에 아래 순서로 정리해 보세요.</p>

<h2>1. 과제 안내문에서 동사부터 표시하기</h2>
<p>analyze, compare, argue, evaluate처럼 안내문에 나오는 동사가 무엇을 써야 하는지 알려 줍니다. compare라면 두 대상을 같은 기준으로 나란히 놓아야 하고, argue라면 한쪽 입장을 분명히 정해야 합니다. 분량, 인용 형식, 참고 자료 개수도 이때 같이 적어 두세요.</p>

<h2>2. 주장을 한 문장으로 쓰기</h2>
<p>영어 에세이의 중심은 thesis statement라고 부르는 한 문장입니다. 주제가 아니라 주장이어야 합니다.</p>
<div class="example">
  <p><span class="ex-label">주제</span>Remote work and productivity</p>
  <p><span class="ex-label">주장</span>Remote work raises productivity for routine tasks but lowers it for work that depends on quick feedback.</p>
</div>
<p>이 한 문장이 나오면 본문 문단은 모두 이 주장을 뒷받침하는 이유가 됩니다. 처음 쓴 문장은 나중에 고쳐도 됩니다.</p>

<h2>3. 문단마다 할 일을 정한 개요 만들기</h2>
<p>본문 문단 하나에는 이유 하나만 담습니다. 개요 단계에서는 완성된 문장 대신 메모로 충분합니다.</p>
<ul>
  <li>첫 문장(topic sentence): 이 문단에서 말할 이유를 한 줄로</li>
  <li>근거: 읽은 자료, 수업 내용, 예시</li>
  <li>설명: 그 근거가 왜 주장을 뒷받침하는지</li>
  <li>연결: 다음 문단으로 넘어가는 한 줄</li>
</ul>

<h2>4. 초안은 빠르게, 고치기는 천천히</h2>
<p>개요가 있으면 초안은 문법을 신경 쓰지 말고 끝까지 써 내려가는 게 좋습니다. 고칠 때는 큰 것부터 봅니다. 주장과 문단 순서가 맞는지 먼저 확인하고, 그다음에 문장과 단어를 다듬으세요. 소리 내어 읽으면 어색한 문장이 잘 들립니다.</p>

<h2>제출 전 점검표</h2>
<ul>
  <li>첫 문단 끝에 주장이 한 문장으로 들어가 있나요?</li>
  <li>문단마다 첫 문장만 이어 읽어도 흐름이 보이나요?</li>
  <li>인용한 자료마다 출처 표기가 있나요?</li>
  <li>안내문에 적힌 분량과 형식을 지켰나요?</li>
</ul>

<p>DegreeMate의 에세이 첨삭은 직접 쓴 초안에 문단별 코멘트와 수정 예시를 드리는 방식입니다. 글을 대신 써 드리지는 않습니다.</p>`,
    },
    en: {
      title: "How to write an English essay: one sentence before the first draft",
      desc: "When an English essay is hard to start, begin with a one-sentence argument and an outline. Here is the order we use.",
      body: `
<p>Many students spend most of their essay time stuck on the first sentence, especially when English isn't their first language. Usually the problem isn't the English. It's that what you want to say hasn't been sorted out yet. Before you write, work through these steps.</p>

<h2>1. Mark the verbs in the assignment brief</h2>
<p>Verbs like analyze, compare, argue and evaluate tell you what to write. Compare means putting two things side by side on the same criteria. Argue means picking a side and saying so. Note the length, citation style and number of sources while you're at it.</p>

<h2>2. Write your argument in one sentence</h2>
<p>The center of an English essay is the thesis statement. It has to be a claim, not a topic.</p>
<div class="example">
  <p><span class="ex-label">Topic</span>Remote work and productivity</p>
  <p><span class="ex-label">Thesis</span>Remote work raises productivity for routine tasks but lowers it for work that depends on quick feedback.</p>
</div>
<p>Once you have that sentence, every body paragraph becomes a reason that supports it. Your first version can change later.</p>

<h2>3. Give every paragraph one job</h2>
<p>Each body paragraph carries one reason. At the outline stage, notes are enough.</p>
<ul>
  <li>Topic sentence: the reason, in one line</li>
  <li>Evidence: readings, lecture material, examples</li>
  <li>Explanation: why the evidence supports your claim</li>
  <li>Link: one line that leads into the next paragraph</li>
</ul>

<h2>4. Draft fast, revise slowly</h2>
<p>With an outline in hand, write the draft straight through without stopping for grammar. When you revise, start with the big things. Check that the argument and the paragraph order hold up, then tidy sentences and word choice. Reading aloud makes awkward sentences easy to hear.</p>

<h2>Checklist before you submit</h2>
<ul>
  <li>Is your argument in one sentence at the end of the first paragraph?</li>
  <li>If you read only the first sentence of each paragraph, does the essay still make sense?</li>
  <li>Does every source you used have a citation?</li>
  <li>Did you meet the length and format in the brief?</li>
</ul>

<p>DegreeMate's essay feedback works on drafts you wrote yourself: comments on each paragraph and examples of how to revise. We don't write the essay for you.</p>`,
    },
  },
  {
    slug: "paraphrasing-citation",
    date: "2026-11-11",
    ko: {
      title: "패러프레이징과 출처 표기: 표절 걱정을 줄이는 연습",
      desc: "패러프레이징하는 순서와 APA, MLA 본문 인용 형식을 예시와 함께 정리했습니다.",
      body: `
<p>표절은 일부러 베끼는 경우보다, 자료를 읽고 비슷한 문장으로 옮겨 적다가 생기는 경우가 많습니다. 출처를 밝혀도 원문의 문장 구조를 거의 그대로 쓰면 문제가 될 수 있습니다. 그래서 패러프레이징과 출처 표기는 따로가 아니라 함께 연습해야 합니다.</p>

<h2>패러프레이징 순서</h2>
<ol>
  <li>원문을 읽고 핵심 내용을 이해합니다.</li>
  <li>원문을 덮고, 기억나는 내용을 자기 말로 씁니다.</li>
  <li>원문과 비교해 단어 몇 개만 바꾼 수준이라면 문장 구조부터 다시 씁니다.</li>
  <li>전문 용어처럼 바꿀 수 없는 표현은 그대로 두고 따옴표로 묶습니다.</li>
  <li>출처를 표기합니다. 자기 말로 바꿨어도 생각의 출처는 원저자입니다.</li>
</ol>

<h2>예시로 보기</h2>
<p>아래 원문과 출처는 설명을 위해 만든 예시입니다.</p>
<div class="example">
  <p><span class="ex-label">원문</span>Many first-year students find that managing their time is harder than the coursework itself.</p>
  <p><span class="ex-label">단어만 바꾼 경우</span>Lots of first-year students discover that handling their time is more difficult than the classwork itself.</p>
  <p><span class="ex-label">다시 쓴 경우</span>For many students in their first year, the hardest part of college is not the classes but organizing their own schedule (Kim, 2024).</p>
</div>
<p>두 번째 문장은 단어만 바뀌었고 구조가 원문과 같습니다. 세 번째 문장은 내용은 같지만 문장을 새로 짰고 출처도 달았습니다.</p>

<h2>본문 인용 형식 기본</h2>
<ul>
  <li>APA 7판: 저자 성과 연도를 씁니다. 예: (Kim, 2024). 직접 인용이면 쪽수까지 씁니다. 예: (Kim, 2024, p. 15)</li>
  <li>MLA 9판: 저자 성과 쪽수를 씁니다. 예: (Kim 15). 연도는 넣지 않습니다.</li>
  <li>어떤 형식을 쓸지는 과제 안내문이나 수업 계획서(syllabus)를 따릅니다.</li>
</ul>

<h2>자주 하는 실수</h2>
<ul>
  <li>참고 문헌 목록에는 있는데 본문에는 인용 표시가 없는 경우</li>
  <li>한 문단에서 같은 자료를 여러 번 쓰면서, 어디까지가 자료 내용인지 알 수 없게 쓴 경우</li>
  <li>한국어 자료를 영어로 옮겨 쓰고 출처를 달지 않은 경우. 번역해도 출처 표기는 필요합니다.</li>
</ul>

<p>DegreeMate에서는 직접 쓴 글을 보면서 출처 표기와 패러프레이징을 함께 연습합니다. 표절 검사를 피하는 방법은 알려 드리지 않습니다.</p>`,
    },
    en: {
      title: "Paraphrasing and citation: practice that takes the worry out of plagiarism",
      desc: "How to paraphrase step by step, plus the basics of APA and MLA in-text citation, with examples.",
      body: `
<p>Plagiarism happens less often through deliberate copying than through reading a source and writing down something too close to it. Even with a citation, keeping the original sentence structure can be a problem. That's why paraphrasing and citing are best practiced together.</p>

<h2>How to paraphrase</h2>
<ol>
  <li>Read the original until you understand the main point.</li>
  <li>Cover it, then write what you remember in your own words.</li>
  <li>Compare. If you've only swapped a few words, rewrite the sentence structure.</li>
  <li>Keep terms that can't be changed, such as technical terms, and put them in quotation marks.</li>
  <li>Cite the source. The idea still belongs to the author, even in your words.</li>
</ol>

<h2>An example</h2>
<p>The original sentence and source below are made up for illustration.</p>
<div class="example">
  <p><span class="ex-label">Original</span>Many first-year students find that managing their time is harder than the coursework itself.</p>
  <p><span class="ex-label">Words swapped</span>Lots of first-year students discover that handling their time is more difficult than the classwork itself.</p>
  <p><span class="ex-label">Rewritten</span>For many students in their first year, the hardest part of college is not the classes but organizing their own schedule (Kim, 2024).</p>
</div>
<p>The second sentence changes words but keeps the original structure. The third says the same thing in a new sentence and cites the source.</p>

<h2>In-text citation basics</h2>
<ul>
  <li>APA 7th edition: author's last name and year, for example (Kim, 2024). For a direct quote, add the page: (Kim, 2024, p. 15).</li>
  <li>MLA 9th edition: author's last name and page, for example (Kim 15). No year.</li>
  <li>Use whichever style your assignment brief or syllabus asks for.</li>
</ul>

<h2>Common mistakes</h2>
<ul>
  <li>A source in the reference list with no in-text citation</li>
  <li>Using one source several times in a paragraph without making clear where its ideas end and yours begin</li>
  <li>Translating a Korean source into English without citing it. Translated material still needs a citation.</li>
</ul>

<p>At DegreeMate we practice citation and paraphrasing on writing you've drafted yourself. We don't teach ways around plagiarism checkers.</p>`,
    },
  },
  {
    slug: "ai-tools-policy",
    date: "2026-11-11",
    ko: {
      title: "과제에 AI 써도 될까: 먼저 확인할 세 가지",
      desc: "ChatGPT 같은 AI 도구를 과제에 쓰기 전에 확인해야 할 수업 규정과 학교 규정을 정리했습니다.",
      body: `
<p>AI 도구를 과제에 써도 되는지는 학교와 수업마다 다릅니다. 같은 학교 안에서도 어떤 수업은 아이디어 정리에 쓰는 걸 허용하고, 어떤 수업은 전부 금지합니다. 모르고 썼다가 학업 윤리 위반으로 처리되면 되돌리기 어렵기 때문에, 쓰기 전에 아래 세 가지를 확인하세요.</p>

<h2>1. 수업 계획서와 과제 안내문</h2>
<p>가장 먼저 볼 곳입니다. syllabus에서 AI, generative AI, ChatGPT, academic integrity 같은 단어를 찾아보세요. 수업 전체 규정과 과제별 규정이 다를 수 있으니 둘 다 확인합니다.</p>

<h2>2. 학교의 학업 윤리 규정</h2>
<p>학교 웹사이트의 academic integrity 또는 honor code 페이지에 AI 관련 안내가 있는지 봅니다. 학교 전체 규정이 있더라도 실제 허용 범위는 수업마다 교수가 정하는 경우가 많습니다.</p>

<h2>3. 애매하면 교수에게 직접 묻기</h2>
<p>규정이 없거나 애매하면 쓰기 전에 이메일로 물어보는 게 가장 안전합니다. 무엇에 쓰려는지 구체적으로 적으면 답을 받기 쉽습니다.</p>
<div class="example">
  <p><span class="ex-label">이메일 예시</span>Dear Professor Lee, for the essay due next week, may I use an AI tool to check the grammar of a draft I wrote myself? I won't use it to generate any content. Thank you.</p>
</div>

<h2>허용된 경우에도 지킬 것</h2>
<ul>
  <li>어디에 어떻게 썼는지 기록해 두고, 요구하면 밝힙니다.</li>
  <li>AI가 알려 준 사실과 출처는 반드시 직접 확인합니다. 없는 자료를 만들어 내는 경우가 있습니다.</li>
  <li>제출하는 글의 생각과 문장은 본인 것이어야 합니다.</li>
</ul>

<p>DegreeMate는 AI 도구 사용을 학교 규정을 먼저 확인하고 안내합니다. 규정상 허용되지 않는 도움은 드리지 않습니다.</p>`,
    },
    en: {
      title: "Can I use AI on my assignment? Three things to check first",
      desc: "What to check in your syllabus and your school's rules before using ChatGPT or other AI tools on coursework.",
      body: `
<p>Whether you can use AI tools on an assignment depends on your school and your course. Within the same school, one course may allow AI for brainstorming while another bans it entirely. An academic-integrity finding is hard to undo, so check these three things before you use one.</p>

<h2>1. The syllabus and the assignment brief</h2>
<p>Start here. Search the syllabus for words like AI, generative AI, ChatGPT and academic integrity. The course-wide rule and the rule for a single assignment can differ, so check both.</p>

<h2>2. Your school's academic-integrity policy</h2>
<p>Look for AI guidance on your school's academic integrity or honor code page. Even where a school-wide policy exists, the instructor often decides what's allowed in each course.</p>

<h2>3. If it's unclear, ask your instructor</h2>
<p>If there's no rule or it's ambiguous, email before you use anything. Saying exactly what you want to use it for makes it easier to get a clear answer.</p>
<div class="example">
  <p><span class="ex-label">Sample email</span>Dear Professor Lee, for the essay due next week, may I use an AI tool to check the grammar of a draft I wrote myself? I won't use it to generate any content. Thank you.</p>
</div>

<h2>Even when it's allowed</h2>
<ul>
  <li>Keep a note of where and how you used it, and disclose it if asked.</li>
  <li>Check every fact and source an AI tool gives you. They sometimes invent sources.</li>
  <li>The ideas and sentences you submit need to be your own.</li>
</ul>

<p>At DegreeMate we check your school's rules before giving any guidance on AI tools, and we don't give help those rules don't allow.</p>`,
    },
  },
];
