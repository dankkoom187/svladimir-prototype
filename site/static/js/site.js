/* svladimir.ru — минимальный JS: меню, фильтры, пресеты сумм, печать. */
(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    var label = toggle.querySelector(".visually-hidden");

    var close = function () {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      if (label) label.textContent = "Открыть меню";
    };

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("nav-open", !isOpen);
      if (label) label.textContent = isOpen ? "Открыть меню" : "Закрыть меню";
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
  }

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.querySelectorAll("[data-autosubmit] select").forEach(function (select) {
    select.addEventListener("change", function () {
      if (select.form) select.form.submit();
    });
  });

  var donationForm = document.querySelector("[data-donation-form]");
  if (donationForm) {
    var amountInput = donationForm.querySelector('input[name="amount"]');
    donationForm.querySelectorAll("[data-amount]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (!amountInput) return;
        amountInput.value = button.getAttribute("data-amount");
        donationForm.querySelectorAll("[data-amount]").forEach(function (other) {
          other.setAttribute("aria-pressed", String(other === button));
        });
        amountInput.focus();
      });
    });
  }

  document.querySelectorAll("[data-print]").forEach(function (button) {
    button.addEventListener("click", function () {
      window.print();
    });
  });
})();
