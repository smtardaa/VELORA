// js/main.js — uygulama giriş noktası. Tüm bileşenleri başlatır.

import { logoConfig } from "../data/site-config.js";
import { initHeader } from "../components/header.js";
import { initPackagesSlider } from "../components/packages.js";
import { initProjectsSlider } from "../components/projects.js";
import { renderFaq } from "../components/faq.js";
import { renderContactChannels, renderFooterSocial } from "../components/contact.js";
import { initQuestionForm } from "../components/questionForm.js";
import { initSearch } from "../components/search.js";
import { initPackageContactModal } from "../components/packageContactModal.js";
import { initI18n, onLanguageChange } from "./i18n.js";
import { qs } from "./utils.js";

function setYear() {
  const el = qs("#current-year");
  if (el) el.textContent = new Date().getFullYear();
}

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

  initHeader();

  const sssList = qs("#sss-list");
  const iletisimGrid = qs("#iletisim-grid");
  const footerSocial = qs("#footer-social");

  initPackageContactModal({
    overlay: qs("#package-modal-overlay"),
    panel: qs(".package-modal-panel"),
    title: qs("#package-modal-title"),
    channels: qs("#package-modal-channels"),
    closeBtn: qs("#package-modal-close")
  });

  initPackagesSlider({
    sliderEl: qs("#packages-slider"),
    trackEl: qs("#packages-track"),
    prevBtn: qs(".slider-prev"),
    nextBtn: qs(".slider-next"),
    dotsEl: qs("#packages-dots")
  });

  initProjectsSlider({
    sliderEl: qs("#works-slider"),
    trackEl: qs("#works-track"),
    prevBtn: qs(".works-prev"),
    nextBtn: qs(".works-next")
  });

  renderFaq(sssList);
  renderContactChannels(iletisimGrid);
  renderFooterSocial(footerSocial);

  // "Saf render" bileşenleri (kendi init sarmalayıcısı olmayan, doğrudan
  // çağrılan renderX fonksiyonları): dil değişince yeniden çizilmeleri
  // için dinleyici burada, yalnızca BİR KEZ kaydedilir — bileşen
  // dosyalarının içinden değil (aksi halde her dil değişiminde dinleyici
  // sayısı katlanarak artar).
  onLanguageChange(() => renderFaq(sssList));
  onLanguageChange(() => renderContactChannels(iletisimGrid));
  onLanguageChange(() => renderFooterSocial(footerSocial));

  initQuestionForm(qs("#soru-form"));

  initSearch({
    trigger: qs("#search-trigger"),
    overlay: qs("#search-overlay"),
    input: qs("#search-input"),
    resultsEl: qs("#search-results"),
    closeBtn: qs("#search-close")
  });

  setYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
