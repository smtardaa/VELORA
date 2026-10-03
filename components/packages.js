// components/packages.js — Paketler bölümü: toplam paket sayısı kadar
// (sabit "3" değil, bkz. getCardsPerView()) kart aynı anda gösterilir;
// "sonsuz kaydırma" yalnızca mobilde anlamlıdır.
//
// Davranış (kesin):
//  - Desktop  (>1024px) : tüm paketler aynı anda, düz bir ızgara gibi —
//    ok, pagination ve swipe YOKTUR, tamamen statik görünür (paket
//    sayısı değiştiğinde de bu davranış korunur).
//  - Tablet   (481-1024): tüm paketler aynı anda görünmeye devam eder,
//    ancak ok ve dokunmatik kaydırma kontrolleri görsel olarak etkin
//    kalır (yalnızca tek sayfa olduğundan gerçekte kaydırılacak ikinci
//    bir sayfa yoktur; bu nedenle tıklama/kaydırma sessizce hiçbir şeyi
//    değiştirmez, ancak arayüz devre dışı görünmez).
//  - Mobile   (<=480px) : aynı anda 1 kart -> 1 / 2 / 3 / 4 / 1 / ...
//    (sonsuz); ok, swipe ve pagination noktaları tam işlevseldir.
//
// Sonsuzluk (mobilde), ilk ve son grubun birer "klon"unu track'in
// başına/sonuna ekleyip sınıra ulaşınca (kullanıcı fark etmeden)
// animasyonsuz bir şekilde gerçek gruba geri sarmakla (classic
// clone-carousel tekniği) sağlanır. Otomatik oynatma YOKTUR: yalnızca
// ok ve swipe ile hareket eder.

import { packagesData } from "../data/packages.js";
import { icon } from "../js/icons.js";
import { debounce, escapeHtml } from "../js/utils.js";
import { t, onLanguageChange } from "../js/i18n.js";
import { openPackageContactModal } from "./packageContactModal.js";

// Paket verisinin çevrilebilir kısımları (isim/açıklama/özellikler/CTA)
// data/i18n/*.js içinde "packages.items.<id>" altında tutulur; sabit
// alanlar (id, highlighted) yalnızca data/packages.js'ten gelir.
function getTranslatedPackages() {
  return packagesData.map((pkg) => ({ ...pkg, ...t(`packages.items.${pkg.id}`) }));
}

function getViewportTier() {
  const width = window.innerWidth;
  if (width <= 480) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
}

function getCardsPerView() {
  // Tablet ve desktop'ta toplam paket sayısı kadar sütun kullanılır
  // (sabit "3" değil — paket sayısı değişse de her zaman tamamı aynı
  // anda tek satırda görünür); yalnızca mobilde tek kart gösterilir.
  return getViewportTier() === "mobile" ? 1 : packagesData.length;
}

function chunk(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function renderCard(pkg) {
  // "proje-anlatin" gibi "ctaHref" alanı olan kartlar sabit fiyatlı/kapsamlı
  // bir paket DEĞİLDİR: özellik listesi gösterilmez (data/i18n/*.js >
  // packages.items.proje-anlatin kasıtlı olarak "features" içermez) ve
  // butonu, diğer kartlardaki iletişim popup'ını açan <button> yerine,
  // doğrudan ilgili sayfaya giden gerçek bir <a> bağlantısıdır.
  const featuresMarkup =
    pkg.features && pkg.features.length
      ? `
        <ul class="package-features">
          ${pkg.features
            .map((feature) => `<li>${icon("check")}<span>${escapeHtml(feature)}</span></li>`)
            .join("")}
        </ul>
      `
      : "";

  const ctaMarkup = pkg.ctaHref
    ? `<a class="btn btn-secondary btn-block package-contact-trigger-link" href="${escapeHtml(pkg.ctaHref)}">${escapeHtml(pkg.cta)}</a>`
    : `<button type="button" class="btn ${pkg.highlighted ? "btn-primary" : "btn-secondary"} btn-block package-contact-trigger" data-package-name="${escapeHtml(pkg.name)}">
        ${escapeHtml(pkg.cta)}
      </button>`;

  return `
    <article class="card package-card${pkg.highlighted ? " is-highlighted" : ""}${pkg.ctaHref ? " package-card-cta" : ""}">
      ${pkg.badge ? `<span class="package-badge">${escapeHtml(pkg.badge)}</span>` : ""}
      <h3 class="package-name">${escapeHtml(pkg.name)}</h3>
      <p class="package-description">${escapeHtml(pkg.description)}</p>
      ${featuresMarkup}
      ${ctaMarkup}
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
  let realPages = chunk(getTranslatedPackages(), cardsPerView);
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
          <button class="slider-dot" type="button" data-page="${index}" aria-label="${escapeHtml(t("packages.dotAriaLabel").replace("{n}", String(index + 1)))}"></button>
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
    const tier = getViewportTier();

    // Masaüstünde gerçekten tek sayfa varsa (3 paket, 3'lü ızgara)
    // slider tamamen düz bir ızgaraya döner: ok tamamen gizlenir ve
    // devre dışı bırakılır. Tablette ise — 3 kart aynı anda görünse
    // bile — ok ve dokunmatik kaydırma kontrolleri görsel/işlevsel
    // olarak etkin görünmeye devam eder (istenen davranış); pratikte
    // kaydırılacak ikinci bir sayfa olmadığından bir etkisi olmaz.
    const hideArrows = !hasMultiplePages && tier === "desktop";
    sliderEl.classList.toggle("has-single-page", hideArrows);
    prevBtn.disabled = tier === "desktop" ? !hasMultiplePages : false;
    nextBtn.disabled = tier === "desktop" ? !hasMultiplePages : false;

    // Pagination noktaları, gerçekten birden fazla sayfa olmadığı
    // sürece (tier fark etmeksizin) gösterilmez — tek sayfa için tek
    // bir nokta göstermenin anlamı yoktur.
    dotsEl.style.display = hasMultiplePages ? "" : "none";
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
    // event.target === trackEl kontrolü önemli: aksi halde, kart
    // içindeki iletişim butonunun kendi ":active" transform geçişi
    // (tıklanma efekti) buraya "bubbling" ile ulaşıp track'i yanlışlıkla
    // sonraki sayfaya kaydırabilir.
    if (event.target !== trackEl || event.propertyName !== "transform") return;
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
    realPages = chunk(getTranslatedPackages(), cardsPerView);
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

  // Dil değiştiğinde: kart sayısı/sayfa yapısı aynı kalır (yalnızca
  // içerik metni değişir), bu yüzden görünen sayfa konumu korunarak
  // yalnızca içerik yeniden çizilir — ok/nokta/touch olay dinleyicileri
  // burada tekrar bağlanmaz (aşağıda yalnızca bir kez bağlanır).
  function refreshContent() {
    const activeIndexBeforeRefresh = activeRealIndex();
    realPages = chunk(getTranslatedPackages(), cardsPerView);
    pageCount = realPages.length;
    buildExtended();
    currentIndex = pageCount > 1 ? activeIndexBeforeRefresh + 1 : 0;
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

  // Paket kartındaki iletişim butonu artık #iletisim'e yönlendirmez;
  // seçilen pakete göre içeriği değişen popup'ı açar. Kartlar dil
  // değişiminde / sayfa yeniden çiziminde yeniden oluşturulduğu için
  // dinleyici, hiç değişmeyen trackEl üzerinde tek seferlik olay
  // delegasyonu ile bağlanır.
  trackEl.addEventListener("click", (event) => {
    const trigger = event.target.closest(".package-contact-trigger");
    if (!trigger) return;
    openPackageContactModal(trigger.dataset.packageName);
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

  onLanguageChange(refreshContent);
}
