// data/packages.js
// VELORA web sitesi paketleri. Paket ekleme/çıkarma işlemleri tamamen bu
// veri yapısı üzerinden yapılır; HTML'e dokunulmaz.
//
// Not: Şu an hiçbir pakette fiyat gösterilmiyor. Fiyat yerine kullanıcı
// doğrudan iletişime yönlendiriliyor (bkz. components/packages.js).
// Tüm paketlerin ortak teslim süresi "sharedDeliveryNote" ile belirtilir
// ve tek seferlik olarak paket bölümünde gösterilir (bkz. index.html).

export const sharedDeliveryNote = "3 iş günü teslim";

export const packagesData = [
  {
    id: "tek-sayfa",
    name: "Tek Sayfa",
    description: "Tek bir sayfada markanızı ve hizmetlerinizi net şekilde anlatan sade site.",
    features: ["Tek sayfa özel tasarım", "Tam responsive yapı", "Temel SEO ayarları"],
    highlighted: false,
    cta: "İletişime Geç"
  },
  {
    id: "kurumsal",
    name: "Kurumsal",
    description: "Çok sayfalı, kurumsal kimliğinizi yansıtan profesyonel web sitesi.",
    features: ["5 sayfaya kadar özel tasarım", "Gelişmiş SEO yapılandırması", "Kolay içerik güncelleme"],
    highlighted: true,
    cta: "İletişime Geç"
  },
  {
    id: "kisisel-portfolyo",
    name: "Kişisel Portfolyo",
    description: "Kişisel markanızı veya çalışmalarınızı öne çıkaran sade bir vitrin.",
    features: ["Portfolyo/CV odaklı düzen", "Sade galeri yapısı", "Tam responsive yapı"],
    highlighted: false,
    cta: "İletişime Geç"
  },
  {
    id: "vitrin-eticaret",
    name: "Vitrin E-Ticaret",
    description: "Ürünlerinizi sergileyen, sipariş sürecini yönlendiren vitrin sitesi.",
    features: ["Ürün/kategori vitrini", "WhatsApp/telefon ile sipariş yönlendirme", "Mobil öncelikli tasarım"],
    highlighted: false,
    cta: "İletişime Geç"
  },
  {
    id: "restoran-menu",
    name: "Restoran & Menü",
    description: "Menünüzü, konumunuzu ve rezervasyon bilgilerinizi öne çıkaran site.",
    features: ["Dijital menü düzeni", "Konum ve çalışma saatleri", "Rezervasyon/iletişim CTA"],
    highlighted: false,
    cta: "İletişime Geç"
  },
  {
    id: "ozel-proje",
    name: "Özel Proje",
    description: "Kapsamı size özel planlanan, esnek ve genişletilebilir çözüm.",
    features: ["İhtiyaca özel kapsam", "Esnek sayfa/özellik seçimi", "Öncelikli danışmanlık"],
    highlighted: false,
    cta: "Teklif İçin İletişime Geç"
  }
];
