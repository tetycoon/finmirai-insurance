import Image from "next/image";
import Link from "next/link";

/** Official Finmirai logo (public/logo.png), used exactly as supplied by the client. */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Finmirai Insurance Brokers — home">
      <LogoMark light={light} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.3rem] font-extrabold tracking-[0.12em] ${light ? "text-white" : "text-navy-900"}`}>
          FINMIRAI
        </span>
        <span className={`mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.22em] ${light ? "text-gold-300" : "text-gold-600"}`}>
          Insurance Brokers
        </span>
      </span>
    </Link>
  );
}

/** The logo image has a white background, so on dark surfaces it sits on a white tile. */
export function LogoMark({ light = false }: { light?: boolean }) {
  const img = <Image src="/logo.png" alt="" width={213} height={222} priority className="h-11 w-auto" />;
  return light ? <span className="inline-flex shrink-0 rounded-lg bg-white p-1">{img}</span> : <span className="inline-flex shrink-0">{img}</span>;
}
