import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/structuredData";
import { Icon } from "./Icon";

/** Accessible, no-JS accordion using <details>. Emits FAQPage structured data. */
export function FaqList({ faqs, withSchema = true }: { faqs: { q: string; a: string }[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group px-5 sm:px-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left font-display text-base font-semibold text-navy-900 sm:text-lg">
              <span>{f.q}</span>
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy-100 text-navy-600 transition-transform group-open:rotate-180">
                <Icon name="chevronDown" className="h-4 w-4" />
              </span>
            </summary>
            <p className="-mt-1 pb-5 pr-10 leading-relaxed text-navy-600">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema ? <JsonLd data={faqSchema(faqs)} /> : null}
    </>
  );
}
