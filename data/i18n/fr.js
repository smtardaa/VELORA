// data/i18n/fr.js — Français. Même structure de clés que tr.js.

export const fr = {
  meta: {
    title: "VELORA — Agence Web",
    description:
      "VELORA est une agence web qui conçoit des expériences web sobres, rapides et efficaces pour les marques."
  },

  skipLink: "Aller au contenu",

  header: {
    brandAriaLabel: "Accueil VELORA",
    mainNavAriaLabel: "Menu principal",
    searchAriaLabel: "Rechercher sur le site",
    menuToggleAriaLabel: "Ouvrir/fermer le menu",
    nav: {
      home: "Accueil",
      works: "Nos réalisations",
      packages: "Nos offres",
      about: "À propos",
      ask: "Poser une question",
      faq: "FAQ",
      contact: "Contact"
    }
  },

  langSwitch: {
    ariaLabel: "Choix de la langue"
  },

  hero: {
    description:
      "Des expériences web sobres et efficaces qui rendent votre entreprise plus visible en ligne.",
    cta: {
      packages: "Découvrir nos offres",
      contact: "Contactez-nous",
      ask: "Parlez-nous de votre projet"
    }
  },

  works: {
    eyebrow: "Nos réalisations",
    heading: "Quelques-uns de nos projets récents",
    lede: "Une sélection de sites que nous avons conçus pour des marques de secteurs variés.",
    prevAriaLabel: "Projet précédent",
    nextAriaLabel: "Projet suivant",
    viewProject: "Découvrir le projet",
    projectAriaLabel: "Découvrir le projet {name}",
    categories: {
      "velora-kurumsal": "Site institutionnel",
      "lumen-kahve": "Restaurant & Menu",
      "atlas-hukuk": "Site institutionnel",
      "fitcore-studyo": "Fitness & Sport",
      "vera-klinik": "Santé & Clinique",
      "marka-vitrin": "E-commerce",
      "ada-mimarlik": "Portfolio personnel"
    }
  },

  packages: {
    eyebrow: "Nos offres",
    heading: "Des offres adaptées à vos besoins",
    lede: "Définissons ensemble l'offre la plus adaptée ; contactez-nous et nous vous proposerons un devis clair.",
    deliveryNote: "Délai de livraison pour toutes les offres : 3 jours ouvrés",
    prevAriaLabel: "Offres précédentes",
    nextAriaLabel: "Offres suivantes",
    dotAriaLabel: "Groupe d'offres {n}",
    items: {
      "tek-sayfa": {
        name: "Page unique",
        description: "Un site sobre en une seule page qui présente clairement votre marque et vos services.",
        features: ["Design sur mesure en une page", "Mise en page entièrement responsive", "Configuration SEO essentielle"],
        cta: "Nous contacter"
      },
      kurumsal: {
        name: "Institutionnel",
        description: "Un site professionnel multi-pages qui reflète votre identité d'entreprise.",
        features: ["Design sur mesure jusqu'à 5 pages", "Configuration SEO avancée", "Mise à jour de contenu facile"],
        cta: "Nous contacter"
      },
      "ozel-proje": {
        name: "Projet sur mesure",
        description: "Une solution flexible et évolutive, dont le périmètre est pensé spécialement pour vous.",
        features: ["Périmètre adapté à vos besoins", "Pages et fonctionnalités flexibles", "Accompagnement prioritaire"],
        cta: "Nous contacter"
      }
    }
  },

  packageModal: {
    titleTemplate: "Vous êtes sur le point de nous contacter pour un design {package}.",
    closeAriaLabel: "Fermer la fenêtre"
  },

  about: {
    eyebrow: "VELORA",
    headline: "Votre première impression dans le monde numérique est une porte.",
    intro: {
      p1: "VELORA a été fondée pour concevoir la façon dont les entreprises apparaissent, se ressentent et se font découvrir dans le monde numérique.",
      p2: "Car aujourd'hui, le premier contact d'un client avec vous est rarement physique — il passe par un résultat de recherche, un lien sur les réseaux sociaux ou votre propre site web.",
      p3: "Nous considérons ce premier contact comme bien plus qu'un site web ordinaire.",
      statement: "Nous concevons la porte numérique de votre entreprise."
    },
    pillars: {
      simple: {
        title: "Nous rendons le simple efficace.",
        body: "Chez VELORA, nous pensons qu'un bon design ne consiste pas à ajouter plus de détails, mais à utiliser les bons éléments au bon endroit. C'est pourquoi les expériences web que nous créons évitent le superflu : claires, rapides, adaptées aux mobiles, et fidèles au caractère de votre entreprise. Chaque section doit avoir un objectif, chaque détail une raison d'être."
      },
      experience: {
        title: "Design et technologie, une seule expérience.",
        body: "Un site web ne suffit pas à être seulement beau. Les visiteurs doivent vous comprendre en quelques secondes, trouver facilement l'information qu'ils recherchent et pouvoir vous contacter. C'est pourquoi nous ne dissocions jamais le design, l'ergonomie et la technologie. Ce que nous créons n'est pas seulement un site web — c'est le visage numérique de votre entreprise."
      },
      growth: {
        title: "Pour les entreprises qui veulent grandir.",
        body: "VELORA travaille avec les entreprises qui souhaitent renforcer leur marque, gagner en visibilité dans le monde numérique et créer un meilleur premier contact avec leurs clients. Que vous fassiez vos premiers pas dans le numérique ou que vous souhaitiez repenser votre site actuel, notre objectif reste le même : créer une expérience numérique qui raconte fidèlement votre histoire, inspire confiance et incite les visiteurs à passer à l'étape suivante."
      }
    },
    closing: {
      p1: "Car un bon site web ne se contente pas d'être visité.",
      statement: "Il laisse une empreinte."
    }
  },

  form: {
    eyebrow: "Poser une question",
    heading: "Une question en tête ?",
    lede: "Aucun compte n'est nécessaire. Écrivez-nous votre question, nous vous répondrons rapidement.",
    optionalTag: "(facultatif)",
    labels: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "E-mail",
      company: "Entreprise / Marque",
      previousSite: "Lien de votre site web actuel (le cas échéant)",
      budget: "Budget",
      needs: "Vos besoins et attentes",
      needsOther: "Décrivez brièvement votre besoin",
      question: "Votre question"
    },
    placeholders: {
      previousSite: "https://..."
    },
    selectPlaceholder: "Sélectionner",
    budgetOptions: ["$500 – $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000+"],
    needsOptions: {
      newSite: "Nouveau site web",
      renewal: "Refonte d'un site existant",
      mobile: "Design adapté au mobile",
      ecommerce: "E-commerce",
      branding: "Image de marque / identité d'entreprise",
      other: "Autre"
    },
    submit: "Envoyer la question",
    submitting: "Envoi en cours...",
    feedback: {
      success: "Merci ! Votre question a bien été reçue, nous vous répondrons très prochainement.",
      error: "Merci de vérifier les champs signalés."
    },
    errors: {
      firstNameRequired: "Veuillez indiquer votre prénom.",
      lastNameRequired: "Veuillez indiquer votre nom.",
      emailRequired: "Veuillez indiquer votre adresse e-mail.",
      emailInvalid: "Veuillez indiquer une adresse e-mail valide.",
      questionRequired: "Veuillez écrire votre question.",
      questionTooShort: "Pourriez-vous préciser un peu plus votre question ? (10 caractères minimum)"
    }
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Questions fréquentes",
    items: [
      {
        question: "Combien de temps faut-il pour réaliser un site web ?",
        answer:
          "Cela dépend du périmètre du projet, mais nous visons une livraison sous 3 jours ouvrés pour la plupart des projets. Pour les projets sur mesure plus importants, nous planifions le délai avec vous."
      },
      {
        question: "Qu'est-ce qui est inclus dans le prix d'un site web ?",
        answer:
          "Le prix inclut le design, le développement, une configuration SEO essentielle et une mise en page entièrement responsive. Le périmètre exact dépend de l'offre choisie et de vos besoins."
      },
      {
        question: "Mon site fonctionnera-t-il bien sur téléphone et tablette ?",
        answer:
          "Oui. Tous nos sites sont entièrement responsives et s'affichent parfaitement sur téléphone, tablette et ordinateur."
      },
      {
        question: "Pourrai-je mettre à jour mon site moi-même par la suite ?",
        answer:
          "Oui, votre site est livré avec une structure claire qui facilite les mises à jour de contenu. Nous pouvons également nous en charger pour vous si vous le souhaitez."
      },
      {
        question: "Pouvez-vous refondre mon site existant ?",
        answer:
          "Absolument. Nous analysons votre site actuel et le reconstruisons avec un design moderne, rapide et sobre ; votre contenu existant peut être conservé si vous le souhaitez."
      },
      {
        question: "M'aidez-vous pour le nom de domaine et l'hébergement ?",
        answer:
          "Nous vous accompagnons dans les démarches de domaine et d'hébergement ; si vous en possédez déjà, nous pouvons travailler directement avec."
      },
      {
        question: "Mon site sera-t-il optimisé pour Google (SEO) ?",
        answer:
          "Oui, chaque site bénéficie d'une configuration SEO essentielle (titres, méta-descriptions, vitesse du site, etc.) pour être plus facilement trouvé sur les moteurs de recherche."
      },
      {
        question: "Puis-je demander des modifications ou des révisions pendant le projet ?",
        answer: "Absolument. Nous recueillons vos retours à chaque étape du design et construisons le site ensemble."
      },
      {
        question: "Dois-je fournir moi-même le contenu et les visuels de mon site ?",
        answer:
          "Vous pouvez fournir vos propres textes et visuels ; si vous n'en avez pas encore, nous pouvons démarrer avec un contenu et des visuels provisoires adaptés à votre projet."
      },
      {
        question: "Proposez-vous un support après la livraison du site ?",
        answer: "Oui, nous assurons un support pour les questions techniques après la livraison. La portée et la durée peuvent varier selon votre offre."
      }
    ]
  },

  contact: {
    eyebrow: "Contact",
    heading: "Contactez-nous",
    channels: {
      email: "E-mail",
      phone: "Téléphone",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      tiktok: "TikTok",
      telegram: "Telegram"
    }
  },

  footer: {
    altMenuAriaLabel: "Menu du pied de page",
    links: {
      home: "Accueil",
      packages: "Nos offres",
      works: "Nos réalisations",
      about: "À propos",
      contact: "Contact",
      faq: "FAQ",
      ask: "Poser une question"
    },
    rightsReserved: "Tous droits réservés."
  },

  search: {
    dialogAriaLabel: "Recherche sur le site",
    inputAriaLabel: "Recherche",
    placeholder: "Rechercher une offre ou une question...",
    closeAriaLabel: "Fermer la recherche",
    hint: "Vous pouvez rechercher parmi les offres et la FAQ.",
    noResults: 'Aucun résultat pour « {query} ».',
    tags: {
      package: "Offre",
      faq: "FAQ"
    }
  },

  misc: {
    logoAlt: "Logo VELORA"
  }
};
