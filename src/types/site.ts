export type Locale = "fr" | "en";

export type PageKey =
  | "home"
  | "student"
  | "opportunities"
  | "opportunityDetail"
  | "apply"
  | "firm"
  | "firmRequest"
  | "postOpportunity"
  | "about"
  | "contact"
  | "login"
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
