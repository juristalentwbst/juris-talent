"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { content } from "@/content/site";
import { studentApplicationSchema } from "@/lib/validations/forms";
import type { Locale } from "@/types/site";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Input, Label, Select, Textarea } from "@/components/ui/form-controls";

export function StudentApplicationForm({ locale }: { locale: Locale }) {
  const t = content[locale];
  const schema = studentApplicationSchema(t.forms.errors);
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
        <p className="font-semibold">{t.forms.success.student}</p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={handleSubmit(onSubmit, () => setInvalidSubmit(true))}
      noValidate
    >
      <p className="rounded-brand border border-gold/45 bg-cream p-4 text-sm leading-6 text-navy/75">{t.common.privacyNoticeStudent}</p>
      {invalidSubmit ? (
        <div className="flex gap-3 rounded-brand border border-red-700/30 bg-red-50 p-4 text-sm font-medium text-red-800">
          <AlertCircle aria-hidden="true" size={18} />
          <span>{t.forms.errors.required}</span>
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.forms.student.fields.firstName} error={errors.firstName?.message}>
          <Input {...register("firstName")} autoComplete="given-name" />
        </Field>
        <Field label={t.forms.student.fields.lastName} error={errors.lastName?.message}>
          <Input {...register("lastName")} autoComplete="family-name" />
        </Field>
        <Field label={t.forms.student.fields.email} error={errors.email?.message}>
          <Input {...register("email")} type="email" autoComplete="email" />
        </Field>
        <Field label={t.forms.student.fields.phone} error={errors.phone?.message}>
          <Input {...register("phone")} type="tel" autoComplete="tel" />
        </Field>
        <Field label={t.forms.student.fields.university} error={errors.university?.message}>
          <Input {...register("university")} />
        </Field>
        <Field label={t.forms.student.fields.program} error={errors.program?.message}>
          <Input {...register("program")} />
        </Field>
        <Field label={t.forms.student.fields.yearOfStudy} error={errors.yearOfStudy?.message}>
          <Select {...register("yearOfStudy")} defaultValue="">
            <option value="" disabled>{t.common.selectPlaceholder}</option>
            {t.forms.student.options.years.map((item) => <option key={item}>{item}</option>)}
          </Select>
        </Field>
        <Field label={t.forms.student.fields.opportunityType} error={errors.opportunityType?.message}>
          <Select {...register("opportunityType")} defaultValue="">
            <option value="" disabled>{t.common.selectPlaceholder}</option>
            {t.forms.student.options.opportunities.map((item) => <option key={item}>{item}</option>)}
          </Select>
        </Field>
        <Field label={t.forms.student.fields.areasOfInterest} error={errors.areasOfInterest?.message}>
          <Input {...register("areasOfInterest")} />
        </Field>
        <Field label={t.forms.student.fields.availability} error={errors.availability?.message}>
          <Input {...register("availability")} />
        </Field>
        <Field label={t.forms.student.fields.language} error={errors.language?.message}>
          <Select {...register("language")} defaultValue="">
            <option value="" disabled>{t.common.selectPlaceholder}</option>
            {t.forms.student.options.languages.map((item) => <option key={item}>{item}</option>)}
          </Select>
        </Field>
        <Field label={t.forms.student.fields.cv} error={errors.cv?.message?.toString()}>
          <Input {...register("cv")} type="file" accept=".pdf,.doc,.docx" />
          <p className="mt-2 text-xs leading-5 text-navy/60">{t.common.fileHint}</p>
          <p className="mt-2 text-xs leading-5 text-navy/60">{t.common.cvDisclaimer}</p>
        </Field>
      </div>
      <Field label={t.forms.student.fields.message} error={errors.message?.message}>
        <Textarea {...register("message")} />
      </Field>
      <label className="flex gap-3 rounded-brand border border-warmgray bg-white p-4 text-sm leading-6 text-navy">
        <input className="mt-1 h-4 w-4 accent-gold" type="checkbox" {...register("consent")} />
        <span>{t.forms.student.consent}</span>
      </label>
      <ErrorMessage>{errors.consent?.message}</ErrorMessage>
      <Button type="submit" disabled={isSubmitting}>{t.forms.student.submit}</Button>
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
