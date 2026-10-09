"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, type NavItem } from "@/content/navigation";
import { mailHref, site, telHref, whatsappHref } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Logo } from "./Logo";

function isActive(pathname: string, item: NavItem) {
  if (pathname === item.href) return true;
  if (item.href !== "/" && pathname.startsWith(`${item.href}/`)) return true;
  return item.children?.some((c) => pathname === c.href || pathname.startsWith(`${c.href}/`)) ?? false;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus on navigation.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hoverOpen = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  return (
    <header className="sticky top-0 z-40">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-navy-900">
        Skip to content
      </a>

      {/* Utility bar — desktop only */}
      <div className="hidden bg-navy-950 text-[0.8125rem] text-navy-200 lg:block">
        <div className="container flex h-9 items-center justify-between">
          <p>{site.positioning} for Individuals, Families, Businesses &amp; Corporates</p>
          <div className="flex items-center gap-5">
            <TrackedLink kind="call" location="utility_bar" href={telHref()} className="inline-flex items-center gap-1.5 hover:text-white">
              <Icon name="phone" className="h-3.5 w-3.5" /> {site.contact.phoneDisplay}
            </TrackedLink>
            <TrackedLink kind="email" location="utility_bar" href={mailHref()} className="inline-flex items-center gap-1.5 hover:text-white">
              <Icon name="mail" className="h-3.5 w-3.5" /> {site.contact.email}
            </TrackedLink>
            <Link href="/claims-support" className="inline-flex items-center gap-1.5 font-semibold text-gold-300 hover:text-gold-200">
              <Icon name="headset" className="h-3.5 w-3.5" /> Claims Support
            </Link>
          </div>
        </div>
      </div>

      <div className={`border-b bg-white/95 transition-shadow ${scrolled ? "border-navy-100 shadow-card" : "border-transparent"}`}>
        <div ref={navRef} className="container flex h-16 items-center justify-between gap-3 lg:h-[4.5rem] min-[1400px]:!max-w-[1360px]">
          <Logo />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center">
              {mainNav.map((item, i) => {
                const active = isActive(pathname, item);
                if (!item.children) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={`relative inline-flex items-center whitespace-nowrap rounded-md px-1 py-2 text-[0.8125rem] min-[1400px]:px-2.5 min-[1400px]:text-[0.875rem] font-medium transition hover:text-navy-900 ${active ? "text-navy-900" : "text-navy-600"}`}
                      >
                        {item.label}
                        {active ? <span className="absolute inset-x-1 -bottom-[1px] min-[1400px]:inset-x-1.5 h-0.5 rounded bg-gold-400" /> : null}
                      </Link>
                    </li>
                  );
                }
                const wide = item.children.length > 3;
                return (
                  <li key={item.href} className="relative" onMouseEnter={() => hoverOpen(i)} onMouseLeave={hoverClose}>
                    <button
                      type="button"
                      aria-expanded={open === i}
                      aria-controls={`menu-${i}`}
                      onClick={() => setOpen(open === i ? null : i)}
                      className={`relative inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1 py-2 text-[0.8125rem] min-[1400px]:px-2.5 min-[1400px]:text-[0.875rem] font-medium transition hover:text-navy-900 ${active ? "text-navy-900" : "text-navy-600"}`}
                    >
                      {item.label}
                      <Icon name="chevronDown" className={`h-4 w-4 transition ${open === i ? "rotate-180" : ""}`} />
                      {active ? <span className="absolute inset-x-1 -bottom-[1px] min-[1400px]:inset-x-1.5 h-0.5 rounded bg-gold-400" /> : null}
                    </button>
                    <div
                      id={`menu-${i}`}
                      hidden={open !== i}
                      className={`absolute top-full z-50 pt-3 ${i >= mainNav.length - 3 ? "right-0" : "left-1/2 -translate-x-1/2"} ${wide ? "w-[640px]" : "w-80"}`}
                    >
                      <div className="anim-menu overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-lift">
                        <ul className={`grid gap-1 p-3 ${wide ? "grid-cols-2" : ""}`}>
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <Link href={c.href} className="block rounded-xl px-3 py-2.5 transition hover:bg-navy-50">
                                <span className="block text-sm font-semibold text-navy-900">{c.label}</span>
                                {c.description ? <span className="mt-0.5 block text-[0.8125rem] leading-snug text-navy-500">{c.description}</span> : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {wide ? (
                          <Link
                            href={item.href}
                            className="flex items-center justify-between border-t border-navy-100 bg-mist px-6 py-3 text-sm font-semibold text-navy-800 hover:text-navy-950"
                          >
                            View all {item.label.toLowerCase()} <Icon name="arrowRight" className="h-4 w-4" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="/get-a-quote"
              variant="gold"
              size="sm"
              iconRight="arrowRight"
              className="hidden whitespace-nowrap font-bold shadow-md ring-1 ring-gold-500/40 hover:shadow-lg sm:inline-flex lg:h-11 lg:px-4"
            >
              Get a Quote
            </ButtonLink>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy-900 hover:bg-navy-50 xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Icon name={mobileOpen ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-white lg:top-[6.75rem] xl:hidden"
      >
        <nav aria-label="Mobile" className="container py-4">
          <ul className="divide-y divide-navy-100">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <details className="group py-1" open={isActive(pathname, item)}>
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-lg font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <Icon name="chevronDown" className="h-5 w-5 text-navy-500 transition group-open:rotate-180" />
                    </summary>
                    <ul className="mb-3 space-y-0.5 border-l-2 border-gold-300 pl-4">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <Link href={c.href} className="block py-2 text-[0.9375rem] text-navy-700 hover:text-navy-950">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                      {item.children.length > 3 ? (
                        <li>
                          <Link href={item.href} className="block py-2 text-[0.9375rem] font-semibold text-navy-900">
                            View all →
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.href} className="block py-4 text-lg font-semibold text-navy-900">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <ButtonLink href="/get-a-quote" variant="gold" size="lg" iconRight="arrowRight" className="font-bold">
              Get a Quote
            </ButtonLink>
            <ButtonLink href="/become-an-advisor" variant="outline" size="lg">
              Become a Finmirai Advisor
            </ButtonLink>
            <div className="grid grid-cols-2 gap-3">
              <TrackedLink kind="call" location="mobile_menu" href={telHref()} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-navy-200 font-semibold text-navy-900">
                <Icon name="phone" className="h-5 w-5" /> Call
              </TrackedLink>
              <TrackedLink kind="whatsapp" location="mobile_menu" href={whatsappHref()} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-navy-200 font-semibold text-navy-900">
                <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp
              </TrackedLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
