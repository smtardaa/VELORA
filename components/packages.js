// components/packages.js — Paketler bölümü: SONSUZ (infinite) gruplu kart slider'ı.
//
// Davranış (kesin):
//  - Desktop  (>1024px) : aynı anda 3 kart -> 1-2-3 / 4-5-6 / 1-2-3 / ... (2 grup, sonsuz)
//  - Tablet   (481-1024): aynı anda 2 kart -> 1-2 / 3-4 / 5-6 / 1-2 / ... (3 grup, sonsuz)
//  - Mobile   (<=480px) : aynı anda 1 kart -> 1 / 2 / 3 / 4 / 5 / 6 / 1 / ... (6 grup, sonsuz)
//
// Her ok tıklaması TAM BİR GRUP değiştirir (tek kart kayması olmaz).
// Sonsuzluk, ilk ve son grubun birer "klon"unu track'in başına/sonuna
// ekleyip sınıra ulaşınca (kullanıcı fark etmeden) animasyonsuz bir
// şekilde gerçek gruba geri sarmakla (classic clone-carousel tekniği)
// sağlanır. Otomatik oynatma YOKTUR: yalnızca ok ve swipe ile hareket eder.

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

function renderPageHtml(pageItems, cardsPerView) {
  return `
    <div class="slider-page">
      <div class="grid packages-grid" style="--packages-per-view:${cardsPerView}">
        ${pageItems.map(renderCard).join("")}
      </div>
    </div>
  `;
}

export function initPackagesSlider({ sliderEl, trackEl, prevBtn, nextBtn, dotsEl }) {
  if (!sliderEl || !trackEl || !prevBtn || !nextBtn || !dotsEl) return;

  let cardsPerView = getCardsPerView();
  let realPages = chunk(packagesData, cardsPerView);
  let pageCount = realPages.length;
  // extendedPages = [son grubun klonu, ...gerçek gruplar, ilk grubun klonu]
  let extendedPages = [];
  // currentIndex, extendedPages içindeki konumu gösterir. Gerçek gruplar
  // her zaman [1, pageCount] aralığında; 0 ve pageCount+1 klonlardır.
  let currentIndex = 1;
  let isAnimating = false;

  function buildExtended() {
    extendedPages = pageCount > 1
      ? [realPages[pageCount - 1], ...realPages, realPages[0]]
      : [...realPages];
    currentIndex = pageCount > 1 ? 1 : 0;
  }

  function renderTrack() {
    trackEl.innerHTML = extendedPages
      .map((pageItems) => renderPageHtml(pageItems, cardsPerView))
      .join("");
  }

  function renderDots() {
    dotsEl.innerHTML = realPages
      .map(
        (_, index) => `
          <button class="slider-dot" type="button" data-page="${index}" aria-label="Paket grubu ${index + 1}"></button>
        `
      )
      .join("");
  }

  function activeRealIndex() {
    if (pageCount <= 1) return 0;
    return ((currentIndex - 1) % pageCount + pageCount) % pageCount;
  }

  function setTransform(withTransition) {
    trackEl.style.transition = withTransition ? "" : "none";
    trackEl.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (!withTransition) {
      // Reflow zorlayarak "transition:none" değişikliğinin hemen
      // uygulanmasını sağla, sonra transition'ı tekrar aç.
      // eslint-disable-next-line no-unused-expressions
      trackEl.offsetHeight;
      trackEl.style.transition = "";
    }
  }

  function updateControls() {
    const active = activeRealIndex();
    dotsEl.querySelectorAll(".slider-dot").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === active);
      dot.setAttribute("aria-current", index === active ? "true" : "false");
    });

    const hasMultiplePages = pageCount > 1;
    sliderEl.classList.toggle("has-single-page", !hasMultiplePages);
    prevBtn.disabled = !hasMultiplePages;
    nextBtn.disabled = !hasMultiplePages;
  }

  function goTo(direction) {
    if (isAnimating || pageCount <= 1) return;
    isAnimating = true;
    currentIndex += direction;
    setTransform(true);
    updateControls();
  }

  function goToRealPage(index) {
    if (isAnimating || pageCount <= 1) return;
    isAnimating = true;
    currentIndex = index + 1;
    setTransform(true);
    updateControls();
  }

  trackEl.addEventListener("transitionend", (event) => {
    if (event.propertyName !== "transform") return;
    isAnimating = false;

    if (currentIndex >= extendedPages.length - 1) {
      currentIndex = 1;
      setTransform(false);
    } else if (currentIndex <= 0) {
      currentIndex = pageCount;
      setTransform(false);
    }
    updateControls();
  });

  function rebuild() {
    const oldCardsPerView = cardsPerView;
    const firstVisibleItemIndex = activeRealIndex() * oldCardsPerView;

    cardsPerView = getCardsPerView();
    realPages = chunk(packagesData, cardsPerView);
    pageCount = realPages.length;
    buildExtended();

    const newPageIndex = Math.max(
      0,
      Math.min(Math.floor(firstVisibleItemIndex / cardsPerView), pageCount - 1)
    );
    currentIndex = pageCount > 1 ? newPageIndex + 1 : 0;

    renderTrack();
    renderDots();
    setTransform(false);
    updateControls();
  }

  prevBtn.addEventListener("click", () => goTo(-1));
  nextBtn.addEventListener("click", () => goTo(1));

  dotsEl.addEventListener("click", (event) => {
    const dot = event.target.closest(".slider-dot");
    if (!dot) return;
    goToRealPage(Number(dot.dataset.page));
  });

  sliderEl.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") goTo(1);
    if (event.key === "ArrowLeft") goTo(-1);
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
        goTo(deltaX < 0 ? 1 : -1);
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

  buildExtended();
  renderTrack();
  renderDots();
  setTransform(false);
  updateControls();
}
