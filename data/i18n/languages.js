// data/i18n/languages.js — desteklenen diller ve varsayılan dil.
// Dropdown'daki her dil, kendi ana adıyla (native name) gösterilir; bu
// liste aktif site diline göre çevrilmez (dil seçicilerde standart pratik
// budur — kullanıcı kendi dilini her zaman aynı adla bulabilir).

export const DEFAULT_LANG = "tr";

export const languages = [
  { code: "tr", nativeName: "Türkçe" },
  { code: "en", nativeName: "English" },
  { code: "de", nativeName: "Deutsch" },
  { code: "fr", nativeName: "Français" },
  { code: "it", nativeName: "Italiano" }
];
