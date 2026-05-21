import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/email/send-email";
import { opportunityPostingEmailSchema } from "@/lib/validations/forms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  console.log("Opportunity form POST received");
  try {
    const body = await request.json();
    const parsed = opportunityPostingEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid opportunity submission." }, { status: 400 });
    }

    const data = parsed.data;
    const submittedAt = new Date().toISOString();

    await sendFormEmail({
      subject: "New Juris Talent opportunity submission",
      heading: "New Juris Talent opportunity submission",
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
          title: "Cabinet information",
          fields: [
            { label: "Cabinet / organization name", value: data.firmName },
            { label: "Contact person", value: data.contactName },
            { label: "Professional email", value: data.email },
            { label: "Phone", value: data.phone }
          ]
        },
        {
          title: "Opportunity information",
          fields: [
            { label: "Job title", value: data.jobTitle },
            { label: "Opportunity type", value: data.opportunityType },
            { label: "Practice area", value: data.practiceArea },
            { label: "Location", value: data.location },
            { label: "Work mode", value: data.workMode },
            { label: "Start date", value: data.startDate },
            { label: "Application deadline", value: data.applicationDeadline },
            { label: "Study level required", value: data.studyLevel },
            { label: "Language requirements", value: data.languageRequirements },
            { label: "Job description", value: data.description },
            { label: "Responsibilities", value: data.responsibilities },
            { label: "Requirements", value: data.requirements },
            { label: "Documents required", value: data.documentsRequired },
            { label: "Additional notes", value: data.notes },
            { label: "Preferred communication language", value: data.language }
          ]
        },
        {
          title: "Consent",
          fields: [
            { label: "Terms/privacy accepted", value: data.consent },
            { label: "Non-responsibility acknowledgment accepted", value: data.acknowledgment }
          ]
        }
      ]
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email failed");
    console.error("Opportunity submission email failed", error);
    return NextResponse.json({ message: "Unable to send opportunity submission." }, { status: 500 });
  }
}
