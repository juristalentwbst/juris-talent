import type { z } from "zod";
import type {
  cabinetRequestEmailSchema,
  contactEmailSchema,
  opportunityPostingEmailSchema,
  studentApplicationEmailSchema
} from "@/lib/validations/forms";

export type StudentApplicationPayload = z.infer<typeof studentApplicationEmailSchema>;
export type CabinetRequestPayload = z.infer<typeof cabinetRequestEmailSchema>;
export type ContactPayload = z.infer<typeof contactEmailSchema>;
export type OpportunityPostingPayload = z.infer<typeof opportunityPostingEmailSchema>;

export type FormEmailResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
    };
