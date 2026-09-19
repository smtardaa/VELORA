// components/questionForm.js — "Soru Sor" formu.
// Backend olmadığı için gönderim gerçek bir sunucuya gitmez; ancak
// doğrulama, hata mesajları ve başarı geri bildirimi tam çalışır.

import { isValidEmail, qs } from "../js/utils.js";

function setFieldError(form, name, message) {
  const field = form.querySelector(`[data-field="${name}"]`);
  if (!field) return;
  const errorEl = field.querySelector(".field-error");
  field.classList.toggle("has-error", Boolean(message));
  if (errorEl) errorEl.textContent = message || "";
}

function validateForm(form) {
  const values = {
    ad: form.ad.value.trim(),
    soyad: form.soyad.value.trim(),
    eposta: form.eposta.value.trim(),
    soru: form.soru.value.trim()
  };

  let isValid = true;

  if (!values.ad) {
    setFieldError(form, "ad", "Adınızı girin.");
    isValid = false;
  } else {
    setFieldError(form, "ad", "");
  }

  if (!values.soyad) {
    setFieldError(form, "soyad", "Soyadınızı girin.");
    isValid = false;
  } else {
    setFieldError(form, "soyad", "");
  }

  if (!values.eposta) {
    setFieldError(form, "eposta", "E-posta adresinizi girin.");
    isValid = false;
  } else if (!isValidEmail(values.eposta)) {
    setFieldError(form, "eposta", "Geçerli bir e-posta adresi girin.");
    isValid = false;
  } else {
    setFieldError(form, "eposta", "");
  }

  if (!values.soru) {
    setFieldError(form, "soru", "Sorunuzu yazın.");
    isValid = false;
  } else if (values.soru.length < 10) {
    setFieldError(form, "soru", "Sorunuzu biraz daha detaylandırır mısınız? (en az 10 karakter)");
    isValid = false;
  } else {
    setFieldError(form, "soru", "");
  }

  return isValid;
}

export function initQuestionForm(form) {
  if (!form) return;

  const feedback = qs(".form-feedback", form.closest(".form-card") || form.parentElement) ||
    form.querySelector(".form-feedback");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (feedback) {
      feedback.classList.remove("is-success", "is-error");
      feedback.textContent = "";
    }

    if (!validateForm(form)) {
      if (feedback) {
        feedback.classList.add("is-error");
        feedback.textContent = "Lütfen işaretli alanları kontrol edin.";
      }
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const originalLabel = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Gönderiliyor...";
    }

    // Gerçek bir backend bulunmadığı için gönderim burada simüle edilir.
    window.setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
      if (feedback) {
        feedback.classList.add("is-success");
        feedback.textContent = "Teşekkürler! Sorunuz alındı, en kısa sürede size dönüş yapacağız.";
      }
      form.reset();
    }, 650);
  });

  form.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", () => {
      const field = el.closest("[data-field]");
      if (field && field.classList.contains("has-error")) {
        setFieldError(form, field.dataset.field, "");
      }
    });
  });
}
