// components/packages.js — paket kartlarını data/packages.js verisinden üretir

import { packagesData } from "../data/packages.js";
import { icon } from "../js/icons.js";
import { escapeHtml } from "../js/utils.js";

export function renderPackages(container) {
  if (!container) return;

  container.innerHTML = packagesData
    .map(
      (pkg) => `
        <article class="card package-card${pkg.highlighted ? " is-highlighted" : ""}" data-animate>
          ${pkg.badge ? `<span class="package-badge">${escapeHtml(pkg.badge)}</span>` : ""}
          <h3 class="package-name">${escapeHtml(pkg.name)}</h3>
          <div class="package-price">
            <span class="amount">${escapeHtml(pkg.price)}</span>
            <span class="note">${escapeHtml(pkg.priceNote)}</span>
          </div>
          <p class="package-description">${escapeHtml(pkg.description)}</p>
          <ul class="package-features">
            ${pkg.features
              .map(
                (feature) => `
                  <li>${icon("check")}<span>${escapeHtml(feature)}</span></li>
                `
              )
              .join("")}
          </ul>
          <a href="#soru-sor" class="btn ${pkg.highlighted ? "btn-primary" : "btn-secondary"} btn-block" data-package="${escapeHtml(pkg.name)}">
            ${escapeHtml(pkg.cta)}
          </a>
        </article>
      `
    )
    .join("");

  container.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-package]");
    if (!trigger) return;
    const questionField = document.querySelector("#soru");
    if (questionField && !questionField.value) {
      questionField.value = `${trigger.dataset.package} paketi hakkında bilgi almak istiyorum.`;
    }
  });
}

export function getPackagesData() {
  return packagesData;
}
