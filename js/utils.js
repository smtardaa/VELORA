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

// applyInitialScrollPosition() — sayfa açılışındaki kaydırma konumunu
// belirler. Her sayfa giriş noktası (js/main.js, js/worksPage.js,
// js/staticPage.js) bunu dinamik içerik render edildikten SONRA çağırır.
//  - URL'de hash yoksa: sayfa her zaman en üstten başlar (tarayıcının
//    yenilemede eski kaydırma konumunu geri yüklemesi kapatılır).
//  - URL'de geçerli bir hash varsa (ör. index.html#paketler,
//    calismalarimiz.html#lumen-kahve): hedef öğeye gidilir. Hedef içerik
//    JS ile sonradan üretildiği için (proje detayları, paketler vb.)
//    tarayıcının kendi ilk kaydırması yanlış konumda kalabileceğinden,
//    render sonrası ve bir sonraki karede konum tekrar hedefe hizalanır
//    (scroll-margin-top değerleri korunur).
export function applyInitialScrollPosition() {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  let id = window.location.hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch (error) {
    // Hatalı kodlanmış hash: olduğu gibi kullanılır.
  }
  const target = id ? document.getElementById(id) : null;

  const jump = () => {
    try {
      if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch (error) {
      // "instant" desteklenmeyen eski tarayıcılar için sade yedek.
      if (target) target.scrollIntoView(true);
      else window.scrollTo(0, 0);
    }
  };

  jump();
  window.requestAnimationFrame(jump);
}
