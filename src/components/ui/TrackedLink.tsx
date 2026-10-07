"use client";

import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";

type Kind = "call" | "whatsapp" | "email";

const EVENT = { call: "call_click", whatsapp: "whatsapp_click", email: "email_click" } as const;

/** Anchor for tel:/wa.me/mailto: links that records a conversion event on click. */
export function TrackedLink({ kind, location, onClick, ...rest }: { kind: Kind; location: string } & ComponentProps<"a">) {
  const external = kind === "whatsapp";
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      onClick={(e) => {
        track(EVENT[kind], { location });
        onClick?.(e);
      }}
    />
  );
}
