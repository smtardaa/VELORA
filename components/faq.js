// components/faq.js — SSS accordion. Tek seferde yalnızca bir soru açık kalır.

import { icon } from "../js/icons.js";
import { escapeHtml, qsa } from "../js/utils.js";
import { t } from "../js/i18n.js";

export function renderFaq(container) {
  if (!container) return;

  // Soru/cevap metinleri mevcut dile göre data/i18n/*.js içinden gelir
  // (aynı sıradaki dizi); data/faq.js yalnızca TR referans/varsayılan
  // içerik ve öğe sayısı için kalır.
  const items = t("faq.items");

  container.innerHTML = items
    .map(
      (item, index) => `
        <div class="faq-item" data-index="${index}">
          <button class="faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
            <span>${escapeHtml(item.question)}</span>
            ${icon("chevron")}
          </button>
          <div class="faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
            <p>${escapeHtml(item.answer)}</p>
          </div>
        </div>
      `
    )
    .join("");

  const faqItems = qsa(".faq-item", container);

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Sade davranış: aynı anda yalnızca bir soru açık kalır.
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      item.classList.toggle("is-open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = !isOpen ? `${answer.scrollHeight}px` : null;
    });
  });
}
