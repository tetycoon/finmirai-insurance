import { ArticleBrowser } from "@/components/knowledge/ArticleBrowser";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { articles } from "@/content/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Knowledge Centre – Insurance Guides & FAQs",
  description:
    "Plain-language insurance guides from Finmirai: health insurance, term life, motor renewal, claims documents, group mediclaim and more.",
  path: "/knowledge-centre",
});

const generalFaqs = [
  { q: "What is the difference between an insurance broker and an agent?", a: "An insurance agent typically represents one or a limited number of insurers. A broker can approach multiple insurers and works on behalf of the customer to arrange suitable cover." },
  { q: "Does using a broker cost more?", a: "Ask your broker how they are remunerated for your policy. We will always explain this transparently." },
  { q: "What is the 'free look' period?", a: "Many policies give you a period after receiving the policy document to review it and cancel if it doesn't suit you, subject to the insurer's terms. Check your policy for the exact period and conditions." },
  { q: "How often should I review my insurance?", a: "At least once a year, at renewal, and whenever something important changes — marriage, a child, a new home or vehicle, a new job or a new business activity." },
];

export default function KnowledgeCentrePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Knowledge Centre", path: "/knowledge-centre" }]}
        eyebrow="Knowledge centre"
        title="Insurance, Explained Clearly"
        intro={<p>Practical guides that answer real questions — so you can make decisions with confidence before you buy, renew or claim.</p>}
      />
      <Section tone="mist">
        <ArticleBrowser articles={articles} />
      </Section>
      <Section id="faqs" labelledBy="gfaq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading id="gfaq-heading" eyebrow="FAQs" title="General insurance questions" className="lg:col-span-4" />
          <div className="lg:col-span-8">
            <FaqList faqs={generalFaqs} />
          </div>
        </div>
      </Section>
      <CtaBand title="Have a question we haven't answered?" text="Ask us directly — a Finmirai advisor will explain it in plain language." location="kc_cta" />
    </>
  );
}
