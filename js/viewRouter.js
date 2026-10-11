// js/viewRouter.js — tek sayfa yapısındaki tam ekran görünümler.
//
// Eski ayrı sayfalar (Çalışmalarımız, Hakkımızda, Projenizi Anlatın) artık
// index.html içinde <section class="app-view"> olarak durur. Bu modül:
//  - Adresi aynı HTML içinde hash ile tutar:
//      #/calismalarimiz            Çalışmalarımız görünümü
//      #/calismalarimiz/<proje-id> aynı görünümde ilgili projeye gider
//      #/hakkimizda                Hakkımızda görünümü
//      #/projenizi-anlatin         Projenizi Anlatın görünümü
//      (hash yok) veya #/          ana sayfa
//      #paketler, #sss …           ana sayfa + ilgili bölüm
//  - Bağlantı tıklamalarını yakalayıp History API (pushState) ile yeni
//    durum ekler; tarayıcının geri/ileri düğmeleri popstate ile aynı
//    durumları yeniden kurar. Ayrı bir HTML dosyasına yönlendirme yapılmaz.
//  - Görünüm açıkken ana sayfa (main + footer) inert ve ekran okuyuculardan
//    gizlidir, sayfa kaydırması kilitlidir; görünüm kendi içinde kayar.
//  - Geçiş: siyah katman ekranı üstten alta kaplar, ortada VELORA logosu
//    belirir, yeni görünüm katmanın altında hazırlanır ve katman aşağıdan
//    yukarı açılarak gösterir. prefers-reduced-motion açıkken geçiş
//    animasyonsuz, anında yapılır.
//  - Performans: katman yalnızca transform/opacity ile (GPU'da, ana iş
//    parçacığından bağımsız) hareket eder. Kapalı görünümler display:none
//    yerine content-visibility:hidden ile gizlenir; bir kez yerleştirilen
//    görünüm tekrar açılırken baştan hesaplanmaz. Görünümler sayfa açıldıktan
//    sonra boşta kalan zamanda (requestIdleCallback) önceden yerleştirilir.
//  - Odak: görünüm açılınca görünüm başlığına, ana sayfaya dönünce görünümü
//    açan kontrole (veya hedef bölüme) taşınır.

import { qs, qsa } from "./utils.js";
import { refreshMeta } from "./i18n.js";

export const VIEW_NAMES = ["calismalarimiz", "hakkimizda", "projenizi-anlatin"];

const COVER_MS = 440;
const REVEAL_MS = 520;
const HOLD_MS = 80;
const EASE_IN_OUT = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
const nextFrame = () => new Promise((resolve) => window.requestAnimationFrame(() => resolve()));

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
}

// "#/hakkimizda" → { view: "hakkimizda", anchor: null }
// "#/calismalarimiz/lumen-kahve" → { view: "calismalarimiz", anchor: "lumen-kahve" }
// "#paketler" → { view: null, anchor: "paketler" }; "" / "#" / "#/" → ana sayfa
export function parseRoute(hash) {
  const value = hash || "";
  if (value.startsWith("#/")) {
    const [view, anchor] = value.slice(2).split("/").filter(Boolean).map(decode);
    return VIEW_NAMES.includes(view) ? { view, anchor: anchor || null } : { view: null, anchor: null };
  }
  const anchor = value.length > 1 ? decode(value.slice(1)) : null;
  return { view: null, anchor };
}

// Ana sayfa footer'ını her görünümün sonuna klonlar (tek kaynak: index.html
// içindeki #home-footer). Klon içindeki id'ler görünüm adıyla
// benzersizleştirilir. js/main.js, sosyal ikonları ve telif yılını bundan
// SONRA tüm footer'lara çizer — bu yüzden ilk render'dan önce çağrılır.
export function prepareViewFooters() {
  const homeFooter = qs("#home-footer");
  if (!homeFooter) return;

  qsa("[data-view-footer]").forEach((slot) => {
    const viewName = slot.closest(".app-view")?.dataset.view || "view";
    const clone = homeFooter.cloneNode(true);
    clone.removeAttribute("id");

    clone.querySelectorAll("[id]").forEach((el) => {
      const oldId = el.id;
      const newId = `${oldId}-${viewName}`;
      el.id = newId;
      clone.querySelectorAll(`[aria-labelledby="${oldId}"]`).forEach((ref) => {
        ref.setAttribute("aria-labelledby", newId);
      });
    });

    slot.replaceChildren(clone);
  });
}

export function initViewRouter() {
  const root = document.documentElement;
  const viewEls = new Map(qsa(".app-view").map((el) => [el.dataset.view, el]));
  const homeEls = [qs("#main-content"), qs("#home-footer")].filter(Boolean);
  const overlay = qs(".view-transition");
  const panel = overlay ? qs(".view-transition-panel", overlay) : null;
  const logo = overlay ? qs(".view-transition-logo", overlay) : null;
  const skipLink = qs('a.visually-hidden[href="#main-content"]');
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!viewEls.size) return;

  let current = null; // açık görünümün adı; null = ana sayfa
  let busy = false;
  let pending = false;
  let lastActivator = null; // görünümü açan son bağlantı
  let returnFocusEl = null; // ana sayfaya dönünce odağın geri verileceği öğe

  // Logo görselinin ilk geçişte boş kalmaması için önceden çözülür.
  logo?.decode?.().catch(() => {});

  // ---------- Durum uygulama ----------

  function markHeader(view) {
    qsa(".nav-links a[href^='#/']").forEach((link) => {
      const on = Boolean(view) && link.getAttribute("href") === `#/${view}`;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    const worksTrigger = qs(".nav-dropdown-trigger");
    if (view) {
      // Görünüm açıkken ana sayfa bölümlerine ait vurgular kaldırılır.
      qsa(".nav-links a[href^='#']:not([href^='#/'])").forEach((link) => link.classList.remove("is-active"));
      worksTrigger?.classList.toggle("is-active", view === "calismalarimiz");
    } else {
      worksTrigger?.classList.remove("is-active");
      // Scroll-spy (components/header.js) ana sayfa vurgusunu yeniden hesaplar.
      window.dispatchEvent(new Event("scroll"));
    }
  }

  function applyState(view) {
    const viewEl = view ? viewEls.get(view) : null;

    viewEls.forEach((el, name) => {
      const on = name === view;
      el.classList.toggle("is-active", on);
      el.inert = !on;
    });

    root.classList.toggle("has-open-view", Boolean(view));
    root.removeAttribute("data-boot-view");

    homeEls.forEach((el) => {
      el.inert = Boolean(view);
      if (view) el.setAttribute("aria-hidden", "true");
      else el.removeAttribute("aria-hidden");
    });

    if (viewEl) {
      root.setAttribute("data-i18n-meta-title", viewEl.dataset.metaTitle);
      root.setAttribute("data-i18n-meta-description", viewEl.dataset.metaDescription);
    } else {
      root.removeAttribute("data-i18n-meta-title");
      root.removeAttribute("data-i18n-meta-description");
    }
    refreshMeta();

    if (skipLink) skipLink.setAttribute("href", viewEl ? `#${viewEl.id}` : "#main-content");
    markHeader(view);
    current = view;
    // Ana sayfa bileşenleri (ör. çalışmalar slider'ının otomatik kayması)
    // görünüm açıkken kendini duraklatabilsin diye.
    document.dispatchEvent(new CustomEvent("velora:viewchange", { detail: { view } }));
  }

  // Görünüm açıldığı anda ekranda olan kartlar (js/reveal.js) katmanın
  // altında animasyonsuz görünür hâle getirilir; böylece katman açılırken
  // kartlar ikinci bir giriş animasyonu oynatmaz. Aşağıdakiler kaydırıldıkça
  // normal şekilde sırayla görünür.
  function revealVisibleInstantly(viewEl) {
    const items = qsa(".reveal-item:not(.is-revealed)", viewEl);
    if (!items.length) return;
    const limit = window.innerHeight;
    const shown = items.filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < limit && rect.bottom > 0;
    });
    shown.forEach((el) => {
      el.style.transition = "none";
      el.classList.add("is-revealed");
    });
    window.requestAnimationFrame(() => shown.forEach((el) => el.style.removeProperty("transition")));
  }

  function scrollIntoPlace(target) {
    try {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    } catch (error) {
      target.scrollIntoView(true);
    }
  }

  function focusElement(el) {
    if (!el) return;
    if (!el.hasAttribute("tabindex") && !el.matches("a[href], button, input, select, textarea")) {
      el.setAttribute("tabindex", "-1");
    }
    el.focus({ preventScroll: true });
  }

  function viewTitle(viewEl) {
    return viewEl.querySelector(".view-title") || viewEl;
  }

  // Görünüm içindeki konumu ayarlar ve (moveFocus ise) odağı taşır. İlk
  // sayfa yüklemesinde odak tarayıcının varsayılanında bırakılır.
  function settleView(viewEl, anchor, moveFocus = true) {
    const target = anchor ? document.getElementById(anchor) : null;
    if (target && viewEl.contains(target)) {
      scrollIntoPlace(target);
      if (moveFocus) focusElement(target);
    } else {
      viewEl.scrollTop = 0;
      if (moveFocus) focusElement(viewTitle(viewEl));
    }
    revealVisibleInstantly(viewEl);
  }

  // Ana sayfa konumunu ayarlar ve odağı geri verir.
  function settleHome(anchor) {
    const target = anchor ? document.getElementById(anchor) : null;
    if (target && homeEls.some((el) => el.contains(target))) {
      scrollIntoPlace(target);
      focusElement(target);
      return;
    }
    // Ana sayfanın kaydırma konumu görünüm açılmadan önceki yerinde kalır.
    // Odak görünümü açan kontrole geri verilir; o kontrol artık görünmüyorsa
    // (kapanmış "Çalışmalarımız" dropdown'u veya kapalı mobil menü içindeki
    // bir bağlantı) onu açan düğmeye, o da yoksa ana içeriğe taşınır.
    const candidates = [];
    if (returnFocusEl && returnFocusEl.isConnected && !returnFocusEl.closest("[inert]")) {
      candidates.push(returnFocusEl);
      if (returnFocusEl.closest(".nav-dropdown-menu")) candidates.push(qs(".nav-dropdown-trigger"));
      if (returnFocusEl.closest(".nav-links")) candidates.push(qs(".menu-toggle"));
    }
    for (const el of candidates) {
      if (!el) continue;
      el.focus({ preventScroll: true });
      if (document.activeElement === el) return;
    }
    if (returnFocusEl) focusElement(qs("#main-content"));
  }

  // ---------- Geçiş animasyonu ----------

  const canAnimate = () => Boolean(panel && panel.animate) && !reduceMotion.matches;

  // Siyah panel ekranın üstünden aşağı iner (alt kenarı yukarıdan aşağı
  // ilerler); yalnızca transform kullanıldığı için tüm tarayıcılarda GPU'da
  // çalışır. Logo, panel ekranın ortasını geçtikten sonra belirir.
  async function cover() {
    overlay.classList.add("is-active");
    const slide = panel.animate(
      [{ transform: "translate3d(0, -100%, 0)" }, { transform: "translate3d(0, 0, 0)" }],
      { duration: COVER_MS, easing: EASE_IN_OUT, fill: "forwards" }
    );
    const mark = logo?.animate(
      [
        { opacity: 0, transform: "translate3d(0, 10px, 0) scale(0.97)" },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" }
      ],
      { duration: 320, delay: COVER_MS * 0.55, easing: EASE_OUT, fill: "forwards" }
    );
    await Promise.all([slide.finished, mark?.finished].filter(Boolean));
  }

  // Logo kaybolur, panel yukarı çekilir: alt kenarı aşağıdan yukarı
  // yükselerek yeni görünümü gösterir.
  async function reveal() {
    const mark = logo?.animate(
      [
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
        { opacity: 0, transform: "translate3d(0, -10px, 0) scale(0.99)" }
      ],
      { duration: 200, easing: EASE_IN_OUT, fill: "forwards" }
    );
    const slide = panel.animate(
      [{ transform: "translate3d(0, 0, 0)" }, { transform: "translate3d(0, -100%, 0)" }],
      { duration: REVEAL_MS, delay: 40, easing: EASE_IN_OUT, fill: "forwards" }
    );
    await Promise.all([slide.finished, mark?.finished].filter(Boolean));
  }

  function resetOverlay() {
    if (!overlay) return;
    panel?.getAnimations().forEach((animation) => animation.cancel());
    logo?.getAnimations().forEach((animation) => animation.cancel());
    overlay.classList.remove("is-active");
  }

  // Kapalı görünümleri sayfa açıldıktan sonra boşta kalan zamanda birer
  // birer yerleştirir (görünmeden). content-visibility:hidden bu yerleşimi
  // saklar; ilk açılışta da görünümün tamamı geçişin ortasında baştan
  // hesaplanmaz. Desteklemeyen tarayıcılarda (bkz. css/views.css @supports)
  // hiçbir şey yapmaz.
  function warmViews() {
    if (!window.CSS?.supports?.("content-visibility", "hidden")) return;
    const idle = window.requestIdleCallback || ((fn) => window.setTimeout(fn, 200));
    const queue = [...viewEls.values()];
    const step = () => {
      const el = queue.shift();
      if (!el) return;
      if (!el.classList.contains("is-active")) {
        el.classList.add("is-warming");
        // eslint-disable-next-line no-unused-expressions
        el.offsetHeight; // yerleşimi şimdi (boşta) hesaplat
        el.classList.remove("is-warming");
      }
      idle(step, { timeout: 4000 });
    };
    idle(step, { timeout: 4000 });
  }

  // ---------- Yönlendirme ----------

  // Hedefin (görünüm veya ana sayfa) stil/yerleşim hesabını, katman inmeye
  // başladıktan sonraki ilk karede başlatır. Panel ve logo GPU'da hareket
  // ettiğinden bu sırada ana iş parçacığının meşgul olması animasyonu
  // etkilemez; katman kapandığındaki değişim anı ise hafifler. Hedef bu
  // arada görünmez kalır (görünüm visibility:hidden; ana sayfa açık
  // görünümün arkasında).
  function prepare(route) {
    if (route.view) viewEls.get(route.view)?.classList.add("is-warming");
    else root.classList.add("is-preparing-home");
    // eslint-disable-next-line no-unused-expressions
    document.documentElement.offsetHeight;
  }

  function unprepare() {
    viewEls.forEach((el) => el.classList.remove("is-warming"));
    root.classList.remove("is-preparing-home");
  }

  async function go(route, { animate }) {
    busy = true;
    const useAnimation = animate && canAnimate();
    try {
      if (useAnimation) {
        const covering = cover();
        await nextFrame();
        prepare(route);
        await covering;
      }

      applyState(route.view);
      unprepare();
      // Yeni görünümün düzeni katmanın altında tamamlansın (yanlış ya da
      // yarım görünüm hiçbir an görünmesin).
      await nextFrame();
      await nextFrame();

      if (route.view) settleView(viewEls.get(route.view), route.anchor);
      else settleHome(route.anchor);

      if (useAnimation) {
        await wait(HOLD_MS);
        await reveal();
      }
    } catch (error) {
      // Animasyon hatası durumu bozmamalı: yine de doğru görünüm uygulanır.
      if (current !== route.view) applyState(route.view);
      unprepare();
    } finally {
      resetOverlay();
      busy = false;
      if (pending) {
        pending = false;
        sync({ animate: true });
      }
    }
  }

  function sync({ animate }) {
    if (busy) {
      pending = true;
      return;
    }
    const route = parseRoute(window.location.hash);

    if (route.view === current) {
      // Aynı görünüm içinde başka bir projeye/başlığa gidiliyorsa yalnızca
      // konum ve odak güncellenir. Ana sayfa içi bağlantılar tarayıcıya aittir.
      if (route.view && route.anchor) settleView(viewEls.get(route.view), route.anchor);
      return;
    }

    if (!current && route.view) {
      returnFocusEl = lastActivator || (document.activeElement !== document.body ? document.activeElement : null);
    }
    lastActivator = null;
    go(route, { animate });
  }

  function navigate(url) {
    const next = new URL(url, window.location.href);
    if (next.href === window.location.href) {
      // Zaten bu adresteyiz: görünümü baştan göster (ör. açık görünümün
      // menü bağlantısına tekrar tıklama).
      const route = parseRoute(next.hash);
      if (route.view && route.view === current) settleView(viewEls.get(current), route.anchor);
      return;
    }
    window.history.pushState({ velora: true }, "", next.href);
    sync({ animate: true });
  }

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a[href^='#']");
    if (!link) return;
    const href = link.getAttribute("href");

    // Görünüm adresleri (#/…): her zaman yönlendirici açar.
    if (href.startsWith("#/")) {
      event.preventDefault();
      lastActivator = link;
      const route = parseRoute(href);
      navigate(route.view ? href : window.location.pathname + window.location.search);
      return;
    }

    // Ana sayfadayken sıradan bölüm bağlantıları tarayıcıya bırakılır.
    if (!current) return;

    const id = decode(href.slice(1));
    const viewEl = viewEls.get(current);
    const target = id ? document.getElementById(id) : null;

    // Açık görünümün içindeki bir hedef (ör. "İçeriğe geç"): adres
    // değişmeden görünüm içinde kalınır.
    if (target && viewEl.contains(target)) {
      event.preventDefault();
      if (target === viewEl) focusElement(viewTitle(viewEl));
      else {
        scrollIntoPlace(target);
        focusElement(target);
      }
      return;
    }

    // Ana sayfadaki bir bölüm (#paketler, #iletisim …): ana sayfaya dönülür.
    event.preventDefault();
    navigate(href === "#" ? window.location.pathname + window.location.search : href);
  });

  window.addEventListener("popstate", () => sync({ animate: true }));
  window.addEventListener("hashchange", () => sync({ animate: true }));

  // İlk açılış: adres bir görünümü gösteriyorsa animasyonsuz uygulanır
  // (index.html'deki erken betik, JS yüklenene kadar ana sayfanın kısa
  // süreliğine görünmesini zaten engeller).
  const initial = parseRoute(window.location.hash);
  if (initial.view) {
    applyState(initial.view);
    settleView(viewEls.get(initial.view), initial.anchor, false);
  } else {
    applyState(null);
  }

  // Sayfa yüklendikten sonra kapalı görünümleri boşta önceden yerleştir.
  if (document.readyState === "complete") warmViews();
  else window.addEventListener("load", warmViews, { once: true });
}
