import { LeadershipProfile } from "@/components/leadership/LeadershipProfile";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { absoluteUrl, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${site.leadership.name} – ${site.leadership.title}`,
  description: `Meet ${site.leadership.name}, ${site.leadership.title} of ${site.legalName}.`,
  path: "/about-us/leadership",
});

export default function LeadershipPage() {
  const { name, title } = site.leadership;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About Us", path: "/about-us" },
          { name: "Leadership", path: "/about-us/leadership" },
        ]}
        eyebrow="About Finmirai"
        title="Leadership"
        intro={
          <p>
            Meet the {title} of {site.legalName}.
          </p>
        }
      />

      <LeadershipProfile priority />

      <Section tone="mist" labelledBy="approach-heading">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10 lg:gap-16">
          <article className="prose-fin md:col-span-7 md:col-start-6 lg:col-span-8 lg:col-start-5">
            <h2 id="approach-heading" className="!mt-0">
              Approach to customer service and risk advisory
            </h2>
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
