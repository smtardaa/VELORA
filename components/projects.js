// components/projects.js — "Çalışmalarımız" bölümü: SONSUZ, tek-kart adımlı
// ve otomatik oynatılan proje slider'ı.
//
// Paketler slider'ından farkı:
//  - Her hareket (otomatik veya manuel) yalnızca 1 kart kayar (grup değil).
//  - Sayfa yüklendiğinde otomatik olarak, yavaş ve sabit hızda kendiliğinden
//    ilerler; ok/swipe ile yapılan manuel hareket aynı state'i kullanır ve
//    otomatik oynatmayı bozmaz.
//  - Sonsuzluk, görünen kart sayısı (K) kadar baştan/sondan klon ekleyip
//    sınıra ulaşınca kullanıcı fark etmeden (animasyonsuz) gerçek konuma
//    geri sarmakla sağlanır (classic infinite-carousel tekniği).

import { projectsData } from "../data/projects.js";
import { icon } from "../js/icons.js";
import { escapeHtml, debounce } from "../js/utils.js";
import { t, onLanguageChange } from "../js/i18n.js";

const AUTOPLAY_INTERVAL = 3800; // ms — yavaş, sakin, sabit hız

function getCardsPerView() {
  const width = window.innerWidth;
  if (width <= 480) return 1;
  if (width <= 1024) return 2;
  return 3;
}

function renderCard(project) {
  const isExternal = /^https?:/i.test(project.href || "");
  const visual = project.image
    ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.name)}" loading="lazy" />`
    : `<span class="project-thumb-icon">${icon(project.icon)}</span>`;
  // Proje adı (marka/müşteri adı) çevrilmez — yalnızca kategori etiketi
  // ve CTA metni mevcut dile göre değişir.
  const category = t(`works.categories.${project.id}`);
  const ariaLabel = t("works.projectAriaLabel").replace("{name}", project.name);

  return `
    <div class="works-slide">
      <a
        class="card project-card"
        href="${escapeHtml(project.href || "#")}"
        ${isExternal ? 'target="_blank" rel="noopener"' : ""}
        aria-label="${escapeHtml(ariaLabel)}"
      >
        <span class="project-thumb">${visual}</span>
        <span class="project-body">
          <span class="project-name">${escapeHtml(project.name)}</span>
          <span class="project-category">${escapeHtml(category)}</span>
          <span class="project-link">${escapeHtml(t("works.viewProject"))} <span aria-hidden="true">→</span></span>
        </span>
      </a>
    </div>
  `;
}

export function initProjectsSlider({ sliderEl, trackEl, prevBtn, nextBtn }) {
  if (!sliderEl || !trackEl || !prevBtn || !nextBtn) return;

  const items = projectsData;
  const N = items.length;
  if (N === 0) return;

  let cardsPerView = getCardsPerView();
  let K = Math.min(cardsPerView, N);
  let extended = [];
  let currentIndex = K;
  let isAnimating = false;
  let autoplayTimer = null;

  function buildExtended() {
    K = Math.min(cardsPerView, N);
    extended =
      N > cardsPerView
        ? [...items.slice(N - K), ...items, ...items.slice(0, K)]
        : [...items];
    currentIndex = N > cardsPerView ? K : 0;
  }

  function renderTrack() {
    trackEl.innerHTML = extended.map(renderCard).join("");
    trackEl.style.setProperty("--project-per-view", cardsPerView);
  }

  function setTransform(withTransition) {
    const cardPercent = 100 / cardsPerView;
    trackEl.style.transition = withTransition ? "" : "none";
    trackEl.style.transform = `translateX(-${currentIndex * cardPercent}%)`;
    if (!withTransition) {
      // eslint-disable-next-line no-unused-expressions
      trackEl.offsetHeight;
      trackEl.style.transition = "";
    }
  }

  const loopEnabled = () => N > cardsPerView;

  function goTo(direction) {
    if (isAnimating || !loopEnabled()) return;
    isAnimating = true;
    currentIndex += direction;
    setTransform(true);
  }

  trackEl.addEventListener("transitionend", (event) => {
    // event.target === trackEl kontrolü: kart içindeki herhangi bir
    // ".btn" elemanının kendi "transform" geçişinin (ör. :active efekti)
    // buraya "bubbling" ile ulaşıp track'i yanlışlıkla kaydırmasını önler
    // (packages.js'te tespit edilen aynı sınıf hatanın önleyici düzeltmesi).
    if (event.target !== trackEl || event.propertyName !== "transform") return;
    isAnimating = false;

    if (currentIndex >= N + K) {
      currentIndex -= N;
      setTransform(false);
    } else if (currentIndex < K) {
      currentIndex += N;
      setTransform(false);
    }
  });

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    if (!loopEnabled()) return;
    autoplayTimer = setInterval(() => {
      if (document.hidden) return;
      goTo(1);
    }, AUTOPLAY_INTERVAL);
  }

  function rebuild() {
    const oldCardsPerView = cardsPerView;
    const currentRealIndex = loopEnabled()
      ? ((currentIndex - K) % N + N) % N
      : 0;

    cardsPerView = getCardsPerView();
    buildExtended();
    currentIndex = loopEnabled() ? K + currentRealIndex : 0;

    renderTrack();
    setTransform(false);
    startAutoplay();
    // eslint-disable-next-line no-unused-vars
    void oldCardsPerView;
  }

  prevBtn.addEventListener("click", () => goTo(-1));
  nextBtn.addEventListener("click", () => goTo(1));

  sliderEl.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") goTo(1);
    if (event.key === "ArrowLeft") goTo(-1);
  });

  // Manuel etkileşim veya görünürlük değişimi otomatik oynatmayı bozmaz;
  // yalnızca fare üzerideyken (kullanıcı incelerken) geçici olarak durur.
  sliderEl.addEventListener("mouseenter", stopAutoplay);
  sliderEl.addEventListener("mouseleave", startAutoplay);
  sliderEl.addEventListener("focusin", stopAutoplay);
  sliderEl.addEventListener("focusout", startAutoplay);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  // Touch / swipe desteği — her swipe yalnızca 1 kart ilerletir.
  let touchStartX = null;
  const SWIPE_THRESHOLD = 40;

  trackEl.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
      stopAutoplay();
    },
    { passive: true }
  );

  trackEl.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX !== null) {
        const deltaX = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
          goTo(deltaX < 0 ? 1 : -1);
        }
      }
      touchStartX = null;
      startAutoplay();
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
  setTransform(false);
  startAutoplay();

  // Dil değiştiğinde: kart sayısı ve konum aynı kalır, yalnızca kart
  // içeriği (kategori etiketi, CTA metni, aria-label) yeniden çizilir.
  // Otomatik oynatma/touch/klavye dinleyicileri burada tekrar bağlanmaz.
  onLanguageChange(() => {
    renderTrack();
    setTransform(false);
  });
}
