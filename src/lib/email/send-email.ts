import "server-only";

import { Resend } from "resend";

type EmailField = {
  label: string;
  value?: boolean | null | string;
};

type EmailSection = {
  title: string;
  fields: EmailField[];
};

export type FormEmail = {
  subject: string;
  heading: string;
  replyTo?: string;
  sections: EmailSection[];
};

const resendSender = "Juris Talent <onboarding@resend.dev>";

function formatValue(value?: boolean | null | string) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderText(email: FormEmail) {
  const sections = email.sections
    .map((section) => {
      const fields = section.fields.map((field) => `- ${field.label}: ${formatValue(field.value)}`).join("\n");
      return `${section.title}:\n${fields}`;
    })
    .join("\n\n");

  return `${email.heading}\n\n${sections}`;
}

function renderHtml(email: FormEmail) {
  const sections = email.sections
    .map((section) => {
      const fields = section.fields
        .map(
          (field) =>
            `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e5e5;color:#1A2B50;width:38%;">${escapeHtml(
              field.label
            )}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;color:#1A2B50;">${escapeHtml(
              formatValue(field.value)
            )}</td></tr>`
        )
        .join("");

      return `<h2 style="font-size:18px;color:#1A2B50;margin:28px 0 10px;">${escapeHtml(
        section.title
      )}</h2><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#fff;">${fields}</table>`;
    })
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#F6F2E9;font-family:Arial,sans-serif;color:#1A2B50;"><main style="max-width:720px;margin:0 auto;padding:32px 20px;"><div style="background:#fff;border:1px solid #CFCFCF;padding:28px;"><p style="margin:0 0 8px;color:#C5A061;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Juris Talent</p><h1 style="margin:0;color:#1A2B50;font-size:26px;">${escapeHtml(
    email.heading
  )}</h1>${sections}</div></main></body></html>`;
}

export async function sendFormEmail(email: FormEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!to) {
    throw new Error("CONTACT_EMAIL is not configured.");
  }

  console.log("Sending email through Resend");
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: resendSender,
    to,
    subject: email.subject,
    text: renderText(email),
    html: renderHtml(email),
    replyTo: email.replyTo
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  console.log("Email sent successfully");
  return result.data;
}
