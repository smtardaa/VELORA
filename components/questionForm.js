// components/questionForm.js — "Soru Sor" formu.
// Backend olmadığı için gönderim gerçek bir sunucuya gitmez; ancak
// doğrulama, hata mesajları ve başarı geri bildirimi tam çalışır.

import { isValidEmail, qs } from "../js/utils.js";
import { t } from "../js/i18n.js";

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
    setFieldError(form, "ad", t("form.errors.firstNameRequired"));
    isValid = false;
  } else {
    setFieldError(form, "ad", "");
  }

  if (!values.soyad) {
    setFieldError(form, "soyad", t("form.errors.lastNameRequired"));
    isValid = false;
  } else {
    setFieldError(form, "soyad", "");
  }

  if (!values.eposta) {
    setFieldError(form, "eposta", t("form.errors.emailRequired"));
    isValid = false;
  } else if (!isValidEmail(values.eposta)) {
    setFieldError(form, "eposta", t("form.errors.emailInvalid"));
    isValid = false;
  } else {
    setFieldError(form, "eposta", "");
  }

  if (!values.soru) {
    setFieldError(form, "soru", t("form.errors.questionRequired"));
    isValid = false;
  } else if (values.soru.length < 10) {
    setFieldError(form, "soru", t("form.errors.questionTooShort"));
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

  // "İhtiyacınız ve İstekleriniz" alanında "Diğer" seçildiğinde altında
  // serbest metin alanı görünür; başka bir seçenek seçilince (veya form
  // sıfırlandığında) tekrar gizlenir. Bu alan tamamen opsiyoneldir,
  // doğrulamaya dahil değildir.
  const ihtiyacSelect = form.querySelector("#ihtiyac");
  const ihtiyacDigerWrap = form.querySelector("#ihtiyac-diger-wrap");
  const syncIhtiyacDiger = () => {
    if (!ihtiyacSelect || !ihtiyacDigerWrap) return;
    ihtiyacDigerWrap.classList.toggle("is-hidden", ihtiyacSelect.value !== "diger");
  };
  if (ihtiyacSelect) {
    ihtiyacSelect.addEventListener("change", syncIhtiyacDiger);
    syncIhtiyacDiger();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (feedback) {
      feedback.classList.remove("is-success", "is-error");
      feedback.textContent = "";
    }

    if (!validateForm(form)) {
      if (feedback) {
        feedback.classList.add("is-error");
        feedback.textContent = t("form.feedback.error");
      }
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const originalLabel = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = t("form.submitting");
    }

    // Gerçek bir backend bulunmadığı için gönderim burada simüle edilir.
    window.setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
      if (feedback) {
        feedback.classList.add("is-success");
        feedback.textContent = t("form.feedback.success");
      }
      form.reset();
      syncIhtiyacDiger();
    }, 650);
  });

  form.querySelectorAll("input, select, textarea").forEach((el) => {
    el.addEventListener("input", () => {
      const field = el.closest("[data-field]");
      if (field && field.classList.contains("has-error")) {
        setFieldError(form, field.dataset.field, "");
      }
    });
  });
}
