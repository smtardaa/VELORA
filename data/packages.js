// data/packages.js
// VELORA web sitesi paketleri. Paket ekleme/çıkarma veya fiyat güncelleme
// işlemleri tamamen bu veri yapısı üzerinden yapılır; HTML'e dokunulmaz.

export const packagesData = [
  {
    id: "baslangic",
    name: "Başlangıç",
    price: "9.500₺",
    priceNote: "tek seferlik",
    description: "Küçük işletmeler ve bireysel projeler için ideal başlangıç paketi.",
    features: [
      "Tek sayfa özel tasarım",
      "Tam responsive yapı",
      "Temel SEO ayarları",
      "3 iş günü teslim"
    ],
    highlighted: false,
    cta: "Bu Paketi Seç"
  },
  {
    id: "profesyonel",
    name: "Profesyonel",
    price: "18.500₺",
    priceNote: "tek seferlik",
    description: "Büyüyen markalar için çok sayfalı, özelleştirilebilir çözüm.",
    features: [
      "5 sayfaya kadar özel tasarım",
      "Gelişmiş SEO yapılandırması",
      "Kolay içerik güncelleme altyapısı",
      "Öncelikli tasarım revizyonu",
      "7 iş günü teslim"
    ],
    highlighted: true,
    badge: "En Popüler",
    cta: "Bu Paketi Seç"
  },
  {
    id: "ozel",
    name: "Özel",
    price: "Teklif Alın",
    priceNote: "projeye özel",
    description: "İhtiyaca özel kapsamlı projeler için esnek ve kapsamlı çözüm.",
    features: [
      "Sınırsız sayfa seçeneği",
      "Özel entegrasyon danışmanlığı",
      "Öncelikli destek hattı",
      "Süre projeye göre planlanır"
    ],
    highlighted: false,
    cta: "Teklif İste"
  }
];
