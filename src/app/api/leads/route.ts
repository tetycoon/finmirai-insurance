import { NextResponse, type NextRequest } from "next/server";
import { fieldErrors, leadRequestSchema, leadSchemas } from "@/lib/schemas";
import { buildLead, persistLead } from "@/lib/server/leadStore";
import { rateLimit } from "@/lib/server/rateLimit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  // Reject cross-site form posts.
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) {
    return NextResponse.json({ ok: false, error: "Invalid origin." }, { status: 403 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const envelope = leadRequestSchema.safeParse(json);
  if (!envelope.success) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → almost certainly a bot. Return a normal-looking response and drop it.
  if (envelope.data.website) {
    return NextResponse.json({ ok: true, reference: "FMR-RECEIVED" });
  }

  const ip = clientIp(req);
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later, or call or WhatsApp us." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const { type, data, meta } = envelope.data;
  const parsed = leadSchemas[type].safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const lead = buildLead({
    type,
    data: parsed.data as Record<string, unknown>,
    meta,
    userAgent: req.headers.get("user-agent") ?? undefined,
    ip,
  });

  const result = await persistLead(lead);
  if (!result.stored && !result.notified) {
    return NextResponse.json(
      { ok: false, error: "We couldn't record your request right now. Please call or WhatsApp us so we can help immediately." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, reference: lead.reference });
}
