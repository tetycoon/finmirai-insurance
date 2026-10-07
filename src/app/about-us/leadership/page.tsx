import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { LeaderPortrait } from "@/components/ui/LeaderPortrait";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { Section } from "@/components/ui/Section";
import { absoluteUrl, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${site.leadership.name} – ${site.leadership.title}`,
  description: `Meet ${site.leadership.name}, ${site.leadership.title} of ${site.legalName}.`,
  path: "/about-us/leadership",
});

/**
 * Plan §10 recommended biography structure. Each section stays a placeholder until the client
 * approves the exact wording — do not publish Air Force, engineering, MBA, consulting or
 * years-of-experience claims before that approval.
 */
const bioSections = [
  "Professional background",
  "Technical / engineering experience",
  "Leadership and management experience",
  "Insurance industry experience",
  "Areas of insurance expertise",
];

export default function LeadershipPage() {
  const { name, title } = site.leadership;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About Us", path: "/about-us" },
          { name: "Leadership", path: "/about-us/leadership" },
        ]}
        eyebrow="Leadership"
        title={name}
        intro={<p className="text-gold-200">{title}</p>}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <LeaderPortrait className="aspect-[4/5] w-full max-w-sm" priority />
              <p className="mt-5 font-display text-xl font-bold text-navy-900">{name}</p>
              <p className="text-gold-700">{title}</p>
              <p className="mt-1 text-sm text-navy-500">{site.legalName}</p>
            </div>
          </div>
          <article className="prose-fin lg:col-span-8">
            {site.leadership.approvedBio ? (
              <p>{site.leadership.approvedBio}</p>
            ) : (
              <>
                <p>
                  {name} is the {title} of {site.legalName}.
                </p>
                {bioSections.map((s) => (
                  <section key={s}>
                    <h2>{s}</h2>
                    <p>
                      <Pending label={`${s} — approved wording`} />
                    </p>
                  </section>
                ))}
              </>
            )}
            <h2>Approach to customer service and risk advisory</h2>
            <p>
              Finmirai is built on the belief that insurance is not just about buying a policy. It is about understanding risk, choosing
              appropriate protection and having support when it matters — at renewal, when circumstances change, and when a claim arises.
            </p>
            <p>
              As Principal Officer, {name} is responsible for the firm&apos;s broking activities and the standards of advice and service it
              provides to customers.
            </p>
          </article>
        </div>
      </Section>

      <CtaBand location="leadership_cta" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name,
          jobTitle: title,
          worksFor: { "@id": absoluteUrl("/#organization") },
          url: absoluteUrl("/about-us/leadership"),
        }}
      />
    </>
  );
}
