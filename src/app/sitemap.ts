import type { MetadataRoute } from "next";
import { opportunities } from "@/data/opportunities.mock";

const baseUrl = "https://www.juristalent.ca";

const staticRoutes = [
  "/fr",
  "/fr/etudiant",
  "/fr/offres",
  "/fr/postuler",
  "/fr/cabinet",
  "/fr/cabinet/demander-des-profils",
  "/fr/cabinet/publier-une-offre",
  "/fr/a-propos",
  "/fr/contact",
  "/fr/conditions-utilisation",
  "/fr/politique-confidentialite",
  "/fr/avis-legal",
  "/fr/connexion",
  "/en",
  "/en/student",
  "/en/opportunities",
  "/en/apply",
  "/en/law-firms",
  "/en/law-firms/request-profiles",
  "/en/law-firms/post-opportunity",
  "/en/about",
  "/en/contact",
  "/en/terms-of-use",
  "/en/privacy-policy",
  "/en/legal-notice",
  "/en/login"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const opportunityRoutes = opportunities.flatMap((opportunity) => [
    `/fr/offres/${opportunity.slug}`,
    `/en/opportunities/${opportunity.slug}`
  ]);

  return [...staticRoutes, ...opportunityRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/fr" || route === "/en" ? 1 : 0.7
  }));
}
