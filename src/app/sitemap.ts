import type { MetadataRoute } from "next";

const baseUrl = "https://www.juristalent.ca";

const staticRoutes = [
  "/fr",
  "/fr/etudiant",
  "/fr/offres",
  "/fr/postuler",
  "/fr/cabinet",
  "/fr/cabinet/demander-des-profils",
  "/fr/a-propos",
  "/fr/contact",
  "/fr/conditions-utilisation",
  "/fr/politique-confidentialite",
  "/fr/avis-legal",
  "/en",
  "/en/student",
  "/en/opportunities",
  "/en/apply",
  "/en/law-firms",
  "/en/law-firms/request-profiles",
  "/en/about",
  "/en/contact",
  "/en/terms-of-use",
  "/en/privacy-policy",
  "/en/legal-notice"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/fr" || route === "/en" ? 1 : 0.7
  }));
}
