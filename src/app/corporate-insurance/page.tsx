import Image from "next/image";
import Link from "next/link";
import { CorporateEnquiryForm } from "@/components/forms/Forms";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/content/images";
import { corporateProducts, productHref } from "@/content/products";
import { whatsappHref } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Corporate & Business Insurance Broker – Chennai",
  description:
    "Corporate insurance for property, people, liability, marine, engineering and cyber risks. Finmirai helps businesses map risks, structure insurance programmes and manage renewals and claims.",
  path: "/corporate-insurance",
  image: images.factoryFloor.src,
});

/** Plan §7 risk-area table, each row linked to its solution page. */
const riskAreas: { area: string; icon: IconName; solutions: string; href: string }[] = [
  { area: "Property", icon: "factory", solutions: "Property, fire and related business asset protection", href: "/corporate-insurance/property-fire-insurance" },
  { area: "People", icon: "users", solutions: "Group Mediclaim, Group Personal Accident, Group Term Life", href: "/corporate-insurance/employee-benefits" },
  { area: "Legal / liability", icon: "scale", solutions: "Liability and Workmen Compensation", href: "/corporate-insurance/liability-insurance" },
  { area: "Movement / goods", icon: "ship", solutions: "Marine and relevant transit risks", href: "/corporate-insurance/marine-insurance" },
  { area: "Engineering", icon: "cog", solutions: "Engineering and industrial covers where applicable", href: "/corporate-insurance/engineering-insurance" },
  { area: "Digital risk", icon: "lock", solutions: "Cyber insurance where applicable", href: "/corporate-insurance/cyber-insurance" },
  { area: "Employee benefits", icon: "handshake", solutions: "Structured employee insurance programmes", href: "/corporate-insurance/employee-benefits" },
];

const corporateProcess = [
  { title: "Discovery", text: "Understand operations, assets, people, contracts and current covers." },
  { title: "Risk mapping", text: "Identify exposures and gaps, and prioritise them with you." },
  { title: "Market approach", text: "Present accurate underwriting information to suitable insurers." },
  { title: "Recommendation", text: "Compare terms, exclusions, deductibles and premium side by side." },
  { title: "Placement", text: "Documentation, policy issuance and certificates." },
  { title: "Year-round service", text: "Endorsements, claims support and renewal reviews." },
];

const corporateCovers = [
  "Property Insurance",
  "Fire & Special Perils",
  "Industrial / Factory Insurance",
  "Marine Insurance",
  "Liability Insurance",
  "Workmen Compensation",
  "Group Personal Accident",
  "Group Mediclaim",
  "Group Term Life",
  "Employee Benefits",
];

const otherAreas = ["Surety bonds", "Workmen / employees' compensation", "Business interruption", "Contract-required covers and certificates"];

export default function CorporateInsurancePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Corporate Insurance", path: "/corporate-insurance" }]}
        eyebrow="For businesses & corporates"
        title="Protect Your Business. Protect Your People."
        intro={
          <p>
            Insurance structured around the real risks in your business — property, people, liability, goods in transit, engineering and
            digital risk — with a broker who stays involved through renewals and claims.
          </p>
        }
        image={images.factoryFloor}
        actions={
          <>
            <ButtonLink href="#consultation" variant="gold" size="lg" iconRight="arrowRight">
              Request Corporate Consultation
            </ButtonLink>
            <ButtonLink href={whatsappHref("Hello Finmirai, I'd like to discuss business insurance.")} variant="outlineLight" size="lg" icon="whatsapp">
              WhatsApp
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="risk-heading">
        <SectionHeading
          id="risk-heading"
          eyebrow="Start with your risks"
          title="Where could your business be exposed?"
          intro="Business owners should see their own risks in the structure, not a list of product names. Choose an area to learn more."
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-navy-100">
          <div className="hidden grid-cols-12 bg-navy-900 px-6 py-3 text-sm font-semibold text-white sm:grid">
            <span className="col-span-4">Risk area</span>
            <span className="col-span-8">Potential solution groups</span>
          </div>
          <ul className="divide-y divide-navy-100">
            {riskAreas.map((r) => (
              <li key={r.area}>
                <Link href={r.href} className="group grid items-center gap-2 bg-white px-6 py-5 transition hover:bg-navy-50 sm:grid-cols-12">
                  <span className="flex items-center gap-3 font-display text-lg font-semibold text-navy-900 sm:col-span-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-800 ring-1 ring-navy-100 group-hover:bg-navy-900 group-hover:text-gold-300">
                      <Icon name={r.icon} className="h-5 w-5" />
                    </span>
                    {r.area}
                  </span>
                  <span className="flex items-center justify-between gap-4 text-navy-600 sm:col-span-8">
                    {r.solutions}
                    <Icon name="arrowRight" className="h-4 w-4 shrink-0 text-navy-400 transition group-hover:translate-x-0.5 group-hover:text-navy-900" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 rounded-2xl border border-navy-100 bg-mist p-6 sm:p-8">
          <h3 className="text-xl font-bold">Corporate Insurance</h3>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {corporateCovers.map((c) => (
              <li key={c} className="flex items-center gap-2 text-navy-700">
                <Icon name="check" className="h-4 w-4 shrink-0 text-gold-600" /> {c}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-sm text-navy-500">
          We can also discuss: {otherAreas.join(" · ")}. Availability depends on insurer appetite and your risk profile.
        </p>
      </Section>

      <Section tone="mist" labelledBy="solutions-heading">
        <SectionHeading id="solutions-heading" eyebrow="Corporate solutions" title="Explore business insurance" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {corporateProducts.map((p) => (
            <Link
              key={p.slug}
              href={productHref(p)}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-2xl bg-navy-900 p-6 text-white"
            >
              <Image src={p.image.src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover opacity-45 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-35" />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" aria-hidden />
              <span className="relative">
                <Icon name={p.icon} className="h-7 w-7 text-gold-300" />
                <span className="mt-3 block font-display text-xl font-bold">{p.name}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-navy-100">{p.cardSummary}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
                  Learn more <Icon name="arrowRight" className="h-4 w-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section labelledBy="corp-process-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="corp-process-heading"
            eyebrow="How we work with businesses"
            title="A structured approach, not a quote race"
            className="lg:col-span-7"
          />
          <div className="relative hidden aspect-[16/9] overflow-hidden rounded-2xl lg:col-span-5 lg:block">
            <Image src={images.corporateTeam.src} alt={images.corporateTeam.alt} fill sizes="40vw" className="object-cover" />
          </div>
        </div>
        <div className="mt-10">
          <ProcessSteps steps={corporateProcess} />
        </div>
      </Section>

      <Section id="consultation" tone="mist" labelledBy="consult-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="consult-heading"
              eyebrow="Request a consultation"
              title="Tell us about your business"
              intro="A Finmirai advisor will review your requirement and arrange a discussion. If you have current policy schedules, keep them handy — they help us spot gaps."
            />
            <ul className="mt-6 space-y-2 text-navy-700">
              {["New programme or first-time cover", "Renewal review and gap analysis", "Contract or tender insurance requirements"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-gold-600" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:col-span-8">
            <CorporateEnquiryForm />
          </div>
        </div>
      </Section>
    </>
  );
}
