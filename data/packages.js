// data/packages.js
// VELORA web sitesi paketleri. Paket ekleme/çıkarma işlemleri tamamen bu
// veri yapısı üzerinden yapılır; HTML'e dokunulmaz.
//
// Not: Şu an hiçbir pakette fiyat gösterilmiyor. Fiyat yerine kullanıcı
// doğrudan iletişime yönlendiriliyor (bkz. components/packages.js).
// Tüm paketlerin ortak teslim süresi "sharedDeliveryNote" ile belirtilir
// ve tek seferlik olarak paket bölümünde gösterilir (bkz. index.html).
//
// Önemli: buradaki her öğenin yalnızca "id", "highlighted" ve (varsa)
// "badge" alanları gerçekten kullanılır. İsim/açıklama/özellik/CTA metni
// components/packages.js > getTranslatedPackages() içinde her zaman
// data/i18n/*.js > packages.items.<id> ile ezilir (görüntülenen dil ne
// olursa olsun) — bu yüzden bu içerikler kasıtlı olarak burada
// tutulmaz; tek doğru kaynak i18n dosyalarıdır.

export const sharedDeliveryNote = "5 iş günü teslim";

// Not: components/packages.js > getCardsPerView() artık sabit "3" değil,
// doğrudan bu dizinin uzunluğunu kullanır; bu sayede desktop/tablette
// paket sayısı kaç olursa olsun (slider kontrolü olmadan) tek satırda
// gösterilmeye devam eder.
//
// "proje-anlatin": sabit fiyatlı/kapsamlı bir paket DEĞİLDİR — kendi
// projesini anlatıp teklif almak isteyen kullanıcılar için bir seçenek
// kartıdır. Bu yüzden "ctaHref" alanı vardır: diğer kartların butonu gibi
// iletişim popup'ını açmaz, doğrudan proje anlatım sayfasına
// (projenizi-anlatin.html) bağlanan gerçek bir bağlantıdır
// (bkz. components/packages.js > renderCard).
export const packagesData = [
  { id: "tek-sayfa", highlighted: false },
  { id: "kurumsal", highlighted: true },
  { id: "ozel-proje", highlighted: false },
  { id: "proje-anlatin", highlighted: false, ctaHref: "projenizi-anlatin.html" }
];
