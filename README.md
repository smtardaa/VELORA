# VELORA

VELORA web ajansı / dijital stüdyo markasının tanıtım sitesi. Site; hizmet
paketlerini, konsept çalışmaları, ajans hakkında bilgiyi, sık sorulan soruları
ve iletişim kanallarını gösterir; ziyaretçinin soru sormasına ve projesini
anlatmasına yönelik iki form içerir.

## Teknoloji

- Statik HTML + CSS + vanilla JavaScript (ES modülleri, `<script type="module">`).
- Build aracı, paket yöneticisi (`package.json`) veya harici kütüphane yoktur.
- Çok dillidir: Türkçe (varsayılan), English, Deutsch, Français, Italiano.

## Proje yapısı

```
index.html                 Tek HTML sayfası: ana sayfa + üç tam ekran görünüm
                           (Çalışmalarımız, Hakkımızda, Projenizi Anlatın)

css/
  reset.css                Sade tarayıcı sıfırlaması
  variables.css            Renk, tipografi, boşluk token'ları ve .section-invert (siyah bölüm) paleti
  main.css                 Yerleşim ve bileşen stilleri
  responsive.css           Kırılım noktaları (1366 / 1024 / 860 / 768 / 640 / 480 / 375 px)
  home.css                 Güncel görsel katman (palet, tipografi, butonlar, kartlar,
                           paketler, çalışmalar vitrini, footer) — ana sayfa ve görünümler
  views.css                Tam ekran görünümler, üst çubuk ve siyah geçiş katmanı

js/
  main.js                  Giriş noktası (tüm bileşenleri başlatır)
  viewRouter.js            Görünümler: adres (#/…), geri/ileri, odak, geçiş animasyonu
  reveal.js                Kaydırmada sıralı görünme (görünümlerdeki kartlar)
  i18n.js                  Dil motoru: t(), setLanguage(), onLanguageChange()
  utils.js, icons.js       Yardımcılar ve SVG ikon seti

components/                Header, paketler, proje slider'ı, çalışma detayları,
                           SSS, iletişim, arama, paket iletişim popup'ı,
                           Soru Sor formu, proje anlatım formu
data/                      Yapısal veriler (paketler ve başlangıç fiyatları, projeler,
                           iletişim kanalları, logo yolu)
data/i18n/                 Çeviri dosyaları: tr.js, en.js, de.js, fr.js, it.js
assets/                    Logo görselleri
```

Metin içeriğinin tek kaynağı `data/i18n/*.js` dosyalarıdır; `data/*.js`
dosyaları yalnızca id, ikon, bağlantı gibi yapısal alanları tutar. Statik
metinler HTML'de `data-i18n*` öznitelikleriyle bağlanır. Seçilen dil
tarayıcıda `localStorage["velora-lang"]` anahtarında saklanır.

Depoda kodda kullanılmayan birkaç dosya da bulunur (ör.
`components/hizmetler.js`, `data/benefits.js`, `data/industries.js`,
`js/scrollAnimations.js`, `js/theme.js`) ve eski ayrı sayfaların giriş
betikleri (`js/worksPage.js`, `js/staticPage.js`, `js/projectBriefPage.js`);
index.html bunları yüklemez.

## Sayfalar ve özellikler

- **Ana sayfa (`index.html`):** hero, çalışmalar vitrini (sonsuz slider;
  otomatik kayma yalnızca 1024 px üstünde ve hareket azaltma tercihi
  kapalıyken; dokunmatik sürükleme, klavye ←/→ ve konum noktaları), paketler,
  Hakkında özeti, Soru Sor formu, SSS akordiyonu, iletişim kanalları ve
  gruplandırılmış footer.
- **Paketler:** 4 fiyatlı paket (Tek Sayfa, Kurumsal, Randevu ve Menü,
  E-Ticaret) ve fiyatsız "Kendi Projenizi Anlatın" kartı. Başlangıç fiyatları
  `data/packages.js > startingPrice` içinde, metinler (dahil olanlar, dahil
  olmayanlar) `data/i18n/*.js > packages` altındadır. Kartlar kaydırma
  sırasında sırayla görünür. Fiyat gerekçeleri ve araştırma kaynakları:
  `degisiklik-gunlugu-4.md`.
- **Tam ekran görünümler:** ayrı HTML sayfası değil, index.html içindeki
  katmanlardır. Header'ın altında açılır, kendi içinde kayar; açıkken ana
  sayfa kaydırılamaz ve klavye/ekran okuyucuyla erişilemez (`inert`). Üstteki
  çubukta "Ana sayfaya dön" bağlantısı ve açık görünümün adı bulunur.
  - **Çalışmalarımız (`#/calismalarimiz`, proje için
    `#/calismalarimiz/<proje-id>`):** "Konsept Proje" etiketli proje kartları
    ve üçer akordiyon; sektör butonları bilinçli olarak devre dışıdır.
  - **Hakkımızda (`#/hakkimizda`):** üç içerik bloğu ve iletişim çağrısı.
  - **Projenizi Anlatın (`#/projenizi-anlatin`):** çoklu dosya seçimli proje
    anlatım formu, çalışmalara bağlantı ve iletişim kanalları.
- **Geçiş:** görünümler arasında siyah katman üstten alta kapanır, ortada
  VELORA logosu belirir, yeni görünüm aşağıdan yukarı açılır. Hareketi
  azaltma tercihinde geçiş animasyonsuzdur. Tarayıcının geri/ileri düğmeleri
  aynı durumları yeniden kurar (History API + `popstate`).
- Her yerde: sabit header (dropdown, mobil hamburger menü, dil seçici,
  açık görünümün işaretlenmesi), site içi arama (paketler ve SSS içinde),
  gruplandırılmış footer.

## Yerelde çalıştırma

Sayfalar ES modülleri kullandığından dosyayı doğrudan (`file://`) açmak
yerine herhangi bir statik dosya sunucusuyla proje kökünden sunun. Örneğin
bilgisayarda Python yüklüyse:

```bash
python -m http.server 8000
```

Ardından tarayıcıda `http://localhost:8000` adresini açın. Kurulum veya
derleme adımı yoktur.

## Yayınlama

Git uzak deposu `https://github.com/smtardaa/velora.git` adresidir. Depoda
yayınlama yapılandırması (ör. GitHub Actions iş akışı, `CNAME`) bulunmadığı
için yayın yöntemi proje dosyalarından doğrulanamamaktadır.

## Bilinen sınırlamalar / tamamlanmamış işlevler

- **Soru Sor formu (`components/questionForm.js`) veri göndermez:**
  gönderim `setTimeout` ile simüle edilir ve başarı mesajı gösterilir, ancak
  bilgiler hiçbir yere iletilmez.
- **Projenizi Anlatın formu (`components/projectBriefForm.js`) bir gönderim
  altyapısına bağlı değildir:** `SUBMIT_ENDPOINT` boştur; form ağ isteği
  yapmaz ve bunu kullanıcıya açıkça bildirir. Dosya türü/boyutu sınırı
  belirlenmemiştir.
- **İletişim bilgileri yer tutucudur (`data/contact.js`):** e-posta
  (`info@velora.example`), telefon ve WhatsApp numarası örnek değerdir;
  WhatsApp, Instagram, Facebook, TikTok ve Telegram bağlantıları `"#"`
  hedeflidir. LinkedIn ve GitHub adresleri girilmemiştir ("Yakında
  eklenecek" olarak pasif görünür).
- Paket popup'ındaki iletişim kanalı butonları pasiftir.
- Paket fiyatları için KDV dahil/hariç bilgisi belirlenmemiştir; sitede KDV
  ibaresi yoktur. Paket bölümündeki "5 iş günü" teslim notu tüm paketler
  için yazılıdır ve yeni paket kapsamlarıyla (özellikle E-Ticaret) henüz
  uyumlu hâle getirilmemiştir.
- Eski ayrı sayfa adresleri (`calismalarimiz.html`, `hakkimizda.html`,
  `projenizi-anlatin.html`) kaldırıldı; bu adreslere dışarıdan verilmiş
  bağlantılar artık 404 döner. Görünümler JavaScript ile açılır; JavaScript
  kapalıyken yalnızca ana sayfa kullanılabilir.
- Çalışmalar görünümündeki 7 proje konsept/demo çalışmalardır; gerçek
  müşteri işini temsil etmez. Proje görselleri henüz yoktur, yerlerinde ikon
  gösterilir.
- Projede otomatik test veya lint yapılandırması bulunmaz.
