// components/contact.js — iletişim kanallarını data/contact.js verisinden üretir.
// Tüm değerler VELORA'ya ait örnek/placeholder bilgilerdir.

import { contactChannels } from "../data/contact.js";
import { icon } from "../js/icons.js";
import { escapeHtml } from "../js/utils.js";
import { t } from "../js/i18n.js";

// Kartta gösterilecek metin: "value" doluysa o; boşsa (ör. LinkedIn/GitHub
// adresi girildi ama ayrıca kısa bir görünen metin yazılmadı) adresin
// protokolsüz hali gösterilir — kart hiçbir zaman boş kalmaz.
function displayValue(channel) {
  if (channel.value) return channel.value;
  return channel.href.replace(/^(https?:\/\/)?(www\.)?/i, "").replace(/\/$/, "");
}

export function renderContactChannels(container) {
  if (!container) return;

  container.innerHTML = contactChannels
    .map((channel) => {
      // Kanal etiketi (ör. "E-posta"/"Telefon") mevcut dile göre çevrilir;
      // gerçek değer (e-posta adresi, telefon, kullanıcı adı) değişmez.
      const name = t(`contact.channels.${channel.id}`);

      // "href" boş ("") olan kanallar (şu an: linkedin, github — adresleri
      // data/contact.js > socialProfileUrls içinde) henüz gerçek bir
      // adrese sahip değildir. Bunlar "#" gibi sahte bir hedefe sahip
      // çalışan-gibi-görünen bir bağlantı olarak DEĞİL, href'siz bir
      // <a role="link" aria-disabled="true"> olarak render edilir: href
      // olmadığı için tıklanamaz ve tab sırasına girmez; role/aria-disabled
      // sayesinde ekran okuyuculara "devre dışı bağlantı" olarak bildirilir.
      // Adres girildiği anda aşağıdaki normal <a href> yoluna geçer.
      // Not: whatsapp/instagram/facebook/tiktok/telegram zaten önceden
      // beri "#" placeholder'ı kullanıyor (href boş değil) — bu kontrol
      // onları etkilemez.
      if (!channel.href) {
        const pending = t("contact.pendingLabel");
        return `
          <a class="card contact-card is-pending" role="link" aria-disabled="true" aria-label="${escapeHtml(name)}: ${escapeHtml(pending)}">
            <span class="icon-wrap">${icon(channel.icon)}</span>
            <h3>${escapeHtml(name)}</h3>
            <p>${escapeHtml(pending)}</p>
          </a>
        `;
      }

      const isExternal = /^https?:/i.test(channel.href);
      const label = displayValue(channel);
      return `
        <a
          class="card contact-card"
          href="${escapeHtml(channel.href)}"
          ${isExternal ? 'target="_blank" rel="noopener"' : ""}
          aria-label="${escapeHtml(name)}: ${escapeHtml(label)}"
        >
          <span class="icon-wrap">${icon(channel.icon)}</span>
          <h3>${escapeHtml(name)}</h3>
          <p>${escapeHtml(label)}</p>
        </a>
      `;
    })
    .join("");
}

export function renderFooterSocial(container) {
  if (!container) return;

  const footerChannels = contactChannels.filter((channel) => channel.showInFooter);

  container.innerHTML = footerChannels
    .map((channel) => {
      const name = t(`contact.channels.${channel.id}`);

      // Yukarıdaki renderContactChannels() ile aynı mantık: href boşsa
      // (linkedin/github) footer'da da href'siz, devre dışı bir bağlantı
      // gösterilir.
      if (!channel.href) {
        return `
          <a class="icon-btn is-pending" role="link" aria-disabled="true" aria-label="${escapeHtml(name)}: ${escapeHtml(t("contact.pendingLabel"))}">
            ${icon(channel.icon)}
          </a>
        `;
      }

      return `
        <a class="icon-btn" href="${escapeHtml(channel.href)}" aria-label="${escapeHtml(name)}" target="_blank" rel="noopener">
          ${icon(channel.icon)}
        </a>
      `;
    })
    .join("");
}
