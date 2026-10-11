// components/header.js — mobil menü, kaydırmada header stili ve scroll-spy

import { qs, qsa } from "../js/utils.js";
import { setLanguage } from "../js/i18n.js";

export function initHeader() {
  const header = qs(".site-header");
  const menuToggle = qs(".menu-toggle");
  const navLinks = qs(".nav-links");
  const links = qsa(".nav-links a[href^='#']");

  if (!header) return;

  // "Çalışmalarımız" dropdown — masaüstünde tıklama+klavye, mobilde
  // dokunmayla açılıp kapanan basit bir "disclosure". Menü öğeleri gerçek
  // <a> olduğundan (lang-switch'teki <li role="option"> seçeneklerinin
  // aksine) Enter/Space için ekstra bir klavye işleyicisine gerek yoktur;
  // tarayıcılar bağlantıları ve düğmeleri Enter/Space ile zaten native
  // olarak tetikler.
  const worksDropdown = qs(".nav-dropdown");
  const worksTrigger = worksDropdown ? qs(".nav-dropdown-trigger", worksDropdown) : null;

  const closeWorksDropdown = () => {
    if (!worksDropdown || !worksTrigger) return;
    worksDropdown.classList.remove("is-open");
    worksTrigger.setAttribute("aria-expanded", "false");
  };

  if (worksDropdown && worksTrigger) {
    worksTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = worksDropdown.classList.toggle("is-open");
      worksTrigger.setAttribute("aria-expanded", String(isOpen));
    });

    qsa(".nav-dropdown-menu a", worksDropdown).forEach((link) => {
      link.addEventListener("click", closeWorksDropdown);
    });

    document.addEventListener("click", (event) => {
      if (!worksDropdown.contains(event.target)) closeWorksDropdown();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeWorksDropdown();
    });
  }

  // Kaydırma işleyicisi kare başına en fazla bir kez çalışır ve sınıfı
  // yalnızca durum değiştiğinde günceller (her kaydırma olayında DOM'a
  // dokunmamak için).
  let isScrolled = null;
  let scrollScheduled = false;
  const applyScrolled = () => {
    scrollScheduled = false;
    const next = window.scrollY > 8;
    if (next === isScrolled) return;
    isScrolled = next;
    header.classList.toggle("is-scrolled", next);
  };
  const onScroll = () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    window.requestAnimationFrame(applyScrolled);
  };
  applyScrolled();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      qs(".icon-menu", menuToggle)?.classList.toggle("is-open", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
      if (!isOpen) closeWorksDropdown();
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        qs(".icon-menu", menuToggle)?.classList.remove("is-open");
        document.body.style.overflow = "";
        closeWorksDropdown();
      });
    });
  }

  markCurrentPageLinks(worksTrigger);
  initScrollSpy(header, links, worksTrigger);

  // Dil seçimi — 5 dilli (TR/EN/DE/FR/IT) tam çalışan dil dropdown'u.
  // Dropdown'un kendi aç/kapa mekaniği burada kalır; gerçek dil değişimi
  // (çeviri uygulama, localStorage, dinamik bileşenlerin yeniden çizimi)
  // js/i18n.js'deki setLanguage() içinde yapılır.
  const langSwitch = qs(".lang-switch");
  const langTrigger = langSwitch ? qs(".lang-switch-trigger", langSwitch) : null;
  const langOptions = langSwitch ? qsa(".lang-switch-option", langSwitch) : [];

  if (langSwitch && langTrigger) {
    const closeLangSwitch = () => {
      langSwitch.classList.remove("is-open");
      langTrigger.setAttribute("aria-expanded", "false");
    };

    langTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = langSwitch.classList.toggle("is-open");
      langTrigger.setAttribute("aria-expanded", String(isOpen));
    });

    langOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const code = option.dataset.lang;
        if (code) setLanguage(code);
        closeLangSwitch();
        langTrigger.focus();
      });

      option.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          const code = option.dataset.lang;
          if (code) setLanguage(code);
          closeLangSwitch();
          langTrigger.focus();
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!langSwitch.contains(event.target)) closeLangSwitch();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLangSwitch();
    });
  }
}

// Bulunulan sayfanın dosya adı. Site artık tek sayfadır (index.html); bu ve
// aşağıdaki fonksiyon yalnızca geriye dönük uyumluluk için durur. GitHub Pages gibi
// sunucularda kök URL ("/" veya "/repo/") index.html'e, uzantısız adresler
// ("/hakkimizda") ise ilgili .html dosyasına karşılık gelir.
function currentPageName() {
  const last = window.location.pathname.split("/").pop() || "index.html";
  return last.includes(".") ? last : `${last}.html`;
}

// Ayrı bir HTML sayfasında o sayfaya giden nav bağlantısını "aktif" yapar.
// Tek sayfa yapısında index.html dışında sayfa olmadığından erken döner;
// açık tam ekran görünümün bağlantısını js/viewRouter.js işaretler, ana
// sayfa bölümlerini aşağıdaki scroll-spy yönetir.
function markCurrentPageLinks(worksTrigger) {
  const page = currentPageName();
  if (page === "index.html") return;

  qsa(".nav-links a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.includes("#") || href !== page) return;
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
    // Dropdown içindeki bir seçenek bulunulan sayfaysa (ör.
    // Çalışmalarımız), dropdown tetikleyicisi de aktif görünür.
    if (worksTrigger && link.closest(".nav-dropdown")) {
      worksTrigger.classList.add("is-active");
    }
  });
}

// Scroll-spy: hangi bölümün "gerçekten" ekranda olduğunu belirleyip ilgili
// nav bağlantısını vurgular.
//
// Önceki sürüm, ekranın yalnızca %45–%50 yüksekliğindeki dar bir şeride
// bakan bir IntersectionObserver kullanıyordu. Hero kısa olduğu için
// (≈430px) bu şerit sayfa daha açılır açılmaz bir sonraki bölüme
// (#calismalarimiz) denk geliyor, "Çalışmalarımız" kullanıcı o bölüme hiç
// gelmeden aktif görünüyordu; ayrıca hiçbir bölüm şeride girmediğinde
// "Ana Sayfa" hiç aktifleşmiyordu.
//
// Yeni mantık hero yüksekliğinden bağımsızdır:
//  - Sayfa en üstteyken her zaman ilk bölüm (#anasayfa) aktiftir.
//  - Sayfanın en altına gelindiğinde son bölüm aktiftir (kısa son
//    bölümler hiçbir zaman header'ın altına kadar kayamayabilir).
//  - Aksi halde: üst kenarı, header'ın hemen altındaki sabit bir okuma
//    çizgisini (header + en fazla 160px) geçmiş olan SON bölüm aktiftir.
//    Yani bir bölüm, ekranın üst kısmına gerçekten yerleştiğinde aktifleşir.
//  - Nav'da karşılığı olmayan bir bölüm (ör. #hakkinda — nav'daki
//    Hakkımızda artık ayrı sayfaya gidiyor) aktifken hiçbir bağlantı
//    vurgulanmaz; böylece önceki bölümün vurgusu yanlışlıkla kalmaz.
function initScrollSpy(header, links, worksTrigger) {
  const sections = qsa("main section[id]");
  if (!links.length || !sections.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === id);
    });
    // "Çalışmalarımız" bir <button> tetikleyici olduğundan (kendi href'i
    // yok), dropdown içindeki "#calismalarimiz" seçeneği aktifken aynı
    // vurgulama tetikleyiciye de uygulanır.
    if (worksTrigger) {
      worksTrigger.classList.toggle("is-active", id === "#calismalarimiz");
    }
  };

  // Bölüm konumları her karede yeniden ölçülmez: sayfa içindeki mutlak
  // konumlar bir kez hesaplanır ve yalnızca boyut değişince (yeniden
  // boyutlandırma, içerik yüklenmesi, dil değişimi) yenilenir. Kaydırma
  // sırasında yalnızca window.scrollY ile karşılaştırılır.
  let metrics = null;
  const measure = () => {
    const y = window.scrollY;
    metrics = {
      tops: sections.map((section) => section.getBoundingClientRect().top + y),
      headerHeight: header.offsetHeight,
      viewportHeight: window.innerHeight,
      docHeight: document.documentElement.scrollHeight
    };
  };
  const invalidate = () => {
    metrics = null;
  };

  const computeActiveId = () => {
    // Tam ekran görünüm açıkken (js/viewRouter.js) aktif bağlantıyı
    // görünüm yönetir; ana sayfa bölümlerine göre vurgulama yapılmaz.
    if (document.documentElement.classList.contains("has-open-view")) return null;
    if (!metrics) measure();

    const y = window.scrollY;
    const first = sections[0];
    const last = sections[sections.length - 1];
    if (y <= 1) return `#${first.id}`;
    if (metrics.viewportHeight + y >= metrics.docHeight - 2) return `#${last.id}`;

    const line = y + metrics.headerHeight + Math.min(metrics.viewportHeight * 0.25, 160);
    let current = first;
    sections.forEach((section, index) => {
      if (metrics.tops[index] <= line) current = section;
    });
    return `#${current.id}`;
  };

  let lastId = null;
  let scheduled = false;
  const update = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      const id = computeActiveId();
      if (id && id !== lastId) {
        lastId = id;
        setActive(id);
      }
    });
  };

  const initialId = computeActiveId();
  if (initialId) {
    lastId = initialId;
    setActive(initialId);
  }
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", () => {
    invalidate();
    update();
  });
  window.addEventListener("load", () => {
    invalidate();
    update();
  });
  if ("ResizeObserver" in window) {
    const main = document.getElementById("main-content");
    if (main) new ResizeObserver(() => invalidate()).observe(main);
  }
  // Görünüm açılıp kapanınca vurgular görünüm tarafından değiştirildiği
  // için bir sonraki güncellemede yeniden uygulanır.
  document.addEventListener("velora:viewchange", () => {
    lastId = null;
    invalidate();
  });
}
