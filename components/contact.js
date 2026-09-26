// components/contact.js — iletişim kanallarını data/contact.js verisinden üretir.
// Tüm değerler VELORA'ya ait örnek/placeholder bilgilerdir.

import { contactChannels } from "../data/contact.js";
import { icon } from "../js/icons.js";
import { escapeHtml } from "../js/utils.js";

export function renderContactChannels(container) {
  if (!container) return;

  container.innerHTML = contactChannels
    .map((channel) => {
      const isExternal = /^https?:/i.test(channel.href);
      return `
        <a
          class="card contact-card"
          href="${escapeHtml(channel.href)}"
          ${isExternal ? 'target="_blank" rel="noopener"' : ""}
          aria-label="${escapeHtml(channel.name)}: ${escapeHtml(channel.value)}"
        >
          <span class="icon-wrap">${icon(channel.icon)}</span>
          <h3>${escapeHtml(channel.name)}</h3>
          <p>${escapeHtml(channel.value)}</p>
        </a>
      `;
    })
    .join("");
}

export function renderFooterSocial(container) {
  if (!container) return;

  const footerChannels = contactChannels.filter((channel) => channel.showInFooter);

  container.innerHTML = footerChannels
    .map(
      (channel) => `
        <a class="icon-btn" href="${escapeHtml(channel.href)}" aria-label="${escapeHtml(channel.name)}" target="_blank" rel="noopener">
          ${icon(channel.icon)}
        </a>
      `
    )
    .join("");
}

export function getContactChannels() {
  return contactChannels;
}
