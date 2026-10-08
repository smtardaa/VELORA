# VELORA — Değişiklik Günlüğü 3

## 9 Ekim 2026 — Görsel kalite incelemesi

Kapsam: 4 sayfa (index, calismalarimiz, hakkimizda, projenizi-anlatin),
1920 / 1440 / 1366 / 1024 / 900 / 861 / 768 / 480 / 375 / 320 px, 5 dil.
Yalnızca CSS değişti; içerik, çeviri, paket, iletişim bilgisi, marka/logo
ve JS davranışı DEĞİŞMEDİ.

| Sorun | Düzeltme | Dosya |
| --- | --- | --- |
| DE/IT'de 3 satıra kırılan hero butonu etiketi buton kenarına taşıyordu | `height` → `min-height` (44.18px korunur), dikey dolgu 11px → 4px; mobilde `min-height: 0` (eski otomatik yükseklik korunur) | main.css, responsive.css |
| Soru Sor formunda iki satırlı etiket ("Varsa Önceki Web Sitesinin Bağlantısı") komşu kutuyu kaydırıyordu | `.form-row > .field { justify-content: flex-end }` | main.css |
| Mobilde Soru Sor formunda alanlar arası çift boşluk | `.brief-form .form-row { gap: 0 }` → tüm `.form-row`'lara genelleştirildi (≤768px) | responsive.css |
| Ana sayfa proje kartlarında "Projeyi İncele" bağlantıları farklı yükseklikte | `.project-body { flex: 1 }`, `.project-link { margin-top: auto }` | main.css |
| 9 iletişim kartı 4 + 4 + 1 diziliyor, tek kart yalnız kalıyordu | Masaüstü/tablet 3 sütun (3 × 3), grid max-width 980 → 860px; ≤640px 2 sütun; ≤480px kart arası boşluk 24 → 16px | main.css, responsive.css |
| Çalışmalar sayfasında ayırıcı çizgi üstü 128px / altı 96px (asimetrik) | Liste aralığı 96px; ≤480'deki aynı değerli kural kaldırıldı | main.css, responsive.css |
| Mobilde proje görseli kendi başlığından 96px uzakta, önceki projeye ait gibi | ≤768px `.work-detail { gap: var(--space-lg) }` | responsive.css |
| Mobil menüde dropdown alt öğelerinin alt çizgileri kıvrık uçlu | ≤860px `border-radius: 0` | responsive.css |
| 320px'te footer sosyal ikonları 4px yatay kaydırma oluşturuyordu | `flex-wrap: wrap` + ≤375px `gap: 0` | main.css, responsive.css |
| Klavye odak halkası tarayıcıya göre değişiyordu | Ortak `:where(a, button, [tabindex]):focus-visible` (mevcut `--color-focus`), slider kartında içe, logoda 0 offset | main.css |

**Bilinçli olarak DEĞİŞTİRİLMEYENLER (karar gerektirir):**
- Hero butonlarının 130.85px genişlik / 0.68rem (~10.9px) yazı boyutu ve
  40px masaüstü header yüksekliği: kesin ölçüler kullanıcı tercihi olarak
  görüldü; yazı küçük ve "Hemen İletişime Geç" iki satıra kırılıyor.
- Tablette (481–1024px) paket slider oklarının görünür ama işlevsiz olması
  (kodda "istenen davranış" olarak işaretli).
- Hero'daki "Projenizi Anlatın" butonu `#soru-sor`'a gidiyor (menüdeki aynı
  adlı bağlantı `projenizi-anlatin.html`'e) — işlev değişikliği gerektirir.

Ek: proje köküne `README.md` eklendi; önizleme için `.claude/launch.json`
oluşturuldu (yerel Python sunucusu, port 8765; git'e eklenmedi).
