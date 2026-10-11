// data/packages.js
// VELORA web sitesi paketleri. Paket ekleme/çıkarma ve fiyat güncelleme
// işlemleri tamamen bu veri yapısı üzerinden yapılır; HTML'e dokunulmaz.
//
// Fiyatlar: "startingPrice" her paketin BAŞLANGIÇ fiyatıdır (TL, tam sayı).
// Dile göre değişmez; components/packages.js bunu seçili dilin sayı
// biçimiyle (ör. TR "7.500", EN "7,500") ve aşağıdaki para birimi
// etiketiyle gösterir. Bir fiyatı değiştirmek için yalnızca ilgili
// "startingPrice" değerini güncellemek yeterlidir.
//
// KDV: VELORA için KDV dahil/hariç politikası henüz doğrulanmadı; bu
// yüzden sitede KDV ibaresi yazılmaz (karar kullanıcıda).
//
// Fiyatların gerekçesi ve kullanılan kaynaklar: bkz. degisiklik-gunlugu-4.md.
//
// İsim/hedef kitle/açıklama/dahil olanlar/dahil olmayanlar/CTA metinleri
// data/i18n/*.js > packages.items.<id> altındadır (tek doğru kaynak);
// burada yalnızca yapısal alanlar tutulur.

export const priceCurrencyLabel = "TL";

// Eski, kullanılmayan ortak teslim süresi notu (paket bölümündeki görünen
// not data/i18n/*.js > packages.deliveryNote'tan gelir).
export const sharedDeliveryNote = "5 iş günü teslim";

// "proje-anlatin": fiyatlı/standart bir paket DEĞİLDİR — standart paketlere
// uymayan özel talepler için ayrı bir CTA kartıdır. Fiyat göstermez; butonu
// iletişim popup'ını açmaz, Projenizi Anlatın görünümünü
// (#/projenizi-anlatin) açan gerçek bir bağlantıdır
// (bkz. components/packages.js > renderCustomCard).
export const packagesData = [
  { id: "tek-sayfa", startingPrice: 7500, highlighted: false },
  { id: "kurumsal", startingPrice: 17500, highlighted: true },
  { id: "randevu-menu", startingPrice: 12500, highlighted: false },
  { id: "e-ticaret", startingPrice: 25000, highlighted: false },
  { id: "proje-anlatin", ctaHref: "#/projenizi-anlatin" }
];
