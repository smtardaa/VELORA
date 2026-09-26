// components/packageContactModal.js — Paketlerimiz bölümündeki paket
// kartlarının iletişim butonuna basıldığında açılan popup.
//
// Popup, kullanıcıyı doğrudan #iletisim bölümüne yönlendirmek yerine
// seçilen pakete göre başlığı değişen bir pencere açar; altında mevcut
// iletişim kanalları (data/contact.js) kare ikon butonlar halinde
// listelenir. Bu aşamada butonlar yalnızca görseldir — hiçbir bağlantıya
// yönlendirmezler (proje kapsamında bilinçli bir karar).

import { contactChannels } from "../data/contact.js";
import { icon } from "../js/icons.js";
import { escapeHtml } from "../js/utils.js";
import { t, onLanguageChange } from "../js/i18n.js";

let overlayEl = null;
let titleEl = null;
let channelsEl = null;
let currentPackageName = "";

function renderTitle() {
  if (!titleEl) return;
  titleEl.textContent = t("packageModal.titleTemplate").replace("{package}", currentPackageName);
}

function renderChannels() {
  if (!channelsEl) return;
  channelsEl.innerHTML = contactChannels
    .map((channel) => {
      const name = t(`contact.channels.${channel.id}`);
      // Kanal butonları şu an yalnızca görsel amaçlıdır: href/click yok,
      // herhangi bir yere yönlendirmezler.
      return `
        <button type="button" class="package-modal-channel" aria-label="${escapeHtml(name)}">
          ${icon(channel.icon)}
        </button>
      `;
    })
    .join("");
}

function closeModal() {
  if (!overlayEl) return;
  overlayEl.classList.remove("is-open");
  document.body.style.overflow = "";
}

export function openPackageContactModal(packageName) {
  if (!overlayEl) return;
  currentPackageName = packageName;
  renderTitle();
  overlayEl.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

export function initPackageContactModal({ overlay, panel, title, channels, closeBtn }) {
  if (!overlay || !panel || !title || !channels) return;

  overlayEl = overlay;
  titleEl = title;
  channelsEl = channels;

  renderChannels();

  closeBtn?.addEventListener("click", closeModal);

  overlayEl.addEventListener("click", (event) => {
    if (event.target === overlayEl) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlayEl.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Dil değiştiğinde: kanal isimleri (aria-label) ve açık ise başlık
  // yeniden çizilir.
  onLanguageChange(() => {
    renderChannels();
    if (overlayEl.classList.contains("is-open")) {
      renderTitle();
    }
  });
}
