// js/projectBriefPage.js — projenizi-anlatin.html sayfasının giriş noktası.
//
// js/staticPage.js (hakkimizda.html) ile aynı ortak bileşenleri başlatır
// (dil sistemi, header, footer sosyal ikonları, arama); buna ek olarak bu
// sayfaya özgü proje anlatım formunu ve iletişim kanalları ızgarasını
// başlatır. İletişim kanalları ana sayfadakiyle aynı kaynaktan
// (data/contact.js) ve aynı bileşenle (components/contact.js) üretilir.

import { logoConfig } from "../data/site-config.js";
import { initHeader } from "../components/header.js";
import { renderContactChannels, renderFooterSocial } from "../components/contact.js";
import { initSearch } from "../components/search.js";
import { initProjectBriefForm } from "../components/projectBriefForm.js";
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

  const contactGrid = qs("#iletisim-grid");
  const footerSocial = qs("#footer-social");
  renderContactChannels(contactGrid);
  renderFooterSocial(footerSocial);
  onLanguageChange(() => renderContactChannels(contactGrid));
  onLanguageChange(() => renderFooterSocial(footerSocial));

  initProjectBriefForm(qs("#project-brief-form"));

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
