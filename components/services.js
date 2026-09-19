// components/services.js — hizmet kartlarını data/services.js verisinden üretir

import { servicesData } from "../data/services.js";
import { icon } from "../js/icons.js";
import { escapeHtml } from "../js/utils.js";

export function renderServices(container) {
  if (!container) return;

  container.innerHTML = servicesData
    .map(
      (service) => `
        <article class="card service-card" data-animate>
          <div class="icon-wrap">${icon(service.icon)}</div>
          <h3>${escapeHtml(service.name)}</h3>
          <p>${escapeHtml(service.description)}</p>
        </article>
      `
    )
    .join("");
}

export function getServicesData() {
  return servicesData;
}
