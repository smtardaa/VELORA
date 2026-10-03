// data/i18n/en.js — English. Same key structure as tr.js.

export const en = {
  meta: {
    title: "VELORA — Web Agency",
    description:
      "VELORA is a web agency crafting clean, fast and effective web experiences for brands."
  },

  skipLink: "Skip to content",

  header: {
    brandAriaLabel: "VELORA home",
    mainNavAriaLabel: "Main menu",
    searchAriaLabel: "Search the site",
    menuToggleAriaLabel: "Open/close menu",
    nav: {
      home: "Home",
      works: "Our Work",
      packages: "Packages",
      about: "About",
      ask: "Ask a Question",
      faq: "FAQ",
      contact: "Contact",
      projectBrief: "Tell Us About Your Project"
    },
    worksDropdown: {
      viewHomeSection: "See Our Work",
      viewAll: "Explore All of Our Work"
    }
  },

  langSwitch: {
    ariaLabel: "Language selection"
  },

  hero: {
    cta: {
      packages: "Explore Packages",
      contact: "Get in Touch",
      ask: "Tell Us About Your Project"
    }
  },

  works: {
    eyebrow: "Our Work",
    viewAllLink: "Explore all of our work",
    heading: "A few of our recent projects",
    lede: "A selection of websites we've designed for brands across different industries.",
    prevAriaLabel: "Previous project",
    nextAriaLabel: "Next project",
    viewProject: "View Project",
    projectAriaLabel: "View the {name} project",
    categories: {
      "velora-kurumsal": "Corporate Website",
      "lumen-kahve": "Restaurant & Menu",
      "atlas-hukuk": "Corporate Website",
      "fitcore-studyo": "Fitness & Sports",
      "vera-klinik": "Health & Clinic",
      "marka-vitrin": "E-Commerce",
      "ada-mimarlik": "Personal Portfolio"
    },
    detail: {
      metaTitle: "VELORA — Our Work",
      metaDescription: "Explore the concept website projects VELORA has designed for different industries.",
      pageHeading: "Explore all of our work",
      pageLede:
        "Below you'll find the concept projects we've put together for different industries. Each one is a concept/demo project created to showcase VELORA's design approach; it does not represent actual client work or a verified result.",
      conceptBadge: "Concept Project",
      labels: {
        description: "Project description",
        benefitsTech: "Benefits and technologies used",
        pricing: "Pricing and timeline information"
      },
      pricingNote:
        "Pricing and timeline are worked out for you once the scope is clear. As a reference, the standard delivery time across our packages is 5 business days — just get in touch for a clear quote.",
      filter: {
        heading: "Find and explore the site that suits you",
        lede: "The area below is a design example showing how filtering by industry could work in the future; it doesn't currently make any selection and doesn't filter the list of work.",
        options: {
          hairdresser: "Hairdresser",
          beauty: "Beauty & Nails",
          legal: "Legal",
          accounting: "Accounting & Finance"
        },
        note: "This area is only a design example; the options are disabled."
      },
      items: {
        "velora-kurumsal": {
          description:
            "A website concept that reflects VELORA's own corporate identity and clearly presents its services and packages.",
          benefits: [
            "A clean, trustworthy corporate look",
            "Clear presentation of services and packages",
            "Mobile-friendly, fast-loading structure"
          ],
          techNote: "Recommended approach for this concept: a fast, dependency-free structure built with plain HTML/CSS/JS."
        },
        "lumen-kahve": {
          description:
            "A concept that puts a coffee shop's menu and atmosphere front and center, inviting visitors straight into the space.",
          benefits: [
            "An organized structure that makes the menu easy to update",
            "A clean visual language that reflects the venue's atmosphere",
            "Location and opening hours front and center"
          ],
          techNote: "Recommended approach for this concept: a simple, mobile-first structure built for fast image loading."
        },
        "atlas-hukuk": {
          description: "A concept that presents a law firm's areas of expertise and corporate standing in a trustworthy voice.",
          benefits: [
            "A corporate, trust-building first impression",
            "Clear listing of areas of expertise",
            "Clear calls to action that make it easy to get in touch"
          ],
          techNote: "Recommended approach for this concept: a clean, distraction-free, corporate design language."
        },
        "fitcore-studyo": {
          description: "A concept that reflects a fitness studio's class schedule and energy in a simple, dynamic way.",
          benefits: [
            "Clear presentation of the class schedule/services",
            "An energetic visual language that stays uncluttered",
            "Easy contact from mobile devices"
          ],
          techNote: "Recommended approach for this concept: a fast-loading, mobile-first structure."
        },
        "vera-klinik": {
          description: "A calm, informative, trust-building concept for a health/clinic business.",
          benefits: [
            "Services explained in a calm, trustworthy voice",
            "An easy-to-find contact step",
            "Frequently asked questions given a clear place"
          ],
          techNote: "Recommended approach for this concept: a clean design language that prioritizes readability."
        },
        "marka-vitrin": {
          description:
            "An e-commerce concept that showcases a brand's products with a simple, storefront-style approach (a full checkout/payment system is outside the scope of this concept).",
          benefits: [
            "Clear, simple product showcase",
            "Easy navigation between categories",
            "A visual language that reflects the brand's own character"
          ],
          techNote: "Recommended approach for this concept: a simple, extensible structure for a basic product showcase."
        },
        "ada-mimarlik": {
          description: "A concept that presents an architecture office's project portfolio in a clean, visual-first way.",
          benefits: [
            "Clean, visual-first presentation of projects",
            "A structure that's easy to keep up to date",
            "A tone that's corporate yet personal"
          ],
          techNote: "Recommended approach for this concept: a clean gallery/portfolio layout that lets the visuals lead."
        }
      }
    }
  },

  packages: {
    eyebrow: "Packages",
    heading: "Packages that fit your needs",
    lede: "Let's figure out the right package together — just reach out and we'll put together a clear quote.",
    deliveryNote: "Delivery time for every package: 5 business days",
    prevAriaLabel: "Previous packages",
    nextAriaLabel: "Next packages",
    dotAriaLabel: "Package group {n}",
    items: {
      "tek-sayfa": {
        name: "Single Page",
        description: "A clean, single-page site that clearly presents your brand and services.",
        features: ["Custom single-page design", "Fully responsive layout", "Essential SEO setup"],
        cta: "Get in Touch"
      },
      kurumsal: {
        name: "Corporate",
        description: "A multi-page, professional website that reflects your corporate identity.",
        features: ["Custom design for up to 5 pages", "Advanced SEO configuration", "Easy content updates"],
        cta: "Get in Touch"
      },
      "ozel-proje": {
        name: "Custom Project",
        description: "A flexible, scalable solution planned around your specific scope.",
        features: ["Scope tailored to your needs", "Flexible pages & features", "Priority consulting"],
        cta: "Get in Touch"
      },
      "proje-anlatin": {
        name: "Tell Us About Your Project / Get a Quote",
        description: "Share your project's scope and let's work out the right solution and price together.",
        cta: "Tell Us Now"
      }
    }
  },

  packageModal: {
    titleTemplate: "You're about to get in touch about a {package} design.",
    closeAriaLabel: "Close popup"
  },

  about: {
    eyebrow: "VELORA",
    headline: "Your first impression in the digital world is a doorway.",
    moreLink: "Learn more about us"
  },

  form: {
    eyebrow: "Ask a Question",
    heading: "Have something on your mind?",
    lede: "No account needed. Just write your question and we'll get back to you.",
    optionalTag: "(optional)",
    labels: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      company: "Company / Brand",
      previousSite: "Link to Your Current Website (if any)",
      budget: "Budget",
      needs: "Your Needs & Goals",
      needsOther: "Briefly describe your needs",
      question: "Your Question"
    },
    placeholders: {
      previousSite: "https://..."
    },
    selectPlaceholder: "Select",
    budgetOptions: ["$500 – $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000+"],
    needsOptions: {
      newSite: "New website",
      renewal: "Refresh an existing website",
      mobile: "Mobile-friendly design",
      ecommerce: "E-commerce",
      branding: "Branding / corporate look",
      other: "Other"
    },
    submit: "Send Question",
    submitting: "Sending...",
    feedback: {
      success: "Thank you! We've received your question and will get back to you shortly.",
      error: "Please check the highlighted fields."
    },
    errors: {
      firstNameRequired: "Please enter your first name.",
      lastNameRequired: "Please enter your last name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      questionRequired: "Please write your question.",
      questionTooShort: "Could you add a bit more detail? (at least 10 characters)"
    }
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Frequently asked questions",
    items: [
      {
        question: "How long does it take to build a website?",
        answer:
          "It depends on the scope, but we aim to deliver most projects within 3 business days. For larger custom projects, we plan the timeline together with you."
      },
      {
        question: "What's included in the price of a website?",
        answer:
          "The price includes design, development, essential SEO setup and a fully responsive layout. The exact scope depends on the package and your specific needs."
      },
      {
        question: "Will my website work well on phones and tablets?",
        answer:
          "Yes. All of our websites are fully responsive, so they look great on phones, tablets and desktops alike."
      },
      {
        question: "Can I update my website myself afterwards?",
        answer:
          "Yes, your website is delivered with a clean structure that makes content updates easy. We're also happy to handle updates on your behalf."
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "Absolutely. We review your current site and rebuild it with a modern, fast and clean design; your existing content can be kept if you'd like."
      },
      {
        question: "Do you help with domain and hosting?",
        answer:
          "We guide you through the domain and hosting process; if you already have one, we can work directly with it."
      },
      {
        question: "Will my website be optimized for Google (SEO)?",
        answer:
          "Yes, every website includes essential SEO setup (titles, meta descriptions, site speed and more) to help it get found on search engines."
      },
      {
        question: "Can I request changes or revisions during the project?",
        answer: "Absolutely. We gather your feedback at every stage of the design process and shape the site together with you."
      },
      {
        question: "Do I need to provide the content and images for my website?",
        answer:
          "You can provide your own text and images; if you don't have any ready, we can start with placeholder content and visuals suited to your project."
      },
      {
        question: "Do you offer support after the website is delivered?",
        answer: "Yes, we provide support for technical issues that come up after delivery. Scope and duration can vary depending on your package."
      }
    ]
  },

  contact: {
    eyebrow: "Contact",
    heading: "Get in touch",
    pendingLabel: "Coming soon",
    channels: {
      email: "Email",
      phone: "Phone",
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
    altMenuAriaLabel: "Footer menu",
    links: {
      home: "Home",
      packages: "Packages",
      works: "Our Work",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
      ask: "Ask a Question"
    },
    rightsReserved: "All rights reserved."
  },

  search: {
    dialogAriaLabel: "Site search",
    inputAriaLabel: "Search",
    placeholder: "Search packages or questions...",
    closeAriaLabel: "Close search",
    hint: "You can search across packages and FAQ.",
    noResults: 'No results found for "{query}".',
    tags: {
      package: "Package",
      faq: "FAQ"
    }
  },

  pages: {
    placeholder: "Content for this section will be added soon.",
    about: {
      metaTitle: "VELORA — About Us",
      metaDescription: "Learn more about VELORA.",
      eyebrow: "About Us",
      heading: "About VELORA",
      lede: "This page is being prepared to share more detailed information about VELORA. Content will be added soon.",
      sections: {
        who: "Who we are",
        approach: "How we work",
        values: "What we care about"
      },
      ctaHeading: "Have a question?",
      ctaLede: "You can reach us through our contact channels or the Ask a Question form.",
      ctaContact: "Get in touch",
      ctaPackages: "View packages"
    },
    projectBrief: {
      metaTitle: "VELORA — Tell Us About Your Project",
      metaDescription: "Share your project with VELORA.",
      eyebrow: "Tell Us About Your Project",
      heading: "Tell us about your project",
      lede: "This page, where you will be able to share the details of your project, is being prepared. In the meantime, you can reach us through the Ask a Question form or our contact channels.",
      sections: {
        project: "About your project",
        goals: "Your goals and needs",
        scope: "Scope and timing"
      },
      ctaHeading: "Would you like to share your project now?",
      ctaLede: "You can use the Ask a Question form or write to us through our contact channels.",
      ctaAsk: "Go to the question form",
      ctaContact: "Contact channels"
    }
  },

  misc: {
    logoAlt: "VELORA logo"
  }
};
