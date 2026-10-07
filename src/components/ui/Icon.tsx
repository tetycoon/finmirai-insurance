import type { SVGProps } from "react";

/** Simple 24×24 stroke icons drawn for Finmirai. Keep strokes at 1.75 for visual consistency. */
const paths = {
  heartPulse: (
    <>
      <path d="M20.4 12.6 12 21l-8.4-8.4A5 5 0 0 1 12 6.1a5 5 0 0 1 8.4 6.5Z" />
      <path d="M3.5 12h4l1.5-3 3 6 1.5-3h7" />
    </>
  ),
  umbrella: (
    <>
      <path d="M3 12a9 9 0 0 1 18 0Z" />
      <path d="M12 12v6.5a2 2 0 0 1-4 0" />
      <path d="M12 3v0" />
    </>
  ),
  car: (
    <>
      <path d="M5 16h14v-4l-2-5H7l-2 5Z" />
      <path d="M3 12h2m14 0h2" />
      <circle cx="7.5" cy="16.5" r="1.75" />
      <circle cx="16.5" cy="16.5" r="1.75" />
    </>
  ),
  plane: (
    <>
      <path d="M10.5 13.5 4 11l1.5-1.5 7 1 4-4a2 2 0 0 1 3 3l-4 4 1 7L16 22l-2.5-6.5" />
      <path d="M6 18l-2 2" />
    </>
  ),
  home: (
    <>
      <path d="M3.5 10.5 12 4l8.5 6.5" />
      <path d="M5.5 9v11h13V9" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  bandage: (
    <>
      <rect x="2.5" y="8" width="19" height="8" rx="4" transform="rotate(-35 12 12)" />
      <path d="M10.5 11.5h.01M13.5 12.5h.01M12 10h.01M12 14h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  factory: (
    <>
      <path d="M3 20V10l5 3V10l5 3V10l5 3V4h3v16Z" />
      <path d="M7 17h2m3 0h2m3 0h2" />
    </>
  ),
  flame: (
    <path d="M12 21a6.5 6.5 0 0 0 6.5-6.5c0-3-2-5.5-3.5-7-.5 2-1.5 3-3 3.5.5-3-1-6-3.5-8 0 3.5-3 5.5-3 9.5A6.5 6.5 0 0 0 12 21Z" />
  ),
  ship: (
    <>
      <path d="M3 15h18l-2.5 4.5h-13Z" />
      <path d="M6 15V9h12v6" />
      <path d="M9 9V6h6v3" />
      <path d="M3 21.5c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M7 20h10M5 7h14" />
      <path d="m5 7-2.5 6a2.5 2.5 0 0 0 5 0Z" />
      <path d="m19 7-2.5 6a2.5 2.5 0 0 0 5 0Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.2a3.25 3.25 0 0 1 0 5.6M18 20a6 6 0 0 0-2.5-4.9" />
    </>
  ),
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
      <path d="M12 14.5v2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8.5 7V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2M3 12.5h18" />
    </>
  ),
  phone: (
    <path d="M5 3.5h3.5l1.5 4.5-2.25 1.5a11 11 0 0 0 6.75 6.75L16 14l4.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5A16 16 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5Z" />
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.3Z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.5 4.5 0 0 1-2.3-2.3l.8-1-1-2Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-6.5-5.5-6.5-11a6.5 6.5 0 0 1 13 0c0 5.5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.2 2.4 2.4 4.6-4.8" />
    </>
  ),
  arrowRight: <path d="M4.5 12h15m-6-6 6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  fileText: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19a3 3 0 0 1-3 2.5h-2.5" />
    </>
  ),
  graduation: (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5Z" />
      <path d="M6.5 11v4.5c1.5 1.5 3.5 2.5 5.5 2.5s4-1 5.5-2.5V11M21.5 9v5" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
      <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 7-2-2-6.5 6.5 2 2" />
      <path d="m13 7 2-2 6.5 6.5-2 2" />
      <path d="M7.5 15 10 17.5a1.5 1.5 0 0 0 2-2l1 1a1.5 1.5 0 0 0 2-2l.5.5a1.5 1.5 0 0 0 2-2L13 8.5l-2 2a1.75 1.75 0 0 1-2.5-2.5L11 5.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 2.5 20h19Z" />
      <path d="M12 10v4.5M12 17.2v.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8v.01" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" />
      <path d="M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16" />
      <path d="M20 20v-4h-4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  bond: (
    <>
      <path d="M6 3h9l4 4v14H6Z" />
      <path d="M15 3v4h4" />
      <circle cx="12.5" cy="13" r="2.5" />
      <path d="m11 15.2-1 4 2.5-1.2 2.5 1.2-1-4" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "h-5 w-5",
  title,
  ...rest
}: { name: IconName; className?: string; title?: string } & Omit<SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
