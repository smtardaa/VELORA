// components/packages.js — Paketler bölümü: sayfalı (paged) kart slider'ı.
//
// Davranış (kesin):
//  - Desktop  (>1024px) : aynı anda 3 kart, toplam 2 sayfa (1-2-3 / 4-5-6)
//  - Tablet   (481-1024): aynı anda 2 kart, toplam 3 sayfa
//  - Mobile   (<=480px) : aynı anda 1 kart, toplam 6 sayfa
// Sayfa geçişleri ok butonları, alt nokta (dot) göstergesi ve mobilde
// touch/swipe ile yapılabilir. Sonsuz döngü yoktur: ilk sayfada "geri",
// son sayfada "ileri" oku pasif hale gelir.

import { packagesData } from "../data/packages.js";
import { icon } from "../js/icons.js";
import { debounce, escapeHtml } from "../js/utils.js";

function getCardsPerView() {
  const width = window.innerWidth;
  if (width <= 480) return 1;
  if (width <= 1024) return 2;
  return 3;
}

function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function renderCard(pkg) {
  return `
    <article class="card package-card${pkg.highlighted ? " is-highlighted" : ""}">
      ${pkg.badge ? `<span class="package-badge">${escapeHtml(pkg.badge)}</span>` : ""}
      <h3 class="package-name">${escapeHtml(pkg.name)}</h3>
      <p class="package-description">${escapeHtml(pkg.description)}</p>
      <ul class="package-features">
        ${pkg.features
          .map((feature) => `<li>${icon("check")}<span>${escapeHtml(feature)}</span></li>`)
          .join("")}
      </ul>
      <a href="#iletisim" class="btn ${pkg.highlighted ? "btn-primary" : "btn-secondary"} btn-block">
        ${escapeHtml(pkg.cta)}
      </a>
    </article>
  `;
}

export function initPackagesSlider({ sliderEl, trackEl, prevBtn, nextBtn, dotsEl }) {
  if (!sliderEl || !trackEl || !prevBtn || !nextBtn || !dotsEl) return;

  let cardsPerView = getCardsPerView();
  let pages = chunk(packagesData, cardsPerView);
  let currentPage = 0;

  function renderTrack() {
    trackEl.innerHTML = pages
      .map(
        (pageItems) => `
          <div class="slider-page">
            <div class="grid packages-grid" style="--packages-per-view:${cardsPerView}">
              ${pageItems.map(renderCard).join("")}
            </div>
          </div>
        `
      )
      .join("");
  }

  function renderDots() {
    dotsEl.innerHTML = pages
      .map(
        (_, index) => `
          <button class="slider-dot" type="button" data-page="${index}" aria-label="Paket grubu ${index + 1}"></button>
        `
      )
      .join("");
  }

  function update() {
    const offset = currentPage * 100;
    trackEl.style.transform = `translateX(-${offset}%)`;

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === pages.length - 1;
    prevBtn.setAttribute("aria-disabled", String(prevBtn.disabled));
    nextBtn.setAttribute("aria-disabled", String(nextBtn.disabled));

    dotsEl.querySelectorAll(".slider-dot").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentPage);
      dot.setAttribute("aria-current", index === currentPage ? "true" : "false");
    });

    // Tek sayfalık gruplarda (mobil) dot göstergesini gizlemeye gerek yok;
    // ancak tek sayfa varsa (ör. çok geniş ekranlarda) kontrolleri gizle.
    const hasMultiplePages = pages.length > 1;
    sliderEl.classList.toggle("has-single-page", !hasMultiplePages);
  }

  function goToPage(index) {
    currentPage = Math.max(0, Math.min(index, pages.length - 1));
    update();
  }

  function rebuild({ preserveItem = true } = {}) {
    const firstVisibleItemIndex = preserveItem ? currentPage * cardsPerView : 0;

    cardsPerView = getCardsPerView();
    pages = chunk(packagesData, cardsPerView);

    const newPage = Math.floor(firstVisibleItemIndex / cardsPerView);
    currentPage = Math.max(0, Math.min(newPage, pages.length - 1));

    renderTrack();
    renderDots();
    update();
  }

  prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
  nextBtn.addEventListener("click", () => goToPage(currentPage + 1));

  dotsEl.addEventListener("click", (event) => {
    const dot = event.target.closest(".slider-dot");
    if (!dot) return;
    goToPage(Number(dot.dataset.page));
  });

  // Klavye ile ok tuşlarıyla gezinme (slider odaktayken).
  sliderEl.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") goToPage(currentPage + 1);
    if (event.key === "ArrowLeft") goToPage(currentPage - 1);
  });

  // Touch / swipe desteği (mobil ve dokunmatik trackpad'ler için).
  let touchStartX = null;
  const SWIPE_THRESHOLD = 40;

  trackEl.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );

  trackEl.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null) return;
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX < 0) goToPage(currentPage + 1);
        else goToPage(currentPage - 1);
      }
      touchStartX = null;
    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    debounce(() => {
      const nextCardsPerView = getCardsPerView();
      if (nextCardsPerView !== cardsPerView) {
        rebuild();
      }
    }, 150)
  );

  renderTrack();
  renderDots();
  update();
}
