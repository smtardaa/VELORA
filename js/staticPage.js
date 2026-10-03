// js/staticPage.js — içerik ağırlıklı, sade alt sayfaların ortak giriş
// noktası (şu an: hakkimizda.html, projenizi-anlatin.html).
//
// Bu sayfalarda slider, form veya popup yoktur; yalnızca tüm sayfalarda
// ortak olan bileşenler başlatılır: dil sistemi, header (hamburger menü,
// dropdown, dil seçici, aktif sayfa vurgusu), footer sosyal ikonları ve
// site içi arama. Header/footer/i18n/arama mantığı index.html ve
// calismalarimiz.html ile birebir aynı bileşenlerden gelir — burada
// kopyalanmaz. Sayfa metinleri data/i18n/*.js > pages.* altındadır.

import { logoConfig } from "../data/site-config.js";
import { initHeader } from "../components/header.js";
import { renderFooterSocial } from "../components/contact.js";
import { initSearch } from "../components/search.js";
import { initI18n, onLanguageChange } from "./i18n.js";
import { qs, setYear, applyInitialScrollPosition } from "./utils.js";

function applyBrandConfig() {
  // js/main.js > applyBrandConfig() ile aynı mantık: logo dosyası tek bir
  // yerden (data/site-config.js > logoConfig.path) yönetilir.
  document.querySelectorAll("[data-logo-img]").forEach((img) => {
    img.src = logoConfig.path;
  });
}

function init() {
  initI18n();
  applyBrandConfig();
  initHeader();

  const footerSocial = qs("#footer-social");
  renderFooterSocial(footerSocial);
  onLanguageChange(() => renderFooterSocial(footerSocial));

  initSearch({
    trigger: qs("#search-trigger"),
    overlay: qs("#search-overlay"),
    input: qs("#search-input"),
    resultsEl: qs("#search-results"),
    closeBtn: qs("#search-close")
  });

  setYear();
  applyInitialScrollPosition();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
