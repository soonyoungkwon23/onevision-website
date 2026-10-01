// Points the Korean/English switch at this page's counterpart. Every static page
// exists at /page.html (Korean) and /en/page.html (English). The blog is Korean
// only, so from the blog the switch goes to the English home page.
function setLangSwitch() {
  const link = document.querySelector(".lang-switch");
  if (!link) return;
  const path = location.pathname;
  let target;
  if (/^\/blog(\/|$)/.test(path)) target = "/en/";
  else if (/^\/en(\/|$)/.test(path)) target = path.replace(/^\/en/, "") || "/";
  else target = "/en" + (path === "/" ? "/" : path);
  link.setAttribute("href", target + location.hash);
}

function loadHeader() {
  const headerElement = document.querySelector("header");
  // Blog pages ship with the header baked into the HTML (SEO: crawlers see
  // real links). Skip fetching so a relative 404 never replaces it.
  if (headerElement && headerElement.children.length === 0) {
    fetch("header.html?v=20260930")
      .then((response) => response.text())
      .then((data) => {
        headerElement.innerHTML = data;
        setLangSwitch();
      });
  } else {
    setLangSwitch();
  }
  window.addEventListener("hashchange", setLangSwitch);
  // Scroll-shadow: add .is-scrolled when the page has scrolled
  const onScroll = () => {
    const h = document.querySelector("header");
    if (!h) return;
    if (window.scrollY > 8) h.classList.add("is-scrolled");
    else h.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function loadFooter() {
  const footerElement = document.querySelector("footer");
  if (footerElement && footerElement.children.length > 0) {
    // Baked footer (blog pages) — only refresh the year.
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    return;
  }
  if (footerElement) {
    fetch("footer.html?v=20260930")
      .then((response) => response.text())
      .then((data) => {
        footerElement.innerHTML = data;
        // 푸터가 로드된 직후 연도 업데이트
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      });
  }
}

// 네비게이션 토글 (공통)
function toggleNav() {
  const nav = document.getElementById("navbar");
  const btn = document.querySelector(".nav-toggle");
  if (!nav || !btn) return;

  nav.classList.toggle("nav-open");

  const isOpen = nav.classList.contains("nav-open");
  btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

// 상담 모달 제어 (공통)
function openContact() {
  const modal = document.getElementById("contactModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeContact() {
  const modal = document.getElementById("contactModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ---- Consultation forms --------------------------------------------------
// Forms marked data-consult="<name>" post to /api/consult.php, which logs each
// request and emails it to the OneVision inbox. Messages follow the page
// language (<html lang>).
const CONSULT_TEXT = {
  ko: {
    sending: "보내는 중...",
    sent: "상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.",
    failed: "전송하지 못했습니다. 잠시 후 다시 시도하시거나 onevisionconsulting.info@gmail.com으로 연락해 주세요.",
  },
  en: {
    sending: "Sending...",
    sent: "Your consultation request has been received. We will contact you after reviewing it.",
    failed: "We could not send your request. Please try again shortly, or contact onevisionconsulting.info@gmail.com.",
  },
};

function pageLang() {
  return document.documentElement.lang === "en" ? "en" : "ko";
}

function consultText(key) {
  return CONSULT_TEXT[pageLang()][key];
}

// A field real visitors never see; bots that fill it in are dropped server-side.
function addHoneypot(form) {
  if (!form || form.querySelector('input[name="_hp"]')) return;
  const hp = document.createElement("input");
  hp.type = "text";
  hp.name = "_hp";
  hp.tabIndex = -1;
  hp.autocomplete = "off";
  hp.setAttribute("aria-hidden", "true");
  hp.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;opacity:0";
  form.appendChild(hp);
}

async function submitConsult(form, name) {
  const fields = [];
  form.querySelectorAll("input, select, textarea").forEach((el) => {
    if (["submit", "button", "hidden"].includes(el.type) || el.name === "_hp") return;
    const labelEl = el.id ? form.querySelector(`label[for="${el.id}"]`) : null;
    const label = ((labelEl && labelEl.textContent) || el.getAttribute("aria-label") || el.placeholder || el.name || el.id || "")
      .replace(/\s+/g, " ")
      .trim();
    const value = el.tagName === "SELECT" ? (el.value ? el.options[el.selectedIndex].text : "") : el.value;
    fields.push({ key: el.name || el.id, label, value: (value || "").trim() });
  });
  const hp = form.querySelector('input[name="_hp"]');
  const res = await fetch("/api/consult.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form: name, lang: pageLang(), page: location.pathname, fields, _hp: hp ? hp.value : "" }),
  });
  let json = {};
  try {
    json = await res.json();
  } catch (e) {}
  if (!res.ok || !json.ok) throw new Error("consult request failed");
  return json;
}

function bindConsultForms() {
  addHoneypot(document.getElementById("diagnosisForm"));
  document.querySelectorAll("form[data-consult]").forEach((form) => {
    addHoneypot(form);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      let status = form.querySelector(".consult-status");
      if (!status) {
        status = document.createElement("p");
        status.className = "consult-status";
        status.setAttribute("role", "status");
        form.appendChild(status);
      }
      const label = btn ? btn.textContent : "";
      if (btn) {
        btn.disabled = true;
        btn.textContent = consultText("sending");
      }
      status.textContent = "";
      delete status.dataset.state;
      try {
        await submitConsult(form, form.dataset.consult);
        form.reset();
        status.textContent = consultText("sent");
        status.dataset.state = "sent";
      } catch (err) {
        status.textContent = consultText("failed");
        status.dataset.state = "failed";
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = label;
        }
      }
    });
  });
}

// Chart rows (.ovc-row, css/site.css): show the row's own text, plus the
// counts behind a rate (data-n), in a tooltip on hover and keyboard focus.
// Built from the visible text, so it is already in the page's language.
function bindChartTips() {
  const rows = document.querySelectorAll(".ovc-row:not(.ovc-axis-row)");
  if (!rows.length) return;
  const tip = document.createElement("div");
  tip.className = "ovc-tip";
  tip.setAttribute("role", "tooltip");
  tip.hidden = true;
  document.body.appendChild(tip);

  const textOf = (row) => {
    let group = row.previousElementSibling;
    while (group && !group.classList.contains("ovc-group")) group = group.previousElementSibling;
    const part = (sel) => {
      const el = row.querySelector(sel);
      return el ? el.textContent.trim() : "";
    };
    const head = group ? group.firstChild.textContent.trim() : "";
    const bits = [head, part(".ovc-label")].filter(Boolean).join(", ");
    const n = row.getAttribute("data-n");
    return `${bits}: ${part(".ovc-value")}${n ? ` (${n})` : ""}`;
  };
  const place = (x, y) => {
    const w = tip.offsetWidth;
    tip.style.left = `${Math.min(x + 14, window.innerWidth - w - 8)}px`;
    tip.style.top = `${y + 16}px`;
  };
  rows.forEach((row) => {
    row.tabIndex = 0;
    const show = (x, y) => {
      tip.textContent = textOf(row);
      tip.hidden = false;
      place(x, y);
    };
    row.addEventListener("pointermove", (e) => show(e.clientX, e.clientY));
    row.addEventListener("pointerleave", () => (tip.hidden = true));
    row.addEventListener("focus", () => {
      const r = row.getBoundingClientRect();
      show(r.left + r.width / 2, r.bottom - 8);
    });
    row.addEventListener("blur", () => (tip.hidden = true));
  });
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  bindConsultForms();
  bindChartTips();

  // 모달 바깥 클릭 시 닫기 이벤트 등록
  const modal = document.getElementById("contactModal");
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === this) closeContact();
    });
  }
});

// ESC 키 입력 시 모달 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeContact();
});
