// Builds the DegreeMate sub-site into public_html/degreemate/ (Korean) and
// public_html/degreemate/en/ (English). Run: node degreemate-src/build.js
//
// The generated HTML is committed, because the main CI build (scripts/build.js)
// only knows about OneVision's own pages. Edit copy and prices here, never in
// the output files.
"use strict";
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "public_html", "degreemate");
const ASSET_V = "20261101";
const PAGES = ["index", "services", "degree-plan", "pricing", "about", "faq", "contact"];

// All prices are placeholders until the CEO signs them off (see the planning
// doc). Change them here and the tables, catalog and calculator follow.
const PRICE = {
  ko: { tutor: 50000, tutor10: 450000, write: 60000, thesis: 400000, plan: 150000, coach: 120000 },
  en: { tutor: 50, tutor10: 450, write: 45, thesis: 320, plan: 120, coach: 90 },
};
const fmt = (lang, n) => (lang === "ko" ? n.toLocaleString("ko-KR") + "원" : "$" + n.toLocaleString("en-US"));
const man = (n) => (n % 10000 === 0 ? n / 10000 + "만 원" : n.toLocaleString("ko-KR") + "원");

const LOGO = `<svg viewBox="0 0 28 28" aria-hidden="true"><rect class="b" x="2" y="18" width="24" height="7" rx="1"/><rect class="b" x="5" y="10.5" width="18" height="6" rx="1"/><rect x="8.5" y="3.5" width="11" height="5.5" rx="1" fill="#e9de4f" stroke="#17221d" stroke-width="1.3"/></svg>`;
const FAVICON = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><rect x="2" y="18" width="24" height="7" rx="1" fill="#1f5641"/><rect x="5" y="10.5" width="18" height="6" rx="1" fill="#1f5641"/><rect x="8.5" y="3.5" width="11" height="5.5" rx="1" fill="#e9de4f" stroke="#17221d" stroke-width="1.3"/></svg>`);

const UI = {
  ko: {
    htmlLang: "ko",
    nav: { services: "서비스", "degree-plan": "졸업 설계", pricing: "가격", about: "소개", faq: "자주 묻는 질문" },
    cta: "무료 상담 신청",
    menu: "메뉴",
    preview: "미리보기 버전입니다. 가격과 세부 내용은 아직 확정 전이라 바뀔 수 있습니다.",
    footLine: "일하면서 학위를 마치는 분들을 위한 튜터링, 글쓰기 코칭, 졸업 설계.",
    footServices: "서비스",
    footCompany: "DegreeMate",
    footLinks: [["about.html", "소개"], ["about.html#integrity", "학업 윤리 원칙"], ["faq.html", "자주 묻는 질문"], ["contact.html", "상담 신청"]],
    legal: "DegreeMate는 원비전컨설팅(OneVision Consulting)의 계열 브랜드입니다. 사업자 정보는 정식 사이트 오픈 때 함께 안내됩니다.",
    ovLabel: "원비전컨설팅 홈페이지",
    other: "English",
    skip: "본문으로 건너뛰기",
  },
  en: {
    htmlLang: "en",
    nav: { services: "Services", "degree-plan": "Degree planning", pricing: "Pricing", about: "About", faq: "FAQ" },
    cta: "Book a free call",
    menu: "Menu",
    preview: "Preview version. Prices and details aren't final yet and may change.",
    footLine: "Tutoring, writing coaching and degree planning for people finishing a degree while working.",
    footServices: "Services",
    footCompany: "DegreeMate",
    footLinks: [["about.html", "About"], ["about.html#integrity", "Academic integrity"], ["faq.html", "FAQ"], ["contact.html", "Book a free call"]],
    legal: "DegreeMate is a brand of OneVision Consulting. Business registration details will be listed when the full site launches.",
    ovLabel: "OneVision Consulting",
    other: "한국어",
    skip: "Skip to content",
  },
};

// ---------------------------------------------------------------- services
function services(lang) {
  const p = PRICE[lang];
  if (lang === "ko")
    return [
      { id: "tutoring", name: "1:1 튜터링", tag: "경영, 회계, 통계, 간호, 컴퓨터, 심리 등", short: "막히는 개념을 짚고, 다음 수업 전까지 풀어야 할 문제를 같이 봅니다. 화상으로 진행하고 저녁과 주말도 됩니다.", price: `시간당 ${man(p.tutor)}`, from: "부터" },
      { id: "writing", name: "글쓰기 코칭과 첨삭", tag: "에세이, 리포트, 토론 게시글, 이메일", short: "직접 쓴 초안에 구조, 논리, 인용, 영어 표현 피드백을 남깁니다. 고쳐 쓰는 건 본인이 합니다.", price: `1,000단어당 ${man(p.write)}`, from: "부터" },
      { id: "thesis", name: "논문과 캡스톤 코칭", tag: "석사 논문, 캡스톤, 졸업 프로젝트", short: "주제를 정하는 단계부터 제출까지 일정을 잘게 나누고, 매주 진행 상황을 같이 점검합니다.", price: `월 ${man(p.thesis)}`, from: "부터" },
      { id: "planning", name: "졸업 경로 설계", tag: "편입, 학점 인정, 학점은행제", short: "가진 학점과 경력을 정리해서 가장 짧게 졸업하는 길을 찾고, 학교별 비교표로 정리해 드립니다.", price: `1회 ${man(p.plan)}`, from: "" },
      { id: "coaching", name: "학습 계획과 마감 관리", tag: "주간 계획, 중간 체크인", short: "매주 일정표를 같이 짜고, 중간에 메시지로 진행을 확인합니다. 혼자 하면 자꾸 미뤄지는 분께 맞습니다.", price: `월 ${man(p.coach)}`, from: "부터" },
    ];
  return [
    { id: "tutoring", name: "1:1 tutoring", tag: "Business, accounting, statistics, nursing, computing, psychology and more", short: "We go over the concept that's stuck and work through the problems you need before next class. Online, with evening and weekend slots.", price: `${fmt(lang, p.tutor)} / hour`, from: "from" },
    { id: "writing", name: "Writing coaching and feedback", tag: "Essays, reports, discussion posts, emails", short: "You send a draft you wrote. We comment on structure, argument, citations and English. You do the revising.", price: `${fmt(lang, p.write)} / 1,000 words`, from: "from" },
    { id: "thesis", name: "Thesis and capstone coaching", tag: "Master's thesis, capstone, final project", short: "We break the work into dated steps, from choosing a topic to submitting, and check progress with you every week.", price: `${fmt(lang, p.thesis)} / month`, from: "from" },
    { id: "planning", name: "Degree-completion planning", tag: "Transfer credit, credit by exam, Korean Credit Bank", short: "We sort through the credits and work experience you already have, find the shortest route to graduating, and lay the schools side by side.", price: `${fmt(lang, p.plan)} / session`, from: "" },
    { id: "coaching", name: "Study planning and check-ins", tag: "Weekly plan, mid-week check-in", short: "We set the week's schedule together and check in by message halfway through. Good if things keep slipping when you work alone.", price: `${fmt(lang, p.coach)} / month`, from: "from" },
  ];
}

// ------------------------------------------------------------------ shell
function shell(lang, page, title, desc, body) {
  const u = UI[lang];
  const base = lang === "ko" ? "" : "../";
  const self = `https://onevisionconsulting.us/degreemate/${lang === "ko" ? "" : "en/"}${page === "index" ? "" : page + ".html"}`;
  const ko = `https://onevisionconsulting.us/degreemate/${page === "index" ? "" : page + ".html"}`;
  const en = `https://onevisionconsulting.us/degreemate/en/${page === "index" ? "" : page + ".html"}`;
  const otherHref = (lang === "ko" ? "en/" : "../") + (page === "index" ? "./" : page + ".html");
  const nav = Object.entries(u.nav)
    .map(([k, v]) => `<a href="${k}.html"${k === page ? ' aria-current="page"' : ""}>${v}</a>`)
    .join("");
  const svcLinks = services(lang).map((s) => `<li><a href="services.html#${s.id}">${s.name}</a></li>`).join("");
  return `<!DOCTYPE html>
<html lang="${u.htmlLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${self}">
<link rel="alternate" hreflang="ko" href="${ko}">
<link rel="alternate" hreflang="en" href="${en}">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@500;600;700&family=Schibsted+Grotesk:wght@400;600&family=Gothic+A1:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}assets/dm.css?v=${ASSET_V}">
</head>
<body>
<a class="sr-only" href="#main">${u.skip}</a>
<div class="preview-bar">${u.preview}</div>
<header class="top">
  <div class="wrap">
    <a class="brand" href="./">${LOGO}DegreeMate</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="nav">${u.menu}</button>
    <nav class="nav" id="nav" aria-label="Main">${nav}<a class="btn" href="contact.html">${u.cta}</a></nav>
    <div class="lang"><span>${lang === "ko" ? "한국어" : "English"}</span><span class="sep"> / </span><a href="${otherHref}" hreflang="${lang === "ko" ? "en" : "ko"}" lang="${lang === "ko" ? "en" : "ko"}">${u.other}</a></div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap">
    <div>
      <a class="brand" href="./">${LOGO}DegreeMate</a>
      <p>${u.footLine}</p>
    </div>
    <div><h2>${u.footServices}</h2><ul>${svcLinks}</ul></div>
    <div><h2>${u.footCompany}</h2><ul>${u.footLinks.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}<li><a href="${lang === "ko" ? "/" : "/en/"}">${u.ovLabel}</a></li></ul></div>
    <p class="legal">${u.legal} © 2026 DegreeMate</p>
  </div>
</footer>
<script src="${base}assets/dm.js?v=${ASSET_V}"></script>
</body>
</html>
`;
}

const band = (lang) =>
  lang === "ko"
    ? `<section class="band"><div class="wrap"><div><h2>15분이면 남은 학기 계획의 첫 줄이 나옵니다.</h2><p>상담은 무료이고, 상담 후 바로 결제할 필요도 없습니다.</p></div><a class="btn" href="contact.html">무료 상담 신청</a></div></section>`
    : `<section class="band"><div class="wrap"><div><h2>Fifteen minutes is enough to sketch the rest of your degree.</h2><p>The call is free, and there's nothing to pay at the end of it.</p></div><a class="btn" href="contact.html">Book a free call</a></div></section>`;

const integrity = (lang) =>
  lang === "ko"
    ? `<div class="integrity">
  <div class="yes"><h3>하는 일</h3><ul>
    <li>개념을 설명하고 풀이 과정을 같이 따라가기</li>
    <li>직접 쓴 글에 피드백과 첨삭 남기기</li>
    <li>논문 일정을 나누고 매주 진행 점검하기</li>
    <li>학점 인정, 편입, 학교 비교 정리하기</li>
    <li>영어 발표, 면담, 이메일 연습하기</li>
  </ul></div>
  <div class="no"><h3>하지 않는 일</h3><ul>
    <li>과제, 에세이, 논문을 대신 써 주기</li>
    <li>시험이나 퀴즈 대리 응시</li>
    <li>온라인 수업 대리 수강</li>
    <li>표절 검사를 피하는 방법 알려 주기</li>
    <li>그 밖에 학교 규정이 금지하는 도움</li>
  </ul></div>
</div>`
    : `<div class="integrity">
  <div class="yes"><h3>What we do</h3><ul>
    <li>Explain concepts and work through problems with you</li>
    <li>Give feedback on writing you drafted yourself</li>
    <li>Break a thesis into steps and check progress weekly</li>
    <li>Sort out transfer credit and compare schools</li>
    <li>Practice presentations, office-hour talks and emails in English</li>
  </ul></div>
  <div class="no"><h3>What we don't do</h3><ul>
    <li>Write assignments, essays or theses for you</li>
    <li>Take exams or quizzes in your place</li>
    <li>Log in and attend online classes for you</li>
    <li>Show ways around plagiarism checks</li>
    <li>Anything else your school's rules forbid</li>
  </ul></div>
</div>`;

// ------------------------------------------------------------------ pages
function home(lang) {
  const svc = services(lang)
    .map(
      (s) => `<div class="catalog-row">
  <h3><a href="services.html#${s.id}">${s.name}</a><span class="tag">${s.tag}</span></h3>
  <p>${s.short}</p>
  <div class="price">${s.price}<small>${s.from ? (lang === "ko" ? "부터, 예상가" : "starting price, estimate") : lang === "ko" ? "예상가" : "estimate"}</small></div>
</div>`
    )
    .join("\n");
  if (lang === "ko")
    return shell(
      lang, "index",
      "DegreeMate | 일하면서 학위 마치기",
      "직장인과 바쁜 학생을 위한 1:1 튜터링, 글쓰기 코칭, 논문 일정 관리, 졸업 경로 설계. 한국어와 영어로 진행합니다.",
      `<section class="hero"><div class="wrap">
  <div>
    <h1>시작한 학위, 이번엔 끝까지.</h1>
    <p class="lede">일하면서 공부하느라 학기가 자꾸 밀린다면 남은 학점부터 같이 세어 봐요. 튜터링, 글쓰기 코칭, 논문 일정 관리, 졸업 경로 설계를 한국어와 영어로 도와드립니다.</p>
    <div class="actions"><a class="btn" href="contact.html">15분 무료 상담 신청</a><a class="btn ghost" href="pricing.html">가격 보기</a></div>
    <p class="hero-note">과제나 시험을 대신 해 드리지는 않습니다. 직접 해낼 수 있게 옆에서 돕는 게 저희 일입니다.</p>
  </div>
  <div class="ledger" id="ledger">
    <div class="ledger-top"><h2>졸업까지 얼마나 남았을까</h2><span>대략적인 계산</span></div>
    <form onsubmit="return false">
      <div class="field"><label for="degree">목표 학위</label>
        <select id="degree" name="degree">
          <option value="120">미국 학사 (120학점)</option>
          <option value="36">미국 석사 (36학점)</option>
          <option value="140" data-cap="42">학점은행제 학사 (140학점)</option>
        </select></div>
      <div class="field"><div class="row"><label for="earned">지금까지 받은 학점</label><output id="earned-out">60</output></div>
        <input type="range" id="earned" name="earned" min="0" max="120" step="1" value="60"></div>
      <div class="field"><div class="row"><label for="hours">일주일에 공부할 수 있는 시간</label><output id="hours-out">15</output></div>
        <input type="range" id="hours" name="hours" min="3" max="45" step="3" value="15">
        <p class="hint">미국 대학 기준으로 1학점에 주 3시간 정도 듭니다. 15주 학기, 1년 3학기로 계산했어요.</p></div>
    </form>
    <div class="bar" aria-hidden="true"><i id="ledger-fill" style="width:50%"></i></div>
    <div class="bar-legend"><span id="ledger-left">남은 학점 60</span><span>필요 학점 <b id="ledger-total">120</b></span></div>
    <div class="result" aria-live="polite">
      <div class="big" id="ledger-big">약 4년</div>
      <p id="ledger-when"></p>
      <p>이전 학점 인정, 학점 인정 시험(CLEP 등), 경력 인정으로 더 줄일 수 있는지는 상담에서 같이 확인합니다. <a href="degree-plan.html">졸업 설계 보기</a></p>
    </div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="head"><h2>이런 분들이 많이 찾아요</h2></div>
  <div class="people">
    <div><h3>일하면서 학위 중인 분</h3><p>퇴근 후 두세 시간이 전부인데 마감은 매주 돌아옵니다. 실제로 쓸 수 있는 시간에 맞춰 주간 계획부터 같이 짭니다.</p></div>
    <div><h3>멈췄던 학위를 다시 시작하는 분</h3><p>몇 년 전에 받은 학점이 아직 인정되는지, 어느 학교로 옮겨야 가장 많이 살릴 수 있는지 확인해 드립니다.</p></div>
    <div><h3>영어로 공부하는 한국어 사용자</h3><p>내용은 아는데 영어 글쓰기가 발목을 잡는 경우가 많습니다. 설명은 한국어로 듣고, 고쳐 쓰는 연습은 영어로 합니다.</p></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="head"><h2>서비스</h2><p>필요한 것만 골라서 받으시면 됩니다. 가격은 모두 예상가이고 상담 후 계획서에서 확정됩니다.</p></div>
  <div class="catalog">
${svc}
  </div>
  <p class="small" style="margin-top:18px"><a href="services.html">서비스 자세히 보기</a></p>
</div></section>

<section class="section tint"><div class="wrap">
  <div class="head"><h2>진행 순서</h2></div>
  <ol class="steps">
    <li><h3>15분 무료 상담</h3><p>지금 상황, 마감, 목표를 듣습니다. 전화, 화상, 카카오톡 중 편한 방법으로 하시면 됩니다.</p></li>
    <li><h3>계획서 받기</h3><p>이틀 안에 남은 학점, 일정, 필요한 도움, 예상 비용을 한 장으로 정리해 보내 드립니다.</p></li>
    <li><h3>담당 코치 연결</h3><p>과목과 시간대가 맞는 코치를 연결합니다. 첫 세션이 안 맞으면 그 세션 비용은 받지 않습니다.</p></li>
    <li><h3>매주 점검</h3><p>세션마다 다음 할 일을 남기고, 학기가 끝나면 계획을 다시 맞춥니다.</p></li>
  </ol>
</div></section>

<section class="section" id="integrity"><div class="wrap">
  <div class="head"><h2>저희가 하는 일, 하지 않는 일</h2><p>외부 도움을 어디까지 받을 수 있는지는 학교가 정하고, 저희는 그 안에서만 돕습니다.</p></div>
  ${integrity(lang)}
</div></section>

<section class="section"><div class="wrap">
  <div class="head"><h2>자주 묻는 질문</h2></div>
  <div class="faq">
    ${faqItems(lang).slice(0, 4).map(faqHtml).join("\n    ")}
  </div>
  <p class="small" style="margin-top:18px"><a href="faq.html">질문 전체 보기</a></p>
</div></section>
${band(lang)}`
    );
  return shell(
    lang, "index",
    "DegreeMate | Finish your degree while you work",
    "1:1 tutoring, writing coaching, thesis deadlines and degree-completion planning for working adults and busy students. In English and Korean.",
    `<section class="hero"><div class="wrap">
  <div>
    <h1>Finish the degree you started.</h1>
    <p class="lede">If work keeps pushing your coursework back a term, start by counting what's left. We help with tutoring, writing coaching, thesis deadlines and planning the shortest route to graduation, in English or Korean.</p>
    <div class="actions"><a class="btn" href="contact.html">Book a free 15-minute call</a><a class="btn ghost" href="pricing.html">See prices</a></div>
    <p class="hero-note">We don't do your assignments or exams for you. Our job is helping you get them done yourself.</p>
  </div>
  <div class="ledger" id="ledger">
    <div class="ledger-top"><h2>How much is left?</h2><span>Rough estimate</span></div>
    <form onsubmit="return false">
      <div class="field"><label for="degree">Degree</label>
        <select id="degree" name="degree">
          <option value="120">U.S. bachelor's (120 credits)</option>
          <option value="36">U.S. master's (36 credits)</option>
          <option value="140" data-cap="42">Korean Credit Bank bachelor's (140 credits)</option>
        </select></div>
      <div class="field"><div class="row"><label for="earned">Credits you have now</label><output id="earned-out">60</output></div>
        <input type="range" id="earned" name="earned" min="0" max="120" step="1" value="60"></div>
      <div class="field"><div class="row"><label for="hours">Hours you can study each week</label><output id="hours-out">15</output></div>
        <input type="range" id="hours" name="hours" min="3" max="45" step="3" value="15">
        <p class="hint">A U.S. credit takes about 3 hours a week. This assumes 15-week terms, three a year.</p></div>
    </form>
    <div class="bar" aria-hidden="true"><i id="ledger-fill" style="width:50%"></i></div>
    <div class="bar-legend"><span id="ledger-left">60 credits left</span><span>Needed: <b id="ledger-total">120</b></span></div>
    <div class="result" aria-live="polite">
      <div class="big" id="ledger-big">About 4 years</div>
      <p id="ledger-when"></p>
      <p>On the call we check whether old credits, credit-by-exam (CLEP and similar) or work experience can cut that down. <a href="degree-plan.html">How degree planning works</a></p>
    </div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="head"><h2>Who usually comes to us</h2></div>
  <div class="people">
    <div><h3>Working while enrolled</h3><p>You get two or three hours after work and the deadlines still come every week. We start with a weekly plan built around the time you actually have.</p></div>
    <div><h3>Coming back after a break</h3><p>We check which of your old credits still count and which school would accept the most of them.</p></div>
    <div><h3>Korean speakers studying in English</h3><p>Often you know the material and the English writing is what holds you back. You hear the explanation in Korean and practice revising in English.</p></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="head"><h2>Services</h2><p>Pick only what you need. All prices are estimates until they're confirmed in your plan.</p></div>
  <div class="catalog">
${svc}
  </div>
  <p class="small" style="margin-top:18px"><a href="services.html">Service details</a></p>
</div></section>

<section class="section tint"><div class="wrap">
  <div class="head"><h2>How it works</h2></div>
  <ol class="steps">
    <li><h3>Free 15-minute call</h3><p>Tell us where you are, what's due and what you're aiming for. Phone, video or KakaoTalk, whichever is easiest.</p></li>
    <li><h3>Get your plan</h3><p>Within two days you get one page with the credits left, a timeline, the help you need and the expected cost.</p></li>
    <li><h3>Meet your coach</h3><p>We match you with someone who knows the subject and fits your hours. If the first session isn't a fit, you don't pay for it.</p></li>
    <li><h3>Weekly check-ins</h3><p>Each session ends with your next steps written down, and we adjust the plan at the end of every term.</p></li>
  </ol>
</div></section>

<section class="section" id="integrity"><div class="wrap">
  <div class="head"><h2>What we do and what we don't</h2><p>Your school decides how much outside help is allowed, and we stay inside those rules.</p></div>
  ${integrity(lang)}
</div></section>

<section class="section"><div class="wrap">
  <div class="head"><h2>Common questions</h2></div>
  <div class="faq">
    ${faqItems(lang).slice(0, 4).map(faqHtml).join("\n    ")}
  </div>
  <p class="small" style="margin-top:18px"><a href="faq.html">All questions</a></p>
</div></section>
${band(lang)}`
  );
}

function servicesPage(lang) {
  const p = PRICE[lang];
  const ko = lang === "ko";
  const detail = ko
    ? {
        tutoring: { get: ["50분 화상 세션, 화면 공유와 필기 자료 제공", "세션 후 정리 노트와 다음 주 할 일", "시험 전 집중 세션 따로 예약 가능"], fit: "수업 진도를 따라가기 버거운 분, 혼자 풀면 시간이 두 배로 드는 분", facts: [["형식", "화상 1:1"], ["시간", "50분"], ["가격", `${man(p.tutor)}부터`]] },
        writing: { get: ["초안 전체에 대한 구조와 논리 코멘트", "문장 단위 영어 표현 제안 (변경 내용 추적으로 표시)", "인용 형식(APA, MLA 등) 점검", "원하면 피드백 설명 화상 15분"], fit: "생각은 정리됐는데 글로 옮기기가 어려운 분, 영어 글에 자신이 없는 분", facts: [["형식", "문서 피드백"], ["기간", "5일, 빠르면 48시간"], ["가격", `1,000단어당 ${man(p.write)}부터`]] },
        thesis: { get: ["제출일에서 거꾸로 짠 단계별 일정표", "주 1회 50분 점검 세션", "장별 초안 피드백", "지도교수 면담 준비 같이 하기"], fit: "논문 주제는 있는데 몇 달째 진도가 안 나가는 분, 일과 논문을 같이 하는 분", facts: [["형식", "월 4회 세션"], ["기간", "월 단위"], ["가격", `월 ${man(p.thesis)}부터`]] },
        planning: { get: ["지금까지의 성적표와 학점 정리", "편입, 학점 인정 시험, 경력 인정 가능 여부 확인", "학교별 비용, 기간, 인정 학점 비교표", "지원 일정과 서류 목록"], fit: "몇 년 쉬었다가 다시 시작하려는 분, 어느 학교가 유리한지 모르는 분", facts: [["형식", "60분 상담 + 보고서"], ["기간", "보고서 5일 이내"], ["가격", `1회 ${man(p.plan)}`]] },
        coaching: { get: ["매주 월요일 주간 계획 같이 짜기", "수요일쯤 메시지로 중간 점검", "학기 시작과 끝에 일정 다시 맞추기"], fit: "할 일은 아는데 자꾸 미뤄지는 분, 마감이 한꺼번에 몰리는 분", facts: [["형식", "주 1회 20분 + 메시지"], ["기간", "월 단위"], ["가격", `월 ${man(p.coach)}부터`]] },
      }
    : {
        tutoring: { get: ["50-minute video session with screen sharing and notes", "A summary and next week's to-do list after each session", "Extra exam-prep sessions on request"], fit: "You're falling behind the pace of the class, or problems take twice as long when you work alone.", facts: [["Format", "1:1 video"], ["Length", "50 min"], ["Price", `from ${fmt(lang, p.tutor)}`]] },
        writing: { get: ["Comments on the structure and argument of the whole draft", "Sentence-level English suggestions in tracked changes", "A citation check (APA, MLA and others)", "An optional 15-minute call to go over the feedback"], fit: "You know what you want to say but it won't come out on the page, or you're unsure of your English.", facts: [["Format", "Written feedback"], ["Turnaround", "5 days, or 48 hours"], ["Price", `from ${fmt(lang, p.write)} / 1,000 words`]] },
        thesis: { get: ["A step-by-step schedule worked back from your submission date", "One 50-minute check-in a week", "Feedback on each chapter draft", "Help preparing for meetings with your advisor"], fit: "You have a topic but haven't moved in months, or you're writing a thesis around a full-time job.", facts: [["Format", "4 sessions a month"], ["Term", "Monthly"], ["Price", `from ${fmt(lang, p.thesis)} / month`]] },
        planning: { get: ["Your transcripts and credits, sorted", "Which transfer, credit-by-exam and prior-learning options apply to you", "Schools compared on cost, time and credits accepted", "Application dates and a document checklist"], fit: "You took a few years off and want to restart, or you're not sure which school would count the most of your credits.", facts: [["Format", "60-min call + report"], ["Report", "Within 5 days"], ["Price", `${fmt(lang, p.plan)} / session`]] },
        coaching: { get: ["A weekly plan made together every Monday", "A mid-week check-in by message", "A schedule reset at the start and end of each term"], fit: "You know what needs doing but it keeps slipping, or all your deadlines fall in the same week.", facts: [["Format", "20 min a week + messages"], ["Term", "Monthly"], ["Price", `from ${fmt(lang, p.coach)} / month`]] },
      };
  const blocks = services(lang)
    .map((s) => {
      const d = detail[s.id];
      return `<div class="split" id="${s.id}">
  <div><h2>${s.name}</h2><p class="small" style="margin-top:8px">${s.tag}</p>
    <dl class="facts">${d.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl></div>
  <div><p>${s.short}</p>
    <h3 style="margin:22px 0 10px">${ko ? "받게 되는 것" : "What you get"}</h3>
    <ul>${d.get.map((g) => `<li>${g}</li>`).join("")}</ul>
    <h3 style="margin:22px 0 10px">${ko ? "이런 분께 맞아요" : "Good fit if"}</h3>
    <p>${d.fit}</p></div>
</div>`;
    })
    .join("\n");
  const subjects = ko
    ? ["경영, 마케팅", "회계, 재무", "경제학", "통계, 데이터 분석", "간호, 보건", "심리학", "교육학", "컴퓨터, 프로그래밍", "사회복지", "영어 작문"]
    : ["Business, marketing", "Accounting, finance", "Economics", "Statistics, data analysis", "Nursing, health", "Psychology", "Education", "Computing, programming", "Social work", "English composition"];
  return shell(
    lang, "services",
    ko ? "서비스 | DegreeMate" : "Services | DegreeMate",
    ko ? "1:1 튜터링, 글쓰기 코칭과 첨삭, 논문 코칭, 졸업 경로 설계, 학습 계획 관리." : "1:1 tutoring, writing feedback, thesis coaching, degree-completion planning and study check-ins.",
    `<section class="page-head"><div class="wrap"><h1>${ko ? "필요한 만큼만 받는 학습 지원" : "Help with the parts that are hard right now"}</h1>
  <p class="lede">${ko ? "다섯 가지 서비스는 따로 받아도 되고 묶어서 받아도 됩니다. 어떤 게 맞을지 모르겠다면 무료 상담에서 같이 정하면 됩니다." : "Use any of the five services on their own or together. If you're not sure which fits, we can work it out on the free call."}</p></div></section>
<section class="section" style="padding-top:0"><div class="wrap">
${blocks}
</div></section>
<section class="section tint"><div class="wrap">
  <div class="head"><h2>${ko ? "자주 요청받는 과목" : "Subjects we're asked about most"}</h2><p>${ko ? "목록에 없는 과목도 상담에서 물어봐 주세요. 맞는 코치가 있는지 확인해 드립니다." : "If yours isn't listed, ask on the call and we'll check whether we have the right coach."}</p></div>
  <ul class="subject-list">${subjects.map((s) => `<li>${s}</li>`).join("")}</ul>
</div></section>
${band(lang)}`
  );
}

function degreePlan(lang) {
  const ko = lang === "ko";
  return shell(
    lang, "degree-plan",
    ko ? "졸업 설계 | DegreeMate" : "Degree planning | DegreeMate",
    ko ? "편입, 학점 인정 시험, 경력 인정, 학점은행제, 독학학위제까지 가진 학점으로 가장 짧게 졸업하는 길을 찾아 드립니다." : "Transfer credit, credit by exam, prior learning, Korea's Credit Bank: we find the shortest route to graduating with the credits you have.",
    `<section class="page-head"><div class="wrap"><h1>${ko ? "이미 가진 학점부터 세는 졸업 설계" : "A degree plan that starts from what you've already done"}</h1>
  <p class="lede">${ko ? "학위를 빨리 마치려면 이미 해 둔 공부와 경력부터 빠짐없이 인정받는 게 먼저인 경우가 많습니다." : "Often the quickest way to finish is to get credit for the coursework and work experience you already have."}</p></div></section>
<section class="section" style="padding-top:0"><div class="wrap">
  <div class="head"><h2>${ko ? "같이 검토하는 경로" : "Routes we look at"}</h2></div>
  <div class="routes">
    <div class="route"><h3>${ko ? "미국 학위" : "U.S. degrees"}</h3><p class="where">${ko ? "미국 대학 재학 중이거나 미국 온라인 학위를 생각하는 분" : "If you're enrolled at a U.S. school or considering a U.S. online degree"}</p>
      <ul>
        <li>${ko ? "편입 학점: 이전 학교 학점을 어디까지 받아 주는지 학교별로 비교" : "Transfer credit: how much of your old coursework each school will accept"}</li>
        <li>${ko ? "학점 인정 시험: CLEP, DSST 같은 시험으로 교양 학점 채우기" : "Credit by exam: CLEP, DSST and similar tests for general-education credits"}</li>
        <li>${ko ? "경력 인정(Prior Learning Assessment): 업무 경험을 포트폴리오로 인정받기" : "Prior Learning Assessment: credit for work experience through a portfolio"}</li>
        <li>${ko ? "역량 기반 프로그램: 기간 대신 평가 통과로 진도를 나가는 학교" : "Competency-based programs, where you move on by passing assessments rather than waiting out a term"}</li>
      </ul>
      <p class="source">${ko ? "인정 범위는 학교마다 다릅니다. 최종 확인은 항상 해당 학교 학적 담당 부서와 합니다." : "Every school sets its own limits. We always confirm the final answer with the school's registrar."}</p></div>
    <div class="route"><h3>${ko ? "한국 학위" : "Korean degrees"}</h3><p class="where">${ko ? "한국에서 학사 학위를 마치려는 직장인" : "If you're working in Korea and want to finish a bachelor's there"}</p>
      <ul>
        <li>${ko ? "학점은행제: 학사 140학점, 수업 학점은 1년 최대 42학점까지 인정" : "Credit Bank System: 140 credits for a bachelor's, with up to 42 coursework credits recognised a year"}</li>
        <li>${ko ? "자격증과 독학학위제 학점은 연간 상한과 따로 계산" : "Certificate and self-study degree credits count separately from that yearly cap"}</li>
        <li>${ko ? "독학학위제: 단계별 시험으로 학위 취득" : "Bachelor's Degree Examination for Self-Education: a degree earned through staged exams"}</li>
        <li>${ko ? "학위 신청 시기 놓치지 않게 일정 관리" : "Keeping track of degree application windows so you don't miss one"}</li>
      </ul>
      <p class="source">${ko ? "출처: 국가평생교육진흥원 학점은행제 안내(cb.or.kr). 2026년 11월 기준이며 제도는 바뀔 수 있습니다." : "Source: National Institute for Lifelong Education, Credit Bank guide (cb.or.kr), as of November 2026. Rules can change."}</p></div>
  </div>
</div></section>
<section class="section tint"><div class="wrap">
  <div class="head"><h2>${ko ? "설계는 이렇게 진행됩니다" : "How a planning session runs"}</h2></div>
  <ol class="steps">
    <li><h3>${ko ? "서류 모으기" : "Gather records"}</h3><p>${ko ? "성적표, 자격증, 경력 사항을 보내 주세요. 비공식 성적표도 괜찮습니다." : "Send transcripts, certificates and a work history. Unofficial transcripts are fine."}</p></li>
    <li><h3>${ko ? "학점 정리" : "Credit audit"}</h3><p>${ko ? "인정될 가능성이 높은 학점과 애매한 학점을 나눠 표로 정리합니다." : "We sort your credits into likely to count and needs checking."}</p></li>
    <li><h3>${ko ? "경로 비교" : "Compare routes"}</h3><p>${ko ? "60분 상담에서 학교와 경로별 기간, 비용을 나란히 놓고 봅니다." : "On a 60-minute call we lay out each route's time and cost side by side."}</p></li>
    <li><h3>${ko ? "실행 일정" : "Action plan"}</h3><p>${ko ? "지원 마감, 시험 날짜, 서류 목록을 날짜순으로 정리한 보고서를 드립니다." : "You get a report with deadlines, exam dates and documents in date order."}</p></li>
  </ol>
</div></section>
${band(lang)}`
  );
}

function pricing(lang) {
  const ko = lang === "ko";
  const p = PRICE[lang];
  const est = `<span class="est">${ko ? "예상가" : "Estimate"}</span>`;
  const row = (name, note, price, unit) => `<tr><td>${name}${note ? `<small>${note}</small>` : ""}</td><td class="num">${price}${unit ? `<small>${unit}</small>` : ""}</td></tr>`;
  const tables = ko
    ? [
        ["튜터링과 코칭", [
          row("1:1 튜터링", "50분, 학부 과목 기준", fmt(lang, p.tutor), "1회당"),
          row("1:1 튜터링 10회 묶음", "3개월 안에 사용", fmt(lang, p.tutor10), "10회 전체"),
          row("학습 계획과 마감 관리", "주 1회 20분 + 메시지 점검", fmt(lang, p.coach), "한 달"),
        ]],
        ["글쓰기와 논문", [
          row("글쓰기 피드백과 첨삭", "5일 안에 돌려드림", fmt(lang, p.write), "1,000단어당"),
          row("빠른 피드백", "48시간 안에 돌려드림", fmt(lang, p.write * 1.5), "1,000단어당"),
          row("논문과 캡스톤 코칭", "주 1회 50분 + 장별 피드백", fmt(lang, p.thesis), "한 달"),
        ]],
        ["졸업 설계", [
          row("15분 첫 상담", "", "무료", ""),
          row("졸업 경로 설계", "60분 상담 + 비교 보고서", fmt(lang, p.plan), "1회당"),
        ]],
      ]
    : [
        ["Tutoring and coaching", [
          row("1:1 tutoring", "50 minutes, undergraduate courses", fmt(lang, p.tutor), "per session"),
          row("1:1 tutoring, 10 sessions", "Use within 3 months", fmt(lang, p.tutor10), "10 sessions"),
          row("Study planning and check-ins", "20 min a week + messages", fmt(lang, p.coach), "per month"),
        ]],
        ["Writing and thesis", [
          row("Writing feedback", "Back within 5 days", fmt(lang, p.write), "per 1,000 words"),
          row("Fast feedback", "Back within 48 hours", fmt(lang, Math.round(p.write * 1.5)), "per 1,000 words"),
          row("Thesis and capstone coaching", "50 min a week + chapter feedback", fmt(lang, p.thesis), "per month"),
        ]],
        ["Degree planning", [
          row("First 15-minute call", "", "Free", ""),
          row("Degree-completion plan", "60-min call + comparison report", fmt(lang, p.plan), "per session"),
        ]],
      ];
  const tableHtml = tables
    .map(([cap, rows]) => `<div class="table-scroll"><table class="prices"><caption>${cap}</caption>
<thead><tr><th>${ko ? "항목" : "Service"}</th><th class="num">${ko ? "가격" : "Price"}</th></tr></thead>
<tbody>${rows.join("")}</tbody></table></div>`)
    .join("\n");
  const opt = (id, label, rate, unit, unitLabel, min, max, step, per, note, speed) =>
    `<option value="${id}" data-rate="${rate}" data-unit="${unit}" data-unit-label="${unitLabel}" data-min="${min}" data-max="${max}" data-step="${step}" data-per="${per}" data-speed="${speed ? 1 : 0}" data-note="${note}">${label}</option>`;
  const options = ko
    ? [
        opt("tutoring", "1:1 튜터링", p.tutor, "회", "세션 수", 1, 30, 1, 1, `10회 묶음으로 사면 1회 ${fmt(lang, p.tutor10 / 10)} 꼴입니다.`),
        opt("writing", "글쓰기 피드백과 첨삭", p.write, "단어", "글 분량", 500, 15000, 500, 1000, "영어 기준 단어 수입니다. 한글 글은 상담에서 따로 안내합니다.", true),
        opt("thesis", "논문과 캡스톤 코칭", p.thesis, "개월", "기간", 1, 12, 1, 1, "보통 석사 논문은 4~8개월 정도 코칭을 받습니다."),
        opt("coaching", "학습 계획과 마감 관리", p.coach, "개월", "기간", 1, 12, 1, 1, "한 학기 단위(4개월)로 시작하는 분이 많습니다."),
      ]
    : [
        opt("tutoring", "1:1 tutoring", p.tutor, "sessions", "Sessions", 1, 30, 1, 1, `A 10-session pack brings it to ${fmt(lang, p.tutor10 / 10)} a session.`),
        opt("writing", "Writing feedback", p.write, "words", "Length", 500, 15000, 500, 1000, "Word count of the draft you send us.", true),
        opt("thesis", "Thesis and capstone coaching", p.thesis, "months", "Duration", 1, 12, 1, 1, "Master's theses usually take four to eight months of coaching."),
        opt("coaching", "Study planning and check-ins", p.coach, "months", "Duration", 1, 12, 1, 1, "Most people start with one term, about four months."),
      ];
  return shell(
    lang, "pricing",
    ko ? "가격 | DegreeMate" : "Pricing | DegreeMate",
    ko ? "DegreeMate 튜터링, 글쓰기 피드백, 논문 코칭, 졸업 설계 가격표와 예상 비용 계산기." : "DegreeMate prices for tutoring, writing feedback, thesis coaching and degree planning, with a cost estimator.",
    `<section class="page-head"><div class="wrap"><h1>${ko ? "가격은 전부 공개합니다" : "Every price, up front"}</h1>
  <p class="lede">${ko ? "상담을 해야만 알 수 있는 가격은 없습니다. 아래 금액은 정식 오픈 전 예상가이고, 실제 금액은 상담 후 계획서에 적어 드립니다." : "You can see every price before you talk to us. These are pre-launch estimates, and your plan will list the exact amount."}</p></div></section>
<section class="section" style="padding-top:0"><div class="wrap">
  <div class="head"><h2>${ko ? "예상 비용 계산" : "Estimate your cost"} ${est}</h2></div>
  <div class="calc" id="calc">
    <form onsubmit="return false">
      <div class="field full"><label for="service">${ko ? "서비스" : "Service"}</label><select id="service" name="service">${options.join("")}</select></div>
      <div class="field"><label for="level">${ko ? "과정" : "Level"}</label><select id="level" name="level">
        <option data-mult="1">${ko ? "학부" : "Undergraduate"}</option><option data-mult="1.2">${ko ? "석사" : "Master's"}</option></select></div>
      <div class="field" id="speed-field"><label for="speed">${ko ? "받는 시점" : "Turnaround"}</label><select id="speed" name="speed">
        <option data-mult="1">${ko ? "5일" : "5 days"}</option><option data-mult="1.5">${ko ? "48시간" : "48 hours"}</option></select></div>
      <div class="field full"><div class="row"><label for="qty" id="qty-label">${ko ? "세션 수" : "Sessions"}</label><output id="qty-out"></output></div>
        <input type="range" id="qty" name="qty" min="1" max="30" step="1" value="4"></div>
    </form>
    <div class="out" aria-live="polite"><span>${ko ? "예상 금액" : "Estimated total"}</span><div class="big" id="calc-price"></div><p id="calc-note"></p><p><a href="contact.html">${ko ? "이 내용으로 상담 신청" : "Book a call about this"}</a></p></div>
  </div>
</div></section>
<section class="section"><div class="wrap">
  <div class="head"><h2>${ko ? "가격표" : "Price list"} ${est}</h2><p>${ko ? "석사 과정은 튜터링과 첨삭이 20% 더 붙습니다. 결제는 세션 전에 하고, 묶음은 남은 회차만큼 환불됩니다." : "Master's-level tutoring and feedback cost 20% more. You pay before each session, and unused sessions in a pack are refunded."}</p></div>
${tableHtml}
  <p class="small" style="margin-top:24px">${ko ? "첫 세션이 맞지 않으면 그 세션 비용은 받지 않습니다." : "If your first session isn't a fit, you don't pay for it."}</p>
</div></section>
${band(lang)}`
  );
}

function about(lang) {
  const ko = lang === "ko";
  return shell(
    lang, "about",
    ko ? "소개 | DegreeMate" : "About | DegreeMate",
    ko ? "DegreeMate는 원비전컨설팅의 학습 지원 브랜드입니다. 학업 윤리 원칙과 운영 방식을 소개합니다." : "DegreeMate is OneVision Consulting's study-support brand. How we work and our academic-integrity rules.",
    `<section class="page-head"><div class="wrap"><h1>${ko ? "DegreeMate는 이렇게 일합니다" : "Who we are and how we work"}</h1>
  <p class="lede">${ko ? "DegreeMate는 미국 유학과 이민 상담을 해 온 원비전컨설팅이 새로 만든 학습 지원 브랜드입니다. 일하면서 공부하는 분들이 학위를 끝까지 마치도록 돕습니다." : "DegreeMate is a new study-support brand from OneVision Consulting, which advises Korean families on U.S. study and immigration. We help people who work and study at the same time finish their degree."}</p></div></section>
<section class="section" style="padding-top:0"><div class="wrap">
  <div class="split"><div><h2>${ko ? "운영 방식" : "How we work"}</h2></div><div>
    <ul>
      <li>${ko ? "코치는 해당 과목을 전공했거나 현업에서 일하는 사람으로 연결합니다." : "Coaches either studied the subject they teach or work in the field."}</li>
      <li>${ko ? "상담과 세션은 한국어, 영어 중 편한 언어로 합니다." : "Sessions run in English or Korean, whichever you prefer."}</li>
      <li>${ko ? "보내 주신 글과 성적표는 담당 코치만 보고, 다른 용도로 쓰지 않습니다." : "Only your coach sees the writing and transcripts you send, and we don't use them for anything else."}</li>
      <li>${ko ? "모든 세션 기록은 본인이 언제든 다시 볼 수 있게 남겨 둡니다." : "Session notes are kept so you can look back at them any time."}</li>
    </ul></div></div>
  <div class="split"><div><h2>${ko ? "코치 소개" : "Coaches"}</h2></div><div>
    <p>${ko ? "코치 소개는 정식 오픈과 함께 올라옵니다. 지금 상담을 신청하시면 과목에 맞는 코치의 이력을 먼저 보내 드립니다." : "Coach profiles go up when the full site launches. If you book a call now, we'll send you the background of the coach who fits your subject first."}</p></div></div>
  <div class="split" id="integrity"><div><h2>${ko ? "학업 윤리 원칙" : "Academic integrity"}</h2></div><div>
    <p>${ko ? "외부 튜터링과 첨삭은 대부분의 학교에서 허용되지만, 범위는 학교와 수업마다 다릅니다. 과제 안내문이나 학교 규정에 외부 도움 제한이 있다면 그 기준을 따릅니다. 애매하면 담당 교수에게 먼저 확인하도록 안내합니다." : "Most schools allow outside tutoring and editing feedback, but the limits vary by school and by course. If an assignment or your school's policy restricts outside help, we follow it. When it's unclear, we'll ask you to check with your instructor first."}</p>
    <p>${ko ? "아래 일은 요청을 받아도 하지 않으며, 요청이 반복되면 서비스를 중단합니다." : "We won't do the following even if asked, and repeated requests end the service."}</p>
  </div></div>
  <div style="margin-top:32px">${integrity(lang)}</div>
</div></section>
${band(lang)}`
  );
}

function faqItems(lang) {
  const p = PRICE[lang];
  return lang === "ko"
    ? [
        ["과제를 대신 써 주나요?", "아니요. 과제, 에세이, 논문을 대신 쓰거나 시험을 대신 보는 일은 하지 않습니다. 직접 쓴 글에 피드백을 드리고, 막히는 부분을 같이 풀어 가는 방식입니다."],
        ["수업은 몇 시에 받을 수 있나요?", "한국 시간 기준 평일 저녁과 주말, 미국 서부 시간 기준 평일 저녁에 세션을 잡을 수 있습니다. 정확한 시간대는 코치 일정에 따라 상담에서 맞춰 드립니다."],
        ["어떤 과목을 도와주나요?", "경영, 회계, 통계, 간호, 심리, 교육, 컴퓨터, 영어 작문 같은 학부와 석사 과목을 주로 다룹니다. 목록에 없는 과목은 상담에서 맞는 코치가 있는지 확인해 드립니다."],
        ["비용은 어떻게 내나요?", `세션 전에 결제합니다. 10회 묶음은 3개월 안에 쓰면 되고, 남은 회차는 환불됩니다. 1:1 튜터링은 회당 ${man(p.tutor)}부터 시작합니다.`],
        ["첫 상담에서는 무엇을 하나요?", "15분 동안 지금 다니는 학교나 과정, 남은 학점, 가장 급한 마감을 듣습니다. 상담 후 이틀 안에 계획서와 예상 비용을 보내 드리고, 진행 여부는 그다음에 정하시면 됩니다."],
        ["학교에서 외부 첨삭을 받아도 되나요?", "대부분의 학교는 튜터링과 첨삭 피드백을 허용합니다. 다만 수업마다 기준이 다를 수 있어서, 과제 안내문을 같이 확인하고 애매하면 교수님께 먼저 물어보도록 안내합니다."],
        ["학점은행제도 도와주나요?", "네. 학점은행제와 독학학위제로 학사를 마치려는 분께 필요한 학점, 연간 인정 한도, 학위 신청 시기를 정리해 드립니다. 교육원 등록은 직접 하시고, 어디가 맞는지 비교를 도와드립니다."],
        ["미국에 살지 않아도 되나요?", "네. 모든 세션은 화상으로 진행해서 한국, 미국 어디서든 받을 수 있습니다."],
        ["코치가 마음에 안 들면요?", "첫 세션이 맞지 않으면 그 세션 비용은 받지 않고 다른 코치를 연결해 드립니다. 그 뒤에도 언제든 바꿀 수 있습니다."],
        ["상담 내용은 비밀이 지켜지나요?", "보내 주신 글, 성적표, 상담 내용은 담당 코치만 봅니다. 학교나 다른 사람에게 공유하지 않습니다."],
      ]
    : [
        ["Will you write my assignment for me?", "No. We don't write assignments, essays or theses, and we don't take exams. We give feedback on work you wrote and help you through the parts where you're stuck."],
        ["When can I have sessions?", "Weekday evenings and weekends in Korea time, and weekday evenings in U.S. Pacific time. We'll find exact slots on the call based on coach availability."],
        ["Which subjects do you cover?", "Mostly undergraduate and master's courses in business, accounting, statistics, nursing, psychology, education, computing and English composition. If yours isn't listed, we'll check whether we have a coach for it."],
        ["How does payment work?", `You pay before each session. A 10-session pack can be used over three months, and unused sessions are refunded. Tutoring starts at ${fmt(lang, p.tutor)} a session.`],
        ["What happens on the free call?", "In 15 minutes we hear about your school or program, the credits you have left and your most urgent deadline. Within two days you get a plan and an estimated cost, and then you decide whether to go ahead."],
        ["Is outside editing allowed at my school?", "Most schools allow tutoring and editing feedback. Rules can differ by course, so we read the assignment instructions with you, and if it's unclear we'll suggest asking your instructor first."],
        ["Do you help with Korea's Credit Bank System?", "Yes. If you're finishing a bachelor's through the Credit Bank or the self-study degree exams, we map out the credits you need, the yearly limits and the degree application windows. You enrol with the institution yourself, and we help you compare options."],
        ["Do I need to live in the U.S.?", "No. Every session is online, so you can join from Korea, the U.S. or anywhere else."],
        ["What if my coach isn't a good fit?", "If the first session isn't right, you don't pay for it and we match you with someone else. You can switch any time after that too."],
        ["Is what I share kept private?", "Your writing, transcripts and anything you tell us are seen only by your coach. We don't share them with your school or anyone else."],
      ];
}
const faqHtml = ([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`;

function faq(lang) {
  const ko = lang === "ko";
  return shell(
    lang, "faq",
    ko ? "자주 묻는 질문 | DegreeMate" : "FAQ | DegreeMate",
    ko ? "DegreeMate 서비스 범위, 일정, 비용, 학업 윤리에 대해 자주 묻는 질문." : "Common questions about DegreeMate's services, scheduling, payment and academic integrity.",
    `<section class="page-head"><div class="wrap"><h1>${ko ? "자주 묻는 질문" : "Common questions"}</h1>
  <p class="lede">${ko ? "여기 없는 질문은 상담 신청 양식에 남겨 주세요." : "If your question isn't here, leave it in the contact form."}</p></div></section>
<section class="section" style="padding-top:0"><div class="wrap"><div class="faq">
${faqItems(lang).map(faqHtml).join("\n")}
</div></div></section>
${band(lang)}`
  );
}

function contact(lang) {
  const ko = lang === "ko";
  const needs = ko
    ? ["1:1 튜터링", "글쓰기 피드백", "논문 코칭", "졸업 설계", "학습 계획 관리", "아직 모르겠어요"]
    : ["Tutoring", "Writing feedback", "Thesis coaching", "Degree planning", "Study check-ins", "Not sure yet"];
  return shell(
    lang, "contact",
    ko ? "무료 상담 신청 | DegreeMate" : "Book a free call | DegreeMate",
    ko ? "15분 무료 상담을 신청하세요. 영업일 하루 안에 연락드립니다." : "Book a free 15-minute call. We reply within one business day.",
    `<section class="page-head"><div class="wrap"><h1>${ko ? "15분 무료 상담 신청" : "Book a free 15-minute call"}</h1>
  <p class="lede">${ko ? "아는 만큼만 적어 주셔도 됩니다. 영업일 하루 안에 편한 방법으로 연락드릴게요." : "Fill in what you know. We'll get back to you within one business day, using the contact details you leave."}</p></div></section>
<section class="section" style="padding-top:0"><div class="wrap"><div class="contact">
  <div>
    <h2>${ko ? "상담 전에 알아 두면 좋은 것" : "Before the call"}</h2>
    <ul class="ways">
      <li><strong>${ko ? "상담 시간" : "Length"}</strong>${ko ? "15분, 전화나 화상 또는 카카오톡" : "15 minutes, by phone, video or KakaoTalk"}</li>
      <li><strong>${ko ? "준비하면 좋은 것" : "Helpful to have"}</strong>${ko ? "다니는 학교나 프로그램 이름, 대략적인 이수 학점, 가장 급한 마감" : "Your school or program, roughly how many credits you have, and your most urgent deadline"}</li>
      <li><strong>${ko ? "카카오톡 채널" : "KakaoTalk"}</strong>${ko ? "개설 준비 중입니다. 지금은 이 양식으로 남겨 주세요." : "Channel coming soon. For now, please use this form."}</li>
      <li><strong>${ko ? "비용" : "Cost"}</strong>${ko ? "상담은 무료이고, 상담 후 결제할 의무가 없습니다." : "The call is free, and there's no obligation to buy anything."}</li>
    </ul>
  </div>
  <form id="consult" novalidate>
    <div class="field"><label for="f-name">${ko ? "이름" : "Name"}</label><input id="f-name" name="name" autocomplete="name" data-label="${ko ? "이름" : "Name"}" required></div>
    <div class="field"><label for="f-contact">${ko ? "연락처" : "How to reach you"}</label><input id="f-contact" name="contact" data-label="${ko ? "연락처" : "Contact"}" placeholder="${ko ? "이메일, 전화번호 또는 카카오톡 ID" : "Email, phone or KakaoTalk ID"}" required></div>
    <div class="field"><label for="f-stage">${ko ? "지금 상황" : "Where you are now"}</label><select id="f-stage" name="stage" data-label="${ko ? "지금 상황" : "Stage"}">
      ${(ko ? ["학부 재학 중", "석사 재학 중", "휴학 중 또는 멈춘 상태", "입학 전, 알아보는 중", "학점은행제 이용 중", "기타"] : ["Undergraduate, enrolled", "Master's, enrolled", "On a break or stalled", "Not enrolled yet, looking", "Using Korea's Credit Bank", "Other"]).map((o) => `<option>${o}</option>`).join("")}</select></div>
    <div class="field"><label for="f-school">${ko ? "학교 또는 프로그램 (선택)" : "School or program (optional)"}</label><input id="f-school" name="school" data-label="${ko ? "학교/프로그램" : "School/program"}"></div>
    <div class="field full"><span class="label" id="needs-label">${ko ? "필요한 도움 (여러 개 선택 가능)" : "What you need (pick any)"}</span>
      <div class="checks" role="group" aria-labelledby="needs-label">${needs.map((n, i) => `<label><input type="checkbox" name="need${i}" value="${n}" data-label="${ko ? "필요한 도움" : "Needs"}">${n}</label>`).join("")}</div></div>
    <div class="field"><label for="f-when">${ko ? "가장 급한 마감이나 시작하고 싶은 시기" : "Nearest deadline or when you'd like to start"}</label><input id="f-when" name="when" data-label="${ko ? "마감/시작 시기" : "Deadline/start"}"></div>
    <div class="field"><label for="f-lang">${ko ? "상담 언어" : "Language for the call"}</label><select id="f-lang" name="lang" data-label="${ko ? "상담 언어" : "Language"}"><option>${ko ? "한국어" : "English"}</option><option>${ko ? "영어" : "Korean"}</option></select></div>
    <div class="field full"><label for="f-msg">${ko ? "하고 싶은 말 (선택)" : "Anything else (optional)"}</label><textarea id="f-msg" name="message" data-label="${ko ? "메시지" : "Message"}"></textarea></div>
    <input class="hp" name="_hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div class="full"><button class="btn" type="submit">${ko ? "상담 신청 보내기" : "Send request"}</button></div>
    <p class="form-status" role="status"></p>
  </form>
</div></div></section>`
  );
}

// ------------------------------------------------------------------ write
const RENDER = { index: home, services: servicesPage, "degree-plan": degreePlan, pricing, about, faq, contact };
for (const lang of ["ko", "en"]) {
  const dir = lang === "ko" ? OUT : path.join(OUT, "en");
  fs.mkdirSync(dir, { recursive: true });
  for (const page of PAGES) fs.writeFileSync(path.join(dir, page + ".html"), RENDER[page](lang));
}
console.log(`DegreeMate: wrote ${PAGES.length * 2} pages to public_html/degreemate/`);
