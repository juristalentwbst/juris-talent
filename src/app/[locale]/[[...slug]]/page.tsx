import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BriefcaseBusiness, GraduationCap, Scale, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { CabinetRequestForm } from "@/components/forms/cabinet-request-form";
import { ContactForm } from "@/components/forms/contact-form";
import { OpportunityPostingForm } from "@/components/forms/opportunity-posting-form";
import { StudentApplicationForm } from "@/components/forms/student-application-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { content } from "@/content/site";
import { getOpportunityBySlug, opportunities } from "@/data/opportunities.mock";
import { getOpportunitySlug, getPageKey, isLocale, localizedHref, routeMap } from "@/lib/routes";
import type { Locale, PageKey } from "@/types/site";

type PageProps = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) {
    return {};
  }
  const pageKey = getPageKey(rawLocale, slug);
  if (!pageKey) {
    return {};
  }
  const canonicalPath = `/${[rawLocale, ...(slug ?? [])].join("/")}`;
  const title = getMetaTitle(rawLocale, pageKey, getOpportunitySlug(rawLocale, slug));
  const description = getMetaDescription(rawLocale, pageKey);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      images: ["/logo/juris-talent-logo.png"]
    }
  };
}

function getMetaTitle(locale: Locale, pageKey: PageKey, opportunitySlug?: string) {
  if (pageKey === "home") {
    return locale === "fr"
      ? "Juris Talent | Relève juridique et cabinets au Québec"
      : "Juris Talent | Tailored Legal Support in Québec";
  }
  if (pageKey === "opportunityDetail") {
    const opportunity = getOpportunityBySlug(opportunitySlug);
    return opportunity ? opportunity.title[locale] : content[locale].pages.opportunities.title;
  }
  const labels: Record<PageKey, Record<Locale, string>> = {
    home: { fr: "Juris Talent", en: "Juris Talent" },
    student: { fr: "Étudiant", en: "Student" },
    opportunities: { fr: "Mandats bientôt disponibles", en: "Mandates Coming Soon" },
    opportunityDetail: { fr: "Offre", en: "Opportunity" },
    apply: { fr: "Postuler", en: "Apply" },
    firm: { fr: "Nos services", en: "Our Services" },
    firmRequest: { fr: "Demander un profil", en: "Request a Profile" },
    postOpportunity: { fr: "Soumettre un besoin", en: "Submit a Need" },
    about: { fr: "À propos", en: "About" },
    contact: { fr: "Contact", en: "Contact" },
    login: { fr: "Espaces privés", en: "Private Access" },
    terms: { fr: "Conditions d'utilisation", en: "Terms of Use" },
    privacy: { fr: "Politique de confidentialité", en: "Privacy Policy" },
    legal: { fr: "Avis légal", en: "Legal Notice" }
  };
  return labels[pageKey][locale];
}

function getMetaDescription(locale: Locale, pageKey: PageKey) {
  if (pageKey === "home") {
    return locale === "fr"
      ? "Juris Talent est une agence de mise en relation entre talents juridiques et professionnels du droit au Québec."
      : "Juris Talent is a legal talent connection agency serving legal talent and legal professionals in Québec.";
  }
  if (pageKey === "opportunities" || pageKey === "opportunityDetail") {
    return content[locale].pages.opportunities.subtitle;
  }
  return content[locale].meta.description;
}

export function generateStaticParams() {
  return Object.entries(routeMap).flatMap(([, route]) =>
    Object.entries(route).map(([locale, href]) => ({
      locale,
      slug: href.split("/").filter(Boolean).slice(1)
    }))
  ).concat(
    opportunities.flatMap((opportunity) => [
      { locale: "fr", slug: ["offres", opportunity.slug] },
      { locale: "en", slug: ["opportunities", opportunity.slug] }
    ])
  );
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale;
  const pageKey = getPageKey(locale, slug);
  if (!pageKey) {
    notFound();
  }

  return (
    <>
      <SiteHeader locale={locale} pageKey={pageKey} />
      <main>
        <PageSwitch locale={locale} pageKey={pageKey} slug={slug} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function PageSwitch({ locale, pageKey, slug }: { locale: Locale; pageKey: PageKey; slug?: string[] }) {
  switch (pageKey) {
    case "home":
      return <HomePage locale={locale} />;
    case "student":
      return <StudentPage locale={locale} />;
    case "opportunities":
      return <OpportunitiesPage locale={locale} />;
    case "opportunityDetail":
      return <OpportunityDetailPage locale={locale} slug={getOpportunitySlug(locale, slug)} />;
    case "apply":
      return <ApplyPage locale={locale} />;
    case "firm":
      return <FirmPage locale={locale} />;
    case "firmRequest":
      return <FirmRequestPage locale={locale} />;
    case "postOpportunity":
      return <PostOpportunityPage locale={locale} />;
    case "about":
      return <AboutPage locale={locale} />;
    case "contact":
      return <ContactPage locale={locale} />;
    case "login":
      return <PrivateAccessPage locale={locale} />;
    case "terms":
    case "privacy":
    case "legal":
      return <LegalPage locale={locale} pageKey={pageKey} />;
    default:
      return null;
  }
}

function HomePage({ locale }: { locale: Locale }) {
  const t = content[locale].pages.home;
  return (
    <>
      <Section tone="cream" className="pb-14 pt-12 sm:pb-20 sm:pt-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              {t.eyebrow ? <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">{t.eyebrow}</p> : null}
              <h1 className="font-heading text-5xl leading-tight text-navy sm:text-6xl lg:text-7xl">{t.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-navy/75">{t.subtitle}</p>
              {t.mission ? <p className="mt-5 max-w-2xl border-l-2 border-gold pl-5 text-base leading-7 text-navy/75">{t.mission}</p> : null}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={t.primary.href}>{t.primary.label}</ButtonLink>
                <ButtonLink href={t.secondary.href} variant="secondary">{t.secondary.label}</ButtonLink>
              </div>
            </div>
            <Card className="border-gold/40 bg-white p-8">
              <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-brand bg-cream text-gold">
                <Sparkles aria-hidden="true" />
              </div>
              <h2 className="font-heading text-3xl text-navy">{locale === "fr" ? "Un parcours plus clair" : "A clearer path"}</h2>
              <div className="mt-8 grid gap-5">
                {t.steps.map((step) => (
                  <div key={step.title} className="border-l-2 border-gold pl-4">
                    <h3 className="font-semibold text-navy">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-navy/70">{step.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {t.pathways.map((item, index) => (
              <Card key={item.title}>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-brand bg-cream text-gold">
                  {index === 0 ? <GraduationCap aria-hidden="true" /> : <BriefcaseBusiness aria-hidden="true" />}
                </div>
                <h2 className="font-heading text-3xl text-navy">{item.title}</h2>
                <p className="mt-3 min-h-20 text-base leading-7 text-navy/70">{item.text}</p>
                <ButtonLink href={item.cta.href} variant="secondary" className="mt-5">{item.cta.label}</ButtonLink>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      <FeatureSections
        locale={locale}
        title={locale === "fr" ? "Comment ça fonctionne" : "How it works"}
        features={t.steps}
        whyTitle={locale === "fr" ? "Pourquoi Juris Talent" : "Why Juris Talent"}
        why={t.why}
      />
      <FinalCta title={t.final.title} text={t.final.text} first={t.final.student} second={t.final.firm} />
    </>
  );
}

function StudentPage({ locale }: { locale: Locale }) {
  const t = content[locale].pages.student;
  return (
    <>
      <Hero title={t.title} subtitle={t.subtitle} primary={t.primary} secondary={t.secondary} />
      <FeatureSections
        locale={locale}
        title={locale === "fr" ? "Bénéfices" : "Benefits"}
        features={t.benefits}
        whyTitle={locale === "fr" ? "Comment ça fonctionne" : "How it works"}
        why={t.steps}
      />
      <Section id={locale === "fr" ? "formulaire" : "application-form"} tone="cream">
        <Container>
          <DetailBlock block={t.detail} />
          <SectionHeading title={t.application.title} text={t.application.text} />
          <Card>
            <StudentApplicationForm locale={locale} />
          </Card>
        </Container>
      </Section>
      <FaqSection title="FAQ" items={t.faq} />
      <FinalCta title={t.final.title} text={t.final.text} first={t.final.cta} />
    </>
  );
}

function FirmPage({ locale }: { locale: Locale }) {
  const t = content[locale].pages.firm;
  return (
    <>
      <Hero title={t.title} subtitle={t.subtitle} primary={t.primary} secondary={t.secondary} />
      <FeatureSections
        locale={locale}
        title={locale === "fr" ? "Bénéfices" : "Benefits"}
        features={t.benefits}
        whyTitle={locale === "fr" ? "Comment ça fonctionne" : "How it works"}
        why={t.steps}
      />
      <Section id={locale === "fr" ? "formulaire-demande" : "request-form"} tone="cream">
        <Container>
          <DetailBlock block={t.detail} />
          <SectionHeading title={t.request.title} text={t.request.text} />
          <Card>
            <CabinetRequestForm locale={locale} />
          </Card>
        </Container>
      </Section>
      <FaqSection title="FAQ" items={t.faq} />
      <FinalCta title={t.final.title} text={t.final.text} first={t.final.cta} />
    </>
  );
}

function ApplyPage({ locale }: { locale: Locale }) {
  const t = content[locale].pages.student;
  return (
    <>
      <Hero title={t.application.title} subtitle={t.application.text} primary={t.primary} />
      <Section id={locale === "fr" ? "formulaire" : "application-form"} tone="cream">
        <Container>
          <DetailBlock block={t.detail} />
          <Card>
            <StudentApplicationForm locale={locale} />
          </Card>
        </Container>
      </Section>
    </>
  );
}

function FirmRequestPage({ locale }: { locale: Locale }) {
  const t = content[locale].pages.firm;
  return (
    <>
      <Hero title={t.request.title} subtitle={t.request.text} primary={t.primary} />
      <Section id={locale === "fr" ? "formulaire-demande" : "request-form"} tone="cream">
        <Container>
          <DetailBlock block={t.detail} />
          <Card>
            <CabinetRequestForm locale={locale} />
          </Card>
        </Container>
      </Section>
    </>
  );
}

function OpportunitiesPage({ locale }: { locale: Locale }) {
  const t = content[locale].pages.opportunities;
  return (
    <>
      <Hero title={t.title} subtitle={t.subtitle} primary={{ label: content[locale].common.studentCta, href: localizedHref("apply", locale) }} secondary={t.firmCta} />
      <Section>
        <Container>
          <Card className="bg-cream text-center">
            <h2 className="font-heading text-3xl text-navy">
              {locale === "fr" ? "Soumettez votre profil" : "Submit your profile"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-navy/75">{t.empty}</p>
            <ButtonLink href={localizedHref("apply", locale)} className="mt-6">
              {content[locale].common.studentCta}
            </ButtonLink>
          </Card>
        </Container>
      </Section>
    </>
  );
}

function OpportunityDetailPage({ locale, slug }: { locale: Locale; slug: string | undefined }) {
  const opportunity = getOpportunityBySlug(slug);
  const t = content[locale].pages.opportunities;
  if (!opportunity) {
    notFound();
  }

  const baseApply = localizedHref("apply", locale);
  return (
    <>
      <Hero
        title={opportunity.title[locale]}
        subtitle={`${opportunity.firmName} · ${opportunity.location} · ${opportunity.opportunityType[locale]}`}
        primary={{ label: t.apply === "Postuler" ? "Postuler à cette offre" : "Apply to this opportunity", href: `${baseApply}?opportunity=${opportunity.slug}` }}
        secondary={{ label: locale === "fr" ? "Retour aux offres" : "Back to opportunities", href: localizedHref("opportunities", locale) }}
      />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <Card>
                <h2 className="font-heading text-3xl text-navy">{locale === "fr" ? "Description" : "Description"}</h2>
                <p className="mt-4 text-base leading-7 text-navy/75">{opportunity.description[locale]}</p>
              </Card>
              <DetailList title={locale === "fr" ? "Responsabilités" : "Responsibilities"} items={opportunity.responsibilities.map((item) => item[locale])} />
              <DetailList title={locale === "fr" ? "Exigences" : "Requirements"} items={opportunity.requirements.map((item) => item[locale])} />
              <Card>
                <h2 className="font-heading text-3xl text-navy">{locale === "fr" ? "Profil recherché" : "Preferred profile"}</h2>
                <p className="mt-4 text-base leading-7 text-navy/75">{opportunity.preferredProfile[locale]}</p>
              </Card>
              <DetailList title={locale === "fr" ? "Documents requis" : "Documents required"} items={opportunity.documentsRequired.map((item) => item[locale])} />
              <p className="rounded-brand border border-gold/40 bg-cream p-4 text-sm leading-6 text-navy/70">{t.disclaimer}</p>
            </div>
            <aside className="h-fit rounded-brand border border-warmgray bg-cream p-5">
              <h2 className="font-heading text-2xl text-navy">{locale === "fr" ? "Détails de l'offre" : "Opportunity details"}</h2>
              <dl className="mt-5 grid gap-4 text-sm">
                <MetaRow label={locale === "fr" ? "Cabinet" : "Law firm"} value={opportunity.firmName} />
                <MetaRow label={t.filters.location} value={opportunity.location} />
                <MetaRow label={t.filters.opportunityType} value={opportunity.opportunityType[locale]} />
                <MetaRow label={t.filters.practiceArea} value={opportunity.practiceArea[locale]} />
                <MetaRow label={t.filters.workMode} value={opportunity.workMode[locale]} />
                <MetaRow label={t.filters.studyLevel} value={opportunity.studyLevel[locale]} />
                <MetaRow label={t.filters.language} value={opportunity.languageRequirements[locale]} />
                <MetaRow label={locale === "fr" ? "Début" : "Start date"} value={opportunity.startDate[locale]} />
                <MetaRow label={locale === "fr" ? "Date limite" : "Deadline"} value={opportunity.applicationDeadline[locale]} />
              </dl>
              <ButtonLink href={`${baseApply}?opportunity=${opportunity.slug}`} className="mt-6 w-full">
                {t.apply === "Postuler" ? "Postuler à cette offre" : "Apply to this opportunity"}
              </ButtonLink>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

function PostOpportunityPage({ locale }: { locale: Locale }) {
  const t = content[locale].pages.postOpportunity;
  return (
    <>
      <Hero title={t.title} subtitle={t.subtitle} />
      <Section id={locale === "fr" ? "formulaire-offre" : "opportunity-form"} tone="cream">
        <Container>
          <Card>
            <OpportunityPostingForm locale={locale} />
          </Card>
        </Container>
      </Section>
    </>
  );
}

function PrivateAccessPage({ locale }: { locale: Locale }) {
  const t = content[locale].pages.login;
  return (
    <>
      <Hero title={t.title} subtitle={t.subtitle} />
    </>
  );
}

function AboutPage({ locale }: { locale: Locale }) {
  const t = content[locale].pages.about;
  return (
    <>
      <Hero title={t.title} subtitle={t.subtitle} />
      <Section>
        <Container>
          <SectionHeading title={t.missionTitle} text={t.mission} />
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5 text-lg leading-8 text-navy/75">
              {t.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div>
              <h2 className="mb-5 font-heading text-3xl text-navy">{t.valuesTitle}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.values.map((value, index) => <FeatureCard key={value.title} title={value.title} text={value.text} iconIndex={index} />)}
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="cream">
        <Container>
          <SectionHeading title={locale === "fr" ? "Pour qui ?" : "Who the agency serves"} />
          <div className="grid gap-5 md:grid-cols-3">
            {t.audiences.map((item) => <FeatureCard key={item.title} title={item.title} text={item.text} />)}
          </div>
        </Container>
      </Section>
      <FinalCta title={t.final.title} first={t.final.student} second={t.final.firm} />
    </>
  );
}

function ContactPage({ locale }: { locale: Locale }) {
  const t = content[locale].pages.contact;
  return (
    <>
      <Hero title={t.title} subtitle={t.subtitle} />
      <Section id={locale === "fr" ? "formulaire-contact" : "contact-form"} tone="cream">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <ContactForm locale={locale} />
            </Card>
            <div className="grid gap-4">
              {t.info.map((item) => <FeatureCard key={item.title} title={item.title} text={item.text} />)}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function LegalPage({ locale, pageKey }: { locale: Locale; pageKey: "terms" | "privacy" | "legal" }) {
  const page = content[locale].pages.legal[pageKey];
  return (
    <>
      <Hero title={page.title} subtitle={content[locale].footer.legalReview} />
      <Section>
        <Container className="max-w-4xl">
          <div className="space-y-8">
            {page.sections.map((section) => (
              <article key={section.title} className="border-b border-warmgray pb-8 last:border-0">
                <h2 className="font-heading text-3xl text-navy">{section.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-7 text-navy/75">
                  {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function Hero({
  title,
  subtitle,
  primary,
  secondary
}: {
  title: string;
  subtitle: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section tone="cream" className="py-16 sm:py-24">
      <Container>
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            <ShieldCheck aria-hidden="true" size={17} />
            Juris Talent
          </p>
          <h1 className="font-heading text-5xl leading-tight text-navy sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-navy/75">{subtitle}</p>
          {primary ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
              {secondary ? <ButtonLink href={secondary.href} variant="secondary">{secondary.label}</ButtonLink> : null}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

function FeatureSections({
  locale,
  title,
  features,
  whyTitle,
  why
}: {
  locale: Locale;
  title: string;
  features: Array<{ title: string; text: string }>;
  whyTitle: string;
  why: Array<{ title: string; text: string }>;
}) {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading title={title} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item, index) => <FeatureCard key={item.title} title={item.title} text={item.text} iconIndex={index} />)}
          </div>
        </Container>
      </Section>
      <Section tone="cream">
        <Container>
          <SectionHeading title={whyTitle} />
          <div className="grid gap-5 md:grid-cols-3">
            {why.map((item, index) => <FeatureCard key={item.title} title={item.title} text={item.text} iconIndex={index} />)}
          </div>
          <p className="mt-8 text-sm text-navy/60">
            {locale === "fr"
              ? "Juris Talent demeure une agence de mise en relation et ne garantit aucun résultat."
              : "Juris Talent remains a connection agency and does not guarantee any outcome."}
          </p>
        </Container>
      </Section>
    </>
  );
}

function DetailBlock({
  block
}: {
  block: {
    title?: string;
    heading?: string;
    paragraphs: string[];
    benefitsTitle: string;
    benefits: Array<{ title: string; text: string }>;
  };
}) {
  return (
    <div className="mb-12">
      {block.title ? <SectionHeading title={block.title} /> : null}
      {block.heading ? <h2 className="font-heading text-4xl leading-tight text-navy">{block.heading}</h2> : null}
      <div className="mt-5 space-y-5 text-base leading-8 text-navy/75 sm:text-lg">
        {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <h3 className="mt-9 font-heading text-3xl text-navy">{block.benefitsTitle}</h3>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {block.benefits.map((benefit, index) => (
          <FeatureCard key={benefit.title} title={benefit.title} text={benefit.text} iconIndex={index} />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ title, text, iconIndex = 0 }: { title: string; text: string; iconIndex?: number }) {
  const icons = [TrendingUp, Scale, GraduationCap, BriefcaseBusiness, Sparkles];
  const Icon = icons[iconIndex % icons.length];
  return (
    <Card className="h-full">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-brand bg-cream text-gold">
        <Icon aria-hidden="true" size={21} />
      </div>
      <h3 className="font-heading text-2xl leading-tight text-navy">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-navy/70">{text}</p>
    </Card>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h2 className="font-heading text-3xl text-navy">{title}</h2>
      <ul className="mt-4 grid gap-3 text-base leading-7 text-navy/75">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">{label}</dt>
      <dd className="mt-1 font-semibold text-navy">{value}</dd>
    </div>
  );
}

function FaqSection({ title, items }: { title: string; items: Array<{ question: string; answer: string }> }) {
  return (
    <Section>
      <Container>
        <SectionHeading title={title} />
        <div className="grid gap-4">
          {items.map((item) => (
            <details key={item.question} className="rounded-brand border border-warmgray bg-white p-5">
              <summary className="cursor-pointer font-semibold text-navy">{item.question}</summary>
              <p className="mt-3 text-sm leading-6 text-navy/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FinalCta({
  title,
  text,
  first,
  second
}: {
  title: string;
  text?: string;
  first: { label: string; href: string };
  second?: { label: string; href: string };
}) {
  return (
    <Section tone="navy">
      <Container>
        <div className="max-w-3xl">
          <h2 className="font-heading text-4xl leading-tight text-white sm:text-5xl">{title}</h2>
          {text ? <p className="mt-4 text-lg leading-8 text-white/75">{text}</p> : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={first.href}>{first.label}</ButtonLink>
            {second ? <ButtonLink href={second.href} variant="secondary" className="border-white text-white hover:bg-white hover:text-navy">{second.label}</ButtonLink> : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
