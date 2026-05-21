import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/email/send-email";
import { studentApplicationEmailSchema } from "@/lib/validations/forms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  console.log("Student form POST received");
  try {
    const body = await request.json();
    const parsed = studentApplicationEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid student application submission." }, { status: 400 });
    }

    const data = parsed.data;
    const submittedAt = new Date().toISOString();

    await sendFormEmail({
      subject: "New Juris Talent student application",
      heading: "New Juris Talent student application",
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
          title: "Candidate information",
          fields: [
            { label: "First name", value: data.firstName },
            { label: "Last name", value: data.lastName },
            { label: "Email", value: data.email },
            { label: "Phone", value: data.phone },
            { label: "University", value: data.university },
            { label: "Program", value: data.program },
            { label: "Year of study", value: data.yearOfStudy },
            { label: "Legal areas of interest", value: data.areasOfInterest },
            { label: "Type of opportunity sought", value: data.opportunityType },
            { label: "Availability", value: data.availability },
            { label: "Preferred communication language", value: data.language },
            { label: "Message", value: data.message }
          ]
        },
        {
          title: "CV",
          fields: [{ label: "CV upload", value: "CV upload is not connected yet for MVP." }]
        },
        {
          title: "Consent",
          fields: [
            { label: "Terms/privacy accepted", value: data.consent },
            { label: "No-guarantee acknowledgment accepted", value: data.acknowledgment }
          ]
        }
      ]
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email failed");
    console.error("Student application email failed", error);
    return NextResponse.json({ message: "Unable to send student application." }, { status: 500 });
  }
}
