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
index.html                 Ana sayfa
calismalarimiz.html        Tüm çalışmalar (konsept projeler) sayfası
hakkimizda.html            Hakkımızda sayfası
projenizi-anlatin.html     Proje anlatım formu sayfası

css/
  reset.css                Sade tarayıcı sıfırlaması
  variables.css            Renk, tipografi, boşluk token'ları ve .section-invert (siyah bölüm) paleti
  main.css                 Yerleşim ve bileşen stilleri
  responsive.css           Kırılım noktaları (1366 / 1024 / 860 / 768 / 640 / 480 / 375 px)

js/
  main.js                  index.html giriş noktası
  worksPage.js             calismalarimiz.html giriş noktası
  staticPage.js            hakkimizda.html giriş noktası
  projectBriefPage.js      projenizi-anlatin.html giriş noktası
  i18n.js                  Dil motoru: t(), setLanguage(), onLanguageChange()
  utils.js, icons.js       Yardımcılar ve SVG ikon seti

components/                Header, paketler, proje slider'ı, çalışma detayları,
                           SSS, iletişim, arama, paket iletişim popup'ı,
                           Soru Sor formu, proje anlatım formu
data/                      Yapısal veriler (paketler, projeler, iletişim kanalları, logo yolu)
data/i18n/                 Çeviri dosyaları: tr.js, en.js, de.js, fr.js, it.js
assets/                    Logo görselleri
```

Metin içeriğinin tek kaynağı `data/i18n/*.js` dosyalarıdır; `data/*.js`
dosyaları yalnızca id, ikon, bağlantı gibi yapısal alanları tutar. Statik
metinler HTML'de `data-i18n*` öznitelikleriyle bağlanır. Seçilen dil
tarayıcıda `localStorage["velora-lang"]` anahtarında saklanır.

Depoda kodda kullanılmayan birkaç dosya da bulunur (ör.
`components/hizmetler.js`, `data/benefits.js`, `data/industries.js`,
`js/scrollAnimations.js`, `js/theme.js`); hiçbir sayfa bunları yüklemez.

## Sayfalar ve özellikler

- **Ana sayfa (`index.html`):** hero, çalışmalar slider'ı (otomatik oynatma
  yalnızca 1024 px üstünde, dokunmatik kaydırma desteği), paket kartları,
  Hakkında özeti, Soru Sor formu, SSS akordiyonu, iletişim kanalları.
- **Çalışmalarımız (`calismalarimiz.html`):** her biri "Konsept Proje"
  etiketli proje blokları ve üçer akordiyon; sektör butonları bilinçli
  olarak devre dışıdır.
- **Hakkımızda (`hakkimizda.html`):** üç içerik bloğu ve iletişim çağrısı.
- **Projenizi Anlatın (`projenizi-anlatin.html`):** çoklu dosya seçimli
  proje anlatım formu, çalışmalara bağlantı ve iletişim kanalları.
- Tüm sayfalarda: sabit header (dropdown, mobil hamburger menü, dil
  seçici), site içi arama (paketler ve SSS içinde), footer.

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
- Çalışmalar sayfasındaki 7 proje konsept/demo çalışmalardır; gerçek
  müşteri işini temsil etmez. Proje görselleri henüz yoktur, yerlerinde ikon
  gösterilir.
- Projede otomatik test veya lint yapılandırması bulunmaz.
