// components/hizmetler.js — "Hizmetlerimiz" bölümündeki iki büyük kart:
// web sitesi sahibi olmanın faydaları ve hizmet verilen sektörler.
// İçerik tamamen data/benefits.js ve data/industries.js dosyalarından gelir.

import { websiteBenefits } from "../data/benefits.js";
import { industries } from "../data/industries.js";
import { icon } from "../js/icons.js";
import { escapeHtml } from "../js/utils.js";

export function renderBenefits(container) {
  if (!container) return;

  container.innerHTML = `
    <h3>Web Sitenizin Faydaları</h3>
    <p class="lede">Bir web sitesine sahip olmak markanıza somut avantajlar kazandırır.</p>
    <ul class="benefit-list">
      ${websiteBenefits
        .map(
          (item) => `
            <li class="benefit-chip">
              ${icon(item.icon)}
              <div class="benefit-chip-text">
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.description)}</span>
              </div>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

export function renderIndustries(container) {
  if (!container) return;

  container.innerHTML = `
    <h3>Hizmet Verdiğimiz Sektörler</h3>
    <p class="lede">Farklı sektörlere uygun web siteleri tasarlıyoruz.</p>
    <div class="industry-grid">
      ${industries
        .map(
          (item) => `
            <div class="industry-chip">
              ${icon(item.icon)}
              <span>${escapeHtml(item.name)}</span>
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
