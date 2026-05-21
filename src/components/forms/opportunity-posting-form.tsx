"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { content } from "@/content/site";
import { opportunityPostingSchema } from "@/lib/validations/forms";
import type { Locale } from "@/types/site";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Input, Label, Select, Textarea } from "@/components/ui/form-controls";

export function OpportunityPostingForm({ locale }: { locale: Locale }) {
  const t = content[locale];
  const schema = opportunityPostingSchema(t.forms.errors);
  type FormValues = z.infer<typeof schema>;
  const [invalidSubmit, setInvalidSubmit] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  async function onSubmit(values: FormValues) {
    setInvalidSubmit(false);
    setSubmitError(null);
    const response = await fetch("/api/forms/opportunity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        submittedLocale: locale,
        sourcePath: window.location.pathname + window.location.search
      })
    });

    if (!response.ok) {
      setSubmitError(t.forms.errors.general);
      return;
    }

    reset();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-brand border border-green-700/30 bg-green-50 p-6 text-green-900">
        <CheckCircle2 className="mb-3" aria-hidden="true" />
        <p className="font-semibold">{t.forms.success.opportunity}</p>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit, () => setInvalidSubmit(true))} noValidate>
      <p className="rounded-brand border border-gold/45 bg-cream p-4 text-sm leading-6 text-navy/75">{t.common.privacyNoticeFirm}</p>
      <p className="rounded-brand border border-navy/20 bg-white p-4 text-sm leading-6 text-navy/75">{t.common.nonResponsibility}</p>
      {invalidSubmit ? (
        <div className="flex gap-3 rounded-brand border border-red-700/30 bg-red-50 p-4 text-sm font-medium text-red-800">
          <AlertCircle aria-hidden="true" size={18} />
          <span>{t.forms.errors.required}</span>
        </div>
      ) : null}
      {submitError ? (
        <div className="flex gap-3 rounded-brand border border-red-700/30 bg-red-50 p-4 text-sm font-medium text-red-800">
          <AlertCircle aria-hidden="true" size={18} />
          <span>{submitError}</span>
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.forms.opportunity.fields.firmName} error={errors.firmName?.message}>
          <Input {...register("firmName")} />
        </Field>
        <Field label={t.forms.opportunity.fields.contactName} error={errors.contactName?.message}>
          <Input {...register("contactName")} autoComplete="name" />
        </Field>
        <Field label={t.forms.opportunity.fields.email} error={errors.email?.message}>
          <Input {...register("email")} type="email" autoComplete="email" />
        </Field>
        <Field label={t.forms.opportunity.fields.phone} error={errors.phone?.message}>
          <Input {...register("phone")} type="tel" autoComplete="tel" />
        </Field>
        <Field label={t.forms.opportunity.fields.jobTitle} error={errors.jobTitle?.message}>
          <Input {...register("jobTitle")} />
        </Field>
        <Field label={t.forms.opportunity.fields.opportunityType} error={errors.opportunityType?.message}>
          <Select {...register("opportunityType")} defaultValue="">
            <option value="" disabled>{t.common.selectPlaceholder}</option>
            {t.forms.opportunity.options.opportunityTypes.map((item) => <option key={item}>{item}</option>)}
          </Select>
        </Field>
        <Field label={t.forms.opportunity.fields.practiceArea} error={errors.practiceArea?.message}>
          <Input {...register("practiceArea")} />
        </Field>
        <Field label={t.forms.opportunity.fields.location} error={errors.location?.message}>
          <Input {...register("location")} />
        </Field>
        <Field label={t.forms.opportunity.fields.workMode} error={errors.workMode?.message}>
          <Select {...register("workMode")} defaultValue="">
            <option value="" disabled>{t.common.selectPlaceholder}</option>
            {t.forms.opportunity.options.workModes.map((item) => <option key={item}>{item}</option>)}
          </Select>
        </Field>
        <Field label={t.forms.opportunity.fields.startDate} error={errors.startDate?.message}>
          <Input {...register("startDate")} type="date" />
        </Field>
        <Field label={t.forms.opportunity.fields.applicationDeadline} error={errors.applicationDeadline?.message}>
          <Input {...register("applicationDeadline")} type="date" />
        </Field>
        <Field label={t.forms.opportunity.fields.studyLevel} error={errors.studyLevel?.message}>
          <Input {...register("studyLevel")} />
        </Field>
        <Field label={t.forms.opportunity.fields.languageRequirements} error={errors.languageRequirements?.message}>
          <Input {...register("languageRequirements")} />
        </Field>
        <Field label={t.forms.opportunity.fields.language} error={errors.language?.message}>
          <Select {...register("language")} defaultValue="">
            <option value="" disabled>{t.common.selectPlaceholder}</option>
            {t.forms.opportunity.options.languages.map((item) => <option key={item}>{item}</option>)}
          </Select>
        </Field>
      </div>
      <Field label={t.forms.opportunity.fields.description} error={errors.description?.message}>
        <Textarea {...register("description")} />
      </Field>
      <Field label={t.forms.opportunity.fields.responsibilities} error={errors.responsibilities?.message}>
        <Textarea {...register("responsibilities")} />
      </Field>
      <Field label={t.forms.opportunity.fields.requirements} error={errors.requirements?.message}>
        <Textarea {...register("requirements")} />
      </Field>
      <Field label={t.forms.opportunity.fields.documentsRequired} error={errors.documentsRequired?.message}>
        <Textarea {...register("documentsRequired")} />
      </Field>
      <Field label={t.forms.opportunity.fields.notes} error={errors.notes?.message}>
        <Textarea {...register("notes")} />
      </Field>
      <label className="flex gap-3 rounded-brand border border-warmgray bg-white p-4 text-sm leading-6 text-navy">
        <input className="mt-1 h-4 w-4 accent-gold" type="checkbox" {...register("consent")} />
        <span>{t.forms.opportunity.consent}</span>
      </label>
      <ErrorMessage>{errors.consent?.message}</ErrorMessage>
      <label className="flex gap-3 rounded-brand border border-warmgray bg-white p-4 text-sm leading-6 text-navy">
        <input className="mt-1 h-4 w-4 accent-gold" type="checkbox" {...register("acknowledgment")} />
        <span>{t.forms.opportunity.acknowledgment}</span>
      </label>
      <ErrorMessage>{errors.acknowledgment?.message}</ErrorMessage>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? (locale === "fr" ? "Envoi..." : "Sending...") : t.forms.opportunity.submit}</Button>
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
}
