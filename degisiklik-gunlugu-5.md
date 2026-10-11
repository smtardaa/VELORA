# VELORA — Değişiklik Günlüğü 5

## 11 Ekim 2026 — Tek sayfa yapısı ve tam ekran görünümler

### Yedek
Değişikliklerden önce, commit edilmemiş önceki çalışma (ana sayfa yenilemesi,
günlük 4) dahil tüm çalışma ağacı dal ve index'e dokunmadan ayrı bir Git
referansına alındı:

    refs/backups/oncesi-tek-sayfa-2026-10-11   (2a64c2d)

Geri dönmek için: `git checkout refs/backups/oncesi-tek-sayfa-2026-10-11 -- .`

### Yapı
- `calismalarimiz.html`, `hakkimizda.html`, `projenizi-anlatin.html`
  sayfalarının `<main>` içerikleri değiştirilmeden `index.html` içine üç
  tam ekran görünüm olarak taşındı (`#view-calismalarimiz`,
  `#view-hakkimizda`, `#view-projenizi-anlatin`). Değişen yalnızca:
  görünür sayfa başlığı h1 oldu (Çalışmalarımız'daki görünmez h1 kaldırıldı),
  iç bağlantılar (`index.html#…` → `#…`, `calismalarimiz.html` →
  `#/calismalarimiz`) ve çakışan id (`iletisim-grid` → `brief-contact-grid`).
- Adresler: `#/calismalarimiz`, `#/calismalarimiz/<proje-id>`,
  `#/hakkimizda`, `#/projenizi-anlatin`; hash yoksa veya `#/` ana sayfa.
  History API (pushState) + `popstate`/`hashchange` ile geri/ileri.
- Yeni: `js/viewRouter.js` (yönlendirme, geçiş, odak, inert, footer klonu),
  `js/reveal.js` (görünümlerde sıralı görünme), `css/views.css`.
  Bağımlılık eklenmedi (Web Animations API, IntersectionObserver, inert).
- `index.html` başındaki küçük satır içi betik, adres bir görünümü
  gösteriyorsa JS yüklenmeden önce ana sayfanın görünmesini engeller.
- Bağlantılar: header (Hakkımızda, Projenizi Anlatın, dropdown "Tüm
  çalışmalarımızı inceleyin"), "Tüm çalışmalarımızı inceleyin", "Hakkımızda
  daha fazla bilgi edinin", hero "Projenizi Anlatın" (önceden #soru-sor'a
  gidiyordu), paket "Kendi Projenizi Anlatın" kartı, footer, proje kartları.
- Görünümlerin footer'ı ana sayfa footer'ının çalışma anındaki klonudur.

### Geçiş
Siyah katman `clip-path` ile üstten alta kaplar (560ms), ortada
`assets/Velora First logo.png` (siyah zeminli beyaz logo, değiştirilmeden)
belirir, görünüm katmanın altında değiştirilir, iki kare beklenir, katman
aşağıdan yukarı açılır (640ms). prefers-reduced-motion: animasyonsuz anında
geçiş. Geçiş sırasında gelen yeni istek bitince son adrese göre uygulanır.

### Tasarım (kullanıcı ara mesajı: görsel yenilikler tüm görünümlerde)
Görünümler `css/home.css` sistemini kullanır: açık gri zemin + beyaz kartlar,
grafit koyu bölümler, aynı tipografi ölçeği, buton ölçüleri (52px), kart
köşe/gölgeleri, footer ve sıralı görünme animasyonu. Çalışma detayları beyaz
kartlar, Hakkımızda blokları beyaz kartlar, form ana sayfadaki Soru Sor ile
aynı. `.page-home h2` kuralı bölüm başlıklarıyla sınırlandı (kart içi
başlıklar kendi ölçüsünde).

### Silinenler
Üç eski HTML dosyası, kodda (href/src/ctaHref/import/location/fetch) hiçbir
referans kalmadığı doğrulandıktan sonra silindi. Eski giriş betikleri
`js/worksPage.js`, `js/staticPage.js`, `js/projectBriefPage.js` artık hiçbir
yerden yüklenmiyor ama silinmedi (temizlik adayı, kullanıcı kararı).

### Kontroller
- Headless Chrome (CDP, bağımlılıksız) ile 45 görünüm testi: geçiş zaman
  çizelgesi, değişimin katman tam kapalıyken olması, logo, geri/ileri, odak,
  inert, kaydırma kilidi, bağlantılar, derin bağlantı, form ve akordiyon,
  JS yüklenmeden titreme olmaması, azaltılmış hareket, 375/768px menü ve
  taşma, EN dil, art arda tıklama — 45/45.
- Önceki ana sayfa testleri (paketler, slider, sürükleme, menü, 5 dil) —
  38/38.
- 5 dilde i18n anahtar eşleşmesi 263/263; tüm JS dosyaları `node --check`.

### Kalan / karar gerektiren
- Eski `.html` adreslerine dışarıdan gelen bağlantılar 404 döner
  (yönlendirme sayfası istenmedi).
- JS kapalıyken görünümler açılmaz.
- CLAUDE.md §2–§3'teki sayfa listesi ve "fiyat gösterilmiyor" gibi ifadeler
  güncel değil.
- İçerik eksikleri değişmedi: yer tutucu iletişim bilgileri, gönderilmeyen
  formlar, proje görselleri yok, LinkedIn/GitHub adresi yok.
