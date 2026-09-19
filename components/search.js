// components/search.js — site içi arama. Backend/harici servis kullanmaz;
// hizmetler, paketler ve SSS verileri üzerinde basit bir metin araması yapar.

import { servicesData } from "../data/services.js";
import { packagesData } from "../data/packages.js";
import { faqData } from "../data/faq.js";
import { icon } from "../js/icons.js";
import { debounce, escapeHtml, qs } from "../js/utils.js";

function buildSearchIndex() {
  const index = [];

  servicesData.forEach((service) => {
    index.push({
      tag: "Hizmet",
      title: service.name,
      snippet: service.description,
      target: "#hizmetler"
    });
  });

  packagesData.forEach((pkg) => {
    index.push({
      tag: "Paket",
      title: pkg.name,
      snippet: pkg.description,
      target: "#paketler"
    });
  });

  faqData.forEach((item) => {
    index.push({
      tag: "SSS",
      title: item.question,
      snippet: item.answer,
      target: "#sss"
    });
  });

  return index;
}

function matches(entry, query) {
  const haystack = `${entry.title} ${entry.snippet}`.toLocaleLowerCase("tr");
  return haystack.includes(query);
}

export function initSearch({ trigger, overlay, input, resultsEl, closeBtn }) {
  if (!trigger || !overlay || !input || !resultsEl) return;

  const index = buildSearchIndex();

  function renderResults(query) {
    if (!query) {
      resultsEl.innerHTML = "";
      overlay.querySelector(".search-hint")?.classList.remove("visually-hidden");
      return;
    }

    const hint = overlay.querySelector(".search-hint");
    if (hint) hint.classList.add("visually-hidden");

    const normalized = query.trim().toLocaleLowerCase("tr");
    const found = index.filter((entry) => matches(entry, normalized));

    if (!found.length) {
      resultsEl.innerHTML = `<p class="search-empty">"${escapeHtml(query)}" için sonuç bulunamadı.</p>`;
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
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    input.value = "";
    renderResults("");
    window.setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
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
}
