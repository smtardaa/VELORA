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

export const sharedDeliveryNote = "3 iş günü teslim";

// Not: Paket sayısı toplamda 3 ile sınırlı tutulur (bkz.
// components/packages.js — desktop'ta 3 paket aynı anda, slider
// kontrolü olmadan gösterilir). Farklı bütçe/kapsam ihtiyacını
// temsil eden en ayırt edici 3 paket (giriş seviyesi, en popüler
// orta seviye, özel/genişletilebilir üst seviye) seçilmiştir.
export const packagesData = [
  { id: "tek-sayfa", highlighted: false },
  { id: "kurumsal", highlighted: true },
  { id: "ozel-proje", highlighted: false }
];
