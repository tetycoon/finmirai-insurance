import { CorporateEnquiryForm, InsuranceEnquiryForm } from "@/components/forms/Forms";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { advisoryProcess } from "@/content/process";
import { getProductBySlug, productHref, segmentBase, type Product } from "@/content/products";
import { whatsappHref } from "@/content/site";
import { serviceSchema } from "@/lib/structuredData";

const jumpLinks = [
  { id: "who-is-it-for", label: "Who it's for" },
  { id: "cover", label: "Key cover" },
  { id: "what-to-check", label: "What to check" },
  { id: "how-we-help", label: "How we help" },
  { id: "faq", label: "FAQs" },
  { id: "enquire", label: "Enquire" },
];

export function ProductPageTemplate({ product }: { product: Product }) {
  const isCorporate = product.segment === "corporate";
  const hub = isCorporate
    ? { name: "Corporate Insurance", path: segmentBase.corporate }
    : { name: "Insurance Solutions", path: segmentBase.personal };
  const related = product.related.map(getProductBySlug).filter((p): p is Product => Boolean(p));
  const path = productHref(product);

  return (
    <>
      <PageHero
        crumbs={[hub, { name: product.name, path }]}
        eyebrow={isCorporate ? "Corporate insurance" : "Personal insurance"}
        title={product.h1}
        intro={<p>{product.heroLine}</p>}
        image={product.image}
        actions={
          <>
            <ButtonLink href="#enquire" variant="gold" size="lg" iconRight="arrowRight">
              {isCorporate ? "Request Corporate Consultation" : "Get Insurance Assistance"}
            </ButtonLink>
            <ButtonLink href={whatsappHref(`Hello Finmirai, I'd like help with ${product.name}.`)} variant="outlineLight" size="lg" icon="whatsapp">
              WhatsApp
            </ButtonLink>
          </>
        }
      />

      {/* On-page navigation */}
      <nav aria-label="On this page" className="border-b border-navy-100 bg-white">
        <div className="container flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {jumpLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium text-navy-600 transition hover:bg-navy-50 hover:text-navy-900">
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Who is it for + What does it help protect */}
      <Section id="who-is-it-for" labelledBy="who-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="who-heading" eyebrow="Who is it for?" title={`Is ${product.shortName.toLowerCase()} cover right for you?`} />
            <ul className="mt-8 space-y-3">
              {product.whoFor.map((w) => (
                <li key={w} className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-navy-800">{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">What does it help protect?</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">The risk, in plain English</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-navy-700">
              {product.protects.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Key cover areas */}
      <Section id="cover" tone="mist" labelledBy="cover-heading">
        <SectionHeading
          id="cover-heading"
          eyebrow="Key cover areas"
          title="What a policy typically includes"
          intro="Cover differs between insurers and plans. These are the areas we walk you through — the policy wording always decides."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.coverAreas.map((c) => (
            <div key={c.title} className="rounded-2xl border border-navy-100 bg-white p-6">
              <Icon name="shield" className="h-6 w-6 text-gold-500" />
              <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
              <p className="mt-1.5 leading-relaxed text-navy-600">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What to check */}
      <Section id="what-to-check" labelledBy="check-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="check-heading" eyebrow="What to check" title="Read this before comparing premiums" />
            <p className="mt-4 leading-relaxed text-navy-600">
              The cheapest policy is rarely the one that serves you best at claim time. These are the terms we always check with you.
            </p>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:col-span-8">
            {product.whatToCheck.map((c) => (
              <div key={c.title} className="bg-white p-6">
                <dt className="flex items-center gap-2 font-display font-semibold text-navy-900">
                  <Icon name="search" className="h-4 w-4 text-gold-600" />
                  {c.title}
                </dt>
                <dd className="mt-1.5 leading-relaxed text-navy-600">{c.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* How Finmirai helps + process */}
      <Section id="how-we-help" tone="navy" labelledBy="help-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            id="help-heading"
            light
            eyebrow="How Finmirai helps"
            title="Advice before you buy. Support after you do."
            intro="As your broker, our job is to understand your need, explain options honestly and stay with you for servicing and claims."
          />
          <ul className="space-y-4">
            {product.howWeHelp.map((h) => (
              <li key={h} className="flex items-start gap-3 text-navy-100">
                <Icon name="checkCircle" className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <h3 className="mb-6 mt-14 text-xl font-semibold text-white">How it works</h3>
        <ProcessSteps steps={advisoryProcess} light />
      </Section>

      {/* FAQ */}
      <Section id="faq" labelledBy="faq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-heading" eyebrow="FAQs" title={`${product.name}: common questions`} />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={product.faqs} />
          </div>
        </div>
      </Section>

      {/* Enquiry */}
      <Section id="enquire" tone="mist" labelledBy="enquire-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="enquire-heading"
              eyebrow={isCorporate ? "Request a consultation" : "Get insurance assistance"}
              title={`Talk to us about ${product.shortName.toLowerCase()} cover`}
              intro="Share a few details and an advisor will contact you. There's no obligation to buy."
            />
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:col-span-8">
            {isCorporate ? <CorporateEnquiryForm /> : <InsuranceEnquiryForm defaultType={product.slug} />}
          </div>
        </div>
      </Section>

      {/* Related + disclaimer */}
      {related.length ? (
        <Section labelledBy="related-heading">
          <SectionHeading id="related-heading" eyebrow="Related" title="You may also want to consider" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-12">
            <Disclaimer specific={product.disclaimer} />
          </div>
        </Section>
      ) : null}

      <JsonLd
        data={serviceSchema({
          name: product.name,
          description: product.metaDescription,
          path,
          audience: isCorporate ? "Businesses and corporates" : "Individuals and families",
        })}
      />
    </>
  );
}
