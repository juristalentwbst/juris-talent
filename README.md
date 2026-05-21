# Juris Talent MVP

French-first bilingual MVP website for Juris Talent, built with Next.js App Router, TypeScript, Tailwind CSS, Zod validation, and Resend email delivery for form submissions.

## Local Development

Install dependencies with your preferred Node package manager, then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000/fr`.

## Email Delivery

All public forms submit to server-side API routes and send email through Resend. The Resend API key must never be exposed in browser code.

Required environment variables:

```bash
RESEND_API_KEY=
CONTACT_EMAIL=contact@juristalent.ca
```

To activate email delivery in production, add the Resend API key and `CONTACT_EMAIL` in Vercel Project Settings -> Environment Variables, then redeploy.

Optional: set `RESEND_FROM_EMAIL` if the project uses a verified Resend sender address other than `Juris Talent <notifications@juristalent.ca>`.

## MVP Scope

- Public bilingual routes under `/fr` and `/en`
- Brand tokens and shared layout
- Header, footer, language toggle, mobile navigation
- Homepage, student, law firm, opportunities, application, request, about, contact, and legal pages
- Mock opportunities
- Server-side form email delivery through Resend
- Client-side and server-side form validation with success/error states

No authentication, dashboards, Supabase connection, database persistence, or real CV storage is implemented in this MVP.
