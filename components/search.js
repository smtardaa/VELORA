// components/search.js — site içi arama. Backend/harici servis kullanmaz;
// paketler ve SSS verileri üzerinde basit bir metin araması yapar.

import { packagesData } from "../data/packages.js";
import { debounce, escapeHtml, trapFocus } from "../js/utils.js";
import { t, getLang, onLanguageChange } from "../js/i18n.js";

// Arama dizini tamamen mevcut dile göre kurulur; dil değiştiğinde
// initSearch içindeki onLanguageChange dinleyicisi bu fonksiyonu tekrar
// çağırarak dizini günceller.
//
// Not: Paketler (#paketler) ve SSS (#sss) bölümleri yalnızca index.html
// üzerinde bulunur. Bu bileşen calismalarimiz.html gibi başka bir
// sayfada da çalıştığı için hedefler o sayfada mevcut olup olmadığına
// göre "index.html#..." ile öneklenir; ana sayfada davranış değişmez.
function buildSearchIndex() {
  const index = [];
  const prefix = document.getElementById("paketler") ? "" : "index.html";

  packagesData.forEach((pkg) => {
    const translated = t(`packages.items.${pkg.id}`);
    index.push({
      tag: t("search.tags.package"),
      title: translated.name,
      snippet: translated.description,
      target: `${prefix}#paketler`
    });
  });

  t("faq.items").forEach((item) => {
    index.push({
      tag: t("search.tags.faq"),
      title: item.question,
      snippet: item.answer,
      target: `${prefix}#sss`
    });
  });

  return index;
}

function matches(entry, query) {
  const haystack = `${entry.title} ${entry.snippet}`.toLocaleLowerCase(getLang());
  return haystack.includes(query);
}

export function initSearch({ trigger, overlay, input, resultsEl, closeBtn }) {
  if (!trigger || !overlay || !input || !resultsEl) return;

  const panel = overlay.querySelector(".search-panel") || overlay;
  let index = buildSearchIndex();
  let lastQuery = "";
  let releaseFocusTrap = null;
  let previouslyFocusedEl = null;

  function renderResults(query) {
    lastQuery = query;

    if (!query) {
      resultsEl.innerHTML = "";
      overlay.querySelector(".search-hint")?.classList.remove("visually-hidden");
      return;
    }

    const hint = overlay.querySelector(".search-hint");
    if (hint) hint.classList.add("visually-hidden");

    const normalized = query.trim().toLocaleLowerCase(getLang());
    const found = index.filter((entry) => matches(entry, normalized));

    if (!found.length) {
      resultsEl.innerHTML = `<p class="search-empty">${escapeHtml(t("search.noResults").replace("{query}", query))}</p>`;
      return;
    }

    resultsEl.innerHTML = found
      .map(
        (entry) => `
          <a class="search-result" href="${entry.target}" data-target="${entry.target}">
            <span class="result-tag">${escapeHtml(entry.tag)}</span>
            <span class="result-title">${escapeHtml(entry.title)}</span>
            <span class="result-snippet">${escapeHtml(entry.snippet)}</span>
          </a>
        `
      )
      .join("");
  }

  const debouncedRender = debounce((value) => renderResults(value), 120);

  function openSearch() {
    previouslyFocusedEl = document.activeElement;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    input.value = "";
    renderResults("");
    releaseFocusTrap = trapFocus(panel);
    window.setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";

    if (releaseFocusTrap) {
      releaseFocusTrap();
      releaseFocusTrap = null;
    }
    // Odağı aramayı açan öğeye (header'daki arama butonu) geri ver —
    // klavye/ekran okuyucu kullanıcıları kapanıştan sonra kaldıkları
    // yerde kalır.
    previouslyFocusedEl?.focus();
    previouslyFocusedEl = null;
  }

  trigger.addEventListener("click", openSearch);
  closeBtn?.addEventListener("click", closeSearch);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeSearch();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeSearch();
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
  });

  input.addEventListener("input", (event) => debouncedRender(event.target.value));

  resultsEl.addEventListener("click", (event) => {
    const link = event.target.closest(".search-result");
    if (!link) return;
    closeSearch();
  });

  // Dil değiştiğinde: arama indeksi yeniden oluşturulur; arama açıkken
  // mevcut sorgu, yeni dildeki içerikle yeniden render edilir.
  onLanguageChange(() => {
    index = buildSearchIndex();
    if (overlay.classList.contains("is-open")) {
      renderResults(lastQuery);
    }
  });
}
