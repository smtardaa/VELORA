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
//  - Performans: track yalnızca transform (translate3d) ile hareket eder.
//    Sürüklemede genişlik bir kez ölçülür, konum kare başına bir kez yazılır
//    (requestAnimationFrame); animasyon sürerken başlayan dokunuş kartı
//    olduğu yerden yakalar; hızlı kısa kaydırma (flick) da kart değiştirir.
//    Otomatik kayma, slider ekranda değilken veya bir görünüm açıkken durur.
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
  let inViewport = true; // IntersectionObserver ile güncellenir
  let viewOpen = false; // tam ekran görünüm açıkken ana sayfa gizlidir

  const loopEnabled = () => N > cardsPerView;
  const realIndex = () => (loopEnabled() ? (((currentIndex - K) % N) + N) % N : 0);

  function buildExtended() {
    K = Math.min(Math.ceil(cardsPerView), N);
    extended = loopEnabled() ? [...items.slice(N - K), ...items, ...items.slice(0, K)] : [...items];
    currentIndex = loopEnabled() ? K : 0;
  }

  function renderTrack() {
    slideState = [];
    trackEl.innerHTML = extended.map(renderCard).join("");
    trackEl.style.setProperty("--project-per-view", cardsPerView);
  }

  function renderDots() {
    if (!dotsEl) return;
    activeDot = -1;
    dotsEl.hidden = !loopEnabled();
    dotsEl.innerHTML = items
      .map(
        (_, index) => `
          <button class="works-dot" type="button" data-index="${index}" aria-label="${escapeHtml(t("works.dotAriaLabel").replace("{n}", String(index + 1)))}"></button>
        `
      )
      .join("") + '<span class="works-dot-indicator" aria-hidden="true"></span>';
  }

  // Yalnızca ekranda tam görünen kartlar odaklanabilir/okunabilir kalır.
  // Yalnızca durumu değişen kartların öznitelikleri güncellenir (her
  // harekette tüm kartlara dokunup stil yeniden hesaplatmamak için).
  let slideState = [];
  let activeDot = -1;
  function updateVisibility() {
    const fullyVisible = Math.max(1, Math.floor(cardsPerView + 0.001));
    const active = realIndex();
    Array.from(trackEl.children).forEach((slide, index) => {
      const visible = !loopEnabled() || (index >= currentIndex && index < currentIndex + fullyVisible);
      if (slideState[index] === visible) return;
      slideState[index] = visible;
      slide.toggleAttribute("aria-hidden", !visible);
      const link = slide.querySelector("a");
      if (link) {
        if (visible) link.removeAttribute("tabindex");
        else link.setAttribute("tabindex", "-1");
      }
    });
    if (dotsEl && active !== activeDot) {
      const dots = dotsEl.querySelectorAll(".works-dot");
      dots[activeDot]?.classList.remove("is-active");
      dots[activeDot]?.removeAttribute("aria-current");
      dots[active]?.classList.add("is-active");
      dots[active]?.setAttribute("aria-current", "true");
      // Mavi gösterge yalnızca transform ile kayar (bkz. css/home.css).
      dotsEl.style.setProperty("--works-dot-index", String(active));
      activeDot = active;
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
    trackEl.style.transform = `translate3d(-${currentIndex * cardPercent}%, 0, 0)`;
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

  // Klon kartlardan birine gelindiyse, kullanıcı fark etmeden gerçek
  // karşılığına geri sarılır.
  function settle() {
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
  }

  const onTrackTransitionDone = (event) => {
    // event.target === trackEl kontrolü: kart içindeki öğelerin kendi
    // geçişlerinin "bubbling" ile track'i yanlışlıkla kaydırmasını önler.
    if (event.target !== trackEl || event.propertyName !== "transform") return;
    settle();
  };
  trackEl.addEventListener("transitionend", onTrackTransitionDone);
  // Geçiş yarıda kesilirse (ör. ana sayfa bir görünümün arkasında gizlenince)
  // "transitionend" gelmez; durum yine de toparlanır.
  trackEl.addEventListener("transitioncancel", onTrackTransitionDone);

  // ---------- Otomatik oynatma (yalnızca masaüstü) ----------
  const autoplayAllowed = () =>
    loopEnabled() &&
    window.innerWidth > 1024 &&
    !reduceMotion.matches &&
    !isHovered &&
    !hasFocusInside &&
    inViewport &&
    !viewOpen;

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

  // Slider ekranda değilken otomatik kayma boşuna çalışmaz.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        inViewport = entries[entries.length - 1].isIntersecting;
        if (inViewport) startAutoplay();
        else stopAutoplay();
      },
      { threshold: 0.2 }
    ).observe(sliderEl);
  }

  // Tam ekran görünüm (js/viewRouter.js) açıkken ana sayfa gizlidir.
  document.addEventListener("velora:viewchange", (event) => {
    viewOpen = Boolean(event.detail?.view);
    if (viewOpen) stopAutoplay();
    else startAutoplay();
  });

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
  const FLICK_SPEED = 0.35; // px/ms — kısa ama hızlı kaydırma da kart değiştirir

  function writeDragPosition() {
    if (!drag) return;
    drag.raf = 0;
    trackEl.style.transform = `translate3d(${drag.base + drag.dx}px, 0, 0)`;
  }

  viewportEl.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" || !loopEnabled()) return;
    drag = {
      id: event.pointerId,
      x0: event.clientX,
      y0: event.clientY,
      dx: 0,
      vx: 0,
      lastX: event.clientX,
      lastT: event.timeStamp,
      active: false,
      raf: 0
    };
  });

  viewportEl.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;

    if (!drag.active) {
      const dx = event.clientX - drag.x0;
      const dy = event.clientY - drag.y0;
      if (Math.abs(dx) < DRAG_START_PX && Math.abs(dy) < DRAG_START_PX) return;
      // Hareket dikey başladıysa sayfa kaydırması tarayıcıya bırakılır.
      if (Math.abs(dy) >= Math.abs(dx)) {
        drag = null;
        return;
      }
      drag.active = true;
      stopAutoplay();
      // Ölçümler sürükleme başında bir kez yapılır. Kayma animasyonu
      // sürüyorsa kart, o an bulunduğu yerden yakalanır (dokunuş yok
      // sayılmaz, zıplama olmaz).
      drag.slideWidth = viewportEl.clientWidth / cardsPerView;
      drag.base = new DOMMatrixReadOnly(getComputedStyle(trackEl).transform).m41;
      drag.x0 = event.clientX;
      trackEl.style.transition = "none";
      isAnimating = false;
      try {
        viewportEl.setPointerCapture(event.pointerId);
      } catch {
        /* bazı tarayıcılar yakalamayı reddedebilir; sürükleme yine çalışır */
      }
    }

    drag.dx = event.clientX - drag.x0;
    const dt = event.timeStamp - drag.lastT;
    if (dt > 0) drag.vx = 0.8 * ((event.clientX - drag.lastX) / dt) + 0.2 * drag.vx;
    drag.lastX = event.clientX;
    drag.lastT = event.timeStamp;
    if (!drag.raf) drag.raf = window.requestAnimationFrame(writeDragPosition);
  });

  function endDrag(event) {
    if (!drag || event.pointerId !== drag.id) return;
    const { active, dx, vx, base, slideWidth, raf } = drag;
    if (raf) window.cancelAnimationFrame(raf);
    drag = null;
    if (!active) return;

    suppressClickUntil = performance.now() + 350;
    const position = base + dx;
    const startIndex = Math.round(-base / slideWidth);
    let target = Math.round(-position / slideWidth);
    const threshold = Math.min(60, slideWidth * 0.15);
    const flicked = Math.abs(vx) > FLICK_SPEED && Math.sign(vx) === Math.sign(dx);
    if (target === startIndex && (Math.abs(dx) >= threshold || flicked)) {
      target = startIndex + (dx < 0 ? 1 : -1);
    }
    target = Math.min(Math.max(target, 0), extended.length - Math.ceil(cardsPerView));

    currentIndex = target;
    trackEl.style.transition = "";
    if (Math.abs(position + target * slideWidth) < 0.5) {
      setTransform(false);
      settle();
    } else {
      isAnimating = true;
      setTransform(true);
    }
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
