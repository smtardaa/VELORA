# VELORA — Claude Code Devir Belgesi

> Kaynak: claude.ai "VELORA" Project'indeki 4 doküman (coklu-dil-sistemi.md, VELORA_PROJECT_CONTEXT.md, degisiklik-gunlugu.md, degisiklik-gunlugu-2.md) + kullanıcı belleği. Hazırlayan Claude, kaynak kodu bu oturumda görmedi; teknik ifadeler dokümanlara dayanır. Son doküman tarihi: 3 Ekim 2026. **Kod ile çelişen bir şey görürsen koda güven, kullanıcıya haber ver.**

## 1. Proje nedir
VELORA, kullanıcının (Arda) yürüttüğü web ajansı / dijital stüdyo markası. Ana fikir: "İşletmenizin dijital kapısını tasarlıyoruz." Hedef tasarım: sade, Apple'dan ilham alan (siyah/beyaz/gri, süssüz, güçlü tipografi), güven veren. Ziyaretçi, görüşmeden önce hizmeti ve sonraki adımı (paket seç, soru sor, iletişime geç) anlayabilmeli.

Kullanıcı ~3 yıllık sektör deneyimine sahip ve web sitesiyle ilişkili hizmetleri tek başına sunabileceğini söylüyor. VELORA web tasarımı/geliştirme hizmeti sunmayı HEDEFLİYOR (kuruluş tarihi, müşteri sayısı, ekip, ödül vb. yok — uydurma).

## 2. Teknik yapı
- Build aracı yok: statik HTML + CSS + vanilla JS (ES modülleri). GitHub Pages'te yayınlanıyor (kullanıcı v3.4 commit'ini push etmişti).
- Sayfalar: `index.html`, `calismalarimiz.html`, `hakkimizda.html`, `projenizi-anlatin.html`
- Klasörler: `css/` (main.css, responsive.css), `js/` (main.js, worksPage.js, staticPage.js, projectBriefPage.js, i18n.js, utils.js, icons.js), `components/` (header, packages, projects, faq, contact, search, questionForm, worksDetail, projectBriefForm…), `data/` (packages, projects, contact, site-config, faq, `i18n/`)
- **i18n (TR/EN/DE/FR/IT):** `data/i18n/{tr,en,de,fr,it}.js` aynı anahtar yapısında (referans: tr.js; son kayıt 240/240 eşleşme). Motor `js/i18n.js`: `t()`, `setLanguage()`, `onLanguageChange()`. Statik metinler `data-i18n*` öznitelikleriyle. Varsayılan TR, seçim `localStorage["velora-lang"]`. **Tek doğru içerik kaynağı i18n dosyaları** — `data/*.js` yalnızca id/icon/href gibi yapısal alanları tutar, eşleşme id/icon anahtarıyla (`packages.items.<id>` vb.).
- Yeni dinamik bileşende `onLanguageChange` dinleyicisi tek seferlik init içine kaydedilmeli (aksi halde dinleyici katlanır).
- Erişilebilirlik: popup'larda `trapFocus()` (utils.js), accordion'larda buton + aria-expanded/controls + role=region.
- `.section-invert` ile siyah/beyaz bölüm ritmi (renk değişkenleri ters döner — buton renklerine dikkat).
- Doğrulama yöntemi önceki oturumlarda: Playwright, çoklu breakpoint (1920–375), konsol hatası, taşma, 5 dil. Gerçek ekran okuyucu ve fiziksel cihaz testi YAPILMADI.

## 3. Sitenin bugünkü durumu (3 Ekim 2026)
- **Header:** menü (Ana Sayfa / Çalışmalarımız dropdown / Paketlerimiz / Hakkımızda / Projenizi Anlatın / Soru Sor / SSS / İletişim), arama, dil seçici. Çalışmalarımız dropdown: "Çalışmalarımızı görün" (ana sayfa bölümü) ve "Tüm çalışmalarımızı inceleyin" (calismalarimiz.html). Alt sayfalarda aktif sayfa `is-active` + `aria-current="page"`. Scroll-spy yeniden yazıldı.
- **Hero:** yalnızca `<h1>VELORA</h1>` + 3 buton (açıklama paragrafı bilinçli kaldırıldı).
- **Çalışmalarımız (ana sayfa):** slider, 7 DEMO proje. Otomatik oynatma yalnızca masaüstünde (>1024px), dokunmatik swipe var. Kartlar `calismalarimiz.html#<id>` derin linklerine gider.
- **calismalarimiz.html:** 7 proje bloğu, "KONSEPT PROJE" rozeti, her projede 3'lü bağımsız accordion, 4 sektör butonu (Kuaför, Güzellik & Tırnak, Hukuk, Mali Müşavirlik) native `disabled`.
- **Paketler:** 4 kart tek satırda (Tek Sayfa, Kurumsal, Özel Proje, "Kendi projenizi anlatın / Fiyat alın"). 4. kart popup açmaz, `projenizi-anlatin.html`'e gider, bilinçli olarak özellik listesi yok. Kurumsal butonu her zaman siyah/beyaz. Tablet 2×2, ≤640px tek sütun. Fiyat gösterilmiyor. Teslim süresi paketlerde **5 iş günü**. Diğer 3 paketin butonu pakete özel 7 kanallı (pasif) popup açar.
- **Hakkında (ana sayfa):** eyebrow + başlık ("Dijital dünyadaki ilk izleniminiz, bir kapıdır.") + "Hakkımızda daha fazla bilgi edinin" `.arrow-link`.
- **hakkimizda.html:** gerçek metin (lede + 3 blok: "Ne yapıyoruz" / "Tasarımda neye önem veriyoruz" / "İşletmenize katkımız"), koyu CTA bandı.
- **projenizi-anlatin.html:** proje anlatım formu (ad soyad*, e-posta*, işletme adı, işletme türü, ihtiyaç, mevcut site, açıklama* min 10 karakter, ek detaylar, çoklu dosya) + koyu bölüm (çalışmalara link + 9 iletişim kanalı).
- **Soru Sor / SSS:** 10 soru akordiyon. SSS'deki "3 iş günü" metni kullanıcı kararıyla BİLİNÇLİ olarak değiştirilmedi.
- **İletişim:** 9 kanal. LinkedIn/GitHub href'siz `<a role="link" aria-disabled="true">`, "Yakında eklenecek"; adresler `data/contact.js > socialProfileUrls` içinde doldurulunca otomatik aktifleşir.
- **Footer:** kısa menü + sosyal ikonlar + telif.

## 4. Kesinleşmiş kullanıcı kararları — GERİ ALMA
1. Hakkında bölümünde giriş paragrafları, vurgu cümlesi, kapanış bloğu ve 3 köşe taşı kullanıcı kararıyla kaldırıldı. Yeniden ekleme.
2. calismalarimiz.html'deki filtre açıklama cümlesi ve not (`works.detail.filter.lede/note`) kullanıcı tarafından elle kaldırıldı; i18n anahtarları duruyor ama kullanılmıyor. Geri ekleme.
3. Hero açıklaması kaldırıldı.
4. SSS ve Soru Sor içeriğine kullanıcı istemedikçe dokunma.
5. Marka adı ve proje adları (ör. "Lumen Kahve Dükkanı") hiçbir dilde çevrilmez; dil dropdown etiketleri kendi dilinde kalır; bütçe seçenekleri 5 dilde aynı.
6. Gerçek olmayan müşteri, sonuç, fiyat, süre, iletişim bilgisi, portfolyo, teknoloji kullanımı UYDURMA. Konseptler "konsept" diye etiketli kalır.
7. "Google'da ilk 5" gibi garanti edilemeyecek vaatler yazılmaz.
8. Kullanıcının istemediği özellik/vaat eklenmez; büyük teknoloji kararları ihtiyaç doğrulanmadan kesinleştirilmez; VELORA'yı kusursuzlaştırmak sahaya çıkmanın ön şartı değildir.
9. Kullanıcının kendi bilgisayarında elle yaptığı değişiklikleri ezme; çalışmaya başlamadan önce git durumuna bak.

## 5. Açık / eksik işler
**Yayın öncesi kritik**
- `data/contact.js`: e-posta (`info@velora.example`), telefon (`+90 (5xx) xxx xx xx`), WhatsApp/Instagram/Facebook/TikTok/Telegram hep placeholder, href `"#"`. Gerçek bilgiyle değiştirilmeli.
- **Soru Sor formu (`components/questionForm.js`) gönderimi `setTimeout` ile SİMÜLE** — sahte başarı mesajı gösterir, veri hiçbir yere gitmez. Kullanıcı henüz değiştirmek istemedi; gerçek müşteriyle önce kapatılmalı.
- `projenizi-anlatin` formu: `components/projectBriefForm.js > SUBMIT_ENDPOINT = ""` → ağ isteği yapmaz, "gönderilmedi" notu gösterir (dürüst davranış). Uç nokta seçilince multipart POST, başarı yalnızca 2xx'te. Dosya tür/boyut sınırı bilinçli olarak belirlenmedi.
- Paket popup'ındaki 7 kanal butonu pasif.
- LinkedIn/GitHub adresleri girilmemiş.

**Karar bekleyen**
- 7 demo projenin akıbeti (gerçek işle değiş mi, "konsept" etiketiyle mi kalsın).
- Tut/Değiştir/Çıkar/Sonra-yap sınıflandırması (Claude taslağı onay bekliyor; yukarıdaki §3–5 bu taslakla uyumlu).
- SSS "3 iş günü" ↔ paketler "5 iş günü" tutarsızlığı kullanıcı kararıyla duruyor; ileride netleşmeli.
- "projenizi-anlatin" sayfasında kullanıcı "ikinci bölümdeki SSS"ten söz etti; kodda böyle bir içerik bulunamadı (kullanıcıya raporlandı), netleşmedi.

**Teşhis edilemeyen**
- Kullanıcı canlı sitede "sayfa İngilizce açılıyor" gözlemini bildirdi; kodda tarayıcı dili algılaması yok (`DEFAULT_LANG="tr"`, yalnızca geçerli localStorage değeri farklı dile götürür). Canlı siteye erişilemedi. Olası nedenler: eski build/önbellek, localStorage'da "en", tarayıcının çeviri özelliği.

**Temizlik adayları**
- Kullanılmadığı doğrulanan dosyalar: `components/hizmetler.js`, `data/benefits.js`, `data/industries.js`, `js/scrollAnimations.js`, `js/theme.js` (git'te izleniyor, silinmedi; kullanıcı elle silecekti). `data/faq.js` kodda kullanılmıyor ama SSS içeriği olduğu için silinmedi, kullanıcı kararı bekliyor. `pages.placeholder` ve `works.detail.filter.*` i18n anahtarları artık kullanılmıyor.
- `VELORA_PROJECT_CONTEXT.md` repoda doküman olarak duruyor.
- Son oturumların (devam 3, devam 4) commit edilip edilmediği belgelerden anlaşılmıyor: önce `git status` bak.

## 6. İş stratejisi (yalnızca kullanıcının tek bir görev talimatından aktarıldı)
- Yol haritası: (1) mevcut iskeleti gerçek bilgiyle doldurup müşteriye gösterilebilir ilk sürüme ulaş, (2) gerçek iletişim bilgileri + sosyal hesaplarla sahaya çık, (3) 5 hedef alan için **"konsept" olarak etiketli** demo tasarımlar hazırla, (4) ilk müşteri arama yöntemi ve sektör bazlı mesajlar, (5) sonuçları izleyip sektör odağını güncelle.
- Test edilecek 5 alan (kalıcı uzmanlık seçilmedi): erkek/kadın kuaförleri, güzellik salonları ve tırnak stüdyoları, hukuk büroları, bağımsız avukatlar, mali müşavirler.
- Planlanan teklif: web sitesi, domain/hosting yardımı (SSS'de var), Google İşletme Profili kurulumu (sitede YOK, kapsam belirsiz), yayın sonrası değişiklik/destek (SSS'de var ama kapsam/süre belirsiz).
- Takip edilecek metrikler (sektör bazında, henüz araç yok): ulaşılan işletme, yanıt, görüşme, teklif, alınan iş, sık ihtiyaç ve itirazlar, tahmini iş yükü/teslimat uygunluğu.
- Açık sorular: demo formatı (mini-site mi, mockup mı), ilk erişim kanalı, Google İşletme Profili fiyatlandırması, destek kapsamı, "yapay zekâya tanımlı kod" ifadesinin anlamı (sitede kullanılmıyor), takip aracı seçimi.

## 7. Sıradaki en yakın adımlar
1. `git status` ve `git log` ile gerçek durumu doğrula; bu belgeyle karşılaştır.
2. Tut/Değiştir/Çıkar/Sonra-yap sınıflandırmasını kullanıcıyla netleştir.
3. Gerçek iletişim bilgilerini topla → `data/contact.js`.
4. Form gönderim altyapısını seç ve bağla (kullanıcı onayıyla).
5. Demo projeler ve sektör demoları için karar al.

## 8. Çalışma biçimi
- Kullanıcı Türkçe yazıyor; Türkçe yanıt ver.
- Her değişiklikten sonra `degisiklik-gunlugu-2.md` benzeri bir günlüğe, özellikle kullanıcının bilinçli tercihlerini ve "geri ekleme" uyarılarını kaydet.
- Doğrulanamayanı doğrulanmış gibi sunma; kapsam dışı bıraktığın şeyi açıkça yaz.
