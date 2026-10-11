# VELORA — Değişiklik Günlüğü 4

## 11 Ekim 2026 — Ana sayfa görsel denemesi ve paket yeniden yapılandırması

Kapsam yalnızca **ana sayfa (index.html)**. Hakkımızda, Çalışmalarımız ve
Projenizi Anlatın sayfalarının HTML/JS'ine dokunulmadı; ekran görüntüleri
önceki sürümle piksel düzeyinde aynı (header dropdown'unun bilinen headless
yakalama artefaktı hariç).

### Görsel değişiklikler (css/home.css — yalnızca index.html yükler)
- Bölüm ritmi: hero siyah → çalışmalar açık gri (#f5f5f7) → paketler grafit
  (#161618) → hakkında beyaz → Soru Sor açık gri → SSS beyaz → iletişim
  grafit → footer açık gri. Soru Sor bölümü `section-invert` yerine
  `section-soft` kullanır.
- Hero butonlarının zemini tam olarak **#0437F2** (hover'da aynı tonun koyusu
  #0330D4). Mavi yalnızca hero butonlarında ve çalışmalar vitrinindeki etkin
  konum göstergesinde kullanılır. Önceki sabit 130.85px genişlik / 0.68rem
  yazı, kullanıcının "font boyutlarını belirgin biçimde artır" talebiyle
  değiştirildi.
- Akışkan tipografi ölçeği: hero 56→120px, h2 36→56px, açıklama 18→22px,
  gövde 17px, küçük metin 15px, etiket 13px (mobil→masaüstü).
- Header değişmedi (tüm sayfalarda ortak; 40px yükseklik kullanıcı kararı).

### Paketler
Önceki 4 kart (Tek Sayfa, Kurumsal, Özel Proje, Kendi projenizi anlatın)
yerine 4 fiyatlı paket + 1 özel talep kartı. Paket slider'ı (oklar/noktalar,
mobilde tek kart) kaldırıldı; kartlar statik ızgarada (masaüstü 4, tablet 2,
mobil 1 sütun; 5. kart tam genişlik) ve kaydırma sırasında 1→2→3→4 sırayla
görünür (110ms aralık, 480ms; prefers-reduced-motion'da animasyon yok).

| Paket | Başlangıç fiyatı | Dahil | Dahil değil / ayrıca |
| --- | --- | --- | --- |
| Tek Sayfa | 7.500 TL | Tek sayfa özel tasarım, hizmet/hakkında/iletişim bölümleri, WhatsApp/telefon/e-posta bağlantıları, responsive, temel SEO | Ek sayfa, metin/fotoğraf, alan adı + hosting |
| Kurumsal | 17.500 TL | 5 sayfaya kadar özel tasarım, hizmet sayfa düzeni, konum/iletişim sayfası, responsive, temel SEO | İçerik yönetim paneli, çoklu dil, metin/fotoğraf, alan adı + hosting |
| Randevu ve Menü | 12.500 TL | Hizmet/fiyat listesi veya menü sayfası, WhatsApp/telefonla randevu yönlendirmesi, mevcut randevu aracına bağlantı (varsa), konum/saatler, mobil öncelikli | Gerçek zamanlı online randevu/rezervasyon, online sipariş/ödeme, alan adı + hosting |
| E-Ticaret | 25.000 TL | Mağaza ana sayfası, kategori/ürün sayfası düzeni, mobil uyumlu mağaza, sipariş öncesi iletişim kanalları | Platform/lisans, ödeme (sanal POS)/kargo/stok entegrasyonu, pazaryeri, toplu ürün girişi/fotoğraf, alan adı + hosting |
| Kendi Projenizi Anlatın | — (kapsam sonrası) | Örnekler: özel sayfa/akışlar, ek entegrasyonlar, çoklu dil, paketlere sığmayan ihtiyaçlar — garanti değil, değerlendirme örneği | — |

Fiyatlar `data/packages.js > startingPrice` içinde; metinler
`data/i18n/*.js > packages`. KDV ibaresi yazılmadı (politika doğrulanmadı).

### Fiyat araştırması (erişim: 11 Ekim 2026)
- Protan — Web Tasarım Fiyat Raporu 2026: https://www.protan.com.tr/web-tasarim-fiyat-raporu-2026/
  Tek sayfa/landing 5.000–15.600 TL; ekonomik tanıtım 9.000–25.000; kurumsal +
  CMS 15.000–75.000; e-ticaret (anahtar teslim, platform lisansı hariç)
  24.000–78.000. Çoğu KDV hariç, normalize edilmemiş (~%20 sapma). Rapor:
  16 kaynak, yalnızca firmaların yayımladığı listeler, ortalama alınmamış,
  resmî istatistik değil, landing verisi zayıf, randevu/menü sitesi yok.
- TurkWebsite: https://turkwebsite.com/ — Tek Sayfa 8.900, Landing 6.900,
  5 sayfa kurumsal 19.900, 10 sayfa 27.900, başlangıç e-ticaret 31.900,
  sektör siteleri (güzellik/kuaför 7.900, kafe/restoran 8.900, "başlayan");
  KDV hariç; alan adı/hosting dahil değil; randevu/sipariş/çoklu dil ayrı
  ücretli modül. Metin yazımı ve panel eğitimi dahil.
- Protan — paket fiyatları: https://www.protan.com.tr/web-tasarim-fiyatlari/
  Temel kurumsal (3–5 sayfa) 35.000–55.000; standart (7–10) 55.000–85.000;
  e-ticaret 75.000–350.000; KDV hariç; CMS, SSL ve 12 ay destek dahil;
  rezervasyon modülü fiyatı artırır (fiyat yok).
- Elove Agency: https://www.eloveagency.com/ — Tanıtım sitesi 14.990 + KDV
  (ilk yıl alan adı/hosting dahil), çok dilli 34.990 + KDV (ek dil 7.500),
  kurumsal (özel yazılım/CRM) 89.990 + KDV, e-ticaret teklif usulü.
- Zunapro (ek, karşılaştırılamaz model): https://www.zunapro.com/turkey/tr/guzellik-kuafor-web-sitesi-fiyatlari
  ve https://www.zunapro.com/turkey/tr/restoran-kafe-web-sitesi-fiyatlari —
  yıllık abonelik 5.900 / 15.900 / 25.900 TL (KDV dahil, hosting/bakım dahil,
  yenilenmezse site kapanır). Tek seferlik proje fiyatıyla doğrudan
  kıyaslanamaz.

### Fiyat gerekçeleri (VELORA: tek kişilik, küçük işletmelere giriş konumu)
- **Tek Sayfa 7.500 TL:** Rapor bandı 5.000–15.600'ün alt-orta kısmı;
  TurkWebsite'ın 8.900'ünden düşük çünkü VELORA paketinde metin yazımı ve
  panel yok; landing (6.900) üstü çünkü özel tasarım + iletişim bölümleri.
- **Kurumsal 17.500 TL:** Kurumsal/CMS bandının (15.000–75.000) alt ucu;
  TurkWebsite 5 sayfa (19.900, panelli) altında, çünkü içerik yönetim paneli
  pakete dahil değil (statik site); Protan'ın 35.000+ temel kurumsalı CMS,
  12 ay destek ve daha uzun süreç içerir.
- **Randevu ve Menü 12.500 TL:** Doğrudan karşılaştırılabilir tek seferlik
  fiyat bulunamadı. TurkWebsite sektör siteleri 7.900–8.900'den başlıyor
  ancak randevu modülü ayrı ücretli; Protan rezervasyonu fiyat artırıcı
  olarak listeliyor; Zunapro abonelik modeli. Kapsam bilinçli olarak "sade
  sunum + WhatsApp/telefon/var olan araca yönlendirme" ile sınırlandı ve
  Tek Sayfa ile Kurumsal arasına konumlandı; gerçek zamanlı rezervasyon
  yazılımı ayrı kapsamdır.
- **E-Ticaret 25.000 TL:** Rapordaki anahtar teslim bandın (24.000–78.000,
  lisans hariç) alt ucu; TurkWebsite başlangıç 31.900'ün altında, çünkü
  ödeme/kargo/stok entegrasyonları, platform lisansı ve toplu ürün girişi
  pakete dahil değil — VELORA'nın bu entegrasyonlardaki kapasitesi henüz
  doğrulanmadı.

### Çalışmalar vitrini
Kartlar beyaz, büyük görsel alanlı; "Konsept Proje" etiketi (works.detail.
conceptBadge) eklendi; oklar ve konum noktaları alta alındı; mobilde sonraki
kartın kenarı görünür. Dokunmatik sürükleme (Pointer Events, touch-action:
pan-y), klavye ←/→, yalnızca görünen kartlar sekme sırasında. Otomatik kayma
yalnızca >1024px ve prefers-reduced-motion kapalıyken.

### Footer (yalnızca ana sayfa)
Marka + kısa tanım (mevcut meta.description) | Sayfalar | Hızlı erişim |
Bize ulaşın (#iletisim bağlantısı + mevcut sosyal ikonlar). Yeni iletişim
bilgisi eklenmedi. Diğer sayfaların footer'ı eski hâlinde.

### Kullanıcı kararı bekleyenler
- KDV dahil/hariç politikası (sitede belirtilmedi).
- "Tüm paketlerde teslim süresi: 5 iş günü" notu değiştirilmedi; özellikle
  E-Ticaret için gerçekçi değil (kaynaklarda 12–15 iş günü ile 8–12 hafta).
  SSS'deki "3 iş günü" ve calismalarimiz.html'deki "5 iş günü" de duruyor.
- E-ticaret/randevu teknik kapasitesi (hangi platform, kim kuracak).
- CLAUDE.md §3–§4'teki "fiyat gösterilmiyor", "4 kart", "4. kartta özellik
  listesi yok" ifadeleri artık güncel değil.
- Hero'daki "Projenizi Anlatın" butonu hâlâ #soru-sor'a gidiyor.

### Geri alma notu
Önceki paket yapısı ve slider git geçmişinde (c5e608c "Güncelleme v4.0").
