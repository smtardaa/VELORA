// data/i18n/tr.js — Türkçe (varsayılan dil). Diğer tüm dil dosyaları bu
// yapının birebir aynısını (aynı anahtarlar) taşımalıdır; js/i18n.js bir
// anahtar hedef dilde bulunamazsa buradaki (TR) değere geri döner.

export const tr = {
  meta: {
    title: "VELORA — Web Ajansı",
    description:
      "VELORA, markalar için sade, hızlı ve etkili web deneyimleri tasarlayan bir web ajansıdır."
  },

  skipLink: "İçeriğe geç",

  header: {
    brandAriaLabel: "VELORA ana sayfa",
    mainNavAriaLabel: "Ana menü",
    searchAriaLabel: "Sitede ara",
    menuToggleAriaLabel: "Menüyü aç/kapat",
    nav: {
      home: "Ana Sayfa",
      works: "Çalışmalarımız",
      packages: "Paketlerimiz",
      about: "Hakkımızda",
      ask: "Soru Sor",
      faq: "SSS",
      contact: "İletişim",
      projectBrief: "Projenizi Anlatın"
    },
    // Header'daki "Çalışmalarımız" artık bir dropdown; iki seçeneğin metni.
    worksDropdown: {
      viewHomeSection: "Çalışmalarımızı görün",
      viewAll: "Tüm çalışmalarımızı inceleyin"
    }
  },

  langSwitch: {
    ariaLabel: "Dil seçimi"
  },

  hero: {
    cta: {
      packages: "Paketleri İncele",
      contact: "Hemen İletişime Geç",
      ask: "Projenizi Anlatın"
    }
  },

  works: {
    eyebrow: "Çalışmalarımız",
    // Ana sayfadaki Çalışmalarımız bölümünün eyebrow'u altında gösterilen,
    // calismalarimiz.html'e giden bağlantı (header dropdown'undaki aynı
    // isimli seçenekten bilinçli olarak ayrı bir anahtardır).
    viewAllLink: "Tüm çalışmalarımızı inceleyin",
    heading: "Örnek çalışmalarımızdan bazıları",
    lede: "Farklı sektörlerden markalar için tasarladığımız web sitelerinden birkaç örnek.",
    prevAriaLabel: "Önceki çalışma",
    nextAriaLabel: "Sonraki çalışma",
    viewProject: "Projeyi İncele",
    projectAriaLabel: "{name} projesini incele",
    categories: {
      "velora-kurumsal": "Kurumsal Web Sitesi",
      "lumen-kahve": "Restoran & Menü",
      "atlas-hukuk": "Kurumsal Web Sitesi",
      "fitcore-studyo": "Fitness & Spor",
      "vera-klinik": "Sağlık & Klinik",
      "marka-vitrin": "E-Ticaret",
      "ada-mimarlik": "Kişisel Portfolyo"
    },
    // calismalarimiz.html (ayrı Çalışmalarımız sayfası) için içerik.
    // Buradaki her şey KONSEPT/DEMO amaçlıdır: description/benefits/techNote
    // gerçek bir müşteri işini, doğrulanmış sonucu veya fiilen kullanılmış
    // teknolojiyi temsil etmez — techNote alanları bilinçli olarak "önerilen
    // yaklaşım" diliyle yazılmıştır. pricingNote, data/packages.js >
    // sharedDeliveryNote ile aynı gerçek teslim süresine (5 iş günü) atıfta
    // bulunur; proje bazlı uydurma fiyat/süre eklenmemiştir.
    detail: {
      metaTitle: "VELORA — Çalışmalarımız",
      metaDescription:
        "VELORA'nın farklı sektörler için hazırladığı konsept web sitesi çalışmalarını inceleyin.",
      pageHeading: "Tüm çalışmalarımızı inceleyin",
      pageLede:
        "Farklı sektörler için hazırladığımız konsept çalışmaları aşağıda bulabilirsiniz. Her biri, VELORA'nın tasarım yaklaşımını göstermek amacıyla hazırlanmış bir konsept/demo projesidir; gerçek bir müşteri işini veya doğrulanmış sonucu temsil etmez.",
      conceptBadge: "Konsept Proje",
      labels: {
        description: "Proje açıklaması",
        benefitsTech: "Faydalar ve kullanılan teknolojiler",
        pricing: "Fiyatlandırma ve süre hakkında bilgi"
      },
      pricingNote:
        "Fiyat ve teslim süresi, kapsam netleştikten sonra size özel olarak belirlenir. Referans olarak paketlerimizde standart teslim süresi 5 iş günüdür; net bir teklif için bizimle iletişime geçmeniz yeterli.",
      filter: {
        heading: "Kendinize uygun siteyi bulup inceleyin",
        lede: "Aşağıdaki alan, ileride sektöre göre filtreleme yapılabileceğini gösteren bir tasarım örneğidir; şu an herhangi bir seçim yapmaz ve çalışma listesini filtrelemez.",
        options: {
          hairdresser: "Kuaför",
          beauty: "Güzellik & Tırnak",
          legal: "Hukuk",
          accounting: "Mali Müşavirlik"
        },
        note: "Bu alan yalnızca bir tasarım örneğidir; seçenekler devre dışıdır."
      },
      items: {
        "velora-kurumsal": {
          description:
            "VELORA'nın kendi kurumsal kimliğini yansıtan, hizmetlerini ve paketlerini net biçimde anlatan bir web sitesi konsepti.",
          benefits: [
            "Sade ve güven veren kurumsal görünüm",
            "Hizmetlerin ve paketlerin anlaşılır sunumu",
            "Mobil uyumlu, hızlı yüklenen yapı"
          ],
          techNote:
            "Bu konsept için önerilen yaklaşım: ek bağımlılık gerektirmeyen, sade HTML/CSS/JS tabanlı hızlı bir yapı."
        },
        "lumen-kahve": {
          description:
            "Bir kahve dükkanının menüsünü ve atmosferini ön plana çıkaran, ziyaretçiyi mekâna davet eden bir konsept.",
          benefits: [
            "Menünün kolayca güncellenebileceği düzenli bir yapı",
            "Mekânın atmosferini yansıtan sade görsel dil",
            "Konum ve çalışma saatlerinin öne çıkması"
          ],
          techNote:
            "Bu konsept için önerilen yaklaşım: görsellerin hızlı yüklenmesine uygun, mobil öncelikli sade bir yapı."
        },
        "atlas-hukuk": {
          description:
            "Bir hukuk bürosunun uzmanlık alanlarını ve kurumsal duruşunu güven veren bir dille anlatan konsept.",
          benefits: [
            "Kurumsal ve güven veren bir ilk izlenim",
            "Uzmanlık alanlarının net biçimde listelenmesi",
            "İletişime geçmeyi kolaylaştıran net yönlendirmeler"
          ],
          techNote: "Bu konsept için önerilen yaklaşım: sade, dikkat dağıtmayan, kurumsal bir tasarım dili."
        },
        "fitcore-studyo": {
          description: "Bir spor stüdyosunun ders programını ve enerjisini yansıtan, sade ve hareketli bir konsept.",
          benefits: [
            "Ders programının/hizmetlerin net biçimde sunulması",
            "Enerjik ama dağınık olmayan bir görsel dil",
            "Mobil cihazlardan kolay iletişim yönlendirmesi"
          ],
          techNote: "Bu konsept için önerilen yaklaşım: hızlı yüklenen, mobil öncelikli bir yapı."
        },
        "vera-klinik": {
          description: "Bir sağlık/klinik işletmesi için güven veren, sakin ve bilgilendirici bir konsept.",
          benefits: [
            "Hizmetlerin sakin ve güven veren bir dille anlatılması",
            "İletişim adımının kolay bulunması",
            "Sık sorulan soruların öne çıkarılabilmesi"
          ],
          techNote: "Bu konsept için önerilen yaklaşım: okunabilirliği önceliklendiren, sade bir tasarım dili."
        },
        "marka-vitrin": {
          description:
            "Bir markanın ürünlerini sade bir vitrin mantığıyla sergileyen bir e-ticaret görünümü konsepti (uçtan uca satın alma altyapısı bu konsept kapsamında değildir).",
          benefits: [
            "Ürünlerin net ve sade biçimde sergilenmesi",
            "Kategoriler arasında kolay gezinme",
            "Markanın kendi karakterini yansıtan bir görsel dil"
          ],
          techNote:
            "Bu konsept için önerilen yaklaşım: temel bir ürün vitrini için sade ve genişletilebilir bir yapı."
        },
        "ada-mimarlik": {
          description: "Bir mimarlık ofisinin proje portfolyosunu sade ve görsel odaklı biçimde sunan bir konsept.",
          benefits: [
            "Projelerin sade ve görsel odaklı biçimde sunulması",
            "Portfolyonun kolayca güncellenebileceği bir yapı",
            "Kurumsal ama kişisel bir ton"
          ],
          techNote: "Bu konsept için önerilen yaklaşım: görsellerin öne çıktığı, sade bir galeri/portfolyo düzeni."
        }
      }
    }
  },

  packages: {
    eyebrow: "Paketlerimiz",
    heading: "İhtiyacınıza uygun paketler",
    lede: "Size en uygun paketi birlikte belirleyelim; net bir teklif için bize ulaşmanız yeterli.",
    deliveryNote: "Tüm paketlerde teslim süresi: 5 iş günü",
    prevAriaLabel: "Önceki paketler",
    nextAriaLabel: "Sonraki paketler",
    dotAriaLabel: "Paket grubu {n}",
    items: {
      "tek-sayfa": {
        name: "Tek Sayfa",
        description: "Tek bir sayfada markanızı ve hizmetlerinizi net şekilde anlatan sade site.",
        features: ["Tek sayfa özel tasarım", "Tam responsive yapı", "Temel SEO ayarları"],
        cta: "İletişime Geç"
      },
      kurumsal: {
        name: "Kurumsal",
        description: "Çok sayfalı, kurumsal kimliğinizi yansıtan profesyonel web sitesi.",
        features: ["5 sayfaya kadar özel tasarım", "Gelişmiş SEO yapılandırması", "Kolay içerik güncelleme"],
        cta: "İletişime Geç"
      },
      "ozel-proje": {
        name: "Özel Proje",
        description: "Kapsamı size özel planlanan, esnek ve genişletilebilir çözüm.",
        features: ["İhtiyaca özel kapsam", "Esnek sayfa/özellik seçimi", "Öncelikli danışmanlık"],
        cta: "İletişime Geç"
      },
      // Sabit fiyat/kapsamlı bir paket DEĞİLDİR; kasıtlı olarak "features"
      // listesi yoktur (bkz. components/packages.js > renderCard) ve
      // butonu popup açmak yerine proje anlatım sayfasına
      // (projenizi-anlatin.html) bağlanır.
      "proje-anlatin": {
        name: "Kendi projenizi anlatın / Fiyat alın",
        description: "Projenizin kapsamını paylaşın, size uygun çözümü ve fiyatı birlikte belirleyelim.",
        cta: "Hemen anlatın"
      }
    }
  },

  packageModal: {
    titleTemplate: "Şu an {package} bir tasarım için iletişime geçeceksiniz.",
    closeAriaLabel: "Popup'ı kapat"
  },

  about: {
    eyebrow: "VELORA",
    headline: "Dijital dünyadaki ilk izleniminiz, bir kapıdır.",
    // Hakkımızda bölümünün altındaki, hakkimizda.html'e giden bağlantı.
    moreLink: "Hakkımızda daha fazla bilgi edinin"
  },

  form: {
    eyebrow: "Soru Sor",
    heading: "Aklınıza takılan bir şey mi var?",
    lede: "Hesap oluşturmanıza gerek yok. Sorunuzu yazın, size dönüş yapalım.",
    optionalTag: "(opsiyonel)",
    labels: {
      firstName: "Ad",
      lastName: "Soyad",
      email: "E-posta",
      company: "Şirket / Marka",
      previousSite: "Varsa Önceki Web Sitesinin Bağlantısı",
      budget: "Bütçe",
      needs: "İhtiyacınız ve İstekleriniz",
      needsOther: "İhtiyacınızı kısaca anlatın",
      question: "Sorunuz"
    },
    placeholders: {
      previousSite: "https://..."
    },
    selectPlaceholder: "Seçiniz",
    budgetOptions: ["$500 – $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000+"],
    needsOptions: {
      newSite: "Yeni web sitesi",
      renewal: "Mevcut web sitesini yenileme",
      mobile: "Mobil uyumlu tasarım",
      ecommerce: "E-ticaret",
      branding: "Marka / kurumsal görünüm",
      other: "Diğer"
    },
    submit: "Soruyu Gönder",
    submitting: "Gönderiliyor...",
    feedback: {
      success: "Teşekkürler! Sorunuz alındı, en kısa sürede size dönüş yapacağız.",
      error: "Lütfen işaretli alanları kontrol edin."
    },
    errors: {
      firstNameRequired: "Adınızı girin.",
      lastNameRequired: "Soyadınızı girin.",
      emailRequired: "E-posta adresinizi girin.",
      emailInvalid: "Geçerli bir e-posta adresi girin.",
      questionRequired: "Sorunuzu yazın.",
      questionTooShort: "Sorunuzu biraz daha detaylandırır mısınız? (en az 10 karakter)"
    }
  },

  faq: {
    eyebrow: "SSS",
    heading: "Sıkça sorulan sorular",
    items: [
      {
        question: "Bir web sitesi ne kadar sürede hazırlanır?",
        answer:
          "Proje kapsamına göre değişmekle birlikte, çoğu projeyi 3 iş günü içinde teslim ediyoruz. Daha kapsamlı özel projelerde süreci sizinle birlikte planlarız."
      },
      {
        question: "Web sitesi fiyatına neler dahil?",
        answer:
          "Fiyata tasarım, geliştirme, temel SEO ayarları ve tam responsive (mobil uyumlu) yapı dahildir. Kapsam, seçtiğiniz pakete ve ihtiyaçlarınıza göre netleşir."
      },
      {
        question: "Web sitem mobil telefon ve tabletlerde uyumlu olacak mı?",
        answer:
          "Evet. Tüm sitelerimiz; telefon, tablet ve masaüstü dahil her ekran boyutunda düzgün görünecek şekilde tam responsive olarak tasarlanır."
      },
      {
        question: "Web sitemi daha sonra kendim güncelleyebilir miyim?",
        answer:
          "Evet, siteniz içerik güncellemelerini kolaylaştıran düzenli bir yapıyla teslim edilir. Dilerseniz güncellemeleri sizin adınıza da yapabiliriz."
      },
      {
        question: "Mevcut web sitemi yenileyebilir misiniz?",
        answer:
          "Elbette. Mevcut sitenizi inceleyip daha modern, hızlı ve sade bir tasarımla yeniden hayata geçiriyoruz; talep etmeniz halinde mevcut içerikleriniz korunur."
      },
      {
        question: "Domain ve hosting konusunda yardımcı oluyor musunuz?",
        answer:
          "Domain ve hosting süreçlerinde size rehberlik ediyoruz; mevcut bir alan adınız veya hostinginiz varsa doğrudan onunla da ilerleyebiliriz."
      },
      {
        question: "Web sitem Google'da görünmesi için SEO yapılacak mı?",
        answer:
          "Evet, her sitede arama motorlarında daha görünür olmanızı sağlayan temel SEO ayarları (başlıklar, meta açıklamalar, site hızı vb.) standart olarak uygulanır."
      },
      {
        question: "Proje sürecinde tasarım üzerinde değişiklik veya revizyon isteyebilir miyim?",
        answer: "Kesinlikle. Tasarım sürecinin her aşamasında geri bildirimlerinizi alır, siteyi sizinle birlikte şekillendiririz."
      },
      {
        question: "Web sitesi için içerik ve görselleri benim mi sağlamam gerekiyor?",
        answer:
          "Kendi metin ve görsellerinizi sağlayabilirsiniz; hazır içeriğiniz yoksa projenize uygun yer tutucu içerik ve görsellerle de başlayabiliriz."
      },
      {
        question: "Web sitesi teslim edildikten sonra destek sağlıyor musunuz?",
        answer: "Evet, teslim sonrasında ortaya çıkabilecek teknik konular için destek sağlıyoruz. Kapsam ve süre paketinize göre değişebilir."
      }
    ]
  },

  contact: {
    eyebrow: "İletişim",
    heading: "Bize ulaşın",
    // Gerçek LinkedIn/GitHub bağlantıları eklenene kadar bu iki kanal
    // pasif (tıklanamaz) gösterilir; bkz. components/contact.js ve
    // data/contact.js.
    pendingLabel: "Yakında eklenecek",
    channels: {
      email: "E-posta",
      phone: "Telefon",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      tiktok: "TikTok",
      telegram: "Telegram",
      linkedin: "LinkedIn",
      github: "GitHub"
    }
  },

  footer: {
    altMenuAriaLabel: "Alt menü",
    links: {
      home: "Ana Sayfa",
      packages: "Paketler",
      works: "Çalışmalarımız",
      about: "Hakkımızda",
      contact: "İletişim",
      faq: "SSS",
      ask: "Soru Sorma"
    },
    rightsReserved: "Tüm hakları saklıdır."
  },

  search: {
    dialogAriaLabel: "Site içi arama",
    inputAriaLabel: "Arama",
    placeholder: "Paket veya soru arayın...",
    closeAriaLabel: "Aramayı kapat",
    hint: "Paketler ve SSS içinde arama yapabilirsiniz.",
    noResults: '"{query}" için sonuç bulunamadı.',
    tags: {
      package: "Paket",
      faq: "SSS"
    }
  },

  // Ayrı sayfalar (hakkimizda.html, projenizi-anlatin.html) için içerik.
  // Şimdilik yalnızca başlık + nötr bir içerik iskeleti vardır; gerçek
  // içerik geldiğinde ilgili metinler buradan (ve diğer 4 dilde aynı
  // anahtarlardan) güncellenmelidir. Doğrulanmamış bilgi eklenmedi.
  pages: {
    placeholder: "Bu bölümün içeriği yakında eklenecek.",
    about: {
      metaTitle: "VELORA — Hakkımızda",
      metaDescription: "VELORA hakkında daha fazla bilgi edinin.",
      eyebrow: "Hakkımızda",
      heading: "VELORA hakkında",
      lede: "Bu sayfa, VELORA hakkında daha ayrıntılı bilgileri paylaşmak için hazırlanıyor. İçerik yakında eklenecek.",
      sections: {
        who: "Biz kimiz",
        approach: "Nasıl çalışıyoruz",
        values: "Neye önem veriyoruz"
      },
      ctaHeading: "Sorularınız mı var?",
      ctaLede: "Bize iletişim kanallarımızdan veya Soru Sor formundan ulaşabilirsiniz.",
      ctaContact: "İletişime geçin",
      ctaPackages: "Paketleri inceleyin"
    },
    projectBrief: {
      metaTitle: "VELORA — Projenizi Anlatın",
      metaDescription: "Projenizi VELORA ile paylaşın.",
      eyebrow: "Projenizi Anlatın",
      heading: "Projenizi anlatın",
      lede: "Projenizin ayrıntılarını paylaşabileceğiniz bu sayfa hazırlanıyor. Bu arada Soru Sor formundan veya iletişim kanallarımızdan bize ulaşabilirsiniz.",
      sections: {
        project: "Projeniz hakkında",
        goals: "Hedefleriniz ve ihtiyaçlarınız",
        scope: "Kapsam ve zamanlama"
      },
      ctaHeading: "Projenizi şimdi paylaşmak ister misiniz?",
      ctaLede: "Soru Sor formunu kullanabilir ya da iletişim kanallarımızdan bize yazabilirsiniz.",
      ctaAsk: "Soru Sor formuna gidin",
      ctaContact: "İletişim kanalları"
    }
  },

  misc: {
    logoAlt: "VELORA logosu"
  }
};
