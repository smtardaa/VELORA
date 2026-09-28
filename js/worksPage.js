// js/worksPage.js — calismalarimiz.html sayfasının giriş noktası.
//
// js/main.js'teki ana sayfa bootstrap'ından bilinçli olarak ayrı
// tutulur: bu sayfada paket/proje slider'ı, soru formu ve paket
// iletişim popup'ı yoktur; yalnızca bu sayfanın gerçekten kullandığı
// ortak bileşenler (header, footer, dil sistemi, arama ve yeni proje
// detay listesi) başlatılır. Header/footer/i18n/arama mantığının
// kendisi index.html ile birebir aynı bileşenlerden (components/*,
// js/i18n.js) gelir — burada kopyalanmaz.

import { logoConfig } from "../data/site-config.js";
import { initHeader } from "../components/header.js";
import { renderFooterSocial } from "../components/contact.js";
import { renderWorksDetail } from "../components/worksDetail.js";
import { initSearch } from "../components/search.js";
import { initI18n, onLanguageChange } from "./i18n.js";
import { qs, setYear } from "./utils.js";

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
  const worksDetailList = qs("#works-detail-list");

  renderFooterSocial(footerSocial);
  renderWorksDetail(worksDetailList);

  onLanguageChange(() => renderFooterSocial(footerSocial));
  onLanguageChange(() => renderWorksDetail(worksDetailList));

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
