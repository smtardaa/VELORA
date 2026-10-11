// components/projects.js — "Çalışmalarımız" bölümü: SONSUZ, tek-kart adımlı
// proje vitrini (yalnızca index.html).
//
// Davranış:
//  - Her hareket (otomatik, ok, nokta, klavye veya sürükleme) 1 karttan
//    (nokta ile atlamada birkaç karttan) oluşur ve aynı state'i kullanır.
//  - Otomatik oynatma YALNIZCA MASAÜSTÜNDE (>1024px) çalışır; tablet ve
//    mobilde tamamen kapalıdır. Hareketi azaltma tercihi
//    (prefers-reduced-motion) açıksa masaüstünde de otomatik oynatma
//    yapılmaz. Fare kartların üzerindeyken veya odak slider içindeyken durur.
//  - Dokunmatik ekranlarda kartlar parmakla sağa-sola sürüklenir (kart
//    parmağı takip eder, bırakınca en yakın karta oturur). Viewport'ta
//    "touch-action: pan-y" kullanıldığından dikey sayfa kaydırması
//    tarayıcıda kalır: hareket dikey başlarsa slider hiç devreye girmez.
//  - Klavye: odak slider içindeyken ←/→ ile ilerlenir; yalnızca ekranda
//    görünen kartlar sekme (Tab) sırasındadır, kenardaki/klon kartlar
//    aria-hidden ve tabindex="-1" alır.
//  - Mobilde (≤640px) bir sonraki kartın kenarı görünür (1.12 kart), böylece
//    yatay kaydırılabildiği anlaşılır.
//  - Sonsuzluk, baştan/sondan klon kart ekleyip sınıra ulaşınca
//    animasyonsuz gerçek konuma geri sarmakla sağlanır.
//
// Tüm çalışmalar konsept/demo projelerdir; kartlarda Çalışmalarımız görünümü ile
// aynı "Konsept Proje" etiketi gösterilir (works.detail.conceptBadge).

import { projectsData } from "../data/projects.js";
import { icon } from "../js/icons.js";
import { escapeHtml, debounce } from "../js/utils.js";
import { t, onLanguageChange } from "../js/i18n.js";

const AUTOPLAY_INTERVAL = 3800; // ms — yavaş, sakin, sabit hız
const DRAG_START_PX = 8;

function getCardsPerView() {
  const width = window.innerWidth;
  if (width <= 640) return 1.12;
  if (width <= 1024) return 2;
  return 3;
}

function renderCard(project) {
  const isExternal = /^https?:/i.test(project.href || "");
  const visual = project.image
    ? `<img src="${escapeHtml(project.image)}" alt="" loading="lazy" draggable="false" />`
    : `<span class="project-thumb-icon">${icon(project.icon)}</span>`;
  // Proje adı (marka/müşteri adı) çevrilmez — yalnızca kategori etiketi,
  // konsept etiketi ve CTA metni mevcut dile göre değişir.
  const category = t(`works.categories.${project.id}`);
  const ariaLabel = t("works.projectAriaLabel").replace("{name}", project.name);

  return `
    <div class="works-slide">
      <a
        class="project-card"
        href="${escapeHtml(project.href || "#")}"
        ${isExternal ? 'target="_blank" rel="noopener"' : ""}
        aria-label="${escapeHtml(ariaLabel)}"
        draggable="false"
      >
        <span class="project-thumb">
          <span class="project-badge">${escapeHtml(t("works.detail.conceptBadge"))}</span>
          ${visual}
        </span>
        <span class="project-body">
          <span class="project-category">${escapeHtml(category)}</span>
          <span class="project-name">${escapeHtml(project.name)}</span>
          <span class="project-link">${escapeHtml(t("works.viewProject"))} <span aria-hidden="true">→</span></span>
        </span>
      </a>
    </div>
  `;
}

export function initProjectsSlider({ sliderEl, viewportEl, trackEl, prevBtn, nextBtn, dotsEl }) {
  if (!sliderEl || !viewportEl || !trackEl || !prevBtn || !nextBtn) return;

  const items = projectsData;
  const N = items.length;
  if (N === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let cardsPerView = getCardsPerView();
  let K = 0; // her iki uçtaki klon sayısı
  let extended = [];
  let currentIndex = 0;
  let isAnimating = false;
  let autoplayTimer = null;
  let isHovered = false;
  let hasFocusInside = false;

  const loopEnabled = () => N > cardsPerView;
  const realIndex = () => (loopEnabled() ? (((currentIndex - K) % N) + N) % N : 0);

  function buildExtended() {
    K = Math.min(Math.ceil(cardsPerView), N);
    extended = loopEnabled() ? [...items.slice(N - K), ...items, ...items.slice(0, K)] : [...items];
    currentIndex = loopEnabled() ? K : 0;
  }

  function renderTrack() {
    trackEl.innerHTML = extended.map(renderCard).join("");
    trackEl.style.setProperty("--project-per-view", cardsPerView);
  }

  function renderDots() {
    if (!dotsEl) return;
    dotsEl.hidden = !loopEnabled();
    dotsEl.innerHTML = items
      .map(
        (_, index) => `
          <button class="works-dot" type="button" data-index="${index}" aria-label="${escapeHtml(t("works.dotAriaLabel").replace("{n}", String(index + 1)))}"></button>
        `
      )
      .join("");
  }

  // Yalnızca ekranda tam görünen kartlar odaklanabilir/okunabilir kalır.
  function updateVisibility() {
    const fullyVisible = Math.max(1, Math.floor(cardsPerView + 0.001));
    const active = realIndex();
    Array.from(trackEl.children).forEach((slide, index) => {
      const visible = !loopEnabled() || (index >= currentIndex && index < currentIndex + fullyVisible);
      slide.toggleAttribute("aria-hidden", !visible);
      const link = slide.querySelector("a");
      if (link) {
        if (visible) link.removeAttribute("tabindex");
        else link.setAttribute("tabindex", "-1");
      }
    });
    if (dotsEl) {
      dotsEl.querySelectorAll(".works-dot").forEach((dot, index) => {
        dot.classList.toggle("is-active", index === active);
        if (index === active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }
    // Odak, artık gizlenen bir kartta kaldıysa görünen ilk karta taşınır.
    const focused = document.activeElement;
    if (focused && trackEl.contains(focused) && focused.getAttribute("tabindex") === "-1") {
      trackEl.children[currentIndex]?.querySelector("a")?.focus({ preventScroll: true });
    }
  }

  function setTransform(withTransition) {
    const cardPercent = 100 / cardsPerView;
    trackEl.style.transition = withTransition ? "" : "none";
    trackEl.style.transform = `translateX(-${currentIndex * cardPercent}%)`;
    if (!withTransition) {
      // eslint-disable-next-line no-unused-expressions
      trackEl.offsetHeight;
      trackEl.style.transition = "";
      updateVisibility();
    }
  }

  function moveTo(nextIndex) {
    if (isAnimating || !loopEnabled() || nextIndex === currentIndex) {
      setTransform(true);
      return;
    }
    isAnimating = true;
    currentIndex = nextIndex;
    setTransform(true);
  }

  const goTo = (direction) => moveTo(currentIndex + direction);

  trackEl.addEventListener("transitionend", (event) => {
    // event.target === trackEl kontrolü: kart içindeki öğelerin kendi
    // geçişlerinin "bubbling" ile track'i yanlışlıkla kaydırmasını önler.
    if (event.target !== trackEl || event.propertyName !== "transform") return;
    isAnimating = false;

    if (currentIndex >= N + K) {
      currentIndex -= N;
      setTransform(false);
    } else if (currentIndex < K) {
      currentIndex += N;
      setTransform(false);
    } else {
      updateVisibility();
    }
  });

  // ---------- Otomatik oynatma (yalnızca masaüstü) ----------
  const autoplayAllowed = () =>
    loopEnabled() && window.innerWidth > 1024 && !reduceMotion.matches && !isHovered && !hasFocusInside;

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    if (!autoplayAllowed()) return;
    autoplayTimer = setInterval(() => {
      if (document.hidden) return;
      goTo(1);
    }, AUTOPLAY_INTERVAL);
  }

  sliderEl.addEventListener("mouseenter", () => {
    isHovered = true;
    stopAutoplay();
  });
  sliderEl.addEventListener("mouseleave", () => {
    isHovered = false;
    startAutoplay();
  });
  sliderEl.addEventListener("focusin", () => {
    hasFocusInside = true;
    stopAutoplay();
  });
  sliderEl.addEventListener("focusout", (event) => {
    if (sliderEl.contains(event.relatedTarget)) return;
    hasFocusInside = false;
    startAutoplay();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });
  reduceMotion.addEventListener?.("change", startAutoplay);

  // ---------- Oklar, noktalar, klavye ----------
  prevBtn.addEventListener("click", () => goTo(-1));
  nextBtn.addEventListener("click", () => goTo(1));

  dotsEl?.addEventListener("click", (event) => {
    const dot = event.target.closest(".works-dot");
    if (!dot) return;
    moveTo(K + Number(dot.dataset.index));
  });

  sliderEl.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(-1);
    }
  });

  // ---------- Dokunmatik sürükleme ----------
  // Pointer Events: yalnızca dokunmatik/kalem. Fare kullanıcıları ok,
  // nokta ve klavye ile ilerler (masaüstünde metin seçimi/sürükleme ile
  // bağlantı tıklamaları karışmasın diye).
  let drag = null;
  let suppressClickUntil = 0;

  viewportEl.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" || isAnimating || !loopEnabled()) return;
    drag = { id: event.pointerId, x0: event.clientX, y0: event.clientY, dx: 0, active: false };
  });

  viewportEl.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x0;
    const dy = event.clientY - drag.y0;

    if (!drag.active) {
      if (Math.abs(dx) < DRAG_START_PX && Math.abs(dy) < DRAG_START_PX) return;
      // Hareket dikey başladıysa sayfa kaydırması tarayıcıya bırakılır.
      if (Math.abs(dy) >= Math.abs(dx)) {
        drag = null;
        return;
      }
      drag.active = true;
      stopAutoplay();
      trackEl.style.transition = "none";
      try {
        viewportEl.setPointerCapture(event.pointerId);
      } catch {
        /* bazı tarayıcılar yakalamayı reddedebilir; sürükleme yine çalışır */
      }
    }

    drag.dx = dx;
    const slideWidth = viewportEl.clientWidth / cardsPerView;
    trackEl.style.transform = `translateX(${-currentIndex * slideWidth + dx}px)`;
  });

  function endDrag(event) {
    if (!drag || event.pointerId !== drag.id) return;
    const { active, dx } = drag;
    drag = null;
    if (!active) return;

    trackEl.style.transition = "";
    suppressClickUntil = performance.now() + 350;
    const threshold = Math.min(60, viewportEl.clientWidth * 0.15);
    if (dx <= -threshold) goTo(1);
    else if (dx >= threshold) goTo(-1);
    else setTransform(true); // yeterince sürüklenmediyse yerine oturur
    startAutoplay();
  }

  viewportEl.addEventListener("pointerup", endDrag);
  viewportEl.addEventListener("pointercancel", endDrag);

  // Sürükleme bittikten hemen sonra gelen tıklama karttaki bağlantıyı
  // açmasın.
  trackEl.addEventListener(
    "click",
    (event) => {
      if (performance.now() < suppressClickUntil) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    true
  );

  // ---------- Yeniden boyutlandırma / dil ----------
  function rebuild() {
    const keepRealIndex = realIndex();
    cardsPerView = getCardsPerView();
    buildExtended();
    currentIndex = loopEnabled() ? K + keepRealIndex : 0;
    isAnimating = false;
    renderTrack();
    renderDots();
    setTransform(false);
    startAutoplay();
  }

  window.addEventListener(
    "resize",
    debounce(() => {
      if (getCardsPerView() !== cardsPerView) rebuild();
      else startAutoplay();
    }, 150)
  );

  buildExtended();
  renderTrack();
  renderDots();
  setTransform(false);
  startAutoplay();

  // Dil değiştiğinde: kart sayısı ve konum aynı kalır, yalnızca kart
  // içeriği (kategori, konsept etiketi, CTA metni, aria-label'lar) yeniden
  // çizilir. Dinleyiciler burada tekrar bağlanmaz.
  onLanguageChange(() => {
    renderTrack();
    renderDots();
    setTransform(false);
  });
}
