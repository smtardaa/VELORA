# VELORA — Proje Bağlamı ve Yol Haritası Takip Belgesi

**Belge başlığı:** VELORA — Proje Bağlamı ve Yol Haritası Takip Belgesi
**Son güncelleme:** 29 Eylül 2026
**Belgenin amacı:** Projeye sonradan dahil olacak bir yapay zekânın veya kişinin, VELORA'nın ne olduğunu, sitenin bugünkü gerçek durumunu, şimdiye kadar alınan kararları ve üzerinde anlaşılan yol haritasını hızlıca kavrayıp kaldığımız yerden devam edebilmesini sağlamak.

**Bilgi kaynağı ve kapsamı:**
Bu belge iki farklı kaynaktan derlendi ve bu ayrım belge boyunca korunmuştur:
1. **Doğrulanmış / gözlemlenmiş bilgi** — bu Claude Cowork oturumunun görebildiği önceki mesajlar (VELORA sitesinin teknik geliştirme geçmişi: i18n sistemi kurulumu, bölüm kaldırma/ekleme, Hakkında bölümü çalışması, form/paket/SSS değişiklikleri) ve bu oturumun bağlı olduğu **VELORA** Project'teki iki doküman (`coklu-dil-sistemi.md`, `degisiklik-gunlugu.md`). Sitenin teknik durumuyla ilgili tüm ifadeler ayrıca **doğrudan kaynak koddan okunarak** (`/home/claude/velora` çalışma kopyası — kullanıcının bilgisayarındaki `VELORA Web and Digital Solutions` klasörüyle bu belge hazırlanmadan hemen önce birebir aynı olduğu doğrulandı) teyit edilmiştir; tahmin değildir.
2. **Kullanıcının bu görevi verirken doğrudan ilettiği bilgi** — sektör deneyimi, hedef sektörler, teklif kapsamı, yol haritası adımları ve sonuç takip metrikleri. Bu bilgiler **yalnızca bu görev talimatında** verildi.

**Açıkça belirtilmesi gereken sınır:** Bu konuşma ve bağlı Project dışında, VELORA'nın iş stratejisi, sektör seçimi, teklif detayları veya saha denemeleri üzerine yapılmış başka bir konuşma/oturum/dosya varsa, **buna erişimim yok**. Madde 4 ve 5'teki iş/strateji bilgileri daha önce başka bir yerde tartışılmış olabilir ama bunu bilmiyorum — bu belgeye yalnızca kullanıcının bu görevde yazdığı metinden aktarıldı.

**Bu belge ne zaman güncellenmeli:** Yeni bir karar kesinleştiğinde, bir site bölümünün Tut/Değiştir/Çıkar/Sonra-yap durumu netleştiğinde, ilk saha denemesi sonuçları geldiğinde veya sitede/teklifte önemli bir değişiklik yapıldığında.

---

## 1. Projenin Amacı

VELORA, kullanıcının (Arda) yürüttüğü bir web ajansı/dijital stüdyo markası. Site, ana marka fikri üzerine kurulu: **"İşletmenizin dijital kapısını tasarlıyoruz."** — bu ifade, sitenin Hakkında bölümünün başlığında hâlâ yaşıyor ("Dijital dünyadaki ilk izleniminiz, bir kapıdır.").

Hedeflenen deneyim: sade, Apple vizyonundan ilham alan (siyah/beyaz/gri, gereksiz süslemesiz, güçlü tipografi), anlaşılır ve güven veren bir müşteri deneyimi. Ziyaretçinin VELORA ile doğrudan görüşmeden önce **hizmeti ve bir sonraki adımı** (paket seçmek, soru sormak, iletişime geçmek) anlayabilmesi hedefleniyor — bu hedef, sitenin Paketlerimiz / Soru Sor / SSS / İletişim yapısına zaten yansımış durumda.

## 2. Başlangıç Noktası ve Bugünkü Durum

### 2.1 İlk site sürümünün durumu
Site, build aracı gerektirmeyen tek sayfalık (single-page) statik bir HTML/CSS/vanilla JS yapısı. Bu konuşmanın kapsadığı dönemde site zaten olgun bir teknik iskelete ulaşmış durumda: 5 dilli (TR/EN/DE/FR/IT) tam çalışan bir çeviri sistemi, oturmuş bir tasarım dili (siyah/beyaz alternatif bölüm arka planları, `.section-invert` mekanizmasıyla) ve birkaç etkileşimli bileşen (slider'lar, akordiyon, form, popup) mevcut.

### 2.2 Yapılmış ve hâlen görülebilen bölümler
- **Header:** logo, ana menü (Ana Sayfa / Çalışmalarımız / Paketlerimiz / Hakkımızda / Soru Sor / SSS / İletişim), site içi arama, 5 dilli dil seçici.
- **Hero (Ana Sayfa):** marka adı + kısa açıklama + 3 CTA butonu.
- **Çalışmalarımız:** kaydırmalı (slider) 7 örnek proje kartı — **bkz. 2.4, hepsi demo**.
- **Paketlerimiz:** 3 paket (Tek Sayfa / Kurumsal / Özel Proje), fiyat gösterilmiyor; her paketin butonu artık doğrudan İletişim'e değil, pakete özel başlıklı ve 7 iletişim kanalı ikonu içeren (şu an tıklanamaz/pasif) bir popup'a açılıyor.
- **Hakkında:** eyebrow ("VELORA") + ana başlık + 3 köşe taşı (Sade/Deneyim/Büyüme). **Not:** bu bölüm önce daha uzun bir "editorial" metinle yazıldı, sonra kullanıcı kendi bilgisayarında elle düzenleyip giriş paragraflarını ve kapanış cümlesini çıkardı; şu anki kısa hâli kullanıcının bilinçli tercihi (ayrıntı: madde 3 ve Project'teki `degisiklik-gunlugu.md`).
- **Soru Sor:** çok alanlı form (Ad, Soyad, E-posta, Şirket, önceki site linki, bütçe, ihtiyaç, soru), 5 dilde doğrulama mesajları.
- **SSS:** 10 soru/cevap, akordiyon yapıda.
- **İletişim:** 7 kanal (E-posta, Telefon, WhatsApp, Instagram, Facebook, TikTok, Telegram) grid halinde.
- **Footer:** kısa menü + sosyal ikonlar + telif hakkı satırı.

### 2.3 Gerçek bilgiyle doldurulması / doğrulanması / değiştirilmesi gereken kısımlar (kaynak koddan doğrulandı)
- **İletişim bilgileri tamamen placeholder.** `data/contact.js` içinde e-posta (`info@velora.example`), telefon (`+90 (5xx) xxx xx xx`) ve tüm sosyal medya hesapları hayali; sosyal linklerin `href` değeri `"#"`. Dosyanın kendi yorum satırı bunu açıkça "ÖRNEK/placeholder... gerçek kişisel bilgi içermez" diye belirtiyor. **Yayın öncesi mutlaka gerçek bilgiyle değiştirilmeli.**
- **Soru Sor formunun gerçek bir backend'i yok.** `components/questionForm.js` içinde form gönderimi JS ile simüle ediliyor (kod yorumu: "Gerçek bir backend bulunmadığı için gönderim burada simüle edilir"). Kullanıcıya "başarılı" mesajı gösteriliyor ama girilen bilgi hiçbir yere gönderilmiyor/kaydedilmiyor. **Bu, siteyi sahaya çıkarmadan önce kapatılması gereken en kritik boşluk** — aksi halde gerçek müşteri soruları sessizce kaybolur.
- Paket popup'ındaki ve İletişim bölümündeki 7 kanal butonu bilinçli olarak "şimdilik pasif" bırakılmış (yalnızca görsel, tıklanamaz) — gerçek linkler netleşince aktive edilmeli.
- SSS'deki "3 iş günü teslim" iddiası ve paket özelliklerindeki kapsam/süre ifadeleri şu an genel/varsayılan metin; kullanıcının gerçek kapasitesine göre doğrulanmalı.
- Marka adı, logo ve tagline (`data/site-config.js`) gerçek/kesinleşmiş görünüyor, placeholder değil — acil değil ama onay için tekrar gözden geçirilebilir.
- **Erişemediğim bilgi:** Sitenin canlı/yayında bir sürümü olup olmadığını, bir domain'e bağlı olup olmadığını bilmiyorum — bu konuşmada veya proje dosyalarında böyle bir bilgi yok.

### 2.4 Demo/konsept ile gerçek iş ayrımı
`data/projects.js`'teki 7 proje kaydının (VELORA Web & Digital Solutions, Lumen Kahve Dükkanı, Atlas Hukuk Bürosu, FitCore Stüdyo, Vera Cilt Kliniği, Marka Vitrin E-Ticaret, Ada Mimarlık Portfolyo) **hepsi kurgusal/demo** — kaynak kodda açıkça "örnek/demo proje verileri" diye işaretli, hepsinin `image` alanı boş ve `href` değeri `"#"`. **Bunların hiçbiri gerçek bir müşteri işi değildir.**

Yol haritasında (madde 6) planlanan "5 hedef sektör için konsept demo tasarımları" ayrı ve henüz başlanmamış bir iştir — bu konuşmada veya proje dosyalarında bu demoların üretildiğine dair bir kayıt yok.

## 3. Proje Geçmişi ve Kararlar (kronolojik)

| Tarih | Karar | Gerekçe / Not | Durum |
|---|---|---|---|
| 26 Eyl 2026 | 5 dilli i18n sistemi kuruldu (TR/EN/DE/FR/IT), `localStorage` ile dil hatırlama | Uluslararası müşterilere uygun deneyim hedefi | Kesinleşti |
| 26 Eyl 2026 | Dil seçici butonuna `cursor:pointer` eklendi | Küçük UX düzeltmesi | Kesinleşti |
| (bu oturumdan önceki 7 maddelik talep, tarih net değil — Project dokümanına göre ~26-27 Eyl) | Hedeflerimiz bölümü HTML/CSS/JS/i18n dahil tamamen kaldırıldı, ilişkili veri dosyaları silindi | Kapsam dışı görülen bölüm | Kesinleşti |
| aynı dönem | İletişim bölümü arka planı siyah, Footer arka planı beyaz yapıldı | Görsel ritim tercihi | Kesinleşti |
| aynı dönem | Soru Sor formundaki input/select yükseklikleri eşitlendi (yalnızca yükseklik; genişlik mevcut satır düzenine bırakıldı) | Tasarımı bozmadan görsel tutarlılık | Kesinleşti (Claude'un yorumu kullanıcıya açıklandı, itiraz gelmedi) |
| aynı dönem | "Özel Proje" paket butonu metni "Teklif İçin İletişime Geç" → "İletişime Geç" | Diğer paket butonlarıyla tutarlılık | Kesinleşti |
| aynı dönem | Paket kartı butonları artık doğrudan İletişim'e yönlendirmiyor; pakete özel başlıklı, 7 kanallı (şimdilik pasif) popup açılıyor | Kullanıcı deneyimini iyileştirme | Kesinleşti |
| aynı dönem | SSS, tasarım/akordiyona dokunmadan 10 yeni soruyla güncellendi | İçerik tazeleme | Kesinleşti |
| aynı dönem | (yan bulgu) Paketler slider'ında gizli bir `transitionend` olay-taşması hatası bulunup düzeltildi | Yeni popup butonu eklenirken ortaya çıkan pre-existing hata | Kesinleşti (hata düzeltmesi) |
| 27 Eyl 2026 | Hakkında bölümü "premium editorial" içerikle baştan yazıldı: başlık + 3 giriş paragrafı + vurgu cümlesi + 3 köşe taşı + kapanış cümlesi (5 dilde); Header/Footer'a bağlantı eklendi | Marka anlatısını güçlendirme talebi | **Değişti** → bkz. 28 Eylül kaydı |
| 28 Eyl 2026 | Mobilde sabit header'ın Hakkında bölümünün üstünü kapatması hatası `scroll-margin-top` ile düzeltildi; nav/footer metni "Hakkında" → "Hakkımızda" | Kullanıcı bildirimi | Kesinleşti |
| 28 Eyl 2026 | Kullanıcı, Hakkında bölümünü kendi bilgisayarında **elle** düzenleyip giriş paragraflarını ve kapanış cümlesini çıkardı; yalnızca başlık + 3 köşe taşı kaldı | Kullanıcının kendi tercihi (Claude'un önerisi değil) | Kesinleşti — 27 Eylül'deki tam "editorial" sürümün yerine geçti |
| 28 Eyl 2026 | Artık hiçbir HTML elemanının kullanmadığı `about.intro.*` / `about.closing.*` çeviri anahtarları 5 dilden de temizlendi | Kod temizliği, kullanıcı talebi | Kesinleşti |
| 29 Eyl 2026 | Bu takip belgesinin (`VELORA_PROJECT_CONTEXT.md`) hazırlanmasına karar verildi | Proje devamlılığı / bağlam aktarımı | Kesinleşti (bu görevin kendisi) |

## 4. Hizmet Kapasitesi ve Hedef Sektörler

Kullanıcı bu görevde, yaklaşık **3 yıllık sektör deneyimine** sahip olduğunu ve web sitesiyle ilişkili hizmetleri **tek başına** sunabileceğini belirtti. *(Bu bilgi yalnızca bu görev talimatında verildi; daha önce başka bir konuşmada tartışılıp tartışılmadığını bilmiyorum — hangi hizmetlerin tam olarak "tek başına sunulabilir" kapsamında olduğu bu görevde ayrıntılandırılmadı; sitenin kendi kapsamından [paketler + SSS] çıkarılabilecek referans hizmetler: web tasarım/geliştirme, temel SEO, domain/hosting yönlendirmesi, teslim sonrası destek.)*

İlk test için belirlenen beş alan:
1. Erkek ve kadın kuaförleri
2. Güzellik salonları ve tırnak stüdyoları
3. Hukuk büroları
4. Bağımsız avukatlar
5. Mali müşavirler

Bu beş sektör **henüz kalıcı bir uzmanlık alanı olarak seçilmedi**; ilk müşteri erişim denemelerinde test edilecek. Sektör odağının kesinleşmesi, madde 7'deki sonuç takibine bağlı. **(Açık)**

## 5. Teklif ve Vaatlerin Doğruluk Durumu

Kullanıcının düşündüğü teslimat ve ek hizmetler (bu görevde belirtildi):
- Web sitesi
- Domain/hosting konusunda yardım — *zaten SSS'de var (doğrulandı): "Domain ve hosting süreçlerinde size rehberlik ediyoruz..."*
- Google İşletme Profili kurulumu — *şu an sitede/SSS'de YOK; planlanan yeni bir hizmet, henüz kapsamı/koşulları netleşmedi.* **(Açık)**
- Yayın sonrası değişiklik ve destek — *zaten SSS'de var (doğrulandı) ama kapsam/süre belirsiz bırakılmış ("kapsam ve süre paketinize göre değişebilir").* **(Açık: somut bir kapsam/süre tanımı gerekiyor.)**

**Çalışma kuralı olarak kaydedildi:** Google aramasında "ilk 5" gibi garanti edilemeyecek sonuçlar vaat olarak kullanılmamalı. *(Kontrol edildi: sitede şu an böyle bir vaat yok — SSS'deki SEO cevabı yalnızca "daha görünür olmanızı sağlayan temel SEO ayarları" diyor, sıralama garantisi vermiyor. Bu madde ileride eklenmemesi gereken bir sınır olarak kayıtta.)*

**Netleştirilmesi gereken ifade:** "Yapay zekâya tanımlı kod" gibi, müşteri açısından anlamı henüz net olmayan ifadeler var (kullanıcı tarafından bu görevde belirtildi). Bu ifade şu an sitenin hiçbir yerinde kullanılmıyor (kontrol edildi); muhtemelen planlanan bir pazarlama/teklif metni. Tam olarak neyi kastettiği (AI destekli geliştirme süreci mi, yapay zekâya özel optimize kod mu, başka bir şey mi) bu görevde netleşmedi. **(Açık)**

## 6. Üzerinde Anlaşılan Yol Haritası

1. Mevcut siteyi cilalamayı durdurup, mevcut iskeleti gerçek bilgilerle doldurarak müşteriye gösterilebilir ilk sürüme ulaştırmak.
2. Gerçek iletişim bilgileriyle siteyi ve sosyal medya hesaplarını sahaya çıkabilecek seviyede tamamlamak; mükemmel olmalarını beklememek.
3. Beş hedef alan için konsept demo tasarımları hazırlamak ve bunları **konsept** olarak açıkça etiketlemek.
4. İlk müşteri arama ve iletişim yöntemini, sektöre göre mesajları ve konuşma akışını hazırlamak.
5. Deneme sonuçlarını takip ederek sonraki aylarda sektör odağını güncellemek.
6. **Şu anki ilk iş:** mevcut site bölümlerini **Tut / Değiştir / Çıkar / Sonra yap** diye sınıflandırmak; sonra her bölüm için gereken gerçek bilgileri netleştirmek. *(Henüz yapılmadı — aşağıda yalnızca başlangıç için bir öneri var, kesinleşmiş bir karar değil.)*

**Öneri (Claude'un taslağı, onay bekliyor — kesinleşmiş bir karar değildir):**
- **Tut:** Header/nav yapısı, genel tasarım dili, i18n altyapısı, Paketlerimiz'in yapısı, SSS'nin yapısı (accordion), Hakkında'nın şu anki kısa hâli.
- **Değiştir:** İletişim bilgileri (placeholder → gerçek), Soru Sor formunun backend'i, paket/iletişim kanal butonlarının linkleri, Çalışmalarımız'daki demo projeler (gerçek işlerle mi değişecek yoksa "konsept" etiketiyle mi kalacak — karar bekleniyor).
- **Çıkar:** Şu an gözlemlenen, açıkça "çıkarılması gereken" bir bölüm yok — kullanıcı kararı bekleniyor.
- **Sonra yap:** 5 sektöre özel konsept demo sayfaları, Google İşletme Profili entegrasyon detayları, saha denemesi sonrası sektör odağı güncellemesi.

## 7. Sonuç Takibi

İlk erişim denemelerinde sektör bazında kaydedilecek ölçümler (kullanıcı tarafından bu görevde belirtildi):
- Ulaşılan işletmeler
- Yanıtlar
- Görüşmeler
- Teklifler
- Alınan işler
- Sık görülen ihtiyaçlar ve itirazlar
- Tahmini iş yükü ve teslimatın uygunluğu

**Not:** Bu metrikler için henüz bir takip aracı/tablosu oluşturulmadı. **(Açık — istenirse ayrı bir tracker/sheet hazırlanabilir.)**

## 8. Açık Sorular ve Sıradaki Adımlar

*(En yakın ve somut adım en üstte.)*

1. **[EN YAKIN]** Mevcut site bölümlerini Tut/Değiştir/Çıkar/Sonra-yap olarak sınıflandırmak (madde 6'nın ilk işi, madde 6'daki öneri taslağı başlangıç noktası olabilir). → *Tamamlandı sayılır:* kullanıcı bu sınıflandırmayı onayladığında/netleştirdiğinde.
2. Gerçek iletişim bilgilerini (e-posta, telefon, sosyal medya hesapları) toplayıp `data/contact.js`'e işlemek. → *Tamamlandı sayılır:* tüm placeholder değerler gerçek değerlerle değişip sosyal link `href`leri aktifleştiğinde.
3. Soru Sor formu için gerçek bir gönderim mekanizması (e-posta servisi / form backend'i) seçip bağlamak. → *Tamamlandı sayılır:* test gönderimi gerçekten kullanıcıya ulaştığında.
4. Çalışmalarımız bölümündeki 7 demo projenin akıbetine karar vermek. → *Tamamlandı sayılır:* karar netleşip siteye yansıdığında.
5. 5 hedef sektör için konsept demo tasarımlarının kapsamı/formatı netleşmeli (her sektör için ayrı mini-site mi, tek sayfalık mockup mı?). **(Açık)**
6. İlk müşteri arama yönteminin kanalı netleşmeli (soğuk arama, e-posta, sosyal medya DM, yüz yüze ziyaret?). **(Açık)**
7. Google İşletme Profili kurulumunun pakete/fiyatlandırmaya nasıl dahil edileceği. **(Açık)**
8. Yayın sonrası destek kapsamının ve süresinin somut tanımı. **(Açık)**
9. "Yapay zekâya tanımlı kod" ifadesinin ne anlama geldiğinin netleştirilmesi. **(Açık)**
10. Sonuç takip metrikleri için bir format/araç seçilmesi (tablo, sheet, CRM?). **(Açık)**

## 9. Çalışma Kuralları

- VELORA'yı kusursuzlaştırmak sahaya çıkmanın ön şartı yapılmayacak.
- Kullanıcının istemediği özellik veya vaat eklenmeyecek.
- Gerçek olmayan müşteri, sonuç, fiyat, süre, iletişim bilgisi veya portfolyo uydurulmayacak.
- Büyük teknoloji kararları ihtiyaç doğrulanmadan kesinleştirilmeyecek.
- Kullanıcının doğrudan verdiği kararlarla Claude'un kendi önerileri ayrı tutulacak (bu belgedeki "Kesinleşti" / "Öneri" etiketleri bu ayrımı yansıtır).
- **Bu görev sırasında site kodu/içeriği değiştirilmedi** — yalnızca bu takip belgesi hazırlandı (doğrulama: bu görev boyunca yalnızca okuma işlemleri yapıldı, `index.html`/`css`/`js`/`data` dosyalarına hiçbir yazma işlemi uygulanmadı).

---

## Hızlı Devam Özeti

1. Site iskeleti teknik olarak hazır (i18n, tasarım, form, paket popup'ı) ama İletişim bilgileri hâlâ placeholder ve Soru Sor formunun gerçek bir backend'i yok — ilk öncelik bunları doldurmak.
2. Hakkında bölümü kullanıcı tarafından kısaltıldı (yalnızca başlık + 3 köşe taşı) — bu bilinçli bir tercih, geri eklenmemeli.
3. 5 hedef sektör (kuaför, güzellik/tırnak, hukuk bürosu, bağımsız avukat, mali müşavir) henüz test edilmedi; sıradaki iş mevcut bölümleri Tut/Değiştir/Çıkar/Sonra-yap diye sınıflandırmak (madde 6'daki öneri taslağına bakılabilir).
4. Google İşletme Profili teklifi, yayın sonrası destek kapsamı ve "yapay zekâya tanımlı kod" ifadesi netleşmemiş açık konular.
5. Bu belge yalnızca bu görevde verilen bilgilerle hazırlandı — sektör/strateji kısmı başka bir konuşmada tartışılmışsa, ona erişimim yok.
