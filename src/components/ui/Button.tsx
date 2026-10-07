import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "gold" | "navy" | "outline" | "outlineLight" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg text-center font-semibold leading-tight transition duration-200 ease-out hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold: "bg-gold-400 text-navy-950 hover:bg-gold-300 shadow-sm",
  navy: "bg-navy-900 text-white hover:bg-navy-700 shadow-sm",
  outline: "border border-navy-200 bg-white text-navy-900 hover:border-navy-400 hover:bg-navy-50",
  outlineLight: "border border-white/30 text-white hover:border-white/60 hover:bg-white/10",
  ghost: "text-navy-800 hover:bg-navy-50",
  light: "bg-white text-navy-900 hover:bg-navy-50 shadow-sm",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3.5 py-1.5 text-sm",
  md: "min-h-11 px-5 py-2 text-[0.9375rem]",
  lg: "min-h-12 px-6 py-2.5 text-base",
};

export function buttonClasses(variant: Variant = "gold", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  href,
  variant,
  size,
  icon,
  iconRight,
  children,
  className,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  const external = typeof href === "string" && /^(https?:|tel:|mailto:)/.test(href);
  const content = (
    <>
      {icon ? <Icon name={icon} className="h-[1.1em] w-[1.1em] shrink-0" /> : null}
      <span>{children}</span>
      {iconRight ? <Icon name={iconRight} className="h-[1.1em] w-[1.1em] shrink-0" /> : null}
    </>
  );
  if (external) {
    const isWeb = /^https?:/.test(String(href));
    return (
      <a
        href={String(href)}
        className={buttonClasses(variant, size, className)}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as ComponentProps<"a">)}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  variant,
  size,
  icon,
  iconRight,
  children,
  className,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {icon ? <Icon name={icon} className="h-[1.1em] w-[1.1em] shrink-0" /> : null}
      <span>{children}</span>
      {iconRight ? <Icon name={iconRight} className="h-[1.1em] w-[1.1em] shrink-0" /> : null}
    </button>
  );
}
