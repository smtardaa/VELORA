// components/contact.js — iletişim kanallarını data/contact.js verisinden üretir.
// Tüm değerler VELORA'ya ait örnek/placeholder bilgilerdir.

import { contactChannels } from "../data/contact.js";
import { icon } from "../js/icons.js";
import { escapeHtml } from "../js/utils.js";
import { t } from "../js/i18n.js";

export function renderContactChannels(container) {
  if (!container) return;

  container.innerHTML = contactChannels
    .map((channel) => {
      const isExternal = /^https?:/i.test(channel.href);
      // Kanal etiketi (ör. "E-posta"/"Telefon") mevcut dile göre çevrilir;
      // gerçek değer (e-posta adresi, telefon, kullanıcı adı) değişmez.
      const name = t(`contact.channels.${channel.id}`);
      return `
        <a
          class="card contact-card"
          href="${escapeHtml(channel.href)}"
          ${isExternal ? 'target="_blank" rel="noopener"' : ""}
          aria-label="${escapeHtml(name)}: ${escapeHtml(channel.value)}"
        >
          <span class="icon-wrap">${icon(channel.icon)}</span>
          <h3>${escapeHtml(name)}</h3>
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
        <a class="icon-btn" href="${escapeHtml(channel.href)}" aria-label="${escapeHtml(t(`contact.channels.${channel.id}`))}" target="_blank" rel="noopener">
          ${icon(channel.icon)}
        </a>
      `
    )
    .join("");
}
