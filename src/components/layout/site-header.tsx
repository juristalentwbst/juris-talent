"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { content } from "@/content/site";
import { localizedHref } from "@/lib/routes";
import type { Locale, PageKey } from "@/types/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { LanguageToggle } from "./language-toggle";
import { Logo } from "./logo";

export function SiteHeader({ locale, pageKey }: { locale: Locale; pageKey: PageKey }) {
  const [open, setOpen] = useState(false);
  const t = content[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-warmgray/60 bg-cream/95 backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <Logo locale={locale} priority />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {t.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-navy/80 transition hover:text-navy">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href={localizedHref("firmRequest", locale)} variant="secondary" className="px-4">
            {t.header.firmAccess}
          </ButtonLink>
          <LanguageToggle
            locale={locale}
            pageKey={pageKey}
            className="rounded-brand px-3 py-2 text-sm font-bold text-navy transition hover:bg-white"
          />
        </div>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-brand border border-navy/20 text-navy lg:hidden"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          <span className="sr-only">Menu</span>
        </button>
      </Container>
      {open ? (
        <div id="mobile-navigation" className="border-t border-warmgray/60 bg-cream lg:hidden">
          <Container className="grid gap-3 py-5">
            {t.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-brand px-3 py-3 text-base font-semibold text-navy hover:bg-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              <ButtonLink href={localizedHref("firmRequest", locale)} variant="secondary">
                {t.header.firmAccess}
              </ButtonLink>
              <LanguageToggle
                locale={locale}
                pageKey={pageKey}
                className="inline-flex min-h-11 items-center justify-center rounded-brand border border-navy px-5 py-3 text-sm font-bold text-navy"
              />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
