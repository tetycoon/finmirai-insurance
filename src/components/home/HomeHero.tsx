import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { images } from "@/content/images";
import { site, telHref, whatsappHref } from "@/content/site";
import { WordRotator } from "./WordRotator";

const quickNeeds: { label: string; href: string; icon: IconName }[] = [
  { label: "Health", href: "/insurance-solutions/health-insurance", icon: "heartPulse" },
  { label: "Motor", href: "/insurance-solutions/motor-insurance", icon: "car" },
  { label: "Life", href: "/insurance-solutions/life-insurance", icon: "umbrella" },
  { label: "Travel", href: "/insurance-solutions/travel-insurance", icon: "plane" },
  { label: "Business", href: "/corporate-insurance", icon: "briefcase" },
  { label: "Make a claim", href: "/claims-support", icon: "headset" },
];

const rotatingWords = ["family", "health", "vehicle", "home", "business", "people"];

/** Stagger helper — every animated element gets an explicit delay in seconds. */
const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

/**
 * Homepage hero (Plan §5, section 1) with an entrance sequence:
 * tagline lines rise from a mask → shield pops → H1, rotating word, copy and CTAs fade up →
 * gold bar slides along the slanted bottom edge. Background photo slowly settles (Ken Burns).
 */
export function HomeHero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        {/* Background photo + legibility overlays */}
        <div className="absolute inset-0 -z-10" aria-hidden>
          {/* Phones: full-bleed photo under a strong overlay. Desktop: photo fills the right 60% and blends into navy. */}
          <div className="absolute inset-0 overflow-hidden lg:left-auto lg:w-[60%]">
            {/* Parallax layer: extends above the frame so drifting never exposes an edge */}
            <div data-parallax="0.12" suppressHydrationWarning className="absolute inset-x-0 -top-24 bottom-0 will-change-transform">
              <Image
                src={images.familyMotherDaughter.src}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="anim-kenburns object-cover object-[70%_center] lg:object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/80 to-navy-950/95 lg:hidden" />
            <div className="absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-navy-950 via-navy-950/75 to-transparent lg:block" />
          </div>
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950/60 to-transparent" />
        </div>

        <div className="container relative pb-36 pt-12 sm:pb-44 sm:pt-16 lg:pb-52 lg:pt-20">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-light anim-fade-up" style={d(0.05)}>
              {site.legalName}
            </p>

            {/* Tagline — each line rises out of its own mask */}
            <p className="mt-5 font-display text-[2rem] font-extrabold leading-[1.06] tracking-tight min-[400px]:text-[2.3rem] sm:text-6xl lg:text-7xl">
              <span className="block overflow-hidden pb-1">
                <span className="anim-rise flex flex-wrap items-center gap-x-[0.22em]" style={d(0.15)}>
                  Protecting
                  <span className="anim-pop inline-flex" style={d(0.75)}>
                    <Icon name="shield" className="h-[0.8em] w-[0.8em] text-gold-400" strokeWidth={2} />
                  </span>
                  today.
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="anim-rise block text-gold-300" style={d(0.35)}>
                  Securing tomorrow.
                </span>
              </span>
            </p>

            <h1 className="anim-fade-up mt-6 max-w-xl text-xl font-semibold leading-snug text-white sm:text-2xl" style={d(0.7)}>
              Insurance Solutions. Professional Advice. Lasting Relationships.
            </h1>

            <p className="anim-fade-up mt-3 text-lg leading-[1.3] text-navy-100 sm:text-xl" style={d(0.85)}>
              Thoughtful cover for your <WordRotator words={rotatingWords} className="font-semibold text-gold-300" />
            </p>

            <p className="anim-fade-up mt-5 max-w-xl leading-relaxed text-navy-200" style={d(1)}>
              Insurance is not just about buying a policy. It is about understanding risk, choosing appropriate protection and having support
              when you need it.
            </p>

            <div className="anim-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={d(1.15)}>
              <ButtonLink href="/get-insurance-assistance" variant="gold" size="lg" iconRight="arrowRight">
                Get Insurance Assistance
              </ButtonLink>
              <ButtonLink href="/become-an-advisor" variant="outlineLight" size="lg">
                Become a Finmirai Advisor
              </ButtonLink>
            </div>

            <div className="anim-fade-up mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem] text-navy-200" style={d(1.3)}>
              <TrackedLink kind="call" location="hero" href={telHref()} className="inline-flex items-center gap-2 hover:text-white">
                <Icon name="phone" className="h-4 w-4 text-gold-300" /> {site.contact.phoneDisplay}
              </TrackedLink>
              <TrackedLink kind="whatsapp" location="hero" href={whatsappHref()} className="inline-flex items-center gap-2 hover:text-white">
                <Icon name="whatsapp" className="h-4 w-4 text-gold-300" /> Chat on WhatsApp
              </TrackedLink>
            </div>
          </div>

          {/* Audience badge — desktop only */}
          <div className="anim-fade-up absolute bottom-40 right-8 hidden max-w-[15rem] lg:block" style={d(1.6)}>
            <div className="anim-float rounded-2xl border border-white/15 bg-navy-950/60 p-5 backdrop-blur" style={{ animationDelay: "-3.5s" }}>
              <Icon name="users" className="h-7 w-7 text-gold-300" />
              <p className="mt-2 font-display font-semibold leading-snug">For individuals, families, businesses &amp; corporates</p>
            </div>
          </div>
        </div>

        {/* Slanted bottom edge with a gold bar sliding along it */}
        <svg
          className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-28 lg:h-36"
          viewBox="0 -2 100 12"
          preserveAspectRatio="none"
          aria-hidden
        >
          <polygon points="0,10 100,0 100,10" fill="#FFFFFF" />
          <polygon className="anim-bar" style={d(1.1)} points="56,2.9 92,-0.7 92,1.1 56,4.7" fill="#D4A93F" />
        </svg>
      </section>

      {/* Quick routes — overlaps the slanted edge */}
      <div className="relative z-10 -mt-10 sm:-mt-14">
        <div className="container">
          <nav
            aria-label="What do you need help with?"
            className="anim-fade-up rounded-2xl border border-navy-100 bg-white p-4 shadow-lift sm:p-5"
            style={d(1.4)}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
              <p className="shrink-0 font-display text-sm font-semibold text-navy-900">What do you need help with?</p>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:flex lg:flex-1 lg:flex-wrap lg:justify-end">
                {quickNeeds.map((q) => (
                  <li key={q.label}>
                    <Link
                      href={q.href}
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-navy-100 px-3 py-2.5 text-center text-sm font-medium text-navy-800 transition hover:border-gold-400 hover:bg-gold-50 lg:flex-row lg:py-2"
                    >
                      <Icon name={q.icon} className="h-[18px] w-[18px] text-gold-600" />
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
