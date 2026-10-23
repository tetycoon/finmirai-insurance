import Image from "next/image";
import Link from "next/link";

/** Official Finmirai logo (public/logo.png), used exactly as supplied by the client. */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`group inline-flex shrink-0 items-center gap-2.5 ${className}`} aria-label="Finmirai Insurance Brokers — home">
      <LogoMark light={light} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.4rem] font-extrabold lg:text-[1.5rem] tracking-[0.12em] ${light ? "text-white" : "text-navy-900"}`}>
          FINMIRAI
        </span>
        <span className={`mt-1 whitespace-nowrap text-[0.62rem] font-semibold lg:text-[0.66rem] uppercase tracking-[0.22em] ${light ? "text-gold-300" : "text-gold-600"}`}>
          Insurance Brokers
        </span>
      </span>
    </Link>
  );
}

/** The logo image has a white background, so on dark surfaces it sits on a white tile. */
export function LogoMark({ light = false }: { light?: boolean }) {
  // width/height = the largest rendered size (h-14), so the srcset serves ~64/128px files, not 256/640px.
  const img = <Image src="/logo.png" alt="" width={54} height={56} priority className="h-12 w-auto lg:h-14" />;
  return light ? <span className="inline-flex shrink-0 rounded-lg bg-white p-1">{img}</span> : <span className="inline-flex shrink-0">{img}</span>;
}
