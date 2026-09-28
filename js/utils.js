// js/utils.js — küçük, tekrar kullanılabilir yardımcı fonksiyonlar

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(String(value).trim());
}

export function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

export function debounce(fn, delay = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

// setYear(selector) — footer'daki telif yılı span'ini günceller. Hem
// ana sayfa (js/main.js) hem de calismalarimiz.html (js/worksPage.js)
// aynı footer'ı kullandığı için burada paylaşılan tek bir yerde tutulur.
export function setYear(selector = "#current-year") {
  const el = qs(selector);
  if (el) el.textContent = new Date().getFullYear();
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// trapFocus(container) — "role=dialog" aria-modal="true" olan overlay'ler
// (arama ve paket iletişim popup'ı) için paylaşılan klavye odak tuzağı.
// Overlay açıkken Tab/Shift+Tab döngüsünün yalnızca overlay içinde
// kalmasını sağlar; aksi halde klavye kullanıcıları görünmez şekilde
// arka plandaki sayfa içeriğine geçebiliyordu. Döndürülen fonksiyon
// dinleyiciyi kaldırır (overlay kapanınca çağrılmalıdır).
export function trapFocus(container) {
  function handleKeydown(event) {
    if (event.key !== "Tab") return;

    const focusable = qsa(FOCUSABLE_SELECTOR, container).filter(
      (el) => el.offsetParent !== null
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  container.addEventListener("keydown", handleKeydown);
  return () => container.removeEventListener("keydown", handleKeydown);
}
