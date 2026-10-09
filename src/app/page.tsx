import Image from "next/image";
import Link from "next/link";
import { CallbackForm } from "@/components/forms/Forms";
import { HomeHero } from "@/components/home/HomeHero";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LeaderPortrait } from "@/components/ui/LeaderPortrait";
import { ProductCard } from "@/components/ui/ProductCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { articles } from "@/content/articles";
import { images } from "@/content/images";
import { corporateProducts, personalProducts, productHref } from "@/content/products";
import { site, telHref, whatsappHref } from "@/content/site";
import { reveal, stagger } from "@/lib/motion";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${site.legalName} | Insurance & Risk Advisory in Chennai`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

const trustPoints: { title: string; text: string; icon: IconName }[] = [
  { title: "Professional Expertise", text: "Advice grounded in risk, not in a sales script.", icon: "compass" },
  { title: "Multiple Insurance Solutions", text: "Personal, family, business and corporate cover in one place.", icon: "layers" },
  { title: "Personalised Guidance", text: "Options explained in plain language, around your needs.", icon: "user" },
  { title: "Ongoing Support", text: "Renewals, changes and claims guidance after you buy.", icon: "refresh" },
];

const claimsJourney: { title: string; text: string; icon: IconName }[] = [
  { title: "Tell us what happened", text: "Call, WhatsApp or use the claim-support form.", icon: "phone" },
  { title: "Know what's needed", text: "We explain the process and the documents for your claim type.", icon: "fileText" },
  { title: "Coordinate & follow up", text: "We help you communicate with the insurer and track progress.", icon: "refresh" },
  { title: "Understand the outcome", text: "We explain the insurer's decision and your options.", icon: "compass" },
];

const advisorPillars: { title: string; icon: IconName }[] = [
  { title: "Product & insurance training", icon: "graduation" },
  { title: "Business & sales support", icon: "briefcase" },
  { title: "Policy servicing support", icon: "refresh" },
  { title: "Claims guidance for your customers", icon: "headset" },
  { title: "Long-term professional development", icon: "compass" },
];


export default function HomePage() {
  return (
    <>
      {/* 1 — Hero (animated) */}
      <HomeHero />

      {/* 2 — Trust strip */}
      <section aria-label="Why Finmirai" className="border-b border-navy-100 bg-white">
        <div className="container grid divide-y divide-navy-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {trustPoints.map((t, i) => (
            <div key={t.title} {...reveal(stagger(i))} className="group flex items-start gap-4 py-6 lg:px-6 lg:first:pl-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-700 ring-1 ring-gold-200 transition duration-300 group-hover:bg-navy-900 group-hover:text-gold-300 group-hover:ring-navy-900">
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-bold">{t.title}</h2>
                <p className="mt-0.5 text-sm leading-relaxed text-navy-600">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — Insurance solutions */}
      <Section labelledBy="personal-heading">
        <div {...reveal()} className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="personal-heading"
            eyebrow="Insurance solutions"
            title="Protection for you and your family"
            intro="Understand your options before you buy, and get help with renewals and claims after."
          />
          <ButtonLink href="/insurance-solutions" variant="outline" iconRight="arrowRight" className="self-start lg:self-auto">
            All personal insurance
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {personalProducts.map((p, i) => (
            <div key={p.slug} {...reveal(stagger(i))} className="h-full">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </Section>

      {/* 4 — Business & corporate */}
      <Section tone="navy" labelledBy="corporate-heading" className="relative overflow-hidden">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div {...reveal()} className="lg:col-span-5">
            <SectionHeading
              id="corporate-heading"
              light
              eyebrow="Business & corporate"
              title="Protect your business. Protect your people."
              intro="Insurance programmes built around your property, people, liability, goods in transit, engineering and digital risks."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/corporate-insurance#consultation" variant="gold" size="lg" iconRight="arrowRight">
                Request Corporate Consultation
              </ButtonLink>
              <ButtonLink href="/corporate-insurance" variant="outlineLight" size="lg">
                Explore corporate insurance
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-3 sm:grid-cols-2">
              {corporateProducts.map((p, i) => (
                <li key={p.slug} {...reveal(stagger(i, 70), "right")}>
                  <Link
                    href={productHref(p)}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-gold-300/60 hover:bg-white/[0.08]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold-400/15 text-gold-300 transition duration-300 group-hover:bg-gold-400 group-hover:text-navy-950">
                      <Icon name={p.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display font-semibold text-white">{p.name}</span>
                      <span className="block truncate text-sm text-navy-300">{p.cardSummary}</span>
                    </span>
                    <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-navy-400 transition duration-300 group-hover:translate-x-1 group-hover:text-gold-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 5 — Claims */}
      <Section labelledBy="claims-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div
            {...reveal(0, "zoom")}
            className="relative order-last aspect-[4/3] overflow-hidden rounded-3xl lg:order-first lg:col-span-5 lg:aspect-[4/5]"
          >
            <Image src={images.supportDesk.src} alt={images.supportDesk.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="lg:col-span-7">
            <div {...reveal()}>
              <SectionHeading
                id="claims-heading"
                eyebrow="Claims support"
                title="We don't disappear after the policy is issued."
                intro="Insurance matters most when something goes wrong. Finmirai can guide you through the information and documentation needed for the claims process, subject to policy terms and the insurer's process."
              />
            </div>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {claimsJourney.map((s, i) => (
                <li key={s.title} {...reveal(100 + stagger(i))}>
                  <div className="group h-full rounded-xl border border-navy-100 bg-mist p-5 transition duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:bg-white hover:shadow-card">
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-gold-300 transition duration-300 group-hover:bg-gold-400 group-hover:text-navy-950">
                        {i + 1}
                      </span>
                      <h3 className="font-semibold">{s.title}</h3>
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div {...reveal(200)}>
              <p className="mt-5 text-sm text-navy-500">Claim assessment and settlement are decided by the insurer under the policy terms.</p>
              <ButtonLink href="/claims-support" variant="navy" size="lg" iconRight="arrowRight" className="mt-6">
                Get Claims Support
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* 6 — Advisor */}
      <Section tone="mist" labelledBy="advisor-heading">
        <div {...reveal()} className="overflow-hidden rounded-3xl bg-white shadow-card lg:grid lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <SectionHeading
              id="advisor-heading"
              eyebrow="Become a Finmirai Advisor"
              title="Build your insurance career with Finmirai."
              intro="For people who want to build a professional insurance practice — with training, product access and support behind them."
            />
            <ul className="mt-8 space-y-3">
              {advisorPillars.map((p, i) => (
                <li key={p.title} {...reveal(150 + stagger(i, 60), "left")} className="group flex items-center gap-3 text-navy-800">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-800 transition duration-300 group-hover:bg-navy-900 group-hover:text-gold-300">
                    <Icon name={p.icon} className="h-[18px] w-[18px]" />
                  </span>
                  {p.title}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/become-an-advisor" variant="navy" size="lg" iconRight="arrowRight">
                Become a Finmirai Advisor
              </ButtonLink>
              <ButtonLink href="/become-an-advisor/training" variant="outline" size="lg">
                Training &amp; support
              </ButtonLink>
            </div>
          </div>
          <div {...reveal(150, "zoom")} className="relative min-h-[300px] overflow-hidden">
            <Image src={images.teamMeeting.src} alt={images.teamMeeting.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      {/* 7 — Leadership */}
      <Section labelledBy="leader-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div {...reveal(0, "left")} className="lg:col-span-4">
            <LeaderPortrait className="aspect-[4/5] w-full max-w-sm" />
          </div>
          <div {...reveal(120)} className="lg:col-span-8 lg:pl-6">
            <p className="eyebrow">Leadership</p>
            <h2 id="leader-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
              {site.leadership.name}
            </h2>
            <p className="mt-1 text-lg font-medium text-gold-700">{site.leadership.title}</p>
            <div className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-700">
              <p>{site.leadership.bio[0]}</p>
            </div>
            <ButtonLink href="/about-us/leadership" variant="outline" iconRight="arrowRight" className="mt-7">
              Know more
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* 8 — Knowledge centre */}
      <Section tone="mist" labelledBy="kc-heading">
        <div {...reveal()} className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="kc-heading"
            eyebrow="Knowledge centre"
            title="Understand insurance before you need it"
            intro="Plain-language guides to help you make informed decisions."
          />
          <ButtonLink href="/knowledge-centre" variant="outline" iconRight="arrowRight" className="self-start lg:self-auto">
            All guides
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <div key={a.slug} {...reveal(stagger(i, 100))} className="h-full">
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      </Section>

      {/* 9 — Final conversion */}
      <Section labelledBy="final-heading">
        <div {...reveal()} className="grid gap-10 overflow-hidden rounded-3xl bg-navy-900 p-6 text-white sm:p-10 lg:grid-cols-12 lg:p-14">
          <div className="lg:col-span-6">
            <p className="eyebrow eyebrow-light">Get in touch</p>
            <h2 id="final-heading" className="mt-3 text-3xl font-bold text-white sm:text-5xl">
              Tell us what you need.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-navy-100">
              Request a callback, message us on WhatsApp, or send a detailed enquiry. A Finmirai advisor will help you take the next step.
            </p>
            <div className="mt-8 grid gap-3 sm:max-w-md">
              <TrackedLink kind="whatsapp" location="final_cta" href={whatsappHref()} className={buttonClasses("gold", "lg", "justify-start")}>
                <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp Finmirai
              </TrackedLink>
              <TrackedLink kind="call" location="final_cta" href={telHref()} className={buttonClasses("outlineLight", "lg", "justify-start")}>
                <Icon name="phone" className="h-5 w-5" /> Call {site.contact.phoneDisplay}
              </TrackedLink>
              <ButtonLink href="/get-insurance-assistance" variant="outlineLight" size="lg" icon="fileText" className="justify-start">
                Send a detailed enquiry
              </ButtonLink>
            </div>
          </div>
          <div {...reveal(150, "right")} className="rounded-2xl bg-white p-6 text-ink sm:p-8 lg:col-span-6">
            <h3 className="text-xl font-bold">Request a callback</h3>
            <p className="mb-5 mt-1 text-sm text-navy-600">Takes less than a minute.</p>
            <CallbackForm />
          </div>
        </div>
      </Section>
    </>
  );
}
