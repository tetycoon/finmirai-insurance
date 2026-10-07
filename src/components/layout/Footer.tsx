import Link from "next/link";
import { footerNav, legalNav } from "@/content/navigation";
import { fullAddress, mailHref, mapsHref, site, telHref, whatsappHref } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const reg = site.regulatory;
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500" aria-hidden />
      <div className="container grid gap-12 py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-navy-300">
            {site.positioning} for individuals, families, businesses and corporates. {site.tagline}
          </p>
          <ul className="mt-6 space-y-3 text-[0.9375rem]">
            <li>
              <TrackedLink kind="call" location="footer" href={telHref()} className="inline-flex items-center gap-2.5 hover:text-white">
                <Icon name="phone" className="h-4 w-4 text-gold-300" /> {site.contact.phoneDisplay}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink kind="whatsapp" location="footer" href={whatsappHref()} className="inline-flex items-center gap-2.5 hover:text-white">
                <Icon name="whatsapp" className="h-4 w-4 text-gold-300" /> WhatsApp us
              </TrackedLink>
            </li>
            <li>
              <TrackedLink kind="email" location="footer" href={mailHref()} className="inline-flex items-center gap-2.5 break-all hover:text-white">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-gold-300" /> {site.contact.email}
              </TrackedLink>
            </li>
            <li>
              <a href={mapsHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2.5 hover:text-white">
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <span>{fullAddress}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          {footerNav.map((col) => (
            <div key={col.title}>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-navy-300 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container space-y-3 py-6 text-[0.8125rem] leading-relaxed text-navy-400">
          <p>
            <span className="text-navy-200">{site.legalName}</span> · Broker Registration No.{" "}
            {reg.brokerRegistrationNumber ?? <Pending label="Registration no." />} · CIN {reg.cin ?? <Pending label="CIN" />}
          </p>
          <p>
            Insurance is the subject matter of solicitation. Claim settlement is subject to the insurer's assessment and policy terms and
            conditions. Finmirai does not guarantee any premium, claim outcome or advisor income.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {site.legalName}. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
