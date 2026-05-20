import type { Locale } from "@/types/site";

export type Opportunity = {
  id: string;
  title: Record<Locale, string>;
  firm: string;
  location: string;
  type: Record<Locale, string>;
  practice: Record<Locale, string>;
  description: Record<Locale, string>;
};

export const opportunities: Opportunity[] = [
  {
    id: "summer-internship",
    title: {
      fr: "Stage d'été en litige civil",
      en: "Summer internship in civil litigation"
    },
    firm: "Cabinet partenaire à confirmer",
    location: "Montréal, QC",
    type: { fr: "Stage", en: "Internship" },
    practice: { fr: "Litige civil", en: "Civil litigation" },
    description: {
      fr: "Une opportunité mock pour un profil étudiant rigoureux souhaitant découvrir le travail en litige.",
      en: "A mock opportunity for a detail-oriented student profile interested in litigation work."
    }
  },
  {
    id: "student-job",
    title: {
      fr: "Emploi étudiant en droit des affaires",
      en: "Student job in business law"
    },
    firm: "Employeur juridique à confirmer",
    location: "Québec, QC",
    type: { fr: "Temps partiel", en: "Part-time" },
    practice: { fr: "Droit des affaires", en: "Business law" },
    description: {
      fr: "Un exemple de mandat étudiant pour soutenir la recherche, la préparation de dossiers et la veille juridique.",
      en: "A sample student role supporting research, file preparation, and legal monitoring."
    }
  },
  {
    id: "exploratory",
    title: {
      fr: "Banque de profils juniors",
      en: "Junior candidate pool"
    },
    firm: "Juris Talent",
    location: "Québec, Canada",
    type: { fr: "Recherche exploratoire", en: "Exploratory search" },
    practice: { fr: "Domaines variés", en: "Various practice areas" },
    description: {
      fr: "Soumettez votre profil afin d'être considéré pour des opportunités futures alignées avec vos intérêts.",
      en: "Submit your profile to be considered for future opportunities aligned with your interests."
    }
  }
];
