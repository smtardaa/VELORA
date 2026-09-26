// js/i18n.js — VELORA çoklu dil sistemi.
//
// Sayfayı tamamen yenilemeden, tek bir merkezi çeviri veri yapısı
// (data/i18n/*) üzerinden çalışan sade bir i18n motoru:
//  - t(key)                → mevcut dile göre çeviriyi döndürür (bulunamazsa
//                             TR'ye, o da yoksa anahtarın kendisine düşer).
//  - getLang() / getLanguages()
//  - onLanguageChange(fn)   → dil değiştiğinde çağrılacak dinleyiciler
//                             (dinamik bileşenlerin — paketler, projeler,
//                             SSS, hedeflerimiz, iletişim, arama — kendi
//                             içeriklerini yeniden çizmesi için kullanılır).
//  - setLanguage(code)      → dili değiştirir, localStorage'a yazar, tüm
//                             statik DOM'u ve dil dropdown'unu günceller,
//                             ardından dinleyicileri tetikler.
//  - initI18n()             → sayfa ilk yüklendiğinde (localStorage'dan
//                             veya varsayılan TR) dili uygular ve dropdown
//                             seçeneklerine tıklama davranışını bağlar.
//
// Statik HTML metinleri, index.html içinde data-i18n / data-i18n-placeholder /
// data-i18n-aria-label / data-i18n-alt özniteliğiyle işaretlenir; bu dosya
// yalnızca bu özniteliklere bakarak ilgili metni/placeholder'ı/aria-label'ı/
// alt'ı günceller — hiçbir metin bu dosyanın içine gömülmez.

import { translations } from "../data/i18n/index.js";
import { languages, DEFAULT_LANG } from "../data/i18n/languages.js";

const STORAGE_KEY = "velora-lang";

let currentLang = DEFAULT_LANG;
const listeners = [];

function readStoredLang() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && translations[stored]) return stored;
  } catch (error) {
    // localStorage kapalı/erişilemez olabilir (gizli sekme vb.) — sessizce
    // varsayılana düş, siteyi bu yüzden bozma.
  }
  return null;
}

function persistLang(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    // Kaydedilemezse dil yine de bu oturumda uygulanmaya devam eder;
    // yalnızca bir sonraki ziyarette hatırlanmaz.
  }
}

function resolvePath(path, obj) {
  return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export function t(key) {
  const current = resolvePath(key, translations[currentLang]);
  if (current !== undefined) return current;

  const fallback = resolvePath(key, translations[DEFAULT_LANG]);
  if (fallback !== undefined) return fallback;

  return key;
}

export function getLang() {
  return currentLang;
}

export function getLanguages() {
  return languages;
}

export function onLanguageChange(callback) {
  listeners.push(callback);
}

function applyStaticDom(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
  root.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
  });
  root.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
  });
}

function updateLangSwitchUI() {
  const codeEl = document.querySelector(".lang-switch-code");
  if (codeEl) codeEl.textContent = currentLang.toUpperCase();

  const trigger = document.querySelector(".lang-switch-trigger");
  if (trigger) {
    const activeLanguage = languages.find((lang) => lang.code === currentLang);
    const nativeName = activeLanguage ? activeLanguage.nativeName : currentLang.toUpperCase();
    trigger.setAttribute("aria-label", `${t("langSwitch.ariaLabel")}: ${nativeName}`);
  }

  document.querySelectorAll(".lang-switch-option").forEach((option) => {
    const isSelected = option.dataset.lang === currentLang;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-selected", String(isSelected));
  });
}

function applyMeta() {
  document.documentElement.setAttribute("lang", currentLang);
  document.title = t("meta.title");
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", t("meta.description"));
}

function applyAll() {
  applyMeta();
  applyStaticDom(document);
  updateLangSwitchUI();
}

export function setLanguage(lang) {
  if (!translations[lang] || lang === currentLang) return;

  currentLang = lang;
  persistLang(lang);
  applyAll();

  listeners.forEach((callback) => {
    try {
      callback(currentLang);
    } catch (error) {
      // Bir dinleyicideki hata diğer bileşenlerin güncellenmesini
      // engellememeli.
      // eslint-disable-next-line no-console
      console.error("[i18n] onLanguageChange dinleyicisinde hata:", error);
    }
  });
}

export function initI18n() {
  currentLang = readStoredLang() || DEFAULT_LANG;
  applyAll();
}
