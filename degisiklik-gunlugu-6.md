# VELORA — Değişiklik Günlüğü 6

## 11 Ekim 2026 — Animasyon akıcılığı ve performans

Bağımlılık eklenmedi. Kullanılan tarayıcı özellikleri: Web Animations API
(transform/opacity), CSS `content-visibility` + `contain-intrinsic-size`,
IntersectionObserver, ResizeObserver, requestAnimationFrame,
requestIdleCallback, `@media (hover: none)`.

### Ölçüm yöntemi
Yüklü Chrome (headless, gerçek GPU: Intel Iris Xe / D3D11) Chrome DevTools
Protocol ile sürüldü; senaryolar Tracing ile kaydedildi, CPU 4 kat
yavaşlatıldı (düşük güçlü mobil yaklaşımı). Ölçülen: en uzun ana iş
parçacığı görevi, stil yeniden hesaplama / layout / paint süreleri ve
sayıları, GPU'ya aktarılamayan animasyonlar, sayfa açılış metrikleri.
Not: Headless modda gerçek ekran yenilemesi olmadığından GPU'da çalışan
animasyonlarda "düşen kare" sayacı güvenilir değil (ana iş parçacığı boşken
ve CPU yavaşlatması kapalıyken de kare düşmüş görünüyor); bu sayı iyileşme
kanıtı olarak kullanılmadı. İlk ölçümde toplam görev süresi ve uzun görev
sayısı iç içe olaylar yüzünden çift sayılmıştı; bu iki metrik karşılaştırmada
kullanılmadı.

### Bulunan takılma nedenleri
1. Görünüm değişiminde hedef görünüm `display:none`'dan çıkıp tamamen baştan
   yerleşiyor, ana sayfanın tamamına `visibility` uygulanıyordu → geçişin
   ortasında 80–125 ms'lik tek görev (stil + layout).
2. Geçiş katmanı `clip-path` animasyonu (Safari/Firefox'ta ana iş
   parçacığında çalışır).
3. Geçiş logosu 2000×2000 px görsel (~16 MB çözülmüş bellek), ~390 px
   gösteriliyordu.
4. Slider sürüklemede her harekette ölçüm; animasyon sürerken başlayan
   dokunuş yok sayılıyordu; konum noktalarının genişlik/renk animasyonu her
   karede layout gerektiriyordu (otomatik kaymada kare kaybının asıl kaynağı).
5. Otomatik kayma slider ekranda değilken ve görünüm açıkken de çalışıyordu.
6. Header kaydırma işleyicisi her olayda çalışıyor, scroll-spy bölüm
   konumlarını her karede ölçüyordu.
7. Tüm ekranı etkileyen `backdrop-filter: blur` (görünüm çubuğu, arama ve
   paket popup arka planı).
8. Hover'da büyük `box-shadow` animasyonları (her karede yeniden çizim);
   dokunmatikte kartlarda takılı kalan hover.

### Yapılanlar
- Geçiş: siyah panel ve logo yalnızca `transform`/`opacity` ile (GPU).
  Süreler 560/180/640 ms → 440/80/520 ms. Logo panel ortayı geçince belirir.
- Kapalı görünümler `content-visibility: hidden` (+ `visibility: hidden`,
  `inert`); bir kez yerleşen görünüm yeniden hesaplanmaz. Sayfa yüklendikten
  sonra boşta (requestIdleCallback) görünümler önceden yerleştirilir.
  Hedefin stil hesabı katman inerken başlatılır (`prepare`).
- Ana sayfa görünüm açıkken `content-visibility: hidden` +
  `contain-intrinsic-block-size: auto` (kaydırma konumu korunur).
  Desteklemeyen tarayıcılarda eski yöntem (`@supports`).
- Görünüm açılırken ekrandaki kartlar animasyonsuz görünür (çift animasyon
  yok); aşağıdakiler kaydırıldıkça sırayla görünür (16 px / 420 ms).
- Geçiş logosu: `assets/velora-logo-gecis.png` (960×274, 31 KB) — orijinal
  logonun yazı alanına kırpılmış, küçültülmüş kopyası; görünüm aynı.
- Slider: translate3d; sürüklemede tek ölçüm + kare başına tek yazma;
  animasyon ortasında yakalama; hızlı kaydırma (flick); `transitioncancel`
  ile toparlanma; yalnızca değişen kartların öznitelikleri güncellenir.
  Konum noktaları: gri noktalar sabit, mavi gösterge transform ile kayar.
  Otomatik kayma: yalnızca >1024px, ekranda iken, görünüm kapalıyken,
  hareket azaltma kapalıyken.
- Header: kaydırma işleyicisi kare başına bir kez; scroll-spy konumları
  önbellekte (yeniden boyutlandırma/ResizeObserver ile yenilenir).
- Blur kaldırıldı: görünüm çubuğu düz zemin; arama/paket popup arka planı
  düz, yarı opak perde.
- Hover gölgeleri: hazır çizilmiş gölge katmanının yalnızca opaklığı
  değişir; dokunmatik cihazlarda kart hover efektleri uygulanmaz.

### Ölçüm sonuçları (CPU 4x, önce → sonra)
| Senaryo | En uzun görev | Layout | Stil |
| --- | --- | --- | --- |
| Ana sayfa → Hakkımızda (1440) | 103 → 29–30 ms | 35 → 4–6 ms | 109 → 53–72 ms |
| Hakkımızda → ana sayfa (1440) | 48 → 57–58 ms (artık katman inerken) | 6 → 3 ms | 51 → 74–86 ms |
| Ana sayfa → Çalışmalarımız (375) | 125 → 33–37 ms | 72 → 2–5 ms | 73 → 51–62 ms |
| Görünüm → görünüm (375) | 82 → 28–33 ms | 41 → 1–2 ms | 61 → 38–62 ms |
| Slider 3 sürükleme (375) | 17 → 15–30 ms | 133 ms/43 kez → 0 | 117 → 44–108 ms; paint 251 → 0 |
| Slider otomatik 2 adım (1440) | 24 → 9 ms | 56 ms/17 kez → 0 | 56 → 20–23 ms; paint 161 → 59 |
| Sayfa açılışı (375) | FCP 416 → 416 ms, CLS 0 → 0, aktarım 370 → 366 KB |

Kontroller: görünüm testleri 46/46, ana sayfa testleri 38/38, stres testi
(24 hızlı geçiş, art arda geri/ileri, 30 sürükleme, hızlı ok tıklamaları,
otomatik kayma duraklatma, tıklama→animasyon tepkisi) 13/13 (CPU 4x ve 6x).

### Kalan / ölçülemeyen
- Görünümden ana sayfaya dönüşte ~57 ms'lik (CPU 4x) stil hesabı sürüyor;
  katman inerken çalıştığı için animasyonu durdurmuyor.
- Sayfa açılışındaki ilk yerleşim (~270 ms, CPU 4x) değişmedi.
- 5 dil dosyası (~120 KB) açılışta birlikte yükleniyor.
- Favicon 2000×2000 px (49 KB).
- Gerçek mobil cihaz, Safari ve Firefox'ta ölçüm yapılmadı; GPU kare
  akıcılığı headless ortamda güvenilir ölçülemedi.
