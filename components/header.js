// components/header.js — mobil menü, kaydırmada header stili ve scroll-spy

import { qs, qsa } from "../js/utils.js";
import { setLanguage } from "../js/i18n.js";

export function initHeader() {
  const header = qs(".site-header");
  const menuToggle = qs(".menu-toggle");
  const navLinks = qs(".nav-links");
  const links = qsa(".nav-links a[href^='#']");

  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      qs(".icon-menu", menuToggle)?.classList.toggle("is-open", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        qs(".icon-menu", menuToggle)?.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  // Scroll-spy: aktif bölüme göre nav linkini vurgula
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  // Dil seçimi — 5 dilli (TR/EN/DE/FR/IT) tam çalışan dil dropdown'u.
  // Dropdown'un kendi aç/kapa mekaniği burada kalır; gerçek dil değişimi
  // (çeviri uygulama, localStorage, dinamik bileşenlerin yeniden çizimi)
  // js/i18n.js'deki setLanguage() içinde yapılır.
  const langSwitch = qs(".lang-switch");
  const langTrigger = langSwitch ? qs(".lang-switch-trigger", langSwitch) : null;
  const langOptions = langSwitch ? qsa(".lang-switch-option", langSwitch) : [];

  if (langSwitch && langTrigger) {
    const closeLangSwitch = () => {
      langSwitch.classList.remove("is-open");
      langTrigger.setAttribute("aria-expanded", "false");
    };

    langTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = langSwitch.classList.toggle("is-open");
      langTrigger.setAttribute("aria-expanded", String(isOpen));
    });

    langOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const code = option.dataset.lang;
        if (code) setLanguage(code);
        closeLangSwitch();
        langTrigger.focus();
      });

      option.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          const code = option.dataset.lang;
          if (code) setLanguage(code);
          closeLangSwitch();
          langTrigger.focus();
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!langSwitch.contains(event.target)) closeLangSwitch();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLangSwitch();
    });
  }
}
