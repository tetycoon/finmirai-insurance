import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LeaderPortrait } from "@/components/ui/LeaderPortrait";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Finmirai Insurance Brokers",
  description:
    "Finmirai Insurance Brokers Private Limited is an insurance and risk advisory firm in Chennai helping individuals, families, businesses and corporates choose suitable insurance and get ongoing support.",
  path: "/about-us",
  image: images.chennaiCoast.src,
});

const stages: { title: string; text: string; icon: IconName }[] = [
  { title: "Before you buy", text: "We understand your risks and explain options, exclusions and costs in plain language.", icon: "compass" },
  { title: "While you're insured", text: "Renewals, endorsements and changes handled with you through the year.", icon: "refresh" },
  { title: "When you claim", text: "Guidance on process and documents, and follow-up with the insurer.", icon: "headset" },
];

const audiences: { title: string; icon: IconName }[] = [
  { title: "Individuals", icon: "user" },
  { title: "Families", icon: "users" },
  { title: "Businesses", icon: "briefcase" },
  { title: "Corporates", icon: "factory" },
];

const values = [
  { title: "Professional", text: "Advice based on understanding risk, not on selling the most products." },
  { title: "Transparent", text: "We explain what isn't covered as clearly as what is." },
  { title: "Human", text: "Real people you can call or message — before, during and after." },
  { title: "Long-term", text: "We measure success by the relationships we keep, year after year." },
];

const notPromises = ["The cheapest premium", "Guaranteed claim settlement", "Guaranteed savings", "Guaranteed income for advisors"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About Us", path: "/about-us" }]}
        eyebrow="About Finmirai"
        title="An insurance broker that stays with you"
        intro={
          <p>
            {site.legalName} is a professional insurance broking organisation focused on helping individuals, families and businesses understand
            risk and access appropriate insurance solutions — with ongoing support.
          </p>
        }
        image={images.chennaiCoast}
      />

      <Section labelledBy="approach-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="approach-heading"
              eyebrow="Our approach"
              title="Insurance and risk advisory — not a comparison store"
              intro="Buying a policy is one moment. Living with it is years. We are built to help across the whole relationship."
            />
          </div>
          <div className="grid gap-4 lg:col-span-7">
            {stages.map((s) => (
              <div key={s.title} className="flex gap-5 rounded-2xl border border-navy-100 bg-white p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-navy-600">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="serve-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src={images.familyFour.src} alt={images.familyFour.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading id="serve-heading" eyebrow="Who we serve" title="From a family's first health policy to a corporate programme" />
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {audiences.map((a) => (
                <li key={a.title} className="flex items-center gap-3 rounded-xl bg-white p-4 font-semibold text-navy-900 ring-1 ring-navy-100">
                  <Icon name={a.icon} className="h-5 w-5 text-gold-600" /> {a.title}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-navy-600">
              Our work covers health, motor, home, travel, marine, business insurance, employee benefits, liability, cyber, engineering, property,
              bonds and claims advisory.
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="values-heading">
        <SectionHeading id="values-heading" eyebrow="What we stand for" title="Our values" align="center" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border-t-4 border-gold-400 bg-mist p-6">
              <h3 className="text-lg font-bold">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-navy-600">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-navy-100 p-6 sm:p-8">
          <h3 className="text-lg font-bold">What we will never promise you</h3>
          <p className="mt-1 text-navy-600">Because no honest broker can.</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {notPromises.map((n) => (
              <li key={n} className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1.5 text-sm text-navy-700">
                <Icon name="close" className="h-3.5 w-3.5 text-red-600" /> {n}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="navy" labelledBy="lead-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <LeaderPortrait className="aspect-[4/5] w-full max-w-xs lg:col-span-3" />
          <div className="lg:col-span-9 lg:pl-6">
            <p className="eyebrow eyebrow-light">Leadership</p>
            <h2 id="lead-heading" className="mt-3 text-3xl font-bold text-white">{site.leadership.name}</h2>
            <p className="mt-1 text-lg text-gold-300">{site.leadership.title}</p>
            <ButtonLink href="/about-us/leadership" variant="outlineLight" iconRight="arrowRight" className="mt-6">
              Meet our leadership
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section labelledBy="company-heading">
        <SectionHeading id="company-heading" eyebrow="Company information" title="Registered details" />
        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100 sm:grid-cols-2">
          {[
            ["Legal name", site.legalName],
            ["Broker registration no.", site.regulatory.brokerRegistrationNumber],
            ["Registration category", site.regulatory.registrationCategory],
            ["CIN", site.regulatory.cin],
          ].map(([k, v]) => (
            <div key={k} className="bg-white p-5">
              <dt className="text-sm text-navy-500">{k}</dt>
              <dd className="mt-1 font-semibold text-navy-900">{v ?? <Pending label={k as string} />}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand location="about_cta" />
    </>
  );
}
