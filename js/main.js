// js/main.js — uygulama giriş noktası. Tüm bileşenleri başlatır.

import { logoConfig, siteConfig } from "../data/site-config.js";
import { initHeader } from "../components/header.js";
import { renderBenefits, renderIndustries } from "../components/hizmetler.js";
import { initPackagesSlider } from "../components/packages.js";
import { initProjectsSlider } from "../components/projects.js";
import { renderFaq } from "../components/faq.js";
import { renderContactChannels, renderFooterSocial } from "../components/contact.js";
import { initQuestionForm } from "../components/questionForm.js";
import { initSearch } from "../components/search.js";
import { qs } from "./utils.js";

function setYear() {
  const el = qs("#current-year");
  if (el) el.textContent = new Date().getFullYear();
}

function applyBrandConfig() {
  // Logo ve marka adı, tek bir yerden (data/site-config.js) yönetilir.
  document.querySelectorAll("[data-logo-img]").forEach((img) => {
    img.src = logoConfig.path;
    img.alt = logoConfig.alt;
  });
  document.querySelectorAll("[data-brand-name]").forEach((el) => {
    el.textContent = siteConfig.brandName;
  });
  document.querySelectorAll("[data-brand-tagline]").forEach((el) => {
    el.textContent = siteConfig.tagline;
  });
}

function init() {
  applyBrandConfig();

  initHeader();

  renderBenefits(qs("#benefits-card"));
  renderIndustries(qs("#industries-card"));

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

  renderFaq(qs("#sss-list"));
  renderContactChannels(qs("#iletisim-grid"));
  renderFooterSocial(qs("#footer-social"));

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
