// components/packages.js — Paketler bölümü (yalnızca index.html).
//
// Yapı: 4 fiyatlı paket kartı + standart paketlere uymayan talepler için
// ayrı, fiyatsız bir "Kendi Projenizi Anlatın" kartı. Kartlar statik bir
// ızgarada gösterilir (masaüstü 4 sütun, tablet 2 sütun, mobil tek sütun;
// 5. kart her zaman tam genişlikte, ızgaranın altında). Önceki paket
// slider'ı (oklar/noktalar) kaldırıldı: 5 kartın içeriği (fiyat, dahil
// olanlar, dahil olmayanlar) yan yana karşılaştırılabilsin ve kartlar
// kaydırma sırasında sırayla görünebilsin diye.
//
// Görünme animasyonu: kartlar ekrana girdikçe 1., 2., 3., 4. (ve 5.) sırayla
// kısa bir opaklık/kayma geçişiyle görünür. Hareketi azaltma tercihi
// (prefers-reduced-motion) açıksa veya IntersectionObserver yoksa kartlar
// doğrudan görünür durumda çizilir — hiçbir içerik gizli kalmaz.

import { packagesData, priceCurrencyLabel } from "../data/packages.js";
import { icon } from "../js/icons.js";
import { escapeHtml } from "../js/utils.js";
import { t, getLang, onLanguageChange } from "../js/i18n.js";
import { openPackageContactModal } from "./packageContactModal.js";

const NUMBER_LOCALES = { tr: "tr-TR", en: "en-US", de: "de-DE", fr: "fr-FR", it: "it-IT" };
const REVEAL_STEP_MS = 110;

// Paket verisinin çevrilebilir kısımları data/i18n/*.js > packages.items.<id>
// altındadır; yapısal alanlar (id, startingPrice, highlighted, ctaHref)
// yalnızca data/packages.js'ten gelir.
function getTranslatedPackages() {
  return packagesData.map((pkg) => ({ ...t(`packages.items.${pkg.id}`), ...pkg }));
}

function formatPrice(value) {
  const locale = NUMBER_LOCALES[getLang()] || "tr-TR";
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}

function renderList(items, className, iconName) {
  if (!Array.isArray(items) || !items.length) return "";
  return `
    <ul class="${className}">
      ${items
        .map((item) => `<li>${iconName ? icon(iconName) : '<span class="package-dash" aria-hidden="true"></span>'}<span>${escapeHtml(item)}</span></li>`)
        .join("")}
    </ul>
  `;
}

function renderPricedCard(pkg, order) {
  const headingId = `package-${pkg.id}-name`;
  return `
    <article class="package-card${pkg.highlighted ? " is-highlighted" : ""}" data-order="${order}" aria-labelledby="${headingId}">
      <div class="package-head">
        <h3 class="package-name" id="${headingId}">${escapeHtml(pkg.name)}</h3>
        <p class="package-audience">${escapeHtml(pkg.audience)}</p>
      </div>
      <p class="package-price">
        <span class="package-price-label">${escapeHtml(t("packages.priceLabel"))}</span>
        <span class="package-price-value">${escapeHtml(formatPrice(pkg.startingPrice))}<span class="package-price-currency"> ${escapeHtml(priceCurrencyLabel)}</span></span>
      </p>
      <p class="package-description">${escapeHtml(pkg.description)}</p>
      <div class="package-list-group">
        <p class="package-list-title">${escapeHtml(t("packages.includesLabel"))}</p>
        ${renderList(pkg.features, "package-features", "check")}
      </div>
      <div class="package-list-group package-list-group-extras">
        <p class="package-list-title">${escapeHtml(t("packages.extrasLabel"))}</p>
        ${renderList(pkg.extras, "package-extras")}
      </div>
      <button type="button" class="btn ${pkg.highlighted ? "btn-primary" : "btn-secondary"} btn-block package-contact-trigger" data-package-name="${escapeHtml(pkg.name)}">
        ${escapeHtml(pkg.cta)}
      </button>
    </article>
  `;
}

// Standart paketlere uymayan özel talepler kartı: fiyat göstermez, örnek
// listesi yalnızca "değerlendirilebilecek" konulardır ve buton popup
// açmak yerine Projenizi Anlatın görünümünü (#/projenizi-anlatin) açan
// gerçek bir bağlantıdır.
function renderCustomCard(pkg, order) {
  const headingId = `package-${pkg.id}-name`;
  return `
    <article class="package-card package-card-custom" data-order="${order}" aria-labelledby="${headingId}">
      <div class="package-custom-main">
        <h3 class="package-name" id="${headingId}">${escapeHtml(pkg.name)}</h3>
        <p class="package-description">${escapeHtml(pkg.description)}</p>
        <p class="package-custom-price">${escapeHtml(t("packages.custom.priceText"))}</p>
      </div>
      <div class="package-custom-examples">
        <p class="package-list-title">${escapeHtml(t("packages.custom.examplesLabel"))}</p>
        ${renderList(pkg.examples, "package-examples")}
      </div>
      <a class="btn btn-secondary package-contact-trigger-link" href="${escapeHtml(pkg.ctaHref)}">${escapeHtml(pkg.cta)}</a>
    </article>
  `;
}

export function initPackages({ gridEl }) {
  if (!gridEl) return;

  // Görünür hale gelmiş kartların sırası; dil değişiminde kartlar yeniden
  // çizildiğinde zaten görünmüş olanlar tekrar gizlenmez.
  const revealedOrders = new Set();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canReveal = "IntersectionObserver" in window && !reduceMotion.matches;
  let observer = null;

  function reveal(card, delayMs) {
    card.style.setProperty("--reveal-delay", `${delayMs}ms`);
    card.classList.add("is-revealed");
    revealedOrders.add(card.dataset.order);
    // Gecikme yalnızca giriş animasyonu içindir; sonrasında hover
    // geçişleri gecikmesiz çalışsın diye temizlenir.
    window.setTimeout(() => card.style.removeProperty("--reveal-delay"), delayMs + 600);
  }

  if (canReveal) {
    gridEl.classList.add("is-reveal-ready");
    observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target)
          .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order))
          .forEach((card, index) => {
            reveal(card, index * REVEAL_STEP_MS);
            observer.unobserve(card);
          });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
  }

  function render() {
    if (observer) observer.disconnect();

    gridEl.innerHTML = getTranslatedPackages()
      .map((pkg, index) => (pkg.ctaHref ? renderCustomCard(pkg, index) : renderPricedCard(pkg, index)))
      .join("");

    if (!observer) return;
    gridEl.querySelectorAll(".package-card").forEach((card) => {
      if (revealedOrders.has(card.dataset.order)) card.classList.add("is-revealed");
      else observer.observe(card);
    });
  }

  // Paket kartındaki iletişim butonu seçilen pakete göre içeriği değişen
  // popup'ı açar. Kartlar yeniden çizildiği için dinleyici, hiç
  // değişmeyen gridEl üzerinde tek seferlik olay delegasyonu ile bağlanır.
  gridEl.addEventListener("click", (event) => {
    const trigger = event.target.closest(".package-contact-trigger");
    if (!trigger) return;
    openPackageContactModal(trigger.dataset.packageName);
  });

  render();
  onLanguageChange(render);
}
