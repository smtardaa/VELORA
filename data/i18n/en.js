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
      contact: "Contact"
    }
  },

  langSwitch: {
    ariaLabel: "Language selection"
  },

  hero: {
    description:
      "Clean, effective web experiences that make your business more visible online.",
    cta: {
      packages: "Explore Packages",
      contact: "Get in Touch",
      ask: "Tell Us About Your Project"
    }
  },

  works: {
    eyebrow: "Our Work",
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
    }
  },

  packages: {
    eyebrow: "Packages",
    heading: "Packages that fit your needs",
    lede: "Let's figure out the right package together — just reach out and we'll put together a clear quote.",
    deliveryNote: "Delivery time for every package: 3 business days",
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
    pillars: {
      simple: {
        title: "We make simple, effective.",
        body: "At VELORA, we believe great design isn't about adding more detail — it's about using the right elements in the right place. That's why the web experiences we build skip the unnecessary clutter: clear, fast, mobile-friendly, and true to your business's character. Every section should have a purpose, and every detail a reason."
      },
      experience: {
        title: "Design and technology, one experience.",
        body: "A website isn't enough just to look good. People need to understand you within seconds, easily find the information they're looking for, and be able to reach you. That's why we never treat design, usability and technology as separate things. What we build isn't just a website — it's your business's face in the digital world."
      },
      growth: {
        title: "For businesses ready to grow.",
        body: "VELORA works with businesses that want to strengthen their brand, become more visible online, and make a better first impression with their customers. Whether you're starting fresh in the digital world or rethinking your existing website, our goal stays the same: to create a digital experience that tells your story accurately, builds trust, and moves people to take the next step."
      }
    }
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
    channels: {
      email: "Email",
      phone: "Phone",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      tiktok: "TikTok",
      telegram: "Telegram"
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

  misc: {
    logoAlt: "VELORA logo"
  }
};
