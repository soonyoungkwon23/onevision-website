function loadHeader() {
  const headerElement = document.querySelector("header");
  // Blog pages ship with the header baked into the HTML (SEO: crawlers see
  // real links). Skip fetching so a relative 404 never replaces it.
  if (headerElement && headerElement.children.length === 0) {
    fetch("header.html?v=20260520")
      .then((response) => response.text())
      .then((data) => {
        headerElement.innerHTML = data;
      });
  }
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
    fetch("footer.html?v=20260520")
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

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();

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
