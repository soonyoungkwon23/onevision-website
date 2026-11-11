// DegreeMate: mobile menu, the credit ledger on the degree-plan page, the price
// estimator on the pricing page and the consultation form. No dependencies.
(function () {
  "use strict";
  var lang = document.documentElement.lang === "en" ? "en" : "ko";
  var T = {
    ko: {
      months: function (n) { return "약 " + n + "개월"; },
      years: function (y, m) { return "약 " + y + "년" + (m ? " " + m + "개월" : ""); },
      done: "이미 졸업 요건을 채웠어요",
      finish: function (d) { return d.getFullYear() + "년 " + (d.getMonth() + 1) + "월쯤 졸업"; },
      pace: function (c, cap) { return "한 해 " + c + "학점 페이스" + (cap ? " (학점은행제 연간 상한 42학점 적용)" : ""); },
      left: function (n) { return "남은 학점 " + n; },
      won: function (n) { return n.toLocaleString("ko-KR") + "원"; },
      sending: "보내는 중입니다...",
      sent: "접수됐습니다. 영업일 하루 안에 연락드릴게요.",
      failed: "전송하지 못했습니다. 잠시 후 다시 시도하시거나 이메일로 보내 주세요.",
      need: "이름과 연락처를 적어 주세요.",
      menu: "메뉴", close: "닫기"
    },
    en: {
      months: function (n) { return "About " + n + " months"; },
      years: function (y, m) { return "About " + y + (y === 1 ? " year" : " years") + (m ? " " + m + " mo" : ""); },
      done: "You already meet the credit total",
      finish: function (d) { return "Finish around " + d.toLocaleString("en-US", { month: "long", year: "numeric" }); },
      pace: function (c, cap) { return c + " credits a year at this pace" + (cap ? " (capped at the 42-credit yearly limit)" : ""); },
      left: function (n) { return n + " credits left"; },
      won: function (n) { return "$" + n.toLocaleString("en-US"); },
      sending: "Sending...",
      sent: "Got it. We'll get back to you within one business day.",
      failed: "That didn't go through. Try again in a minute, or email us instead.",
      need: "Please add your name and a way to reach you.",
      menu: "Menu", close: "Close"
    }
  }[lang];

  // Mobile menu
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? T.close : T.menu;
    });
  }

  // Credit ledger. One credit is about 3 hours of work a week over a
  // 15-week term (the classic U.S. credit-hour benchmark: 1 hour in class plus
  // 2 outside), so weekly hours / 3 = credits per term, at three terms a year,
  // which works out to one credit a year per weekly hour.
  var ledger = document.getElementById("ledger");
  if (ledger) {
    var degree = ledger.querySelector("[name=degree]");
    var earned = ledger.querySelector("[name=earned]");
    var hours = ledger.querySelector("[name=hours]");
    var earnedOut = ledger.querySelector("#earned-out");
    var hoursOut = ledger.querySelector("#hours-out");
    var fill = document.getElementById("ledger-fill");
    var total = document.getElementById("ledger-total");
    var leftOut = document.getElementById("ledger-left");
    var big = document.getElementById("ledger-big");
    var when = document.getElementById("ledger-when");

    var update = function () {
      var opt = degree.options[degree.selectedIndex];
      var need = +opt.value;
      var capped = opt.getAttribute("data-cap") === "42";
      earned.max = need;
      if (+earned.value > need) earned.value = need;
      var have = +earned.value;
      var h = +hours.value;
      earnedOut.textContent = have;
      hoursOut.textContent = h;
      total.textContent = need;
      fill.style.width = Math.round((have / need) * 100) + "%";
      var left = need - have;
      leftOut.textContent = T.left(left);
      if (left <= 0) { big.textContent = T.done; when.textContent = ""; return; }
      var perYear = Math.floor(h / 3) * 3;
      if (capped) perYear = Math.min(perYear, 42);
      var months = Math.ceil((left / perYear) * 12);
      var y = Math.floor(months / 12), m = months % 12;
      big.textContent = months < 24 ? T.months(months) : T.years(y, m);
      var d = new Date(); d.setMonth(d.getMonth() + months);
      when.textContent = T.finish(d) + ". " + T.pace(perYear, capped && Math.floor(h / 3) * 3 > 42) + ".";
    };
    [degree, earned, hours].forEach(function (el) { el.addEventListener("input", update); });
    update();
  }

  // Price estimator. Rates come from data-* attributes on each option so the
  // numbers live in one place in the HTML.
  var calc = document.getElementById("calc");
  if (calc) {
    var service = calc.querySelector("[name=service]");
    var level = calc.querySelector("[name=level]");
    var qty = calc.querySelector("[name=qty]");
    var speed = calc.querySelector("[name=speed]");
    var speedField = document.getElementById("speed-field");
    var qtyLabel = calc.querySelector("#qty-label");
    var qtyOut = calc.querySelector("#qty-out");
    var priceOut = document.getElementById("calc-price");
    var noteOut = document.getElementById("calc-note");
    var run = function () {
      var o = service.options[service.selectedIndex];
      qty.min = o.getAttribute("data-min");
      qty.max = o.getAttribute("data-max");
      qty.step = o.getAttribute("data-step");
      if (+qty.value < +qty.min) qty.value = qty.min;
      if (+qty.value > +qty.max) qty.value = qty.max;
      qtyLabel.textContent = o.getAttribute("data-unit-label");
      qtyOut.textContent = (+qty.value).toLocaleString() + " " + o.getAttribute("data-unit");
      var fast = o.getAttribute("data-speed") === "1";
      speedField.hidden = !fast;
      var mult = +level.options[level.selectedIndex].getAttribute("data-mult");
      if (fast) mult *= +speed.options[speed.selectedIndex].getAttribute("data-mult");
      var per = +o.getAttribute("data-rate");
      var per1 = +o.getAttribute("data-per") || 1;
      var price = Math.round((per * mult * (+qty.value / per1)) / 1000) * 1000;
      if (lang === "en") price = Math.round(per * mult * (+qty.value / per1));
      priceOut.textContent = T.won(price);
      noteOut.textContent = o.getAttribute("data-note");
    };
    [service, level, speed, qty].forEach(function (el) { el.addEventListener("input", run); });
    run();
  }

  // Consultation form. Posts to OneVision's existing endpoint, which logs the
  // request outside the web root and emails it.
  var form = document.getElementById("consult");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("[name=name]").value.trim();
      var reach = form.querySelector("[name=contact]").value.trim();
      if (!name || !reach) { status.className = "form-status err"; status.textContent = T.need; return; }
      var fields = [];
      form.querySelectorAll("[data-label]").forEach(function (el) {
        var v;
        if (el.type === "checkbox") { if (!el.checked) return; v = el.value; }
        else v = el.value;
        fields.push({ key: el.name, label: el.getAttribute("data-label"), value: v });
      });
      status.className = "form-status"; status.textContent = T.sending;
      fetch("/api/consult.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: "degreemate", lang: lang, page: location.pathname, fields: fields, _hp: form.querySelector("[name=_hp]").value })
      }).then(function (r) { return r.json().then(function (j) { return r.ok && j.ok; }); })
        .then(function (ok) {
          if (!ok) throw new Error("x");
          status.className = "form-status ok"; status.textContent = T.sent; form.reset();
        })
        .catch(function () { status.className = "form-status err"; status.textContent = T.failed; });
    });
  }
})();
