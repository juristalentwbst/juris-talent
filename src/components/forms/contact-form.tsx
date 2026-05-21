"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { content } from "@/content/site";
import { contactSchema } from "@/lib/validations/forms";
import type { Locale } from "@/types/site";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Input, Label, Select, Textarea } from "@/components/ui/form-controls";

export function ContactForm({ locale }: { locale: Locale }) {
  const t = content[locale];
  const schema = contactSchema(t.forms.errors);
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
    const response = await fetch("/api/forms/contact", {
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
        <p className="font-semibold">{t.forms.success.contact}</p>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit, () => setInvalidSubmit(true))} noValidate>
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
        <Field label={t.forms.contact.fields.name} error={errors.name?.message}>
          <Input {...register("name")} autoComplete="name" />
        </Field>
        <Field label={t.forms.contact.fields.email} error={errors.email?.message}>
          <Input {...register("email")} type="email" autoComplete="email" />
        </Field>
        <Field label={t.forms.contact.fields.userType} error={errors.userType?.message}>
          <Select {...register("userType")} defaultValue="">
            <option value="" disabled>{t.common.selectPlaceholder}</option>
            {t.forms.contact.userTypes.map((item) => <option key={item}>{item}</option>)}
          </Select>
        </Field>
        <Field label={t.forms.contact.fields.subject} error={errors.subject?.message}>
          <Input {...register("subject")} />
        </Field>
      </div>
      <Field label={t.forms.contact.fields.message} error={errors.message?.message}>
        <Textarea {...register("message")} />
      </Field>
      <p className="rounded-brand border border-gold/45 bg-cream p-4 text-sm leading-6 text-navy/75">{t.common.privacyNoticeContact}</p>
      <label className="flex gap-3 rounded-brand border border-warmgray bg-white p-4 text-sm leading-6 text-navy">
        <input className="mt-1 h-4 w-4 accent-gold" type="checkbox" {...register("consent")} />
        <span>{t.forms.contact.consent}</span>
      </label>
      <ErrorMessage>{errors.consent?.message}</ErrorMessage>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? (locale === "fr" ? "Envoi..." : "Sending...") : t.forms.contact.submit}</Button>
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
