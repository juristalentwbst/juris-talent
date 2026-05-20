import { z } from "zod";

function requiredText(requiredMessage: string, min = 2) {
  return z.string({ required_error: requiredMessage }).min(min, requiredMessage);
}

function cvSchema(fileMessage: string) {
  return z
    .unknown()
    .optional()
    .refine((value) => {
      if (!value || typeof FileList === "undefined" || !(value instanceof FileList) || value.length === 0) {
        return true;
      }

      return ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value[0].type);
    }, fileMessage);
}

export function studentApplicationSchema(errors: {
  required: string;
  email: string;
  file: string;
  consent: string;
}) {
  return z.object({
    firstName: requiredText(errors.required),
    lastName: requiredText(errors.required),
    email: z.string().email(errors.email),
    phone: requiredText(errors.required, 7),
    university: requiredText(errors.required),
    program: requiredText(errors.required),
    yearOfStudy: requiredText(errors.required),
    areasOfInterest: requiredText(errors.required),
    opportunityType: requiredText(errors.required),
    availability: requiredText(errors.required),
    cv: cvSchema(errors.file),
    message: z.string().optional(),
    language: requiredText(errors.required),
    consent: z.literal(true, {
      errorMap: () => ({ message: errors.consent })
    })
  });
}

export function firmRequestSchema(errors: {
  required: string;
  email: string;
  consent: string;
}) {
  return z.object({
    firmName: requiredText(errors.required),
    contactName: requiredText(errors.required),
    email: z.string().email(errors.email),
    phone: requiredText(errors.required, 7),
    practiceArea: requiredText(errors.required),
    profileType: requiredText(errors.required),
    opportunityType: requiredText(errors.required),
    startDate: requiredText(errors.required),
    message: requiredText(errors.required, 10),
    language: requiredText(errors.required),
    consent: z.literal(true, {
      errorMap: () => ({ message: errors.consent })
    }),
    acknowledgment: z.literal(true, {
      errorMap: () => ({ message: errors.consent })
    })
  });
}

export function contactSchema(errors: { required: string; email: string }) {
  return z.object({
    name: requiredText(errors.required),
    email: z.string().email(errors.email),
    userType: requiredText(errors.required),
    subject: requiredText(errors.required),
    message: requiredText(errors.required, 10)
  });
}
