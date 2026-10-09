import Image from "next/image";
import { site } from "@/content/site";

/**
 * Principal Officer portrait. Until the client supplies an approved professional photograph
 * (Plan §19), renders a clearly-labelled placeholder — never a stock photo of a stranger.
 */
export function LeaderPortrait({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const { name, photo } = site.leadership;
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-navy-800 ${className}`}>
      {photo ? (
        <Image src={photo} alt={`${name}, ${site.leadership.title}`} fill priority={priority} sizes="(min-width: 1024px) 400px, 100vw" className="object-cover object-[center_40%]" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-navy-700 to-navy-950 p-6 text-center">
          <svg viewBox="0 0 120 120" className="h-28 w-28 text-gold-300" aria-hidden>
            <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <text x="60" y="72" textAnchor="middle" fontSize="34" fontWeight="700" fill="currentColor" fontFamily="var(--font-manrope), sans-serif">
              SG
            </text>
          </svg>
          <p className="mt-4 rounded border border-dashed border-gold-400/70 px-2 py-1 text-xs font-medium text-gold-200">
            [Professional photograph — to be provided]
          </p>
        </div>
      )}
    </div>
  );
}
