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
      contact: "Contact",
      projectBrief: "Parlez-nous de votre projet"
    },
    worksDropdown: {
      viewHomeSection: "Voir nos réalisations",
      viewAll: "Découvrir toutes nos réalisations"
    }
  },

  langSwitch: {
    ariaLabel: "Choix de la langue"
  },

  hero: {
    cta: {
      packages: "Découvrir nos offres",
      contact: "Contactez-nous",
      ask: "Parlez-nous de votre projet"
    }
  },

  works: {
    eyebrow: "Nos réalisations",
    viewAllLink: "Découvrir toutes nos réalisations",
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
    },
    detail: {
      metaTitle: "VELORA — Nos réalisations",
      metaDescription: "Découvrez les projets de sites concept que VELORA a conçus pour différents secteurs.",
      pageHeading: "Découvrez toutes nos réalisations",
      pageLede:
        "Vous trouverez ci-dessous les projets concept que nous avons réalisés pour différents secteurs. Chacun est un projet concept/démo créé pour illustrer l'approche de design de VELORA ; il ne représente pas un travail client réel ni un résultat vérifié.",
      conceptBadge: "Projet concept",
      labels: {
        description: "Description du projet",
        benefitsTech: "Avantages et technologies utilisées",
        pricing: "Informations sur le tarif et les délais"
      },
      pricingNote:
        "Le tarif et le délai sont définis pour vous une fois le périmètre précisé. À titre de référence, le délai de livraison standard de nos offres est de 5 jours ouvrés ; contactez-nous pour obtenir un devis clair.",
      filter: {
        heading: "Trouvez et découvrez le site qui vous correspond",
        lede: "La zone ci-dessous est un exemple de design illustrant un futur filtrage par secteur ; elle n'effectue actuellement aucune sélection et ne filtre pas la liste des réalisations.",
        options: {
          hairdresser: "Coiffeur",
          beauty: "Beauté & Ongles",
          legal: "Droit",
          accounting: "Expertise comptable"
        },
        note: "Cette zone est uniquement un exemple de design ; les options sont désactivées."
      },
      items: {
        "velora-kurumsal": {
          description:
            "Un concept de site qui reflète l'identité institutionnelle de VELORA et présente clairement ses services et ses offres.",
          benefits: [
            "Une image institutionnelle sobre et rassurante",
            "Une présentation claire des services et des offres",
            "Une structure adaptée aux mobiles et rapide"
          ],
          techNote: "Approche recommandée pour ce concept : une structure rapide, sans dépendance supplémentaire, basée sur du HTML/CSS/JS simple."
        },
        "lumen-kahve": {
          description: "Un concept qui met en avant le menu et l'atmosphère d'un café, invitant directement le visiteur à s'y rendre.",
          benefits: [
            "Une structure organisée facilitant la mise à jour du menu",
            "Un langage visuel sobre reflétant l'atmosphère du lieu",
            "La localisation et les horaires mis en avant"
          ],
          techNote: "Approche recommandée pour ce concept : une structure sobre et mobile-first, adaptée au chargement rapide des images."
        },
        "atlas-hukuk": {
          description:
            "Un concept qui présente les domaines d'expertise et la posture institutionnelle d'un cabinet d'avocats dans un ton rassurant.",
          benefits: [
            "Une première impression institutionnelle et rassurante",
            "Une liste claire des domaines d'expertise",
            "Des appels à l'action clairs facilitant la prise de contact"
          ],
          techNote: "Approche recommandée pour ce concept : un langage de design sobre, institutionnel et sans distraction."
        },
        "fitcore-studyo": {
          description: "Un concept qui reflète le planning des cours et l'énergie d'un studio de sport, de façon sobre et dynamique.",
          benefits: [
            "Une présentation claire du planning des cours/services",
            "Un langage visuel énergique mais ordonné",
            "Une prise de contact facile depuis mobile"
          ],
          techNote: "Approche recommandée pour ce concept : une structure rapide et mobile-first."
        },
        "vera-klinik": {
          description: "Un concept rassurant, calme et informatif pour un établissement de santé/clinique.",
          benefits: [
            "Des services présentés dans un ton calme et rassurant",
            "Une étape de contact facile à trouver",
            "Les questions fréquentes mises en avant"
          ],
          techNote: "Approche recommandée pour ce concept : un langage de design sobre, privilégiant la lisibilité."
        },
        "marka-vitrin": {
          description:
            "Un concept e-commerce qui présente les produits d'une marque comme une vitrine sobre (une infrastructure complète de paiement/commande ne fait pas partie de ce concept).",
          benefits: [
            "Une présentation claire et sobre des produits",
            "Une navigation facile entre les catégories",
            "Un langage visuel reflétant le caractère propre de la marque"
          ],
          techNote: "Approche recommandée pour ce concept : une structure sobre et évolutive pour une vitrine produits de base."
        },
        "ada-mimarlik": {
          description: "Un concept qui présente le portfolio de projets d'un cabinet d'architecture de façon sobre et axée sur le visuel.",
          benefits: [
            "Une présentation sobre et axée sur le visuel des projets",
            "Une structure facile à mettre à jour",
            "Un ton institutionnel mais personnel"
          ],
          techNote: "Approche recommandée pour ce concept : une mise en page de type galerie/portfolio qui met les visuels en avant."
        }
      }
    }
  },

  packages: {
    eyebrow: "Nos offres",
    heading: "Des offres adaptées à vos besoins",
    lede: "Définissons ensemble l'offre la plus adaptée ; contactez-nous et nous vous proposerons un devis clair.",
    deliveryNote: "Délai de livraison pour toutes les offres : 5 jours ouvrés",
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
      },
      "proje-anlatin": {
        name: "Parlez-nous de votre projet / Obtenez un devis",
        description: "Partagez le périmètre de votre projet, nous définirons ensemble la solution et le tarif adaptés.",
        cta: "Nous en parler"
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
    moreLink: "En savoir plus sur nous"
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
    pendingLabel: "Bientôt disponible",
    channels: {
      email: "E-mail",
      phone: "Téléphone",
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

  pages: {
    placeholder: "Le contenu de cette section sera bientôt ajouté.",
    about: {
      metaTitle: "VELORA — À propos",
      metaDescription: "En savoir plus sur VELORA.",
      eyebrow: "À propos",
      heading: "À propos de VELORA",
      lede: "VELORA a pour objectif de concevoir des sites web simples et faciles à utiliser, qui aident les entreprises à se présenter en ligne de façon claire et juste.",
      sections: {
        who: "Ce que nous faisons",
        approach: "Ce qui compte pour nous en design",
        values: "Notre contribution à votre entreprise"
      },
      bodies: {
        who: "VELORA vise à proposer aux entreprises des services de conception et de développement de sites web. Cette démarche s'appuie sur une expérience en conception et développement web qui en est à sa troisième année. L'objectif : que chaque entreprise dispose d'une vitrine numérique bien à elle, ordonnée et inspirant confiance.",
        approach: "Lorsque nous concevons un site web, nous cherchons d'abord à comprendre ce qu'une entreprise souhaite dire, et à qui. La simplicité, la facilité pour les visiteurs de trouver ce qu'ils cherchent et une structure agréable à utiliser sur tous les appareils constituent la base du design. Nous évitons la surcharge inutile et laissons le contenu s'exprimer.",
        values: "Notre objectif est de rendre la première impression numérique de votre entreprise claire et cohérente. Un site qui présente clairement vos services, votre identité et la manière de vous contacter aide les visiteurs à mieux vous connaître."
      },
      ctaHeading: "Vous avez une question ?",
      ctaLede: "Vous pouvez nous joindre via nos canaux de contact ou le formulaire de question.",
      ctaContact: "Nous contacter",
      ctaPackages: "Voir les offres"
    },
    projectBrief: {
      metaTitle: "VELORA — Parlez-nous de votre projet",
      metaDescription: "Partagez votre projet et votre entreprise avec VELORA.",
      eyebrow: "Votre projet",
      heading: "Parlez-nous de votre projet",
      lede: "Présentez votre entreprise et vos attentes pour votre site web à l'aide du formulaire ci-dessous ; nous préciserons ensemble votre besoin.",
      form: {
        requiredNote: "Les champs marqués d'un * sont obligatoires.",
        labels: {
          fullName: "Nom et prénom",
          email: "E-mail",
          businessName: "Nom de l'entreprise / de la marque",
          businessType: "Type d'entreprise",
          businessTypeOther: "Indiquez votre type d'entreprise",
          need: "Besoin",
          needOther: "Décrivez votre besoin",
          website: "Lien du site web actuel",
          summary: "Décrivez brièvement votre projet et votre entreprise",
          details: "Autres détails que vous avez en tête",
          files: "Fichiers du projet"
        },
        placeholders: {
          website: "https://...",
          summary: "Que fait votre entreprise et que souhaitez-vous accomplir avec votre site web ?",
          details: "Par exemple : vos préférences de couleurs, si vous avez besoin d'un nouveau logo, des sites d'exemple que vous aimez, les pages et fonctionnalités souhaitées ou tout autre détail que vous jugez important.",
          businessTypeOther: "Votre type d'entreprise",
          needOther: "Votre besoin"
        },
        selectPlaceholder: "Sélectionnez",
        businessTypes: {
          menBarber: "Barbier / coiffeur pour hommes",
          womenHairdresser: "Coiffeur pour femmes",
          beautySalon: "Institut de beauté",
          nailStudio: "Onglerie",
          lawFirm: "Cabinet d'avocats",
          independentLawyer: "Avocat indépendant",
          accountant: "Expert-comptable",
          other: "Autre"
        },
        needs: {
          newSite: "Nouveau site web",
          redesign: "Refonte du site existant",
          booking: "Réservation / menu",
          ecommerce: "E-commerce",
          other: "Autre"
        },
        chooseFiles: "Choisir des fichiers",
        noFiles: "Aucun fichier sélectionné",
        filesCount: "{count} fichier(s) sélectionné(s)",
        filesHelp: "Vous pouvez sélectionner plusieurs fichiers, comme les fichiers de votre site actuel, votre logo, des images ou des documents associés.",
        filesPending: "L'envoi de fichiers n'est pas encore actif : les fichiers sélectionnés ne sont actuellement téléversés nulle part.",
        filesSelected: "Fichiers sélectionnés ({count})",
        filesClear: "Effacer la sélection",
        notice: "Ce formulaire n'est pas encore relié à un service d'envoi ; les informations et fichiers saisis ne sont actuellement transmis nulle part. Pour nous joindre, utilisez les canaux de contact en bas de cette page.",
        submit: "Envoyer le projet",
        submitting: "Envoi en cours...",
        feedback: {
          error: "Veuillez vérifier les champs signalés.",
          notSent: "Vos informations n'ont pas été envoyées : ce formulaire n'est pas encore relié à un service d'envoi. Veuillez nous joindre via les canaux de contact ci-dessous.",
          success: "Merci, vos informations ont bien été transmises.",
          sendFailed: "L'envoi a échoué ; vos informations n'ont pas pu être transmises. Veuillez réessayer plus tard ou nous joindre via nos canaux de contact."
        },
        errors: {
          fullNameRequired: "Veuillez indiquer vos nom et prénom.",
          emailRequired: "Veuillez indiquer votre adresse e-mail.",
          emailInvalid: "Veuillez indiquer une adresse e-mail valide.",
          summaryRequired: "Veuillez décrire brièvement votre projet et votre entreprise.",
          summaryTooShort: "Pourriez-vous ajouter un peu plus de détails ? (10 caractères minimum)"
        },
        footnote: "Plus vous partagez les informations clairement, mieux nous pouvons comprendre votre besoin et le périmètre de votre projet, et plus vite nous pouvons définir avec vous la solution adaptée et les prochaines étapes."
      },
      works: {
        heading: "Découvrez nos exemples de réalisations",
        lede: "Parcourez les concepts que nous avons préparés pour différentes entreprises et trouvez des idées pour votre site web.",
        link: "Voir nos réalisations"
      }
    }
  },

  misc: {
    logoAlt: "Logo VELORA"
  }
};
