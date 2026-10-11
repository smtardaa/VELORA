// data/i18n/it.js — Italiano. Stessa struttura di chiavi di tr.js.

export const it = {
  meta: {
    title: "VELORA — Agenzia Web",
    description:
      "VELORA è un'agenzia web che crea esperienze digitali essenziali, veloci ed efficaci per i brand."
  },

  skipLink: "Vai al contenuto",

  header: {
    brandAriaLabel: "Home VELORA",
    mainNavAriaLabel: "Menu principale",
    searchAriaLabel: "Cerca nel sito",
    menuToggleAriaLabel: "Apri/chiudi il menu",
    nav: {
      home: "Home",
      works: "I nostri lavori",
      packages: "I nostri pacchetti",
      about: "Chi siamo",
      ask: "Fai una domanda",
      faq: "FAQ",
      contact: "Contatti",
      projectBrief: "Raccontaci il tuo progetto"
    },
    worksDropdown: {
      viewHomeSection: "Guarda i nostri lavori",
      viewAll: "Scopri tutti i nostri lavori"
    }
  },

  langSwitch: {
    ariaLabel: "Selezione della lingua"
  },

  hero: {
    cta: {
      packages: "Scopri i pacchetti",
      contact: "Contattaci subito",
      ask: "Raccontaci il tuo progetto"
    }
  },

  works: {
    eyebrow: "I nostri lavori",
    viewAllLink: "Scopri tutti i nostri lavori",
    heading: "Alcuni dei nostri progetti recenti",
    lede: "Una selezione di siti che abbiamo realizzato per brand di settori diversi.",
    prevAriaLabel: "Progetto precedente",
    nextAriaLabel: "Progetto successivo",
    dotAriaLabel: "Vai al progetto {n}",
    viewProject: "Scopri il progetto",
    projectAriaLabel: "Scopri il progetto {name}",
    categories: {
      "velora-kurumsal": "Sito aziendale",
      "lumen-kahve": "Ristorante & Menu",
      "atlas-hukuk": "Sito aziendale",
      "fitcore-studyo": "Fitness & Sport",
      "vera-klinik": "Salute & Clinica",
      "marka-vitrin": "E-commerce",
      "ada-mimarlik": "Portfolio personale"
    },
    detail: {
      metaTitle: "VELORA — I nostri lavori",
      metaDescription: "Scopri i progetti di siti concept che VELORA ha realizzato per diversi settori.",
      pageHeading: "Scopri tutti i nostri lavori",
      pageLede:
        "Qui sotto trovi i progetti concept che abbiamo realizzato per diversi settori. Ognuno è un progetto concept/demo creato per mostrare l'approccio di design di VELORA; non rappresenta un lavoro reale per un cliente né un risultato verificato.",
      conceptBadge: "Progetto Concept",
      labels: {
        description: "Descrizione del progetto",
        benefitsTech: "Vantaggi e tecnologie utilizzate",
        pricing: "Informazioni su prezzo e tempistiche"
      },
      pricingNote:
        "Prezzo e tempistiche vengono definiti su misura una volta chiarito l'ambito del progetto. Come riferimento, i tempi di consegna standard dei nostri pacchetti sono di 5 giorni lavorativi; per un preventivo chiaro basta contattarci.",
      filter: {
        heading: "Trova e scopri il sito più adatto a te",
        lede: "L'area qui sotto è un esempio di design che mostra come potrebbe funzionare in futuro un filtro per settore; al momento non effettua alcuna selezione e non filtra l'elenco dei lavori.",
        options: {
          hairdresser: "Parrucchiere",
          beauty: "Bellezza & Unghie",
          legal: "Studio Legale",
          accounting: "Commercialista"
        },
        note: "Quest'area è solo un esempio di design; le opzioni sono disattivate."
      },
      items: {
        "velora-kurumsal": {
          description: "Un concept di sito che riflette l'identità aziendale di VELORA e presenta in modo chiaro i suoi servizi e pacchetti.",
          benefits: [
            "Un aspetto aziendale sobrio e affidabile",
            "Presentazione chiara di servizi e pacchetti",
            "Struttura mobile-friendly e veloce da caricare"
          ],
          techNote: "Approccio consigliato per questo concept: una struttura veloce, senza dipendenze aggiuntive, basata su semplice HTML/CSS/JS."
        },
        "lumen-kahve": {
          description:
            "Un concept che mette in primo piano il menu e l'atmosfera di una caffetteria, invitando direttamente il visitatore nel locale.",
          benefits: [
            "Una struttura ordinata che rende facile aggiornare il menu",
            "Un linguaggio visivo sobrio che riflette l'atmosfera del locale",
            "Posizione e orari in primo piano"
          ],
          techNote: "Approccio consigliato per questo concept: una struttura sobria e mobile-first, adatta al caricamento rapido delle immagini."
        },
        "atlas-hukuk": {
          description: "Un concept che presenta le aree di competenza e la posizione aziendale di uno studio legale con un tono affidabile.",
          benefits: [
            "Una prima impressione aziendale e affidabile",
            "Elenco chiaro delle aree di competenza",
            "Call to action chiare che facilitano il contatto"
          ],
          techNote: "Approccio consigliato per questo concept: un linguaggio di design sobrio, aziendale e privo di distrazioni."
        },
        "fitcore-studyo": {
          description: "Un concept che riflette il programma corsi e l'energia di uno studio sportivo in modo sobrio e dinamico.",
          benefits: [
            "Presentazione chiara del programma corsi/servizi",
            "Un linguaggio visivo energico ma ordinato",
            "Contatto facile da dispositivi mobili"
          ],
          techNote: "Approccio consigliato per questo concept: una struttura veloce e mobile-first."
        },
        "vera-klinik": {
          description: "Un concept affidabile, calmo e informativo per un'attività sanitaria/clinica.",
          benefits: [
            "Servizi spiegati con un tono calmo e affidabile",
            "Un passaggio di contatto facile da trovare",
            "Domande frequenti messe in evidenza"
          ],
          techNote: "Approccio consigliato per questo concept: un linguaggio di design sobrio, che dà priorità alla leggibilità."
        },
        "marka-vitrin": {
          description:
            "Un concept e-commerce che presenta i prodotti di un brand con un approccio semplice, come una vetrina (un'infrastruttura completa di pagamento/ordini non fa parte di questo concept).",
          benefits: [
            "Presentazione dei prodotti chiara e sobria",
            "Navigazione facile tra le categorie",
            "Un linguaggio visivo che riflette il carattere del brand"
          ],
          techNote: "Approccio consigliato per questo concept: una struttura sobria ed espandibile per una vetrina prodotti di base."
        },
        "ada-mimarlik": {
          description: "Un concept che presenta il portfolio progetti di uno studio di architettura in modo sobrio e incentrato sul visivo.",
          benefits: [
            "Presentazione dei progetti sobria e incentrata sul visivo",
            "Una struttura facile da aggiornare",
            "Un tono aziendale ma personale"
          ],
          techNote: "Approccio consigliato per questo concept: un layout a galleria/portfolio sobrio che lascia parlare le immagini."
        }
      }
    }
  },

  packages: {
    eyebrow: "I nostri pacchetti",
    heading: "Pacchetti su misura per le tue esigenze",
    lede: "Scegliamo insieme il pacchetto più adatto: bastano poche informazioni e ti prepariamo un preventivo chiaro.",
    deliveryNote: "Tempi di consegna per tutti i pacchetti: 5 giorni lavorativi",
    priceLabel: "Prezzo di partenza",
    includesLabel: "Incluso nel pacchetto",
    extrasLabel: "Non incluso / quotato a parte",
    pricingNote: "I prezzi indicati sono prezzi di partenza; il prezzo finale viene definito dopo aver chiarito insieme il perimetro del progetto. Dominio, hosting e costi di servizi di terze parti non sono inclusi nei pacchetti.",
    custom: {
      examplesLabel: "Esempi che possiamo valutare come richiesta personalizzata",
      priceText: "Il prezzo viene definito una volta chiarito il perimetro"
    },
    items: {
      "tek-sayfa": {
        name: "Pagina Singola",
        audience: "Per piccole attività e per chi offre un servizio principale",
        description: "Un sito di presentazione che racconta la tua attività, il tuo servizio e come contattarti in un'unica pagina ordinata.",
        features: ["Pagina singola con design su misura", "Sezioni servizi, chi siamo e contatti", "Link a WhatsApp, telefono ed e-mail", "Ottimizzato per smartphone, tablet e desktop", "Impostazioni SEO di base"],
        extras: ["Pagine aggiuntive", "Testi e fotografia professionale", "Costi di dominio e hosting"],
        cta: "Contattaci"
      },
      kurumsal: {
        name: "Aziendale",
        audience: "Per le attività che vogliono presentarsi in modo più completo",
        description: "Un sito aziendale multipagina che presenta i tuoi servizi, la tua storia e i tuoi contatti in pagine dedicate.",
        features: ["Design su misura fino a 5 pagine", "Layout dedicato per i servizi", "Pagina sede e contatti", "Ottimizzato per smartphone, tablet e desktop", "Impostazioni SEO di base"],
        extras: ["Pannello di gestione dei contenuti", "Più lingue", "Testi e fotografia professionale", "Costi di dominio e hosting"],
        cta: "Contattaci"
      },
      "randevu-menu": {
        name: "Prenotazioni e Menu",
        audience: "Per attività locali come parrucchieri, centri estetici e nail studio, caffè e ristoranti",
        description: "Un sito che presenta in modo ordinato servizi e prezzi o il tuo menu e guida i visitatori al canale giusto per prenotare o contattarti.",
        features: ["Pagina servizi/prezzi o menu", "Richiesta di appuntamento via WhatsApp e telefono", "Link allo strumento di prenotazione che già usi (se presente)", "Indirizzo, orari e contatti", "Design pensato prima per il mobile"],
        extras: ["Sistema di prenotazione online in tempo reale", "Ordini e pagamenti online", "Costi di dominio e hosting"],
        cta: "Contattaci"
      },
      "e-ticaret": {
        name: "E-commerce",
        audience: "Per le attività che vogliono vendere i propri prodotti online",
        description: "Un design di negozio che presenta in modo ordinato il tuo catalogo, pianificato in base alla piattaforma e-commerce che verrà scelta.",
        features: ["Design della home page del negozio", "Layout di categorie e schede prodotto", "Negozio ottimizzato per il mobile", "Canali di contatto per domande prima dell'ordine"],
        extras: ["Piattaforma e-commerce / licenza", "Integrazioni di pagamento (POS virtuale), spedizione e magazzino", "Collegamenti ai marketplace", "Inserimento massivo dei prodotti e fotografia prodotto", "Costi di dominio e hosting"],
        cta: "Contattaci"
      },
      "proje-anlatin": {
        name: "Raccontaci il tuo progetto",
        description: "Se le tue esigenze non rientrano nei pacchetti standard, raccontaci il tuo progetto: prima definiamo insieme il perimetro, poi stabiliamo il prezzo.",
        examples: ["Strutture di pagina e percorsi utente su misura", "Integrazioni aggiuntive", "Più lingue", "Altre esigenze che non rientrano nei pacchetti"],
        cta: "Raccontaci il tuo progetto"
      }
    }
  },

  packageModal: {
    titleTemplate: "Stai per contattarci per un progetto {package}.",
    closeAriaLabel: "Chiudi popup"
  },

  about: {
    eyebrow: "VELORA",
    headline: "La tua prima impressione nel mondo digitale è una porta.",
    moreLink: "Scopri di più su di noi"
  },

  form: {
    eyebrow: "Fai una domanda",
    heading: "Hai qualche dubbio?",
    lede: "Non serve creare un account. Scrivi la tua domanda e ti risponderemo al più presto.",
    optionalTag: "(facoltativo)",
    labels: {
      firstName: "Nome",
      lastName: "Cognome",
      email: "Email",
      company: "Azienda / Brand",
      previousSite: "Link al tuo sito web attuale (se presente)",
      budget: "Budget",
      needs: "Le tue esigenze e richieste",
      needsOther: "Descrivi brevemente la tua esigenza",
      question: "La tua domanda"
    },
    placeholders: {
      previousSite: "https://..."
    },
    selectPlaceholder: "Seleziona",
    budgetOptions: ["$500 – $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000+"],
    needsOptions: {
      newSite: "Nuovo sito web",
      renewal: "Rinnovo di un sito esistente",
      mobile: "Design ottimizzato per mobile",
      ecommerce: "E-commerce",
      branding: "Branding / immagine aziendale",
      other: "Altro"
    },
    submit: "Invia domanda",
    submitting: "Invio in corso...",
    feedback: {
      success: "Grazie! Abbiamo ricevuto la tua domanda e ti risponderemo al più presto.",
      error: "Controlla i campi evidenziati."
    },
    errors: {
      firstNameRequired: "Inserisci il tuo nome.",
      lastNameRequired: "Inserisci il tuo cognome.",
      emailRequired: "Inserisci il tuo indirizzo email.",
      emailInvalid: "Inserisci un indirizzo email valido.",
      questionRequired: "Scrivi la tua domanda.",
      questionTooShort: "Potresti darci qualche dettaglio in più? (almeno 10 caratteri)"
    }
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Domande frequenti",
    items: [
      {
        question: "Quanto tempo serve per realizzare un sito web?",
        answer:
          "Dipende dall'ambito del progetto, ma puntiamo a consegnare la maggior parte dei progetti entro 3 giorni lavorativi. Per i progetti personalizzati più ampi, pianifichiamo i tempi insieme a te."
      },
      {
        question: "Cosa è incluso nel prezzo di un sito web?",
        answer:
          "Il prezzo include design, sviluppo, impostazioni SEO essenziali e un layout completamente responsive. L'ambito esatto dipende dal pacchetto scelto e dalle tue esigenze."
      },
      {
        question: "Il mio sito funzionerà bene su smartphone e tablet?",
        answer:
          "Sì. Tutti i nostri siti sono completamente responsive e si adattano perfettamente a smartphone, tablet e desktop."
      },
      {
        question: "Potrò aggiornare il sito da solo in seguito?",
        answer:
          "Sì, il tuo sito viene consegnato con una struttura ordinata che rende semplice aggiornare i contenuti. Se preferisci, possiamo occuparcene anche noi per tuo conto."
      },
      {
        question: "Potete rinnovare il mio sito esistente?",
        answer:
          "Assolutamente. Analizziamo il tuo sito attuale e lo ricostruiamo con un design moderno, veloce ed essenziale; su richiesta, i contenuti esistenti possono essere mantenuti."
      },
      {
        question: "Aiutate con dominio e hosting?",
        answer:
          "Ti guidiamo nel processo di dominio e hosting; se ne possiedi già uno, possiamo lavorare direttamente con quello."
      },
      {
        question: "Il mio sito sarà ottimizzato per Google (SEO)?",
        answer:
          "Sì, ogni sito include impostazioni SEO essenziali (titoli, meta description, velocità del sito e altro) per essere trovato più facilmente sui motori di ricerca."
      },
      {
        question: "Posso richiedere modifiche o revisioni durante il progetto?",
        answer: "Assolutamente sì. Raccogliamo i tuoi feedback in ogni fase del design e costruiamo il sito insieme a te."
      },
      {
        question: "Devo fornire io i contenuti e le immagini per il mio sito?",
        answer:
          "Puoi fornire i tuoi testi e le tue immagini; se non ne hai ancora, possiamo iniziare con contenuti e immagini segnaposto adatti al tuo progetto."
      },
      {
        question: "Offrite supporto dopo la consegna del sito?",
        answer: "Sì, offriamo supporto per le questioni tecniche che possono emergere dopo la consegna. Ambito e durata possono variare in base al pacchetto."
      }
    ]
  },

  contact: {
    eyebrow: "Contatti",
    heading: "Contattaci",
    pendingLabel: "Disponibile a breve",
    channels: {
      email: "Email",
      phone: "Telefono",
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
    altMenuAriaLabel: "Menu del footer",
    links: {
      home: "Home",
      packages: "Pacchetti",
      works: "I nostri lavori",
      about: "Chi siamo",
      contact: "Contatti",
      faq: "FAQ",
      ask: "Fai una domanda"
    },
    groups: {
      pages: "Pagine",
      quickLinks: "Accesso rapido",
      contact: "Contattaci"
    },
    allChannels: "Tutti i canali di contatto",
    rightsReserved: "Tutti i diritti riservati."
  },

  search: {
    dialogAriaLabel: "Ricerca nel sito",
    inputAriaLabel: "Ricerca",
    placeholder: "Cerca un pacchetto o una domanda...",
    closeAriaLabel: "Chiudi ricerca",
    hint: "Puoi cercare tra i pacchetti e le FAQ.",
    noResults: 'Nessun risultato per "{query}".',
    tags: {
      package: "Pacchetto",
      faq: "FAQ"
    }
  },

  pages: {
    placeholder: "Il contenuto di questa sezione sarà aggiunto a breve.",
    about: {
      metaTitle: "VELORA — Chi siamo",
      metaDescription: "Scopri di più su VELORA.",
      eyebrow: "Chi siamo",
      heading: "Chi è VELORA",
      lede: "VELORA si propone di progettare siti web semplici e facili da usare, che aiutino le attività a presentarsi online in modo chiaro e corretto.",
      sections: {
        who: "Cosa facciamo",
        approach: "Cosa conta per noi nel design",
        values: "Il nostro contributo alla tua attività"
      },
      bodies: {
        who: "VELORA punta a offrire alle attività servizi di progettazione e sviluppo di siti web. Questo approccio si basa su un'esperienza nella progettazione e nello sviluppo web giunta ormai al terzo anno. L'obiettivo è che ogni attività abbia una propria vetrina digitale, ordinata e capace di trasmettere fiducia.",
        approach: "Quando progettiamo un sito web, cerchiamo prima di capire cosa un'attività vuole comunicare e a chi. Semplicità, facilità per i visitatori di trovare ciò che cercano e una struttura comoda da usare su ogni dispositivo sono la base del design. Evitiamo il sovraccarico inutile e lasciamo spazio ai contenuti.",
        values: "Il nostro obiettivo è rendere la prima impressione digitale della tua attività chiara e coerente. Un sito che mostra chiaramente i tuoi servizi, la tua identità e come contattarti aiuta i visitatori a conoscerti più facilmente."
      },
      ctaHeading: "Hai una domanda?",
      ctaLede: "Puoi contattarci tramite i nostri canali di contatto o il modulo per le domande.",
      ctaContact: "Contattaci",
      ctaPackages: "Vedi i pacchetti"
    },
    projectBrief: {
      metaTitle: "VELORA — Raccontaci il tuo progetto",
      metaDescription: "Condividi il tuo progetto e la tua attività con VELORA.",
      eyebrow: "Il tuo progetto",
      heading: "Raccontaci il tuo progetto",
      lede: "Presenta la tua attività e ciò che ti aspetti dal sito web con il modulo qui sotto; definiremo insieme le tue esigenze.",
      form: {
        requiredNote: "I campi contrassegnati con * sono obbligatori.",
        labels: {
          fullName: "Nome e cognome",
          email: "E-mail",
          businessName: "Nome dell'attività / del marchio",
          businessType: "Tipo di attività",
          businessTypeOther: "Indica il tipo di attività",
          need: "Esigenza",
          needOther: "Descrivi la tua esigenza",
          website: "Link al sito web attuale",
          summary: "Descrivi brevemente il tuo progetto e la tua attività",
          details: "Altri dettagli che hai in mente",
          files: "File del progetto"
        },
        placeholders: {
          website: "https://...",
          summary: "Di cosa si occupa la tua attività e cosa vuoi ottenere con il sito web?",
          details: "Ad esempio: le tue preferenze di colore, se ti serve un nuovo logo, siti di esempio che ti piacciono, le pagine e le funzionalità desiderate o altri dettagli che ritieni importanti.",
          businessTypeOther: "Il tuo tipo di attività",
          needOther: "La tua esigenza"
        },
        selectPlaceholder: "Seleziona",
        businessTypes: {
          menBarber: "Barbiere",
          womenHairdresser: "Parrucchiere donna",
          beautySalon: "Centro estetico",
          nailStudio: "Nail studio",
          lawFirm: "Studio legale",
          independentLawyer: "Avvocato indipendente",
          accountant: "Commercialista",
          other: "Altro"
        },
        needs: {
          newSite: "Nuovo sito web",
          redesign: "Rinnovo del sito esistente",
          booking: "Prenotazioni / menù",
          ecommerce: "E-commerce",
          other: "Altro"
        },
        chooseFiles: "Scegli i file",
        noFiles: "Nessun file selezionato",
        filesCount: "{count} file selezionati",
        filesHelp: "Puoi selezionare più file, ad esempio i file del tuo sito attuale, il logo, immagini o documenti correlati.",
        filesPending: "L'invio dei file non è ancora attivo: i file selezionati al momento non vengono caricati da nessuna parte.",
        filesSelected: "File selezionati ({count})",
        filesClear: "Cancella selezione",
        notice: "Questo modulo non è ancora collegato a un servizio di invio; le informazioni e i file inseriti al momento non vengono inviati da nessuna parte. Per contattarci, usa i canali di contatto in fondo a questa pagina.",
        submit: "Invia il progetto",
        submitting: "Invio in corso...",
        feedback: {
          error: "Controlla i campi evidenziati.",
          notSent: "Le tue informazioni non sono state inviate: questo modulo non è ancora collegato a un servizio di invio. Contattaci tramite i canali di contatto qui sotto.",
          success: "Grazie, le tue informazioni sono state inviate.",
          sendFailed: "Invio non riuscito; le tue informazioni non sono state inviate. Riprova più tardi o contattaci tramite i nostri canali di contatto."
        },
        errors: {
          fullNameRequired: "Inserisci nome e cognome.",
          emailRequired: "Inserisci il tuo indirizzo e-mail.",
          emailInvalid: "Inserisci un indirizzo e-mail valido.",
          summaryRequired: "Descrivi brevemente il tuo progetto e la tua attività.",
          summaryTooShort: "Puoi aggiungere qualche dettaglio in più? (almeno 10 caratteri)"
        },
        footnote: "Più condividi le informazioni in modo chiaro, più accuratamente possiamo comprendere le tue esigenze e l'ambito del progetto, e più rapidamente possiamo definire la soluzione adatta e i passi successivi."
      },
      works: {
        heading: "Dai un'occhiata ai nostri lavori di esempio",
        lede: "Sfoglia i concept che abbiamo preparato per diverse attività e trova idee per il tuo sito web.",
        link: "Scopri i nostri lavori"
      }
    }
  },

  views: {
    backHome: "Torna alla home",
    currentLabel: "Vista attuale:"
  },
  misc: {
    logoAlt: "Logo VELORA"
  }
};
