import type { Locale, PageKey } from "@/types/site";

export const locales: Locale[] = ["fr", "en"];

export const defaultLocale: Locale = "fr";

export const routeMap: Record<PageKey, { fr: string; en: string }> = {
  home: { fr: "/fr", en: "/en" },
  student: { fr: "/fr/etudiant", en: "/en/student" },
  opportunities: { fr: "/fr/offres", en: "/en/opportunities" },
  apply: { fr: "/fr/postuler", en: "/en/apply" },
  firm: { fr: "/fr/cabinet", en: "/en/law-firms" },
  firmRequest: {
    fr: "/fr/cabinet/demander-des-profils",
    en: "/en/law-firms/request-profiles"
  },
  about: { fr: "/fr/a-propos", en: "/en/about" },
  contact: { fr: "/fr/contact", en: "/en/contact" },
  terms: { fr: "/fr/conditions-utilisation", en: "/en/terms-of-use" },
  privacy: {
    fr: "/fr/politique-confidentialite",
    en: "/en/privacy-policy"
  },
  legal: { fr: "/fr/avis-legal", en: "/en/legal-notice" }
};

export const slugToPageKey: Record<Locale, Record<string, PageKey>> = {
  fr: {
    "": "home",
    etudiant: "student",
    offres: "opportunities",
    postuler: "apply",
    cabinet: "firm",
    "cabinet/demander-des-profils": "firmRequest",
    "a-propos": "about",
    contact: "contact",
    "conditions-utilisation": "terms",
    "politique-confidentialite": "privacy",
    "avis-legal": "legal"
  },
  en: {
    "": "home",
    student: "student",
    opportunities: "opportunities",
    apply: "apply",
    "law-firms": "firm",
    "law-firms/request-profiles": "firmRequest",
    about: "about",
    contact: "contact",
    "terms-of-use": "terms",
    "privacy-policy": "privacy",
    "legal-notice": "legal"
  }
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getPageKey(locale: Locale, slug?: string[]) {
  return slugToPageKey[locale][(slug ?? []).join("/")];
}

export function localizedHref(key: PageKey, locale: Locale) {
  return routeMap[key][locale];
}
