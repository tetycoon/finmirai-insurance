import { z } from "zod";

/**
 * Lead/enquiry validation — imported by both the client forms and the API route so the rules
 * can never drift apart. Server-side validation is authoritative (Plan §15).
 */

export const LEAD_TYPES = ["insurance", "corporate", "claim", "advisor", "callback"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

/** Version of the consent wording shown next to the checkbox. Bump when the text changes. */
export const CONSENT_VERSION = "2026-10-draft";

const trimmed = (min: number, max: number, label: string) =>
  z
    .string({ required_error: `Please enter ${label}.` })
    .trim()
    .min(min, min <= 1 ? `Please enter ${label}.` : `${capitalise(label)} must be at least ${min} characters.`)
    .max(max, `${capitalise(label)} must be under ${max} characters.`);

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((v) => (v ? v : undefined));

/** Indian mobile number: optional +91/0 prefix, 10 digits starting 6–9. Spaces and dashes allowed. */
export const phoneSchema = z
  .string({ required_error: "Please enter your mobile number." })
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => /^(?:\+?91|0)?[6-9]\d{9}$/.test(v), "Please enter a valid 10-digit Indian mobile number.")
  .transform((v) => `+91${v.slice(-10)}`);

const emailRequired = z
  .string({ required_error: "Please enter your email address." })
  .trim()
  .min(1, "Please enter your email address.")
  .email("Please enter a valid email address.")
  .max(120);

const emailOptional = z
  .string()
  .trim()
  .max(120)
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || z.string().email().safeParse(v).success, "Please enter a valid email address.");

const consent = z.literal(true, {
  errorMap: () => ({ message: "Please confirm your consent so we can contact you." }),
});

export const contactPreferenceOptions = [
  { value: "call", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
] as const;
const contactPreference = z.enum(["call", "whatsapp", "email"], {
  errorMap: () => ({ message: "Please choose how we should contact you." }),
});

export const contactTimeOptions = [
  { value: "morning", label: "Morning (9am – 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm – 4pm)" },
  { value: "evening", label: "Evening (4pm – 7pm)" },
  { value: "any", label: "Any time" },
] as const;
const contactTime = z.enum(["morning", "afternoon", "evening", "any"], {
  errorMap: () => ({ message: "Please choose a preferred time." }),
});

// ── Insurance assistance (general enquiry) ──────────────────────────────
export const insuranceLeadSchema = z.object({
  name: trimmed(2, 80, "your name"),
  phone: phoneSchema,
  email: emailOptional,
  city: trimmed(2, 60, "your city"),
  insuranceType: z.string({ required_error: "Please choose a type of insurance." }).trim().min(1, "Please choose a type of insurance.").max(60),
  contactPreference,
  message: optionalText(1000),
  consent,
});

// ── Corporate consultation (Plan §7) ────────────────────────────────────
export const employeeCountOptions = [
  { value: "1-10", label: "1 – 10" },
  { value: "11-50", label: "11 – 50" },
  { value: "51-200", label: "51 – 200" },
  { value: "201-1000", label: "201 – 1,000" },
  { value: "1000+", label: "More than 1,000" },
] as const;

export const corporateLeadSchema = z.object({
  companyName: trimmed(2, 120, "the company name"),
  contactPerson: trimmed(2, 80, "a contact person"),
  email: emailRequired,
  phone: phoneSchema,
  industry: trimmed(2, 80, "your industry"),
  employeeCount: z.enum(["1-10", "11-50", "51-200", "201-1000", "1000+"], {
    errorMap: () => ({ message: "Please choose the number of employees." }),
  }),
  location: trimmed(2, 80, "your location"),
  requirements: z.array(z.string().max(60)).min(1, "Please choose at least one requirement.").max(12),
  renewalDate: optionalText(20),
  message: optionalText(1500),
  consent,
});

// ── Claims support (Plan §8) ────────────────────────────────────────────
export const claimTypeOptions = [
  { value: "health", label: "Health / hospitalisation" },
  { value: "motor", label: "Motor / vehicle" },
  { value: "home-property", label: "Home or business property" },
  { value: "travel", label: "Travel" },
  { value: "personal-accident", label: "Personal accident" },
  { value: "life", label: "Life" },
  { value: "marine", label: "Marine / transit" },
  { value: "liability", label: "Liability" },
  { value: "other", label: "Other" },
] as const;

function isNotFuture(v: string) {
  const d = new Date(`${v}T00:00:00`);
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return d <= today;
}

export const claimLeadSchema = z.object({
  name: trimmed(2, 80, "your name"),
  phone: phoneSchema,
  email: emailOptional,
  policyNumber: trimmed(3, 60, "the policy number"),
  insurer: trimmed(2, 80, "the insurer's name"),
  claimType: z.enum(
    ["health", "motor", "home-property", "travel", "personal-accident", "life", "marine", "liability", "other"],
    { errorMap: () => ({ message: "Please choose the claim type." }) },
  ),
  incidentDate: z
    .string({ required_error: "Please enter the date of the incident." })
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter the date of the incident.")
    .refine(isNotFuture, "The incident date can't be in the future."),
  description: trimmed(20, 2000, "a brief description"),
  contactPreference,
  consent,
});

// ── Advisor / POSP application (Plan §9) ────────────────────────────────
export const experienceOptions = [
  { value: "none", label: "No prior experience" },
  { value: "sales", label: "Sales experience (non-insurance)" },
  { value: "insurance-under-2", label: "Insurance — less than 2 years" },
  { value: "insurance-2-plus", label: "Insurance — 2 years or more" },
] as const;

export const advisorInterestOptions = [
  { value: "health", label: "Health" },
  { value: "motor", label: "Motor" },
  { value: "life", label: "Life" },
  { value: "travel-home", label: "Travel & Home" },
  { value: "corporate", label: "Corporate / SME" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const advisorLeadSchema = z.object({
  fullName: trimmed(2, 80, "your full name"),
  phone: phoneSchema,
  email: emailRequired,
  city: trimmed(2, 60, "your city"),
  occupation: trimmed(2, 80, "your current occupation"),
  experience: z.enum(["none", "sales", "insurance-under-2", "insurance-2-plus"], {
    errorMap: () => ({ message: "Please choose your experience level." }),
  }),
  interests: z.array(z.string().max(40)).min(1, "Please choose at least one area of interest.").max(8),
  contactTime,
  consent,
  declaration: z.literal(true, {
    errorMap: () => ({ message: "Please confirm the declaration." }),
  }),
});

// ── Callback request ────────────────────────────────────────────────────
export const callbackLeadSchema = z.object({
  name: trimmed(2, 80, "your name"),
  phone: phoneSchema,
  topic: optionalText(80),
  contactTime,
  consent,
});

export const leadSchemas = {
  insurance: insuranceLeadSchema,
  corporate: corporateLeadSchema,
  claim: claimLeadSchema,
  advisor: advisorLeadSchema,
  callback: callbackLeadSchema,
} as const;

export type LeadData<T extends LeadType> = z.output<(typeof leadSchemas)[T]>;

export const leadMetaSchema = z.object({
  page: z.string().max(300).optional(),
  referrer: z.string().max(500).optional(),
  utm: z.record(z.string().max(120)).optional(),
});

export const leadRequestSchema = z.object({
  type: z.enum(LEAD_TYPES),
  data: z.record(z.unknown()),
  meta: leadMetaSchema.optional(),
  /** Honeypot. Real users never see or fill this. */
  website: z.string().optional(),
});

/** Converts zod issues into { fieldName: firstMessage }. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
