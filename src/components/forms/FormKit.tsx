"use client";

import Link from "next/link";
import { createContext, useContext, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { ZodTypeAny } from "zod";
import { telHref, whatsappHref } from "@/content/site";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { track } from "@/lib/analytics";
import { fieldErrors, type LeadType } from "@/lib/schemas";

type Ctx = { prefix: string; errors: Record<string, string> };
const FormCtx = createContext<Ctx>({ prefix: "f", errors: {} });

function useField(name: string) {
  const { prefix, errors } = useContext(FormCtx);
  const id = `${prefix}-${name}`;
  const error = errors[name];
  return { id, error, errorId: `${id}-error`, hintId: `${id}-hint` };
}

// ───────────────────────── Form engine ─────────────────────────

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm({
  type,
  schema,
  arrayFields = [],
  submitLabel,
  successTitle,
  successText,
  children,
  compact = false,
}: {
  type: LeadType;
  schema: ZodTypeAny;
  arrayFields?: string[];
  submitLabel: string;
  successTitle: string;
  successText: ReactNode;
  children: ReactNode;
  compact?: boolean;
}) {
  const prefix = useId().replace(/:/g, "");
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  function collect(form: HTMLFormElement) {
    const fd = new FormData(form);
    const data: Record<string, unknown> = {};
    for (const el of Array.from(form.elements) as HTMLInputElement[]) {
      const name = el.name;
      if (!name || name === "website" || name in data) continue;
      if (arrayFields.includes(name)) data[name] = fd.getAll(name).map(String);
      else if (el.type === "checkbox") data[name] = fd.get(name) === "on";
      else data[name] = String(fd.get(name) ?? "");
    }
    return { data, honeypot: String(fd.get("website") ?? "") };
  }

  function focusFirstError(errs: Record<string, string>) {
    const first = Object.keys(errs)[0];
    if (!first || !formRef.current) return;
    const el = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const { data, honeypot } = collect(form);

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      setFormError("Please check the highlighted fields.");
      focusFirstError(errs);
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus("submitting");

    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 120);
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          data,
          website: honeypot,
          meta: { page: window.location.pathname, referrer: document.referrer.slice(0, 500) || undefined, utm },
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; error?: string; fields?: Record<string, string> };
      if (res.ok && body.ok) {
        setReference(body.reference ?? null);
        setStatus("success");
        track("lead_submit", { lead_type: type });
        form.reset();
        formRef.current?.closest("[data-form-root]")?.scrollIntoView({ block: "start", behavior: "smooth" });
        return;
      }
      if (body.fields) {
        setErrors(body.fields);
        focusFirstError(body.fields);
      }
      setFormError(body.error ?? "Something went wrong. Please try again, or call or WhatsApp us.");
      setStatus("error");
    } catch {
      setFormError("We couldn't reach our server. Please check your connection, or call or WhatsApp us.");
      setStatus("error");
    }
  }

  function clearFieldError(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name;
    if (name && errors[name]) {
      setErrors(({ [name]: _removed, ...rest }) => rest);
    }
  }

  if (status === "success") {
    return (
      <div data-form-root>
        <SuccessState title={successTitle} reference={reference} onReset={() => setStatus("idle")}>
          {successText}
        </SuccessState>
      </div>
    );
  }

  return (
    <FormCtx.Provider value={{ prefix, errors }}>
      <form ref={formRef} data-form-root noValidate onSubmit={onSubmit} onChange={clearFieldError} className={compact ? "space-y-4" : "space-y-5"}>
        {formError ? (
          <div role="alert" className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{formError}</span>
          </div>
        ) : null}

        {children}

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <Button type="submit" variant="navy" size="lg" className="w-full sm:w-auto" disabled={status === "submitting"} iconRight={status === "submitting" ? undefined : "arrowRight"}>
          {status === "submitting" ? "Sending…" : submitLabel}
        </Button>
      </form>
    </FormCtx.Provider>
  );
}

function SuccessState({ title, reference, children, onReset }: { title: string; reference: string | null; children: ReactNode; onReset: () => void }) {
  return (
    <div role="status" aria-live="polite" className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
        <Icon name="check" className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-2xl font-bold text-navy-900">{title}</h3>
      {reference ? (
        <p className="mt-2 text-navy-700">
          Your reference number is <strong className="font-mono text-navy-900">{reference}</strong>. Please keep it for any follow-up.
        </p>
      ) : null}
      <div className="mt-3 leading-relaxed text-navy-700">{children}</div>
      <div className="mt-6 flex flex-wrap gap-3">
        <TrackedLink kind="whatsapp" location="form_success" href={whatsappHref(reference ? `Hello Finmirai, my reference number is ${reference}.` : undefined)} className={buttonClasses("outline", "md")}>
          <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp us
        </TrackedLink>
        <TrackedLink kind="call" location="form_success" href={telHref()} className={buttonClasses("outline", "md")}>
          <Icon name="phone" className="h-5 w-5" /> Call us
        </TrackedLink>
        <button type="button" onClick={onReset} className="text-sm font-semibold text-navy-700 underline underline-offset-2 hover:text-navy-950">
          Submit another request
        </button>
      </div>
    </div>
  );
}

// ───────────────────────── Fields ─────────────────────────

function Label({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-navy-800">
      {children}
      {required ? <span className="ml-0.5 text-red-600" aria-hidden>*</span> : <span className="ml-1.5 font-normal text-navy-400">(optional)</span>}
    </label>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
      <Icon name="alert" className="h-3.5 w-3.5 shrink-0" />
      {error}
    </p>
  ) : null;
}

function describedBy(error: string | undefined, errorId: string, hint: string | undefined, hintId: string) {
  return [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;
}

export function TextField({
  name,
  label,
  type = "text",
  required = false,
  hint,
  className = "",
  ...rest
}: {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date";
  required?: boolean;
  hint?: string;
  className?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  defaultValue?: string;
  max?: string;
  maxLength?: number;
}) {
  const { id, error, errorId, hintId } = useField(name);
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(error, errorId, hint, hintId)}
        className="field-input"
        {...rest}
      />
      {hint ? (
        <p id={hintId} className="mt-1.5 text-[0.8125rem] text-navy-500">
          {hint}
        </p>
      ) : null}
      <ErrorText id={errorId} error={error} />
    </div>
  );
}

export function TextArea({
  name,
  label,
  required = false,
  hint,
  rows = 4,
  className = "",
  placeholder,
  maxLength,
}: {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  rows?: number;
  className?: string;
  placeholder?: string;
  maxLength?: number;
}) {
  const { id, error, errorId, hintId } = useField(name);
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(error, errorId, hint, hintId)}
        className="field-input resize-y"
      />
      {hint ? (
        <p id={hintId} className="mt-1.5 text-[0.8125rem] text-navy-500">
          {hint}
        </p>
      ) : null}
      <ErrorText id={errorId} error={error} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  options,
  required = false,
  placeholder = "Please choose",
  defaultValue = "",
  className = "",
}: {
  name: string;
  label: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}) {
  const { id, error, errorId } = useField(name);
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="field-input appearance-none pr-10"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
      </div>
      <ErrorText id={errorId} error={error} />
    </div>
  );
}

export function ChoiceGroup({
  name,
  legend,
  options,
  multiple = false,
  required = false,
  columns = 2,
  defaultValue,
  className = "",
}: {
  name: string;
  legend: string;
  options: readonly { value: string; label: string }[];
  multiple?: boolean;
  required?: boolean;
  columns?: 2 | 3;
  defaultValue?: string;
  className?: string;
}) {
  const { id, error, errorId } = useField(name);
  return (
    <fieldset className={className} aria-describedby={error ? errorId : undefined} aria-invalid={error ? true : undefined}>
      <legend className="mb-2 text-sm font-semibold text-navy-800">
        {legend}
        {required ? <span className="ml-0.5 text-red-600" aria-hidden>*</span> : null}
        {multiple ? <span className="ml-1.5 font-normal text-navy-400">(choose all that apply)</span> : null}
      </legend>
      <div className={`grid gap-2 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {options.map((o, i) => (
          <label
            key={o.value}
            htmlFor={`${id}-${i}`}
            className={`flex cursor-pointer items-center gap-2.5 rounded-lg border bg-white px-3 py-2.5 text-[0.9375rem] text-navy-800 transition hover:border-navy-300 has-[:checked]:border-navy-700 has-[:checked]:bg-navy-50 ${
              error ? "border-red-300" : "border-navy-200"
            }`}
          >
            <input
              id={`${id}-${i}`}
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={o.value}
              defaultChecked={defaultValue === o.value}
              className="h-4 w-4 shrink-0 accent-navy-800"
            />
            {o.label}
          </label>
        ))}
      </div>
      <ErrorText id={errorId} error={error} />
    </fieldset>
  );
}

export function Checkbox({ name, children }: { name: string; children: ReactNode }) {
  const { id, error, errorId } = useField(name);
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-navy-700">
        <input
          id={id}
          type="checkbox"
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 accent-navy-800"
        />
        <span>{children}</span>
      </label>
      <ErrorText id={errorId} error={error} />
    </div>
  );
}

/** Standard consent checkbox (Plan §7, §15: consent logging). Wording is a DRAFT for compliance review. */
export function ConsentField() {
  return (
    <Checkbox name="consent">
      I agree that Finmirai Insurance Brokers Private Limited may contact me by phone, WhatsApp or email about this request, and I have read
      the{" "}
      <Link href="/legal/privacy-policy" className="font-medium text-navy-900 underline decoration-gold-400 underline-offset-2" target="_blank">
        Privacy Policy
      </Link>
      .<span className="text-red-600" aria-hidden> *</span>
    </Checkbox>
  );
}

export function FormRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

export function FormNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg bg-mist px-3.5 py-3 text-[0.8125rem] leading-relaxed text-navy-600">
      <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" />
      <span>{children}</span>
    </p>
  );
}
