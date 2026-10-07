import type { ReactNode } from "react";

type Tone = "white" | "mist" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "bg-mist",
  navy: "bg-navy-900 text-white",
};

export function Section({
  children,
  tone = "white",
  className = "",
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  light = false,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow ? <p className={`eyebrow ${light ? "eyebrow-light" : ""} ${centered ? "justify-center" : ""}`}>{eyebrow}</p> : null}
      <Tag
        id={id}
        className={`mt-3 text-3xl font-bold leading-tight sm:text-4xl ${light ? "text-white" : "text-navy-900"}`}
      >
        {title}
      </Tag>
      {intro ? (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-navy-100" : "text-navy-600"}`}>{intro}</p>
      ) : null}
    </div>
  );
}
