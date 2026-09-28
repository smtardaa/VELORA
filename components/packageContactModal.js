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
import { escapeHtml, trapFocus } from "../js/utils.js";
import { t, onLanguageChange } from "../js/i18n.js";

let overlayEl = null;
let panelEl = null;
let titleEl = null;
let channelsEl = null;
let closeBtnEl = null;
let currentPackageName = "";
let releaseFocusTrap = null;
let previouslyFocusedEl = null;

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

  if (releaseFocusTrap) {
    releaseFocusTrap();
    releaseFocusTrap = null;
  }
  // Odağı popup'ı açan öğeye (paket kartındaki iletişim butonu) geri
  // ver — klavye/ekran okuyucu kullanıcıları kapanıştan sonra sayfanın
  // başına değil, kaldıkları yere döner.
  previouslyFocusedEl?.focus();
  previouslyFocusedEl = null;
}

export function openPackageContactModal(packageName) {
  if (!overlayEl) return;
  previouslyFocusedEl = document.activeElement;
  currentPackageName = packageName;
  renderTitle();
  overlayEl.classList.add("is-open");
  document.body.style.overflow = "hidden";

  if (panelEl) releaseFocusTrap = trapFocus(panelEl);
  // Popup açılır açılmaz odağı kapatma butonuna taşı; aksi halde
  // klavye/ekran okuyucu kullanıcıları için odak sayfada kaldığı
  // yerde (görünmeyen bir arka plan öğesinde) kalıyordu.
  closeBtnEl?.focus();
}

export function initPackageContactModal({ overlay, panel, title, channels, closeBtn }) {
  if (!overlay || !panel || !title || !channels) return;

  overlayEl = overlay;
  panelEl = panel;
  titleEl = title;
  channelsEl = channels;
  closeBtnEl = closeBtn || null;

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
