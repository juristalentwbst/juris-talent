import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/email/send-email";
import { studentApplicationEmailSchema } from "@/lib/validations/forms";

export const runtime = "nodejs";

const maxCvFileSize = 5 * 1024 * 1024;
const acceptedCvMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
const acceptedCvExtensions = [".pdf", ".doc", ".docx"];

export async function POST(request: Request) {
  console.log("Student form POST received");
  try {
    const { body, cvAttachment } = await parseStudentSubmission(request);
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
      attachments: cvAttachment
        ? [
            {
              filename: cvAttachment.filename,
              content: cvAttachment.content,
              contentType: cvAttachment.contentType
            }
          ]
        : undefined,
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
          fields: [{ label: "CV/document attached", value: cvAttachment ? "yes" : "no" }]
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

async function parseStudentSubmission(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("multipart/form-data")) {
    const body = await request.json();
    return {
      body,
      cvAttachment: body.cvAttachment
        ? {
            filename: body.cvAttachment.filename,
            content: body.cvAttachment.content,
            contentType: body.cvAttachment.contentType
          }
        : null
    };
  }

  const formData = await request.formData();
  const cv = formData.get("cv");
  const body: Record<string, FormDataEntryValue | boolean> = {};

  formData.forEach((value, key) => {
    if (key !== "cv") {
      body[key] = value;
    }
  });
  body.consent = body.consent === "true";
  body.acknowledgment = body.acknowledgment === "true";

  if (!isUploadedFile(cv)) {
    return { body, cvAttachment: null };
  }

  if (!isAcceptedCvFile(cv)) {
    return { body: {}, cvAttachment: null };
  }

  return {
    body,
    cvAttachment: {
      filename: cv.name,
      content: Buffer.from(await cv.arrayBuffer()),
      contentType: cv.type || undefined
    }
  };
}

function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return typeof value === "object" && value !== null && "arrayBuffer" in value && "name" in value && "size" in value;
}

function isAcceptedCvFile(file: File) {
  const lowerName = file.name.toLowerCase();
  const hasAcceptedType = acceptedCvMimeTypes.includes(file.type);
  const hasAcceptedExtension = acceptedCvExtensions.some((extension) => lowerName.endsWith(extension));

  return file.size <= maxCvFileSize && (hasAcceptedType || hasAcceptedExtension);
}
