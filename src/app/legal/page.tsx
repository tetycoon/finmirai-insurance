import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { legalNav } from "@/content/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Legal & Disclosures",
  description: "Privacy policy, terms of use, regulatory disclosures and grievance redressal for Finmirai Insurance Brokers Private Limited.",
  path: "/legal",
});

export default function LegalHubPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Legal", path: "/legal" }]}
        title="Legal & Disclosures"
        intro={<p>Privacy, terms, regulatory disclosures, disclaimers and grievance information.</p>}
      />
      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {legalNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex items-center justify-between rounded-2xl border border-navy-100 p-6 transition hover:border-navy-300 hover:shadow-card">
                <span className="flex items-center gap-3 font-display text-lg font-semibold text-navy-900">
                  <Icon name="fileText" className="h-5 w-5 text-gold-600" />
                  {l.label}
                </span>
                <Icon name="arrowRight" className="h-4 w-4 text-navy-400 group-hover:text-navy-900" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
