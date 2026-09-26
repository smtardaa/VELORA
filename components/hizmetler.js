// components/hizmetler.js — "Hizmetlerimiz" bölümündeki iki büyük kart:
// web sitesi sahibi olmanın faydaları ve hizmet verilen sektörler.
// İçerik tamamen data/benefits.js ve data/industries.js dosyalarından gelir.

import { websiteBenefits } from "../data/benefits.js";
import { industries } from "../data/industries.js";
import { icon } from "../js/icons.js";
import { escapeHtml } from "../js/utils.js";
import { t } from "../js/i18n.js";

export function renderBenefits(container) {
  if (!container) return;

  container.innerHTML = `
    <h3>${escapeHtml(t("goals.benefitsTitle"))}</h3>
    <p class="lede">${escapeHtml(t("goals.benefitsLede"))}</p>
    <ul class="benefit-list">
      ${websiteBenefits
        .map((item) => {
          const translated = t(`goals.benefits.${item.icon}`);
          return `
            <li class="benefit-chip">
              ${icon(item.icon)}
              <div class="benefit-chip-text">
                <strong>${escapeHtml(translated.title)}</strong>
                <span>${escapeHtml(translated.description)}</span>
              </div>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

export function renderIndustries(container) {
  if (!container) return;

  container.innerHTML = `
    <h3>${escapeHtml(t("goals.industriesTitle"))}</h3>
    <p class="lede">${escapeHtml(t("goals.industriesLede"))}</p>
    <div class="industry-grid">
      ${industries
        .map(
          (item) => `
            <div class="industry-chip">
              ${icon(item.icon)}
              <span>${escapeHtml(t(`goals.industries.${item.icon}`))}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

export function getBenefitsData() {
  return websiteBenefits;
}

export function getIndustriesData() {
  return industries;
}
