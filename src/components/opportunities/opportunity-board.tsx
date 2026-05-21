"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { opportunities } from "@/data/opportunities.mock";
import type { Locale } from "@/types/site";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function OpportunityBoard({
  locale,
  copy
}: {
  locale: Locale;
  copy: {
    searchPlaceholder: string;
    filters: {
      location: string;
      practiceArea: string;
      opportunityType: string;
      studyLevel: string;
      language: string;
      workMode: string;
      datePosted: string;
    };
    view: string;
    apply: string;
    empty: string;
  };
}) {
  const [query, setQuery] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [type, setType] = useState("");

  const workModes = [...new Set(opportunities.map((item) => item.workMode[locale]))];
  const types = [...new Set(opportunities.map((item) => item.opportunityType[locale]))];

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return opportunities.filter((item) => {
      const haystack = [
        item.title[locale],
        item.firmName,
        item.location,
        item.practiceArea[locale],
        item.opportunityType[locale],
        item.workMode[locale]
      ].join(" ").toLowerCase();

      return (
        (!normalizedQuery || haystack.includes(normalizedQuery)) &&
        (!workMode || item.workMode[locale] === workMode) &&
        (!type || item.opportunityType[locale] === type)
      );
    });
  }, [locale, query, type, workMode]);

  const basePath = locale === "fr" ? "/fr/offres" : "/en/opportunities";
  const applyPath = locale === "fr" ? "/fr/postuler" : "/en/apply";

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <aside className="h-fit rounded-brand border border-warmgray bg-cream p-5">
        <label className="text-sm font-semibold uppercase tracking-[0.12em] text-navy">{copy.searchPlaceholder}</label>
        <div className="mt-3 flex items-center gap-2 rounded-brand border border-warmgray bg-white px-3 py-2">
          <Search size={18} className="text-gold" aria-hidden="true" />
          <input
            className="min-h-9 w-full bg-transparent text-sm text-navy outline-none placeholder:text-navy/45"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            type="search"
          />
        </div>
        <div className="mt-5 grid gap-4">
          <FilterSelect label={copy.filters.workMode} value={workMode} onChange={setWorkMode} options={workModes} />
          <FilterSelect label={copy.filters.opportunityType} value={type} onChange={setType} options={types} />
          <div className="rounded-brand border border-warmgray/70 bg-white p-3 text-xs leading-5 text-navy/65">
            {copy.filters.location} · {copy.filters.practiceArea} · {copy.filters.studyLevel} · {copy.filters.language} · {copy.filters.datePosted}
          </div>
        </div>
      </aside>
      <div className="grid gap-5">
        {filtered.length > 0 ? filtered.map((item) => (
          <Card key={item.id} className="grid gap-5 md:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag[locale]} className="rounded-full border border-gold/40 bg-cream px-3 py-1 text-xs font-semibold text-navy">
                    {tag[locale]}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 font-heading text-3xl leading-tight text-navy">{item.title[locale]}</h2>
              <p className="mt-2 text-sm font-semibold text-navy/75">{item.firmName}</p>
              <p className="mt-1 text-sm text-navy/65">
                {item.location} · {item.opportunityType[locale]} · {item.practiceArea[locale]} · {item.workMode[locale]}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-navy/70">{item.shortDescription[locale]}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-gold">{item.datePosted[locale]}</p>
            </div>
            <div className="flex flex-col gap-3 md:min-w-44 md:items-stretch md:justify-center">
              <ButtonLink href={`${basePath}/${item.slug}`} variant="secondary">{copy.view}</ButtonLink>
              <ButtonLink href={applyPath}>{copy.apply}</ButtonLink>
            </div>
          </Card>
        )) : (
          <Card className="bg-cream text-center">
            <p className="text-base leading-7 text-navy/75">{copy.empty}</p>
            <ButtonLink href={applyPath} className="mt-5">{copy.apply}</ButtonLink>
          </Card>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-navy">
      {label}
      <select
        className="min-h-11 rounded-brand border border-warmgray bg-white px-3 text-sm text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Tous / All</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
