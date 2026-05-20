export type Locale = "fr" | "en";

export type PageKey =
  | "home"
  | "student"
  | "opportunities"
  | "apply"
  | "firm"
  | "firmRequest"
  | "about"
  | "contact"
  | "terms"
  | "privacy"
  | "legal";

export type NavigationItem = {
  key: PageKey;
  label: string;
  href: string;
};

export type LocalizedRoute = {
  fr: string;
  en: string;
};

export type MessageTone = "success" | "error";
