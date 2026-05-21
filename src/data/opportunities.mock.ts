import type { Locale } from "@/types/site";

type Localized = Record<Locale, string>;

export type OpportunityStatus = "draft" | "pending_review" | "published" | "closed";

export type Opportunity = {
  id: string;
  slug: string;
  title: Localized;
  firmName: string;
  location: string;
  workMode: Localized;
  opportunityType: Localized;
  practiceArea: Localized;
  studyLevel: Localized;
  languageRequirements: Localized;
  startDate: Localized;
  applicationDeadline: Localized;
  description: Localized;
  shortDescription: Localized;
  responsibilities: Localized[];
  requirements: Localized[];
  preferredProfile: Localized;
  documentsRequired: Localized[];
  tags: Localized[];
  datePosted: Localized;
  status: OpportunityStatus;
  createdAt: string;
  updatedAt: string;
};

export type Application = {
  id: string;
  opportunityId: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  university: string;
  program: string;
  yearOfStudy: string;
  cvUrl?: string;
  message?: string;
  consentAccepted: boolean;
  submittedAt: string;
  status: "new" | "reviewing" | "shared" | "closed";
};

export const opportunities: Opportunity[] = [
  {
    id: "opp-001",
    slug: "stagiaire-juridique-droit-affaires",
    title: {
      fr: "Stagiaire juridique — Droit des affaires",
      en: "Legal Intern — Business Law"
    },
    firmName: "Cabinet juridique confidentiel",
    location: "Montréal, QC",
    workMode: { fr: "Hybride", en: "Hybrid" },
    opportunityType: { fr: "Stage", en: "Internship" },
    practiceArea: { fr: "Droit des affaires", en: "Business law" },
    studyLevel: { fr: "2e ou 3e année", en: "2nd or 3rd year" },
    languageRequirements: { fr: "Français et anglais fonctionnel", en: "French and functional English" },
    startDate: { fr: "Été 2026", en: "Summer 2026" },
    applicationDeadline: { fr: "À confirmer", en: "To be confirmed" },
    shortDescription: {
      fr: "Soutien en recherche, rédaction de mémos et préparation de dossiers transactionnels sous supervision.",
      en: "Support with research, memo drafting, and preparation of transactional files under supervision."
    },
    description: {
      fr: "Un cabinet juridique confidentiel cherche un profil étudiant sérieux pour soutenir son équipe en droit des affaires sur des mandats ciblés.",
      en: "A confidential law firm is seeking a serious student profile to support its business law team on targeted mandates."
    },
    responsibilities: [
      { fr: "Effectuer des recherches juridiques ciblées.", en: "Conduct targeted legal research." },
      { fr: "Préparer des notes de synthèse et mémos internes.", en: "Prepare summaries and internal memoranda." },
      { fr: "Soutenir l'organisation de documents de dossiers.", en: "Support file document organization." }
    ],
    requirements: [
      { fr: "Formation en droit en cours.", en: "Current legal studies." },
      { fr: "Excellentes capacités de rédaction.", en: "Excellent writing skills." },
      { fr: "Rigueur, discrétion et sens des priorités.", en: "Rigor, discretion, and priority management." }
    ],
    preferredProfile: {
      fr: "Profil curieux, autonome et intéressé par les transactions commerciales et la recherche appliquée.",
      en: "Curious, autonomous profile interested in commercial transactions and applied research."
    },
    documentsRequired: [
      { fr: "CV", en: "Resume" },
      { fr: "Relevé de notes, si disponible", en: "Transcript, if available" }
    ],
    tags: [
      { fr: "Droit des affaires", en: "Business law" },
      { fr: "Hybride", en: "Hybrid" },
      { fr: "Stage", en: "Internship" }
    ],
    datePosted: { fr: "Publié récemment", en: "Recently posted" },
    status: "published",
    createdAt: "2026-05-01T12:00:00.000Z",
    updatedAt: "2026-05-01T12:00:00.000Z"
  },
  {
    id: "opp-002",
    slug: "assistant-juridique-etudiant",
    title: {
      fr: "Assistant juridique étudiant",
      en: "Student Legal Assistant"
    },
    firmName: "Employeur juridique",
    location: "Québec, QC",
    workMode: { fr: "Présentiel", en: "In-person" },
    opportunityType: { fr: "Temps partiel", en: "Part-time" },
    practiceArea: { fr: "Litige civil", en: "Civil litigation" },
    studyLevel: { fr: "1re année et plus", en: "1st year and above" },
    languageRequirements: { fr: "Français", en: "French" },
    startDate: { fr: "Dès que possible", en: "As soon as possible" },
    applicationDeadline: { fr: "Ouvert jusqu'à ce que le poste soit comblé", en: "Open until filled" },
    shortDescription: {
      fr: "Appui à la préparation de dossiers, au tri documentaire et aux recherches de base en litige civil.",
      en: "Support with file preparation, document sorting, and foundational civil litigation research."
    },
    description: {
      fr: "Une organisation juridique cherche un étudiant disponible à temps partiel pour appuyer une équipe active en litige civil.",
      en: "A legal employer is seeking a part-time student to support an active civil litigation team."
    },
    responsibilities: [
      { fr: "Organiser et résumer des documents de dossiers.", en: "Organize and summarize file documents." },
      { fr: "Soutenir la préparation de chronologies.", en: "Support preparation of timelines." },
      { fr: "Effectuer des recherches ponctuelles.", en: "Conduct occasional research." }
    ],
    requirements: [
      { fr: "Disponibilité régulière en semaine.", en: "Regular weekday availability." },
      { fr: "Sens de l'organisation et souci du détail.", en: "Organization and attention to detail." },
      { fr: "Intérêt pour le litige civil.", en: "Interest in civil litigation." }
    ],
    preferredProfile: {
      fr: "Profil méthodique souhaitant découvrir la réalité pratique des dossiers litigieux.",
      en: "Methodical profile looking to discover the practical reality of litigation files."
    },
    documentsRequired: [
      { fr: "CV", en: "Resume" }
    ],
    tags: [
      { fr: "Litige civil", en: "Civil litigation" },
      { fr: "Temps partiel", en: "Part-time" },
      { fr: "Présentiel", en: "In-person" }
    ],
    datePosted: { fr: "Publié cette semaine", en: "Posted this week" },
    status: "published",
    createdAt: "2026-05-05T12:00:00.000Z",
    updatedAt: "2026-05-05T12:00:00.000Z"
  },
  {
    id: "opp-003",
    slug: "candidat-junior-recherche-juridique",
    title: {
      fr: "Candidat junior — Recherche juridique",
      en: "Junior Candidate — Legal Research"
    },
    firmName: "Organisation juridique",
    location: "Télétravail / Québec",
    workMode: { fr: "Télétravail", en: "Remote" },
    opportunityType: { fr: "Mandat étudiant", en: "Student mandate" },
    practiceArea: { fr: "Recherche juridique", en: "Legal research" },
    studyLevel: { fr: "2e année et plus", en: "2nd year and above" },
    languageRequirements: { fr: "Français écrit avancé", en: "Advanced written French" },
    startDate: { fr: "Flexible", en: "Flexible" },
    applicationDeadline: { fr: "À confirmer", en: "To be confirmed" },
    shortDescription: {
      fr: "Mandats ponctuels de recherche jurisprudentielle et rédaction de synthèses pour professionnels juridiques.",
      en: "Occasional legal research mandates and summary drafting for legal professionals."
    },
    description: {
      fr: "Une organisation juridique recherche un candidat junior pour effectuer des mandats de recherche structurés à distance.",
      en: "A legal organization is looking for a junior candidate to complete structured remote research mandates."
    },
    responsibilities: [
      { fr: "Identifier la jurisprudence et la doctrine pertinentes.", en: "Identify relevant case law and doctrine." },
      { fr: "Rédiger des synthèses claires et structurées.", en: "Draft clear, structured summaries." },
      { fr: "Communiquer l'avancement des recherches avec professionnalisme.", en: "Communicate research progress professionally." }
    ],
    requirements: [
      { fr: "Excellente maîtrise de la recherche juridique.", en: "Strong command of legal research." },
      { fr: "Autonomie en télétravail.", en: "Autonomy in remote work." },
      { fr: "Respect strict de la confidentialité.", en: "Strict respect for confidentiality." }
    ],
    preferredProfile: {
      fr: "Profil analytique et précis, à l'aise avec la recherche approfondie et les échéanciers courts.",
      en: "Analytical and precise profile comfortable with in-depth research and short deadlines."
    },
    documentsRequired: [
      { fr: "CV", en: "Resume" },
      { fr: "Court exemple de rédaction, si disponible", en: "Short writing sample, if available" }
    ],
    tags: [
      { fr: "Recherche juridique", en: "Legal research" },
      { fr: "Télétravail", en: "Remote" },
      { fr: "Mandat étudiant", en: "Student mandate" }
    ],
    datePosted: { fr: "Publié récemment", en: "Recently posted" },
    status: "published",
    createdAt: "2026-05-10T12:00:00.000Z",
    updatedAt: "2026-05-10T12:00:00.000Z"
  }
];

export function getOpportunityBySlug(slug: string | undefined) {
  return opportunities.find((opportunity) => opportunity.slug === slug);
}
