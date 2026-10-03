// components/projectBriefForm.js — projenizi-anlatin.html sayfasındaki
// "Projenizi anlatın" formu.
//
// GÖNDERİM DURUMU (önemli):
// Projede bir backend veya form servisi YOKTUR. Ana sayfadaki "Soru Sor"
// formu (components/questionForm.js) gönderimi yalnızca simüle eder
// (setTimeout + başarı mesajı); bu form bilinçli olarak o davranışı
// KOPYALAMAZ. SUBMIT_ENDPOINT boş olduğu sürece:
//  - doğrulama tam çalışır,
//  - geçerli bir gönderimde HİÇBİR ağ isteği yapılmaz; kullanıcıya
//    bilgilerinin ve dosyalarının gönderilMEDİĞİ açıkça söylenir,
//  - form temizlenmez (kullanıcı yazdıklarını kaybetmez).
//
// Gerçek bir gönderim altyapısı seçildiğinde (ör. kendi sunucunuzdaki bir
// uç nokta) SUBMIT_ENDPOINT'e adresi yazmak yeterlidir: form verisi ve
// seçilen dosyalar tek bir multipart/form-data POST isteğiyle gönderilir;
// başarı mesajı YALNIZCA sunucu başarılı (2xx) yanıt verirse gösterilir.
// Dosya türü/boyut sınırları seçilecek altyapıya göre belirlenmelidir;
// burada uydurma bir sınır uygulanmaz.
const SUBMIT_ENDPOINT = "";

import { escapeHtml, isValidEmail, qs, qsa } from "../js/utils.js";
import { t, onLanguageChange } from "../js/i18n.js";

const MIN_SUMMARY_LENGTH = 10;

function setFieldError(form, name, message) {
  const field = form.querySelector(`[data-field="${name}"]`);
  if (!field) return;
  const errorEl = field.querySelector(".field-error");
  const control = field.querySelector("input, select, textarea");
  field.classList.toggle("has-error", Boolean(message));
  if (errorEl) errorEl.textContent = message || "";
  if (control) control.setAttribute("aria-invalid", message ? "true" : "false");
}

// Zorunlu alanlar: Ad Soyad, E-posta, Proje/işletme açıklaması.
// İşletme türü / ihtiyaç seçimleri ve "Diğer" metinleri, ana sayfadaki
// formun yaklaşımıyla tutarlı olarak opsiyoneldir (orada da açılır
// listeler ve "Diğer" metni doğrulanmaz).
function validateForm(form) {
  const fullName = form.fullName.value.trim();
  const email = form.email.value.trim();
  const summary = form.projectSummary.value.trim();
  const errors = {};

  if (!fullName) errors.fullName = t("pages.projectBrief.form.errors.fullNameRequired");

  if (!email) errors.email = t("pages.projectBrief.form.errors.emailRequired");
  else if (!isValidEmail(email)) errors.email = t("pages.projectBrief.form.errors.emailInvalid");

  if (!summary) errors.projectSummary = t("pages.projectBrief.form.errors.summaryRequired");
  else if (summary.length < MIN_SUMMARY_LENGTH) {
    errors.projectSummary = t("pages.projectBrief.form.errors.summaryTooShort");
  }

  ["fullName", "email", "projectSummary"].forEach((name) => setFieldError(form, name, errors[name] || ""));
  return errors;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function initProjectBriefForm(form) {
  if (!form) return;

  const feedback = qs(".form-feedback", form);
  const submitBtn = form.querySelector('[type="submit"]');
  const fileInput = form.querySelector("#brief-files");
  const fileList = form.querySelector("#brief-file-list");
  let lastFeedbackKey = "";

  // Gerçek bir uç nokta tanımlıysa "henüz gönderilmiyor" uyarıları gizlenir.
  qsa("[data-pending-notice]", form).forEach((el) => {
    el.hidden = Boolean(SUBMIT_ENDPOINT);
  });

  // "Diğer" seçilince ilgili serbest metin alanı hemen altında görünür;
  // başka bir seçenekte gizlenir. Gizlenen alanın içeriği gönderilmesin
  // diye disabled yapılır.
  const conditionalPairs = [
    ["#brief-business-type", "#brief-business-type-other-wrap"],
    ["#brief-need", "#brief-need-other-wrap"]
  ].map(([selectSel, wrapSel]) => [form.querySelector(selectSel), form.querySelector(wrapSel)]);

  const syncConditional = () => {
    conditionalPairs.forEach(([select, wrap]) => {
      if (!select || !wrap) return;
      const show = select.value === "other";
      wrap.classList.toggle("is-hidden", !show);
      const input = wrap.querySelector("input");
      if (input) input.disabled = !show;
    });
  };
  conditionalPairs.forEach(([select]) => select && select.addEventListener("change", syncConditional));
  syncConditional();

  // Seçilen dosyaların adları (ve boyutları) görünür bir listede gösterilir.
  const fileStatus = form.querySelector("#brief-files-status");
  const renderFileList = () => {
    if (!fileInput || !fileList) return;
    const files = Array.from(fileInput.files || []);
    if (fileStatus) {
      fileStatus.textContent = files.length
        ? t("pages.projectBrief.form.filesCount").replace("{count}", String(files.length))
        : t("pages.projectBrief.form.noFiles");
    }
    if (!files.length) {
      fileList.hidden = true;
      fileList.innerHTML = "";
      return;
    }
    fileList.hidden = false;
    fileList.innerHTML = `
      <div class="file-list-header">
        <span class="file-list-title">${escapeHtml(
          t("pages.projectBrief.form.filesSelected").replace("{count}", String(files.length))
        )}</span>
        <button type="button" class="file-list-clear">${escapeHtml(t("pages.projectBrief.form.filesClear"))}</button>
      </div>
      <ul class="file-list-items">
        ${files
          .map(
            (file) => `
              <li class="file-list-item">
                <span class="file-list-name">${escapeHtml(file.name)}</span>
                <span class="file-list-size">${escapeHtml(formatSize(file.size))}</span>
              </li>`
          )
          .join("")}
      </ul>
    `;
    qs(".file-list-clear", fileList).addEventListener("click", () => {
      fileInput.value = "";
      renderFileList();
      fileInput.focus();
    });
  };
  if (fileInput) fileInput.addEventListener("change", renderFileList);

  const showFeedback = (type, key) => {
    if (!feedback) return;
    lastFeedbackKey = key;
    feedback.classList.remove("is-success", "is-error", "is-notice");
    feedback.textContent = "";
    if (!type) return;
    feedback.classList.add(type);
    feedback.textContent = t(key);
  };

  // Dil değişince görünür dinamik metinler (dosya listesi, geri bildirim,
  // mevcut hata mesajları) yeni dile çevrilir.
  onLanguageChange(() => {
    renderFileList();
    if (lastFeedbackKey && feedback) feedback.textContent = t(lastFeedbackKey);
    if (form.querySelector(".field.has-error")) validateForm(form);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showFeedback(null, "");

    const errors = validateForm(form);
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      showFeedback("is-error", "pages.projectBrief.form.feedback.error");
      form.elements[firstInvalid]?.focus();
      return;
    }

    if (!SUBMIT_ENDPOINT) {
      // Gönderim altyapısı yok: hiçbir veri/dosya gönderilmez, form da
      // temizlenmez. Başarı mesajı GÖSTERİLMEZ.
      showFeedback("is-notice", "pages.projectBrief.form.feedback.notSent");
      return;
    }

    const originalLabel = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = t("pages.projectBrief.form.submitting");
    }

    try {
      const response = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      showFeedback("is-success", "pages.projectBrief.form.feedback.success");
      form.reset();
      syncConditional();
      renderFileList();
    } catch (error) {
      showFeedback("is-error", "pages.projectBrief.form.feedback.sendFailed");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    }
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
