import "server-only";
import { createHmac, randomBytes } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { CONSENT_VERSION, type LeadType } from "@/lib/schemas";

/**
 * Lead persistence (Plan §12: "Every enquiry is stored, assigned and followed up").
 *
 * Phase-1 default: append-only JSON Lines file in ./.data/leads.jsonl, plus an optional webhook
 * (CRM, Zapier/Make, email relay). For production, implement `LeadRepository` against PostgreSQL
 * (Plan §14) and swap it in `getRepository()` — the API route does not need to change.
 */

export type LeadStatus = "new" | "contacted" | "qualified" | "in_progress" | "converted" | "closed";

export type LeadRecord = {
  id: string;
  reference: string;
  type: LeadType;
  /** Plan §12 lead types: corporate is higher priority; claims are service requests, not sales leads. */
  category: "sales" | "service" | "recruitment" | "callback";
  priority: "normal" | "high";
  status: LeadStatus;
  assignedTo: string | null;
  data: Record<string, unknown>;
  consent: { given: true; version: string; at: string };
  meta: {
    page?: string;
    referrer?: string;
    utm?: Record<string, string>;
    userAgent?: string;
    ipHash?: string;
    receivedAt: string;
  };
};

export interface LeadRepository {
  save(lead: LeadRecord): Promise<void>;
}

const REF_PREFIX: Record<LeadType, string> = {
  insurance: "INS",
  quote: "QTE",
  corporate: "CORP",
  claim: "CLM",
  advisor: "ADV",
  callback: "CB",
};

const CATEGORY: Record<LeadType, LeadRecord["category"]> = {
  insurance: "sales",
  quote: "sales",
  corporate: "sales",
  claim: "service",
  advisor: "recruitment",
  callback: "callback",
};

export function buildLead(input: {
  type: LeadType;
  data: Record<string, unknown>;
  meta?: { page?: string; referrer?: string; utm?: Record<string, string> };
  userAgent?: string;
  ip?: string;
}): LeadRecord {
  const now = new Date();
  const ymd = now.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = randomBytes(3).toString("hex").toUpperCase();
  const { consent: _consent, declaration: _declaration, ...data } = input.data;
  return {
    id: `${now.getTime().toString(36)}-${randomBytes(4).toString("hex")}`,
    reference: `FMR-${REF_PREFIX[input.type]}-${ymd}-${rand}`,
    type: input.type,
    category: CATEGORY[input.type],
    priority: input.type === "corporate" || input.type === "claim" ? "high" : "normal",
    status: "new",
    assignedTo: null,
    data,
    consent: { given: true, version: CONSENT_VERSION, at: now.toISOString() },
    meta: {
      ...input.meta,
      userAgent: input.userAgent?.slice(0, 300),
      // Store a salted hash, not the raw IP (data minimisation).
      ipHash: input.ip ? createHmac("sha256", process.env.LEAD_WEBHOOK_SECRET || "finmirai").update(input.ip).digest("hex").slice(0, 16) : undefined,
      receivedAt: now.toISOString(),
    },
  };
}

class JsonlFileRepository implements LeadRepository {
  constructor(private readonly file: string) {}
  async save(lead: LeadRecord) {
    await mkdir(path.dirname(this.file), { recursive: true });
    await appendFile(this.file, `${JSON.stringify(lead)}\n`, "utf8");
  }
}

function getRepository(): LeadRepository {
  return new JsonlFileRepository(path.join(process.cwd(), ".data", "leads.jsonl"));
}

async function sendWebhook(lead: LeadRecord): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const body = JSON.stringify(lead);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.LEAD_WEBHOOK_SECRET) {
    headers["X-Finmirai-Signature"] = createHmac("sha256", process.env.LEAD_WEBHOOK_SECRET).update(body).digest("hex");
  }
  const res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(8000) });
  return res.ok;
}

/**
 * Persists the lead and notifies the team. Succeeds if at least one channel (storage or webhook)
 * accepted the lead, so an enquiry is never silently lost.
 */
export async function persistLead(lead: LeadRecord): Promise<{ stored: boolean; notified: boolean }> {
  const [stored, notified] = await Promise.all([
    getRepository()
      .save(lead)
      .then(() => true)
      .catch((err) => {
        console.error("[leads] storage failed", lead.reference, err);
        return false;
      }),
    sendWebhook(lead).catch((err) => {
      console.error("[leads] webhook failed", lead.reference, err);
      return false;
    }),
  ]);
  return { stored, notified };
}
