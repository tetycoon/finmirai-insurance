import { InsuranceEnquiryForm } from "@/components/forms/Forms";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { site, telHref, whatsappHref } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get Insurance Assistance",
  description:
    "Tell Finmirai what you need — health, life, motor, travel, home, personal accident or business insurance — and an advisor will contact you. No obligation.",
  path: "/get-insurance-assistance",
});

type Props = { searchParams: Promise<{ type?: string | string[] }> };

export default async function GetInsuranceAssistancePage({ searchParams }: Props) {
  const raw = (await searchParams).type;
  const defaultType = typeof raw === "string" ? raw.slice(0, 60) : "";

  return (
    <>
      <PageHero
        crumbs={[{ name: "Get Insurance Assistance", path: "/get-insurance-assistance" }]}
        eyebrow="No obligation"
        title="Get Insurance Assistance"
        intro={<p>Share a few details. It takes about two minutes, and a Finmirai advisor will get back to you to understand your need.</p>}
      />
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:col-span-8">
            <InsuranceEnquiryForm defaultType={defaultType} />
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <div className="rounded-2xl bg-navy-900 p-6 text-white">
              <h2 className="text-lg font-bold text-white">Prefer to talk now?</h2>
              <div className="mt-4 space-y-3">
                <TrackedLink kind="call" location="assistance_aside" href={telHref()} className="flex items-center gap-3 rounded-lg bg-white/5 p-3 hover:bg-white/10">
                  <Icon name="phone" className="h-5 w-5 text-gold-300" />
                  <span>
                    <span className="block text-sm text-navy-200">Call</span>
                    <span className="font-semibold">{site.contact.phoneDisplay}</span>
                  </span>
                </TrackedLink>
                <TrackedLink kind="whatsapp" location="assistance_aside" href={whatsappHref()} className="flex items-center gap-3 rounded-lg bg-white/5 p-3 hover:bg-white/10">
                  <Icon name="whatsapp" className="h-5 w-5 text-gold-300" />
                  <span>
                    <span className="block text-sm text-navy-200">WhatsApp</span>
                    <span className="font-semibold">Chat with us</span>
                  </span>
                </TrackedLink>
              </div>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-6">
              <h2 className="text-lg font-bold">What happens next</h2>
              <ol className="mt-4 space-y-3 text-[0.9375rem] text-navy-700">
                {[
                  "We review your request and assign an advisor.",
                  "The advisor contacts you by your preferred method.",
                  "We understand your need and explain suitable options.",
                  "You decide — there's no obligation to buy.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-xs font-bold text-gold-700">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
