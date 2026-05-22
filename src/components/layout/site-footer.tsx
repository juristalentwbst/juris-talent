import Link from "next/link";
import { content } from "@/content/site";
import { localizedHref } from "@/lib/routes";
import type { Locale } from "@/types/site";
import { Container } from "@/components/ui/section";
import { LanguageToggle } from "./language-toggle";
import { Logo } from "./logo";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = content[locale];
  const legalLinks = [
    { label: locale === "fr" ? "Conditions d'utilisation" : "Terms of Use", href: localizedHref("terms", locale) },
    { label: locale === "fr" ? "Politique de confidentialité" : "Privacy Policy", href: localizedHref("privacy", locale) },
    { label: locale === "fr" ? "Avis légal" : "Legal Notice", href: localizedHref("legal", locale) }
  ];

  return (
    <footer className="bg-navy py-12 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="inline-block rounded-brand bg-white p-3">
              <Logo locale={locale} />
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-white/75">{t.footer.disclaimer}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Navigation</h2>
            <div className="mt-4 grid gap-3">
              {t.nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/75 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">Legal</h2>
            <div className="mt-4 grid gap-3">
              {legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/75 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
              <a href="mailto:contact@juristalent.ca" className="text-sm text-white/75 transition hover:text-white">
                contact@juristalent.ca
              </a>
              <a href="tel:+14384104224" className="text-sm text-white/75 transition hover:text-white">
                {locale === "fr" ? "Téléphone : 438-410-4224" : "Phone: 438-410-4224"}
              </a>
              <LanguageToggle
                locale={locale}
                pageKey="home"
                className="w-fit rounded-brand border border-white/25 px-3 py-2 text-sm font-bold text-white/85 transition hover:border-gold hover:text-white"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/60">
          <p>{t.footer.line}</p>
          <p className="mt-2">{t.footer.legalReview}</p>
        </div>
      </Container>
    </footer>
  );
}
