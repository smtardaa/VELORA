// js/scrollAnimations.js — [data-animate] öğelerine sade bir "fade + rise"
// giriş efekti uygular. Yalnızca görünüme girildiğinde bir kez tetiklenir.

import { qsa } from "./utils.js";

export function initScrollAnimations(root = document) {
  const targets = qsa("[data-animate]", root);
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}
