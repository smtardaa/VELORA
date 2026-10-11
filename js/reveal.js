// js/reveal.js — kaydırma sırasında sıralı görünme (paket kartlarındaki
// animasyon dilinin görünümlerde de kullanılan genel hâli).
//
// createReveal(container, selector): container içindeki öğeler ekrana
// girdikçe kısa bir opaklık/kayma geçişiyle, aynı anda girenler sırayla
// (110ms arayla) görünür. Görünümlerin kendi kaydırma alanları içinde de
// çalışır (IntersectionObserver kırpan kapsayıcıları hesaba katar).
// Hareketi azaltma tercihi açıksa veya IntersectionObserver yoksa hiçbir
// öğe gizlenmez. İçerik yeniden çizildiğinde (ör. dil değişimi) refresh()
// çağrılır; daha önce görünmüş öğeler (id'lerine göre) tekrar gizlenmez.
// Stiller: css/views.css > .reveal-item.

const STEP_MS = 110;

export function createReveal(container, selector) {
  const noop = { refresh() {} };
  if (!container) return noop;
  if (!("IntersectionObserver" in window)) return noop;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return noop;

  const seen = new Set();
  container.classList.add("is-reveal-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target)
        .sort((a, b) => Number(a.dataset.revealOrder) - Number(b.dataset.revealOrder))
        .forEach((el, index) => {
          const delay = index * STEP_MS;
          el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.classList.add("is-revealed");
          seen.add(el.dataset.revealKey);
          observer.unobserve(el);
          window.setTimeout(() => el.style.removeProperty("--reveal-delay"), delay + 600);
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  function refresh() {
    observer.disconnect();
    container.querySelectorAll(selector).forEach((el, index) => {
      const key = el.id || String(index);
      el.classList.add("reveal-item");
      el.dataset.revealOrder = String(index);
      el.dataset.revealKey = key;
      if (seen.has(key)) el.classList.add("is-revealed");
      else observer.observe(el);
    });
  }

  refresh();
  return { refresh };
}
