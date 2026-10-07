import { QuoteForm } from "@/components/forms/Forms";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { site, telHref, whatsappHref } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get Your Insurance Quote",
  description:
    "Request an insurance quote from Finmirai Insurance Brokers. Share a few details about the health, life, motor, travel, home or business cover you need and an advisor will contact you.",
  path: "/get-a-quote",
});

type Props = { searchParams: Promise<{ type?: string | string[] }> };

/**
 * Dedicated quote page for the header "Get a Quote" button.
 * The form is the first thing on the page — no large banner above it.
 */
export default async function GetAQuotePage({ searchParams }: Props) {
  const raw = (await searchParams).type;
  const defaultType = typeof raw === "string" ? raw.slice(0, 60) : "";

  return (
    <section className="bg-mist pb-16 pt-6 sm:pb-20 sm:pt-8">
      <div className="container max-w-3xl">
        <Breadcrumbs items={[{ name: "Get a Quote", path: "/get-a-quote" }]} />

        <div className="mt-5 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
          <header className="border-b border-navy-100 bg-navy-900 px-5 py-6 text-white sm:px-8">
            <div className="flex items-start gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300 sm:flex">
                <Icon name="shield" className="h-6 w-6" />
              </span>
              <div>
                <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Get Your Insurance Quote</h1>
                <p className="mt-1.5 leading-relaxed text-navy-100">
                  Tell us a little about what you need. A Finmirai advisor will get back to you with suitable options and quotes — no obligation.
                </p>
              </div>
            </div>
          </header>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <QuoteForm defaultType={defaultType} />
          </div>
        </div>

        {/* Secondary info sits below the form, never above it */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 bg-white p-5">
            <p className="font-display font-semibold text-navy-900">Prefer to talk?</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
              <TrackedLink kind="call" location="quote_page" href={telHref()} className="inline-flex items-center gap-2 font-medium text-navy-800 hover:text-navy-950">
                <Icon name="phone" className="h-4 w-4 text-gold-600" /> {site.contact.phoneDisplay}
              </TrackedLink>
              <TrackedLink
                kind="whatsapp"
                location="quote_page"
                href={whatsappHref("Hello Finmirai, I'd like an insurance quote.")}
                className="inline-flex items-center gap-2 font-medium text-navy-800 hover:text-navy-950"
              >
                <Icon name="whatsapp" className="h-4 w-4 text-gold-600" /> WhatsApp us
              </TrackedLink>
            </div>
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-5">
            <p className="font-display font-semibold text-navy-900">What happens next</p>
            <ul className="mt-3 space-y-1.5 text-sm text-navy-700">
              {["An advisor reviews your requirement", "We contact you to understand your needs", "You receive suitable options and quotes"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-5 text-center text-xs leading-relaxed text-navy-500">
          Quotes are indicative and subject to the insurer&apos;s underwriting, policy terms and conditions. Insurance is the subject matter of
          solicitation.
        </p>
      </div>
    </section>
  );
}
