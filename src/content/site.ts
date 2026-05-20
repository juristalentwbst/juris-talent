import type { Locale, NavigationItem, PageKey } from "@/types/site";
import { localizedHref } from "@/lib/routes";

type Cta = {
  label: string;
  href: string;
};

type Feature = {
  title: string;
  text: string;
};

type DetailBlock = {
  title?: string;
  heading?: string;
  paragraphs: string[];
  benefitsTitle: string;
  benefits: Feature[];
};

type Faq = {
  question: string;
  answer: string;
};

type LegalSection = {
  title: string;
  body: string[];
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: NavigationItem[];
  header: {
    firmAccess: string;
  };
  footer: {
    disclaimer: string;
    line: string;
    legalReview: string;
  };
  common: {
    studentCta: string;
    firmCta: string;
    required: string;
    selectPlaceholder: string;
    fileHint: string;
    privacyNoticeStudent: string;
    privacyNoticeFirm: string;
    privacyNoticeContact: string;
    cvDisclaimer: string;
    nonResponsibility: string;
  };
  pages: {
    home: {
      eyebrow: string;
      title: string;
      subtitle: string;
      mission: string;
      primary: Cta;
      secondary: Cta;
      pathways: Array<Feature & { cta: Cta }>;
      steps: Feature[];
      why: Feature[];
      final: {
        title: string;
        text: string;
        student: Cta;
        firm: Cta;
      };
    };
    student: {
      title: string;
      subtitle: string;
      primary: Cta;
      secondary: Cta;
      benefits: Feature[];
      steps: Feature[];
      application: {
        title: string;
        text: string;
      };
      detail: DetailBlock;
      faq: Faq[];
      final: {
        title: string;
        text: string;
        cta: Cta;
      };
    };
    firm: {
      title: string;
      subtitle: string;
      primary: Cta;
      secondary: Cta;
      benefits: Feature[];
      steps: Feature[];
      request: {
        title: string;
        text: string;
      };
      detail: DetailBlock;
      faq: Faq[];
      final: {
        title: string;
        text: string;
        cta: Cta;
      };
    };
    opportunities: {
      title: string;
      subtitle: string;
      emptyTitle: string;
      emptyText: string;
      cta: Cta;
    };
    about: {
      title: string;
      subtitle: string;
      missionTitle: string;
      mission: string;
      valuesTitle: string;
      story: string[];
      values: Feature[];
      audiences: Feature[];
      final: {
        title: string;
        student: Cta;
        firm: Cta;
      };
    };
    contact: {
      title: string;
      subtitle: string;
      info: Feature[];
    };
    legal: Record<"terms" | "privacy" | "legal", { title: string; sections: LegalSection[] }>;
  };
  forms: {
    success: Record<"student" | "firm" | "contact", string>;
    errors: {
      general: string;
      required: string;
      email: string;
      file: string;
      consent: string;
    };
    student: {
      submit: string;
      consent: string;
      fields: Record<string, string>;
      options: {
        years: string[];
        opportunities: string[];
        languages: string[];
      };
    };
    firm: {
      submit: string;
      consent: string;
      acknowledgment: string;
      fields: Record<string, string>;
      options: {
        opportunities: string[];
        languages: string[];
      };
    };
    contact: {
      submit: string;
      fields: Record<string, string>;
      userTypes: string[];
    };
  };
};

function nav(locale: Locale): NavigationItem[] {
  const labels: Record<Locale, Array<[PageKey, string]>> = {
    fr: [
      ["home", "Accueil"],
      ["student", "Étudiant"],
      ["opportunities", "Offres"],
      ["firm", "Nos services"],
      ["about", "À propos"],
      ["contact", "Contact"]
    ],
    en: [
      ["home", "Home"],
      ["student", "Student"],
      ["opportunities", "Opportunities"],
      ["firm", "Our Services"],
      ["about", "About"],
      ["contact", "Contact"]
    ]
  };

  return labels[locale].map(([key, label]) => ({
    key,
    label,
    href: localizedHref(key, locale)
  }));
}

export const content: Record<Locale, SiteContent> = {
  fr: {
    meta: {
      title: "Juris Talent | Relève juridique et cabinets d'exception",
      description:
        "Juris Talent accompagne les étudiants en droit et les professionnels juridiques du Québec avec une agence de mise en relation agile et professionnelle."
    },
    nav: nav("fr"),
    header: {
      firmAccess: "Accès Cabinet"
    },
    footer: {
      disclaimer:
        "Juris Talent est une agence de mise en relation / courtage entre talents de soutien juridique et professionnels juridiques. Juris Talent n'offre aucun avis juridique et ne garantit pas l'obtention d'une entrevue, d'un stage, d'un emploi, d'un candidat ou d'un résultat d'embauche.",
      line: "© Juris Talent. Tous droits réservés.",
      legalReview:
        "Les pages légales, consentements et pratiques de confidentialité doivent être revus par un professionnel juridique qualifié au Québec avant le lancement."
    },
    common: {
      studentCta: "Soumettre ma candidature",
      firmCta: "Présenter un besoin",
      required: "obligatoire",
      selectPlaceholder: "Sélectionner",
      fileHint: "PDF, DOC ou DOCX. Stockage réel à connecter dans une phase future.",
      privacyNoticeStudent:
        "En soumettant ce formulaire, vous autorisez Juris Talent à recueillir, utiliser et examiner les renseignements fournis afin d'évaluer votre profil, de vous contacter au besoin et de faciliter une mise en relation potentielle avec des cabinets ou employeurs juridiques.",
      privacyNoticeFirm:
        "En soumettant ce formulaire, vous autorisez Juris Talent à recueillir et utiliser les renseignements fournis afin de comprendre votre besoin, communiquer avec vous et faciliter une mise en relation potentielle avec des candidats ou talents juridiques.",
      privacyNoticeContact:
        "Les renseignements transmis dans ce formulaire seront utilisés uniquement pour traiter votre demande et vous répondre. Ne transmettez pas de renseignements confidentiels, sensibles ou non nécessaires dans ce formulaire.",
      cvDisclaimer:
        "Veuillez téléverser uniquement les documents nécessaires à l'évaluation de votre profil professionnel. Évitez d'inclure des renseignements sensibles ou non pertinents. En transmettant un CV ou tout autre document, vous confirmez avoir le droit de le partager avec Juris Talent.",
      nonResponsibility:
        "Juris Talent agit uniquement comme agence de mise en relation / courtage. Toute décision liée à une entrevue, une offre, une collaboration, un stage, un emploi ou une embauche relève exclusivement des utilisateurs concernés."
    },
    pages: {
      home: {
        eyebrow: "Agence de mise en relation juridique",
        title: "Le renfort légal efficace et sur mesure",
        subtitle:
          "JurisTalent redéfinit le soutien légal au Québec en connectant instantanément les cabinets avec l'excellence de la relève étudiante.",
        mission:
          "Face à un mandat de recherche précis ou à une surcharge soudaine, nous ciblons les profils les plus pertinents pour votre pratique. Le résultat : un renfort immédiat, économique et 100 % flexible, sans aucun engagement à long terme.",
        primary: { label: "Découvrir les opportunités", href: "/fr/offres" },
        secondary: { label: "Recruter un talent juridique", href: "/fr/cabinet" },
        pathways: [
          {
            title: "Vous êtes étudiant",
            text: "Accédez à des opportunités juridiques adaptées à votre profil, votre niveau d'études et vos ambitions professionnelles.",
            cta: { label: "Devenir candidat", href: "/fr/postuler" }
          },
          {
            title: "Vous représentez un cabinet",
            text: "Présentez vos besoins, recevez des profils pertinents et gagnez du temps dans votre recherche de talents juridiques.",
            cta: { label: "Demander des profils", href: "/fr/cabinet/demander-des-profils" }
          }
        ],
        steps: [
          {
            title: "1. Présentez votre profil ou votre besoin",
            text: "Les étudiants soumettent leur candidature. Les cabinets précisent le type de profil recherché."
          },
          {
            title: "2. Juris Talent facilite la mise en relation",
            text: "Nous structurons les informations essentielles afin de créer des connexions plus pertinentes entre candidats et cabinets."
          },
          {
            title: "3. Les opportunités avancent avec clarté",
            text: "Les cabinets peuvent découvrir des profils qualifiés, et les étudiants peuvent accéder à des opportunités plus ciblées."
          }
        ],
        why: [
          {
            title: "Un levier de croissance immédiat",
            text: "Ne refusez plus de dossiers complexes par manque de ressources. En remplaçant la charge fixe d'une embauche traditionnelle par un investissement ponctuel et ciblé, vous maximisez directement la rentabilité de votre cabinet."
          },
          {
            title: "La fin des surcharges subies",
            text: "La pratique du droit est imprévisible, votre sérénité ne devrait pas l'être. Absorbez les pics d'activité, les délais de cour serrés et les urgences sans épuiser votre équipe actuelle ni compromettre la qualité de vos dossiers."
          },
          {
            title: "Un impact direct sur la relève",
            text: "Au-delà de la performance de vos propres dossiers, vous jouez un rôle clé dans la communauté. En collaborant avec JurisTalent, vous offrez un tremplin concret aux étudiants du Québec et façonnez activement l'excellence de la relève juridique."
          }
        ],
        final: {
          title: "Prêt à avancer vers la bonne opportunité juridique ?",
          text: "Que vous soyez étudiant en droit ou cabinet à la recherche de talents, Juris Talent vous aide à franchir la prochaine étape avec confiance.",
          student: { label: "Soumettre ma candidature", href: "/fr/postuler" },
          firm: { label: "Présenter un besoin de recrutement", href: "/fr/cabinet/demander-des-profils" }
        }
      },
      student: {
        title: "Propulsez votre carrière juridique avant même votre assermentation.",
        subtitle:
          "Juris Talent aide les étudiants en droit à se rendre visibles auprès de cabinets et d'employeurs juridiques à la recherche de profils motivés, sérieux et prometteurs.",
        primary: { label: "Postuler maintenant", href: "/fr/postuler" },
        secondary: { label: "Voir les opportunités", href: "/fr/offres" },
        benefits: [
          {
            title: "Accès à des opportunités ciblées",
            text: "Découvrez des opportunités juridiques qui correspondent davantage à votre profil, votre niveau et vos intérêts."
          },
          {
            title: "Meilleure visibilité auprès des cabinets",
            text: "Présentez votre parcours de manière claire et professionnelle afin d'être considéré par les bons interlocuteurs."
          },
          {
            title: "Processus simplifié",
            text: "Soumettez vos informations essentielles, votre CV et vos préférences en un seul endroit."
          },
          {
            title: "Développement professionnel",
            text: "Juris Talent vous aide à structurer votre entrée dans le marché juridique avec une approche plus stratégique."
          }
        ],
        steps: [
          {
            title: "1. Soumettez votre profil",
            text: "Remplissez le formulaire étudiant avec vos informations, votre université, votre niveau d'études et vos intérêts juridiques."
          },
          {
            title: "2. Ajoutez vos documents",
            text: "Téléversez votre CV ou indiquez les documents que vous souhaitez partager avec les cabinets."
          },
          {
            title: "3. Soyez considéré pour des opportunités pertinentes",
            text: "Votre profil pourra être utilisé pour faciliter la mise en relation avec des cabinets ou employeurs juridiques intéressés."
          }
        ],
        application: {
          title: "Soumettre votre candidature",
          text: "Présentez votre profil à Juris Talent afin d'être considéré pour des opportunités juridiques adaptées à votre parcours."
        },
        detail: {
          heading: "Le défi du parcours étudiant",
          paragraphs: [
            "Le parcours académique en droit est extrêmement exigeant. Les horaires de sessions, les périodes d'examens et la charge d'étude rendent souvent impossible l'engagement dans un emploi de soutien juridique à temps plein ou selon un horaire fixe. Pourtant, acquérir une expérience pratique, comprendre la réalité des cabinets et bâtir son réseau avant la Course aux stages ou la fin de ses études est un atout indispensable sur le marché actuel.",
            "Notre solution JurisTalent est conçu par et pour la réalité étudiante. Nous vous offrons l'opportunité de plonger dans la pratique concrète du droit en effectuant des mandats de soutien à la carte pour divers professionnels juridiques, à votre propre rythme."
          ],
          benefitsTitle: "Vos avantages avec JurisTalent :",
          benefits: [
            {
              title: "Bâtissez un portfolio concret",
              text: "Réalisez de véritables mandats de recherche, rédigez des mémos et participez à la préparation de dossiers réels. C'est l'occasion de transformer la théorie en pratique."
            },
            {
              title: "Expérience valorisée et rémunérée",
              text: "Mettez à profit vos compétences analytiques et rédactionnelles tout en étant rémunéré à votre juste valeur de consultant indépendant."
            },
            {
              title: "Une flexibilité absolue",
              text: "Vous gardez le contrôle de votre temps. Postulez uniquement sur les mandats qui s'intègrent à votre emploi du temps et respectent vos priorités académiques."
            },
            {
              title: "Explorez vos intérêts",
              text: "Ne vous limitez pas à un seul domaine. Testez vos affinités en travaillant ponctuellement sur des mandats variés (droit des affaires, droit du travail, litige civil, etc.) et élargissez votre réseau professionnel en collaborant avec différents avocats."
            }
          ]
        },
        faq: [
          {
            question: "Est-ce que Juris Talent garantit une offre ou une entrevue ?",
            answer:
              "Non. Juris Talent facilite la mise en relation entre étudiants et cabinets, mais ne garantit pas d'entrevue, d'offre d'emploi ou de stage."
          },
          {
            question: "Qui peut soumettre une candidature ?",
            answer:
              "Les étudiants en droit, les candidats à la recherche d'un stage, ainsi que les jeunes profils juridiques souhaitant se rendre visibles auprès de cabinets ou d'employeurs."
          },
          {
            question: "Puis-je postuler même si je n'ai pas encore beaucoup d'expérience ?",
            answer:
              "Oui. Votre motivation, vos intérêts, votre formation et votre sérieux peuvent aussi être pris en compte."
          },
          {
            question: "Mes informations sont-elles partagées automatiquement avec tous les cabinets ?",
            answer:
              "Non. Les informations sont utilisées dans le cadre de la mise en relation et doivent être traitées avec rigueur et confidentialité selon les politiques applicables."
          }
        ],
        final: {
          title: "Votre parcours juridique mérite d'être présenté avec sérieux.",
          text: "Soumettez votre profil et faites un pas de plus vers des opportunités mieux alignées avec vos ambitions.",
          cta: { label: "Créer mon profil candidat", href: "/fr/postuler" }
        }
      },
      firm: {
        title: "Cabinets & professionnels juridiques",
        subtitle:
          "Juris Talent aide les cabinets et employeurs juridiques à identifier des étudiants et jeunes profils juridiques plus pertinents, mieux présentés et alignés avec leurs besoins.",
        primary: { label: "Demander un profil", href: "/fr/cabinet/demander-des-profils" },
        secondary: { label: "Nous contacter", href: "/fr/contact" },
        benefits: [
          {
            title: "Gain de temps dans la recherche de talents",
            text: "Recevez des informations structurées afin d'évaluer plus rapidement les profils qui correspondent à vos critères."
          },
          {
            title: "Accès à une relève juridique ciblée",
            text: "Découvrez des étudiants et candidats intéressés par le milieu juridique québécois et motivés à développer leur carrière."
          },
          {
            title: "Processus plus clair",
            text: "Présentez vos besoins de recrutement, vos domaines de pratique et vos attentes dans un formulaire simple et professionnel."
          },
          {
            title: "Qualité de présentation des profils",
            text: "Les informations essentielles sont organisées pour faciliter la comparaison, la sélection et le suivi."
          }
        ],
        steps: [
          {
            title: "1. Décrivez votre besoin",
            text: "Indiquez le type de profil recherché, le domaine de pratique, le type d'opportunité et la période souhaitée."
          },
          {
            title: "2. Juris Talent structure la demande",
            text: "Votre demande est recueillie de manière claire afin de faciliter l'identification de profils pertinents."
          },
          {
            title: "3. Vous avancez avec les candidats sélectionnés",
            text: "Vous pouvez ensuite entrer en contact avec les profils qui correspondent le mieux à vos besoins internes."
          }
        ],
        request: {
          title: "Demander un profil",
          text: "Remplissez ce formulaire afin de nous transmettre les informations essentielles concernant votre cabinet, votre besoin et le type de profil recherché."
        },
        detail: {
          paragraphs: [
            "En cabinet, la charge de travail est par nature imprévisible. Les vagues de dossiers s'enchaînent, rendant souvent difficile et financièrement risqué le recrutement d'une ressource de soutien sur le long terme. Vous manquez parfois de bras pour la recherche complexe, la préparation de projets de procédures ou le tri documentaire, mais vous n'avez ni le temps de gérer un processus d'embauche lourd, ni la structure pour justifier un engagement permanent.",
            "Notre solution JurisTalent est conçu pour répondre précisément à ce besoin d'agilité. Nous vous connectons rapidement avec des étudiants en droit présélectionnés, prêts à intervenir en renfort sur des mandats spécifiques, sous votre supervision."
          ],
          benefitsTitle: "Vos avantages avec JurisTalent :",
          benefits: [
            {
              title: "Mise en relation éclair dans l'urgence",
              text: "Face à un délai serré, obtenez rapidement des propositions de profils disponibles pour vous soulager immédiatement."
            },
            {
              title: "Zéro engagement à long terme",
              text: "Engagez un étudiant pour un mémo spécifique, une semaine de débordement ou un mandat ponctuel. Aucune charge sociale continue, aucun coût fixe d'employé."
            },
            {
              title: "Présélection de haute qualité",
              text: "Nous ne laissons rien au hasard. Les candidats que nous vous présentons possèdent de solides compétences en recherche jurisprudentielle, en rédaction et en soutien administratif, vous garantissant un standard de travail rigoureux."
            },
            {
              title: "Flexibilité totale",
              text: "Du droit civil au droit du travail, en passant par le litige et le droit administratif, nous ciblons les talents dont les intérêts correspondent à la nature de vos mandats."
            }
          ]
        },
        faq: [
          {
            question: "Juris Talent est-il un cabinet de recrutement juridique ?",
            answer:
              "Juris Talent est une agence de mise en relation / courtage. Elle facilite la connexion entre talents juridiques et cabinets, sans offrir d'avis juridique ni garantir un recrutement."
          },
          {
            question: "Quels types de profils peut-on rechercher ?",
            answer:
              "Étudiants en droit, stagiaires, profils juniors, candidats intéressés par un domaine de pratique précis ou par une opportunité au sein d'un cabinet."
          },
          {
            question: "Est-ce que Juris Talent garantit la qualité ou la disponibilité des candidats ?",
            answer:
              "Non. L'évaluation finale, les vérifications et la décision de recrutement demeurent la responsabilité du cabinet."
          }
        ],
        final: {
          title: "Trouvez des profils juridiques plus pertinents, plus rapidement.",
          text: "Présentez votre besoin à Juris Talent et simplifiez votre prochaine recherche de talents.",
          cta: { label: "Demander un profil", href: "/fr/cabinet/demander-des-profils" }
        }
      },
      opportunities: {
        title: "Opportunités et mandats",
        subtitle:
          "Les opportunités et mandats seront disponibles bientôt. En attendant, les étudiants peuvent déjà soumettre leur profil afin d'être considérés lorsque des besoins alignés se présentent.",
        emptyTitle: "Les mandats arrivent bientôt",
        emptyText:
          "Nous préparons un espace clair pour présenter les mandats de soutien juridique disponibles. Soumettez votre profil dès maintenant pour faire partie de la relève que JurisTalent pourra considérer pour de futures mises en relation.",
        cta: { label: "Soumettre mon profil", href: "/fr/postuler" }
      },
      about: {
        title: "Une agence pensée pour rapprocher ambition juridique et besoin professionnel.",
        subtitle:
          "Juris Talent est née d'un objectif simple : rendre la mise en relation entre étudiants en droit et cabinets plus claire, plus professionnelle et plus efficace.",
        missionTitle: "NOTRE MISSION ET NOS VALEURS",
        mission:
          "Bâtir un pont entre les besoins immédiats des professionnels juridiques et l'excellence de la relève étudiante. Nous transformons l'imprévisibilité de la pratique en opportunité de croissance grâce à un modèle de soutien sur mesure.",
        valuesTitle: "Nos Valeurs en Action",
        story: [
          "Le parcours juridique peut être exigeant, compétitif et parfois difficile à naviguer. Pour les étudiants, il n'est pas toujours simple de se rendre visibles auprès des bons cabinets.",
          "Juris Talent a été conçue pour répondre à ce double enjeu : offrir aux étudiants une vitrine plus professionnelle et donner aux cabinets un point d'entrée plus clair vers la relève juridique."
        ],
        values: [
          { title: "Excellence", text: "L'urgence ne justifie aucun compromis. Nous ciblons rigoureusement les meilleurs profils pour garantir à vos dossiers un renfort intellectuel de la plus haute qualité." },
          { title: "Confiance", text: "La tranquillité d'esprit est le cœur de notre service. Nos maillages sont bâtis sur la fiabilité, la transparence et le respect absolu de la confidentialité inhérente à votre pratique." },
          { title: "Professionnalisme", text: "Dès la première heure d'un mandat, nos talents s'intègrent à votre structure avec l'éthique, le savoir-être et la posture attendus dans le milieu juridique." },
          { title: "Rigueur", text: "Parce que chaque détail compte, nos étudiants abordent la recherche jurisprudentielle et la rédaction avec une minutie chirurgicale pour vous livrer un travail irréprochable." },
          { title: "Innovation", text: "Nous bousculons le statu quo. En remplaçant les lourdeurs du recrutement traditionnel par un modèle d'engagement agile et ponctuel, nous modernisons la collaboration juridique." }
        ],
        audiences: [
          { title: "Pour les étudiants", text: "Juris Talent s'adresse aux étudiants en droit et jeunes profils juridiques qui souhaitent présenter leur parcours avec sérieux." },
          { title: "Pour les cabinets", text: "L'agence accompagne les cabinets et employeurs juridiques dans leur recherche de profils prometteurs, disponibles et pertinents." },
          { title: "Pour le marché juridique québécois", text: "Juris Talent vise à soutenir une meilleure circulation des opportunités et des talents dans l'écosystème juridique du Québec." }
        ],
        final: {
          title: "Construisons des connexions juridiques plus pertinentes.",
          student: { label: "Soumettre ma candidature", href: "/fr/postuler" },
          firm: { label: "Présenter un besoin", href: "/fr/cabinet/demander-des-profils" }
        }
      },
      contact: {
        title: "Contactez Juris Talent",
        subtitle:
          "Une question, une demande ou un besoin particulier ? Communiquez avec notre équipe afin que nous puissions vous orienter vers la bonne démarche.",
        info: [
          { title: "Courriel", text: "contact@juristalent.ca" },
          { title: "Téléphone", text: "À confirmer" },
          { title: "Localisation", text: "Québec, Canada" },
          { title: "Heures de réponse", text: "Nous répondons généralement aux demandes dans un délai de 2 à 3 jours ouvrables." }
        ]
      },
      legal: {
        terms: {
          title: "Conditions d'utilisation",
          sections: [
            { title: "1. Acceptation des conditions", body: ["En accédant au site Web de Juris Talent ou en utilisant ses formulaires, vous acceptez les présentes Conditions d'utilisation."] },
            { title: "2. Rôle de Juris Talent", body: ["Juris Talent est une agence de mise en relation / courtage entre étudiants, talents de soutien juridique, cabinets d'avocats et professionnels juridiques."] },
            { title: "3. Absence d'avis juridique", body: ["Juris Talent n'est pas un cabinet d'avocats et ne fournit aucun avis juridique, professionnel ou réglementaire."] },
            { title: "4. Aucune garantie de résultat", body: ["Juris Talent ne garantit pas l'obtention d'une entrevue, d'un stage, d'un emploi, d'un mandat, d'un candidat, d'une embauche ou d'un résultat professionnel."] },
            { title: "5. Responsabilité des utilisateurs", body: ["Les utilisateurs s'engagent à fournir des informations exactes, complètes et à jour. Les cabinets demeurent responsables de leurs décisions d'embauche et vérifications."] },
            { title: "6. Utilisation interdite", body: ["Il est interdit d'utiliser Juris Talent pour transmettre des informations fausses, trompeuses, discriminatoires, illégales ou contraires aux droits de tiers."] },
            { title: "7. Documents transmis", body: ["Tout CV, document, message ou information transmis par un utilisateur demeure sous la responsabilité de cet utilisateur."] },
            { title: "8. Modification du service", body: ["Juris Talent peut modifier, suspendre ou retirer certaines fonctionnalités du site dans le cadre de l'évolution du MVP."] },
            { title: "9. Limitation de responsabilité", body: ["Dans la mesure permise par les lois applicables, Juris Talent ne peut être tenue responsable des décisions de recrutement ou des résultats découlant d'une mise en relation."] },
            { title: "10. Droit applicable", body: ["Les présentes Conditions d'utilisation sont régies par les lois applicables au Québec et au Canada."] }
          ]
        },
        privacy: {
          title: "Politique de confidentialité",
          sections: [
            { title: "1. Introduction", body: ["Juris Talent respecte la confidentialité des renseignements personnels. Cette politique explique quels renseignements nous recueillons, pourquoi nous les recueillons et comment vous pouvez exercer vos droits."] },
            { title: "2. Renseignements recueillis", body: ["Nous pouvons recueillir des renseignements liés aux candidatures étudiantes, aux demandes de cabinets et aux formulaires de contact, notamment nom, courriel, téléphone, université, domaines d'intérêt, CV, cabinet, personne-ressource et message."] },
            { title: "3. Finalités de la collecte", body: ["Nous recueillons ces renseignements afin de recevoir les candidatures, comprendre les besoins des cabinets, faciliter des mises en relation potentielles et répondre aux messages de contact."] },
            { title: "4. Communication des renseignements", body: ["Les renseignements peuvent être consultés par l'équipe Juris Talent et, lorsque pertinent, communiqués à des cabinets ou employeurs juridiques. Juris Talent ne vend pas les renseignements personnels."] },
            { title: "5. Communication hors Québec", body: ["Certains fournisseurs techniques peuvent traiter des renseignements à l'extérieur du Québec. Lorsque requis, Juris Talent devrait évaluer les facteurs relatifs à la vie privée avant une telle communication."] },
            { title: "6. Durée de conservation", body: ["Juris Talent conserve les renseignements seulement pour la durée nécessaire aux fins décrites, sauf si une durée plus longue est requise ou permise par la loi."] },
            { title: "7. Sécurité", body: ["Juris Talent met en place des mesures raisonnables pour protéger les renseignements personnels. Aucun système n'est toutefois entièrement sécurisé."] },
            { title: "8. Vos droits", body: ["Sous réserve des lois applicables, vous pouvez demander l'accès à vos renseignements personnels, leur rectification, le retrait de votre consentement ou la suppression de certains renseignements."] },
            { title: "9. Responsable de la protection des renseignements personnels", body: ["Responsable à confirmer. Courriel : privacy@juristalent.ca ou contact@juristalent.ca. Adresse : à confirmer."] },
            { title: "10. Modifications", body: ["Juris Talent peut modifier cette Politique de confidentialité. Toute modification importante devrait être publiée sur le site et communiquée lorsque requis."] }
          ]
        },
        legal: {
          title: "Avis légal",
          sections: [
            {
              title: "Positionnement légal",
              body: [
                "Juris Talent est une agence de mise en relation / courtage entre talents de soutien juridique, étudiants en droit, cabinets d'avocats et professionnels juridiques.",
                "Juris Talent n'est pas un cabinet d'avocats, ne fournit aucun avis juridique et ne crée aucune relation avocat-client. Le contenu du site est fourni à titre informatif seulement.",
                "Juris Talent ne garantit pas l'obtention d'une entrevue, d'un stage, d'un emploi, d'un mandat, d'un candidat, d'une embauche ou d'un résultat professionnel.",
                "Les utilisateurs sont responsables de l'exactitude, de la mise à jour et de la légalité des renseignements, documents et messages qu'ils transmettent à Juris Talent."
              ]
            }
          ]
        }
      }
    },
    forms: {
      success: {
        student:
          "Votre candidature a bien été envoyée. Merci pour votre intérêt envers Juris Talent. Notre équipe pourra examiner votre profil et vous contacter si une opportunité pertinente se présente.",
        firm:
          "Votre demande a bien été envoyée. Merci de votre confiance. L'équipe Juris Talent examinera votre besoin et pourra vous contacter pour la suite.",
        contact: "Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais."
      },
      errors: {
        general: "Une erreur est survenue. Veuillez réessayer dans quelques instants.",
        required: "Veuillez remplir tous les champs obligatoires avant d'envoyer le formulaire.",
        email: "Veuillez entrer une adresse courriel valide.",
        file: "Veuillez téléverser un fichier au format accepté.",
        consent: "Vous devez accepter les conditions requises avant de soumettre ce formulaire."
      },
      student: {
        submit: "Envoyer ma candidature",
        consent:
          "J'accepte les Conditions d'utilisation et la Politique de confidentialité de Juris Talent. Je comprends que Juris Talent est une agence de mise en relation / courtage et ne garantit pas l'obtention d'une entrevue, d'un stage, d'un emploi ou d'une opportunité professionnelle.",
        fields: {
          firstName: "Prénom",
          lastName: "Nom",
          email: "Adresse courriel",
          phone: "Numéro de téléphone",
          university: "Université ou faculté de droit",
          program: "Programme d'études",
          yearOfStudy: "Année d'études",
          areasOfInterest: "Domaines d'intérêt juridique",
          opportunityType: "Type d'opportunité recherchée",
          availability: "Disponibilité",
          cv: "Téléverser votre CV",
          message: "Message optionnel",
          language: "Langue de communication préférée"
        },
        options: {
          years: ["1re année", "2e année", "3e année", "Maîtrise", "Barreau", "Autre"],
          opportunities: ["Stage", "Emploi étudiant", "Temps partiel", "Temps plein", "Recherche exploratoire", "Autre"],
          languages: ["Français", "Anglais", "Français et anglais"]
        }
      },
      firm: {
        submit: "Demander un profil",
        consent:
          "J'accepte les Conditions d'utilisation et la Politique de confidentialité de Juris Talent. Je reconnais que Juris Talent agit comme agence de mise en relation / courtage avec des profils juridiques potentiels, mais ne garantit pas la disponibilité, l'exactitude complète des informations, la performance, la sélection ou l'embauche d'un candidat.",
        acknowledgment:
          "Je reconnais que toute évaluation, vérification, entrevue, sélection ou décision d'embauche demeure sous la responsabilité du cabinet ou de l'employeur.",
        fields: {
          firmName: "Nom du cabinet ou de l'organisation",
          contactName: "Personne-ressource",
          email: "Adresse courriel professionnelle",
          phone: "Numéro de téléphone",
          practiceArea: "Domaine de pratique",
          profileType: "Type de profil recherché",
          opportunityType: "Type d'opportunité",
          startDate: "Date de début souhaitée",
          message: "Description du besoin",
          language: "Langue de communication préférée"
        },
        options: {
          opportunities: ["Stage", "Emploi étudiant", "Temps partiel", "Temps plein", "Recherche exploratoire", "Autre"],
          languages: ["Français", "Anglais", "Français et anglais"]
        }
      },
      contact: {
        submit: "Envoyer le message",
        fields: {
          name: "Nom complet",
          email: "Adresse courriel",
          userType: "Type de demande",
          subject: "Sujet",
          message: "Message"
        },
        userTypes: ["Étudiant", "Cabinet ou employeur juridique", "Autre"]
      }
    }
  },
  en: {
    meta: {
      title: "Juris Talent | Emerging legal talent and exceptional law firms",
      description:
        "Juris Talent connects Québec legal professionals with flexible legal support talent through a focused matching and brokerage agency."
    },
    nav: nav("en"),
    header: {
      firmAccess: "Law Firm Access"
    },
    footer: {
      disclaimer:
        "Juris Talent is a matching and brokerage agency connecting legal support talent with legal professionals. Juris Talent does not provide legal advice and does not guarantee an interview, internship, job, candidate, or hiring outcome.",
      line: "© Juris Talent. All rights reserved.",
      legalReview:
        "Legal pages, consents, and privacy practices should be reviewed by a qualified Québec legal professional before launch."
    },
    common: {
      studentCta: "Submit my application",
      firmCta: "Share a hiring need",
      required: "required",
      selectPlaceholder: "Select",
      fileHint: "PDF, DOC, or DOCX. Real storage to be connected in a future phase.",
      privacyNoticeStudent:
        "By submitting this form, you authorize Juris Talent to collect, use, and review the information provided in order to assess your profile, contact you where appropriate, and facilitate a potential connection with law firms or legal employers.",
      privacyNoticeFirm:
        "By submitting this form, you authorize Juris Talent to collect and use the information provided to understand your need, communicate with you, and facilitate a potential connection with candidates or legal talent.",
      privacyNoticeContact:
        "The information submitted through this form will be used only to process your request and respond to you. Please do not submit confidential, sensitive, or unnecessary information through this form.",
      cvDisclaimer:
        "Please upload only documents necessary to assess your professional profile. Avoid including sensitive or irrelevant information. By submitting a CV or any other document, you confirm that you have the right to share it with Juris Talent.",
      nonResponsibility:
        "Juris Talent acts solely as a matching and brokerage agency. Any decision relating to an interview, offer, collaboration, internship, job, or hire remains exclusively the responsibility of the users concerned."
    },
    pages: {
      home: {
        eyebrow: "Legal talent matching agency",
        title: "Efficient, tailored legal support",
        subtitle:
          "JurisTalent is redefining legal support in Québec by instantly connecting firms with the excellence of emerging student talent.",
        mission:
          "When a precise research mandate or sudden workload surge arises, we identify the most relevant profiles for your practice. The result: immediate, cost-effective, 100% flexible support with no long-term commitment.",
        primary: { label: "Discover opportunities", href: "/en/opportunities" },
        secondary: { label: "Recruit legal talent", href: "/en/law-firms" },
        pathways: [
          {
            title: "For students",
            text: "Access legal opportunities aligned with your profile, academic level, and professional ambitions.",
            cta: { label: "Become a candidate", href: "/en/apply" }
          },
          {
            title: "For law firms",
            text: "Share your hiring needs, receive relevant profiles, and save time in your search for legal talent.",
            cta: { label: "Request profiles", href: "/en/law-firms/request-profiles" }
          }
        ],
        steps: [
          {
            title: "1. Submit your profile or hiring need",
            text: "Students submit their candidate profile. Law firms describe the type of profile they are looking for."
          },
          {
            title: "2. Juris Talent facilitates the connection",
            text: "We structure the essential information to create more relevant connections between candidates and law firms."
          },
          {
            title: "3. Opportunities move forward with clarity",
            text: "Law firms can discover qualified profiles, and students can access more targeted legal opportunities."
          }
        ],
        why: [
          {
            title: "An immediate growth lever",
            text: "Stop turning away complex files because resources are stretched. By replacing the fixed burden of a traditional hire with a targeted, one-time investment, you directly maximize your firm's profitability."
          },
          {
            title: "The end of unmanaged overload",
            text: "The practice of law is unpredictable; your peace of mind should not be. Absorb activity peaks, tight court deadlines, and urgent needs without exhausting your current team or compromising file quality."
          },
          {
            title: "A direct impact on emerging talent",
            text: "Beyond the performance of your own files, you play a key role in the community. By collaborating with JurisTalent, you offer Québec students a concrete springboard and actively shape the excellence of the next legal generation."
          }
        ],
        final: {
          title: "Ready to move toward the right legal opportunity?",
          text: "Whether you are a law student or a firm looking for talent, Juris Talent helps you take the next step with confidence.",
          student: { label: "Submit my application", href: "/en/apply" },
          firm: { label: "Share a hiring need", href: "/en/law-firms/request-profiles" }
        }
      },
      student: {
        title: "Advance your legal career before you are even called to the bar.",
        subtitle:
          "Juris Talent helps law students become visible to firms and legal employers looking for motivated, serious, and promising profiles.",
        primary: { label: "Apply now", href: "/en/apply" },
        secondary: { label: "View opportunities", href: "/en/opportunities" },
        benefits: [
          { title: "Access targeted legal opportunities", text: "Discover opportunities that better match your profile, level, and areas of interest." },
          { title: "Increase your visibility with law firms", text: "Present your background clearly and professionally so the right decision-makers can consider your profile." },
          { title: "Simplify the process", text: "Submit your essential information, CV, and preferences in one place." },
          { title: "Support your professional growth", text: "Juris Talent helps you structure your entry into the legal market with a more strategic approach." }
        ],
        steps: [
          { title: "1. Submit your profile", text: "Complete the student form with your information, university, academic level, and legal interests." },
          { title: "2. Add your documents", text: "Upload your CV or indicate the documents you would like to share with law firms." },
          { title: "3. Be considered for relevant opportunities", text: "Your profile may be used to facilitate connections with interested law firms or legal employers." }
        ],
        application: {
          title: "Submit your application",
          text: "Present your profile to Juris Talent to be considered for legal opportunities aligned with your path."
        },
        detail: {
          heading: "The challenge of the student path",
          paragraphs: [
            "Legal studies are extremely demanding. Semester schedules, exam periods, and heavy coursework often make it impossible to commit to full-time legal support work or a fixed schedule. Yet gaining practical experience, understanding the reality of law firms, and building a network before recruitment season or graduation is an essential advantage in today's market.",
            "The JurisTalent solution is designed for the reality of student life. We give you the opportunity to step into the concrete practice of law by completing à la carte support mandates for various legal professionals, at your own pace."
          ],
          benefitsTitle: "Your advantages with JurisTalent:",
          benefits: [
            {
              title: "Build a concrete portfolio",
              text: "Complete real research mandates, draft memoranda, and contribute to the preparation of actual files. It is an opportunity to turn theory into practice."
            },
            {
              title: "Valued and paid experience",
              text: "Put your analytical and writing skills to work while being paid fairly for your value as an independent consultant."
            },
            {
              title: "Absolute flexibility",
              text: "You stay in control of your time. Apply only for mandates that fit your schedule and respect your academic priorities."
            },
            {
              title: "Explore your interests",
              text: "Do not limit yourself to one field. Test your affinities by working occasionally on varied mandates, from business law and labour law to civil litigation, while expanding your professional network with different lawyers."
            }
          ]
        },
        faq: [
          { question: "Does Juris Talent guarantee an interview or offer?", answer: "No. Juris Talent facilitates connections between students and law firms but does not guarantee interviews, offers, internships, or employment." },
          { question: "Who can submit an application?", answer: "Law students, candidates seeking internships, and junior legal profiles who want to become visible to law firms or legal employers." },
          { question: "Can I apply even if I do not have much experience yet?", answer: "Yes. Motivation, interests, academic background, and professionalism can also be considered." },
          { question: "Is my information automatically shared with every law firm?", answer: "No. Information is used for matching purposes and should be handled with care and confidentiality according to applicable policies." }
        ],
        final: {
          title: "Your legal path deserves to be presented professionally.",
          text: "Submit your profile and take one step closer to opportunities aligned with your ambitions.",
          cta: { label: "Create my candidate profile", href: "/en/apply" }
        }
      },
      firm: {
        title: "Law firms & legal professionals",
        subtitle:
          "Juris Talent helps law firms and legal employers identify more relevant, better-presented candidates aligned with their needs.",
        primary: { label: "Request a profile", href: "/en/law-firms/request-profiles" },
        secondary: { label: "Contact us", href: "/en/contact" },
        benefits: [
          { title: "Save time when searching for talent", text: "Receive structured information to evaluate profiles that match your criteria more efficiently." },
          { title: "Access targeted legal talent", text: "Discover students and candidates interested in Québec's legal market and motivated to develop their careers." },
          { title: "Clarify your hiring process", text: "Share your hiring needs, practice areas, and expectations through a simple professional form." },
          { title: "Improve profile presentation", text: "Essential information is organized to support comparison, selection, and follow-up." }
        ],
        steps: [
          { title: "1. Describe your need", text: "Indicate the type of profile, practice area, opportunity type, and preferred start date." },
          { title: "2. Juris Talent structures the request", text: "Your request is collected clearly to support the identification of relevant profiles." },
          { title: "3. Move forward with selected candidates", text: "You can then contact the profiles that best align with your internal needs." }
        ],
        request: {
          title: "Request a profile",
          text: "Complete this form to provide the essential information about your firm, your need, and the type of profile you are looking for."
        },
        detail: {
          paragraphs: [
            "In a legal practice, workload is inherently unpredictable. Waves of files follow one another, often making it difficult and financially risky to recruit a long-term support resource. You may need extra hands for complex research, draft proceedings, or document review, but you do not have the time to manage a heavy hiring process or the structure to justify a permanent commitment.",
            "The JurisTalent solution is designed precisely for this need for agility. We quickly connect you with preselected law students ready to provide support on specific mandates, under your supervision."
          ],
          benefitsTitle: "Your advantages with JurisTalent:",
          benefits: [
            {
              title: "Rapid matching in urgent situations",
              text: "When facing a tight deadline, quickly receive available profile suggestions to relieve your workload immediately."
            },
            {
              title: "No long-term commitment",
              text: "Engage a student for a specific memo, an overflow week, or a one-off mandate. No ongoing payroll burden and no fixed employee cost."
            },
            {
              title: "High-quality preselection",
              text: "We leave nothing to chance. The candidates we present have strong legal research, writing, and administrative support skills, helping maintain a rigorous work standard."
            },
            {
              title: "Total flexibility",
              text: "From civil law and labour law to litigation and administrative law, we target talent whose interests correspond to the nature of your mandates."
            }
          ]
        },
        faq: [
          { question: "Is Juris Talent a legal recruitment firm?", answer: "Juris Talent is a matching and brokerage agency. It facilitates connections between legal talent and law firms without providing legal advice or guaranteeing recruitment." },
          { question: "What types of profiles can we look for?", answer: "Law students, interns, junior profiles, candidates interested in a specific practice area, or candidates seeking opportunities within a firm." },
          { question: "Does Juris Talent guarantee candidate quality or availability?", answer: "No. Final evaluation, verification, and hiring decisions remain the responsibility of the law firm." }
        ],
        final: {
          title: "Find more relevant legal profiles, faster.",
          text: "Share your need with Juris Talent and simplify your next search for talent.",
          cta: { label: "Request a profile", href: "/en/law-firms/request-profiles" }
        }
      },
      opportunities: {
        title: "Opportunities and mandates",
        subtitle:
          "Opportunities and mandates will be available soon. In the meantime, students can already submit their profile to be considered when aligned needs arise.",
        emptyTitle: "Mandates are coming soon",
        emptyText:
          "We are preparing a clear space for available legal support mandates. Submit your profile now to join the pool of emerging talent JurisTalent may consider for future matches.",
        cta: { label: "Submit my profile", href: "/en/apply" }
      },
      about: {
        title: "An agency designed to connect legal ambition with professional need.",
        subtitle:
          "Juris Talent was created with a simple goal: to make connections between law students and firms clearer, more professional, and more efficient.",
        missionTitle: "OUR MISSION AND VALUES",
        mission:
          "To build a bridge between the immediate needs of legal professionals and the excellence of emerging student talent. We turn the unpredictability of practice into an opportunity for growth through a tailored support model.",
        valuesTitle: "Our Values in Action",
        story: [
          "Legal career paths can be demanding, competitive, and difficult to navigate. For students, becoming visible to the right firms is not always simple.",
          "Juris Talent was designed to address both challenges: giving students a more professional way to present themselves and giving firms a clearer access point to emerging legal talent."
        ],
        values: [
          { title: "Excellence", text: "Urgency never justifies compromise. We rigorously target the strongest profiles to provide your files with intellectual support of the highest quality." },
          { title: "Trust", text: "Peace of mind is at the heart of our service. Our matches are built on reliability, transparency, and absolute respect for the confidentiality inherent to your practice." },
          { title: "Professionalism", text: "From the first hour of a mandate, our talents integrate into your structure with the ethics, presence, and posture expected in the legal field." },
          { title: "Rigor", text: "Because every detail matters, our students approach legal research and writing with surgical precision to deliver impeccable work." },
          { title: "Innovation", text: "We challenge the status quo. By replacing the weight of traditional recruitment with an agile, one-off engagement model, we modernize legal collaboration." }
        ],
        audiences: [
          { title: "Students", text: "Juris Talent serves law students and junior legal profiles who want to present their background professionally and access targeted opportunities." },
          { title: "Law firms", text: "The agency supports law firms and legal employers looking for promising, available, and relevant profiles." },
          { title: "Québec's legal market", text: "Juris Talent aims to support better movement of opportunities and talent within Québec's legal ecosystem." }
        ],
        final: {
          title: "Let's build more relevant legal connections.",
          student: { label: "Submit my application", href: "/en/apply" },
          firm: { label: "Share a hiring need", href: "/en/law-firms/request-profiles" }
        }
      },
      contact: {
        title: "Contact Juris Talent",
        subtitle:
          "Have a question, request, or specific need? Contact our team so we can guide you toward the right next step.",
        info: [
          { title: "Email", text: "contact@juristalent.ca" },
          { title: "Phone", text: "To be confirmed" },
          { title: "Location", text: "Québec, Canada" },
          { title: "Response expectation", text: "We generally respond within 2 to 3 business days." }
        ]
      },
      legal: {
        terms: {
          title: "Terms of Use",
          sections: [
            { title: "1. Acceptance of Terms", body: ["By accessing the Juris Talent website or using its forms, you agree to these Terms of Use."] },
            { title: "2. Role of Juris Talent", body: ["Juris Talent is a matching and brokerage agency that connects students, legal support talent, law firms, and legal employers."] },
            { title: "3. No Legal Advice", body: ["Juris Talent is not a law firm and does not provide legal, professional, or regulatory advice."] },
            { title: "4. No Guarantee of Outcome", body: ["Juris Talent does not guarantee interviews, internships, jobs, mandates, candidates, hires, or professional outcomes."] },
            { title: "5. User Responsibility", body: ["Users agree to provide accurate, complete, and up-to-date information. Law firms remain responsible for candidate evaluation and hiring decisions."] },
            { title: "6. Prohibited Use", body: ["Users may not use Juris Talent to submit false, misleading, discriminatory, unlawful, defamatory, or third-party-infringing content."] },
            { title: "7. Submitted Documents", body: ["Any CV, document, message, or information submitted by a user remains that user's responsibility."] },
            { title: "8. Changes to the Service", body: ["Juris Talent may modify, suspend, or remove certain website features as the MVP evolves into a fuller service."] },
            { title: "9. Limitation of Liability", body: ["To the extent permitted by applicable law, Juris Talent is not responsible for hiring decisions or outcomes resulting from a connection."] },
            { title: "10. Governing Law", body: ["These Terms of Use are governed by the applicable laws of Québec and Canada."] }
          ]
        },
        privacy: {
          title: "Privacy Policy",
          sections: [
            { title: "1. Introduction", body: ["Juris Talent respects the privacy of personal information. This Privacy Policy explains what information we collect, why we collect it, and how you may exercise your rights."] },
            { title: "2. Information We Collect", body: ["We may collect information related to student applications, law firm requests, and contact forms, including name, email, phone, university, legal interests, CV, firm name, contact person, and message."] },
            { title: "3. Purposes of Collection", body: ["We collect this information to receive applications, understand law firm needs, facilitate potential connections, and respond to contact messages."] },
            { title: "4. Disclosure of Information", body: ["Information may be accessed by the Juris Talent team and, where relevant, shared with law firms or legal employers. Juris Talent does not sell personal information."] },
            { title: "5. Disclosure Outside Québec", body: ["Some technical providers may process information outside Québec. Where required, Juris Talent should conduct a privacy impact assessment before such disclosure."] },
            { title: "6. Retention", body: ["Juris Talent keeps personal information only for as long as necessary for the purposes described, unless a longer period is required or permitted by law."] },
            { title: "7. Security", body: ["Juris Talent uses reasonable safeguards to protect personal information. However, no system is completely secure."] },
            { title: "8. Your Rights", body: ["Subject to applicable laws, you may request access, correction, withdrawal of consent, or deletion of certain information."] },
            { title: "9. Privacy Officer", body: ["Privacy officer to be confirmed. Email: privacy@juristalent.ca or contact@juristalent.ca. Address: to be confirmed."] },
            { title: "10. Changes", body: ["Juris Talent may update this Privacy Policy. Any significant change should be posted on the website and communicated where required."] }
          ]
        },
        legal: {
          title: "Legal Notice",
          sections: [
            {
              title: "Legal positioning",
              body: [
                "Juris Talent is a matching and brokerage agency that connects legal support talent, law students, law firms, and legal employers.",
                "Juris Talent is not a law firm, does not provide legal advice, and does not create a lawyer-client relationship. The content on the website is provided for informational purposes only.",
                "Juris Talent does not guarantee interviews, internships, jobs, mandates, candidates, hires, or professional outcomes.",
                "Users are responsible for the accuracy, currency, and legality of the information, documents, and messages they submit to Juris Talent."
              ]
            }
          ]
        }
      }
    },
    forms: {
      success: {
        student:
          "Your application has been submitted successfully. Thank you for your interest in Juris Talent. Our team may review your profile and contact you if a relevant opportunity arises.",
        firm:
          "Your request has been submitted successfully. Thank you for your trust. The Juris Talent team will review your need and may contact you regarding next steps.",
        contact: "Your message has been sent successfully. We will respond as soon as possible."
      },
      errors: {
        general: "Something went wrong. Please try again in a few moments.",
        required: "Please complete all required fields before submitting the form.",
        email: "Please enter a valid email address.",
        file: "Please upload a file in an accepted format.",
        consent: "You must accept the required terms before submitting this form."
      },
      student: {
        submit: "Submit my application",
        consent:
          "I accept Juris Talent's Terms of Use and Privacy Policy. I understand that Juris Talent is a matching and brokerage agency and does not guarantee an interview, internship, job, or professional opportunity.",
        fields: {
          firstName: "First name",
          lastName: "Last name",
          email: "Email address",
          phone: "Phone number",
          university: "University or law faculty",
          program: "Study program",
          yearOfStudy: "Year of study",
          areasOfInterest: "Legal areas of interest",
          opportunityType: "Type of opportunity sought",
          availability: "Availability",
          cv: "Upload your CV",
          message: "Optional message",
          language: "Preferred communication language"
        },
        options: {
          years: ["1st year", "2nd year", "3rd year", "Master's", "Bar school", "Other"],
          opportunities: ["Internship", "Student job", "Part-time", "Full-time", "Exploratory search", "Other"],
          languages: ["French", "English", "French and English"]
        }
      },
      firm: {
        submit: "Request a profile",
        consent:
          "I accept Juris Talent's Terms of Use and Privacy Policy. I acknowledge that Juris Talent acts as a matching and brokerage agency with potential legal profiles but does not guarantee availability, complete accuracy of information, performance, selection, or hiring of any candidate.",
        acknowledgment:
          "I acknowledge that any evaluation, verification, interview, selection, or hiring decision remains the responsibility of the law firm or employer.",
        fields: {
          firmName: "Firm or organization name",
          contactName: "Contact person",
          email: "Professional email address",
          phone: "Phone number",
          practiceArea: "Practice area",
          profileType: "Type of profile needed",
          opportunityType: "Type of opportunity",
          startDate: "Preferred start date",
          message: "Description of need",
          language: "Preferred communication language"
        },
        options: {
          opportunities: ["Internship", "Student job", "Part-time", "Full-time", "Exploratory search", "Other"],
          languages: ["French", "English", "French and English"]
        }
      },
      contact: {
        submit: "Send message",
        fields: {
          name: "Full name",
          email: "Email address",
          userType: "Request type",
          subject: "Subject",
          message: "Message"
        },
        userTypes: ["Student", "Law firm or legal employer", "Other"]
      }
    }
  }
};
