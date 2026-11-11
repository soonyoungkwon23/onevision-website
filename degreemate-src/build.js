// Builds the DegreeMate sub-site into public_html/degreemate/ (Korean) and
// public_html/degreemate/en/ (English). Run: node degreemate-src/build.js
//
// The generated HTML is committed, because the main CI build (scripts/build.js)
// only knows about OneVision's own pages. Edit copy, prices and contact details
// here, never in the output files. Blog posts live in posts.js.
//
// Layout and styling follow the reference kit in docs/reference-sites/
// (reference-guide.md section 6, "Blueprint for a comparable site"):
//   header (sticky, service tagline, KakaoTalk button) > hero (service pills)
//   > services (ring icons) > why us (claim lines) > tutors > process
//   > pricing > reviews > FAQ > KakaoTalk band > dark footer.
// Section 9 of the guide lists what is deliberately left out (ghostwriting,
// unverifiable numbers, third-party documents as proof, text in images).
"use strict";
const fs = require("fs");
const path = require("path");
const POSTS = require("./posts");

const OUT = path.join(__dirname, "..", "public_html", "degreemate");
const SITE = "https://onevisionconsulting.us/degreemate/";
const ASSET_V = "20261111";
const PAGES = ["index", "services", "degree-plan", "tutors", "pricing", "reviews", "about", "faq", "contact"];

// ------------------------------------------------------------ editable data
// All prices are placeholders until the CEO signs them off (see the planning
// doc). Change them here and the tables, catalog and calculator follow.
const PRICE = {
  ko: { tutor: 50000, tutor10: 450000, write: 60000, thesis: 400000, plan: 150000, coach: 120000 },
  en: { tutor: 50, tutor10: 450, write: 45, thesis: 320, plan: 120, coach: 90 },
};

// Contact details for the header button, the KakaoTalk band and the footer.
// Empty values show as "coming soon" / "to be confirmed" in the preview.
const CONTACT = {
  kakaoId: "", //  KakaoTalk channel ID, e.g. "degreemate"
  kakaoUrl: "", // channel link, e.g. "https://pf.kakao.com/_xxxxx"
  hours: { ko: "", en: "" }, // e.g. "평일 오전 10시 ~ 오후 7시 (미국 서부 시간)"
  reply: { ko: "영업일 하루 안에", en: "Within one business day" }, // placeholder
};
const BIZ = {
  rep: { ko: "", en: "" }, // representative
  address: { ko: "", en: "" },
  email: "",
};

// Tutor profiles. Leave empty until each tutor's background is confirmed;
// the page then shows placeholder cards. One entry per tutor:
// { name: {ko, en}, degree: {ko, en}, school: {ko, en}, subjects: {ko, en}, years: {ko, en} }
const TUTORS = [];

// Reviews: real, consented and dated only (FTC 16 CFR Part 465). One entry:
// { quote: {ko, en}, who: {ko, en}, service: {ko, en}, date: "2027-01" }
const REVIEWS = [];

// ---------------------------------------------------------------- helpers
const fmt = (lang, n) => (lang === "ko" ? n.toLocaleString("ko-KR") + "원" : "$" + n.toLocaleString("en-US"));
const man = (n) => (n % 10000 === 0 ? n / 10000 + "만 원" : n.toLocaleString("ko-KR") + "원");
const dateText = (lang, iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return lang === "ko" ? `${y}년 ${m}월 ${d}일` : new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
};

const LOGO = `<svg viewBox="0 0 28 28" aria-hidden="true"><rect class="b" x="2" y="18" width="24" height="7" rx="1"/><rect class="b" x="5" y="10.5" width="18" height="6" rx="1"/><rect x="8.5" y="3.5" width="11" height="5.5" rx="1" fill="#fcd81e" stroke="#101010" stroke-width="1.3"/></svg>`;
const WORDMARK = `<span class="wm"><span class="wm-a">Degree</span><span class="wm-b">Mate</span></span>`;
const FAVICON = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><rect x="2" y="18" width="24" height="7" rx="1" fill="#2d8149"/><rect x="5" y="10.5" width="18" height="6" rx="1" fill="#2d8149"/><rect x="8.5" y="3.5" width="11" height="5.5" rx="1" fill="#fcd81e" stroke="#101010" stroke-width="1.3"/></svg>`);
const KAKAO_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.5c-5.2 0-9.3 3.3-9.3 7.3 0 2.6 1.7 4.8 4.3 6.1l-.9 3.4c-.1.4.3.7.6.4l4-2.7h1.3c5.2 0 9.3-3.2 9.3-7.2S17.2 3.5 12 3.5z"/></svg>`;
const ICON = {
  tutoring: '<path d="M3.5 5.5c2.8-1 5.6-1 8.5.8v13c-2.9-1.8-5.7-1.8-8.5-.8z"/><path d="M20.5 5.5c-2.8-1-5.6-1-8.5.8v13c2.9-1.8 5.7-1.8 8.5-.8z"/>',
  writing: '<path d="M15.5 4.5l4 4L9 19H5v-4z"/><path d="M13 7l4 4"/>',
  thesis: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6M10 17h6"/>',
  planning: '<path d="M2.5 9L12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11"/><path d="M21.5 9v5"/>',
  coaching: '<rect x="4" y="5" width="16" height="15" rx="1.5"/><path d="M4 10h16M9 3v4M15 3v4"/><path d="M9 15l2 2 4-4"/>',
};
const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;

// --------------------------------------------------------------- UI strings
const UI = {
  ko: {
    nav: { services: "서비스", process: "진행 방식", tutors: "튜터", pricing: "가격", reviews: "후기", blog: "블로그" },
    kakaoBtn: "카카오톡 상담",
    menu: "메뉴",
    preview: "미리보기 버전입니다. 가격, 튜터, 연락처 같은 세부 내용은 아직 확정 전이라 바뀔 수 있습니다.",
    svcLine: "서비스 목록",
    tagline: "유학생과 직장인을 위한 학습 코칭",
    footLine: "유학생과 일하면서 학위를 마치는 분을 위한 튜터링, 에세이 첨삭, 논문 코칭, 졸업 설계.",
    footServices: "서비스",
    footGuide: "안내",
    footBiz: "사업자 정보",
    footLinks: [["about.html", "소개"], ["about.html#integrity", "학업 윤리 원칙"], ["pricing.html#refund", "환불 정책"], ["reviews.html#policy", "후기 정책"], ["faq.html", "자주 묻는 질문"], ["blog/", "블로그"], ["contact.html", "상담 신청"]],
    biz: { name: "상호", nameVal: "DegreeMate (원비전컨설팅 계열 브랜드)", rep: "대표자", address: "주소", email: "이메일", later: "정식 오픈 때 안내" },
    legal: "DegreeMate는 원비전컨설팅(OneVision Consulting)의 계열 브랜드입니다.",
    ovLabel: "원비전컨설팅 홈페이지",
    current: "한국어",
    other: "English",
    skip: "본문으로 건너뛰기",
    soon: "개설 준비 중",
    tbd: "확정 전",
    est: "예상가",
    band: { title: "카카오톡으로 편하게 물어보세요", text: "상담은 무료이고, 상담 후 바로 결제할 필요도 없습니다.", id: "카카오톡 ID", hours: "상담 시간", reply: "답변", form: "상담 신청 양식", open: "카카오톡 채널 열기" },
  },
  en: {
    nav: { services: "Services", process: "How it works", tutors: "Tutors", pricing: "Pricing", reviews: "Reviews", blog: "Blog" },
    kakaoBtn: "KakaoTalk",
    menu: "Menu",
    preview: "Preview version. Prices, tutors and contact details aren't final yet and may change.",
    svcLine: "Services",
    tagline: "Study support for students abroad and working adults",
    footLine: "Tutoring, essay feedback, thesis coaching and degree planning for international students and people finishing a degree while they work.",
    footServices: "Services",
    footGuide: "Information",
    footBiz: "Business details",
    footLinks: [["about.html", "About"], ["about.html#integrity", "Academic integrity"], ["pricing.html#refund", "Refund policy"], ["reviews.html#policy", "Review policy"], ["faq.html", "FAQ"], ["blog/", "Blog"], ["contact.html", "Book a free call"]],
    biz: { name: "Business", nameVal: "DegreeMate, a OneVision Consulting brand", rep: "Representative", address: "Address", email: "Email", later: "listed at full launch" },
    legal: "DegreeMate is a brand of OneVision Consulting.",
    ovLabel: "OneVision Consulting",
    current: "English",
    other: "한국어",
    skip: "Skip to content",
    soon: "Coming soon",
    tbd: "To be confirmed",
    est: "Estimate",
    band: { title: "Message us on KakaoTalk", text: "The consultation is free, and there's nothing to pay at the end of it.", id: "KakaoTalk ID", hours: "Hours", reply: "Reply", form: "Use the contact form", open: "Open KakaoTalk channel" },
  },
};

// ---------------------------------------------------------------- services
function services(lang) {
  const p = PRICE[lang];
  if (lang === "ko")
    return [
      { id: "tutoring", name: "1:1 과목 튜터링", short: "과목 튜터링", en: "TUTORING", tag: "경영, 회계, 통계, 간호, 컴퓨터, 심리 등, 시험 대비 포함", one: "막히는 개념을 짚고, 시험 대비까지 같이 합니다.", body: "막히는 개념을 짚고, 다음 수업 전까지 풀어야 할 문제를 같이 봅니다. 시험 전에는 범위를 나눠 대비합니다. 화상으로 진행하고 저녁과 주말도 됩니다.", price: `시간당 ${man(p.tutor)}부터` },
      { id: "writing", name: "에세이 첨삭과 과제 피드백", short: "에세이 첨삭", en: "WRITING", tag: "에세이, 리포트, 랩 리포트, 토론 게시글", one: "직접 쓴 글에 문단별 코멘트와 수정 예시를 드립니다.", body: "직접 쓴 초안에 구조, 논리, 인용, 영어 표현 피드백을 문단별 코멘트와 수정 예시로 남깁니다. 출처 표기와 패러프레이징도 함께 연습합니다. 고쳐 쓰는 건 본인이 합니다.", price: `1,000단어당 ${man(p.write)}부터` },
      { id: "thesis", name: "논문 코칭", short: "논문 코칭", en: "THESIS", tag: "석사 논문, 캡스톤, 졸업 프로젝트", one: "주제 설정부터 제출까지 매주 진행을 점검합니다.", body: "주제 설정, 연구 설계, 구조 피드백까지 단계를 잘게 나누고, 매주 진행 상황을 같이 점검합니다. 쓰는 건 본인이고, 저희는 일정과 방향을 잡아 드립니다.", price: `월 ${man(p.thesis)}부터` },
      { id: "planning", name: "졸업 경로 설계", short: "졸업 설계", en: "PLANNING", tag: "편입, 학점 인정, 학점은행제", one: "가진 학점으로 가장 짧게 졸업하는 길을 찾습니다.", body: "가진 학점과 경력을 정리해서 가장 짧게 졸업하는 길을 찾고, 학교별 비교표로 정리해 드립니다.", price: `1회 ${man(p.plan)}` },
      { id: "coaching", name: "학기 학습 관리", short: "학습 관리", en: "CHECK-INS", tag: "주간 계획, 온라인 수업 일정 관리, 중간 체크인", one: "주간 계획을 같이 짜고, 중간에 진행을 확인합니다.", body: "학기 단위 학습 플랜을 세우고 매주 일정표를 같이 짭니다. 온라인 수업 마감과 과제 일정을 한눈에 정리하고, 중간에 메시지로 진행을 확인합니다. 수업은 본인이 직접 듣고 과제도 직접 제출합니다.", price: `월 ${man(p.coach)}부터` },
    ];
  return [
    { id: "tutoring", name: "1:1 course tutoring", short: "Tutoring", tag: "Business, accounting, statistics, nursing, computing, psychology and more, including exam prep", one: "We work through the concept that's stuck and prepare for exams with you.", body: "We go over the concept that's stuck and work through the problems you need before next class. Before exams we split the material up and prepare it together. Online, with evening and weekend slots.", price: `from ${fmt(lang, p.tutor)} / hour` },
    { id: "writing", name: "Essay and assignment feedback", short: "Essay feedback", tag: "Essays, reports, lab reports, discussion posts", one: "Comments on each paragraph and revision examples, on a draft you wrote.", body: "You send a draft you wrote. We comment on structure, argument, citations and English, paragraph by paragraph, with examples of how to revise. We also practice citation and paraphrasing with you. You do the revising.", price: `from ${fmt(lang, p.write)} / 1,000 words` },
    { id: "thesis", name: "Thesis coaching", short: "Thesis coaching", tag: "Master's thesis, capstone, final project", one: "Weekly check-ins from choosing a topic to submitting.", body: "We break the work into small steps, from choosing a topic and designing the study to structure feedback, and check progress with you every week. You do the writing; we keep the schedule and direction on track.", price: `from ${fmt(lang, p.thesis)} / month` },
    { id: "planning", name: "Degree-completion planning", short: "Degree planning", tag: "Transfer credit, credit by exam, Korean Credit Bank", one: "The shortest route to graduating with the credits you have.", body: "We sort through the credits and work experience you already have, find the shortest route to graduating, and lay the schools side by side.", price: `${fmt(lang, p.plan)} / session` },
    { id: "coaching", name: "Term check-ins", short: "Check-ins", tag: "Weekly plan, online-course schedule, mid-week check-in", one: "A weekly plan made together, with a check-in halfway through.", body: "We set up a plan for the term and build each week's schedule with you. Online-course deadlines and assignments go on one page, and we check in by message mid-week. You attend your classes and submit your work yourself.", price: `from ${fmt(lang, p.coach)} / month` },
  ];
}

// Price rows shared by the home summary and the pricing page.
function priceRows(lang) {
  const p = PRICE[lang];
  const ko = lang === "ko";
  const fast = ko ? p.write * 1.5 : Math.round(p.write * 1.5);
  return [
    { group: 0, home: true, name: ko ? "1:1 과목 튜터링" : "1:1 course tutoring", inc: ko ? "50분 화상 세션, 세션 후 정리 노트와 다음 할 일" : "50-minute video session, notes and next steps afterwards", price: fmt(lang, p.tutor), unit: ko ? "1회" : "per session" },
    { group: 0, home: true, name: ko ? "튜터링 10회 묶음" : "Tutoring, 10 sessions", inc: ko ? "3개월 안에 사용, 남은 회차는 환불" : "Use within 3 months, unused sessions refunded", price: fmt(lang, p.tutor10), unit: ko ? "10회" : "10 sessions" },
    { group: 0, home: true, name: ko ? "학기 학습 관리" : "Term check-ins", inc: ko ? "주 1회 20분 계획 세션, 주중 메시지 점검" : "20-minute planning session a week, mid-week message check-in", price: fmt(lang, p.coach), unit: ko ? "한 달" : "per month" },
    { group: 1, home: true, name: ko ? "에세이 첨삭과 과제 피드백" : "Essay and assignment feedback", inc: ko ? "문단별 코멘트, 수정 예시, 인용 점검, 5일 안에 돌려드림" : "Paragraph comments, revision examples, citation check, back within 5 days", price: fmt(lang, p.write), unit: ko ? "1,000단어당" : "per 1,000 words" },
    { group: 1, home: false, name: ko ? "빠른 피드백" : "Fast feedback", inc: ko ? "같은 내용, 48시간 안에 돌려드림" : "Same feedback, back within 48 hours", price: fmt(lang, fast), unit: ko ? "1,000단어당" : "per 1,000 words" },
    { group: 1, home: true, name: ko ? "논문 코칭" : "Thesis coaching", inc: ko ? "주 1회 50분 점검, 장별 초안 피드백, 단계별 일정표" : "50-minute check-in a week, chapter feedback, step-by-step schedule", price: fmt(lang, p.thesis), unit: ko ? "한 달" : "per month" },
    { group: 2, home: true, name: ko ? "15분 첫 상담" : "First 15-minute call", inc: ko ? "상담 후 이틀 안에 계획서와 예상 비용" : "A plan and estimated cost within two days", price: ko ? "무료" : "Free", unit: "" },
    { group: 2, home: true, name: ko ? "졸업 경로 설계" : "Degree-completion plan", inc: ko ? "60분 상담, 학교별 비교 보고서 (5일 이내)" : "60-minute call and a school comparison report (within 5 days)", price: fmt(lang, p.plan), unit: ko ? "1회" : "per session" },
  ];
}

const refundItems = (lang) =>
  lang === "ko"
    ? ["결제는 세션 전에 합니다.", "첫 세션이 맞지 않으면 그 세션 비용은 받지 않습니다.", "10회 묶음은 3개월 안에 쓰면 되고, 남은 회차는 환불됩니다."]
    : ["You pay before each session.", "If your first session isn't a fit, you don't pay for it.", "A 10-session pack can be used over three months, and unused sessions are refunded."];

const reviewPolicy = (lang) =>
  lang === "ko"
    ? ["실제로 서비스를 이용한 분이 게시에 동의한 후기만 올립니다.", "후기마다 작성한 날짜와 이용한 서비스를 함께 적습니다.", "이름은 본인이 원하는 방식(이니셜 등)으로 표시하고, 학교 이름은 동의한 경우에만 적습니다.", "성적 화면, 합격 통지서, 대화 캡처는 올리지 않습니다."]
    : ["We only post reviews from people who used the service and agreed to have them published.", "Every review shows the date it was written and the service used.", "Names appear however the reviewer prefers (initials, for example), and schools only with their consent.", "We don't post grade screens, admission letters or chat screenshots."];

// ------------------------------------------------------------------ shell
// depth: 0 for pages in the language root, 1 for blog pages.
// rel: path inside the language root ("" for home, "blog/x.html" for a post).
function shell({ lang, depth = 0, page, rel, title, desc, body, band = true }) {
  const ko = lang === "ko";
  const u = UI[lang];
  const up = "../".repeat(depth);
  const home = up || "./";
  const assets = "../".repeat(depth + (ko ? 0 : 1)) + "assets/";
  const url = (l) => SITE + (l === "en" ? "en/" : "") + rel;
  const otherHref = (ko ? up + "en/" : "../".repeat(depth + 1)) + rel || "./";
  const navItems = [
    ["services", up + "services.html"],
    ["process", page === "index" ? "#process" : home + "#process"],
    ["tutors", up + "tutors.html"],
    ["pricing", up + "pricing.html"],
    ["reviews", up + "reviews.html"],
    ["blog", up + "blog/"],
  ];
  const navKey = page.startsWith("blog") ? "blog" : page;
  const nav = navItems.map(([k, h]) => `<a href="${h}"${k === navKey ? ' aria-current="page"' : ""}>${u.nav[k]}</a>`).join("");
  const kakaoHref = CONTACT.kakaoUrl || up + "contact.html#kakao";
  const ext = CONTACT.kakaoUrl ? ' target="_blank" rel="noopener"' : "";
  const svc = services(lang);
  const brand = (cls = "") => `<a class="brand${cls}" href="${home}">${LOGO}${WORDMARK}</a>`;

  const bizRows = [[u.biz.name, u.biz.nameVal]];
  const missing = [];
  [["rep", BIZ.rep[lang]], ["address", BIZ.address[lang]], ["email", BIZ.email]].forEach(([k, v]) => (v ? bizRows.push([u.biz[k], v]) : missing.push(u.biz[k])));
  if (missing.length) bizRows.push([missing.join(", "), u.biz.later]);

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${url(lang)}">
<link rel="alternate" hreflang="ko" href="${url("ko")}">
<link rel="alternate" hreflang="en" href="${url("en")}">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Chivo:wght@700&family=Noto+Sans+KR:wght@400;700&family=Open+Sans:wght@400;700&family=Syncopate:wght@700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${assets}dm.css?v=${ASSET_V}">
</head>
<body>
<a class="sr-only" href="#main">${u.skip}</a>
<div class="preview-bar">${u.preview}</div>
<header class="top">
  <div class="util"><div class="wrap">
    <ul class="svc-line" aria-label="${u.svcLine}">${svc.slice(0, 4).map((s) => `<li>${s.short}</li>`).join("")}</ul>
    <div class="lang"><span aria-current="true">${u.current}</span><a href="${otherHref}" hreflang="${ko ? "en" : "ko"}" lang="${ko ? "en" : "ko"}">${u.other}</a></div>
  </div></div>
  <div class="mainbar"><div class="wrap">
    ${brand()}
    <button class="menu-btn" aria-expanded="false" aria-controls="nav">${u.menu}</button>
    <nav class="nav" id="nav" aria-label="Main">${nav}<a class="btn kakao" href="${kakaoHref}"${ext}>${KAKAO_ICON}${u.kakaoBtn}</a></nav>
  </div></div>
</header>
<main id="main">
${body}
${band ? kakaoBand(lang, up) : ""}
</main>
<footer class="foot">
  <div class="wrap">
    <div class="foot-brand"><div class="logo-tile">${brand()}</div><p>${u.footLine}</p></div>
    <div><h2>${u.footServices}</h2><ul>${svc.map((s) => `<li><a href="${up}services.html#${s.id}">${s.name}</a></li>`).join("")}</ul></div>
    <div><h2>${u.footGuide}</h2><ul>${u.footLinks.map(([h, t]) => `<li><a href="${up}${h}">${t}</a></li>`).join("")}<li><a href="${ko ? "/" : "/en/"}">${u.ovLabel}</a></li></ul></div>
    <div><h2>${u.footBiz}</h2><dl class="biz">${bizRows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl></div>
    <p class="legal">${u.legal} © 2026 DegreeMate</p>
  </div>
</footer>
<script src="${assets}dm.js?v=${ASSET_V}"></script>
</body>
</html>
`;
}

// Contact band: the guide's yellow KakaoTalk banner (B) set beside a logo
// panel, like the split banner on site A. Built in HTML, not as an image.
function kakaoBand(lang, up) {
  const u = UI[lang];
  const b = u.band;
  const rows = [
    [b.id, CONTACT.kakaoId || u.soon],
    [b.hours, CONTACT.hours[lang] || u.tbd],
    [b.reply, CONTACT.reply[lang]],
  ];
  const buttons = CONTACT.kakaoUrl
    ? `<a class="btn dark" href="${CONTACT.kakaoUrl}" target="_blank" rel="noopener">${KAKAO_ICON}${b.open}</a><a class="text-link" href="${up}contact.html">${b.form}</a>`
    : `<a class="btn dark" href="${up}contact.html">${b.form}</a>`;
  return `<section class="kakao-band" id="kakao-band" aria-labelledby="kb-title"><div class="wrap">
  <div class="kb-logo"><div>${LOGO}${WORDMARK}<p>${u.tagline}</p></div></div>
  <div class="kb-main">
    <h2 id="kb-title">${b.title}</h2>
    <p>${b.text}</p>
    <dl class="kb-rows">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
    <div class="kb-actions">${buttons}</div>
  </div>
</div></section>`;
}

// Section heading: Korean display type with a green rule (site B), plus a
// small English caps label on the Korean pages.
const head = (lang, h2, label, p, id) =>
  `<div class="sec-head"><h2${id ? ` id="${id}"` : ""}>${h2}</h2>${lang === "ko" && label ? `<span class="sec-en" aria-hidden="true">${label}</span>` : ""}${p ? `<p>${p}</p>` : ""}</div>`;

const pageHead = (h1, lede) => `<section class="page-head"><div class="wrap"><h1>${h1}</h1>${lede ? `<p class="lede">${lede}</p>` : ""}</div></section>`;

const integrity = (lang) =>
  lang === "ko"
    ? `<div class="integrity">
  <div class="yes"><h3>하는 일</h3><ul>
    <li>개념을 설명하고 풀이 과정을 같이 따라가기</li>
    <li>직접 쓴 글에 문단별 코멘트와 수정 예시 남기기</li>
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
    <li>Comment on each paragraph of writing you drafted, with revision examples</li>
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

const rings = (lang, up = "") =>
  `<ul class="rings">${services(lang)
    .map(
      (s) => `<li><a class="ring" href="${up}services.html#${s.id}">${icon(s.id)}<span class="ring-name">${s.short}</span>${lang === "ko" ? `<span class="ring-en" aria-hidden="true">${s.en}</span>` : ""}</a>
    <p>${s.one}</p><p class="ring-price">${s.price}</p></li>`
    )
    .join("")}</ul>`;

function tutorCards(lang) {
  const ko = lang === "ko";
  const f = ko ? ["학위", "학교", "담당 과목", "경력"] : ["Degree", "School", "Subjects", "Experience"];
  if (TUTORS.length)
    return `<div class="tutors">${TUTORS.map(
      (t) => `<article class="tutor"><div class="avatar" aria-hidden="true">${t.name[lang].slice(0, 1)}</div><h3>${t.name[lang]}</h3>
  <dl>${[t.degree, t.school, t.subjects, t.years].map((v, i) => `<dt>${f[i]}</dt><dd>${v[lang]}</dd>`).join("")}</dl></article>`
    ).join("")}</div>`;
  const later = ko ? "정식 오픈 때 공개" : "Published at launch";
  const card = `<article class="tutor pending"><div class="avatar" aria-hidden="true">?</div><h3>${ko ? "튜터 프로필 준비 중" : "Tutor profile coming"}</h3>
  <dl>${f.map((k) => `<dt>${k}</dt><dd>${later}</dd>`).join("")}</dl></article>`;
  return `<div class="tutors">${card}${card}${card}</div>`;
}

function reviewList(lang) {
  const ko = lang === "ko";
  if (REVIEWS.length)
    return `<div class="reviews">${REVIEWS.map(
      (r) => `<figure class="review"><blockquote><p>${r.quote[lang]}</p></blockquote><figcaption><span class="who">${r.who[lang]}</span><span>${r.service[lang]}, ${r.date}</span></figcaption></figure>`
    ).join("")}</div>`;
  return `<div class="empty"><p>${ko ? "정식 오픈 전이라 아직 올린 후기가 없습니다. 후기는 실제 이용자의 동의를 받아 날짜, 이용한 서비스와 함께 올립니다." : "We haven't launched yet, so there are no reviews to show. When there are, they'll be real, posted with consent, and shown with the date and the service used."}</p></div>`;
}

const priceTable = (lang, rows, caption) => {
  const ko = lang === "ko";
  return `<div class="table-scroll"><table class="prices">${caption ? `<caption>${caption}</caption>` : ""}
<thead><tr><th scope="col">${ko ? "서비스" : "Service"}</th><th scope="col">${ko ? "포함 내용" : "What's included"}</th><th scope="col" class="num">${ko ? "예상가" : "Estimate"}</th></tr></thead>
<tbody>${rows.map((r) => `<tr><th scope="row">${r.name}</th><td>${r.inc}</td><td class="num">${r.price}${r.unit ? `<small>${r.unit}</small>` : ""}</td></tr>`).join("")}</tbody></table></div>`;
};

// ------------------------------------------------------------------- copy
const HOME = {
  ko: {
    title: "DegreeMate | 유학생 과목 튜터링, 에세이 첨삭, 논문 코칭",
    desc: "미국 대학과 대학원 유학생, 일하면서 학위를 마치는 분을 위한 1:1 과목 튜터링, 에세이 첨삭, 논문 코칭, 졸업 설계. 대필은 하지 않습니다.",
    h1: "시작한 학위, 이번엔 끝까지.",
    strip: "미국 학부 / 대학원 / 한국 학점은행제",
    lede: "영어 과제가 막막하신가요? 미국 대학과 대학원에서 공부하는 유학생, 일하면서 학위를 마치는 분을 1:1로 돕습니다. 설명은 한국어로 듣고, 쓰는 연습은 영어로 합니다.",
    cta: "15분 무료 상담 신청",
    second: "가격 먼저 보기",
    note: "과제나 시험을 대신 해 드리지는 않습니다. 직접 해낼 수 있게 옆에서 돕습니다.",
    svcH: "서비스",
    svcP: "필요한 것만 골라서 받으시면 됩니다. 가격은 모두 예상가이고 상담 후 계획서에서 확정됩니다.",
    alert: "과제 대필, 시험 대리 응시, 온라인 수업 대리 수강은 하지 않습니다.",
    svcMore: "서비스 자세히 보기",
    whyH: "확인할 수 있는 약속",
    claims: [
      ["모든 가격을 사이트에 공개합니다.", "상담을 해야만 알 수 있는 가격은 없습니다.", "pricing.html", "가격표 보기"],
      ["대신 써 드리지 않고, 문단별 코멘트와 수정 예시를 드립니다.", "영어가 모국어가 아니어도 논리는 충분히 전달할 수 있습니다.", "about.html#integrity", "학업 윤리 원칙 보기"],
      ["첫 세션이 맞지 않으면 그 세션 비용은 받지 않습니다.", "다른 튜터를 연결해 드립니다.", "pricing.html#refund", "환불 정책 보기"],
    ],
    tutorH: "튜터",
    tutorP: "과목별 담당 튜터를 배정합니다. 정식 오픈 때 튜터마다 학위, 학교, 담당 과목, 경력을 공개합니다.",
    tutorMore: "튜터 배정 방식 보기",
    procH: "진행 방식",
    steps: [
      ["상담", "15분 무료 상담에서 지금 상황, 마감, 목표를 듣습니다. 카카오톡, 전화, 화상 중 편한 방법으로 하시면 됩니다."],
      ["진단", "과제 안내문, 성적표, 쓰던 초안을 보고 어디서 막히는지 확인합니다. 이틀 안에 계획서와 예상 비용을 보내 드립니다."],
      ["튜터 배정", "과목과 시간대가 맞는 튜터를 연결합니다. 첫 세션이 맞지 않으면 그 세션 비용은 받지 않습니다."],
      ["피드백", "세션마다 다음 할 일을 남기고, 진행 상황을 단계마다 공유합니다. 학기가 끝나면 계획을 다시 맞춥니다."],
    ],
    priceH: "가격",
    priceP: "상담을 해야만 알 수 있는 가격은 없습니다. 아래는 정식 오픈 전 예상가입니다.",
    refundH: "환불 정책",
    priceMore: "가격표와 비용 계산기 보기",
    revH: "후기",
    revMore: "후기 정책 보기",
    faqH: "자주 묻는 질문",
    faqMore: "질문 전체 보기",
  },
  en: {
    title: "DegreeMate | Tutoring, essay feedback and thesis coaching",
    desc: "1:1 course tutoring, essay feedback, thesis coaching and degree planning for international students at U.S. schools and people finishing a degree while they work. No ghostwriting.",
    h1: "Finish the degree you started.",
    strip: "U.S. undergraduate / Graduate school / Korea's Credit Bank",
    lede: "Stuck on an English assignment? We work one-on-one with international students at U.S. colleges and graduate schools, and with people finishing a degree while they work. Sessions run in Korean or English.",
    cta: "Book a free 15-minute call",
    second: "See prices first",
    note: "We don't do your assignments or exams for you. We help you get them done yourself.",
    svcH: "Services",
    svcP: "Pick only what you need. All prices are estimates until they're confirmed in your plan.",
    alert: "We don't write assignments, take exams or attend online classes for anyone.",
    svcMore: "Service details",
    whyH: "Promises you can check",
    claims: [
      ["Every price is on the site.", "There's no price you only hear about after a call.", "pricing.html", "See prices"],
      ["We don't write it for you. You get comments on each paragraph and examples of how to revise.", "English doesn't have to be your first language for your argument to come through.", "about.html#integrity", "Academic integrity"],
      ["If your first session isn't a fit, you don't pay for it.", "We'll match you with another tutor.", "pricing.html#refund", "Refund policy"],
    ],
    tutorH: "Tutors",
    tutorP: "Each subject gets its own tutor. At full launch every tutor's degree, school, subjects and experience will be listed here.",
    tutorMore: "How we match tutors",
    procH: "How it works",
    steps: [
      ["Consultation", "On a free 15-minute call we hear where you are, what's due and what you're aiming for. KakaoTalk, phone or video, whichever is easiest."],
      ["Diagnosis", "We look at the assignment brief, your transcript or the draft you're working on to see where you're stuck. Within two days you get a plan and an estimated cost."],
      ["Tutor match", "We match you with a tutor who knows the subject and fits your hours. If the first session isn't a fit, you don't pay for it."],
      ["Feedback", "Each session ends with your next steps written down, and we share progress at every stage. At the end of each term we adjust the plan."],
    ],
    priceH: "Pricing",
    priceP: "You can see every price before you talk to us. These are pre-launch estimates.",
    refundH: "Refund policy",
    priceMore: "Full price list and cost estimator",
    revH: "Reviews",
    revMore: "Review policy",
    faqH: "Common questions",
    faqMore: "All questions",
  },
};

function faqItems(lang) {
  const p = PRICE[lang];
  return lang === "ko"
    ? [
        ["과제를 대신 써 주나요?", "아니요. 과제, 에세이, 논문을 대신 쓰거나 시험을 대신 보는 일은 하지 않습니다. 직접 쓴 글에 피드백을 드리고, 막히는 부분을 같이 풀어 가는 방식입니다."],
        ["AI 도구는 써도 되나요?", `AI 도구 사용은 학교와 수업마다 기준이 달라서, 학교 규정을 먼저 확인하고 안내합니다. 저희가 AI로 글을 만들어 드리는 일은 없습니다. <a href="blog/ai-tools-policy.html">확인하는 방법 보기</a>`],
        ["표절이 걱정돼요.", "출처 표기와 패러프레이징을 함께 연습합니다. 직접 쓴 글을 보면서 어디에 출처가 필요한지 같이 확인합니다. 표절 검사를 피하는 방법은 알려 드리지 않습니다."],
        ["학교에서 외부 첨삭을 받아도 되나요?", "대부분의 학교는 튜터링과 첨삭 피드백을 허용합니다. 다만 수업마다 기준이 다를 수 있어서, 과제 안내문을 같이 확인하고 애매하면 교수님께 먼저 물어보도록 안내합니다."],
        ["비용은 어떻게 내나요?", `세션 전에 결제합니다. 10회 묶음은 3개월 안에 쓰면 되고, 남은 회차는 환불됩니다. 1:1 튜터링은 회당 ${man(p.tutor)}부터 시작합니다. <a href="pricing.html#refund">환불 정책 보기</a>`],
        ["첫 상담에서는 무엇을 하나요?", "15분 동안 지금 다니는 학교나 과정, 가장 급한 과제와 마감을 듣습니다. 상담 후 이틀 안에 계획서와 예상 비용을 보내 드리고, 진행 여부는 그다음에 정하시면 됩니다."],
        ["어떤 과목을 도와주나요?", "경영, 회계, 통계, 간호, 심리, 교육, 컴퓨터, 영어 작문 같은 학부와 석사 과목을 주로 다룹니다. 목록에 없는 과목은 상담에서 맞는 튜터가 있는지 확인해 드립니다."],
        ["수업은 몇 시에 받을 수 있나요?", "모든 세션은 화상이라 한국, 미국 어디서든 받을 수 있습니다. 한국 시간 평일 저녁과 주말, 미국 서부 시간 평일 저녁에 잡을 수 있고, 정확한 시간은 튜터 일정에 맞춰 상담에서 정합니다."],
        ["튜터가 마음에 안 들면요?", "첫 세션이 맞지 않으면 그 세션 비용은 받지 않고 다른 튜터를 연결해 드립니다. 그 뒤에도 언제든 바꿀 수 있습니다."],
        ["상담 내용은 비밀이 지켜지나요?", "보내 주신 글, 성적표, 상담 내용은 담당 튜터만 봅니다. 학교나 다른 사람에게 공유하지 않습니다."],
      ]
    : [
        ["Will you write my assignment for me?", "No. We don't write assignments, essays or theses, and we don't take exams. We give feedback on work you wrote and help you through the parts where you're stuck."],
        ["Can I use AI tools?", `Rules on AI tools differ by school and by course, so we check yours before giving any guidance. We never produce writing for you with AI. <a href="blog/ai-tools-policy.html">How to check your rules</a>`],
        ["I'm worried about plagiarism.", "We practice citation and paraphrasing together, using writing you drafted, and check where sources are needed. We don't teach ways around plagiarism checkers."],
        ["Is outside editing allowed at my school?", "Most schools allow tutoring and editing feedback. Rules can differ by course, so we read the assignment instructions with you, and if it's unclear we'll suggest asking your instructor first."],
        ["How does payment work?", `You pay before each session. A 10-session pack can be used over three months, and unused sessions are refunded. Tutoring starts at ${fmt(lang, p.tutor)} a session. <a href="pricing.html#refund">Refund policy</a>`],
        ["What happens on the free call?", "In 15 minutes we hear about your school or program and your most urgent assignment or deadline. Within two days you get a plan and an estimated cost, and then you decide whether to go ahead."],
        ["Which subjects do you cover?", "Mostly undergraduate and master's courses in business, accounting, statistics, nursing, psychology, education, computing and English composition. If yours isn't listed, we'll check whether we have a tutor for it."],
        ["When can I have sessions?", "Every session is online, so you can join from Korea, the U.S. or anywhere else. Slots run on weekday evenings and weekends in Korea time and weekday evenings in U.S. Pacific time; we set exact times on the call."],
        ["What if my tutor isn't a good fit?", "If the first session isn't right, you don't pay for it and we match you with someone else. You can switch any time after that too."],
        ["Is what I share kept private?", "Your writing, transcripts and anything you tell us are seen only by your tutor. We don't share them with your school or anyone else."],
      ];
}
const faqHtml = ([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`;

// ------------------------------------------------------------------ pages
function home(lang) {
  const c = HOME[lang];
  const ko = lang === "ko";
  const pills = services(lang)
    .slice(0, 4)
    .map((s) => `<a class="pill" href="services.html#${s.id}">${s.short}</a>`)
    .join("");
  const faqs = faqItems(lang);
  return shell({
    lang, page: "index", rel: "", title: c.title, desc: c.desc,
    body: `<section class="hero"><div class="wrap">
  <p class="hero-tag">${UI[lang].tagline}</p>
  <h1>${c.h1}</h1>
  <p class="strip">${c.strip}</p>
  <p class="lede">${c.lede}</p>
  <nav class="pills" aria-label="${ko ? "서비스 바로가기" : "Services"}">${pills}</nav>
  <div class="actions"><a class="btn dark lg" href="contact.html">${c.cta}</a><a class="text-link" href="pricing.html">${c.second}</a></div>
  <p class="hero-note">${c.note}</p>
</div></section>

<section class="section" aria-labelledby="h-svc"><div class="wrap">
  ${head(lang, c.svcH, "SERVICE", c.svcP, "h-svc")}
  ${rings(lang)}
  <p class="alert-note">${c.alert}</p>
  <p class="more"><a href="services.html">${c.svcMore}</a></p>
</div></section>

<section class="cover" aria-labelledby="h-why"><div class="wrap">
  ${head(lang, c.whyH, "WHY DEGREEMATE", "", "h-why")}
  <ul class="claims">${c.claims.map(([a, b, h, l]) => `<li><strong>${a}</strong><span>${b}</span><a href="${h}">${l}</a></li>`).join("")}</ul>
</div></section>

<section class="section" aria-labelledby="h-tutor"><div class="wrap">
  ${head(lang, c.tutorH, "TUTORS", c.tutorP, "h-tutor")}
  ${tutorCards(lang)}
  <p class="more"><a href="tutors.html">${c.tutorMore}</a></p>
</div></section>

<section class="section tint" id="process" aria-labelledby="h-proc"><div class="wrap">
  ${head(lang, c.procH, "PROCESS", "", "h-proc")}
  <ol class="steps">${c.steps.map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join("")}</ol>
</div></section>

<section class="section" aria-labelledby="h-price"><div class="wrap">
  ${head(lang, c.priceH, "PRICING", c.priceP, "h-price")}
  ${priceTable(lang, priceRows(lang).filter((r) => r.home))}
  <div class="refund"><h3>${c.refundH}</h3><ul>${refundItems(lang).map((t) => `<li>${t}</li>`).join("")}</ul></div>
  <p class="more"><a href="pricing.html">${c.priceMore}</a></p>
</div></section>

<section class="section tint" aria-labelledby="h-rev"><div class="wrap">
  ${head(lang, c.revH, "REVIEWS", "", "h-rev")}
  ${reviewList(lang)}
  <p class="more"><a href="reviews.html">${c.revMore}</a></p>
</div></section>

<section class="section" aria-labelledby="h-faq"><div class="wrap">
  ${head(lang, c.faqH, "FAQ", "", "h-faq")}
  <div class="faq">
    ${[0, 1, 2, 4, 5].map((i) => faqHtml(faqs[i])).join("\n    ")}
  </div>
  <p class="more"><a href="faq.html">${c.faqMore}</a></p>
</div></section>`,
  });
}

function servicesPage(lang) {
  const p = PRICE[lang];
  const ko = lang === "ko";
  const detail = ko
    ? {
        tutoring: { get: ["50분 화상 세션, 화면 공유와 필기 자료 제공", "세션 후 정리 노트와 다음 주 할 일", "시험 전 범위를 나눈 대비 세션"], fit: "수업 진도를 따라가기 버거운 분, 혼자 풀면 시간이 두 배로 드는 분", facts: [["형식", "화상 1:1"], ["시간", "50분"], ["가격", `${man(p.tutor)}부터`]] },
        writing: { get: ["초안 전체에 대한 구조와 논리 코멘트", "문단별 코멘트와 수정 예시 (변경 내용 추적으로 표시)", "인용 형식(APA, MLA 등) 점검과 패러프레이징 연습", "원하면 피드백 설명 화상 15분"], fit: "생각은 정리됐는데 글로 옮기기 어려운 분, 영어 글에 자신이 없는 분", facts: [["형식", "문서 피드백"], ["기간", "5일, 빠르면 48시간"], ["가격", `1,000단어당 ${man(p.write)}부터`]] },
        thesis: { get: ["제출일에서 거꾸로 짠 단계별 일정표", "주제 설정과 연구 설계 피드백", "주 1회 50분 점검 세션과 장별 초안 피드백", "지도교수 면담 준비 같이 하기"], fit: "논문 주제는 있는데 몇 달째 진도가 안 나가는 분, 일과 논문을 같이 하는 분", facts: [["형식", "월 4회 세션"], ["기간", "월 단위"], ["가격", `월 ${man(p.thesis)}부터`]] },
        planning: { get: ["지금까지의 성적표와 학점 정리", "편입, 학점 인정 시험, 경력 인정 가능 여부 확인", "학교별 비용, 기간, 인정 학점 비교표", "지원 일정과 서류 목록"], fit: "몇 년 쉬었다가 다시 시작하려는 분, 어느 학교가 유리한지 모르는 분", facts: [["형식", "60분 상담 + 보고서"], ["기간", "보고서 5일 이내"], ["가격", `1회 ${man(p.plan)}`]] },
        coaching: { get: ["학기 시작 때 학기 단위 학습 플랜", "매주 월요일 주간 계획 같이 짜기", "수요일쯤 메시지로 중간 점검", "학기 끝에 일정 다시 맞추기"], fit: "할 일은 아는데 자꾸 미뤄지는 분, 온라인 수업 마감이 한꺼번에 몰리는 분", facts: [["형식", "주 1회 20분 + 메시지"], ["기간", "월 단위"], ["가격", `월 ${man(p.coach)}부터`]] },
      }
    : {
        tutoring: { get: ["50-minute video session with screen sharing and notes", "A summary and next week's to-do list after each session", "Exam-prep sessions with the material split up"], fit: "You're falling behind the pace of the class, or problems take twice as long when you work alone.", facts: [["Format", "1:1 video"], ["Length", "50 min"], ["Price", `from ${fmt(lang, p.tutor)}`]] },
        writing: { get: ["Comments on the structure and argument of the whole draft", "Paragraph comments and revision examples in tracked changes", "A citation check (APA, MLA and others) and paraphrasing practice", "An optional 15-minute call to go over the feedback"], fit: "You know what you want to say but it won't come out on the page, or you're unsure of your English.", facts: [["Format", "Written feedback"], ["Turnaround", "5 days, or 48 hours"], ["Price", `from ${fmt(lang, p.write)} / 1,000 words`]] },
        thesis: { get: ["A step-by-step schedule worked back from your submission date", "Feedback on your topic and study design", "One 50-minute check-in a week and feedback on each chapter", "Help preparing for meetings with your advisor"], fit: "You have a topic but haven't moved in months, or you're writing a thesis around a full-time job.", facts: [["Format", "4 sessions a month"], ["Term", "Monthly"], ["Price", `from ${fmt(lang, p.thesis)} / month`]] },
        planning: { get: ["Your transcripts and credits, sorted", "Which transfer, credit-by-exam and prior-learning options apply to you", "Schools compared on cost, time and credits accepted", "Application dates and a document checklist"], fit: "You took a few years off and want to restart, or you're not sure which school would count the most of your credits.", facts: [["Format", "60-min call + report"], ["Report", "Within 5 days"], ["Price", `${fmt(lang, p.plan)} / session`]] },
        coaching: { get: ["A plan for the whole term at the start", "A weekly plan made together every Monday", "A mid-week check-in by message", "A schedule reset at the end of each term"], fit: "You know what needs doing but it keeps slipping, or your online-course deadlines all land in the same week.", facts: [["Format", "20 min a week + messages"], ["Term", "Monthly"], ["Price", `from ${fmt(lang, p.coach)} / month`]] },
      };
  const blocks = services(lang)
    .map((s) => {
      const d = detail[s.id];
      return `<div class="split" id="${s.id}">
  <div><span class="svc-icon">${icon(s.id)}</span><h2>${s.name}</h2><p class="small">${s.tag}</p>
    <dl class="facts">${d.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl></div>
  <div><p>${s.body}</p>
    <h3>${ko ? "받게 되는 것" : "What you get"}</h3>
    <ul>${d.get.map((g) => `<li>${g}</li>`).join("")}</ul>
    <h3>${ko ? "이런 분께 맞아요" : "Good fit if"}</h3>
    <p>${d.fit}</p>${s.id === "planning" ? `<p><a href="degree-plan.html">${ko ? "졸업 설계 자세히 보기" : "How degree planning works"}</a></p>` : ""}</div>
</div>`;
    })
    .join("\n");
  const subjects = ko
    ? ["경영학(Business)", "마케팅(Marketing)", "회계(Accounting)", "재무(Finance)", "경제학(Economics)", "통계(Statistics)", "간호학(Nursing)", "심리학(Psychology)", "교육학(Education)", "컴퓨터 과학(Computer Science)", "사회복지(Social Work)", "영어 작문(English Composition)"]
    : ["Business", "Marketing", "Accounting", "Finance", "Economics", "Statistics", "Nursing", "Psychology", "Education", "Computer science", "Social work", "English composition"];
  return shell({
    lang, page: "services", rel: "services.html",
    title: ko ? "서비스 | 과목 튜터링, 에세이 첨삭, 논문 코칭 | DegreeMate" : "Services | DegreeMate",
    desc: ko ? "유학생을 위한 1:1 과목 튜터링, 에세이 첨삭과 과제 피드백, 논문 코칭, 졸업 경로 설계, 학기 학습 관리." : "1:1 course tutoring, essay and assignment feedback, thesis coaching, degree-completion planning and term check-ins.",
    body: `${pageHead(ko ? "필요한 만큼만 받는 학습 지원" : "Help with the parts that are hard right now", ko ? "영어 에세이와 과제, 어디서부터 손대야 할지 막막하신가요? 다섯 가지 서비스는 따로 받아도 되고 묶어서 받아도 됩니다. 어떤 게 맞을지 모르겠다면 무료 상담에서 같이 정하면 됩니다." : "Not sure where to start on an essay or assignment? Use any of the five services on their own or together. If you're not sure which fits, we can work it out on the free call.")}
<section class="section first"><div class="wrap">
${rings(lang)}
<p class="alert-note">${HOME[lang].alert}</p>
</div></section>
<section class="section"><div class="wrap">
${blocks}
</div></section>
<section class="section tint"><div class="wrap">
  ${head(lang, ko ? "자주 요청받는 과목" : "Subjects we're asked about most", "SUBJECTS", ko ? "목록에 없는 과목도 상담에서 물어봐 주세요. 맞는 튜터가 있는지 확인해 드립니다." : "If yours isn't listed, ask on the call and we'll check whether we have the right tutor.")}
  <ul class="subject-list">${subjects.map((s) => `<li>${s}</li>`).join("")}</ul>
</div></section>`,
  });
}

function degreePlan(lang) {
  const ko = lang === "ko";
  const ledger = ko
    ? `<div class="ledger" id="ledger">
    <div class="ledger-top"><h3>졸업까지 얼마나 남았을까</h3><span>대략적인 계산</span></div>
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
    <div class="meter" aria-hidden="true"><i id="ledger-fill" style="width:50%"></i></div>
    <div class="meter-legend"><span id="ledger-left">남은 학점 60</span><span>필요 학점 <b id="ledger-total">120</b></span></div>
    <div class="result" aria-live="polite">
      <div class="big" id="ledger-big">약 4년</div>
      <p id="ledger-when"></p>
      <p>이전 학점 인정, 학점 인정 시험(CLEP 등), 경력 인정으로 더 줄일 수 있는지는 상담에서 같이 확인합니다.</p>
    </div>
  </div>`
    : `<div class="ledger" id="ledger">
    <div class="ledger-top"><h3>How much is left?</h3><span>Rough estimate</span></div>
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
    <div class="meter" aria-hidden="true"><i id="ledger-fill" style="width:50%"></i></div>
    <div class="meter-legend"><span id="ledger-left">60 credits left</span><span>Needed: <b id="ledger-total">120</b></span></div>
    <div class="result" aria-live="polite">
      <div class="big" id="ledger-big">About 4 years</div>
      <p id="ledger-when"></p>
      <p>On the call we check whether old credits, credit-by-exam (CLEP and similar) or work experience can cut that down.</p>
    </div>
  </div>`;
  return shell({
    lang, page: "degree-plan", rel: "degree-plan.html",
    title: ko ? "졸업 설계 | DegreeMate" : "Degree planning | DegreeMate",
    desc: ko ? "편입, 학점 인정 시험, 경력 인정, 학점은행제, 독학학위제까지 가진 학점으로 가장 짧게 졸업하는 길을 찾아 드립니다." : "Transfer credit, credit by exam, prior learning, Korea's Credit Bank: we find the shortest route to graduating with the credits you have.",
    body: `${pageHead(ko ? "이미 가진 학점부터 세는 졸업 설계" : "A degree plan that starts from what you've already done", ko ? "학위를 빨리 마치려면 이미 해 둔 공부와 경력부터 빠짐없이 인정받는 게 먼저인 경우가 많습니다." : "Often the quickest way to finish is to get credit for the coursework and work experience you already have.")}
<section class="section first"><div class="wrap">
  <div class="plan-calc">
    <div><h2 class="plain">${ko ? "남은 학점부터 세어 보세요" : "Start by counting what's left"}</h2>
      <p>${ko ? "목표 학위와 지금까지 받은 학점, 일주일에 낼 수 있는 시간을 넣으면 대략 언제 졸업할 수 있는지 계산합니다. 실제 기간은 학교의 학점 인정 범위와 수업 일정에 따라 달라집니다." : "Enter your degree, the credits you have and the hours you can spare each week to get a rough finish date. The real timeline depends on what your school accepts and how its terms run."}</p></div>
    ${ledger}
  </div>
</div></section>
<section class="section"><div class="wrap">
  ${head(lang, ko ? "같이 검토하는 경로" : "Routes we look at", "ROUTES")}
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
  ${head(lang, ko ? "설계는 이렇게 진행됩니다" : "How a planning session runs", "PROCESS")}
  <ol class="steps">
    <li><h3>${ko ? "서류 모으기" : "Gather records"}</h3><p>${ko ? "성적표, 자격증, 경력 사항을 보내 주세요. 비공식 성적표도 괜찮습니다." : "Send transcripts, certificates and a work history. Unofficial transcripts are fine."}</p></li>
    <li><h3>${ko ? "학점 정리" : "Credit audit"}</h3><p>${ko ? "인정될 가능성이 높은 학점과 애매한 학점을 나눠 표로 정리합니다." : "We sort your credits into likely to count and needs checking."}</p></li>
    <li><h3>${ko ? "경로 비교" : "Compare routes"}</h3><p>${ko ? "60분 상담에서 학교와 경로별 기간, 비용을 나란히 놓고 봅니다." : "On a 60-minute call we lay out each route's time and cost side by side."}</p></li>
    <li><h3>${ko ? "실행 일정" : "Action plan"}</h3><p>${ko ? "지원 마감, 시험 날짜, 서류 목록을 날짜순으로 정리한 보고서를 드립니다." : "You get a report with deadlines, exam dates and documents in date order."}</p></li>
  </ol>
</div></section>`,
  });
}

function tutorsPage(lang) {
  const ko = lang === "ko";
  const match = ko
    ? [["과목", "수업 이름과 과제 안내문을 보고 그 과목을 전공했거나 그 분야에서 일하는 튜터를 찾습니다."], ["시간대", "한국 시간, 미국 시간 중 세션이 가능한 시간을 맞춥니다."], ["언어", "설명은 한국어로, 쓰는 연습은 영어로 하는 게 기본입니다. 원하면 영어로만 진행합니다."], ["교체", "첫 세션이 맞지 않으면 비용 없이 다른 튜터를 연결하고, 그 뒤에도 언제든 바꿀 수 있습니다."]]
    : [["Subject", "We read your course name and assignment brief and find a tutor who studied the subject or works in the field."], ["Hours", "We find times that work in Korea or U.S. time."], ["Language", "By default you hear explanations in Korean and practice writing in English. English-only is fine too."], ["Switching", "If the first session isn't a fit, we match you with someone else at no cost, and you can switch any time after that."]];
  const shows = ko ? ["학위와 전공", "졸업한 학교", "담당 과목", "가르친 경력", "세션 언어"] : ["Degree and major", "School", "Subjects", "Teaching experience", "Session languages"];
  return shell({
    lang, page: "tutors", rel: "tutors.html",
    title: ko ? "튜터 | DegreeMate" : "Tutors | DegreeMate",
    desc: ko ? "과목별 담당 튜터를 배정합니다. 튜터마다 학위, 학교, 담당 과목, 경력을 공개합니다." : "Each subject gets its own tutor. Every tutor's degree, school, subjects and experience is listed.",
    body: `${pageHead(ko ? "과목별 담당 튜터가 함께합니다" : "A tutor for your subject", ko ? "튜터는 해당 과목을 전공했거나 그 분야에서 일하는 사람으로 연결합니다. 정식 오픈 때 튜터마다 학위, 학교, 담당 과목, 경력을 공개합니다." : "Tutors either studied the subject they teach or work in the field. At full launch every tutor's degree, school, subjects and experience will be listed here.")}
<section class="section first"><div class="wrap">
  ${head(lang, ko ? "튜터 프로필" : "Tutor profiles", "PROFILES", ko ? "프로필은 준비 중입니다. 지금 상담을 신청하시면 과목에 맞는 튜터의 이력을 먼저 보내 드립니다." : "Profiles are on the way. If you book a call now, we'll send you the background of the tutor who fits your subject first.")}
  ${tutorCards(lang)}
</div></section>
<section class="section tint"><div class="wrap">
  ${head(lang, ko ? "튜터 배정 방식" : "How we match tutors", "MATCHING")}
  <dl class="match">${match.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
</div></section>
<section class="section"><div class="wrap">
  ${head(lang, ko ? "프로필에 공개하는 것" : "What each profile shows", "PROFILE", ko ? "학교 이름이나 학위를 내세우기보다, 어떤 과목을 어떤 배경으로 가르치는지 확인할 수 있게 적습니다." : "The point isn't to show off schools. It's so you can see what each tutor teaches and the background behind it.")}
  <ul class="subject-list center">${shows.map((s) => `<li>${s}</li>`).join("")}</ul>
</div></section>`,
  });
}

function pricing(lang) {
  const ko = lang === "ko";
  const p = PRICE[lang];
  const est = `<span class="est">${UI[lang].est}</span>`;
  const rows = priceRows(lang);
  const caps = ko ? ["튜터링과 학습 관리", "글쓰기와 논문", "상담과 졸업 설계"] : ["Tutoring and check-ins", "Writing and thesis", "Consultation and degree planning"];
  const tableHtml = caps.map((cap, g) => priceTable(lang, rows.filter((r) => r.group === g), cap)).join("\n");
  const opt = (id, label, rate, unit, unitLabel, min, max, step, per, note, speed) =>
    `<option value="${id}" data-rate="${rate}" data-unit="${unit}" data-unit-label="${unitLabel}" data-min="${min}" data-max="${max}" data-step="${step}" data-per="${per}" data-speed="${speed ? 1 : 0}" data-note="${note}">${label}</option>`;
  const options = ko
    ? [
        opt("tutoring", "1:1 과목 튜터링", p.tutor, "회", "세션 수", 1, 30, 1, 1, `10회 묶음으로 사면 1회 ${fmt(lang, p.tutor10 / 10)} 꼴입니다.`),
        opt("writing", "에세이 첨삭과 과제 피드백", p.write, "단어", "글 분량", 500, 15000, 500, 1000, "영어 기준 단어 수입니다. 한글 글은 상담에서 따로 안내합니다.", true),
        opt("thesis", "논문 코칭", p.thesis, "개월", "기간", 1, 12, 1, 1, "보통 석사 논문은 4~8개월 정도 코칭을 받습니다."),
        opt("coaching", "학기 학습 관리", p.coach, "개월", "기간", 1, 12, 1, 1, "한 학기 단위(4개월)로 시작하는 분이 많습니다."),
      ]
    : [
        opt("tutoring", "1:1 course tutoring", p.tutor, "sessions", "Sessions", 1, 30, 1, 1, `A 10-session pack brings it to ${fmt(lang, p.tutor10 / 10)} a session.`),
        opt("writing", "Essay and assignment feedback", p.write, "words", "Length", 500, 15000, 500, 1000, "Word count of the draft you send us.", true),
        opt("thesis", "Thesis coaching", p.thesis, "months", "Duration", 1, 12, 1, 1, "Master's theses usually take four to eight months of coaching."),
        opt("coaching", "Term check-ins", p.coach, "months", "Duration", 1, 12, 1, 1, "Most people start with one term, about four months."),
      ];
  return shell({
    lang, page: "pricing", rel: "pricing.html",
    title: ko ? "가격 | DegreeMate" : "Pricing | DegreeMate",
    desc: ko ? "DegreeMate 과목 튜터링, 에세이 첨삭, 논문 코칭, 졸업 설계 가격표와 포함 내용, 환불 정책, 예상 비용 계산기." : "DegreeMate prices for tutoring, essay feedback, thesis coaching and degree planning, what each includes, the refund policy and a cost estimator.",
    body: `${pageHead(ko ? "가격은 전부 공개합니다" : "Every price, up front", ko ? "상담을 해야만 알 수 있는 가격은 없습니다. 아래 금액은 정식 오픈 전 예상가이고, 실제 금액은 상담 후 계획서에 적어 드립니다." : "You can see every price before you talk to us. These are pre-launch estimates, and your plan will list the exact amount.")}
<section class="section first"><div class="wrap">
  <div class="sec-head left"><h2>${ko ? "가격표" : "Price list"} ${est}</h2><p>${ko ? "석사 과정은 튜터링과 첨삭이 20% 더 붙습니다." : "Master's-level tutoring and feedback cost 20% more."}</p></div>
${tableHtml}
</div></section>
<section class="section" id="refund"><div class="wrap">
  <div class="refund big"><h2>${ko ? "환불 정책" : "Refund policy"} ${est}</h2><ul>${refundItems(lang).map((t) => `<li>${t}</li>`).join("")}</ul>
  <p class="small">${ko ? "정책 세부 내용은 정식 오픈 때 확정해서 이 자리에 올립니다." : "The final policy will be confirmed and posted here at full launch."}</p></div>
</div></section>
<section class="section tint"><div class="wrap">
  <div class="sec-head left"><h2>${ko ? "예상 비용 계산" : "Estimate your cost"} ${est}</h2></div>
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
</div></section>`,
  });
}

function reviewsPage(lang) {
  const ko = lang === "ko";
  return shell({
    lang, page: "reviews", rel: "reviews.html",
    title: ko ? "후기 | DegreeMate" : "Reviews | DegreeMate",
    desc: ko ? "DegreeMate 후기와 후기 정책. 실제 이용자가 동의한 후기만 날짜, 이용한 서비스와 함께 올립니다." : "DegreeMate reviews and review policy: real, consented and dated.",
    body: `${pageHead(ko ? "후기" : "Reviews", ko ? "실제 이용자가 동의한 후기만, 날짜와 이용한 서비스를 함께 올립니다." : "Only real reviews, posted with consent, with the date and the service used.")}
<section class="section first"><div class="wrap">
  ${reviewList(lang)}
</div></section>
<section class="section tint" id="policy"><div class="wrap">
  ${head(lang, ko ? "후기 정책" : "Review policy", "POLICY")}
  <ul class="checklist">${reviewPolicy(lang).map((t) => `<li>${t}</li>`).join("")}</ul>
</div></section>`,
  });
}

function about(lang) {
  const ko = lang === "ko";
  return shell({
    lang, page: "about", rel: "about.html",
    title: ko ? "소개 | DegreeMate" : "About | DegreeMate",
    desc: ko ? "DegreeMate는 원비전컨설팅의 학습 지원 브랜드입니다. 운영 방식과 학업 윤리 원칙을 소개합니다." : "DegreeMate is OneVision Consulting's study-support brand. How we work and our academic-integrity rules.",
    body: `${pageHead(ko ? "DegreeMate는 이렇게 일합니다" : "Who we are and how we work", ko ? "DegreeMate는 미국 유학과 이민 상담을 해 온 원비전컨설팅이 새로 만든 학습 지원 브랜드입니다. 유학생과 일하면서 공부하는 분들이 학위를 끝까지 마치도록 돕습니다." : "DegreeMate is a new study-support brand from OneVision Consulting, which advises Korean families on U.S. study and immigration. We help international students and people who work while they study finish their degree.")}
<section class="section first"><div class="wrap">
  <div class="split"><div><h2>${ko ? "운영 방식" : "How we work"}</h2></div><div>
    <ul>
      <li>${ko ? "튜터는 해당 과목을 전공했거나 현업에서 일하는 사람으로 연결합니다." : "Tutors either studied the subject they teach or work in the field."}</li>
      <li>${ko ? "상담과 세션은 한국어, 영어 중 편한 언어로 합니다." : "Sessions run in English or Korean, whichever you prefer."}</li>
      <li>${ko ? "보내 주신 글과 성적표는 담당 튜터만 보고, 다른 용도로 쓰지 않습니다." : "Only your tutor sees the writing and transcripts you send, and we don't use them for anything else."}</li>
      <li>${ko ? "진행 상황은 단계마다 공유하고, 세션 기록은 언제든 다시 볼 수 있게 남겨 둡니다." : "We share progress at every stage, and session notes are kept so you can look back at them any time."}</li>
    </ul></div></div>
  <div class="split"><div><h2>${ko ? "튜터" : "Tutors"}</h2></div><div>
    <p>${ko ? "튜터 프로필은 정식 오픈과 함께 올라옵니다. 지금 상담을 신청하시면 과목에 맞는 튜터의 이력을 먼저 보내 드립니다." : "Tutor profiles go up when the full site launches. If you book a call now, we'll send you the background of the tutor who fits your subject first."}</p>
    <p><a href="tutors.html">${ko ? "튜터 배정 방식 보기" : "How we match tutors"}</a></p></div></div>
  <div class="split" id="integrity"><div><h2>${ko ? "학업 윤리 원칙" : "Academic integrity"}</h2></div><div>
    <p>${ko ? "외부 튜터링과 첨삭은 대부분의 학교에서 허용되지만, 범위는 학교와 수업마다 다릅니다. 과제 안내문이나 학교 규정에 외부 도움 제한이 있다면 그 기준을 따릅니다. AI 도구 사용도 학교 규정을 먼저 확인하고 안내합니다. 애매하면 담당 교수에게 먼저 확인하도록 안내합니다." : "Most schools allow outside tutoring and editing feedback, but the limits vary by school and by course. If an assignment or your school's policy restricts outside help, we follow it. The same goes for AI tools: we check your school's rules first. When it's unclear, we'll ask you to check with your instructor."}</p>
    <p>${ko ? "아래 일은 요청을 받아도 하지 않으며, 요청이 반복되면 서비스를 중단합니다." : "We won't do the following even if asked, and repeated requests end the service."}</p>
  </div></div>
  <div class="integrity-wrap">${integrity(lang)}</div>
</div></section>`,
  });
}

function faq(lang) {
  const ko = lang === "ko";
  return shell({
    lang, page: "faq", rel: "faq.html",
    title: ko ? "자주 묻는 질문 | DegreeMate" : "FAQ | DegreeMate",
    desc: ko ? "DegreeMate 서비스 범위, AI 도구와 학업 윤리, 일정, 비용에 대해 자주 묻는 질문." : "Common questions about DegreeMate's services, AI tools and academic integrity, scheduling and payment.",
    body: `${pageHead(ko ? "자주 묻는 질문" : "Common questions", ko ? "여기 없는 질문은 카카오톡이나 상담 신청 양식으로 남겨 주세요." : "If your question isn't here, send it on KakaoTalk or through the contact form.")}
<section class="section first"><div class="wrap"><div class="faq">
${faqItems(lang).map(faqHtml).join("\n")}
</div></div></section>`,
  });
}

function contact(lang) {
  const ko = lang === "ko";
  const u = UI[lang];
  const needs = ko
    ? ["과목 튜터링", "에세이 첨삭", "논문 코칭", "졸업 설계", "학기 학습 관리", "아직 모르겠어요"]
    : ["Tutoring", "Essay feedback", "Thesis coaching", "Degree planning", "Term check-ins", "Not sure yet"];
  const kakaoVal = CONTACT.kakaoUrl
    ? `<a href="${CONTACT.kakaoUrl}" target="_blank" rel="noopener">${CONTACT.kakaoId || u.band.open}</a>`
    : CONTACT.kakaoId || (ko ? "개설 준비 중입니다. 지금은 오른쪽 양식으로 남겨 주세요." : "Channel coming soon. For now, please use the form.");
  return shell({
    lang, page: "contact", rel: "contact.html", band: false,
    title: ko ? "무료 상담 신청 | DegreeMate" : "Book a free call | DegreeMate",
    desc: ko ? "15분 무료 상담을 신청하세요. 영업일 하루 안에 연락드립니다." : "Book a free 15-minute call. We reply within one business day.",
    body: `${pageHead(ko ? "15분 무료 상담 신청" : "Book a free 15-minute call", ko ? "아는 만큼만 적어 주셔도 됩니다. 영업일 하루 안에 편한 방법으로 연락드릴게요." : "Fill in what you know. We'll get back to you within one business day, using the contact details you leave.")}
<section class="section first"><div class="wrap"><div class="contact">
  <div>
    <div class="kakao-box" id="kakao">
      <h2>${KAKAO_ICON}${ko ? "카카오톡 상담" : "KakaoTalk"}</h2>
      <dl>
        <div><dt>${u.band.id}</dt><dd>${kakaoVal}</dd></div>
        <div><dt>${u.band.hours}</dt><dd>${CONTACT.hours[lang] || u.tbd}</dd></div>
        <div><dt>${u.band.reply}</dt><dd>${CONTACT.reply[lang]}</dd></div>
      </dl>
    </div>
    <h2 class="plain">${ko ? "상담 전에 알아 두면 좋은 것" : "Before the call"}</h2>
    <ul class="ways">
      <li><strong>${ko ? "상담 시간" : "Length"}</strong>${ko ? "15분, 카카오톡이나 전화 또는 화상" : "15 minutes, by KakaoTalk, phone or video"}</li>
      <li><strong>${ko ? "준비하면 좋은 것" : "Helpful to have"}</strong>${ko ? "다니는 학교나 프로그램 이름, 과제 안내문이나 수업 계획서, 가장 급한 마감" : "Your school or program, the assignment brief or syllabus, and your most urgent deadline"}</li>
      <li><strong>${ko ? "비용" : "Cost"}</strong>${ko ? "상담은 무료이고, 상담 후 결제할 의무가 없습니다." : "The call is free, and there's no obligation to buy anything."}</li>
    </ul>
  </div>
  <form id="consult" novalidate>
    <div class="field"><label for="f-name">${ko ? "이름" : "Name"}</label><input id="f-name" name="name" autocomplete="name" data-label="${ko ? "이름" : "Name"}" required></div>
    <div class="field"><label for="f-contact">${ko ? "연락처" : "How to reach you"}</label><input id="f-contact" name="contact" data-label="${ko ? "연락처" : "Contact"}" placeholder="${ko ? "이메일, 전화번호 또는 카카오톡 ID" : "Email, phone or KakaoTalk ID"}" required></div>
    <div class="field"><label for="f-stage">${ko ? "지금 상황" : "Where you are now"}</label><select id="f-stage" name="stage" data-label="${ko ? "지금 상황" : "Stage"}">
      ${(ko ? ["미국 학부 재학 중", "미국 대학원 재학 중", "휴학 중 또는 멈춘 상태", "입학 전, 알아보는 중", "학점은행제 이용 중", "기타"] : ["U.S. undergraduate, enrolled", "U.S. graduate school, enrolled", "On a break or stalled", "Not enrolled yet, looking", "Using Korea's Credit Bank", "Other"]).map((o) => `<option>${o}</option>`).join("")}</select></div>
    <div class="field"><label for="f-school">${ko ? "학교 또는 프로그램 (선택)" : "School or program (optional)"}</label><input id="f-school" name="school" data-label="${ko ? "학교/프로그램" : "School/program"}"></div>
    <div class="field full"><span class="label" id="needs-label">${ko ? "필요한 도움 (여러 개 선택 가능)" : "What you need (pick any)"}</span>
      <div class="checks" role="group" aria-labelledby="needs-label">${needs.map((n, i) => `<label><input type="checkbox" name="need${i}" value="${n}" data-label="${ko ? "필요한 도움" : "Needs"}">${n}</label>`).join("")}</div></div>
    <div class="field"><label for="f-when">${ko ? "가장 급한 마감이나 시작하고 싶은 시기" : "Nearest deadline or when you'd like to start"}</label><input id="f-when" name="when" data-label="${ko ? "마감/시작 시기" : "Deadline/start"}"></div>
    <div class="field"><label for="f-lang">${ko ? "상담 언어" : "Language for the call"}</label><select id="f-lang" name="lang" data-label="${ko ? "상담 언어" : "Language"}"><option>${ko ? "한국어" : "English"}</option><option>${ko ? "영어" : "Korean"}</option></select></div>
    <div class="field full"><label for="f-msg">${ko ? "하고 싶은 말 (선택)" : "Anything else (optional)"}</label><textarea id="f-msg" name="message" data-label="${ko ? "메시지" : "Message"}"></textarea></div>
    <input class="hp" name="_hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div class="full"><button class="btn dark lg" type="submit">${ko ? "상담 신청 보내기" : "Send request"}</button></div>
    <p class="form-status" role="status"></p>
  </form>
</div></div></section>`,
  });
}

// -------------------------------------------------------------------- blog
const postCta = (lang, up) => {
  const ko = lang === "ko";
  const kakao = CONTACT.kakaoUrl ? `<a class="btn kakao" href="${CONTACT.kakaoUrl}" target="_blank" rel="noopener">${KAKAO_ICON}${UI[lang].kakaoBtn}</a>` : "";
  return `<aside class="post-cta">
  <h2>${ko ? "직접 쓴 글로 같이 연습해 보고 싶다면" : "Want to practice on your own writing?"}</h2>
  <p>${ko ? "15분 무료 상담에서 지금 쓰는 과제와 마감을 알려 주세요. 이틀 안에 계획서와 예상 비용을 보내 드립니다." : "Tell us about the assignment and deadline on a free 15-minute call. Within two days you'll get a plan and an estimated cost."}</p>
  <div class="kb-actions"><a class="btn dark" href="${up}contact.html">${ko ? "무료 상담 신청" : "Book a free call"}</a>${kakao}</div>
</aside>`;
};

function blogIndex(lang) {
  const ko = lang === "ko";
  return shell({
    lang, depth: 1, page: "blog", rel: "blog/",
    title: ko ? "블로그 | 영어 에세이 쓰는 법, 출처 표기 | DegreeMate" : "Blog | DegreeMate",
    desc: ko ? "영어 에세이 쓰는 법, 패러프레이징과 출처 표기, 과제 AI 사용 규정처럼 유학생이 자주 막히는 것들을 정리합니다." : "How to write English essays, paraphrase and cite, and check AI rules: the things students most often get stuck on.",
    body: `${pageHead(ko ? "블로그" : "Blog", ko ? "영어 에세이, 출처 표기, 학교 규정처럼 공부하면서 자주 막히는 것들을 정리합니다." : "Notes on the things students most often get stuck on: English essays, citation and school rules.")}
<section class="section first"><div class="wrap">
  <ul class="post-list">${POSTS.map((p) => `<li><time datetime="${p.date}">${dateText(lang, p.date)}</time><h2><a href="${p.slug}.html">${p[lang].title}</a></h2><p>${p[lang].desc}</p></li>`).join("")}</ul>
</div></section>`,
  });
}

function blogPost(lang, post) {
  const ko = lang === "ko";
  const p = post[lang];
  const others = POSTS.filter((x) => x.slug !== post.slug);
  return shell({
    lang, depth: 1, page: "blog-post", rel: `blog/${post.slug}.html`,
    title: `${p.title} | DegreeMate`, desc: p.desc,
    body: `<article class="post">
  <header class="post-head">
    <p class="post-cat"><a href="./">${ko ? "블로그" : "Blog"}</a></p>
    <h1>${p.title}</h1>
    <p class="post-meta"><time datetime="${post.date}">${dateText(lang, post.date)}</time> <span aria-hidden="true">/</span> DegreeMate</p>
  </header>
  <div class="post-body">${p.body}
  ${postCta(lang, "../")}
  </div>
</article>
<section class="section"><div class="wrap">
  ${head(lang, ko ? "다른 글" : "More posts", "BLOG")}
  <ul class="post-list compact">${others.map((x) => `<li><time datetime="${x.date}">${dateText(lang, x.date)}</time><h2><a href="${x.slug}.html">${x[lang].title}</a></h2><p>${x[lang].desc}</p></li>`).join("")}</ul>
</div></section>`,
  });
}

// ------------------------------------------------------------------ write
const RENDER = { index: home, services: servicesPage, "degree-plan": degreePlan, tutors: tutorsPage, pricing, reviews: reviewsPage, about, faq, contact };
let count = 0;
for (const lang of ["ko", "en"]) {
  const dir = lang === "ko" ? OUT : path.join(OUT, "en");
  fs.mkdirSync(path.join(dir, "blog"), { recursive: true });
  for (const page of PAGES) {
    fs.writeFileSync(path.join(dir, page + ".html"), RENDER[page](lang));
    count++;
  }
  fs.writeFileSync(path.join(dir, "blog", "index.html"), blogIndex(lang));
  count++;
  for (const post of POSTS) {
    fs.writeFileSync(path.join(dir, "blog", post.slug + ".html"), blogPost(lang, post));
    count++;
  }
}
console.log(`DegreeMate: wrote ${count} pages to public_html/degreemate/`);
