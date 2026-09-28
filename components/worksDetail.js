// components/worksDetail.js — calismalarimiz.html sayfasındaki 7 proje
// detay bloğunu (sağda görsel, solda 3'lü accordion) render eder.
//
// Accordion davranışı SSS (components/faq.js) ile aynı görsel/etkileşim
// mantığını kullanır (button + aria-expanded/aria-controls + role="region"
// + max-height animasyonu), ancak her projenin kendi 3 öğesi kendi
// içinde bağımsız bir grup olarak çalışır: bir projede bir öğe açılınca
// yalnızca O PROJENİN diğer iki öğesi kapanır, başka bir projenin açık
// öğesi bundan etkilenmez.
//
// İçerik kaynağı tamamen data/i18n/*.js > works.detail.items.<id>'dir;
// bu dosya hiçbir metni kendi içine gömmez, hiçbir fiyat/süre/teknoloji
// bilgisi uydurmaz. Proje adı ve görsel (icon/image), data/projects.js'den
// (çevrilmeyen alanlar) gelir.

import { projectsData } from "../data/projects.js";
import { icon } from "../js/icons.js";
import { escapeHtml, qsa } from "../js/utils.js";
import { t } from "../js/i18n.js";

function renderVisual(project) {
  return project.image
    ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.name)}" loading="lazy" />`
    : `<span class="work-detail-visual-icon">${icon(project.icon)}</span>`;
}

function renderAccordionItem(projectId, index, labelKey, bodyHtml) {
  const triggerId = `work-trigger-${projectId}-${index}`;
  const panelId = `work-panel-${projectId}-${index}`;

  return `
    <div class="work-accordion-item" data-index="${index}">
      <button type="button" class="work-accordion-trigger" id="${triggerId}" aria-expanded="false" aria-controls="${panelId}">
        <span>${escapeHtml(t(labelKey))}</span>
        ${icon("chevron")}
      </button>
      <div class="work-accordion-panel" id="${panelId}" role="region" aria-labelledby="${triggerId}">
        <div class="work-accordion-panel-inner">${bodyHtml}</div>
      </div>
    </div>
  `;
}

function renderProject(project) {
  const category = t(`works.categories.${project.id}`);
  const detail = t(`works.detail.items.${project.id}`);

  const descriptionHtml = `<p>${escapeHtml(detail.description)}</p>`;

  const benefitsHtml = `
    <ul class="work-benefits">
      ${detail.benefits
        .map((benefit) => `<li>${icon("check")}<span>${escapeHtml(benefit)}</span></li>`)
        .join("")}
    </ul>
    <p class="work-tech-note">${escapeHtml(detail.techNote)}</p>
  `;

  const pricingHtml = `<p>${escapeHtml(t("works.detail.pricingNote"))}</p>`;

  return `
    <article class="work-detail" id="${project.id}">
      <div class="work-detail-info">
        <span class="work-detail-badge">${escapeHtml(t("works.detail.conceptBadge"))}</span>
        <span class="work-detail-category">${escapeHtml(category)}</span>
        <h3 class="work-detail-name">${escapeHtml(project.name)}</h3>

        <div class="work-accordion">
          ${renderAccordionItem(project.id, 0, "works.detail.labels.description", descriptionHtml)}
          ${renderAccordionItem(project.id, 1, "works.detail.labels.benefitsTech", benefitsHtml)}
          ${renderAccordionItem(project.id, 2, "works.detail.labels.pricing", pricingHtml)}
        </div>
      </div>

      <div class="work-detail-visual">
        ${renderVisual(project)}
      </div>
    </article>
  `;
}

export function renderWorksDetail(container) {
  if (!container) return;

  container.innerHTML = projectsData.map(renderProject).join("");

  qsa(".work-accordion", container).forEach((group) => {
    const items = qsa(".work-accordion-item", group);

    items.forEach((item) => {
      const trigger = item.querySelector(".work-accordion-trigger");
      const panel = item.querySelector(".work-accordion-panel");

      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // Sade davranış (SSS ile aynı): bir projenin kendi 3 öğesinden
        // yalnızca biri aynı anda açık kalır. Bu döngü yalnızca `group`
        // (o projenin accordion'u) içindeki öğeleri kapsadığı için diğer
        // projelerin açık öğeleri etkilenmez.
        items.forEach((other) => {
          if (other !== item) {
            other.classList.remove("is-open");
            other.querySelector(".work-accordion-trigger").setAttribute("aria-expanded", "false");
            other.querySelector(".work-accordion-panel").style.maxHeight = null;
          }
        });

        item.classList.toggle("is-open", !isOpen);
        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = !isOpen ? `${panel.scrollHeight}px` : null;
      });
    });
  });
}
