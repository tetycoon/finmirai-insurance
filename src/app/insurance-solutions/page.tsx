import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/content/images";
import { advisoryProcess } from "@/content/process";
import { personalProducts } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Personal Insurance Solutions – Health, Life, Motor, Travel & Home",
  description:
    "Health, life, motor, travel, home and personal accident insurance guidance for individuals and families in Chennai and across India, with ongoing servicing and claims support.",
  path: "/insurance-solutions",
});

const lifeStages = [
  { icon: "user", title: "Starting out", text: "Health and personal accident cover before responsibilities grow." },
  { icon: "users", title: "Growing family", text: "Family health cover, term life protection and home insurance." },
  { icon: "car", title: "Vehicles & travel", text: "Motor renewals done right, and travel cover for every trip." },
  { icon: "heartPulse", title: "Parents & seniors", text: "Age-appropriate health cover with clear terms on co-pay and waiting periods." },
] as const;

export default function InsuranceSolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insurance Solutions", path: "/insurance-solutions" }]}
        eyebrow="For individuals & families"
        title="Insurance Solutions for You and Your Family"
        intro={
          <p>
            Protection for your health, income, vehicles, travel and home — explained clearly, chosen carefully and serviced for as long as
            you hold the policy.
          </p>
        }
        image={images.familyMotherDaughter}
        actions={
          <>
            <ButtonLink href="/get-insurance-assistance" variant="gold" size="lg" iconRight="arrowRight">
              Get Insurance Assistance
            </ButtonLink>
            <ButtonLink href="/claims-support" variant="outlineLight" size="lg" icon="headset">
              Claims Support
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="products-heading">
        <SectionHeading
          id="products-heading"
          eyebrow="Personal insurance"
          title="Choose the protection you're thinking about"
          intro="Each page explains who the cover is for, what it protects, what to check and how we help."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {personalProducts.map((p) => (
            <ProductCard key={p.slug} product={p} withImage />
          ))}
        </div>
      </Section>

      <Section tone="mist" labelledBy="stages-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              id="stages-heading"
              eyebrow="Not sure where to start?"
              title="Insurance that follows your life stage"
              intro="Most families need a few covers working together. We start with your situation, not a product list."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {lifeStages.map((s) => (
                <div key={s.title} className="rounded-xl border border-navy-100 bg-white p-5">
                  <Icon name={s.icon} className="h-6 w-6 text-gold-600" />
                  <h3 className="mt-3 font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy-600">{s.text}</p>
                </div>
              ))}
            </div>
            <ButtonLink href="/get-insurance-assistance?type=review" variant="navy" className="mt-8" iconRight="arrowRight">
              Review my existing policies
            </ButtonLink>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]">
            <Image src={images.elderGrandson.src} alt={images.elderGrandson.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <Section labelledBy="process-heading">
        <SectionHeading id="process-heading" eyebrow="Our process" title="From first question to ongoing service" />
        <div className="mt-10">
          <ProcessSteps steps={advisoryProcess} />
        </div>
      </Section>

      <CtaBand location="insurance_solutions" />
    </>
  );
}
