import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/email/send-email";
import { cabinetRequestEmailSchema } from "@/lib/validations/forms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = cabinetRequestEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid cabinet request submission." }, { status: 400 });
    }

    const data = parsed.data;
    const submittedAt = new Date().toISOString();

    await sendFormEmail({
      subject: "New Juris Talent cabinet request",
      heading: "New Juris Talent cabinet request",
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
            { label: "Phone", value: data.phone },
            { label: "Practice area", value: data.practiceArea },
            { label: "Type of profile needed", value: data.profileType },
            { label: "Type of opportunity", value: data.opportunityType },
            { label: "Start date", value: data.startDate },
            { label: "Preferred communication language", value: data.language },
            { label: "Message", value: data.message }
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
    console.error("Cabinet request email failed", error);
    return NextResponse.json({ message: "Unable to send cabinet request." }, { status: 500 });
  }
}
