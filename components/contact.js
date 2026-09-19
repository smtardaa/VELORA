// components/contact.js — iletişim bilgilerini data/contact.js verisinden üretir

import { contactData } from "../data/contact.js";
import { icon } from "../js/icons.js";
import { escapeHtml } from "../js/utils.js";

export function renderContact(container) {
  if (!container) return;

  container.innerHTML = `
    <article class="card contact-card" data-animate>
      <div class="icon-wrap">${icon("mail")}</div>
      <h3>E-posta</h3>
      <p><a href="mailto:${escapeHtml(contactData.email)}">${escapeHtml(contactData.email)}</a></p>
    </article>
    <article class="card contact-card" data-animate>
      <div class="icon-wrap">${icon("phone")}</div>
      <h3>Telefon</h3>
      <p>${escapeHtml(contactData.phone)}</p>
    </article>
    <article class="card contact-card" data-animate>
      <div class="icon-wrap">${icon("pin")}</div>
      <h3>Adres</h3>
      <p>${escapeHtml(contactData.address)}</p>
    </article>
  `;
}

export function renderSocialLinks(container) {
  if (!container) return;

  container.innerHTML = contactData.social
    .map(
      (item) => `
        <a class="icon-btn" href="${escapeHtml(item.url)}" aria-label="${escapeHtml(item.name)}" target="_blank" rel="noopener">
          ${icon(item.icon)}
        </a>
      `
    )
    .join("");
}

export function getContactData() {
  return contactData;
}
