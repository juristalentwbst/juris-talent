import Link from "next/link";
import type { Locale, PageKey } from "@/types/site";
import { localizedHref } from "@/lib/routes";

export function LanguageToggle({
  locale,
  pageKey,
  className
}: {
  locale: Locale;
  pageKey: PageKey;
  className?: string;
}) {
  const nextLocale = locale === "fr" ? "en" : "fr";

  return (
    <Link
      className={className}
      href={localizedHref(pageKey, nextLocale)}
      aria-label={locale === "fr" ? "Switch to English" : "Passer au français"}
    >
      {nextLocale.toUpperCase()}
    </Link>
  );
}
