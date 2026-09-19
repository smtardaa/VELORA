// components/faq.js — SSS accordion. Tek seferde yalnızca bir soru açık kalır.

import { faqData } from "../data/faq.js";
import { icon } from "../js/icons.js";
import { escapeHtml, qsa } from "../js/utils.js";

export function renderFaq(container) {
  if (!container) return;

  container.innerHTML = faqData
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

  const items = qsa(".faq-item", container);

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Sade davranış: aynı anda yalnızca bir soru açık kalır.
      items.forEach((other) => {
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

export function getFaqData() {
  return faqData;
}
