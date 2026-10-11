// js/main.js — uygulama giriş noktası. Tüm bileşenleri başlatır.
//
// Site tek bir HTML sayfasıdır (index.html): ana sayfa + üç tam ekran görünüm
// (Çalışmalarımız, Hakkımızda, Projenizi Anlatın). Görünümlerin açılıp
// kapanması, adres/geçmiş yönetimi ve geçiş animasyonu js/viewRouter.js'tedir.

import { logoConfig } from "../data/site-config.js";
import { initHeader } from "../components/header.js";
import { initPackages } from "../components/packages.js";
import { initProjectsSlider } from "../components/projects.js";
import { renderFaq } from "../components/faq.js";
import { renderContactChannels, renderFooterSocial } from "../components/contact.js";
import { initQuestionForm } from "../components/questionForm.js";
import { initSearch } from "../components/search.js";
import { initPackageContactModal } from "../components/packageContactModal.js";
import { renderWorksDetail } from "../components/worksDetail.js";
import { initProjectBriefForm } from "../components/projectBriefForm.js";
import { initI18n, onLanguageChange } from "./i18n.js";
import { prepareViewFooters, initViewRouter } from "./viewRouter.js";
import { createReveal } from "./reveal.js";
import { qs, qsa, applyInitialScrollPosition } from "./utils.js";

function applyBrandConfig() {
  // Logo dosyası tek bir yerden (data/site-config.js > logoConfig.path)
  // yönetilir; header ve footer'daki [data-logo-img] elemanları buradan
  // kaynak alır. Alt metni ise data-i18n-alt="misc.logoAlt" ile
  // js/i18n.js tarafından yönetilir.
  document.querySelectorAll("[data-logo-img]").forEach((img) => {
    img.src = logoConfig.path;
  });
}

function init() {
  // Dil sistemi en başta başlatılır: localStorage'dan (veya varsayılan TR)
  // dili okur ve statik DOM'u uygular — böylece aşağıdaki dinamik
  // bileşenler ilk render'larında zaten doğru dille içerik üretir.
  initI18n();

  applyBrandConfig();

  // Görünümlerin footer'ları ana sayfa footer'ından klonlanır; sosyal
  // ikonlar ve telif yılı aşağıda tüm footer'lara birlikte çizilir.
  prepareViewFooters();

  initHeader();

  const sssList = qs("#sss-list");
  const iletisimGrid = qs("#iletisim-grid");
  const briefContactGrid = qs("#brief-contact-grid");
  const footerSocials = qsa(".footer-social");
  const worksDetailList = qs("#works-detail-list");

  initPackageContactModal({
    overlay: qs("#package-modal-overlay"),
    panel: qs(".package-modal-panel"),
    title: qs("#package-modal-title"),
    channels: qs("#package-modal-channels"),
    closeBtn: qs("#package-modal-close")
  });

  initPackages({ gridEl: qs("#packages-grid") });

  initProjectsSlider({
    sliderEl: qs("#works-slider"),
    viewportEl: qs("#works-slider .works-viewport"),
    trackEl: qs("#works-track"),
    prevBtn: qs(".works-prev"),
    nextBtn: qs(".works-next"),
    dotsEl: qs("#works-dots")
  });

  renderFaq(sssList);
  renderContactChannels(iletisimGrid);
  renderContactChannels(briefContactGrid);
  footerSocials.forEach((el) => renderFooterSocial(el));
  renderWorksDetail(worksDetailList);

  // Görünümlerde kartların sıralı görünmesi (paketlerdeki animasyon dili).
  const worksReveal = createReveal(worksDetailList, ".work-detail");
  createReveal(qs("#view-hakkimizda .page-blocks"), ".page-block");

  // "Saf render" bileşenleri (kendi init sarmalayıcısı olmayan, doğrudan
  // çağrılan renderX fonksiyonları): dil değişince yeniden çizilmeleri
  // için dinleyici burada, yalnızca BİR KEZ kaydedilir — bileşen
  // dosyalarının içinden değil (aksi halde her dil değişiminde dinleyici
  // sayısı katlanarak artar).
  onLanguageChange(() => renderFaq(sssList));
  onLanguageChange(() => renderContactChannels(iletisimGrid));
  onLanguageChange(() => renderContactChannels(briefContactGrid));
  onLanguageChange(() => footerSocials.forEach((el) => renderFooterSocial(el)));
  onLanguageChange(() => {
    renderWorksDetail(worksDetailList);
    worksReveal.refresh();
  });

  initQuestionForm(qs("#soru-form"));
  initProjectBriefForm(qs("#project-brief-form"));

  initSearch({
    trigger: qs("#search-trigger"),
    overlay: qs("#search-overlay"),
    input: qs("#search-input"),
    resultsEl: qs("#search-results"),
    closeBtn: qs("#search-close")
  });

  const year = String(new Date().getFullYear());
  qsa("[data-current-year]").forEach((el) => {
    el.textContent = year;
  });

  // Dinamik içerik render edildikten sonra: hash yoksa en üstten başla,
  // ana sayfa bölümü hash'i varsa hedefe git (bkz. js/utils.js). Görünüm
  // adresleri (#/…) bu çağrıdan sonra yönlendirici tarafından uygulanır.
  applyInitialScrollPosition();
  initViewRouter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
