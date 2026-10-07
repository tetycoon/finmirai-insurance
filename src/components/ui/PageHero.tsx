import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/content/images";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/**
 * Inner-page hero: navy field with the gold rule from the Finmirai card, H1, intro and CTAs.
 * One H1 per page (Plan §13) — this component owns it.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  actions,
  image,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  actions?: ReactNode;
  image?: SiteImage;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <HeroPattern />
      <div className="container relative grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20">
        <div className={image || aside ? "lg:col-span-7" : "lg:col-span-9"}>
          <Breadcrumbs items={crumbs} light />
          {eyebrow ? <p className="eyebrow eyebrow-light mt-8">{eyebrow}</p> : null}
          <h1 className={`${eyebrow ? "mt-3" : "mt-8"} text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl`}>{title}</h1>
          {intro ? <div className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{intro}</div> : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {image ? (
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-gold-400/60" aria-hidden />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-800">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ) : aside ? (
          <div className="lg:col-span-5">{aside}</div>
        ) : null}
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-gold-400 via-gold-300 to-transparent" aria-hidden />
    </section>
  );
}

/** Subtle concentric-arc motif — original Finmirai graphic, decorative only. */
export function HeroPattern() {
  return (
    <svg
      className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] text-gold-300 opacity-[0.07]"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
    >
      {[60, 100, 140, 180].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" strokeWidth="1.5" />
      ))}
    </svg>
  );
}
