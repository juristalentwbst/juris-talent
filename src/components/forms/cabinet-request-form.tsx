"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { content } from "@/content/site";
import { firmRequestSchema } from "@/lib/validations/forms";
import type { Locale } from "@/types/site";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Input, Label, Select, Textarea } from "@/components/ui/form-controls";

export function CabinetRequestForm({ locale }: { locale: Locale }) {
  const t = content[locale];
  const schema = firmRequestSchema(t.forms.errors);
  type FormValues = z.infer<typeof schema>;
  const [invalidSubmit, setInvalidSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  function onSubmit() {
    setInvalidSubmit(false);
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="rounded-brand border border-green-700/30 bg-green-50 p-6 text-green-900">
        <CheckCircle2 className="mb-3" aria-hidden="true" />
        <p className="font-semibold">{t.forms.success.firm}</p>
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.forms.firm.fields.firmName} error={errors.firmName?.message}>
          <Input {...register("firmName")} />
        </Field>
        <Field label={t.forms.firm.fields.contactName} error={errors.contactName?.message}>
          <Input {...register("contactName")} autoComplete="name" />
        </Field>
        <Field label={t.forms.firm.fields.email} error={errors.email?.message}>
          <Input {...register("email")} type="email" autoComplete="email" />
        </Field>
        <Field label={t.forms.firm.fields.phone} error={errors.phone?.message}>
          <Input {...register("phone")} type="tel" autoComplete="tel" />
        </Field>
        <Field label={t.forms.firm.fields.practiceArea} error={errors.practiceArea?.message}>
          <Input {...register("practiceArea")} />
        </Field>
        <Field label={t.forms.firm.fields.profileType} error={errors.profileType?.message}>
          <Input {...register("profileType")} />
        </Field>
        <Field label={t.forms.firm.fields.opportunityType} error={errors.opportunityType?.message}>
          <Select {...register("opportunityType")} defaultValue="">
            <option value="" disabled>{t.common.selectPlaceholder}</option>
            {t.forms.firm.options.opportunities.map((item) => <option key={item}>{item}</option>)}
          </Select>
        </Field>
        <Field label={t.forms.firm.fields.startDate} error={errors.startDate?.message}>
          <Input {...register("startDate")} type="date" />
        </Field>
        <Field label={t.forms.firm.fields.language} error={errors.language?.message}>
          <Select {...register("language")} defaultValue="">
            <option value="" disabled>{t.common.selectPlaceholder}</option>
            {t.forms.firm.options.languages.map((item) => <option key={item}>{item}</option>)}
          </Select>
        </Field>
      </div>
      <Field label={t.forms.firm.fields.message} error={errors.message?.message}>
        <Textarea {...register("message")} />
      </Field>
      <label className="flex gap-3 rounded-brand border border-warmgray bg-white p-4 text-sm leading-6 text-navy">
        <input className="mt-1 h-4 w-4 accent-gold" type="checkbox" {...register("consent")} />
        <span>{t.forms.firm.consent}</span>
      </label>
      <ErrorMessage>{errors.consent?.message}</ErrorMessage>
      <label className="flex gap-3 rounded-brand border border-warmgray bg-white p-4 text-sm leading-6 text-navy">
        <input className="mt-1 h-4 w-4 accent-gold" type="checkbox" {...register("acknowledgment")} />
        <span>{t.forms.firm.acknowledgment}</span>
      </label>
      <ErrorMessage>{errors.acknowledgment?.message}</ErrorMessage>
      <Button type="submit" disabled={isSubmitting}>{t.forms.firm.submit}</Button>
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
