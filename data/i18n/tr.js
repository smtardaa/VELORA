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
      contact: "İletişim"
    }
  },

  langSwitch: {
    ariaLabel: "Dil seçimi"
  },

  hero: {
    description:
      "İşletmenizi dijital dünyada daha görünür hale getiren sade ve etkili web deneyimleri.",
    cta: {
      packages: "Paketleri İncele",
      contact: "Hemen İletişime Geç",
      ask: "Projenizi Anlatın"
    }
  },

  works: {
    eyebrow: "Çalışmalarımız",
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
    }
  },

  packages: {
    eyebrow: "Paketlerimiz",
    heading: "İhtiyacınıza uygun paketler",
    lede: "Size en uygun paketi birlikte belirleyelim; net bir teklif için bize ulaşmanız yeterli.",
    deliveryNote: "Tüm paketlerde teslim süresi: 3 iş günü",
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
    intro: {
      p1: "VELORA, işletmelerin dijital dünyada nasıl göründüğünü, nasıl hissedildiğini ve nasıl keşfedildiğini tasarlamak için kuruldu.",
      p2: "Çünkü bugün bir müşterinin sizinle kurduğu ilk temas çoğu zaman fiziksel değil, dijitaldir. Bir arama sonucu, bir sosyal medya bağlantısı veya doğrudan web siteniz üzerinden gerçekleşir.",
      p3: "Biz bu ilk teması sıradan bir web sitesinden daha fazlası olarak görüyoruz.",
      statement: "İşletmenizin dijital kapısını tasarlıyoruz."
    },
    pillars: {
      simple: {
        title: "Sade olanı, etkili hale getiriyoruz.",
        body: "VELORA'da tasarımın daha fazla detay eklemekten değil, doğru olanı doğru yerde kullanmaktan geçtiğine inanıyoruz. Bu yüzden oluşturduğumuz web deneyimleri; gereksiz kalabalıktan uzak, anlaşılır, hızlı, mobil uyumlu ve işletmenin karakterini yansıtan bir yapıya sahip. Her bölümün bir amacı, her detayın bir nedeni olmalı."
      },
      experience: {
        title: "Tasarım ve teknoloji, tek bir deneyim.",
        body: "Bir web sitesinin yalnızca güzel görünmesi yeterli değil. İnsanların sizi birkaç saniye içinde anlayabilmesi, ihtiyaç duyduğu bilgiye kolayca ulaşabilmesi ve sizinle iletişime geçebilmesi gerekiyor. Bu nedenle tasarımı, kullanılabilirliği ve teknolojiyi birbirinden ayrı düşünmüyoruz. Ortaya yalnızca bir web sitesi değil, işletmenizin dijital dünyadaki yüzünü çıkarıyoruz."
      },
      growth: {
        title: "Büyümek isteyen işletmeler için.",
        body: "VELORA; markasını daha güçlü göstermek, dijital dünyada daha görünür olmak ve müşterileriyle daha iyi bir ilk temas kurmak isteyen işletmelerle çalışır. İster yeni bir dijital başlangıç yapıyor olun, ister mevcut web sitenizi yeniden düşünmek isteyin, amacımız aynı: işletmenizi doğru anlatan, güven veren ve insanları bir sonraki adıma taşıyan bir dijital deneyim oluşturmak."
      }
    },
    closing: {
      p1: "Çünkü iyi bir web sitesi sadece ziyaret edilmez.",
      statement: "Bir iz bırakır."
    }
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
    channels: {
      email: "E-posta",
      phone: "Telefon",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      tiktok: "TikTok",
      telegram: "Telegram"
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

  misc: {
    logoAlt: "VELORA logosu"
  }
};
