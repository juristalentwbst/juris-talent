import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/email/send-email";
import { contactEmailSchema } from "@/lib/validations/forms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  console.log("Contact form POST received");
  try {
    const body = await request.json();
    const parsed = contactEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid contact form submission." }, { status: 400 });
    }

    const data = parsed.data;
    const submittedAt = new Date().toISOString();

    await sendFormEmail({
      subject: "New Juris Talent contact message",
      heading: "New Juris Talent contact message",
      replyTo: data.email,
      sections: [
        {
          title: "Submission details",
          fields: [
            { label: "Submitted at", value: submittedAt },
            { label: "Language", value: data.submittedLocale },
            { label: "Source page", value: data.sourcePath }
          ]
        },
        {
          title: "Contact information",
          fields: [
            { label: "Name", value: data.name },
            { label: "Email", value: data.email },
            { label: "Request type", value: data.userType },
            { label: "Subject", value: data.subject },
            { label: "Message", value: data.message }
          ]
        },
        {
          title: "Consent",
          fields: [{ label: "Privacy notice accepted", value: data.consent }]
        }
      ]
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email failed");
    console.error("Contact form email failed", error);
    return NextResponse.json({ message: "Unable to send contact message." }, { status: 500 });
  }
}
