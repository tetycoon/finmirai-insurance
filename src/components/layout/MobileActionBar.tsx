"use client";

import Link from "next/link";
import { telHref, whatsappHref } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { TrackedLink } from "@/components/ui/TrackedLink";

/** Thumb-reachable Call / WhatsApp / Enquire bar on phones (Plan §11: mobile-first, easy to reach). */
export function MobileActionBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[0.75rem] font-semibold";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-navy-100 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(10,26,48,0.08)] md:hidden"
    >
      <TrackedLink kind="call" location="mobile_bar" href={telHref()} className={`${item} text-navy-800`}>
        <Icon name="phone" className="h-5 w-5" />
        Call
      </TrackedLink>
      <TrackedLink kind="whatsapp" location="mobile_bar" href={whatsappHref()} className={`${item} text-[#128C4A]`}>
        <Icon name="whatsapp" className="h-5 w-5" />
        WhatsApp
      </TrackedLink>
      <Link href="/claims-support" className={`${item} text-navy-800`}>
        <Icon name="headset" className="h-5 w-5" />
        Claims
      </Link>
      <Link href="/get-insurance-assistance" className={`${item} m-1.5 rounded-lg bg-navy-900 text-white`}>
        <Icon name="shield" className="h-5 w-5 text-gold-300" />
        Get Help
      </Link>
    </nav>
  );
}
