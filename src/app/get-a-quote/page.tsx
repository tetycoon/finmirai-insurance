import { QuoteForm } from "@/components/forms/Forms";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon, type IconName } from "@/components/ui/Icon";
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

const reasons: { title: string; text: string; icon: IconName }[] = [
  { title: "Options explained clearly", text: "Cover, exclusions and costs in plain language.", icon: "compass" },
  { title: "Multiple insurance solutions", text: "Personal, family and business cover in one place.", icon: "layers" },
  { title: "Support after you buy", text: "Renewals, changes and claims guidance.", icon: "refresh" },
];

const nextSteps = ["An advisor reviews your requirement", "We contact you to understand your needs", "You receive suitable options and quotes"];

/**
 * Dedicated quote page for the header "Get a Quote" button.
 * Desktop: form on the left (scrolls with the page), info panel on the right stays pinned (sticky).
 * Phones: form first, info below.
 */
export default async function GetAQuotePage({ searchParams }: Props) {
  const raw = (await searchParams).type;
  const defaultType = typeof raw === "string" ? raw.slice(0, 60) : "";

  return (
    <section className="bg-mist pb-16 pt-4 sm:pb-20 sm:pt-5">
      <div className="container">
        <Breadcrumbs items={[{ name: "Get a Quote", path: "/get-a-quote" }]} />

        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* ── Left: the form ── */}
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card lg:col-span-7">
            <header className="border-b border-navy-100 bg-navy-900 px-5 py-5 text-white sm:px-8">
              <div className="flex items-start gap-4">
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300 sm:flex">
                  <Icon name="shield" className="h-6 w-6" />
                </span>
                <div>
                  <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Get Your Insurance Quote</h1>
                  <p className="mt-1.5 leading-relaxed text-navy-100">
                    Tell us a little about what you need. A Finmirai advisor will get back to you with suitable options and quotes — no
                    obligation.
                  </p>
                </div>
              </div>
            </header>
            <div className="px-5 py-5 sm:px-8 sm:py-6">
              <QuoteForm defaultType={defaultType} />
            </div>
          </div>

          {/* ── Right: pinned info panel (sticky on desktop) ── */}
          <aside
            aria-label="About your quote"
            className="space-y-3 lg:sticky lg:top-[8rem] lg:col-span-5"
          >
            <div className="overflow-hidden rounded-2xl bg-navy-900 text-white">
              <div className="p-5">
                <p className="eyebrow eyebrow-light">Why Finmirai</p>
                <ul className="mt-3 space-y-3">
                  {reasons.map((r) => (
                    <li key={r.title} className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400/15 text-gold-300">
                        <Icon name={r.icon} className="h-[18px] w-[18px]" />
                      </span>
                      <span>
                        <span className="block font-semibold">{r.title}</span>
                        <span className="block text-sm text-navy-200">{r.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-4 sm:p-5">
              <p className="font-display font-semibold text-navy-900">Prefer to talk?</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <TrackedLink
                  kind="call"
                  location="quote_page"
                  href={telHref()}
                  className="inline-flex items-center gap-2 rounded-lg border border-navy-100 px-3 py-2.5 text-[0.9375rem] font-medium text-navy-800 hover:border-navy-300"
                >
                  <Icon name="phone" className="h-4 w-4 text-gold-600" /> {site.contact.phoneDisplay}
                </TrackedLink>
                <TrackedLink
                  kind="whatsapp"
                  location="quote_page"
                  href={whatsappHref("Hello Finmirai, I'd like an insurance quote.")}
                  className="inline-flex items-center gap-2 rounded-lg border border-navy-100 px-3 py-2.5 text-[0.9375rem] font-medium text-navy-800 hover:border-navy-300"
                >
                  <Icon name="whatsapp" className="h-4 w-4 text-gold-600" /> WhatsApp us
                </TrackedLink>
              </div>
            </div>

            <div className="rounded-2xl border border-navy-100 bg-white p-4 sm:p-5">
              <p className="font-display font-semibold text-navy-900">What happens next</p>
              <ol className="mt-2.5 space-y-1.5 text-sm text-navy-700">
                {nextSteps.map((t, i) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-[0.7rem] font-bold text-gold-700">
                      {i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-navy-100 pt-3 text-xs leading-relaxed text-navy-500">
                Quotes are indicative and subject to the insurer&apos;s underwriting, policy terms and conditions. Insurance is the subject
                matter of solicitation.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
